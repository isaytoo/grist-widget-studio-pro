/**
 * Grist Widget Studio Pro - Main Application
 * Copyright 2026 Said Hamadou (isaytoo)
 * Licensed under the Apache License, Version 2.0
 */

// ============ STATE ============
const state = {
  project: {
    name: 'Mon Widget',
    files: {
      'index.html': '<div id="app">\n  <h1>Hello Grist!</h1>\n</div>',
      'script.js': 'grist.ready({ requiredAccess: "read table" });\n\ngrist.onRecord(record => {\n  console.log("Record:", record);\n});',
      'style.css': 'body {\n  font-family: sans-serif;\n  padding: 20px;\n}',
      'config.json': '{\n  "name": "Mon Widget",\n  "requiredAccess": "read table",\n  "packages": []\n}'
    },
    apis: [],
    packages: []
  },
  // Proxy settings (stored in Grist options _proxy)
  proxy: {
    mode: 'custom', // 'none' | 'custom'
    url: '',
    token: ''
  },
  activeFile: 'index.html',
  openTabs: ['index.html'],
  dirtyFiles: new Set(),
  editor: null,
  models: {},
  monaco: null,
  theme: 'dark',
  consoleEntries: [],
  networkEntries: [],
  hotReloadTimer: null,
  gristReady: false
};

// Dynamic getter - returns the user-configured proxy URL
function getProxyUrl() {
  return state.proxy.mode === 'custom' && state.proxy.url ? state.proxy.url : '';
}

function buildProxyHeaders(extra = {}) {
  const h = { ...extra };
  if (state.proxy.token) {
    h['X-Proxy-Token'] = state.proxy.token;
  }
  return h;
}

// Try to load proxy settings from localStorage (fallback when Grist not available)
try {
  const saved = localStorage.getItem('gws_proxy');
  if (saved) state.proxy = Object.assign(state.proxy, JSON.parse(saved));
} catch (e) { /* ignore */ }

// ============ GRIST INIT ============
try {
  grist.ready({
    requiredAccess: 'full',
    onEditOptions: () => {
      showToast('Configuration ouverte', 'info');
    }
  });

  grist.onOptions(async (options) => {
    state.gristReady = true;

    // Mode widget installé : afficher le rendu final au lieu de l'IDE
    if (options && options._installed && options._html) {
      renderInstalledWidget(options._html, options._js || '');
      return;
    }

    if (options && options._project) {
      try {
        loadProject(JSON.parse(options._project));
        showToast('Projet chargé depuis Grist', 'success');
      } catch (e) {
        console.error('Load error:', e);
      }
    }
    if (options && options._proxy) {
      try {
        state.proxy = Object.assign(state.proxy, JSON.parse(options._proxy));
      } catch (e) { /* ignore */ }
    }
    refreshTables();
  });
} catch (e) {
  console.warn('Grist API not available:', e);
}

// ============ MONACO EDITOR ============
require.config({ paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.47.0/min/vs' } });

require(['vs/editor/editor.main'], function () {
  state.monaco = monaco;

  // Set theme
  monaco.editor.defineTheme('studio-dark', {
    base: 'vs-dark',
    inherit: true,
    rules: [],
    colors: {
      'editor.background': '#0f172a',
      'editor.foreground': '#f1f5f9',
      'editor.lineHighlightBackground': '#1e293b',
      'editorGutter.background': '#0f172a',
      'editorLineNumber.foreground': '#475569'
    }
  });

  monaco.editor.setTheme('studio-dark');

  // Register Grist types
  if (window.GRIST_TYPES_DTS) {
    monaco.languages.typescript.javascriptDefaults.addExtraLib(
      window.GRIST_TYPES_DTS,
      'grist.d.ts'
    );
  }

  // Create editor
  const editorContainer = document.getElementById('editorContainer');
  state.editor = monaco.editor.create(editorContainer, {
    value: state.project.files[state.activeFile],
    language: getLanguageFromFile(state.activeFile),
    theme: 'studio-dark',
    automaticLayout: true,
    minimap: { enabled: true },
    fontSize: 13,
    fontFamily: 'Menlo, Monaco, "Courier New", monospace',
    scrollBeyondLastLine: false,
    renderWhitespace: 'selection',
    tabSize: 2,
    wordWrap: 'on',
    padding: { top: 10 }
  });

  // Create models for each file
  Object.keys(state.project.files).forEach(filename => {
    const uri = monaco.Uri.parse('file:///' + filename);
    if (!state.models[filename]) {
      state.models[filename] = monaco.editor.createModel(
        state.project.files[filename],
        getLanguageFromFile(filename),
        uri
      );
    }
  });

  state.editor.setModel(state.models[state.activeFile]);

  // Content change => mark dirty + schedule hot reload
  state.editor.onDidChangeModelContent(() => {
    const content = state.editor.getValue();
    state.project.files[state.activeFile] = content;
    markDirty(state.activeFile);
    scheduleHotReload();
  });

  // Keyboard shortcuts
  state.editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => saveProject());
  state.editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => runPreview(true));

  // Initial render
  renderFileTree();
  renderTabs();
  renderTemplates();
  runPreview();
  initApiTester();
  setupEventListeners();
});

function getLanguageFromFile(filename) {
  if (filename.endsWith('.html')) return 'html';
  if (filename.endsWith('.css')) return 'css';
  if (filename.endsWith('.js')) return 'javascript';
  if (filename.endsWith('.json')) return 'json';
  if (filename.endsWith('.md')) return 'markdown';
  return 'plaintext';
}

function getFileIcon(filename) {
  if (filename.endsWith('.html')) return '📄';
  if (filename.endsWith('.css')) return '🎨';
  if (filename.endsWith('.js')) return '📜';
  if (filename.endsWith('.json')) return '⚙️';
  if (filename.endsWith('.md')) return '📝';
  return '📎';
}

// ============ FILE TREE ============
function renderFileTree() {
  const tree = document.getElementById('fileTree');
  tree.innerHTML = '';
  Object.keys(state.project.files).sort().forEach(filename => {
    const item = document.createElement('div');
    item.className = 'file-item' + (filename === state.activeFile ? ' active' : '');
    item.innerHTML = `
      <span class="file-icon">${getFileIcon(filename)}</span>
      <span class="file-name">${filename}</span>
      <button class="btn-delete" title="Supprimer">✕</button>
    `;
    item.addEventListener('click', (e) => {
      if (e.target.classList.contains('btn-delete')) {
        e.stopPropagation();
        deleteFile(filename);
      } else {
        openFile(filename);
      }
    });
    tree.appendChild(item);
  });
}

