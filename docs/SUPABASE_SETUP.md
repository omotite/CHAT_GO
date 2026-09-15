# Supabase Implementation Guide

## Overview

CHAT GO uses Supabase as its backend, providing:
- PostgreSQL database
- Authentication (email/password)
- Real-time subscriptions
- File storage
- Row-level security

## Setting Up Supabase

### 1. Create Account

1. Go to https://supabase.com
2. Click "Start your project"
3. Sign up with email or GitHub

### 2. Create Project

1. Click "New Project"
2. Fill in details:
   - **Name**: CHAT_GO
   - **Password**: Generate strong password (save it!)
   - **Region**: Choose closest to your users
   - **Organization**: Create or select
3. Wait for project initialization (2-5 minutes)

### 3. Database Setup

See [DATABASE_SETUP.md](./DATABASE_SETUP.md) for detailed instructions.

## Authentication Configuration

### Email/Password Auth

1. In Supabase Dashboard → Authentication → Providers
2. Ensure "Email" is enabled
3. Configure email templates:
   - Confirmation email
   - Password reset email
   - Magic link email

### Redirect URLs

In Project Settings → Authentication → URL Configuration:

```
# Development
http://localhost:5173
http://localhost:5173/auth/callback

# Production
https://chatgo.net
https://chatgo.net/auth/callback
https://www.chatgo.net
https://www.chatgo.net/auth/callback
```

## Storage Buckets

Create buckets for file uploads:

### 1. Avatars Bucket
```
Name: avatars
Public: Yes
Max upload size: 5MB
```

Add policy:
```sql
ALLOW authenticated users to upload to storage.objects
WHERE bucket_id = 'avatars'
```

### 2. Messages Bucket
```
Name: messages
Public: Yes
Max upload size: 50MB
```

### 3. Group Avatars Bucket
```
Name: group-avatars
Public: Yes
Max upload size: 5MB
```

## Real-time Setup

### Enable Replication

In Database → Replication, enable for:
- messages
- notifications
- groups
- group_members
- user_status

### Real-time Subscriptions

In Application code:

```typescript
// Subscribe to messages
const subscription = supabase
  .from('messages:group_id=eq.GROUP_ID')
  .on('*', (payload) => {
    console.log('Change received!', payload)
  })
  .subscribe()

// Cleanup
subscription.unsubscribe()
```

## Security Policies

### Row Level Security (RLS)

All tables have RLS enabled with policies:

1. **Users can only see their own data**
   ```sql
   CREATE POLICY "Users can view their own data"
   ON profiles FOR SELECT
   USING (auth.uid() = id)
   ```

2. **Public profiles are visible to all**
   ```sql
   CREATE POLICY "Anyone can view public profiles"
   ON profiles FOR SELECT
   USING (privacy = 'public')
   ```

3. **Users can only send messages to non-blocked users**
   ```sql
   CREATE POLICY "Users can send messages"
   ON messages FOR INSERT
   WITH CHECK (
     auth.uid() = sender_id AND
     NOT EXISTS (
       SELECT 1 FROM blocked_users
       WHERE blocker_id = recipient_id AND blocked_id = auth.uid()
     )
   )
   ```

## Admin Configuration

### Admin Email
Set in application:
```typescript
const ADMIN_EMAIL = 'Danielchatnet@gmail.com'
```

Admin features:
- View all users
- Moderate content
- Suspend/ban users
- View analytics

NOTE: Implement additional role-based access control in production

## Backup and Recovery

### Automated Backups
- Supabase creates daily backups automatically
- Accessible in Project Settings → Database → Backups
- Retention: 7 days (Starter), 30 days (Pro)

### Manual Backup
```bash
# Request backup in Supabase dashboard
# Download SQL dump
# Store securely
```

## Monitoring

### Performance Monitoring
- Supabase Dashboard → Logs
- Monitor slow queries
- Check connection count

### Error Tracking
- Check browser console
- Supabase logs for backend errors
- Set up error reporting (Sentry, etc.)

## Scaling

### Database Optimization
1. Add indexes for frequently queried columns
2. Archive old messages
3. Optimize query performance

### Upgrade Path
- Starter: Development, small projects
- Pro: Production, up to 1M requests/month
- Team: Large projects, custom SLA

## Troubleshooting

### Connection Issues
```
Error: Cannot connect to Supabase

Solution:
1. Verify URL and key in .env.local
2. Check project is running (not paused)
3. Check internet connection
4. Verify CORS settings
```

### Authentication Issues
```
Error: User not authenticated

Solution:
1. Verify email provider enabled
2. Check redirect URLs
3. Test with valid email
4. Check email for confirmation link
```

### Real-time Not Working
```
Error: Real-time updates not received

Solution:
1. Verify replication enabled for table
2. Check browser console for errors
3. Verify subscription syntax
4. Test with developer tools
```

## Additional Resources

- Supabase Docs: https://supabase.com/docs
- PostgreSQL Docs: https://www.postgresql.org/docs/
- Real-time: https://supabase.com/docs/guides/realtime
- Storage: https://supabase.com/docs/guides/storage
- Auth: https://supabase.com/docs/guides/auth
