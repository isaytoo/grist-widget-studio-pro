# ⚡ Grist Widget Studio Pro

**Un IDE complet dans ton navigateur pour développer des widgets Grist.**  
Avec éditeur multi-fichiers, preview live, proxy CORS, testeur API type Postman, templates, et bien plus.

![License](https://img.shields.io/badge/license-Apache%202.0-blue)
![Grist](https://img.shields.io/badge/Grist-Widget-6366f1)

## 🚀 Pourquoi ce widget ?

Le [custom-widget-builder officiel](https://github.com/gristlabs/grist-widget/tree/master/custom-widget-builder) est minimaliste : 2 éditeurs HTML/JS, c'est tout. **Widget Studio Pro** apporte une expérience de développement professionnelle directement dans Grist :

- ✅ **Multi-fichiers** (HTML, CSS, JS, JSON, et plus)
- ✅ **Monaco Editor** (l'éditeur de VS Code) avec IntelliSense pour l'API Grist
- ✅ **Live Preview** avec hot-reload automatique
- ✅ **Testeur API intégré** (type Postman) avec support auth (Bearer, Basic, API Key)
- ✅ **Proxy CORS** serverless pour bypasser les restrictions cross-origin
- ✅ **Console & Network** panels pour debugger
- ✅ **Bibliothèque de templates** (Chart.js, Leaflet, Kanban, Forms, API...)
- ✅ **Package manager** pour ajouter des libs CDN (Chart.js, D3, Leaflet, etc.)
- ✅ **Export/Import ZIP** pour sauvegarder ou partager
- ✅ **Dark/Light mode**
- ✅ **Inspecteur de tables Grist** pour voir la structure du document

## 📸 Aperçu

```
┌─────────────────────────────────────────────────────────────┐
│ ⚡ Widget Studio PRO  [Mon Widget] [▶ Preview] [💾 Save]    │
├─────────────┬──────────────────────┬────────────────────────┤
│ EXPLORER    │ index.html | script.js │ 👁 Preview | 🌐 API  │
│ 📄 index.html│                       │ ┌──────────────────┐ │
│ 📜 script.js │  <div id="app">       │ │                  │ │
│ 🎨 style.css │    <h1>Hello!</h1>    │ │   Live Preview   │ │
│ ⚙️ config.json│  </div>              │ │                  │ │
│             │                       │ └──────────────────┘ │
│ API         │                       │                      │
│ GRIST TABLES│                       │ > console.log(...)  │
└─────────────┴──────────────────────┴────────────────────────┘
```

## 🏗️ Architecture

```
grist-widget-studio-pro/
├── index.html          # Interface principale (IDE)
├── app.js              # Logique du Studio
├── style.css           # UI styling (dark/light)
├── templates.js        # Bibliothèque de templates
├── grist-types.js      # Types API Grist pour IntelliSense
├── manifest.json       # Déclaration du widget pour Grist
├── vercel.json         # Config déploiement
└── proxy/              # Proxy CORS serverless
    ├── api/proxy.js    # Endpoint /api/proxy
    ├── package.json
    └── vercel.json
```

## 🚢 Déploiement

### 1. Déployer le widget principal

```bash
# Depuis la racine du projet
vercel --prod
# → https://grist-widget-studio-pro.vercel.app
```

### 2. Déployer ton propre proxy CORS

**Chaque utilisateur déploie son propre proxy** sur la plateforme de son choix. Voir [`proxy/README.md`](./proxy/README.md) pour les instructions détaillées de chaque plateforme :

| Plateforme | Quota gratuit | Commande |
|------------|---------------|----------|
| **Cloudflare Workers** ⭐ | 100k req/jour | `cd proxy/cloudflare && npx wrangler deploy` |
| **Vercel** | 100 Go-h/mois | `cd proxy/vercel && npx vercel --prod` |
| **Deno Deploy** | 1M req/mois | Push to GitHub + connect |
| **Netlify** | 125k req/mois | `cd proxy/netlify && npx netlify deploy --prod` |
| **Node / Docker** | Self-hosted | `cd proxy/node && node server.js` |

Puis dans le widget : clique **🔌 Proxy** → entre l'URL → Test → Save.

### 3. Configurer le widget dans Grist

Dans Grist : **Add New Widget → Custom → URL** :
```
https://grist-widget-studio-pro.vercel.app/
```
Access level : **Full document access** (nécessaire pour modifier les tables).

## 📝 Utilisation

### Créer un widget from scratch

1. Clique **Templates** → choisis un template de base (ou "Blank")
2. Édite le code dans Monaco (HTML, CSS, JS, config)
3. **Preview** s'actualise automatiquement à chaque modification
4. Teste tes appels API dans l'onglet **API** (avec/sans proxy CORS)
5. **💾 Save** pour sauvegarder dans le document Grist
6. **📦 Installer** pour transformer le widget actuel en widget autonome

### Tester une API externe

1. Ouvre l'onglet **🌐 API**
2. Entre l'URL, la méthode, les headers, auth, body
3. Coche **CORS Proxy** si l'API bloque les requêtes cross-origin
4. Clique **Send**
5. Clique **→ Utiliser dans le code** pour générer le snippet fetch

### Installer un package CDN

1. Clique **📦 Packages**
2. Tape le nom du package (ex: `chart.js`, `d3`, `leaflet`)
3. Le package est automatiquement injecté dans le preview et le widget final

## 🔒 Sécurité du proxy CORS

Le proxy bloque automatiquement :
- Les adresses privées (localhost, 192.168.*, 10.*, etc.)
- Les requêtes > 1 MB
- Les timeouts > 25s

Variables d'environnement optionnelles :
- `BLOCKED_HOSTS` : liste de hôtes bloqués (CSV)
- `ALLOWED_HOSTS` : whitelist stricte (CSV)

## ⌨️ Raccourcis clavier

| Raccourci | Action |
|-----------|--------|
| `Ctrl+S` / `Cmd+S` | Sauvegarder |
| `Ctrl+Enter` / `Cmd+Enter` | Lancer preview |
| `Ctrl+R` | Reload preview |
| `Esc` | Fermer modal |

## 🗺️ Roadmap

- [ ] Support collaboratif temps réel (via WebRTC/Yjs)
- [ ] Git sync (push/pull vers GitHub Gist)
- [ ] Marketplace communautaire de widgets
- [ ] Support TypeScript + transpile
- [ ] Breakpoints et debugging step-through
- [ ] Auto-détection des colonnes/tables Grist pour auto-completion
- [ ] Générateur de code à partir de prompts IA

## 📜 Licence

Apache License 2.0 © 2026 [Said Hamadou (isaytoo)](https://github.com/isaytoo)

## 🤝 Contribuer

Les PRs sont les bienvenues ! Ouvre une issue avant pour discuter des grosses features.

---

**Made with ⚡ for the Grist community**
