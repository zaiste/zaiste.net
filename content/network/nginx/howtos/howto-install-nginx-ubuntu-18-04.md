
+++

+++
# How To Install Nginx on Ubuntu 18.04

## Install Nginx

```bash
sudo apt install nginx
```

## Setup Server Blocks

```bash
sudo mkdir -p /var/www/example.com
```

In `/etc/nginx/sites-available/example.com`

```bash
server {
        listen 80;
        listen [::]:80;

        root /var/www/example.com;
        index index.html;

        server_name example.com;

        location / {
                try_files $uri $uri/ =404;
        }
}
```

Create a link from the `sites-available` to the `sites-enabled` directory:

```bash
sudo ln -s /etc/nginx/sites-available/example.com /etc/nginx/sites-enabled/
```

## Systemd

### Stop Nginx

```bash
sudo systemctl stop nginx
```

### Start Nginx

```bash
sudo systemctl start nginx
```

### Restart Nginx

```bash
sudo systemctl restart nginx
```

### Reload Nginx

For configuration changes Nginx can be reloaded instead of restarting.

```bash
sudo systemctl reload nginx
```

### Check Nginx Configuration

```bash
sudo nginx -t
```

## Setup Firewall with UFW

Only for HTTP

```bash
sudo ufw allow 'Nginx HTTP'
```

Only for HTTPS

```bash
sudo ufw allow 'Nginx HTTPS'
```

For both HTTP & HTTPS

```bash
sudo ufw allow 'Nginx Full'
```

