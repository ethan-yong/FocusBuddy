# FocusBuddy Setup Checklist

Use this checklist to track your progress through the manual Supabase setup steps.

## ✅ Code Implementation (COMPLETED)
- [x] Install dependencies
- [x] Create environment files
- [x] Create Supabase client
- [x] Create TypeScript types
- [x] Create auth service
- [x] Create task service
- [x] Create session service
- [x] Create storage service
- [x] Create auth context
- [x] Update App.tsx
- [x] Create test screen

---

## 📝 Manual Supabase Setup (TODO)

### Step 1: Create Supabase Project
- [ ] Go to [supabase.com](https://supabase.com)
- [ ] Create new project named `focusbuddy`
- [ ] Save database password securely
- [ ] Wait for project to finish provisioning (~2 min)
- [ ] Go to Settings → API
- [ ] Copy Project URL
- [ ] Copy anon/public key
- [ ] Update `.env` file with these credentials

**Files to update:**
- `.env` (replace placeholder values)

---

### Step 2: Create Database Tables
- [ ] Open Supabase dashboard
- [ ] Go to SQL Editor
- [ ] Click "New query"
- [ ] Open `supabase-setup.sql` in your code editor
- [ ] Copy entire contents
- [ ] Paste into SQL Editor
- [ ] Click "Run" (or Ctrl+Enter)
- [ ] Verify success message
- [ ] Go to Table Editor
- [ ] Confirm 5 tables exist: users, tasks, sessions, streaks, friendships

**Files to use:**
- `supabase-setup.sql`

---

### Step 3: Enable Authentication

#### Email Auth (Default - Already Enabled)
- [ ] Go to Authentication → Providers
- [ ] Verify Email is enabled (should be by default)

#### Google OAuth (Optional but Recommended)
- [ ] Go to [Google Cloud Console](https://console.cloud.google.com)
- [ ] Create/select project
- [ ] Enable Google+ API
- [ ] Create OAuth 2.0 credentials
- [ ] Configure consent screen
  - [ ] App name: FocusBuddy
  - [ ] User support email
  - [ ] Developer contact email
- [ ] Create Web application client
- [ ] Add authorized redirect URI: `https://YOUR-PROJECT.supabase.co/auth/v1/callback`
- [ ] Copy Client ID
- [ ] Copy Client Secret
- [ ] Go back to Supabase
- [ ] Authentication → Providers → Google
- [ ] Enable Google provider
- [ ] Paste Client ID
- [ ] Paste Client Secret
- [ ] Click Save

---

### Step 4: Configure Storage
- [ ] Go to Storage in Supabase dashboard
- [ ] Click "New Bucket"
- [ ] Name: `proof_images`
- [ ] Public: **No** (keep private)
- [ ] Click "Create bucket"
- [ ] Click on `proof_images` bucket
- [ ] Go to Policies tab
- [ ] Open `supabase-storage-policies.sql` in code editor
- [ ] Create Policy 1: "Users can upload own images"
  - [ ] Click "New Policy" → "For full customization"
  - [ ] Copy/paste first policy from file
  - [ ] Review and save
- [ ] Create Policy 2: "Users can view own images"
  - [ ] Click "New Policy" → "For full customization"
  - [ ] Copy/paste second policy from file
  - [ ] Review and save
- [ ] Create Policy 3: "Users can delete own images"
  - [ ] Click "New Policy" → "For full customization"
  - [ ] Copy/paste third policy from file
  - [ ] Review and save

**Files to use:**
- `supabase-storage-policies.sql`

---

## 🧪 Testing

### Test 1: Start the App
- [ ] Run `npm start` in terminal
- [ ] Scan QR code with Expo Go on Android phone
- [ ] App loads without errors
- [ ] No red error screens

### Test 2: Verify Connection (Optional)
- [ ] Update AppNavigator to include TestSupabaseScreen
- [ ] Navigate to test screen
- [ ] See "Not logged in" message
- [ ] Try creating a test account
- [ ] Connection test should work

---

## 🎯 Ready to Build Features

Once all checkboxes above are complete:
- [ ] Backend is fully configured ✓
- [ ] Ready to build Login/Signup screens
- [ ] Ready to build Task management UI
- [ ] Ready to build Focus timer
- [ ] Ready to build Session history
- [ ] Ready to build Friend system

---

## 📚 Quick Reference

**Documentation files:**
- `IMPLEMENTATION_SUMMARY.md` - What was implemented
- `SUPABASE_SETUP_GUIDE.md` - Detailed setup instructions
- `supabase-setup.sql` - Database setup script
- `supabase-storage-policies.sql` - Storage policies script

**Key files created:**
- `src/services/supabaseClient.ts` - Client initialization
- `src/services/authService.ts` - Authentication
- `src/services/taskService.ts` - Task CRUD
- `src/services/sessionService.ts` - Session management
- `src/services/storageService.ts` - File uploads
- `src/contexts/AuthContext.tsx` - Global auth state
- `src/types/database.types.ts` - TypeScript types

---

## ⏱️ Estimated Time

- **Code implementation:** ✅ DONE
- **Manual setup:** ~15-25 minutes
  - Step 1 (Project): ~5 min
  - Step 2 (Database): ~5 min
  - Step 3 (Auth): ~2 min (Email only) or ~10 min (with Google)
  - Step 4 (Storage): ~5 min
  - Testing: ~3 min

**Total: 15-25 minutes to launch!** 🚀
