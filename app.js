/**
 * Grist Widget Studio Pro - Main Application
 * Copyright 2026 Said Hamadou (isaytoo)
 * Licensed under the Apache License, Version 2.0
 */

// ============ I18N ============
const i18n = {
  fr: {
    // Topbar
    projectDefault: 'Mon Widget',
    btnPreview: 'Preview',
    btnSave: 'Sauvegarder',
    btnInstall: 'Installer',
    btnTemplates: 'Templates',
    btnPackages: 'Packages',
    btnExport: 'Export',
    btnImport: 'Import',
    btnProxy: 'Proxy',
    titlePreview: 'Lancer preview (Ctrl+Enter)',
    titleSave: 'Sauvegarder (Ctrl+S)',
    titleInstall: 'Installer dans ce widget',
    titleTemplates: 'Templates',
    titlePackages: 'Packages CDN',
    titleExport: 'Exporter en ZIP',
    titleImport: 'Importer un ZIP',
    titleProxy: 'Configuration du proxy CORS',
    titleTheme: 'Changer de thème',
    titleHelp: 'Aide',
    statusReady: 'Prêt',
    // Sidebar
    explorer: 'EXPLORER',
    apiCollections: 'API COLLECTIONS',
    gristTables: 'GRIST TABLES',
    newFile: 'Nouveau fichier',
    newApi: 'Nouvelle API',
    refreshTables: 'Rafraîchir',
    noApi: 'Aucune API. Clique + pour en ajouter.',
    loadingTables: 'Chargement...',
    noTables: 'Aucune table',
    gristUnavailable: 'Grist non disponible',
    // Preview tabs
    tabPreview: '👁 Preview',
    tabApi: '🌐 API',
    tabConsole: '🐛 Console',
    tabNetwork: '📡 Network',
    // Preview controls
    deviceDesktop: '💻 Desktop',
    deviceTablet: '📱 Tablet (768px)',
    deviceMobile: '📱 Mobile (375px)',
    titleReload: 'Reload (Ctrl+R)',
    titleFullscreen: 'Plein écran',
    // API tester
    authNone: 'Aucune',
    bodyNone: 'Aucun',
    bodyJson: 'JSON',
    bodyForm: 'Form Data',
    bodyRaw: 'Raw Text',
    responseEmpty: 'Envoie une requête pour voir la réponse ici...',
    btnCopyResponse: '📋 Copier',
    btnUseInCode: '→ Insérer dans le code',
    // Console
    btnClear: '🗑 Clear',
    filterLogs: 'Logs',
    filterWarnings: 'Warnings',
    filterErrors: 'Errors',
    filterInfo: 'Info',
    networkRequests: ' requêtes',
    // Templates modal
    modalTemplatesTitle: '📚 Templates',
    templatesSearch: 'Rechercher un template...',
    // Packages modal
    modalPackagesTitle: '📦 Packages CDN',
    packagesDesc: 'Ajoute des bibliothèques via CDN (jsDelivr, unpkg). Elles seront automatiquement incluses dans ton widget.',
    packageSearch: 'Nom du package (ex: chart.js, d3, leaflet)...',
    btnAddPackage: 'Ajouter',
    packagesInstalled: 'Installés',
    noPackages: 'Aucun package installé',
    // Proxy modal
    modalProxyTitle: '🔌 Configuration du Proxy CORS',
    proxyCorsTitle: '💡 C\'est quoi un proxy CORS\u00a0?',
    proxyCorsDesc: 'Quand ton widget appelle une API externe (ex:\u00a0OpenWeather, GitHub…), le navigateur bloque souvent la requête pour des raisons de sécurité\u00a0: c\'est le <strong>blocage CORS</strong>. Un proxy est un petit serveur intermédiaire qui fait la requête <em>à ta place</em> et te renvoie la réponse sans blocage.',
    proxyModeTitle: 'Comment veux-tu gérer les appels API\u00a0?',
    proxyModeNone: '🚫 Sans proxy',
    proxyModeNoneDesc: 'J\'appelle uniquement des APIs qui autorisent déjà mon site. Les autres retourneront une erreur "CORS".',
    proxyModeCustom: '✨ Avec mon proxy (recommandé)',
    proxyModeCustomDesc: 'J\'installe un petit serveur relais (gratuit, 2\u00a0min de config) pour contourner les blocages CORS.',
    proxyUrlLabel: 'Adresse de ton proxy',
    proxyUrlPlaceholder: 'https://mon-proxy.workers.dev',
    btnTestProxy: 'Vérifier',
    proxyUrlHelp: 'Colle ici l\'URL que tu as obtenue après avoir déployé ton proxy (étape ci-dessous).',
    proxyTokenLabel: 'Mot de passe du proxy (facultatif)',
    proxyTokenPlaceholder: 'Laisse vide si tu n\'as pas configuré de mot de passe',
    proxyTokenHelp: 'Si tu as protégé ton proxy avec un <code>PROXY_TOKEN</code>, saisis-le ici. Sinon laisse vide.',
    proxyDeployTitle: '🚀 Je n\'ai pas encore de proxy\u00a0: comment en créer un\u00a0?',
    proxyDeployDesc: 'Choisis un hébergeur ci-dessous\u00a0: tous proposent un <strong>plan gratuit</strong> largement suffisant. Clique sur une vignette\u00a0: les instructions détaillées s\'affichent juste en-dessous.',
    deployInstructionsLabel: '📖 Voir les instructions pas-à-pas',
    btnSaveProxy: '💾 Enregistrer la configuration',
    btnClose: 'Fermer',
    // Help modal
    modalHelpTitle: '❓ Aide - Widget Studio Pro',
    helpTabIntro: '👋 Introduction',
    helpTabInterface: '🖥 Interface',
    helpTabWorkflow: '🚀 Premier widget',
    helpTabGristApi: '🌐 API Grist',
    helpTabApiTester: '📡 API Tester',
    helpTabProxy: '🔌 Proxy CORS',
    helpTabShortcuts: '⌨️ Raccourcis',
    helpTabFaq: '💡 FAQ',
    // Toasts
    toastSaving: 'Sauvegarde...',
    toastSaved: '💾 Projet sauvegardé dans Grist',
    toastSaveError: 'Erreur sauvegarde : ',
    toastLoaded: 'Projet chargé depuis Grist',
    toastInstalled: '✅ Widget installé\u00a0! Reload la page pour l\'activer.',
    toastInstallError: 'Erreur : ',
    toastGristUnavailable: 'Grist non disponible',
    toastProxyOk: '✅ Proxy opérationnel\u00a0!',
    toastProxyError: '❌ Proxy inaccessible : ',
    toastProxySaved: '✅ Configuration proxy sauvegardée',
    toastExported: 'Projet exporté',
    toastImported: 'Projet importé',
    toastCodeAdded: 'Code ajouté dans script.js',
    toastTemplateLoaded: 'Template chargé',
    toastPackageAdded: 'Package ajouté : ',
    toastPackageRemoved: 'Package supprimé',
    toastFileExists: 'Ce fichier existe déjà',
    toastConfigOpen: 'Configuration ouverte',
    // Installed mode bar
    installedMode: 'Mode widget installé',
    btnEditIde: '✏️ Modifier (retour IDE)',
    uninstallConfirm: 'Retourner à l\'IDE ? Le widget installé sera désactivé.',
    // Table Builder
    btnTableBuilder: 'Tables',
    titleTableBuilder: 'Créer des tables Grist',
    modalTableBuilderTitle: '🗂 Créer des tables Grist',
    tableBuilderDesc: 'Crée une nouvelle table directement dans ton document Grist. Elle apparaîtra immédiatement dans le panneau gauche de Grist.',
    tableNameLabel: 'Nom de la table',
    tableNamePlaceholder: 'MaTable',
    tbColumnsTitle: 'Colonnes',
    btnTbAddColumn: '+ Ajouter une colonne',
    btnTbCreate: '✅ Créer la table dans Grist',
    tbExistingTitle: '📊 Tables existantes',
    tbColName: 'Nom',
    tbColType: 'Type',
    tbColLabel: 'Label',
    tbDeleteCol: 'Supprimer',
    toastTableCreated: '✅ Table créée dans Grist !',
    toastTableError: 'Erreur création table : ',
    toastTableNameRequired: 'Donne un nom à la table',
    toastTableColRequired: 'Chaque colonne doit avoir un nom',
    tbDeleteTable: 'Supprimer cette table ?',
    toastTableDeleted: 'Table supprimée',
    toastTableDeleteError: 'Erreur suppression : ',
    tbSnippetCopied: 'Snippet copié dans script.js',
    // Misc
    confirmDeleteFile: 'Supprimer ce fichier ?',
    confirmLoadTemplate: 'Charger ce template ? Le projet actuel sera remplacé.',
    confirmUninstall: 'Retourner à l\'IDE ? Le widget installé sera désactivé.',
  },
  en: {
    // Topbar
    projectDefault: 'My Widget',
    btnPreview: 'Preview',
    btnSave: 'Save',
    btnInstall: 'Install',
    btnTemplates: 'Templates',
    btnPackages: 'Packages',
    btnExport: 'Export',
    btnImport: 'Import',
    btnProxy: 'Proxy',
    titlePreview: 'Run preview (Ctrl+Enter)',
    titleSave: 'Save (Ctrl+S)',
    titleInstall: 'Install as standalone widget',
    titleTemplates: 'Templates',
    titlePackages: 'CDN Packages',
    titleExport: 'Export as ZIP',
    titleImport: 'Import a ZIP',
    titleProxy: 'CORS Proxy settings',
    titleTheme: 'Toggle theme',
    titleHelp: 'Help',
    statusReady: 'Ready',
    // Sidebar
    explorer: 'EXPLORER',
    apiCollections: 'API COLLECTIONS',
    gristTables: 'GRIST TABLES',
    newFile: 'New file',
    newApi: 'New API',
    refreshTables: 'Refresh',
    noApi: 'No API. Click + to add one.',
    loadingTables: 'Loading...',
    noTables: 'No tables',
    gristUnavailable: 'Grist not available',
    // Preview tabs
    tabPreview: '👁 Preview',
    tabApi: '🌐 API',
    tabConsole: '🐛 Console',
    tabNetwork: '📡 Network',
    // Preview controls
    deviceDesktop: '💻 Desktop',
    deviceTablet: '📱 Tablet (768px)',
    deviceMobile: '📱 Mobile (375px)',
    titleReload: 'Reload (Ctrl+R)',
    titleFullscreen: 'Fullscreen',
    // API tester
    authNone: 'None',
    bodyNone: 'None',
    bodyJson: 'JSON',
    bodyForm: 'Form Data',
    bodyRaw: 'Raw Text',
    responseEmpty: 'Send a request to see the response here...',
    btnCopyResponse: '📋 Copy',
    btnUseInCode: '→ Insert in code',
    // Console
    btnClear: '🗑 Clear',
    filterLogs: 'Logs',
    filterWarnings: 'Warnings',
    filterErrors: 'Errors',
    filterInfo: 'Info',
    networkRequests: ' requests',
    // Templates modal
    modalTemplatesTitle: '📚 Templates',
    templatesSearch: 'Search a template...',
    // Packages modal
    modalPackagesTitle: '📦 CDN Packages',
    packagesDesc: 'Add libraries via CDN (jsDelivr, unpkg). They will be automatically included in your widget.',
    packageSearch: 'Package name (e.g. chart.js, d3, leaflet)...',
    btnAddPackage: 'Add',
    packagesInstalled: 'Installed',
    noPackages: 'No packages installed',
    // Proxy modal
    modalProxyTitle: '🔌 CORS Proxy Settings',
    proxyCorsTitle: '💡 What is a CORS proxy?',
    proxyCorsDesc: 'When your widget calls an external API (e.g. OpenWeather, GitHub…), the browser often blocks the request for security reasons: this is the <strong>CORS block</strong>. A proxy is a small relay server that makes the request <em>on your behalf</em> and returns the response without blocking.',
    proxyModeTitle: 'How do you want to handle API calls?',
    proxyModeNone: '🚫 Without proxy',
    proxyModeNoneDesc: 'I only call APIs that already allow my site. Others will return a "CORS" error.',
    proxyModeCustom: '✨ With my proxy (recommended)',
    proxyModeCustomDesc: 'I\'ll set up a small relay server (free, 2\u00a0min setup) to bypass CORS blocks.',
    proxyUrlLabel: 'Your proxy address',
    proxyUrlPlaceholder: 'https://my-proxy.workers.dev',
    btnTestProxy: 'Test',
    proxyUrlHelp: 'Paste here the URL you got after deploying your proxy (step below).',
    proxyTokenLabel: 'Proxy password (optional)',
    proxyTokenPlaceholder: 'Leave empty if you have not set a password',
    proxyTokenHelp: 'If you protected your proxy with a <code>PROXY_TOKEN</code>, enter it here. Otherwise leave empty.',
    proxyDeployTitle: '🚀 I don\'t have a proxy yet: how to create one?',
    proxyDeployDesc: 'Choose a hosting provider below: all offer a <strong>free plan</strong> that is more than sufficient. Click a tile: detailed instructions appear below.',
    deployInstructionsLabel: '📖 View step-by-step instructions',
    btnSaveProxy: '💾 Save configuration',
    btnClose: 'Close',
    // Help modal
    modalHelpTitle: '❓ Help - Widget Studio Pro',
    helpTabIntro: '👋 Introduction',
    helpTabInterface: '🖥 Interface',
    helpTabWorkflow: '🚀 First widget',
    helpTabGristApi: '🌐 Grist API',
    helpTabApiTester: '📡 API Tester',
    helpTabProxy: '🔌 CORS Proxy',
    helpTabShortcuts: '⌨️ Shortcuts',
    helpTabFaq: '💡 FAQ',
    // Toasts
    toastSaving: 'Saving...',
    toastSaved: '💾 Project saved to Grist',
    toastSaveError: 'Save error: ',
    toastLoaded: 'Project loaded from Grist',
    toastInstalled: '✅ Widget installed! Reload the page to activate it.',
    toastInstallError: 'Error: ',
    toastGristUnavailable: 'Grist not available',
    toastProxyOk: '✅ Proxy is working!',
    toastProxyError: '❌ Proxy unreachable: ',
    toastProxySaved: '✅ Proxy configuration saved',
    toastExported: 'Project exported',
    toastImported: 'Project imported',
    toastCodeAdded: 'Code added to script.js',
    toastTemplateLoaded: 'Template loaded',
    toastPackageAdded: 'Package added: ',
    toastPackageRemoved: 'Package removed',
    toastFileExists: 'This file already exists',
    toastConfigOpen: 'Configuration opened',
    // Installed mode bar
    installedMode: 'Installed widget mode',
    btnEditIde: '✏️ Edit (back to IDE)',
    uninstallConfirm: 'Return to IDE? The installed widget will be deactivated.',
    // Table Builder
    btnTableBuilder: 'Tables',
    titleTableBuilder: 'Create Grist tables',
    modalTableBuilderTitle: '🗂 Create Grist tables',
    tableBuilderDesc: 'Create a new table directly in your Grist document. It will appear immediately in the Grist left panel.',
    tableNameLabel: 'Table name',
    tableNamePlaceholder: 'MyTable',
    tbColumnsTitle: 'Columns',
    btnTbAddColumn: '+ Add column',
    btnTbCreate: '✅ Create table in Grist',
    tbExistingTitle: '📊 Existing tables',
    tbColName: 'Name',
    tbColType: 'Type',
    tbColLabel: 'Label',
    tbDeleteCol: 'Delete',
    toastTableCreated: '✅ Table created in Grist!',
    toastTableError: 'Table creation error: ',
    toastTableNameRequired: 'Please give the table a name',
    toastTableColRequired: 'Every column must have a name',
    tbDeleteTable: 'Delete this table?',
    toastTableDeleted: 'Table deleted',
    toastTableDeleteError: 'Delete error: ',
    tbSnippetCopied: 'Snippet added to script.js',
    // Misc
    confirmDeleteFile: 'Delete this file?',
    confirmLoadTemplate: 'Load this template? The current project will be replaced.',
    confirmUninstall: 'Return to IDE? The installed widget will be deactivated.',
  }
};

