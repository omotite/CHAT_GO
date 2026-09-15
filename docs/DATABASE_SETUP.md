# Database Setup Guide for CHAT GO

## Prerequisites

- Supabase account
- Access to Supabase SQL editor
- Basic SQL knowledge

## Setup Instructions

### Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Enter project details:
   - Name: `CHAT_GO`
   - Password: Choose a strong password
   - Region: Select your preferred region
5. Wait for the project to initialize

### Step 2: Run Database Schema

1. Go to your Supabase project dashboard
2. Click "SQL Editor" in the left sidebar
3. Click "New Query"
4. Copy the entire content from `database/schema.sql`
5. Paste it into the SQL editor
6. Click "Run" to execute

### Step 3: Set Up Authentication

1. In Supabase dashboard, go to "Authentication"
2. Click "Providers"
3. Configure Email provider:
   - Enable email/password
   - Set up email templates (optional)
4. Go to "URL Configuration"
5. Add your domain to "Site URL"
6. Add redirect URLs for auth callbacks

### Step 4: Configure Storage Buckets

1. Go to "Storage" in the left sidebar
2. Create new buckets:
   - `avatars` - For user profile pictures
   - `messages` - For shared images in messages
   - `group-avatars` - For group profile pictures

3. For each bucket, update RLS policies:
   - Click on bucket settings
   - Add policy to allow authenticated users to upload

### Step 5: Enable Realtime

1. Go to "Database" → "Replication"
2. Enable replication for tables:
   - `messages`
   - `notifications`
   - `groups`
   - `group_members`
   - `user_status`

### Step 6: Get API Credentials

1. Go to "Project Settings" (gear icon)
2. Click "API"
3. Copy:
   - `Project URL` → Use as `VITE_SUPABASE_URL`
   - `anon public` key → Use as `VITE_SUPABASE_ANON_KEY`

### Step 7: Configure Environment Variables

1. In your project root, create `.env.local`:
```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

## Database Schema Overview

### Tables

#### `profiles`
Stores user profile information
- User profile data (username, email, bio)
- Avatar URL
- Privacy settings (public/private)
- Language preference

#### `messages`
Stores both direct and group messages
- Sender information
- Recipient (for DMs) or Group (for group chats)
- Message content and images
- Emoji reactions (stored as JSONB)

#### `groups`
Manages group chat information
- Group name and description
- Owner and visibility settings
- Group avatar URL

#### `group_members`
Tracks group membership
- User roles (owner, admin, member)
- Join timestamps

#### `reports`
Handles user and content reports for moderation
- Report type (user or message)
- Reason and description
- Status tracking (pending, reviewed, resolved)
- Action taken records

#### `notifications`
Stores real-time notifications
- Notification type (message, invite, request)
- Related user or message
- Read status

#### `blocked_users`
Manages user blocking relationships
- Blocker and blocked user IDs
- Prevents communication

#### `user_status`
Tracks online/offline status
- Is online status
- Last seen timestamp

## Security Features

### Row Level Security (RLS)
- All tables have RLS enabled
- Users can only see their own data by default
- Public profiles can be viewed by anyone
- Admin can access moderation data

### Authentication
- Email verification required
- Secure password hashing
- Session management via Supabase Auth

### Data Validation
- CHECK constraints on database
- Type safety with TypeScript
- Input validation in application

## Troubleshooting

### "Missing profiles table"
- Run the schema.sql file again
- Ensure all SQL executed without errors

### "RLS policy errors"
- Check that RLS is enabled on tables
- Verify policies are created correctly
- Test with authenticated user

### "Realtime not working"
- Enable replication for required tables
- Check network connectivity
- Verify Realtime subscriptions in code

## Backups

### Automated Backups
- Supabase provides daily backups
- Go to "Project Settings" → "Database"
- Backups are automatically created

### Manual Export
1. Go to "Database" → "Backups"
2. Click "Request a backup"
3. Download when ready

## Performance Optimization

### Indexes
Database includes indexes on:
- User searches (username, email)
- Message queries (sender, recipient, group)
- Report filtering (status)
- Notification queries

### Query Optimization
- Use LIMIT for result sets
- Filter by date range when possible
- Use specific SELECT columns

## Support

For Supabase support:
- Documentation: https://supabase.com/docs
- GitHub Issues: https://github.com/supabase/supabase/issues
- Community Discord: https://discord.supabase.io
