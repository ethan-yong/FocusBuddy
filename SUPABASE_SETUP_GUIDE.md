# FocusBuddy Supabase Setup Guide

## ✅ Completed Steps

All code files have been created! Here's what's ready:

- ✅ Dependencies installed
- ✅ Environment files created (`.env`, `.env.example`)
- ✅ Supabase client configured
- ✅ TypeScript types defined
- ✅ All service files created (auth, task, session, storage)
- ✅ Auth context provider set up
- ✅ Test screen created
- ✅ App.json updated with AsyncStorage plugin

## 🔧 Manual Steps Required

You need to complete these steps in the Supabase dashboard:

---

### Step 1: Create Supabase Project (5 minutes)

1. **Go to [supabase.com](https://supabase.com)** and sign up/login
2. **Click "New Project"**
3. **Fill in:**
   - Project Name: `focusbuddy`
   - Database Password: Generate a strong password and **SAVE IT SECURELY**
   - Region: Choose closest to your location (e.g., `Southeast Asia (Singapore)`)
4. **Wait ~2 minutes** for project provisioning
5. **Once ready**, go to **Settings → API** and copy:
   - **Project URL** (looks like `https://xxxxx.supabase.co`)
   - **anon/public key** (a long JWT token starting with `eyJ...`)

6. **Update your `.env` file** with these credentials:
   ```bash
   # Open .env and replace with your actual values
   EXPO_PUBLIC_SUPABASE_URL=https://your-actual-project.supabase.co
   EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

---

### Step 2: Create Database Tables (10 minutes)

1. **In Supabase dashboard**, go to **SQL Editor**
2. **Click "New query"**
3. **Copy and paste this entire SQL script:**

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  display_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tasks table
CREATE TABLE public.tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  duration INTEGER NOT NULL, -- in minutes
  priority TEXT CHECK (priority IN ('low', 'medium', 'high')) DEFAULT 'medium',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sessions table (focus session records)
CREATE TABLE public.sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  task_id UUID REFERENCES public.tasks(id) ON DELETE SET NULL,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE,
  proof_photos TEXT[], -- array of storage URLs
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Streaks table (gamification)
CREATE TABLE public.streaks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_completed_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Friendships table (social features)
CREATE TABLE public.friendships (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  friend_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  status TEXT CHECK (status IN ('pending', 'accepted', 'rejected')) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, friend_id),
  CHECK (user_id != friend_id)
);

-- Indexes for performance
CREATE INDEX idx_tasks_user_id ON public.tasks(user_id);
CREATE INDEX idx_sessions_user_id ON public.sessions(user_id);
CREATE INDEX idx_sessions_task_id ON public.sessions(task_id);
CREATE INDEX idx_streaks_user_id ON public.streaks(user_id);
CREATE INDEX idx_friendships_user_id ON public.friendships(user_id);
CREATE INDEX idx_friendships_friend_id ON public.friendships(friend_id);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.streaks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.friendships ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for tasks
CREATE POLICY "Users can view own tasks" ON public.tasks
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own tasks" ON public.tasks
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tasks" ON public.tasks
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own tasks" ON public.tasks
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for sessions
CREATE POLICY "Users can view own sessions" ON public.sessions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own sessions" ON public.sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own sessions" ON public.sessions
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for streaks
CREATE POLICY "Users can view own streaks" ON public.streaks
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own streaks" ON public.streaks
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own streaks" ON public.streaks
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for friendships
CREATE POLICY "Users can view own friendships" ON public.friendships
  FOR SELECT USING (auth.uid() = user_id OR auth.uid() = friend_id);

CREATE POLICY "Users can insert own friendships" ON public.friendships
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update friendships" ON public.friendships
  FOR UPDATE USING (auth.uid() = user_id OR auth.uid() = friend_id);

CREATE POLICY "Users can delete own friendships" ON public.friendships
  FOR DELETE USING (auth.uid() = user_id);

-- Function to auto-create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, display_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'display_name');
  
  INSERT INTO public.streaks (user_id)
  VALUES (NEW.id);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call function on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

4. **Click "Run"** or press `Ctrl+Enter`
5. **Verify success** - you should see "Success. No rows returned"
6. **Go to Table Editor** and verify you see 5 tables: users, tasks, sessions, streaks, friendships

---

### Step 3: Enable Authentication (5 minutes)

#### Email Authentication (Already Enabled by Default)
1. Go to **Authentication → Providers**
2. Email should already be enabled ✓

#### Google OAuth (Optional but Recommended)
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable **Google+ API**
4. Go to **Credentials → Create Credentials → OAuth 2.0 Client ID**
5. Configure consent screen:
   - App name: `FocusBuddy`
   - User support email: your email
   - Developer contact: your email
6. Create **Web application** client:
   - Name: `FocusBuddy Web`
   - **Authorized redirect URIs**: Add your Supabase callback:
     ```
     https://your-project.supabase.co/auth/v1/callback
     ```
     (Replace `your-project` with your actual project URL)
7. Copy **Client ID** and **Client Secret**
8. In Supabase → **Authentication → Providers → Google**:
   - Enable Google provider
   - Paste Client ID
   - Paste Client Secret
   - Click **Save**

---

### Step 4: Configure Storage (5 minutes)

1. **Go to Storage** in Supabase dashboard
2. **Click "New Bucket"**
3. **Create bucket:**
   - Name: `proof_images`
   - Public: **No** (keep it private)
   - Click **Create bucket**

4. **Set up RLS Policies:**
   - Click on the `proof_images` bucket
   - Go to **Policies** tab
   - Click **New Policy** → **For full customization**
   
5. **Add three policies** (click "New Policy" for each):

**Policy 1: Allow users to upload**
```sql
CREATE POLICY "Users can upload own images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'proof_images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);
```

**Policy 2: Allow users to view their images**
```sql
CREATE POLICY "Users can view own images"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'proof_images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);
```

**Policy 3: Allow users to delete their images**
```sql
CREATE POLICY "Users can delete own images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'proof_images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);
```

---

## 🧪 Testing Your Setup

Once you've completed the manual steps:

1. **Start your app:**
   ```bash
   npm start
   ```

2. **Open in Expo Go** on your Android phone (scan QR code)

3. **Test the connection:**
   - You should see the app load without errors
   - The app is ready for you to build authentication screens

---

## 📁 Project Structure

Your project now has this structure:

```
FocusBuddy/
├── .env                          # Your API credentials (DO NOT COMMIT)
├── .env.example                  # Template for environment variables
├── app.json                      # Updated with AsyncStorage plugin
├── src/
│   ├── contexts/
│   │   └── AuthContext.tsx       # Global auth state management
│   ├── services/
│   │   ├── supabaseClient.ts     # Supabase client initialization
│   │   ├── authService.ts        # Authentication methods
│   │   ├── taskService.ts        # Task CRUD operations
│   │   ├── sessionService.ts     # Session management
│   │   └── storageService.ts     # Image upload/delete
│   ├── types/
│   │   └── database.types.ts     # TypeScript type definitions
│   └── screens/
│       ├── HomeScreen.tsx
│       └── TestSupabaseScreen.tsx # For testing Supabase connection
└── App.tsx                       # Updated with AuthProvider
```

---

## 🎯 Next Steps

Now that your backend is set up, you can:

1. **Build authentication screens:**
   - Login screen
   - Sign up screen
   - Password reset

2. **Build feature screens:**
   - Task management
   - Focus timer
   - Session history
   - Friend system
   - Profile page

3. **Use the services in your components:**

```typescript
import { authService } from '@/services/authService';
import { taskService } from '@/services/taskService';
import { useAuth } from '@/contexts/AuthContext';

// In your component:
const { user } = useAuth();

// Sign up
await authService.signUp('email@example.com', 'password123', 'Display Name');

// Add a task
await taskService.addTask('Study React Native', 60, 'high');

// Get tasks
const tasks = await taskService.getTasks();
```

---

## 🆘 Troubleshooting

### "Cannot find module '@supabase/supabase-js'"
- Run: `npm install`

### "EXPO_PUBLIC_SUPABASE_URL is undefined"
- Make sure `.env` file is in project root
- Restart Metro bundler: `npm start --clear`

### "Row Level Security policy violation"
- Check that you ran all the RLS policy SQL scripts
- Verify user is authenticated before making requests

### Storage upload fails
- Ensure `proof_images` bucket exists
- Check that storage RLS policies are set up correctly

---

## 📚 Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth with React Native](https://supabase.com/docs/guides/auth/auth-helpers/react-native)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

---

**You're all set!** Once you complete the manual steps above, your FocusBuddy app will have a fully functional backend ready for MVP development. 🚀