let currentLang = (navigator.language || 'fr').substring(0, 2) === 'en' ? 'en' : 'fr';

function t(key) {
  return (i18n[currentLang] && i18n[currentLang][key]) || i18n['fr'][key] || key;
}

function setLang(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  applyI18n();
}

function applyI18n() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = t(key);
    if (val) el.innerHTML = val;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    const val = t(key);
    if (val) el.placeholder = val;
  });
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const key = el.getAttribute('data-i18n-title');
    const val = t(key);
    if (val) el.title = val;
  });
  // Update lang buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === currentLang);
  });
}

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
      showToast(t('toastConfigOpen'), 'info');
    }
  });

  grist.onOptions(async (options) => {
    state.gristReady = true;
    state.gristOptions = options || {};  // preserve full options for safe setOptions calls

    // Mode widget installé : afficher le rendu final au lieu de l'IDE
    if (options && options._installed && options._html) {
      renderInstalledWidget(options._html, options._js || '');
      return;
    }

    if (options && options._project) {
      if (state.monaco) {
        // Monaco already ready — load immediately
        try {
          loadProject(JSON.parse(options._project));
          showToast(t('toastLoaded'), 'success');
        } catch (e) {
          console.error('Load error:', e);
        }
      } else {
        // Monaco not yet initialised — queue for when it's ready
        state.pendingProject = options._project;
      }
    }
    if (options && options._proxy) {
      try {
        state.proxy = Object.assign(state.proxy, JSON.parse(options._proxy));
      } catch (e) { /* ignore */ }
    }
    if (state.monaco) refreshTables();
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

  // Apply any project queued before Monaco was ready (race condition guard)
  if (state.pendingProject) {
    try {
      loadProject(JSON.parse(state.pendingProject));
      showToast(t('toastLoaded'), 'success');
    } catch (e) {
      console.error('Load error (deferred):', e);
    }
    state.pendingProject = null;
  }

  // Initial render
  applyI18n();
  renderFileTree();
  renderTabs();
  renderTemplates();
  runPreview();
  initApiTester();
  setupEventListeners();
  refreshTables();
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
    showToast(t('toastFileExists'), 'warning');
    return;
  }
  state.project.files[name] = '';
  const uri = state.monaco.Uri.parse('file:///' + name);
  state.models[name] = state.monaco.editor.createModel('', getLanguageFromFile(name), uri);
  openFile(name);
  markDirty(name);
}

