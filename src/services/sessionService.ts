import { supabase } from './supabaseClient';
import type { Session } from '../types/database.types';

export const sessionService = {
  /**
   * Start a new focus session
   */
  async startSession(taskId: string): Promise<Session> {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('sessions')
      .insert({
        task_id: taskId,
        user_id: userData.user.id,
        start_time: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * End a focus session
   */
  async endSession(
    sessionId: string,
    completed: boolean = true
  ): Promise<Session> {
    const { data, error } = await supabase
      .from('sessions')
      .update({
        end_time: new Date().toISOString(),
        completed,
      })
      .eq('id', sessionId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Get user's session history
   */
  async getSessions(): Promise<Session[]> {
    const { data, error } = await supabase
      .from('sessions')
      .select('*')
      .order('start_time', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  /**
   * Add proof photos to a session
   */
  async addProofPhotos(
    sessionId: string,
    photoUrls: string[]
  ): Promise<Session> {
    const { data, error } = await supabase
      .from('sessions')
      .update({ proof_photos: photoUrls })
      .eq('id', sessionId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};
