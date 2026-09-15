# Environment Setup Guide

## Required Environment Variables

Create a `.env.local` file in the project root with the following variables:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

## How to Get These Values

### VITE_SUPABASE_URL
1. Log in to Supabase Dashboard
2. Select your project
3. Go to "Project Settings" (gear icon)
4. Click "API"
5. Copy the URL labeled "Project URL"
6. Format: `https://your-project-id.supabase.co`

### VITE_SUPABASE_ANON_KEY
1. Same location as above (Project Settings → API)
2. Copy the key labeled "anon public"
3. This is a long string starting with `eyJ...`

## Development Setup

```bash
# Install dependencies
npm install

# Create .env.local with your Supabase credentials
cp .env.example .env.local
# Edit .env.local with your actual values

# Start development server
npm run dev
```

## Production Setup

### Vercel Deployment

1. Push code to GitHub
2. Connect to Vercel
3. Add environment variables in Vercel dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy

### Netlify Deployment

1. Push code to GitHub
2. Connect to Netlify
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Add environment variables in Netlify UI
5. Deploy

### Custom Domain (chatgo.net)

1. Purchase domain from registrar
2. Point DNS to your hosting provider
3. Configure SSL certificate
4. Set up email forwarding (optional)

## Security Best Practices

1. **Never commit `.env.local`** to Git
   - Add to `.gitignore` (already done)

2. **Use `.env.example` for reference**
   - Only contains empty variable names
   - Never contains actual secrets

3. **Rotate keys periodically**
   - In Supabase, generate new API keys
   - Update in your deployment environments

4. **Use different keys per environment**
   - Development: One set of keys
   - Production: Different set of keys
   - Never use production keys in development

## Testing Locally

```bash
# Start dev server
npm run dev

# In another terminal, test with curl
curl http://localhost:5173

# Should see the CHAT GO application
```

## Building for Production

```bash
# Create production build
npm run build

# Test production build locally
npm run preview

# Visit http://localhost:4173
```

## Troubleshooting

### "Cannot find module '@supabase/supabase-js'"
- Run `npm install`
- Clear node_modules: `rm -rf node_modules && npm install`

### "Supabase client initialization failed"
- Check that `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set
- Verify values are correct (no extra spaces or quotes)
- Check `.env.local` file exists in project root

### "CORS errors"
- Ensure domain is in Supabase URL Configuration
- Check browser console for specific error
- May need to wait for DNS propagation

### "Authentication not working"
- Verify email provider is enabled in Supabase
- Check email templates are configured
- Ensure redirect URLs are correct
- Test with email that matches your domain
