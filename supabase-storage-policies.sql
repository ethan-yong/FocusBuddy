-- FocusBuddy Storage Policies
-- Run these in Supabase Storage → proof_images bucket → Policies

-- Allow users to upload their own images
CREATE POLICY "Users can upload own images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'proof_images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow users to read their own images
CREATE POLICY "Users can view own images"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'proof_images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow users to delete their own images
CREATE POLICY "Users can delete own images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'proof_images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);
