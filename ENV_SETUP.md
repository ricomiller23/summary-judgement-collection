# Environment Variables for Good Dogg Command Center

## Required Keys

### Database (PostgreSQL)
```
DATABASE_URL="postgresql://username:password@host:5432/good_dogg_db"
```

### Resend API for email delivery
Get your key at https://resend.com
```
RESEND_API_KEY="re_xxxxxxxxxxxxx"
RECON_FROM_EMAIL="recon@your-domain.com"
```

### Serper API for OSINT searches
Get your key at https://serper.dev
```
SERPER_API_KEY="your-serper-api-key"
```

## Setup Instructions

1. Copy these variables to your `.env` file
2. Replace placeholder values with your actual keys
3. For Vercel deployment, add these in the Vercel dashboard under Settings → Environment Variables
