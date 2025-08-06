# Security Configuration

## ⚠️ IMPORTANT: Environment Variables

This application requires proper security configuration. Never commit sensitive data to the repository.

## Required Environment Variables

### 1. Admin Password
```bash
ADMIN_PASSWORD="your_secure_password_here"
```
- **REQUIRED**: Must be set before running the application
- Use a strong, unique password (minimum 16 characters recommended)
- Never use default or example passwords in production
- Change this password regularly

### 2. Database Configuration
For production with PostgreSQL:
```bash
POSTGRES_URL="your_connection_string"
POSTGRES_PRISMA_URL="your_prisma_connection_string"
POSTGRES_URL_NON_POOLING="your_non_pooling_connection_string"
```

## Security Best Practices

### For Local Development
1. Copy `.env.example` to `.env`
2. Set a unique ADMIN_PASSWORD
3. Never commit `.env` files

### For Production (Vercel)
1. Set environment variables in Vercel Dashboard
2. Use Vercel's secret management
3. Enable audit logs
4. Use different passwords for different environments

### Password Requirements
- Minimum 16 characters
- Mix of uppercase, lowercase, numbers, and symbols
- No dictionary words or personal information
- Unique for this application

## Secure Deployment Checklist

- [ ] Changed ADMIN_PASSWORD from default
- [ ] .env file is in .gitignore
- [ ] No secrets in code or commits
- [ ] Environment variables set in hosting platform
- [ ] Database credentials secured
- [ ] HTTPS enabled on production
- [ ] Regular security updates applied

## Reporting Security Issues

If you discover a security vulnerability, please:
1. Do NOT create a public GitHub issue
2. Email the maintainers privately
3. Allow time for a fix before public disclosure

## Authentication Flow

The admin panel uses token-based authentication:
1. Password verification against ADMIN_PASSWORD env variable
2. Secure token generation
3. Token stored in database with expiration
4. Client stores token in localStorage
5. Token validated on each admin request

## Data Protection

- No user tracking or analytics
- No personal data collection
- Admin actions are not logged by default
- All data stays in your own database

## Regular Maintenance

1. Review and rotate passwords quarterly
2. Update dependencies monthly
3. Monitor for security advisories
4. Review access logs if available