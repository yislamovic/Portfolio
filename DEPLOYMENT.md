# Deployment Guide

This guide covers deploying your portfolio to a VPS using Docker and managing blog posts with a Git-based workflow.

## Initial VPS Setup

### Prerequisites
- A VPS (Ubuntu 22.04 or similar recommended)
- Domain name pointed to your VPS IP
- SSH access to your VPS

### 1. Install Docker on VPS

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add your user to docker group
sudo usermod -aG docker $USER

# Install Docker Compose
sudo apt install docker-compose-plugin -y

# Verify installation
docker --version
docker compose version
```

### 2. Clone Repository on VPS

```bash
# Install Git if needed
sudo apt install git -y

# Clone your repository
cd ~
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

### 3. Initial Deployment

```bash
# Build and start the container
docker compose up -d --build

# Check if it's running
docker ps
docker logs yahya-portfolio

# Your site should now be accessible at http://your-vps-ip:3000
```

## Setting Up Reverse Proxy (Nginx)

### Install and Configure Nginx

```bash
# Install Nginx
sudo apt install nginx -y

# Create Nginx configuration
sudo nano /etc/nginx/sites-available/portfolio
```

Add this configuration:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site:

```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

### Enable SSL with Let's Encrypt

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Certbot will automatically configure Nginx for HTTPS
# Certificates auto-renew via cron
```

## Blog Post Workflow

### Creating a New Blog Post (Local Machine)

```bash
# 1. Create a new post using the script
npm run new-post

# Follow the prompts:
# - Enter post title
# - Enter excerpt
# - Enter tags (comma-separated)

# 2. Edit the generated file
# The file will be created at: posts/your-post-slug.mdx
# Edit it with your favorite editor

# 3. Commit and push
git add posts/your-post-slug.mdx
git commit -m "Add blog post: Your Post Title"
git push origin main
```

### Deploying Blog Updates (VPS)

**Option A: Manual Deployment**

```bash
# SSH into your VPS
ssh user@your-vps-ip

# Navigate to project
cd ~/portfolio

# Pull latest changes
git pull origin main

# Rebuild and restart container
docker compose up -d --build

# Verify deployment
docker logs yahya-portfolio --tail 50
```

**Option B: Automated Deployment with Git Hooks**

Create a deployment script on your VPS:

```bash
# Create deploy script
nano ~/deploy-portfolio.sh
```

Add this content:

```bash
#!/bin/bash

cd ~/portfolio

echo "🔄 Pulling latest changes..."
git pull origin main

echo "🐳 Rebuilding Docker container..."
docker compose up -d --build

echo "✅ Deployment complete!"
docker logs yahya-portfolio --tail 20
```

Make it executable:

```bash
chmod +x ~/deploy-portfolio.sh
```

Now you can deploy with:

```bash
ssh user@your-vps "~/deploy-portfolio.sh"
```

**Option C: GitHub Actions (Automated)**

Create `.github/workflows/deploy.yml` in your repository:

```yaml
name: Deploy to VPS

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to VPS
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USER }}
          key: ${{ secrets.VPS_SSH_KEY }}
          script: |
            cd ~/portfolio
            git pull origin main
            docker compose up -d --build
```

Add these secrets to your GitHub repository:
- `VPS_HOST`: Your VPS IP or domain
- `VPS_USER`: SSH username
- `VPS_SSH_KEY`: Your SSH private key

Now every push to main automatically deploys!

## Maintenance Commands

### View Logs

```bash
# View live logs
docker logs -f yahya-portfolio

# View last 50 lines
docker logs yahya-portfolio --tail 50
```

### Restart Container

```bash
# Restart without rebuilding
docker compose restart

# Rebuild and restart
docker compose up -d --build
```

### Stop/Remove Container

```bash
# Stop container
docker compose down

# Stop and remove all data
docker compose down -v
```

### Update Dependencies

```bash
# Pull latest code
git pull origin main

# Rebuild with no cache (for major updates)
docker compose build --no-cache
docker compose up -d
```

### Backup Blog Posts

```bash
# On VPS - create backup
tar -czf ~/portfolio-backup-$(date +%Y%m%d).tar.gz ~/portfolio/posts

# Download to local machine
scp user@your-vps:~/portfolio-backup-*.tar.gz ./backups/
```

## Monitoring

### Check Container Status

```bash
# Check if container is running
docker ps | grep yahya-portfolio

# Check resource usage
docker stats yahya-portfolio
```

### Check Nginx Status

```bash
sudo systemctl status nginx
sudo nginx -t  # Test configuration
```

### Check SSL Certificate

```bash
sudo certbot certificates
```

## Troubleshooting

### Container Won't Start

```bash
# Check logs
docker logs yahya-portfolio

# Check Docker Compose config
docker compose config

# Rebuild from scratch
docker compose down
docker compose build --no-cache
docker compose up -d
```

### Port Already in Use

```bash
# Find what's using port 3000
sudo lsof -i :3000

# Stop the process or change port in docker-compose.yml
```

### Git Pull Fails

```bash
# Check git status
git status

# Stash local changes if any
git stash

# Pull
git pull origin main

# Reapply stash if needed
git stash pop
```

### Nginx Not Serving Site

```bash
# Check Nginx errors
sudo tail -f /var/log/nginx/error.log

# Restart Nginx
sudo systemctl restart nginx

# Check if Next.js is running
curl http://localhost:3000
```

## Performance Optimization

### Enable Nginx Caching

Add to your Nginx configuration:

```nginx
# Add inside http block in /etc/nginx/nginx.conf
proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=my_cache:10m max_size=1g
                 inactive=60m use_temp_path=off;

# Then in your location block:
location / {
    proxy_cache my_cache;
    proxy_cache_valid 200 1h;
    proxy_cache_bypass $http_cache_control;
    # ... rest of proxy settings
}
```

### Enable Gzip Compression

Nginx usually has this enabled by default, but verify in `/etc/nginx/nginx.conf`:

```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
```

## Security Best Practices

1. **Keep System Updated**
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

2. **Configure Firewall**
   ```bash
   sudo ufw allow 22    # SSH
   sudo ufw allow 80    # HTTP
   sudo ufw allow 443   # HTTPS
   sudo ufw enable
   ```

3. **Disable Root Login**
   ```bash
   sudo nano /etc/ssh/sshd_config
   # Set: PermitRootLogin no
   sudo systemctl restart sshd
   ```

4. **Use SSH Keys Only**
   ```bash
   sudo nano /etc/ssh/sshd_config
   # Set: PasswordAuthentication no
   sudo systemctl restart sshd
   ```

5. **Keep Docker Updated**
   ```bash
   sudo apt update
   sudo apt install docker-ce docker-ce-cli containerd.io docker-compose-plugin
   ```

## Quick Reference

```bash
# Create new post (local)
npm run new-post

# Deploy changes (VPS)
git pull && docker compose up -d --build

# View logs
docker logs -f yahya-portfolio

# Restart
docker compose restart

# Stop
docker compose down
```

---

**Questions or Issues?** Check the logs first: `docker logs yahya-portfolio`
