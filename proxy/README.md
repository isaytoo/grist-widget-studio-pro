# 🌐 Grist Widget Studio Pro - CORS Proxy

Un proxy CORS léger, sécurisé et **déployable sur la plateforme de ton choix**.

## 🎯 Pourquoi son propre proxy ?

Plutôt que dépendre d'un service tiers, **déploie ton propre proxy en 2 minutes** sur la plateforme que tu préfères. Tu gardes le contrôle total (coût, sécurité, quotas, logs).

## 🚀 Déploiement 1-click

Choisis ta plateforme préférée :

| Plateforme | Gratuit ? | Complexité | Latence |
|------------|-----------|------------|---------|
| [**Cloudflare Workers**](#cloudflare-workers) ⭐ | ✅ 100k req/jour | ⭐ | Ultra rapide (edge) |
| [**Vercel**](#vercel) | ✅ 100 Go-h/mois | ⭐ | Rapide |
| [**Deno Deploy**](#deno-deploy) | ✅ 1M req/mois | ⭐⭐ | Rapide (edge) |
| [**Netlify**](#netlify) | ✅ 125k req/mois | ⭐⭐ | Moyen |
| [**Node.js self-hosted**](#nodejs-self-hosted) | Selon ton VPS | ⭐⭐⭐ | Dépend |
| [**Docker**](#docker) | Selon ton infra | ⭐⭐⭐ | Dépend |

> ⭐ **Recommandation** : Cloudflare Workers = le plus rapide, le plus généreux en quota gratuit.

---

## Cloudflare Workers

**URL finale** : `https://your-worker.your-name.workers.dev`

```bash
cd cloudflare
npm install
npx wrangler login                                  # se connecter à ton compte Cloudflare
npx wrangler deploy                                 # déployer !
npx wrangler secret put PROXY_TOKEN                 # (optionnel) activer l'auth par token
```

Variables d'environnement (optionnelles) :
- `PROXY_TOKEN` — exige le header `X-Proxy-Token` correspondant
- `ALLOWED_HOSTS` — CSV (whitelist stricte)
- `BLOCKED_HOSTS` — CSV (blacklist)

---

## Vercel

**URL finale** : `https://your-proxy.vercel.app/api/proxy`

```bash
cd vercel
npx vercel --prod
```

Variables d'env : dans le dashboard Vercel (Settings → Environment Variables), ajoute `PROXY_TOKEN`, `ALLOWED_HOSTS`, `BLOCKED_HOSTS`.

**Bouton 1-click** :
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/isaytoo/grist-widget-studio-pro&root-directory=proxy/vercel)

---

## Deno Deploy

**URL finale** : `https://your-proxy.deno.dev`

1. Push ton repo sur GitHub
2. Va sur [dash.deno.com](https://dash.deno.com) → **New Project**
3. Connect ton repo, sélectionne `proxy/deno/proxy.ts`
4. Ajoute les variables d'env dans Project Settings

Ou en local :
```bash
cd deno
deno run --allow-net --allow-env proxy.ts
```

---

## Netlify

**URL finale** : `https://your-site.netlify.app/proxy`

```bash
cd netlify
npx netlify deploy --prod
```

Ou connecte ton repo GitHub à Netlify avec `proxy/netlify` comme base directory.

---

## Node.js (self-hosted)

**URL finale** : `http://your-server:8080/?url=...`

```bash
cd node
npm install
PORT=8080 PROXY_TOKEN=secret node server.js
```

Pour un déploiement en production, utilise `pm2` ou systemd :

```bash
npm install -g pm2
pm2 start server.js --name grist-proxy
pm2 save
pm2 startup  # auto-start au boot
```

Avec un reverse proxy Nginx :
```nginx
location /grist-proxy/ {
    proxy_pass http://localhost:8080/;
    proxy_set_header Host $host;
}
```

---

## Docker

```bash
cd node
docker build -t grist-proxy .
docker run -d \
  -p 8080:8080 \
  -e PROXY_TOKEN=your-secret \
  --name grist-proxy \
  --restart unless-stopped \
  grist-proxy
```

Ou avec docker-compose :
```bash
cd node
docker-compose up -d
```

---

## 🧪 Tester ton proxy

```bash
# Sans auth
curl "https://YOUR_PROXY/?url=https://api.github.com/users/octocat"

# Avec token
curl -H "X-Proxy-Token: your-secret" \
     "https://YOUR_PROXY/?url=https://api.github.com/users/octocat"
```

Si ça marche, tu recevras la réponse de l'API externe. ✅

---

## ⚙️ Configurer le proxy dans le widget

Dans **Grist Widget Studio Pro** :
1. Clique sur l'icône ⚙️ **Paramètres Proxy**
2. Entre ton URL : `https://your-proxy.workers.dev`
3. (Optionnel) Ajoute ton `PROXY_TOKEN`
4. Clique **Tester connexion** → doit répondre OK
5. Clique **Sauvegarder**

L'URL est stockée dans les options du widget Grist (`grist.setOptions`) et réutilisée automatiquement.

---

## 🔒 Sécurité

Tous les proxies incluent par défaut :
- ✅ Blocage des adresses privées (`localhost`, `192.168.*`, `10.*`, `172.16-31.*`, `.local`)
- ✅ Timeout de 25 secondes
- ✅ Limite de 1 MB par réponse
- ✅ Auth optionnelle par token (`X-Proxy-Token`)
- ✅ Whitelist/blacklist configurables

### Recommandations production

1. **Active `PROXY_TOKEN`** pour éviter que ton proxy soit utilisé par d'autres
2. **Utilise `ALLOWED_HOSTS`** si tu sais quelles APIs tu vas consommer
3. **Rotate ton token** régulièrement
4. **Monitore les logs** (Cloudflare Analytics, Vercel logs, etc.)

---

## 📜 Licence

Apache License 2.0 © 2026 Said Hamadou (isaytoo)
