# Find where content.aicosmicastro.com should live on this VPS
# Run as root@content

# ── A) Which web server? ──
which nginx apache2 httpd 2>/dev/null
systemctl is-active nginx apache2 httpd 2>/dev/null
nginx -v 2>&1
apache2 -v 2>&1 | head -1

# ── B) Find domain config ──
grep -R "aicosmicastro\|content\." /etc/nginx/ 2>/dev/null | head -40
grep -R "aicosmicastro\|content\." /etc/apache2/ 2>/dev/null | head -40
ls /etc/nginx/sites-enabled/ 2>/dev/null
ls /etc/apache2/sites-enabled/ 2>/dev/null

# ── C) Common web roots ──
ls -la /var/www/ 2>/dev/null
ls -la /var/www/html/ 2>/dev/null
ls -la /home/ 2>/dev/null
ls -la /usr/share/nginx/html/ 2>/dev/null

# ── D) What is already listening on 80/443? ──
ss -tlnp | grep -E ':80|:443' || netstat -tlnp | grep -E ':80|:443'