function openFile(filename) {
  if (!state.project.files[filename]) return;
  state.activeFile = filename;
  if (!state.openTabs.includes(filename)) {
    state.openTabs.push(filename);
  }
  state.editor.setModel(state.models[filename]);
  renderFileTree();
  renderTabs();
}

function addFile() {
  const name = prompt('Nom du fichier (ex: utils.js, styles.css):');
  if (!name) return;
  if (state.project.files[name]) {
    showToast('Ce fichier existe déjà', 'warning');
    return;
  }
  state.project.files[name] = '';
  const uri = state.monaco.Uri.parse('file:///' + name);
  state.models[name] = state.monaco.editor.createModel('', getLanguageFromFile(name), uri);
  openFile(name);
  markDirty(name);
}

function deleteFile(filename) {
  if (['index.html', 'script.js', 'style.css', 'config.json'].includes(filename)) {
    showToast('Les fichiers principaux ne peuvent pas être supprimés', 'warning');
    return;
  }
  if (!confirm(`Supprimer ${filename} ?`)) return;
  delete state.project.files[filename];
  if (state.models[filename]) {
    state.models[filename].dispose();
    delete state.models[filename];
  }
  state.openTabs = state.openTabs.filter(f => f !== filename);
  if (state.activeFile === filename) {
    state.activeFile = state.openTabs[0] || 'index.html';
    state.editor.setModel(state.models[state.activeFile]);
  }
  renderFileTree();
  renderTabs();
}

// ============ TABS ============
function renderTabs() {
  const bar = document.getElementById('tabsBar');
  bar.innerHTML = '';
  state.openTabs.forEach(filename => {
    const tab = document.createElement('div');
    const isDirty = state.dirtyFiles.has(filename);
    tab.className = 'tab' + (filename === state.activeFile ? ' active' : '') + (isDirty ? ' dirty' : '');
    tab.innerHTML = `
      <span class="file-icon">${getFileIcon(filename)}</span>
      <span>${filename}</span>
      <button class="tab-close" title="Fermer">×</button>
    `;
    tab.addEventListener('click', (e) => {
      if (e.target.classList.contains('tab-close')) {
        e.stopPropagation();
        closeTab(filename);
      } else {
        openFile(filename);
      }
    });
    bar.appendChild(tab);
  });
}

function closeTab(filename) {
  state.openTabs = state.openTabs.filter(f => f !== filename);
  if (state.activeFile === filename) {
    state.activeFile = state.openTabs[state.openTabs.length - 1] || Object.keys(state.project.files)[0];
    if (state.models[state.activeFile]) {
      state.editor.setModel(state.models[state.activeFile]);
    }
  }
  renderFileTree();
  renderTabs();
}

function markDirty(filename) {
  state.dirtyFiles.add(filename);
  renderTabs();
  setStatus('modified', 'Modifié');
}

// ============ PREVIEW ============
function scheduleHotReload() {
  if (state.hotReloadTimer) clearTimeout(state.hotReloadTimer);
  state.hotReloadTimer = setTimeout(() => runPreview(), 600);
}

function runPreview(showToastMsg = false) {
  const iframe = document.getElementById('previewFrame');
  const html = state.project.files['index.html'] || '';
  const css = state.project.files['style.css'] || '';
  const js = state.project.files['script.js'] || '';
  
  // Other JS/CSS files
  let extraJs = '';
  let extraCss = '';
  Object.keys(state.project.files).forEach(f => {
    if (['index.html', 'script.js', 'style.css', 'config.json'].includes(f)) return;
    if (f.endsWith('.js')) extraJs += `\n// ===== ${f} =====\n` + state.project.files[f];
    if (f.endsWith('.css')) extraCss += `\n/* ===== ${f} ===== */\n` + state.project.files[f];
  });

  // Packages as CDN links
  const packages = state.project.packages || [];
  const packageTags = packages.map(p => {
    const url = `https://cdn.jsdelivr.net/npm/${p}`;
    if (p.endsWith('.css') || p.includes('leaflet')) {
      return `<link rel="stylesheet" href="${url}"><script src="${url}"></script>`;
    }
    return `<script src="${url}"></script>`;
  }).join('\n');

  const fullHtml = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<script src="https://docs.getgrist.com/grist-plugin-api.js"></` + `script>
${packageTags}
<style>${css}${extraCss}</style>
</head>
<body>
${html}
<script>
// Intercept console
(function() {
  const orig = { log: console.log, warn: console.warn, error: console.error, info: console.info };
  ['log', 'warn', 'error', 'info'].forEach(level => {
    console[level] = function(...args) {
      orig[level].apply(console, args);
      parent.postMessage({ type: '__studio_console', level, args: args.map(a => {
        try { return typeof a === 'object' ? JSON.stringify(a) : String(a); } catch(e) { return String(a); }
      }) }, '*');
    };
  });
  window.addEventListener('error', (e) => {
    parent.postMessage({ type: '__studio_console', level: 'error', args: [e.message + ' (' + (e.filename||'inline') + ':' + e.lineno + ')'] }, '*');
  });
})();
</` + `script>
<script>${js}${extraJs}</` + `script>
</body>
</html>`;

  const blob = new Blob([fullHtml], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  iframe.src = url;
  setTimeout(() => URL.revokeObjectURL(url), 2000);

  if (showToastMsg) showToast('Preview lancé', 'success');
  setStatus('ok', 'Prévisualisation');
}

// Listen to console messages from preview iframe
window.addEventListener('message', (e) => {
  if (e.data && e.data.type === '__studio_console') {
    addConsoleEntry(e.data.level, e.data.args.join(' '));
  }
});

// ============ CONSOLE ============
function addConsoleEntry(level, message) {
  const entry = {
    level,
    message,
    time: new Date().toLocaleTimeString()
  };
  state.consoleEntries.push(entry);
  if (state.consoleEntries.length > 500) state.consoleEntries.shift();
  renderConsole();
}

function renderConsole() {
  const output = document.getElementById('consoleOutput');
  const filters = Array.from(document.querySelectorAll('.console-header .filter-check input'))
    .filter(c => c.checked)
    .map(c => c.dataset.level);
  
  output.innerHTML = state.consoleEntries
    .filter(e => filters.includes(e.level))
    .map(e => `
      <div class="console-line ${e.level}">
        <span class="console-time">${e.time}</span>
        <span class="console-content">${escapeHtml(e.message)}</span>
      </div>
    `).join('');
  output.scrollTop = output.scrollHeight;
}

function clearConsole() {
  state.consoleEntries = [];
  renderConsole();
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ============ API TESTER ============
function initApiTester() {
  // Add first header row by default
  addKvRow('headersEditor', 'Content-Type', 'application/json');
  
  // Auth type change
  document.getElementById('authType').addEventListener('change', (e) => {
    const fields = document.getElementById('authFields');
    const type = e.target.value;
    if (type === 'bearer') {
      fields.innerHTML = '<input type="text" id="authBearer" placeholder="Token" class="api-url">';
    } else if (type === 'basic') {
      fields.innerHTML = `
        <input type="text" id="authUser" placeholder="Username" class="api-url" style="margin-bottom:4px">
        <input type="password" id="authPass" placeholder="Password" class="api-url">
      `;
    } else if (type === 'apikey') {
      fields.innerHTML = `
        <input type="text" id="apiKeyName" placeholder="Header name (ex: X-API-Key)" class="api-url" style="margin-bottom:4px">
        <input type="text" id="apiKeyValue" placeholder="Key value" class="api-url">
      `;
    } else {
      fields.innerHTML = '';
    }
  });
}

function addKvRow(containerId, key = '', value = '') {
  const container = document.getElementById(containerId);
  const row = document.createElement('div');
  row.className = 'kv-row';
  row.innerHTML = `
    <input type="text" placeholder="Clé" value="${key}">
    <input type="text" placeholder="Valeur" value="${value}">
    <button class="btn-remove">✕</button>
  `;
  row.querySelector('.btn-remove').addEventListener('click', () => row.remove());
  container.appendChild(row);
}

function getKvValues(containerId) {
  const rows = document.querySelectorAll(`#${containerId} .kv-row`);
  const result = {};
  rows.forEach(row => {
    const inputs = row.querySelectorAll('input');
    const k = inputs[0].value.trim();
    const v = inputs[1].value;
    if (k) result[k] = v;
  });
  return result;
}

