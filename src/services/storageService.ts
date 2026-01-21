import { supabase } from './supabaseClient';
import { decode } from 'base64-arraybuffer';

export const storageService = {
  /**
   * Upload a proof photo
   * @param base64Image - Base64 encoded image string
   * @param fileName - Custom file name (optional)
   * @returns Public URL of uploaded image
   */
  async uploadProofPhoto(
    base64Image: string,
    fileName?: string
  ): Promise<string> {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) throw new Error('Not authenticated');

    // Remove data:image/xxx;base64, prefix if present
    const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');
    
    // Generate unique filename
    const timestamp = Date.now();
    const uniqueFileName = fileName || `proof_${timestamp}.jpg`;
    const filePath = `${userData.user.id}/${uniqueFileName}`;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('proof_images')
      .upload(filePath, decode(base64Data), {
        contentType: 'image/jpeg',
        upsert: false,
      });

    if (error) throw error;

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('proof_images')
      .getPublicUrl(filePath);

    return urlData.publicUrl;
  },

  /**
   * Delete a proof photo
   */
  async deleteProofPhoto(fileUrl: string): Promise<void> {
    // Extract file path from URL
    const filePath = fileUrl.split('/proof_images/')[1];
    
    const { error } = await supabase.storage
      .from('proof_images')
      .remove([filePath]);

    if (error) throw error;
  },
};
