# Deployment Security Checklist

This guide ensures your website won't be flagged as a "fraud site" or appear suspicious when deployed.

---

## ✅ Pre-Deployment Checklist

### 1. **HTTPS/SSL Certificate** (CRITICAL)
- ✅ **Enable HTTPS** - Your site MUST use HTTPS, not HTTP
- ✅ **Valid SSL Certificate** - Use Let's Encrypt (free) or a trusted CA
- ✅ **Redirect HTTP → HTTPS** - All HTTP traffic should redirect to HTTPS
- ✅ **Mixed Content** - Ensure no HTTP resources load on HTTPS pages

**Platforms:**
- **Netlify/Vercel**: HTTPS enabled automatically
- **Cloudflare**: Enable SSL/TLS (Full mode)
- **AWS/GCP**: Configure SSL certificate in load balancer/CDN

---

### 2. **Security Headers** (Set in your hosting platform)

Add these HTTP headers to prevent security warnings:

```http
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://fonts.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://fonts.googleapis.com;
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

**How to set:**

- **Netlify**: `public/_headers` is already configured (includes Content-Security-Policy). Ensure the file is deployed with your build.
- **Vercel**: Use `vercel.json` with `headers` config; include the `Content-Security-Policy` line from the block above.
- **Cloudflare**: Use Page Rules or Workers
- **Nginx**: Add to `server` block in config
- **Apache**: Use `.htaccess` or `httpd.conf`

---

### 3. **Domain & DNS**

- ✅ **Valid Domain** - Use a proper domain (not IP address)
- ✅ **DNS Records** - Proper A/AAAA or CNAME records
- ✅ **SPF/DKIM/DMARC** - If sending emails, configure email authentication
- ✅ **No Suspicious Subdomains** - Avoid typosquatting patterns

---

### 4. **Meta Tags & Verification**

- ✅ **Open Graph Tags** - Added in `index.html` (update URLs to your domain)
- ✅ **Twitter Cards** - Added in `index.html`
- ✅ **Google Search Console** - Add verification meta tag when ready
- ✅ **Bing Webmaster** - Add verification meta tag when ready
- ✅ **Author Meta** - Already added

**To add verification:**
1. Sign up for Google Search Console / Bing Webmaster
2. Get verification code
3. Add to `index.html`:
   ```html
   <meta name="google-site-verification" content="YOUR_CODE" />
   ```

---

### 5. **Files & Content**

- ✅ **robots.txt** - Created at `public/robots.txt` (update sitemap URL)
- ✅ **security.txt** - Created at `public/.well-known/security.txt` (update contact email)
- ✅ **Favicon** - Ensure `/logo.png` exists and is accessible
- ✅ **Contact Information** - Visible on site (already in Contact page)
- ✅ **Privacy Policy** - Consider adding if collecting user data
- ✅ **Terms of Service** - Consider adding if needed

---

### 6. **Content Security**

- ✅ **No Suspicious Keywords** - Avoid spam-like content
- ✅ **Legitimate Business Info** - Real address, phone, email visible
- ✅ **No Phishing Patterns** - Don't mimic other brands
- ✅ **Clear Purpose** - Site purpose is obvious from content

---

### 7. **Performance & Trust Signals**

- ✅ **Fast Loading** - Optimize images, use CDN
- ✅ **Mobile Responsive** - Already implemented
- ✅ **Accessible** - WCAG compliance (skip link, focus styles added)
- ✅ **No Broken Links** - Test all links before deployment

---

## 🔧 Platform-Specific Configuration

### Netlify

1. **Headers**: Already configured via `public/_headers`
2. **HTTPS**: Automatic
3. **Redirects**: Add to `public/_redirects` if needed:
   ```
   http://*  https://www.appcon-technologies.com/:splat  301!
   ```

### Vercel

1. **Headers**: Create `vercel.json`:
   ```json
   {
     "headers": [
       {
         "source": "/(.*)",
         "headers": [
           { "key": "X-Content-Type-Options", "value": "nosniff" },
           { "key": "X-Frame-Options", "value": "DENY" },
           { "key": "X-XSS-Protection", "value": "1; mode=block" },
           { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
           { "key": "Content-Security-Policy", "value": "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://fonts.googleapis.com; frame-ancestors 'none'; base-uri 'self';" },
           { "key": "Strict-Transport-Security", "value": "max-age=31536000; includeSubDomains; preload" }
         ]
       }
     ]
   }
   ```

### Cloudflare

1. **SSL/TLS**: Set to "Full" mode
2. **Page Rules**: Add security headers
3. **Firewall**: Enable basic protection
4. **Always Use HTTPS**: Enable

### Nginx

Add to your server block:
```nginx
add_header X-Content-Type-Options "nosniff" always;
add_header X-Frame-Options "DENY" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
```

---

## 🧪 Post-Deployment Testing

After deployment, test your site:

1. **SSL Labs**: https://www.ssllabs.com/ssltest/
   - Should get A or A+ rating

2. **Security Headers**: https://securityheaders.com/
   - Check that headers are present

3. **Google Safe Browsing**: https://transparencyreport.google.com/safe-browsing/search
   - Verify site isn't flagged

4. **VirusTotal**: https://www.virustotal.com/
   - Check domain reputation

5. **Browser Console**: 
   - Check for mixed content warnings
   - Verify no security errors

---

## 🚨 Common Issues That Cause "Fraud Site" Warnings

1. **No HTTPS** - Biggest red flag
2. **Missing Security Headers** - Looks suspicious
3. **Suspicious Domain** - Typosquatting, free subdomains
4. **No Contact Info** - Appears untrustworthy
5. **Broken SSL** - Expired or invalid certificate
6. **Mixed Content** - HTTP resources on HTTPS page
7. **Phishing Patterns** - Mimicking other brands
8. **Spam Keywords** - Too many promotional words

---

## 📝 Quick Checklist Before Going Live

- [ ] HTTPS enabled and working
- [ ] Security headers configured
- [ ] Domain properly configured
- [ ] Contact information visible
- [ ] robots.txt accessible
- [ ] security.txt accessible
- [ ] No mixed content warnings
- [ ] SSL certificate valid
- [ ] Meta tags updated with real domain
- [ ] Tested in multiple browsers
- [ ] Mobile responsive verified
- [ ] All links working

---

## 🔗 Resources

- **Mozilla Security Guidelines**: https://infosec.mozilla.org/guidelines/web_security
- **OWASP Security Headers**: https://owasp.org/www-project-secure-headers/
- **SSL Labs Test**: https://www.ssllabs.com/ssltest/
- **Security Headers Test**: https://securityheaders.com/

---

**Last Updated**: 2026-02-19
