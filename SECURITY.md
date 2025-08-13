# 🔒 InnstaStay Security Documentation

## Security Overview

InnstaStay implements comprehensive security measures to protect user data, prevent attacks, and ensure secure operations.

## ✅ Security Measures Implemented

### 1. **API Key Security**
- ✅ **Server-side only**: All API keys (`SERPAPI_KEY`) are stored server-side
- ✅ **Environment variables**: Properly configured in `.env.local` (excluded from git)
- ✅ **No client exposure**: API keys never exposed to client-side code

### 2. **Input Validation & Sanitization**
- ✅ **Date validation**: Strict YYYY-MM-DD format with range checking
- ✅ **Traveler limits**: Adults (1-10), Children (0-10)
- ✅ **Input sanitization**: HTML tag removal, length limits
- ✅ **Slug validation**: Alphanumeric and hyphens only
- ✅ **Parameter validation**: All required parameters checked

### 3. **Rate Limiting**
- ✅ **IP-based limiting**: 30 requests per minute per IP
- ✅ **Memory-based cache**: Efficient rate limiting implementation
- ✅ **429 responses**: Proper rate limit error responses

### 4. **Security Headers**
- ✅ **X-Frame-Options**: DENY (prevents clickjacking)
- ✅ **X-Content-Type-Options**: nosniff (prevents MIME sniffing)
- ✅ **X-XSS-Protection**: 1; mode=block (XSS protection)
- ✅ **Referrer-Policy**: strict-origin-when-cross-origin
- ✅ **Permissions-Policy**: camera=(), microphone=(), geolocation=()
- ✅ **Content-Security-Policy**: Comprehensive CSP with allowed domains
- ✅ **Strict-Transport-Security**: HSTS with preload

### 5. **CORS Protection**
- ✅ **Origin validation**: Only allowed origins can access API
- ✅ **Method restrictions**: GET and OPTIONS only
- ✅ **Header restrictions**: Content-Type only

### 6. **No Critical Vulnerabilities**
- ✅ **No eval()**: No dynamic code execution
- ✅ **No document.write()**: No dangerous DOM manipulation
- ✅ **No SQL injection**: No database queries
- ✅ **No localStorage**: No sensitive client-side storage
- ✅ **No innerHTML**: All dangerouslySetInnerHTML uses are safe (JSON-LD schema)

### 7. **External API Security**
- ✅ **HTTPS only**: All external API calls use HTTPS
- ✅ **Domain validation**: Only trusted domains allowed
- ✅ **Error handling**: Graceful fallbacks for API failures

## 🔧 Security Configuration

### Environment Variables
```bash
# Required
SERPAPI_KEY=your_serpapi_key_here

# Optional
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=production
```

### Security Headers Configuration
```javascript
// next.config.js
async headers() {
  return [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Content-Security-Policy', value: '...' },
        { key: 'Strict-Transport-Security', value: '...' },
        // ... more headers
      ],
    },
  ];
}
```

## 🛡️ Security Features

### Input Sanitization
- HTML tag removal: `<script>` → `script`
- Length limiting: Max 100 characters
- Ampersand escaping: `&` → `&amp;`

### Date Validation
- Format: YYYY-MM-DD only
- Range: Future dates only (not past)
- Maximum: 1 year in the future
- Logic: Checkout must be after checkin

### Rate Limiting
- Window: 1 minute
- Limit: 30 requests per IP
- Storage: In-memory cache
- Reset: Automatic after window expires

### Content Security Policy
```
default-src 'self';
script-src 'self' 'unsafe-inline';
style-src 'self' 'unsafe-inline';
img-src 'self' data: https:;
font-src 'self' data:;
connect-src 'self' https://serpapi.com https://lh3.googleusercontent.com https://maps.googleapis.com https://images.unsplash.com;
frame-src 'none';
object-src 'none';
base-uri 'self';
form-action 'self';
```

## 🚨 Security Monitoring

### Logging
- API request logging
- Error logging with sanitized data
- Rate limit violation logging

### Error Handling
- Generic error messages (no sensitive data exposure)
- Proper HTTP status codes
- Graceful degradation

## 📋 Security Checklist

### Pre-Launch
- [x] API keys secured
- [x] Input validation implemented
- [x] Rate limiting configured
- [x] Security headers set
- [x] CORS configured
- [x] HTTPS enforced
- [x] Error handling implemented
- [x] Logging configured

### Ongoing
- [ ] Regular security audits
- [ ] Dependency updates
- [ ] Security monitoring
- [ ] Penetration testing
- [ ] Security incident response plan

## 🔍 Security Testing

### Manual Testing
1. **Input validation**: Try invalid dates, large numbers, special characters
2. **Rate limiting**: Make 31 requests in 1 minute
3. **CORS**: Test from unauthorized origins
4. **XSS**: Try script injection in search parameters
5. **CSRF**: Test cross-site request forgery

### Automated Testing
```bash
# Run security tests
npm run test:security

# Check dependencies for vulnerabilities
npm audit

# Run linting with security rules
npm run lint:security
```

## 🚨 Incident Response

### Security Breach Response
1. **Immediate**: Isolate affected systems
2. **Assessment**: Determine scope and impact
3. **Containment**: Stop the breach
4. **Eradication**: Remove threat
5. **Recovery**: Restore systems
6. **Lessons**: Document and improve

### Contact Information
- **Security Team**: security@innstastay.com
- **Emergency**: +1-XXX-XXX-XXXX
- **Bug Reports**: security@innstastay.com

## 📚 Security Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security](https://nextjs.org/docs/advanced-features/security-headers)
- [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [Security Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)

---

**Last Updated**: December 19, 2024  
**Security Level**: Production Ready  
**Next Review**: January 19, 2025