async function sendApiRequest() {
  const method = document.getElementById('apiMethod').value;
  let url = document.getElementById('apiUrl').value.trim();
  const useCors = document.getElementById('useCorsProxy').checked;
  const headers = getKvValues('headersEditor');
  const params = getKvValues('paramsEditor');
  const bodyType = document.getElementById('bodyType').value;
  const bodyContent = document.getElementById('bodyContent').value;
  const authType = document.getElementById('authType').value;

  if (!url) {
    showToast('Entre une URL', 'warning');
    return;
  }

  // Apply query params
  if (Object.keys(params).length) {
    const u = new URL(url);
    Object.entries(params).forEach(([k, v]) => u.searchParams.set(k, v));
    url = u.toString();
  }

  // Apply auth
  if (authType === 'bearer') {
    const token = document.getElementById('authBearer')?.value;
    if (token) headers['Authorization'] = `Bearer ${token}`;
  } else if (authType === 'basic') {
    const u = document.getElementById('authUser')?.value;
    const p = document.getElementById('authPass')?.value;
    if (u) headers['Authorization'] = `Basic ${btoa(u + ':' + p)}`;
  } else if (authType === 'apikey') {
    const k = document.getElementById('apiKeyName')?.value;
    const v = document.getElementById('apiKeyValue')?.value;
    if (k) headers[k] = v;
  }

  // Body
  let body;
  if (['POST', 'PUT', 'PATCH'].includes(method) && bodyType !== 'none') {
    if (bodyType === 'json') {
      body = bodyContent;
      if (!headers['Content-Type']) headers['Content-Type'] = 'application/json';
    } else if (bodyType === 'form') {
      const fd = new FormData();
      try {
        const obj = JSON.parse(bodyContent || '{}');
        Object.entries(obj).forEach(([k, v]) => fd.append(k, v));
      } catch (e) {
        showToast('Form data doit être un JSON object', 'error');
        return;
      }
      body = fd;
    } else {
      body = bodyContent;
    }
  }

  // Build final URL - use configured proxy if CORS enabled
  const proxyUrl = getProxyUrl();
  if (useCors && !proxyUrl) {
    showToast('Tu dois d\'abord configurer un proxy : clique sur le bouton 🔌 Proxy en haut.', 'warning');
    return;
  }
  const finalUrl = useCors
    ? `${proxyUrl}${proxyUrl.includes('?') ? '&' : '?'}url=${encodeURIComponent(url)}`
    : url;
  
  // Inject proxy token if needed
  if (useCors) {
    Object.assign(headers, buildProxyHeaders());
  }

  const startTime = performance.now();
  const responseBody = document.getElementById('responseBody');
  responseBody.textContent = 'Requête en cours...';

  try {
    const res = await fetch(finalUrl, { method, headers, body });
    const duration = Math.round(performance.now() - startTime);
    const text = await res.text();
    let formatted = text;
    try {
      formatted = JSON.stringify(JSON.parse(text), null, 2);
    } catch (e) { /* not JSON */ }

    const size = new Blob([text]).size;
    const statusEl = document.getElementById('responseStatus');
    statusEl.textContent = `${res.status} ${res.statusText}`;
    statusEl.className = 'response-status ' + (res.ok ? 'ok' : res.status >= 400 ? 'err' : 'warn');
    document.getElementById('responseTime').textContent = `${duration}ms`;
    document.getElementById('responseSize').textContent = formatSize(size);
    responseBody.textContent = formatted;

    addNetworkEntry({ method, url, status: res.status, duration, size, response: formatted });
  } catch (err) {
    const duration = Math.round(performance.now() - startTime);
    document.getElementById('responseStatus').textContent = 'Erreur';
    document.getElementById('responseStatus').className = 'response-status err';
    document.getElementById('responseTime').textContent = `${duration}ms`;
    responseBody.textContent = 'Erreur : ' + err.message + '\n\nAstuce : active "CORS Proxy" si l\'API bloque les requêtes cross-origin.';
    addNetworkEntry({ method, url, status: 0, duration, size: 0, error: err.message });
  }
}

function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1024 / 1024).toFixed(1) + ' MB';
}