async function deleteFile(filename) {
  if (['index.html', 'script.js', 'style.css', 'config.json'].includes(filename)) {
    showToast('Les fichiers principaux ne peuvent pas être supprimés', 'warning');
    return;
  }
  if (!await showConfirm(t('confirmDeleteFile'), { icon: '🗑', danger: true, confirmText: t('tbDeleteCol'), cancelText: t('btnClose') })) return;
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

// Build a full HTML page from a project's files, handling both the case where
// index.html is a fragment (just body content) and a complete document (with
// <html>/<head>/<body>/<!doctype>). User-defined <head> content (including
// inline <style> blocks, <link>, <meta>) is preserved instead of being injected
// into the wrapper's body.
// Injected as the VERY FIRST script in the preview <head>.
// Defines window.grist from scratch so grist-plugin-api.js (if present) gets
// ignored or overwritten — no property-descriptor conflicts.
const GRIST_PROXY_SCRIPT = `
(function(){
  var pending={},seq=0;
  window.addEventListener('message',function(e){
    if(!e.data)return;
    if(e.data.type==='__gp_res'){var cb=pending[e.data.id];if(cb){delete pending[e.data.id];e.data.err?cb.reject(new Error(e.data.err)):cb.resolve(e.data.result);}}
    if(e.data.type==='__gp_evt'){if(e.data.ev==='options'&&window.__gpOptCb)window.__gpOptCb(e.data.d);if(e.data.ev==='record'&&window.__gpRecCb)window.__gpRecCb(e.data.d);if(e.data.ev==='records'&&window.__gpRecsCb)window.__gpRecsCb(e.data.d,e.data.m);}
  });
  function call(m,a){return new Promise(function(res,rej){var id=++seq;pending[id]={resolve:res,reject:rej};parent.postMessage({type:'__gp_req',id:id,method:m,args:a||[]},'*');setTimeout(function(){if(pending[id]){delete pending[id];rej(new Error('timeout:'+m));}},10000);});}
  // Define grist BEFORE any other script runs — replaces grist-plugin-api.js entirely
  window.grist={
    ready:function(o){parent.postMessage({type:'__gp_ready',opts:o||{}},'*');},
    onOptions:function(cb){window.__gpOptCb=cb;},
    onRecord:function(cb){window.__gpRecCb=cb;},
    onRecords:function(cb){window.__gpRecsCb=cb;},
    setOptions:function(o){return call('setOptions',[o]);},
    getOptions:function(){return call('getOptions',[]);},
    docApi:new Proxy({},{get:function(_,p){return function(){return call('docApi.'+p,Array.from(arguments));};}})
  };
  parent.postMessage({type:'__gp_ping'},'*');
})();
`;

function composeFullPage({ html, css, js, packages, withConsoleProbe, withGristProxy }) {
  const packageTags = (packages || []).map(p => {
    const url = `https://cdn.jsdelivr.net/npm/${p}`;
    if (p.endsWith('.css') || p.includes('leaflet')) {
      return `<link rel="stylesheet" href="${url}"><script src="${url}"></` + `script>`;
    }
    return `<script src="${url}"></` + `script>`;
  }).join('\n');

  const gristApi = `<script src="https://docs.getgrist.com/grist-plugin-api.js"></` + `script>`;
  // In proxy mode: inject grist replacement as first script, strip grist-plugin-api.js
  const gristProxy = withGristProxy ? `<script>${GRIST_PROXY_SCRIPT}</` + `script>` : '';

  const consoleScript = withConsoleProbe ? `<script>
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
</` + `script>` : '';

  const userScript = js ? `<script>${js}</` + `script>` : '';
  const userStyle = css ? `<style>${css}</style>` : '';

  const isFullDoc = /<html[\s>]/i.test(html) || /<head[\s>]/i.test(html) || /<!doctype/i.test(html);

  if (isFullDoc) {
    let out = html;
    // Strip any existing grist-plugin-api.js when proxy mode is on
    if (withGristProxy) {
      out = out.replace(/<script[^>]+grist-plugin-api[^>]*><\/script>/gi, '');
    }
    // In proxy mode: proxy script goes FIRST so window.grist is defined before anything else.
    // In normal mode: grist-plugin-api.js is injected before </head>.
    const headInject = withGristProxy
      ? `\n${gristProxy}\n${packageTags}\n${userStyle}\n`
      : `\n${gristApi}\n${packageTags}\n${userStyle}\n`;
    if (/<head[^>]*>/i.test(out)) {
      out = out.replace(/<head([^>]*)>/i, '<head$1>' + headInject);
    } else if (/<html[^>]*>/i.test(out)) {
      out = out.replace(/<html([^>]*)>/i, '<html$1>\n<head>' + headInject + '</head>');
    } else {
      out = `<head>${headInject}</head>\n` + out;
    }
    const bodyInject = `\n${consoleScript}\n${userScript}\n`;
    if (/<\/body>/i.test(out)) {
      out = out.replace(/<\/body>/i, bodyInject + '</body>');
    } else {
      out += bodyInject;
    }
    return out;
  }

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
${withGristProxy ? gristProxy : gristApi}
${packageTags}
${userStyle}
</head>
<body>
${html}
${consoleScript}
${userScript}
</body>
</html>`;
}

function scheduleHotReload() {
  if (state.hotReloadTimer) clearTimeout(state.hotReloadTimer);
  state.hotReloadTimer = setTimeout(() => runPreview(), 600);
}

function runPreview(showToastMsg = false) {
  const iframe = document.getElementById('previewFrame');
  const html = state.project.files['index.html'] || '';
  let css = state.project.files['style.css'] || '';
  let js = state.project.files['script.js'] || '';

  // Append any extra .js / .css files that aren't the canonical 4 entries
  Object.keys(state.project.files).forEach(f => {
    if (['index.html', 'script.js', 'style.css', 'config.json'].includes(f)) return;
    if (f.endsWith('.js')) js += `\n// ===== ${f} =====\n` + state.project.files[f];
    if (f.endsWith('.css')) css += `\n/* ===== ${f} ===== */\n` + state.project.files[f];
  });

  const fullHtml = composeFullPage({
    html, css, js,
    packages: state.project.packages || [],
    withConsoleProbe: true,
    withGristProxy: true
  });

  const blob = new Blob([fullHtml], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  iframe.src = url;
  setTimeout(() => URL.revokeObjectURL(url), 2000);

  if (showToastMsg) showToast(t('btnPreview'), 'success');
  setStatus('ok', 'Prévisualisation');
}

