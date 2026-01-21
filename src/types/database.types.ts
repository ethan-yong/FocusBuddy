export type User = {
  id: string;
  email: string;
  display_name: string | null;
  created_at: string;
};

export type Task = {
  id: string;
  user_id: string;
  name: string;
  duration: number;
  priority: 'low' | 'medium' | 'high';
  created_at: string;
};

export type Session = {
  id: string;
  task_id: string | null;
  user_id: string;
  start_time: string;
  end_time: string | null;
  proof_photos: string[] | null;
  completed: boolean;
  created_at: string;
};

export type Streak = {
  id: string;
  user_id: string;
  current_streak: number;
  longest_streak: number;
  last_completed_date: string | null;
  created_at: string;
};

export type Friendship = {
  id: string;
  user_id: string;
  friend_id: string;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
};