// ============ NETWORK ============
function addNetworkEntry(entry) {
  entry.time = new Date().toLocaleTimeString();
  state.networkEntries.unshift(entry);
  if (state.networkEntries.length > 100) state.networkEntries.pop();
  renderNetwork();
}

function renderNetwork() {
  document.getElementById('networkCount').textContent = `${state.networkEntries.length} requête(s)`;
  document.getElementById('networkList').innerHTML = state.networkEntries.map((e, i) => `
    <div class="network-item" data-idx="${i}">
      <span class="network-method ${e.method}">${e.method}</span>
      <span class="network-url" title="${e.url}">${e.url}</span>
      <span class="network-status ${e.status >= 200 && e.status < 300 ? 'ok' : e.status ? 'err' : ''}">${e.status || '—'}</span>
      <span class="network-time">${e.duration}ms</span>
    </div>
  `).join('');
}

// ============ GRIST TABLES ============
async function refreshTables() {
  const list = document.getElementById('tablesList');
  try {
    const tables = await grist.docApi.listTables();
    if (!tables || !tables.length) {
      list.innerHTML = '<div class="empty-state">Aucune table</div>';
      return;
    }
    list.innerHTML = tables.map(t => `
      <div class="table-item" data-table="${t}">
        <span class="file-icon">📊</span>
        <span class="file-name">${t}</span>
      </div>
    `).join('');
    list.querySelectorAll('.table-item').forEach(el => {
      el.addEventListener('click', () => inspectTable(el.dataset.table));
    });
  } catch (e) {
    list.innerHTML = '<div class="empty-state">Grist non disponible</div>';
  }
}

async function inspectTable(tableName) {
  try {
    const data = await grist.docApi.fetchTable(tableName);
    const cols = Object.keys(data).filter(c => c !== 'id');
    const rowCount = data.id ? data.id.length : 0;
    addConsoleEntry('info', `Table "${tableName}" : ${rowCount} lignes, colonnes : ${cols.join(', ')}`);
    showToast(`Table ${tableName} : ${rowCount} lignes`, 'info');
  } catch (e) {
    showToast('Erreur : ' + e.message, 'error');
  }
}

// ============ TEMPLATES ============
function renderTemplates() {
  const grid = document.getElementById('templatesGrid');
  const tags = new Set();
  window.WIDGET_TEMPLATES.forEach(t => t.tags.forEach(tg => tags.add(tg)));

  const tagsContainer = document.getElementById('templatesTags');
  tagsContainer.innerHTML = '<span class="template-tag active" data-tag="all">Tous</span>' +
    Array.from(tags).map(t => `<span class="template-tag" data-tag="${t}">${t}</span>`).join('');

  grid.innerHTML = window.WIDGET_TEMPLATES.map(t => `
    <div class="template-card" data-id="${t.id}" data-tags="${t.tags.join(',')}">
      <div class="template-icon">${t.icon}</div>
      <h3>${t.name}</h3>
      <p>${t.description}</p>
      <div class="template-tags">
        ${t.tags.map(tg => `<span>${tg}</span>`).join('')}
      </div>
    </div>
  `).join('');

  grid.querySelectorAll('.template-card').forEach(card => {
    card.addEventListener('click', () => loadTemplate(card.dataset.id));
  });

  tagsContainer.querySelectorAll('.template-tag').forEach(tag => {
    tag.addEventListener('click', (e) => {
      tagsContainer.querySelectorAll('.template-tag').forEach(t => t.classList.remove('active'));
      tag.classList.add('active');
      const tg = tag.dataset.tag;
      grid.querySelectorAll('.template-card').forEach(card => {
        const cardTags = card.dataset.tags.split(',');
        card.style.display = (tg === 'all' || cardTags.includes(tg)) ? '' : 'none';
      });
    });
  });
}

function loadTemplate(id) {
  const tpl = window.WIDGET_TEMPLATES.find(t => t.id === id);
  if (!tpl) return;
  if (!confirm(`Charger le template "${tpl.name}" ? Le projet actuel sera remplacé.`)) return;

  // Dispose old models
  Object.values(state.models).forEach(m => m.dispose());
  state.models = {};

  state.project.files = JSON.parse(JSON.stringify(tpl.files));
  state.project.name = tpl.name;
  state.openTabs = Object.keys(state.project.files);
  state.activeFile = 'index.html';

  // Parse config for packages
  try {
    const config = JSON.parse(state.project.files['config.json'] || '{}');
    state.project.packages = config.packages || [];
  } catch (e) {
    state.project.packages = [];
  }

  // Create new models
  Object.keys(state.project.files).forEach(filename => {
    const uri = state.monaco.Uri.parse('file:///tpl/' + Date.now() + '/' + filename);
    state.models[filename] = state.monaco.editor.createModel(
      state.project.files[filename],
      getLanguageFromFile(filename),
      uri
    );
  });

  state.editor.setModel(state.models[state.activeFile]);
  document.getElementById('projectName').textContent = tpl.name;

  renderFileTree();
  renderTabs();
  renderPackages();
  runPreview();
  closeModal('modalTemplates');
  showToast(`Template "${tpl.name}" chargé`, 'success');
}

// ============ PACKAGES ============
function renderPackages() {
  const list = document.getElementById('packagesList');
  if (!state.project.packages.length) {
    list.innerHTML = '<div class="empty-state">Aucun package installé</div>';
    return;
  }
  list.innerHTML = state.project.packages.map(p => `
    <div class="pkg-installed">
      <span>📦 ${p}</span>
      <button class="btn-remove-pkg" data-pkg="${p}">Retirer</button>
    </div>
  `).join('');
  list.querySelectorAll('.btn-remove-pkg').forEach(btn => {
    btn.addEventListener('click', () => removePackage(btn.dataset.pkg));
  });
}

function addPackage(pkg) {
  if (!pkg) return;
  if (state.project.packages.includes(pkg)) {
    showToast('Package déjà installé', 'warning');
    return;
  }
  state.project.packages.push(pkg);
  // Update config.json
  try {
    const cfg = JSON.parse(state.project.files['config.json']);
    cfg.packages = state.project.packages;
    state.project.files['config.json'] = JSON.stringify(cfg, null, 2);
    if (state.models['config.json']) {
      state.models['config.json'].setValue(state.project.files['config.json']);
    }
  } catch (e) { /* invalid config */ }
  renderPackages();
  runPreview();
  showToast(`Package ${pkg} ajouté`, 'success');
}

