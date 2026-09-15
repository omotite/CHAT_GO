# CHAT GO Deployment Guide

## Pre-Deployment Checklist

- [ ] Environment variables configured
- [ ] Database schema deployed
- [ ] Storage buckets created
- [ ] Authentication configured
- [ ] Domain purchased (chatgo.net)
- [ ] SSL certificate ready
- [ ] Admin email configured (Danielchatnet@gmail.com)
- [ ] All tests passing
- [ ] Build successful

## Deployment Options

## Option 1: Vercel (Recommended)

### Setup

1. **Create Vercel Account**
   - Go to https://vercel.com
   - Sign up with GitHub

2. **Connect Repository**
   - Import GitHub project
   - Select `omotite/CHAT_GO`

3. **Configure Environment**
   - Add environment variables:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`
   - Set build command: `npm run build`
   - Set output directory: `dist`

4. **Configure Domain**
   - In Vercel dashboard, go to Settings → Domains
   - Add `chatgo.net`
   - Update DNS records at domain registrar
   - Point to Vercel nameservers

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Test at https://chatgo.net

## Option 2: Netlify

### Setup

1. **Create Netlify Account**
   - Go to https://netlify.com
   - Sign up with GitHub

2. **Connect Repository**
   - Click "New site from Git"
   - Select GitHub
   - Choose `omotite/CHAT_GO`

3. **Configure Build**
   - Build command: `npm run build`
   - Publish directory: `dist`

4. **Environment Variables**
   - Site settings → Build & deploy → Environment
   - Add variables:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`

5. **Connect Domain**
   - Domain settings → Add custom domain
   - Point DNS to Netlify

## Option 3: Self-Hosted

### Requirements
- Server (VPS, AWS, DigitalOcean, etc.)
- Node.js 16+
- npm or yarn
- Nginx or Apache
- SSL certificate (Let's Encrypt)

### Setup

1. **Prepare Server**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade
   
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt install -y nodejs
   
   # Install Nginx
   sudo apt install -y nginx
   ```

2. **Deploy Application**
   ```bash
   # Clone repository
   cd /var/www
   git clone https://github.com/omotite/CHAT_GO.git
   cd CHAT_GO
   
   # Install dependencies
   npm install
   
   # Create .env.local
   cp .env.example .env.local
   # Edit with actual values
   
   # Build
   npm run build
   ```

3. **Setup Nginx**
   ```nginx
   # /etc/nginx/sites-available/chatgo.net
   server {
     listen 80;
     server_name chatgo.net www.chatgo.net;
     
     location / {
       root /var/www/CHAT_GO/dist;
       try_files $uri $uri/ /index.html;
     }
     
     # API proxy (if needed)
     location /api {
       proxy_pass http://localhost:3000;
     }
   }
   ```

4. **Enable HTTPS**
   ```bash
   sudo apt install -y certbot python3-certbot-nginx
   sudo certbot --nginx -d chatgo.net -d www.chatgo.net
   ```

5. **Setup Auto-Deployment**
   ```bash
   # Using GitHub Actions
   # See .github/workflows/deploy.yml
   ```

## Post-Deployment

### Health Checks

1. **Test Application**
   - Visit https://chatgo.net
   - Test signup
   - Test login
   - Test messaging
   - Test real-time features

2. **Monitor Performance**
   - Check lighthouse score
   - Monitor error rates
   - Check response times

3. **Security Check**
   - Run SSL test: https://www.ssllabs.com/ssltest/
   - Check CORS headers
   - Verify authentication

### Enable Analytics

1. **Supabase Logs**
   - Monitor database queries
   - Check API usage
   - Review errors

2. **Website Analytics**
   - Add Google Analytics (optional)
   - Monitor user behavior
   - Track feature usage

## Maintenance

### Regular Tasks

1. **Weekly**
   - Check error logs
   - Monitor database size
   - Verify backups

2. **Monthly**
   - Review performance metrics
   - Update dependencies
   - Analyze user feedback

3. **Quarterly**
   - Security audit
   - Performance optimization
   - Feature planning

### Updates

```bash
# Update dependencies
npm update

# Check for security vulnerabilities
npm audit

# Rebuild
npm run build

# Deploy
# Follow deployment process above
```

## Scaling

### Database
- Monitor query performance
- Add indexes if needed
- Archive old data
- Increase Supabase plan if needed

### Frontend
- Enable caching headers
- Optimize bundle size
- Use CDN (included with Vercel/Netlify)

### Backend
- Supabase auto-scales
- Monitor resource usage
- Upgrade plan if needed

## Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

### Environment Variables Not Working
- Verify variable names match
- Check format (no quotes)
- Redeploy after updating
- Clear browser cache

### Real-time Not Working
- Check Supabase replication enabled
- Verify subscription syntax
- Check browser websocket connection
- Review console errors

## Rollback

### Vercel
- Dashboard → Deployments
- Click previous deployment
- Click "Redeploy"

### Netlify
- Site dashboard → Deploys
- Click previous deploy
- Click "Publish deploy"

## Support

- Documentation: See `/docs` folder
- Issues: GitHub Issues
- Community: GitHub Discussions