// Listen to console + Grist proxy messages from preview iframe
window.addEventListener('message', (e) => {
  if (e.data && e.data.type === '__studio_console') {
    addConsoleEntry(e.data.level, e.data.args.join(' '));
    return;
  }

  const previewWin = document.getElementById('previewFrame')?.contentWindow;
  if (!e.data || e.source !== previewWin) return;

  // Preview widget called grist.ready() → send back current options
  if (e.data.type === '__gp_ready' || e.data.type === '__gp_ping') {
    previewWin.postMessage({ type: '__gp_evt', ev: 'options', d: state.gristOptions || {} }, '*');
    return;
  }

  // Preview widget called a docApi / setOptions / getOptions method
  if (e.data.type === '__gp_req') {
    const { id, method, args } = e.data;
    addConsoleEntry('info', '[Studio→Grist proxy] ' + method);
    let p;
    try {
      if (method.startsWith('docApi.')) {
        const fn = method.slice('docApi.'.length);
        const docApi = grist && grist.docApi;
        if (docApi && typeof docApi[fn] === 'function') {
          p = docApi[fn](...(args || []));
        } else {
          addConsoleEntry('error', '[proxy] grist.docApi.' + fn + ' unavailable');
          previewWin.postMessage({ type: '__gp_res', id, err: 'docApi.' + fn + ' not available' }, '*');
          return;
        }
      } else if (method === 'setOptions') {
        p = state.gristReady ? grist.setOptions(...(args || [])) : Promise.resolve();
      } else if (method === 'getOptions') {
        p = Promise.resolve(state.gristOptions || {});
      }
    } catch (err) {
      addConsoleEntry('error', '[proxy] ' + method + ': ' + err.message);
      previewWin.postMessage({ type: '__gp_res', id, err: err.message }, '*');
      return;
    }
    if (p) {
      p.then(r => {
        addConsoleEntry('info', '[proxy] ' + method + ' → OK');
        previewWin.postMessage({ type: '__gp_res', id, result: r }, '*');
      }).catch(err => {
        addConsoleEntry('error', '[proxy] ' + method + ' → ' + err.message);
        previewWin.postMessage({ type: '__gp_res', id, err: err.message }, '*');
      });
    }
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

async function loadTemplate(id) {
  const tpl = window.WIDGET_TEMPLATES.find(t => t.id === id);
  if (!tpl) return;
  if (!await showConfirm(t('confirmLoadTemplate'), { icon: '📚', confirmText: t('btnTbCreate').replace('✅ ', '') })) return;

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
  showToast(t('toastTemplateLoaded'), 'success');
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
  showToast(t('toastPackageAdded') + pkg, 'success');
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
  setStatus('saving', t('toastSaving'));
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
    showToast(t('toastSaved'), 'success');
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
  // Uses document.write() to fully reset grist-plugin-api.js so the installed
  // widget's grist.ready() / grist.onOptions() re-register correctly with Grist.
  // window.parent stays === Grist (same iframe). UrlState console error is non-fatal.

  window.__studioUninstall = async function() {
    const ok = await showConfirm(t('uninstallConfirm'), { icon: '✏️', confirmText: t('btnEditIde').replace('✏️ ', '') });
    if (ok) {
      const opts = Object.assign({}, state.gristOptions || {});
      opts._installed = false;
      grist.setOptions(opts).then(() => location.reload()).catch(() => location.reload());
    }
  };

  // Tear down Monaco (dispose + null refs so no stale rAF callbacks fire)
  try {
    if (state.editor) { state.editor.dispose(); state.editor = null; }
    Object.values(state.models).forEach(m => { try { m.dispose(); } catch (_) {} });
    state.models = {};
    state.monaco = null;
  } catch (_) {}

  const barHtml = `
    <div id="studio-installed-bar" style="position:fixed;top:0;left:0;right:0;height:28px;background:#1e293b;display:flex;align-items:center;justify-content:space-between;padding:0 12px;z-index:99999;font-family:sans-serif;font-size:11px;color:#94a3b8;box-sizing:border-box;">
      <span>⚡ Widget Studio Pro — <strong style="color:#f1f5f9;">${t('installedMode')}</strong></span>
      <button onclick="__studioUninstall()" style="background:#3b82f6;color:white;border:none;border-radius:4px;padding:2px 10px;cursor:pointer;font-size:11px;">${t('btnEditIde')}</button>
    </div>
    <div style="height:28px;"></div>`;

  // 2 rAF ticks: let Monaco queued callbacks flush before document.write()
  requestAnimationFrame(() => requestAnimationFrame(() => {
    const isFullDoc = /<html[\s>]/i.test(html) || /<!doctype/i.test(html);
    let fullContent;
    if (isFullDoc) {
      // Inject bar into existing full document
      fullContent = html
        .replace(/<body([^>]*)>/i, `<body$1>\n${barHtml}`)
        .replace('</head>', `<style>body{padding-top:0!important}</style>\n</head>`);
    } else {
      fullContent = `<!DOCTYPE html><html><head>
<meta charset="UTF-8">
<script src="https://docs.getgrist.com/grist-plugin-api.js"><\/script>
<style>html,body{margin:0;padding:0;height:100%;}</style>
</head><body>
${barHtml}
${html}
<script>${js}<\/script>
</body></html>`;
    }
    document.open();
    document.write(fullContent);
    document.close();
  }));
}

async function uninstallWidget() {
  if (!await showConfirm(t('uninstallConfirm'), { icon: '✏️', confirmText: t('btnEditIde').replace('✏️ ', '') })) return;
  try {
    const opts = Object.assign({}, state.gristOptions || {});
    opts._installed = false;
    await grist.setOptions(opts);
    location.reload();
  } catch (e) {
    location.reload();
  }
}

// ============ INSTALL WIDGET ============
async function installWidget() {
  if (!state.gristReady) {
    showToast(t('toastGristUnavailable'), 'error');
    return;
  }
  try {
    const html = state.project.files['index.html'] || '';
    let css = state.project.files['style.css'] || '';
    let js = state.project.files['script.js'] || '';

    Object.keys(state.project.files).forEach(f => {
      if (['index.html', 'script.js', 'style.css', 'config.json'].includes(f)) return;
      if (f.endsWith('.js')) js += `\n// ===== ${f} =====\n` + state.project.files[f];
      if (f.endsWith('.css')) css += `\n/* ===== ${f} ===== */\n` + state.project.files[f];
    });

    // Compose the final standalone document so the installed runtime can render
    // it with a single `doc.write(_html)`. We embed the script too, so `_js`
    // becomes empty (kept in the schema for legacy installs only).
    const fullHtml = composeFullPage({
      html, css, js,
      packages: state.project.packages || [],
      withConsoleProbe: false
    });

    await grist.setOptions({
      _project: JSON.stringify(state.project),
      _installed: true,
      _html: fullHtml,
      _js: ''
    });
    showToast(t('toastInstalled'), 'success');
  } catch (e) {
    showToast(t('toastInstallError') + e.message, 'error');
  }
}

// ============ TABLE BUILDER ============
const GRIST_COL_TYPES = [
  'Text', 'Numeric', 'Int', 'Bool', 'Date', 'DateTime',
  'Choice', 'ChoiceList', 'Ref', 'RefList', 'Attachments'
];

let tbColumns = [];

function openTableBuilder() {
  tbColumns = [{ id: 'Nom', type: 'Text', label: '' }];
  document.getElementById('tbTableName').value = '';
  document.getElementById('tbResult').style.display = 'none';
  renderTbColumns();
  loadExistingTables();
  openModal('modalTableBuilder');
}

function renderTbColumns() {
  const list = document.getElementById('tbColumnsList');
  if (!tbColumns.length) {
    list.innerHTML = `<div class="empty-state">${t('btnTbAddColumn')}</div>`;
    return;
  }
  list.innerHTML = tbColumns.map((col, i) => `
    <div class="tb-col-row" data-idx="${i}">
      <input class="input-text tb-col-id" placeholder="${t('tbColName')}" value="${col.id}"
        oninput="tbColumns[${i}].id = this.value">
      <select class="select-small tb-col-type" onchange="tbColumns[${i}].type = this.value">
        ${GRIST_COL_TYPES.map(tp => `<option value="${tp}" ${col.type === tp ? 'selected' : ''}>${tp}</option>`).join('')}
      </select>
      <input class="input-text tb-col-label" placeholder="${t('tbColLabel')}" value="${col.label}"
        oninput="tbColumns[${i}].label = this.value">
      <button class="btn-icon-small" onclick="tbRemoveColumn(${i})" title="${t('tbDeleteCol')}">🗑</button>
    </div>
  `).join('');
}

function tbAddColumn() {
  tbColumns.push({ id: 'Colonne' + (tbColumns.length + 1), type: 'Text', label: '' });
  renderTbColumns();
}

function tbRemoveColumn(idx) {
  tbColumns.splice(idx, 1);
  renderTbColumns();
}

async function createGristTable() {
  if (!state.gristReady) {
    showToast(t('toastGristUnavailable'), 'error');
    return;
  }
  const name = document.getElementById('tbTableName').value.trim();
  if (!name) { showToast(t('toastTableNameRequired'), 'warning'); return; }
  if (tbColumns.some(c => !c.id.trim())) { showToast(t('toastTableColRequired'), 'warning'); return; }

  const columns = tbColumns.map(c => ({
    id: c.id.trim().replace(/\s+/g, '_'),
    fields: {
      type: c.type,
      ...(c.label.trim() ? { label: c.label.trim() } : {})
    }
  }));

  try {
    await grist.docApi.applyUserActions([['AddTable', name, columns]]);

    const resultEl = document.getElementById('tbResult');
    const snippet = buildFetchSnippet(name, columns);
    resultEl.style.display = 'block';
    resultEl.innerHTML = `
      <div class="tb-success">
        <strong>${t('toastTableCreated')}</strong>
        <p style="font-size:12px;margin:6px 0 4px;color:var(--text-muted);">Snippet à utiliser dans script.js :</p>
        <pre class="tb-snippet">${escHtml(snippet)}</pre>
        <button class="btn-primary btn-sm" onclick="insertTableSnippet(${JSON.stringify(snippet).replace(/"/g, '&quot;')})">→ ${t('tbSnippetCopied')}</button>
      </div>`;

    showToast(t('toastTableCreated'), 'success');
    refreshTables();
    loadExistingTables();
  } catch (e) {
    showToast(t('toastTableError') + e.message, 'error');
  }
}

function buildFetchSnippet(tableName, columns) {
  const fields = columns.map(c => `    // ${c.id}`).join('\n');
  return `// Lire la table "${tableName}"\ngrist.docApi.fetchTable('${tableName}').then(data => {\n  console.log(data);\n});\n\n// Ajouter une ligne\ngrist.docApi.applyUserActions([[\n  'AddRecord', '${tableName}', null,\n  { ${columns.map(c => `${c.id}: ''`).join(', ')} }\n]]);`;
}

function escHtml(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function insertTableSnippet(snippet) {
  if (state.activeFile !== 'script.js') openFile('script.js');
  setTimeout(() => {
    const cur = state.editor.getValue();
    state.editor.setValue(cur + '\n\n' + snippet);
    showToast(t('tbSnippetCopied'), 'success');
  }, 100);
}

async function loadExistingTables() {
  const listEl = document.getElementById('tbExistingList');
  if (!listEl) return;
  listEl.innerHTML = `<em>${t('loadingTables')}</em>`;
  try {
    const meta = await grist.docApi.fetchTable('_grist_Tables');
    const ids = meta.tableId || [];
    if (!ids.length) { listEl.innerHTML = `<em>${t('noTables')}</em>`; return; }
    listEl.innerHTML = ids
      .filter(id => !id.startsWith('_grist_'))
      .map(id => `
        <div class="tb-existing-row">
          <span class="tb-tbl-name">📋 ${id}</span>
          <button class="btn-tiny" onclick="deleteGristTable('${id}')" title="${t('tbDeleteTable')}">🗑</button>
        </div>`).join('');
  } catch (e) {
    listEl.innerHTML = `<em>${t('gristUnavailable')}</em>`;
  }
}

async function deleteGristTable(tableName) {
  if (!await showConfirm(`${t('tbDeleteTable')} <strong>${tableName}</strong> ?`, { icon: '🗑', danger: true, confirmText: t('tbDeleteCol'), cancelText: t('btnClose') })) return;
  try {
    await grist.docApi.applyUserActions([['RemoveTable', tableName]]);
    showToast(t('toastTableDeleted'), 'success');
    refreshTables();
    loadExistingTables();
  } catch (e) {
    showToast(t('toastTableDeleteError') + e.message, 'error');
  }
}

// ============ EXPORT/IMPORT ZIP ============

function showExportMenu(anchorEl) {
  document.getElementById('exportDropdown')?.remove();
  const menu = document.createElement('div');
  menu.id = 'exportDropdown';
  menu.style.cssText = 'position:fixed;z-index:9999;background:var(--bg-secondary,#1e293b);border:1px solid var(--border,#334155);border-radius:8px;padding:4px;min-width:220px;box-shadow:0 8px 24px rgba(0,0,0,.4);';
  const rect = anchorEl.getBoundingClientRect();
  menu.style.top = (rect.bottom + 4) + 'px';
  menu.style.left = rect.left + 'px';
  const items = [
    { icon: '📦', label: currentLang === 'fr' ? 'Archive Studio (.zip)' : 'Studio Archive (.zip)',
      sub:   currentLang === 'fr' ? 'Réimporter dans Studio Pro' : 'Re-import into Studio Pro',
      fn: exportZip },
    { icon: '🚀', label: currentLang === 'fr' ? 'Widget déployable (.zip)' : 'Deployable Widget (.zip)',
      sub:   currentLang === 'fr' ? 'Héberger & partager avec tous' : 'Host & share with everyone',
      fn: exportGristWidget }
  ];
  items.forEach(({ icon, label, sub, fn }) => {
    const btn = document.createElement('button');
    btn.style.cssText = 'display:flex;flex-direction:column;align-items:flex-start;width:100%;padding:8px 12px;background:none;border:none;border-radius:6px;cursor:pointer;color:var(--text-primary,#f1f5f9);text-align:left;';
    btn.onmouseover = () => btn.style.background = 'var(--hover-bg,#334155)';
    btn.onmouseleave = () => btn.style.background = 'none';
    btn.innerHTML = `<span style="font-size:13px;font-weight:600">${icon} ${label}</span><span style="font-size:11px;color:#94a3b8;margin-top:2px">${sub}</span>`;
    btn.onclick = () => { menu.remove(); fn(); };
    menu.appendChild(btn);
  });
  document.body.appendChild(menu);
  const close = (e) => { if (!menu.contains(e.target)) { menu.remove(); document.removeEventListener('mousedown', close); } };
  setTimeout(() => document.addEventListener('mousedown', close), 0);
}

async function exportGristWidget() {
  if (typeof JSZip === 'undefined') { showToast('JSZip non chargé', 'error'); return; }
  const name = state.project.name || 'mon-widget';
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  // Build deployable index.html (real grist-plugin-api, no proxy)
  const html = state.project.files['index.html'] || '';
  let css = state.project.files['style.css'] || '';
  let js  = state.project.files['script.js']  || '';
  Object.keys(state.project.files).forEach(f => {
    if (['index.html','script.js','style.css','config.json'].includes(f)) return;
    if (f.endsWith('.js'))  js  += `\n// ===== ${f} =====\n` + state.project.files[f];
    if (f.endsWith('.css')) css += `\n/* ===== ${f} ===== */\n` + state.project.files[f];
  });
  const compiledHtml = composeFullPage({ html, css, js, packages: state.project.packages || [], withConsoleProbe: false, withGristProxy: false });

  // manifest.json (Grist custom-widget format)
  const manifest = JSON.stringify({
    name,
    description: `Widget créé avec Grist Widget Studio Pro`,
    url: `https://VOTRE-URL-DE-DEPLOIEMENT/`,
    accessLevel: 'full document',
    published: true,
    createdWith: 'Grist Widget Studio Pro',
    exportedAt: new Date().toISOString()
  }, null, 2);

  // README.md
  const readme = [
    `# ${name}`,
    '',
    '> Widget créé avec [Grist Widget Studio Pro](https://grist-widget-studio-pro.vercel.app)',
    '',
    '## Déploiement rapide',
    '',
    '### Option 1 — Vercel (recommandé, gratuit)',
    '1. Créez un compte sur [vercel.com](https://vercel.com)',
    '2. Installez la CLI : `npm i -g vercel`',
    '3. Dans ce dossier : `vercel --prod`',
    '4. Copiez l\'URL obtenue (ex: `https://mon-widget.vercel.app`)',
    '',
    '### Option 2 — Netlify (drag & drop)',
    '1. Allez sur [app.netlify.com/drop](https://app.netlify.com/drop)',
    '2. Glissez ce dossier → URL instantanée',
    '',
    '### Option 3 — GitHub Pages',
    '1. Créez un repo GitHub et poussez ces fichiers',
    '2. Settings → Pages → Deploy from main branch',
    '3. URL : `https://VOTRE-PSEUDO.github.io/REPO/`',
    '',
    '## Ajout dans Grist',
    '1. Ouvrez votre document Grist',
    '2. Ajouter un widget personnalisé',
    '3. Collez votre URL de déploiement',
    '4. Accordez l\'accès **Lecture complète** ou **Accès complet**',
    '',
    '## Fichiers',
    '| Fichier | Rôle |',
    '|---------|------|',
    '| `index.html` | Page compilée prête à déployer |',
    '| `manifest.json` | Métadonnées widget Grist |',
    '| `_studio.json` | Archive projet Studio Pro |',
  ].join('\n');

  const zip = new JSZip();
  zip.file('index.html', compiledHtml);
  zip.file('manifest.json', manifest);
  zip.file('README.md', readme);
  zip.file('_studio.json', JSON.stringify({ name, files: state.project.files, packages: state.project.packages, apis: state.project.apis, createdBy: 'Grist Widget Studio Pro', exportedAt: new Date().toISOString() }, null, 2));

  const blob = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = slug + '-grist-widget.zip';
  a.click();
  URL.revokeObjectURL(url);
  showToast(currentLang === 'fr' ? '🚀 Widget déployable exporté !' : '🚀 Deployable widget exported!', 'success');
}

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
// ============ MODERN CONFIRM DIALOG ============
// Fully self-contained with inline styles so it works even after document.write()
// when style.css is no longer loaded (installed widget mode).
function showConfirm(message, { confirmText, cancelText, icon = '⚠️', danger = false } = {}) {
  return new Promise((resolve) => {
    const existing = document.getElementById('studio-confirm-overlay');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.id = 'studio-confirm-overlay';
    overlay.style.cssText = 'position:fixed;inset:0;z-index:999999;display:flex;align-items:center;justify-content:center;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;';

    const backdrop = document.createElement('div');
    backdrop.style.cssText = 'position:absolute;inset:0;background:rgba(0,0,0,0);backdrop-filter:blur(0px);transition:background 0.2s,backdrop-filter 0.2s;';

    const dialog = document.createElement('div');
    dialog.setAttribute('role', 'dialog');
    dialog.setAttribute('aria-modal', 'true');
    dialog.style.cssText = 'position:relative;background:#1e293b;border:1px solid #334155;border-radius:16px;padding:28px 24px 20px;max-width:360px;width:90%;text-align:center;box-shadow:0 24px 64px rgba(0,0,0,0.5),0 4px 16px rgba(0,0,0,0.3);transform:scale(0.88) translateY(14px);opacity:0;transition:transform 0.22s cubic-bezier(0.34,1.56,0.64,1),opacity 0.18s ease;';

    const iconEl = document.createElement('div');
    iconEl.style.cssText = 'font-size:38px;margin-bottom:12px;line-height:1;';
    iconEl.textContent = icon;

    const msgEl = document.createElement('p');
    msgEl.style.cssText = 'font-size:14px;color:#f1f5f9;line-height:1.6;margin:0 0 22px;';
    msgEl.innerHTML = message;

    const actions = document.createElement('div');
    actions.style.cssText = 'display:flex;gap:10px;justify-content:center;';

    const cancelBtn = document.createElement('button');
    cancelBtn.style.cssText = 'background:#334155;color:#cbd5e1;border:1px solid #475569;border-radius:8px;padding:9px 22px;font-size:13px;font-weight:600;cursor:pointer;min-width:90px;transition:background 0.15s;';
    cancelBtn.textContent = cancelText || (typeof t === 'function' ? t('btnClose') : 'Annuler');

    const confirmBtn = document.createElement('button');
    const btnBg = danger ? '#ef4444' : '#3b82f6';
    confirmBtn.style.cssText = `background:${btnBg};color:#fff;border:none;border-radius:8px;padding:9px 22px;font-size:13px;font-weight:600;cursor:pointer;min-width:90px;transition:filter 0.15s,transform 0.15s;`;
    confirmBtn.textContent = confirmText || 'OK';

    cancelBtn.onmouseenter = () => { cancelBtn.style.background = '#475569'; };
    cancelBtn.onmouseleave = () => { cancelBtn.style.background = '#334155'; };
    confirmBtn.onmouseenter = () => { confirmBtn.style.filter = 'brightness(1.12)'; confirmBtn.style.transform = 'translateY(-1px)'; };
    confirmBtn.onmouseleave = () => { confirmBtn.style.filter = ''; confirmBtn.style.transform = ''; };

    actions.append(cancelBtn, confirmBtn);
    dialog.append(iconEl, msgEl, actions);
    overlay.append(backdrop, dialog);
    document.body.appendChild(overlay);

    // Animate in
    requestAnimationFrame(() => {
      backdrop.style.background = 'rgba(0,0,0,0.55)';
      backdrop.style.backdropFilter = 'blur(4px)';
      dialog.style.transform = 'scale(1) translateY(0)';
      dialog.style.opacity = '1';
    });

    const close = (result) => {
      dialog.style.transform = 'scale(0.9) translateY(8px)';
      dialog.style.opacity = '0';
      backdrop.style.background = 'rgba(0,0,0,0)';
      setTimeout(() => overlay.remove(), 180);
      resolve(result);
    };

    confirmBtn.addEventListener('click', () => close(true));
    cancelBtn.addEventListener('click', () => close(false));
    backdrop.addEventListener('click', () => close(false));
    document.addEventListener('keydown', function onKey(e) {
      if (e.key === 'Escape') { document.removeEventListener('keydown', onKey); close(false); }
    });

    setTimeout(() => confirmBtn.focus(), 60);
  });
}

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
  document.getElementById('btnExport').addEventListener('click', (e) => showExportMenu(e.currentTarget));
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
  
  // Table Builder
  document.getElementById('btnTableBuilder').addEventListener('click', openTableBuilder);
  document.getElementById('btnTbAddColumn').addEventListener('click', tbAddColumn);
  document.getElementById('btnTbCreate').addEventListener('click', createGristTable);
  document.getElementById('btnTbRefresh').addEventListener('click', loadExistingTables);

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