function removePackage(pkg) {
  state.project.packages = state.project.packages.filter(p => p !== pkg);
  try {
    const cfg = JSON.parse(state.project.files['config.json']);
    cfg.packages = state.project.packages;
    state.project.files['config.json'] = JSON.stringify(cfg, null, 2);
    if (state.models['config.json']) {
      state.models['config.json'].setValue(state.project.files['config.json']);
    }
  } catch (e) { /* */ }
  renderPackages();
  runPreview();
}

// ============ SAVE / LOAD ============
async function saveProject() {
  if (!state.gristReady) {
    // Fallback: download JSON
    downloadJson();
    return;
  }
  setStatus('saving', 'Sauvegarde...');
  try {
    const name = document.getElementById('projectName').textContent.trim();
    state.project.name = name;
    await grist.setOptions({
      _project: JSON.stringify(state.project),
      _version: 1
    });
    state.dirtyFiles.clear();
    renderTabs();
    setStatus('ok', 'Sauvegardé');
    showToast('Projet sauvegardé dans Grist', 'success');
  } catch (e) {
    setStatus('error', 'Erreur');
    showToast('Erreur : ' + e.message, 'error');
  }
}

function loadProject(project) {
  Object.values(state.models).forEach(m => m.dispose());
  state.models = {};

  state.project = Object.assign(state.project, project);
  state.openTabs = Object.keys(state.project.files);
  state.activeFile = 'index.html';

  Object.keys(state.project.files).forEach(filename => {
    const uri = state.monaco.Uri.parse('file:///loaded/' + Date.now() + '/' + filename);
    state.models[filename] = state.monaco.editor.createModel(
      state.project.files[filename],
      getLanguageFromFile(filename),
      uri
    );
  });

  if (state.models[state.activeFile]) {
    state.editor.setModel(state.models[state.activeFile]);
  }
  document.getElementById('projectName').textContent = state.project.name;
  state.dirtyFiles.clear();
  renderFileTree();
  renderTabs();
  renderPackages();
  runPreview();
}

