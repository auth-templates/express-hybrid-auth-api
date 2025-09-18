# CDN Assets

This folder contains assets that are served directly by MinIO via volume mapping for use in email templates and other static content.

**Note**: Files in this folder are directly accessible to the MinIO container via volume mapping - no upload process needed!

## Files Included

### Static Directory (`static/`)
- `logo.png` - Company logo for email headers (150x45px recommended)
- `header.png` - Header image for emails
- `footer.png` - Footer image for emails
- `logo.svg` - Vector version of the logo
- `logo-placeholder.png` - Placeholder logo image
- `icons/email-icon.png` - Email-related icons

### Root Directory
- `email-header.jpg` - Header image for email templates (600x200px recommended)
- `company-icon.svg` - Scalable company icon
- `email-footer.png` - Footer image for email branding (600x100px recommended)

## How to Use

### 1. Start MinIO
```bash
docker-compose -f .devcontainer/docker-compose.dev.yml up -d
```

### 2. Access via Public URLs
Once MinIO is running, you can access these assets directly via:
- `http://localhost:9000/public-assets/static/logo.png`
- `http://localhost:9000/public-assets/static/header.png`
- `http://localhost:9000/public-assets/static/footer.png`
- `http://localhost:9000/public-assets/email-header.jpg`
- `http://localhost:9000/public-assets/company-icon.svg`
- `http://localhost:9000/public-assets/email-footer.png`

### 3. Use in Email Templates
In your email templates, use the environment variable:
```javascript
const logoUrl = `${process.env.CDN_URL}/static/logo.png`;
// Results in: http://localhost:9000/public-assets/static/logo.png
```

## Replacing with Real Assets

To use real image files:
1. Replace the placeholder files with actual PNG/JPG/SVG files
2. Keep the same filenames
3. Restart MinIO: `docker-compose -f .devcontainer/docker-compose.dev.yml restart minio`

## Production Setup

For production, update the `CDN_URL` environment variable to point to your production CDN:
```bash
CDN_URL=https://your-cdn-domain.com/assets
```