# Deploy AI Cosmic Astro → content.aicosmicastro.com (FileZilla)

## 1) Build on your Mac

```bash
cd /Users/akashsharma/Desktop/NPD/AI_Astro_Unith
npm install
NODE_ENV=production npm run build
```

Upload the **contents** of the `dist/` folder (not the folder itself).

## 2) FileZilla upload

1. Open FileZilla → File → Site Manager → New Site
2. Protocol: **FTP** or **SFTP** (prefer SFTP if available)
3. Host: your server IP or `content.aicosmicastro.com`
4. Username / password: from hosting panel
5. Connect
6. Remote path (pick the one your host uses for this subdomain):
   - `public_html/`
   - `public_html/content/`
   - `domains/content.aicosmicastro.com/public_html/`
   - or the Document Root shown in cPanel → Domains → content.aicosmicastro.com
7. Local: open `…/AI_Astro_Unith/dist`
8. Select **all files inside dist** (including `.htaccess`, `index.html`, `assets/`)
9. Drag into the remote Document Root
10. Overwrite when asked

## 3) SSL (HTTPS) — cPanel (most FileZilla hosts)

In cPanel:

1. **Domains** → ensure `content.aicosmicastro.com` exists and points to the folder you uploaded to
2. **SSL/TLS Status** (or **Let's Encrypt**)
3. Select `content.aicosmicastro.com`
4. Click **Run AutoSSL** / **Issue** / **Install**
5. Force HTTPS is already in `.htaccess`

DNS (if subdomain is new):

| Type | Name | Value |
|------|------|--------|
| A | content | your server IP |
| or CNAME | content | aicosmicastro.com |

Wait for DNS (~5–30 min), then issue SSL.

## 4) SSL — VPS with Certbot (if you have SSH)

```bash
sudo apt update
sudo apt install -y certbot python3-certbot-apache
# or for nginx:
# sudo apt install -y certbot python3-certbot-nginx

sudo certbot --apache -d content.aicosmicastro.com
# sudo certbot --nginx -d content.aicosmicastro.com

sudo certbot renew --dry-run
```

## 5) Verify

```bash
curl -I https://content.aicosmicastro.com
# Expect: HTTP/2 200  (or 301 → https)
```

Open: https://content.aicosmicastro.com

## Notes

- Always upload **inside** `dist`, not the `dist` folder name.
- Keep `.htaccess` so React routes (`/horoscope`, `/talk-to-astra`, …) work.
- Rebuild + re-upload whenever you change code or `.env`.
- OpenAI key is baked into the JS at build time (client-side). Prefer rotating keys and restricting by domain in OpenAI dashboard.