function downloadJson() {
  const blob = new Blob([JSON.stringify(state.project, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = (state.project.name || 'widget') + '.json';
  a.click();
  URL.revokeObjectURL(url);
}

// ============ INSTALLED MODE RENDERER ============
function renderInstalledWidget(html, js) {
  // Remplace toute l'interface par une iframe contenant le widget final
  document.body.innerHTML = `
    <div id="installed-bar" style="position:fixed;top:0;left:0;right:0;height:32px;background:#1e293b;display:flex;align-items:center;justify-content:space-between;padding:0 12px;z-index:9999;font-family:sans-serif;font-size:12px;color:#94a3b8;">
      <span>⚡ Widget Studio Pro — <strong style="color:#f1f5f9;">Mode widget installé</strong></span>
      <button onclick="uninstallWidget()" style="background:#3b82f6;color:white;border:none;border-radius:4px;padding:3px 10px;cursor:pointer;font-size:11px;">✏️ Modifier (retour IDE)</button>
    </div>
    <iframe id="installed-frame" style="position:fixed;top:32px;left:0;right:0;bottom:0;width:100%;height:calc(100% - 32px);border:none;"></iframe>
  `;
  const iframe = document.getElementById('installed-frame');
  const doc = iframe.contentDocument || iframe.contentWindow.document;
  doc.open();
  doc.write(`<!DOCTYPE html><html><head><meta charset="UTF-8">
    <script src="https://docs.getgrist.com/grist-plugin-api.js"><\/script>
    </head><body>${html}<script>${js}<\/script></body></html>`);
  doc.close();
}

async function uninstallWidget() {
  if (!confirm('Retourner à l\'IDE ? Le widget installé sera désactivé.')) return;
  try {
    await grist.setOptions({ _installed: false });
    location.reload();
  } catch (e) {
    location.reload();
  }
}

// ============ INSTALL WIDGET ============
async function installWidget() {
  if (!state.gristReady) {
    showToast('Grist non disponible', 'error');
    return;
  }
  try {
    const html = state.project.files['index.html'] || '';
    const css = state.project.files['style.css'] || '';
    const js = state.project.files['script.js'] || '';
    
    // Build complete HTML and JS with packages injected
    const packages = state.project.packages || [];
    const packageTags = packages.map(p => `<script src="https://cdn.jsdelivr.net/npm/${p}"></` + `script>`).join('\n');
    
    const fullHtml = `${packageTags}\n<style>${css}</style>\n${html}`;
    
    await grist.setOptions({
      _project: JSON.stringify(state.project),
      _installed: true,
      _html: fullHtml,
      _js: js
    });
    showToast('✅ Widget installé ! Reload la page pour l\'activer.', 'success');
  } catch (e) {
    showToast('Erreur : ' + e.message, 'error');
  }
}

// ============ EXPORT/IMPORT ZIP ============
async function exportZip() {
  if (typeof JSZip === 'undefined') {
    showToast('JSZip non chargé', 'error');
    return;
  }
  const zip = new JSZip();
  Object.entries(state.project.files).forEach(([name, content]) => {
    zip.file(name, content);
  });
  // Add manifest
  zip.file('_studio.json', JSON.stringify({
    name: state.project.name,
    packages: state.project.packages,
    apis: state.project.apis,
    createdBy: 'Grist Widget Studio Pro',
    exportedAt: new Date().toISOString()
  }, null, 2));
  
  const blob = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = (state.project.name || 'widget') + '.zip';
  a.click();
  URL.revokeObjectURL(url);
  showToast('Projet exporté', 'success');
}

async function importZip() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.zip,.json';
  input.onchange = async () => {
    const file = input.files[0];
    if (!file) return;
    
    if (file.name.endsWith('.json')) {
      const text = await file.text();
      try {
        loadProject(JSON.parse(text));
        showToast('Projet importé', 'success');
      } catch (e) {
        showToast('Fichier JSON invalide', 'error');
      }
      return;
    }
    
    const zip = await JSZip.loadAsync(file);
    const files = {};
    let manifest = {};
    
    for (const [name, entry] of Object.entries(zip.files)) {
      if (entry.dir) continue;
      const content = await entry.async('string');
      if (name === '_studio.json') {
        try { manifest = JSON.parse(content); } catch (e) {}
      } else {
        files[name] = content;
      }
    }
    
    loadProject({
      name: manifest.name || file.name.replace('.zip', ''),
      files,
      packages: manifest.packages || [],
      apis: manifest.apis || []
    });
    showToast('Projet importé', 'success');
  };
  input.click();
}

// ============ PROXY SETTINGS ============
function openProxyModal() {
  // Populate current values
  document.querySelector(`input[name="proxyMode"][value="${state.proxy.mode}"]`).checked = true;
  document.getElementById('proxyUrl').value = state.proxy.url || '';
  document.getElementById('proxyToken').value = state.proxy.token || '';
  document.getElementById('proxyTestResult').className = 'proxy-test-result';
  document.getElementById('proxyTestResult').textContent = '';
  updateProxyConfigVisibility();
  openModal('modalProxy');
}

function updateProxyConfigVisibility() {
  const mode = document.querySelector('input[name="proxyMode"]:checked').value;
  document.getElementById('proxyConfig').style.display = mode === 'custom' ? '' : 'none';
}

async function testProxy() {
  const url = document.getElementById('proxyUrl').value.trim();
  const token = document.getElementById('proxyToken').value.trim();
  const result = document.getElementById('proxyTestResult');
  
  if (!url) {
    result.className = 'proxy-test-result err';
    result.textContent = '⚠️ Entre une URL de proxy';
    return;
  }

  result.className = 'proxy-test-result';
  result.textContent = '⏳ Test en cours...';
  result.style.display = 'block';
  
  try {
    const headers = {};
    if (token) headers['X-Proxy-Token'] = token;
    
    const testUrl = `${url}${url.includes('?') ? '&' : '?'}url=${encodeURIComponent('https://api.github.com/zen')}`;
    const startTime = performance.now();
    const res = await fetch(testUrl, { headers });
    const duration = Math.round(performance.now() - startTime);
    
    if (res.ok) {
      const text = await res.text();
      result.className = 'proxy-test-result ok';
      result.innerHTML = `✅ Ton proxy fonctionne ! (${duration} ms) &mdash; <em>${text.substring(0, 80)}</em>`;
    } else if (res.status === 401) {
      result.className = 'proxy-test-result err';
      result.textContent = '❌ Ton proxy demande un mot de passe. Remplis le champ "Mot de passe du proxy" ci-dessous.';
    } else {
      result.className = 'proxy-test-result err';
      result.textContent = `❌ Le proxy répond avec une erreur : ${res.status} ${res.statusText}`;
    }
  } catch (err) {
    result.className = 'proxy-test-result err';
    result.textContent = `❌ Impossible de joindre le proxy. Vérifie que l'URL est correcte et que le proxy est bien en ligne. (${err.message})`;
  }
}

async function saveProxySettings() {
  const mode = document.querySelector('input[name="proxyMode"]:checked').value;
  const url = document.getElementById('proxyUrl').value.trim();
  const token = document.getElementById('proxyToken').value.trim();
  
  if (mode === 'custom' && !url) {
    showToast('Entre l\'adresse de ton proxy, ou choisis "Sans proxy".', 'warning');
    return;
  }
  
  state.proxy = { mode, url, token };
  
  // Save to localStorage (fallback)
  try {
    localStorage.setItem('gws_proxy', JSON.stringify(state.proxy));
  } catch (e) { /* ignore */ }
  
  // Save to Grist options
  if (state.gristReady) {
    try {
      const currentOpts = await grist.getOptions() || {};
      await grist.setOptions({
        ...currentOpts,
        _proxy: JSON.stringify(state.proxy)
      });
    } catch (e) {
      console.warn('Could not save to Grist:', e);
    }
  }
  
  closeModal('modalProxy');
  showToast('✅ Ton proxy est configuré. Tu peux maintenant appeler des APIs externes.', 'success');
}

const DEPLOY_INSTRUCTIONS = {
  cloudflare: `
<h4>⚡ Cloudflare Workers — ⭐ recommandé</h4>
<p><strong>Pourquoi ?</strong> Ultra rapide (le serveur est au plus près de tes utilisateurs), très généreux (100 000 appels/jour gratuits), et c'est le plus simple à configurer.</p>
<p><strong>Étape 1 &mdash; Crée un compte Cloudflare</strong> (gratuit)<br>
👉 <a href="https://dash.cloudflare.com/sign-up/workers-and-pages" target="_blank">Créer mon compte Cloudflare</a></p>
<p><strong>Étape 2 &mdash; Ouvre un terminal</strong> et exécute ces commandes, une par une :</p>
<pre><code>git clone https://github.com/isaytoo/grist-widget-studio-pro
cd grist-widget-studio-pro/proxy/cloudflare
npm install
npx wrangler login     # ouvre le navigateur pour te connecter
npx wrangler deploy    # publie ton proxy</code></pre>
<p><strong>Étape 3 &mdash; Récupère l'URL</strong><br>
À la fin du déploiement, Cloudflare affiche une URL du type :<br>
<code>https://grist-widget-studio-proxy.TON-NOM.workers.dev</code><br>
👉 <strong>Copie cette URL</strong> et colle-la dans le champ "Adresse de ton proxy" en haut.</p>
<p><strong>Étape 4 (facultatif) &mdash; Ajouter un mot de passe</strong><br>
Pour empêcher que d'autres utilisent ton proxy :</p>
<pre><code>npx wrangler secret put PROXY_TOKEN
# → Tape un mot de passe, puis reprends-le dans le widget</code></pre>
  `,
  vercel: `
<h4>▲ Vercel</h4>
<p><strong>Pourquoi ?</strong> Simple, populaire, plan gratuit généreux (100 Go-h/mois).</p>
<p><strong>Étape 1 &mdash; Crée un compte Vercel</strong> (gratuit, via GitHub)<br>
👉 <a href="https://vercel.com/signup" target="_blank">Créer mon compte Vercel</a></p>
<p><strong>Étape 2 &mdash; Ouvre un terminal</strong> :</p>
<pre><code>git clone https://github.com/isaytoo/grist-widget-studio-pro
cd grist-widget-studio-pro/proxy/vercel
npx vercel --prod</code></pre>
<p>(La commande te guide pour te connecter la 1<sup>re</sup> fois.)</p>
<p><strong>Étape 3 &mdash; Récupère l'URL</strong><br>
Vercel affiche une URL du type <code>https://grist-widget-studio-proxy.vercel.app/api/proxy</code>.<br>
👉 <strong>Copie cette URL</strong> et colle-la dans le champ "Adresse de ton proxy".</p>
<p><strong>Étape 4 (facultatif) &mdash; Mot de passe</strong><br>
Dans le dashboard Vercel → ton projet → <em>Settings → Environment Variables</em>, ajoute une variable <code>PROXY_TOKEN</code> avec le mot de passe de ton choix.</p>
  `,
  deno: `
<h4>🦕 Deno Deploy</h4>
<p><strong>Pourquoi ?</strong> Le quota gratuit le plus généreux (1&nbsp;million d'appels/mois) et le déploiement direct depuis GitHub (pas besoin de terminal).</p>
<p><strong>Étape 1 &mdash; Fork le projet sur GitHub</strong><br>
👉 <a href="https://github.com/isaytoo/grist-widget-studio-pro" target="_blank">Ouvrir le projet et cliquer sur "Fork"</a></p>
<p><strong>Étape 2 &mdash; Crée un compte Deno Deploy</strong><br>
👉 <a href="https://dash.deno.com" target="_blank">dash.deno.com</a> → connecte-toi avec GitHub</p>
<p><strong>Étape 3 &mdash; Crée un nouveau projet</strong><br>
Clique sur <em>"New Project"</em> → connecte ton fork GitHub → sélectionne le fichier <code>proxy/deno/proxy.ts</code> comme point d'entrée.</p>
<p><strong>Étape 4 &mdash; Récupère l'URL</strong><br>
Deno Deploy te donne une URL du type <code>https://grist-widget-studio-proxy.deno.dev</code>.<br>
👉 Colle-la dans le champ "Adresse de ton proxy".</p>
<p><strong>Étape 5 (facultatif) &mdash; Mot de passe</strong><br>
Dans <em>Project Settings → Env Variables</em>, ajoute <code>PROXY_TOKEN</code>.</p>
  `,
  netlify: `
<h4>🟢 Netlify</h4>
<p><strong>Pourquoi ?</strong> Une alternative simple à Vercel, avec 125&nbsp;000 appels/mois gratuits.</p>
<p><strong>Étape 1 &mdash; Crée un compte Netlify</strong><br>
👉 <a href="https://app.netlify.com/signup" target="_blank">Créer mon compte Netlify</a></p>
<p><strong>Étape 2 &mdash; Terminal :</strong></p>
<pre><code>git clone https://github.com/isaytoo/grist-widget-studio-pro
cd grist-widget-studio-pro/proxy/netlify
npx netlify deploy --prod</code></pre>
<p><strong>Étape 3 &mdash; L'URL de ton proxy</strong><br>
Netlify te donne une URL. Ajoute <code>/proxy</code> à la fin, par exemple :<br>
<code>https://ton-site.netlify.app/proxy</code><br>
👉 Colle-la dans le champ "Adresse de ton proxy".</p>
  `,
  node: `
<h4>🟩 Sur ton propre serveur (Node.js ou Docker)</h4>
<p><strong>Pour qui ?</strong> Tu as déjà un VPS, un Raspberry Pi, ou tu préfères tout auto-héberger.</p>
<p><strong>Option A &mdash; Node.js direct :</strong></p>
<pre><code>git clone https://github.com/isaytoo/grist-widget-studio-pro
cd grist-widget-studio-pro/proxy/node
PROXY_TOKEN=mon-mot-de-passe node server.js</code></pre>
<p>→ Le proxy tourne sur <code>http://localhost:8080</code></p>
<p><strong>Option B &mdash; Docker :</strong></p>
<pre><code>cd proxy/node
docker build -t grist-proxy .
docker run -d -p 8080:8080 -e PROXY_TOKEN=mon-mot-de-passe --name grist-proxy grist-proxy</code></pre>
<p><strong>⚠️ Important :</strong> Grist (et donc ton widget) nécessite <strong>HTTPS</strong>. Utilise Nginx, Caddy ou Cloudflare Tunnel devant ton serveur pour ajouter HTTPS.<br>
URL finale à coller : <code>https://ton-domaine.fr/</code></p>
  `
};

// ============ UI HELPERS ============
function showToast(msg, type = 'info') {
  const toast = document.createElement('div');
  toast.className = 'toast ' + type;
  toast.textContent = msg;
  document.getElementById('toastContainer').appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function setStatus(type, text) {
  const indicator = document.getElementById('statusIndicator');
  indicator.className = 'status-indicator ' + (type || '');
  document.getElementById('statusText').textContent = text;
}

function openModal(id) {
  document.getElementById(id).classList.add('show');
}

function closeModal(id) {
  document.getElementById(id).classList.remove('show');
}

function toggleTheme() {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = state.theme;
  document.getElementById('themeIcon').textContent = state.theme === 'dark' ? '☀️' : '🌙';
  if (state.monaco) {
    state.monaco.editor.setTheme(state.theme === 'dark' ? 'studio-dark' : 'vs');
  }
}

// ============ EVENT LISTENERS ============
function setupEventListeners() {
  // Toolbar
  document.getElementById('btnRun').addEventListener('click', () => runPreview(true));
  document.getElementById('btnSave').addEventListener('click', saveProject);
  document.getElementById('btnInstall').addEventListener('click', installWidget);
  document.getElementById('btnTemplates').addEventListener('click', () => openModal('modalTemplates'));
  document.getElementById('btnPackages').addEventListener('click', () => { renderPackages(); openModal('modalPackages'); });
  document.getElementById('btnExport').addEventListener('click', exportZip);
  document.getElementById('btnImport').addEventListener('click', importZip);
  document.getElementById('btnHelp').addEventListener('click', () => openModal('modalHelp'));
  document.getElementById('btnTheme').addEventListener('click', toggleTheme);
  
  // Help tabs
  document.querySelectorAll('.help-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.help-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.help-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const panel = document.querySelector(`.help-panel[data-help-panel="${tab.dataset.helpTab}"]`);
      if (panel) panel.classList.add('active');
    });
  });
  
  // Proxy settings
  document.getElementById('btnProxySettings').addEventListener('click', openProxyModal);
  document.getElementById('btnTestProxy').addEventListener('click', testProxy);
  document.getElementById('btnSaveProxy').addEventListener('click', saveProxySettings);
  document.querySelectorAll('input[name="proxyMode"]').forEach(input => {
    input.addEventListener('change', updateProxyConfigVisibility);
  });
  document.querySelectorAll('.deploy-card').forEach(card => {
    card.addEventListener('click', (e) => {
      const platform = card.dataset.platform;
      if (platform && DEPLOY_INSTRUCTIONS[platform]) {
        document.getElementById('deployInstructionsContent').innerHTML = DEPLOY_INSTRUCTIONS[platform];
        document.getElementById('deployInstructions').open = true;
        document.getElementById('deployInstructions').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  });
  
  // Sidebar
  document.getElementById('btnAddFile').addEventListener('click', addFile);
  document.getElementById('btnRefreshTables').addEventListener('click', refreshTables);
  
  // Preview tabs
  document.querySelectorAll('.preview-tab').forEach(t => {
    t.addEventListener('click', () => {
      document.querySelectorAll('.preview-tab').forEach(x => x.classList.remove('active'));
      document.querySelectorAll('.preview-panel').forEach(x => x.classList.remove('active'));
      t.classList.add('active');
      document.getElementById('panel' + t.dataset.tab.charAt(0).toUpperCase() + t.dataset.tab.slice(1)).classList.add('active');
    });
  });
  
  // Device select
  document.getElementById('deviceSelect').addEventListener('change', (e) => {
    const wrap = document.getElementById('previewWrapper');
    wrap.className = 'preview-frame-wrapper device-' + e.target.value;
  });
  
  // Reload
  document.getElementById('btnReload').addEventListener('click', () => runPreview(true));
  
  // Fullscreen
  document.getElementById('btnFullscreen').addEventListener('click', () => {
    const iframe = document.getElementById('previewFrame');
    if (iframe.requestFullscreen) iframe.requestFullscreen();
  });
  
  // API tester
  document.getElementById('btnSendApi').addEventListener('click', sendApiRequest);
  document.querySelectorAll('.api-tab').forEach(t => {
    t.addEventListener('click', () => {
      document.querySelectorAll('.api-tab').forEach(x => x.classList.remove('active'));
      document.querySelectorAll('.api-panel').forEach(x => x.classList.remove('active'));
      t.classList.add('active');
      document.querySelector(`.api-panel[data-api-panel="${t.dataset.apiTab}"]`).classList.add('active');
    });
  });
  document.querySelectorAll('.btn-add-row').forEach(btn => {
    btn.addEventListener('click', () => addKvRow(btn.dataset.target));
  });
  document.getElementById('btnCopyResponse').addEventListener('click', () => {
    navigator.clipboard.writeText(document.getElementById('responseBody').textContent);
    showToast('Copié', 'success');
  });
  document.getElementById('btnUseInCode').addEventListener('click', () => {
    const method = document.getElementById('apiMethod').value;
    const url = document.getElementById('apiUrl').value;
    const useCors = document.getElementById('useCorsProxy').checked;
    const proxyUrl = getProxyUrl();
    const hasToken = !!state.proxy.token;
    const headers = getKvValues('headersEditor');
    if (useCors && hasToken) headers['X-Proxy-Token'] = 'YOUR_PROXY_TOKEN_HERE';
    
    const finalUrl = useCors && proxyUrl
      ? `\`${proxyUrl}${proxyUrl.includes('?') ? '&' : '?'}url=\${encodeURIComponent('${url}')}\``
      : `'${url}'`;
    
    const proxyComment = useCors && proxyUrl
      ? `// Via proxy CORS : ${proxyUrl}\n`
      : '';
    
    const snippet = `
${proxyComment}// Requête ${method} générée par le Studio
async function fetchData() {
  const res = await fetch(${finalUrl}, {
    method: '${method}',
    headers: ${JSON.stringify(headers, null, 4)}
  });
  const data = await res.json();
  console.log(data);
  return data;
}
fetchData();
`;
    if (state.activeFile === 'script.js') {
      const current = state.editor.getValue();
      state.editor.setValue(current + '\n' + snippet);
    } else {
      openFile('script.js');
      setTimeout(() => {
        const current = state.editor.getValue();
        state.editor.setValue(current + '\n' + snippet);
      }, 100);
    }
    showToast('Code ajouté dans script.js', 'success');
  });
  
  // Console
  document.getElementById('btnClearConsole').addEventListener('click', clearConsole);
  document.querySelectorAll('.console-header .filter-check input').forEach(input => {
    input.addEventListener('change', renderConsole);
  });
  
  // Network
  document.getElementById('btnClearNetwork').addEventListener('click', () => {
    state.networkEntries = [];
    renderNetwork();
  });
  
  // Modals close
  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => closeModal(btn.dataset.close));
  });
  document.querySelectorAll('.modal-backdrop').forEach(b => {
    b.addEventListener('click', () => {
      b.closest('.modal').classList.remove('show');
    });
  });
  
  // Packages modal
  document.getElementById('btnAddPackage').addEventListener('click', () => {
    const pkg = document.getElementById('packageSearch').value.trim();
    if (pkg) {
      addPackage(pkg);
      document.getElementById('packageSearch').value = '';
    }
  });
  document.querySelectorAll('.pkg-tag').forEach(tag => {
    tag.addEventListener('click', () => addPackage(tag.dataset.pkg));
  });
  
  // Template search
  const templateSearch = document.getElementById('templatesSearch');
  if (templateSearch) {
    templateSearch.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase();
      document.querySelectorAll('.template-card').forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(q) ? '' : 'none';
      });
    });
  }
  
  // Global keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      saveProject();
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      runPreview(true);
    }
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal.show').forEach(m => m.classList.remove('show'));
    }
  });
  
  // Resizers
  setupResizer('resizerLeft', 'sidebarLeft', true);
  setupResizer('resizerRight', 'sidebarRight', false);
  
  // Project name
  document.getElementById('projectName').addEventListener('input', (e) => {
    state.project.name = e.target.textContent;
  });
}

function setupResizer(resizerId, panelId, isLeft) {
  const resizer = document.getElementById(resizerId);
  const panel = document.getElementById(panelId);
  let startX = 0;
  let startWidth = 0;
  
  resizer.addEventListener('mousedown', (e) => {
    startX = e.clientX;
    startWidth = panel.offsetWidth;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    
    function onMove(ev) {
      const delta = ev.clientX - startX;
      const newWidth = isLeft ? startWidth + delta : startWidth - delta;
      if (newWidth > 150 && newWidth < window.innerWidth - 300) {
        panel.style.width = newWidth + 'px';
      }
    }
    
    function onUp() {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }
    
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  });
}
