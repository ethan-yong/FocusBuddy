import { supabase } from './supabaseClient';
import type { Task } from '../types/database.types';

export const taskService = {
  /**
   * Fetch all tasks for current user
   */
  async getTasks(): Promise<Task[]> {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  /**
   * Add a new task
   */
  async addTask(
    name: string,
    duration: number,
    priority: 'low' | 'medium' | 'high' = 'medium'
  ): Promise<Task> {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('tasks')
      .insert({
        user_id: userData.user.id,
        name,
        duration,
        priority,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Update a task
   */
  async updateTask(
    taskId: string,
    updates: Partial<Omit<Task, 'id' | 'user_id' | 'created_at'>>
  ): Promise<Task> {
    const { data, error } = await supabase
      .from('tasks')
      .update(updates)
      .eq('id', taskId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Delete a task
   */
  async deleteTask(taskId: string): Promise<void> {
    const { error } = await supabase.from('tasks').delete().eq('id', taskId);

    if (error) throw error;
  },
};
