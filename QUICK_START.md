# CHAT GO - Comprehensive Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### Step 1: Clone and Install
```bash
git clone https://github.com/omotite/CHAT_GO.git
cd CHAT_GO
npm install
```

### Step 2: Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Create new project
   - Name: `CHAT_GO`
   - Region: Choose closest to you
4. Wait for initialization (2-5 minutes)

### Step 3: Setup Database
1. Go to SQL Editor in Supabase
2. Create new query
3. Copy entire content of `database/schema.sql`
4. Paste and run

### Step 4: Configure Environment
1. Copy `.env.example` to `.env.local`
2. Get credentials from Supabase:
   - Project Settings → API
   - Copy Project URL → `VITE_SUPABASE_URL`
   - Copy `anon public` key → `VITE_SUPABASE_ANON_KEY`
3. Save `.env.local`

### Step 5: Start Development
```bash
npm run dev
```

Visit `http://localhost:5173` - You're done! 🎉

## 📱 Create Test Account

1. Click "Sign Up"
2. Enter email and password
3. Confirm email (check inbox)
4. Start chatting!

## 🔧 Common Commands

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Check code
npm run type-check   # TypeScript check
```

## 📚 Full Documentation

- **[Database Setup](./docs/DATABASE_SETUP.md)** - Detailed database guide
- **[Supabase Setup](./docs/SUPABASE_SETUP.md)** - Complete Supabase walkthrough
- **[Environment Setup](./docs/ENV_SETUP.md)** - All environment variables
- **[Deployment](./docs/DEPLOYMENT.md)** - Deploy to production

## ⚠️ Troubleshooting

### "Cannot find Supabase"
- Check `.env.local` exists
- Verify credentials are correct (no extra spaces)
- Restart dev server

### "Database connection failed"
- Verify project is running in Supabase
- Check internet connection
- Try running schema.sql again

### "Authentication not working"
- Enable Email provider in Supabase Auth
- Verify email templates
- Check redirect URLs in Project Settings

## 🎯 Next Steps

1. ✅ Test signup/login
2. ✅ Send messages
3. ✅ Create a group
4. ✅ Search users
5. ✅ Deploy to production (see DEPLOYMENT.md)

## 📞 Support

- Email: support@chatgo.net
- GitHub: Open an issue
- Docs: Check `/docs` folder

---

**Enjoy CHAT GO! Connect • Chat • Share**
