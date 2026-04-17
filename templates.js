/**
 * Grist Widget Studio Pro - Templates Library
 * Copyright 2026 Said Hamadou (isaytoo)
 */

window.WIDGET_TEMPLATES = [
  {
    id: 'blank',
    name: 'Blank',
    icon: '📄',
    description: 'Un widget vide pour démarrer à partir de zéro.',
    tags: ['basic'],
    files: {
      'index.html': '<div id="app">\n  <h1>Hello Grist!</h1>\n  <div id="data"></div>\n</div>',
      'script.js': 'grist.ready({ requiredAccess: "read table" });\n\ngrist.onRecord(record => {\n  console.log("Record:", record);\n  document.getElementById("data").textContent = JSON.stringify(record, null, 2);\n});',
      'style.css': 'body {\n  font-family: sans-serif;\n  padding: 20px;\n  background: #fafafa;\n}\nh1 { color: #6366f1; }\n#data {\n  background: white;\n  padding: 12px;\n  border-radius: 6px;\n  white-space: pre-wrap;\n  font-family: monospace;\n  font-size: 12px;\n}',
      'config.json': '{\n  "name": "Mon Widget",\n  "requiredAccess": "read table",\n  "packages": []\n}'
    }
  },
  {
    id: 'record-viewer',
    name: 'Record Viewer',
    icon: '👁️',
    description: 'Affiche les détails du record sélectionné avec un joli design.',
    tags: ['basic', 'record'],
    files: {
      'index.html': '<div id="app">\n  <header>\n    <h1 id="title">Aucun record sélectionné</h1>\n  </header>\n  <div id="fields" class="fields"></div>\n</div>',
      'script.js': 'grist.ready({ requiredAccess: "read table" });\n\ngrist.onRecord(record => {\n  if (!record) return;\n  const title = record.Name || record.Title || "Record #" + record.id;\n  document.getElementById("title").textContent = title;\n  \n  const fieldsDiv = document.getElementById("fields");\n  fieldsDiv.innerHTML = "";\n  \n  Object.entries(record).forEach(([key, value]) => {\n    if (key === "id") return;\n    const field = document.createElement("div");\n    field.className = "field";\n    field.innerHTML = `\n      <div class="field-label">${key.replace(/_/g, " ")}</div>\n      <div class="field-value">${value ?? "—"}</div>\n    `;\n    fieldsDiv.appendChild(field);\n  });\n});',
      'style.css': 'body { font-family: sans-serif; margin: 0; background: #f8fafc; }\n#app { padding: 20px; }\nheader { margin-bottom: 20px; }\nh1 { color: #6366f1; font-size: 20px; }\n.fields { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 12px; }\n.field { background: white; padding: 12px; border-radius: 8px; border-left: 3px solid #6366f1; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }\n.field-label { font-size: 10px; text-transform: uppercase; color: #94a3b8; font-weight: 600; margin-bottom: 4px; letter-spacing: 0.5px; }\n.field-value { font-size: 14px; color: #1e293b; }',
      'config.json': '{\n  "name": "Record Viewer",\n  "requiredAccess": "read table",\n  "packages": []\n}'
    }
  },
  {
    id: 'chart',
    name: 'Chart.js Dashboard',
    icon: '📊',
    description: 'Graphiques interactifs avec Chart.js à partir de tes données Grist.',
    tags: ['visualization', 'chart'],
    files: {
      'index.html': '<div id="app">\n  <h1>📊 Dashboard</h1>\n  <div class="charts">\n    <div class="chart-card"><canvas id="chart1"></canvas></div>\n    <div class="chart-card"><canvas id="chart2"></canvas></div>\n  </div>\n</div>',
      'script.js': 'grist.ready({ requiredAccess: "read table" });\n\nlet chart1, chart2;\n\ngrist.onRecords(records => {\n  if (!records || !records.length) return;\n  \n  // Chart 1: Bar chart par catégorie\n  const categories = {};\n  records.forEach(r => {\n    const cat = r.Category || "Other";\n    categories[cat] = (categories[cat] || 0) + 1;\n  });\n  \n  if (chart1) chart1.destroy();\n  chart1 = new Chart(document.getElementById("chart1"), {\n    type: "bar",\n    data: {\n      labels: Object.keys(categories),\n      datasets: [{\n        label: "Records par catégorie",\n        data: Object.values(categories),\n        backgroundColor: "#6366f1"\n      }]\n    },\n    options: { responsive: true, maintainAspectRatio: false }\n  });\n  \n  // Chart 2: Doughnut\n  if (chart2) chart2.destroy();\n  chart2 = new Chart(document.getElementById("chart2"), {\n    type: "doughnut",\n    data: {\n      labels: Object.keys(categories),\n      datasets: [{\n        data: Object.values(categories),\n        backgroundColor: ["#6366f1", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981"]\n      }]\n    },\n    options: { responsive: true, maintainAspectRatio: false }\n  });\n});',
      'style.css': 'body { font-family: sans-serif; margin: 0; padding: 20px; background: #f8fafc; }\nh1 { color: #1e293b; margin-bottom: 20px; }\n.charts { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }\n.chart-card { background: white; padding: 20px; border-radius: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); height: 350px; }\n@media (max-width: 768px) { .charts { grid-template-columns: 1fr; } }',
      'config.json': '{\n  "name": "Chart Dashboard",\n  "requiredAccess": "read table",\n  "packages": ["chart.js"]\n}'
    }
  },
  {
    id: 'api-fetch',
    name: 'API Fetcher',
    icon: '🌐',
    description: 'Récupère des données depuis une API externe et affiche-les.',
    tags: ['api', 'external'],
    files: {
      'index.html': '<div id="app">\n  <h1>🌐 API Data</h1>\n  <div class="controls">\n    <input type="text" id="apiInput" placeholder="URL de l\'API" value="https://jsonplaceholder.typicode.com/users">\n    <button id="fetchBtn">Fetch</button>\n  </div>\n  <div id="loading" class="loading" style="display:none">Chargement...</div>\n  <div id="error" class="error" style="display:none"></div>\n  <div id="results" class="results"></div>\n</div>',
      'script.js': 'grist.ready();\n\nconst PROXY_URL = "https://grist-widget-studio-proxy.vercel.app/api/proxy";\n\nasync function fetchData(useCors = true) {\n  const url = document.getElementById("apiInput").value;\n  const loading = document.getElementById("loading");\n  const error = document.getElementById("error");\n  const results = document.getElementById("results");\n  \n  loading.style.display = "block";\n  error.style.display = "none";\n  results.innerHTML = "";\n  \n  try {\n    const finalUrl = useCors ? `${PROXY_URL}?url=${encodeURIComponent(url)}` : url;\n    const res = await fetch(finalUrl);\n    const data = await res.json();\n    \n    if (Array.isArray(data)) {\n      results.innerHTML = data.map(item => `\n        <div class="card">\n          <pre>${JSON.stringify(item, null, 2)}</pre>\n        </div>\n      `).join("");\n    } else {\n      results.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;\n    }\n  } catch (err) {\n    error.textContent = "Erreur : " + err.message;\n    error.style.display = "block";\n  } finally {\n    loading.style.display = "none";\n  }\n}\n\ndocument.getElementById("fetchBtn").addEventListener("click", () => fetchData(true));\nfetchData(true);',
      'style.css': 'body { font-family: sans-serif; margin: 0; padding: 20px; background: #f8fafc; }\nh1 { color: #1e293b; }\n.controls { display: flex; gap: 8px; margin: 20px 0; }\n.controls input { flex: 1; padding: 8px 12px; border: 1px solid #e2e8f0; border-radius: 6px; }\n.controls button { padding: 8px 20px; background: #6366f1; color: white; border: none; border-radius: 6px; cursor: pointer; }\n.loading { padding: 20px; text-align: center; color: #64748b; }\n.error { padding: 12px; background: #fef2f2; color: #991b1b; border-radius: 6px; }\n.results { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 12px; }\n.card { background: white; padding: 12px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }\npre { font-family: Menlo, monospace; font-size: 11px; margin: 0; white-space: pre-wrap; word-break: break-all; }',
      'config.json': '{\n  "name": "API Fetcher",\n  "requiredAccess": "",\n  "packages": []\n}'
    }
  },
  {
    id: 'form',
    name: 'Form Builder',
    icon: '📝',
    description: 'Formulaire qui crée des records dans une table Grist.',
    tags: ['form', 'write'],
    files: {
      'index.html': '<div id="app">\n  <h1>📝 Nouveau Record</h1>\n  <form id="form">\n    <div class="field">\n      <label>Nom</label>\n      <input type="text" name="Name" required>\n    </div>\n    <div class="field">\n      <label>Email</label>\n      <input type="email" name="Email">\n    </div>\n    <div class="field">\n      <label>Message</label>\n      <textarea name="Message" rows="4"></textarea>\n    </div>\n    <button type="submit">Envoyer</button>\n  </form>\n  <div id="status"></div>\n</div>',
      'script.js': 'grist.ready({ requiredAccess: "full" });\n\nconst TABLE_NAME = "Contacts"; // À adapter\n\ndocument.getElementById("form").addEventListener("submit", async (e) => {\n  e.preventDefault();\n  const formData = new FormData(e.target);\n  const data = Object.fromEntries(formData);\n  const status = document.getElementById("status");\n  \n  try {\n    await grist.docApi.applyUserActions([\n      ["AddRecord", TABLE_NAME, null, data]\n    ]);\n    status.textContent = "✅ Enregistré !";\n    status.className = "success";\n    e.target.reset();\n  } catch (err) {\n    status.textContent = "❌ Erreur : " + err.message;\n    status.className = "error";\n  }\n});',
      'style.css': 'body { font-family: sans-serif; margin: 0; padding: 20px; background: #f8fafc; }\n#app { max-width: 500px; margin: 0 auto; }\nh1 { color: #6366f1; }\n.field { margin-bottom: 16px; }\nlabel { display: block; font-size: 12px; font-weight: 600; color: #64748b; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px; }\ninput, textarea { width: 100%; padding: 10px 12px; border: 1px solid #e2e8f0; border-radius: 6px; font-size: 14px; font-family: inherit; }\ninput:focus, textarea:focus { outline: none; border-color: #6366f1; }\nbutton { background: #6366f1; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-weight: 600; }\nbutton:hover { background: #4f46e5; }\n.success { color: #059669; padding: 10px; margin-top: 10px; }\n.error { color: #dc2626; padding: 10px; margin-top: 10px; }',
      'config.json': '{\n  "name": "Form Builder",\n  "requiredAccess": "full",\n  "packages": []\n}'
    }
  },
  {
    id: 'map',
    name: 'Leaflet Map',
    icon: '🗺️',
    description: 'Carte interactive avec Leaflet.js montrant tes records géolocalisés.',
    tags: ['map', 'visualization'],
    files: {
      'index.html': '<div id="app">\n  <div id="map"></div>\n</div>',
      'script.js': 'grist.ready({ requiredAccess: "read table" });\n\nconst map = L.map("map").setView([46.6, 2.2], 6); // France\nL.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {\n  attribution: "© OpenStreetMap"\n}).addTo(map);\n\nlet markers = [];\n\ngrist.onRecords(records => {\n  markers.forEach(m => m.remove());\n  markers = [];\n  \n  const bounds = [];\n  records.forEach(r => {\n    const lat = parseFloat(r.Latitude || r.lat);\n    const lng = parseFloat(r.Longitude || r.lng);\n    if (isNaN(lat) || isNaN(lng)) return;\n    \n    const marker = L.marker([lat, lng])\n      .addTo(map)\n      .bindPopup(`<b>${r.Name || r.Title || "Record"}</b><br>${r.Address || ""}`);\n    markers.push(marker);\n    bounds.push([lat, lng]);\n  });\n  \n  if (bounds.length) map.fitBounds(bounds, { padding: [30, 30] });\n});',
      'style.css': 'body, html, #app, #map { height: 100%; margin: 0; padding: 0; }\n@import url("https://unpkg.com/leaflet@1.9.4/dist/leaflet.css");',
      'config.json': '{\n  "name": "Leaflet Map",\n  "requiredAccess": "read table",\n  "packages": ["leaflet"]\n}'
    }
  },
  {
    id: 'kanban',
    name: 'Kanban Board',
    icon: '📋',
    description: 'Tableau Kanban drag & drop à partir de tes records.',
    tags: ['productivity', 'board'],
    files: {
      'index.html': '<div id="app">\n  <h1>📋 Kanban</h1>\n  <div id="board" class="board"></div>\n</div>',
      'script.js': 'grist.ready({ requiredAccess: "full" });\n\nconst STATUSES = ["À faire", "En cours", "Terminé"];\n\ngrist.onRecords(records => {\n  const board = document.getElementById("board");\n  board.innerHTML = "";\n  \n  STATUSES.forEach(status => {\n    const col = document.createElement("div");\n    col.className = "column";\n    col.dataset.status = status;\n    col.innerHTML = `<h3>${status}</h3><div class="cards"></div>`;\n    \n    col.addEventListener("dragover", e => { e.preventDefault(); col.classList.add("over"); });\n    col.addEventListener("dragleave", () => col.classList.remove("over"));\n    col.addEventListener("drop", async e => {\n      e.preventDefault();\n      col.classList.remove("over");\n      const id = parseInt(e.dataTransfer.getData("id"));\n      await grist.docApi.applyUserActions([["UpdateRecord", await grist.getTable(), id, { Status: status }]]);\n    });\n    \n    const cards = col.querySelector(".cards");\n    records.filter(r => (r.Status || STATUSES[0]) === status).forEach(r => {\n      const card = document.createElement("div");\n      card.className = "card";\n      card.draggable = true;\n      card.textContent = r.Title || r.Name || `#${r.id}`;\n      card.addEventListener("dragstart", e => e.dataTransfer.setData("id", r.id));\n      cards.appendChild(card);\n    });\n    \n    board.appendChild(col);\n  });\n});',
      'style.css': 'body { font-family: sans-serif; margin: 0; padding: 20px; background: #f8fafc; }\nh1 { color: #1e293b; margin-bottom: 16px; }\n.board { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }\n.column { background: #e2e8f0; padding: 12px; border-radius: 8px; min-height: 300px; }\n.column.over { background: #c7d2fe; }\n.column h3 { margin: 0 0 12px; font-size: 12px; text-transform: uppercase; color: #64748b; }\n.card { background: white; padding: 10px 12px; border-radius: 6px; margin-bottom: 6px; cursor: grab; box-shadow: 0 1px 2px rgba(0,0,0,0.05); font-size: 13px; }\n.card:active { cursor: grabbing; }',
      'config.json': '{\n  "name": "Kanban Board",\n  "requiredAccess": "full",\n  "packages": []\n}'
    }
  },
  {
    id: 'counter',
    name: 'Metric Counter',
    icon: '🔢',
    description: 'Compteurs animés de KPIs basés sur tes données.',
    tags: ['dashboard', 'kpi'],
    files: {
      'index.html': '<div id="app">\n  <div class="metrics">\n    <div class="metric">\n      <div class="metric-icon">📊</div>\n      <div class="metric-value" id="total">0</div>\n      <div class="metric-label">Total Records</div>\n    </div>\n    <div class="metric">\n      <div class="metric-icon">✅</div>\n      <div class="metric-value" id="completed">0</div>\n      <div class="metric-label">Complétés</div>\n    </div>\n    <div class="metric">\n      <div class="metric-icon">⏳</div>\n      <div class="metric-value" id="pending">0</div>\n      <div class="metric-label">En attente</div>\n    </div>\n  </div>\n</div>',
      'script.js': 'grist.ready({ requiredAccess: "read table" });\n\nfunction animateCounter(el, target) {\n  const start = parseInt(el.textContent) || 0;\n  const duration = 600;\n  const startTime = performance.now();\n  function update(now) {\n    const progress = Math.min((now - startTime) / duration, 1);\n    el.textContent = Math.round(start + (target - start) * progress);\n    if (progress < 1) requestAnimationFrame(update);\n  }\n  requestAnimationFrame(update);\n}\n\ngrist.onRecords(records => {\n  const total = records.length;\n  const completed = records.filter(r => r.Status === "Done" || r.Completed).length;\n  const pending = total - completed;\n  \n  animateCounter(document.getElementById("total"), total);\n  animateCounter(document.getElementById("completed"), completed);\n  animateCounter(document.getElementById("pending"), pending);\n});',
      'style.css': 'body { font-family: sans-serif; margin: 0; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; }\n.metrics { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; }\n.metric { background: white; padding: 24px; border-radius: 16px; text-align: center; box-shadow: 0 8px 20px rgba(0,0,0,0.1); }\n.metric-icon { font-size: 32px; margin-bottom: 8px; }\n.metric-value { font-size: 42px; font-weight: 800; color: #6366f1; line-height: 1; }\n.metric-label { font-size: 11px; text-transform: uppercase; color: #64748b; letter-spacing: 1px; margin-top: 8px; font-weight: 600; }',
      'config.json': '{\n  "name": "Metric Counter",\n  "requiredAccess": "read table",\n  "packages": []\n}'
    }
  }
];
