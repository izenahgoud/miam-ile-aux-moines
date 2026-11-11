<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="noindex, nofollow">
<meta name="referrer" content="strict-origin-when-cross-origin">
<title>M'IAM — Gestion des points d'intérêt</title>
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css">
<style>
:root{--forest:#1a3a2a;--forest-m:#2d5e3f;--sand:#e8d5a3;--cream:#faf6ed;--red:#c0392b;--blue:#185FA5;--blue-c:#e6f1fb;--green-c:#E1F5EE;--green-t:#0F6E56;--amber-c:#FAEEDA;--amber-t:#854F0B;--border:#ddd;--text:#222;--text-m:#666}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,sans-serif;background:#f0f2f0;color:var(--text);min-height:100vh}
header{background:var(--forest);color:white;padding:14px 20px;display:flex;align-items:center;gap:14px;position:sticky;top:0;z-index:1000}
header h1{font-size:18px;font-weight:600}
header p{font-size:11px;color:var(--sand);margin-top:2px}
.hbadge{font-size:11px;background:rgba(255,255,255,.15);padding:4px 10px;border-radius:12px;margin-left:auto;white-space:nowrap}
.hbadge.dirty{background:#e67e22}
.container{max-width:980px;margin:0 auto;padding:20px 16px 60px}
.stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:10px;margin-bottom:18px}
.stat{background:white;border:.5px solid var(--border);border-radius:10px;padding:10px 14px;text-align:center}
.stat-n{font-size:26px;font-weight:600;color:var(--forest)}
.stat-l{font-size:12px;color:var(--text-m);margin-top:2px}
.toolbar{display:flex;gap:10px;margin-bottom:14px;flex-wrap:wrap;align-items:center}
.toolbar input[type=text]{flex:1;min-width:200px;padding:8px 12px;border:.5px solid var(--border);border-radius:8px;font-size:14px;background:white}
.toolbar select{padding:8px 10px;border:.5px solid var(--border);border-radius:8px;font-size:13px;background:white;max-width:220px}
.btn{padding:8px 16px;border-radius:8px;border:.5px solid;font-size:13px;cursor:pointer;font-weight:500;transition:all .15s}
.btn-green{background:var(--forest);color:white;border-color:var(--forest)}
.btn-green:hover{background:var(--forest-m)}
.btn-orange{background:#e67e22;color:white;border-color:#e67e22}
.btn-orange:hover{background:#d36f15}
.btn-red{background:#fff0f0;color:var(--red);border-color:#f5c1c1}
.btn-gray{background:white;color:var(--text);border-color:var(--border)}
.btn-gray:hover{background:#f5f5f5}
.btn-sm{padding:4px 10px;font-size:12px}
.table-wrap{background:white;border:.5px solid var(--border);border-radius:12px;overflow:hidden}
table{width:100%;border-collapse:collapse;font-size:13px}
thead tr{background:var(--forest);color:white}
th{padding:10px 12px;text-align:left;font-weight:500;font-size:12px;white-space:nowrap}
td{padding:8px 12px;border-bottom:.5px solid #f0f0f0;vertical-align:middle}
tr:last-child td{border-bottom:none}
tr:hover td{background:#fafaf8}
.poi-name{font-weight:500;color:var(--forest)}
.tag{display:inline-block;font-size:10px;padding:1px 6px;border-radius:8px;margin-left:6px;background:var(--amber-c);color:var(--amber-t);white-space:nowrap}
.poi-cat{font-size:11px;background:var(--green-c);color:var(--green-t);padding:2px 8px;border-radius:10px;white-space:nowrap}
.poi-img{width:44px;height:32px;object-fit:cover;border-radius:4px;background:#eee;display:block}
.poi-img-empty{width:44px;height:32px;border-radius:4px;background:#eee;display:flex;align-items:center;justify-content:center;font-size:18px}
.act-btns{display:flex;gap:6px}
.act-btn{padding:4px 10px;border-radius:6px;border:.5px solid;font-size:12px;cursor:pointer;white-space:nowrap}
.act-edit{background:#f0f7ff;color:var(--blue);border-color:#b5d4f4}
.act-del{background:#fff0f0;color:var(--red);border-color:#f5c1c1}
.coords{font-family:monospace;font-size:11px;color:var(--text-m)}
.no-results{text-align:center;padding:40px;color:var(--text-m);font-size:14px}
.pagination{display:flex;gap:6px;justify-content:center;margin-top:16px;flex-wrap:wrap}
.page-btn{padding:6px 12px;border-radius:6px;border:.5px solid var(--border);background:white;cursor:pointer;font-size:13px}
.page-btn.active{background:var(--forest);color:white;border-color:var(--forest)}
.modal-bg{display:none;position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:2000;align-items:center;justify-content:center;padding:20px}
.modal-bg.open{display:flex}
.modal{background:white;border-radius:16px;width:100%;max-width:640px;max-height:92vh;overflow-y:auto}
.modal-header{padding:16px 20px;border-bottom:.5px solid var(--border);display:flex;justify-content:space-between;align-items:center;position:sticky;top:0;background:white;z-index:5}
.modal-header h2{font-size:16px;font-weight:600;color:var(--forest)}
.modal-close{font-size:22px;cursor:pointer;color:var(--text-m);background:none;border:none}
.modal-body{padding:20px}
.modal-footer{padding:14px 20px;border-top:.5px solid var(--border);display:flex;gap:10px;justify-content:flex-end;position:sticky;bottom:0;background:white;z-index:5}
.form-row{margin-bottom:14px}
.form-row label{display:block;font-size:12px;font-weight:500;color:var(--text-m);margin-bottom:5px;text-transform:uppercase;letter-spacing:.05em}
.form-row input,.form-row textarea,.form-row select{width:100%;padding:9px 12px;border:.5px solid var(--border);border-radius:8px;font-size:14px;font-family:inherit;background:white;color:var(--text)}
.form-row input:focus,.form-row textarea:focus,.form-row select:focus{outline:none;border-color:var(--forest);box-shadow:0 0 0 2px rgba(26,58,42,.1)}
.form-row textarea{resize:vertical;min-height:90px;line-height:1.5}
.form-2col{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.form-hint{font-size:11px;color:var(--text-m);margin-top:4px;display:block}
.img-preview{width:100%;height:120px;object-fit:cover;border-radius:8px;border:.5px solid var(--border);margin-top:6px;display:none}
.img-preview.visible{display:block}
#pick-map{height:240px;border-radius:10px;border:.5px solid var(--border);margin-bottom:10px;z-index:1}
.link-row{display:grid;grid-template-columns:1fr 150px 34px;gap:6px;margin-bottom:6px}
.link-row button{border:.5px solid #f5c1c1;background:#fff0f0;color:var(--red);border-radius:8px;cursor:pointer}
.panel{background:white;border:.5px solid var(--border);border-radius:12px;padding:14px 18px;margin-bottom:16px}
.panel summary{cursor:pointer;font-weight:600;color:var(--forest);font-size:14px}
.panel ol{margin:10px 0 0 20px;font-size:13px;line-height:1.7}
.panel p{font-size:13px;margin-top:8px;line-height:1.6}
.alert{padding:10px 14px;border-radius:8px;font-size:13px;margin-bottom:14px;display:none;line-height:1.5}
.alert.success{background:var(--green-c);color:var(--green-t);border:.5px solid #9FE1CB;display:block}
.alert.warn{background:var(--amber-c);color:var(--amber-t);border:.5px solid #FAC775;display:block}
.alert.error{background:#fff0f0;color:var(--red);border:.5px solid #f5c1c1;display:block}
.banner{background:var(--amber-c);color:var(--amber-t);border:.5px solid #FAC775;border-radius:10px;padding:12px 16px;margin-bottom:14px;font-size:13px;display:none;line-height:1.6}
.banner.show{display:block}
.banner .btn{margin-top:8px;margin-right:6px}
.export-zone{background:var(--forest);color:white;border-radius:12px;padding:16px 20px;margin-top:20px;display:none}
.export-zone h3{font-size:14px;font-weight:500;margin-bottom:8px;color:var(--sand)}
.export-zone ul{font-size:12px;margin:0 0 10px 18px;line-height:1.6;max-height:140px;overflow-y:auto}
.export-zone .steps{font-size:13px;line-height:1.7;margin-bottom:12px;background:rgba(255,255,255,.08);padding:10px 14px;border-radius:8px}
.export-btns{display:flex;gap:8px;flex-wrap:wrap}
.drop{border:2px dashed var(--border);border-radius:12px;padding:30px;text-align:center;background:white;margin-bottom:16px;display:none}
.drop.show{display:block}
@media(max-width:640px){
  .form-2col{grid-template-columns:1fr}
  .link-row{grid-template-columns:1fr 34px}.link-row input:nth-child(2){grid-column:1/2}
  th:nth-child(4),td:nth-child(4){display:none}
}
</style>
</head>
<body>
<header>
  <div>
    <h1>M'IAM — Gestion des points d'intérêt</h1>
    <p>Île-aux-Moines · Outil réservé à la Mairie · v2.1</p>
  </div>
  <span class="hbadge" id="total-badge">0 POI</span>
</header>

<div class="container">
  <div id="alert-box" class="alert"></div>

  <div id="draft-banner" class="banner"></div>

  <details class="panel">
    <summary>📖 Mode d'emploi (à lire la première fois)</summary>
    <ol>
      <li>La liste des lieux se charge automatiquement. Sinon, cliquez sur <b>📂 Ouvrir pois.js</b>.</li>
      <li>Utilisez <b>+ Ajouter un lieu</b>, <b>Modifier</b> ou <b>Suppr.</b> pour faire vos changements. Rien n'est publié à ce stade.</li>
      <li>Pour placer un lieu, <b>cliquez sur la carte</b> dans la fenêtre d'édition : les coordonnées se remplissent toutes seules.</li>
      <li>Quand vous avez terminé, cliquez sur <b>⬇ Télécharger pois.js</b>.</li>
      <li>Envoyez ce fichier <b>pois.js</b> à l'administrateur de M'IAM (ou déposez-le sur GitHub si vous en avez l'accès) : la carte sera mise à jour après publication.</li>
    </ol>
    <p>💾 Vos modifications sont conservées automatiquement sur cet ordinateur : vous pouvez fermer la page et revenir plus tard.</p>
    <p>⚠️ Les plaques de secours (catégorie « Secours ») sont utilisées par la commission sécurité : ne les modifiez que si vous êtes sûr, et prévenez l'administrateur.</p>
  </details>

  <div id="drop" class="drop">
    <p style="margin-bottom:10px">Impossible de charger <b>pois.js</b> automatiquement.</p>
    <button class="btn btn-green" onclick="document.getElementById('file-in').click()">📂 Ouvrir pois.js</button>
    <p style="font-size:12px;color:var(--text-m);margin-top:8px">Vous pouvez aussi glisser le fichier pois.js sur cette page.</p>
  </div>
  <input type="file" id="file-in" accept=".js,.json,.txt" style="display:none">

  <div class="stats" id="stats-grid"></div>

  <div class="toolbar">
    <input type="text" id="search" placeholder="Rechercher un lieu…" oninput="currentPage=1;renderTable()">
    <select id="filter-cat" onchange="currentPage=1;renderTable()"><option value="">Toutes les catégories</option></select>
    <select id="filter-flag" onchange="currentPage=1;renderTable()">
      <option value="">Tous les lieux</option>
      <option value="nophoto">Sans photo</option>
      <option value="http">Photo non sécurisée (http)</option>
      <option value="dup">Doublons</option>
      <option value="layer">Invisibles sur la carte (couche inconnue)</option>
    </select>
  </div>
  <div class="toolbar">
    <button class="btn btn-green" onclick="openAdd()">+ Ajouter un lieu</button>
    <button class="btn btn-gray" onclick="document.getElementById('file-in').click()">📂 Ouvrir pois.js</button>
    <button class="btn btn-gray" id="btn-fixlayers" onclick="fixLayers()" style="display:none">🔧 Rendre visibles les lieux invisibles</button>
    <button class="btn btn-gray" id="btn-dedupe" onclick="removeDuplicates()" style="display:none">🧹 Supprimer les doublons</button>
    <button class="btn btn-orange" id="btn-export" onclick="showExport()" style="margin-left:auto">⬇ Télécharger pois.js</button>
  </div>

  <div class="table-wrap">
    <table>
      <thead><tr>
        <th style="width:44px">Photo</th><th>Nom</th><th>Catégorie</th><th>Coordonnées</th><th style="width:130px">Actions</th>
      </tr></thead>
      <tbody id="poi-table"></tbody>
    </table>
    <div id="no-results" class="no-results" style="display:none">Aucun lieu trouvé</div>
  </div>
  <div class="pagination" id="pagination"></div>

  <div class="export-zone" id="export-zone">
    <h3>Récapitulatif de vos modifications</h3>
    <ul id="change-list"></ul>
    <div class="steps">
      1. Cliquez sur <b>Télécharger pois.js</b>.<br>
      2. Envoyez le fichier à l'administrateur M'IAM (ou déposez-le sur GitHub : <i>Add file → Upload files → Commit changes</i>).<br>
      3. Attendez la coche verte ✅ sur GitHub : la carte est alors à jour.
    </div>
    <div class="export-btns">
      <button class="btn btn-orange" onclick="downloadExport()">⬇ Télécharger pois.js</button>
      <button class="btn btn-gray" onclick="copyExport()">Copier le contenu</button>
      <button class="btn btn-gray" onclick="document.getElementById('export-zone').style.display='none'">Fermer</button>
    </div>
  </div>
</div>

<!-- Modal Ajouter / Modifier -->
<div class="modal-bg" id="modal">
  <div class="modal">
    <div class="modal-header">
      <h2 id="modal-title">Ajouter un lieu</h2>
      <button class="modal-close" onclick="closeModal()">✕</button>
    </div>
    <div class="modal-body">
      <div id="modal-alert" class="alert"></div>
      <input type="hidden" id="edit-idx" value="-1">

      <div class="form-row">
        <label>Nom du lieu *</label>
        <input type="text" id="f-name" placeholder="Ex : Le Café du Port">
      </div>

      <div class="form-2col">
        <div class="form-row">
          <label>Catégorie *</label>
          <select id="f-cat" onchange="updateEmoji()"></select>
        </div>
        <div class="form-row">
          <label>Emoji</label>
          <input type="text" id="f-emoji" maxlength="4">
          <span class="form-hint">Rempli selon la catégorie</span>
        </div>
      </div>

      <div class="form-row">
        <label>Rubrique du menu de la carte</label>
        <select id="f-layer"></select>
        <span class="form-hint">Détermine dans quelle case du menu « Catégories » le lieu apparaît. Proposée automatiquement selon la catégorie.</span>
      </div>

      <div class="form-row">
        <label>Position sur la carte *</label>
        <div id="pick-map"></div>
        <span class="form-hint" style="margin-bottom:8px">Cliquez sur la carte ou déplacez le repère bleu pour placer le lieu.</span>
        <div class="form-2col">
          <input type="number" id="f-lat" placeholder="Latitude (47.5964)" step="0.000001" oninput="coordsTyped()">
          <input type="number" id="f-lon" placeholder="Longitude (-2.8466)" step="0.000001" oninput="coordsTyped()">
        </div>
        <input type="text" id="f-paste" placeholder="Ou collez ici « 47.5964, -2.8466 » copié depuis Google Maps" style="margin-top:8px" oninput="pasteCoords()">
      </div>

      <div class="form-row">
        <label>URL de la photo</label>
        <input type="text" id="f-image" placeholder="https://…" oninput="previewImg()">
        <img id="img-preview" class="img-preview" alt="Aperçu" onerror="this.classList.remove('visible')">
        <span class="form-hint">Préférez une adresse en https:// (Wikimedia Commons, imgbb.com). Les adresses en http:// peuvent ne pas s'afficher.</span>
      </div>

      <div class="form-row">
        <label>Description</label>
        <textarea id="f-desc" placeholder="Une information par ligne.&#10;Ex : Crêperie - Brasserie&#10;tél : 02 97 26 …"></textarea>
        <span class="form-hint">Appuyez sur Entrée pour passer à la ligne.</span>
      </div>

      <div class="form-row">
        <label>Liens web (optionnel)</label>
        <div id="links-box"></div>
        <button type="button" class="btn btn-gray btn-sm" onclick="addLinkRow()">+ Ajouter un lien</button>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-gray" onclick="closeModal()">Annuler</button>
      <button class="btn btn-green" onclick="savePOI()">Enregistrer</button>
    </div>
  </div>
</div>

<!-- Modal Supprimer -->
<div class="modal-bg" id="modal-del">
  <div class="modal" style="max-width:440px">
    <div class="modal-header">
      <h2>Supprimer un lieu</h2>
      <button class="modal-close" onclick="closeDel()">✕</button>
    </div>
    <div class="modal-body">
      <div style="background:#fff0f0;border:.5px solid #f5c1c1;border-radius:10px;padding:14px;margin-bottom:14px">
        <p id="del-name" style="font-size:14px;color:var(--red);font-weight:500;margin-bottom:4px"></p>
        <small style="font-size:12px;color:var(--text-m)">La carte publiée ne change qu'après le téléchargement et l'envoi du fichier pois.js.</small>
      </div>
      <p id="del-extra" style="font-size:13px;color:var(--amber-t);margin-bottom:8px;display:none">⚠️ Plaque de secours : la page secours.html devra aussi être mise à jour par l'administrateur.</p>
      <p style="font-size:13px;color:var(--text-m)">Voulez-vous vraiment supprimer ce lieu de la liste ?</p>
    </div>
    <div class="modal-footer">
      <button class="btn btn-gray" onclick="closeDel()">Annuler</button>
      <button class="btn btn-red" onclick="confirmDelete()">Supprimer</button>
    </div>
  </div>
</div>

<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script>
/* ============ Configuration ============ */
const POIS_URL = 'pois.js';
const DRAFT_KEY = 'miam_admin_poi_draft_v2';
const ISLAND = {lat:47.5964, lon:-2.8466, zoom:15};
const BOUNDS = {latMin:47.55, latMax:47.62, lonMin:-2.88, lonMax:-2.80};

const CAT_EMOJIS = {
  "Restaurant":"🍽️","Restauration rapide":"🥙","Bar":"🍺","Commerce":"🛒",
  "Hébergement":"🛏️","Location vélo":"🚲","Transport":"⛴️","Camping":"⛺",
  "Information":"ℹ️","Plage":"🏖️","Loisirs":"🌿","Patrimoine & curiosités":"🏛️",
  "Patrimoine religieux":"⛪","Mégalithe":"🗿","Art & Artisanat":"🎨",
  "Curiosités":"✨","Santé":"🏥","Toilettes":"🚻","Pique-nique":"🧺",
  "Poubelles":"🗑️","Secours":"🔴","Service":"🏧","Alimentation":"🥖","Défibrillateurs":"❤️"
};
/* Couches déclarées dans index.html (layerState). Une couche absente de cette liste n'affiche RIEN sur la carte.
   Si vous ajoutez une couche dans index.html, ajoutez-la aussi ici. */
const LAYERS = {
  "poi-main":"Restaurants, bars, hébergements, infos",
  "poi-alim":"Alimentation, commerces, locations de vélos",
  "poi-heritage":"Patrimoine & sites",
  "sante":"Santé",
  "Défibrillateurs":"Défibrillateurs",
  "secours":"Plaques de secours",
  "pique-nique":"Aires de pique-nique",
  "toilettes":"Toilettes publiques",
  "poubelles":"Poubelles & tri",
  "vtc":"Passeur & VTC",
  "loisirs":"Loisirs & jardins",
  "plages":"Plages"
};
/* Couche proposée pour une catégorie (sinon : la plus fréquente dans pois.js) */
const CAT_LAYERS = {
  "Restaurant":"poi-main","Restauration rapide":"poi-main","Bar":"poi-main","Hébergement":"poi-main",
  "Information":"poi-main","Transport":"poi-main","Service":"poi-main",
  "Alimentation":"poi-alim","Commerce":"poi-alim","Location vélo":"poi-alim","Art & Artisanat":"poi-alim",
  "Camping":"loisirs","Loisirs":"loisirs","Plage":"plages",
  "Patrimoine & curiosités":"poi-heritage","Patrimoine religieux":"poi-heritage","Mégalithe":"poi-heritage","Curiosités":"poi-heritage",
  "Santé":"sante","Défibrillateurs":"Défibrillateurs","Toilettes":"toilettes","Pique-nique":"pique-nique",
  "Poubelles":"poubelles","Secours":"secours"
};
/* Compteurs écrits « en dur » dans le menu de index.html */
const MENU_COUNTS = {"secours":45, "poubelles":61};

/* ============ État ============ */
let _POIS = [];
let loadedFromFile = '';
let currentPage = 1;
const PAGE_SIZE = 25;
let deleteIdx = -1;
let dirty = false;
let changeLog = [];
let pickMap = null, pickMarker = null;
let dupKeys = new Set();
let commentLines = [];

/* ============ Utilitaires ============ */
const $ = id => document.getElementById(id);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const keyOf = p => (p.name||'').trim().toLowerCase() + '|' + Number(p.lat).toFixed(6) + '|' + Number(p.lon).toFixed(6);

function mostCommon(arr){
  const c = {}; arr.forEach(v => c[v] = (c[v]||0)+1);
  return Object.entries(c).sort((a,b)=>b[1]-a[1])[0]?.[0];
}
function layerForCat(cat){
  return CAT_LAYERS[cat] || mostCommon(_POIS.filter(p=>p.cat===cat && LAYERS[p.layer]).map(p=>p.layer)) || 'poi-main';
}
function colorForCat(cat){
  return mostCommon(_POIS.filter(p=>p.cat===cat).map(p=>p.color)) || 'Blue';
}
function allCats(){
  return [...new Set([...Object.keys(CAT_EMOJIS), ..._POIS.map(p=>p.cat)])].sort((a,b)=>a.localeCompare(b,'fr'));
}
function showAlert(msg, type, boxId){
  const el = $(boxId || 'alert-box');
  el.textContent = msg;
  el.className = 'alert ' + type;
  if (!boxId) el.scrollIntoView({behavior:'smooth', block:'nearest'});
  clearTimeout(el._t);
  if (type !== 'error') el._t = setTimeout(() => el.className = 'alert', 7000);
}
function markDirty(msg){
  dirty = true;
  if (msg) changeLog.push(msg);
  saveDraft();
  updateBadge();
}
function updateBadge(){
  const b = $('total-badge');
  b.textContent = _POIS.length + ' lieux' + (dirty ? ' · modifié' : '');
  b.classList.toggle('dirty', dirty);
}
window.addEventListener('beforeunload', e => { if (dirty){ e.preventDefault(); e.returnValue=''; } });

/* ============ Brouillon local ============ */
function saveDraft(){
  try { localStorage.setItem(DRAFT_KEY, JSON.stringify({date:new Date().toISOString(), pois:_POIS, log:changeLog})); } catch(e){}
}
function readDraft(){
  try { return JSON.parse(localStorage.getItem(DRAFT_KEY) || 'null'); } catch(e){ return null; }
}
function clearDraft(){ try { localStorage.removeItem(DRAFT_KEY); } catch(e){} }

/* ============ Chargement de pois.js ============ */
function parsePoisText(text){
  const m = /(?:const|let|var)\s+POIS\s*=\s*\[/.exec(text);
  if (!m) throw new Error("Le fichier ne contient pas « const POIS = [ … ] ».");
  const start = m.index + m[0].length - 1;
  const end = text.lastIndexOf(']');
  if (end < start) throw new Error("Fin de la liste introuvable (« ] » manquant).");
  const comments = [], kept = [];
  text.slice(start, end+1).split('\n').forEach(l => (l.trim().startsWith('//') ? comments : kept).push(l));
  let arr;
  try { arr = JSON.parse(kept.join('\n')); }
  catch(e){ throw new Error("Erreur dans pois.js (virgule, guillemet ou accolade manquant) : " + e.message); }
  if (!Array.isArray(arr)) throw new Error("La liste des lieux est invalide.");
  arr._comments = comments;
  return arr;
}
function normalizePoi(p){
  return Object.assign({name:'', lat:0, lon:0, cat:'', color:'Blue', image:'', description:'', links:[], emoji:'', layer:''}, p, {
    lat: Number(p.lat), lon: Number(p.lon),
    links: Array.isArray(p.links) ? p.links : []
  });
}
function applyLoaded(arr, label){
  _POIS = arr.map(normalizePoi);
  commentLines = arr._comments || [];
  loadedFromFile = label;
  dirty = false; changeLog = [];
  $('drop').classList.remove('show');
  const draft = readDraft();
  if (draft && Array.isArray(draft.pois) && JSON.stringify(draft.pois) !== JSON.stringify(_POIS)){
    const d = new Date(draft.date).toLocaleString('fr-FR');
    const b = $('draft-banner');
    b.innerHTML = '💾 Un brouillon de modifications non envoyées existe (enregistré le ' + esc(d) + ', ' + draft.pois.length + ' lieux).<br>'
      + '<button class="btn btn-green btn-sm" id="b-restore">Reprendre mon brouillon</button>'
      + '<button class="btn btn-gray btn-sm" id="b-drop">Repartir du fichier pois.js</button>';
    b.classList.add('show');
    $('b-restore').onclick = () => {
      _POIS = draft.pois.map(normalizePoi); changeLog = draft.log || []; dirty = true;
      b.classList.remove('show'); refreshAll();
      showAlert('Brouillon rétabli. N\'oubliez pas de télécharger pois.js quand vous avez fini.', 'success');
    };
    $('b-drop').onclick = () => { clearDraft(); b.classList.remove('show'); };
  }
  refreshAll();
  if (commentLines.length) showAlert(commentLines.length + ' ligne(s) mise(s) en commentaire (//) dans pois.js : elles sont conservées telles quelles à l\'export.', 'warn');
}
async function autoLoad(){
  try {
    const r = await fetch(POIS_URL + '?t=' + Date.now(), {cache:'no-store'});
    if (!r.ok) throw new Error('HTTP ' + r.status);
    applyLoaded(parsePoisText(await r.text()), POIS_URL);
  } catch(e){
    $('drop').classList.add('show');
    refreshAll();
  }
}
function loadFile(file){
  const rd = new FileReader();
  rd.onload = () => {
    try { applyLoaded(parsePoisText(rd.result), file.name); showAlert('Fichier « ' + file.name + ' » chargé : ' + _POIS.length + ' lieux.', 'success'); }
    catch(e){ showAlert('Lecture impossible : ' + e.message, 'error'); }
  };
  rd.readAsText(file, 'utf-8');
}
$('file-in').addEventListener('change', e => { if (e.target.files[0]) loadFile(e.target.files[0]); e.target.value=''; });
window.addEventListener('dragover', e => e.preventDefault());
window.addEventListener('drop', e => { e.preventDefault(); if (e.dataTransfer.files[0]) loadFile(e.dataTransfer.files[0]); });

/* ============ Affichage ============ */
function refreshAll(){
  computeDuplicates();
  buildStats();
  buildCatFilter();
  buildCatSelect();
  buildLayerSelect();
  renderTable();
  updateBadge();
}
function computeDuplicates(){
  const seen = {}; dupKeys = new Set();
  _POIS.forEach(p => { const k = keyOf(p); if (seen[k]) dupKeys.add(k); seen[k] = true; });
  $('btn-dedupe').style.display = dupKeys.size ? '' : 'none';
  $('btn-fixlayers').style.display = _POIS.some(badLayer) ? '' : 'none';
}
function badLayer(p){ return !LAYERS[p.layer]; }
function isHttp(p){ return /^http:\/\//i.test(p.image||''); }

function buildStats(){
  const total = _POIS.length;
  const noImg = _POIS.filter(p=>!p.image).length;
  const http = _POIS.filter(isHttp).length;
  const cats = new Set(_POIS.map(p=>p.cat)).size;
  const cell = (n,l,color) => `<div class="stat"><div class="stat-n" ${color?`style="color:${color}"`:''}>${n}</div><div class="stat-l">${l}</div></div>`;
  $('stats-grid').innerHTML = cell(total,'Lieux') + cell(cats,'Catégories') + cell(noImg,'Sans photo', noImg?'#c0392b':'') + cell(http,'Photos en http', http?'#e67e22':'') + cell(dupKeys.size,'Doublons', dupKeys.size?'#c0392b':'') + cell(_POIS.filter(badLayer).length,'Invisibles sur la carte', _POIS.some(badLayer)?'#c0392b':'');
}
function buildCatFilter(){
  const sel = $('filter-cat'), cur = sel.value;
  sel.innerHTML = '<option value="">Toutes les catégories</option>';
  [...new Set(_POIS.map(p=>p.cat))].sort((a,b)=>a.localeCompare(b,'fr')).forEach(c => {
    const o = document.createElement('option');
    o.value = c; o.textContent = (CAT_EMOJIS[c]||'') + ' ' + c;
    sel.appendChild(o);
  });
  sel.value = cur;
}
function buildLayerSelect(){
  $('f-layer').innerHTML = Object.entries(LAYERS).map(([k,v]) => `<option value="${esc(k)}">${esc(v)}</option>`).join('');
}
function buildCatSelect(){
  $('f-cat').innerHTML = allCats().map(c => `<option value="${esc(c)}">${esc((CAT_EMOJIS[c]||'📍') + ' ' + c)}</option>`).join('');
}

function renderTable(){
  const q = $('search').value.toLowerCase().trim();
  const cat = $('filter-cat').value, flag = $('filter-flag').value;
  const list = _POIS.filter(p => {
    const mq = !q || p.name.toLowerCase().includes(q) || (p.description||'').toLowerCase().includes(q) || (p.cat||'').toLowerCase().includes(q);
    const mc = !cat || p.cat === cat;
    const mf = !flag || (flag==='nophoto' && !p.image) || (flag==='http' && isHttp(p)) || (flag==='dup' && dupKeys.has(keyOf(p))) || (flag==='layer' && badLayer(p));
    return mq && mc && mf;
  });
  const totalPages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
  if (currentPage > totalPages) currentPage = 1;
  const page = list.slice((currentPage-1)*PAGE_SIZE, currentPage*PAGE_SIZE);
  $('no-results').style.display = list.length ? 'none' : 'block';
  $('poi-table').innerHTML = page.map(p => {
    const idx = _POIS.indexOf(p);
    const emo = esc(p.emoji || CAT_EMOJIS[p.cat] || '📍');
    const img = p.image
      ? `<img class="poi-img" src="${esc(p.image)}" alt="" loading="lazy" onerror="this.style.display='none';this.parentNode.querySelector('.poi-img-empty').style.display='flex'"><div class="poi-img-empty" style="display:none">${emo}</div>`
      : `<div class="poi-img-empty">${emo}</div>`;
    const tags = (isHttp(p) ? '<span class="tag">photo http</span>' : '') + (dupKeys.has(keyOf(p)) ? '<span class="tag">doublon</span>' : '') + (badLayer(p) ? '<span class="tag" style="background:#fff0f0;color:#c0392b">invisible sur la carte</span>' : '');
    return `<tr><td>${img}</td>
      <td><span class="poi-name">${esc(p.name)}</span>${tags}</td>
      <td><span class="poi-cat">${emo} ${esc(p.cat)}</span></td>
      <td><span class="coords">${Number(p.lat).toFixed(4)}, ${Number(p.lon).toFixed(4)}</span></td>
      <td><div class="act-btns">
        <button class="act-btn act-edit" onclick="openEdit(${idx})">Modifier</button>
        <button class="act-btn act-del" onclick="openDelete(${idx})">Suppr.</button>
      </div></td></tr>`;
  }).join('');
  let pg = '';
  if (totalPages > 1) for (let i=1;i<=totalPages;i++) pg += `<button class="page-btn ${i===currentPage?'active':''}" onclick="goPage(${i})">${i}</button>`;
  $('pagination').innerHTML = pg;
}
function goPage(n){ currentPage = n; renderTable(); window.scrollTo({top:0, behavior:'smooth'}); }

/* ============ Fenêtre d'édition ============ */
function updateEmoji(){ $('f-emoji').value = CAT_EMOJIS[$('f-cat').value] || '📍'; $('f-layer').value = layerForCat($('f-cat').value); }
function previewImg(){
  const url = $('f-image').value.trim(), img = $('img-preview');
  if (url){ img.src = url; img.classList.add('visible'); } else img.classList.remove('visible');
}
function addLinkRow(url, label){
  const row = document.createElement('div');
  row.className = 'link-row';
  row.innerHTML = '<input type="text" class="lk-url" placeholder="https://…"><input type="text" class="lk-label" placeholder="Texte du lien"><button type="button" title="Retirer ce lien">✕</button>';
  row.querySelector('.lk-url').value = url || '';
  row.querySelector('.lk-label').value = label || '';
  row.querySelector('button').onclick = () => row.remove();
  $('links-box').appendChild(row);
}
function fillLinks(links){
  $('links-box').innerHTML = '';
  (links||[]).forEach(l => addLinkRow(l[0], l[1]));
}

function initPickMap(){
  if (!window.L) { $('pick-map').innerHTML = '<p style="padding:20px;font-size:13px;color:#666">La carte n\'a pas pu se charger (pas de connexion ?). Saisissez les coordonnées à la main.</p>'; return; }
  if (!pickMap){
    pickMap = L.map('pick-map').setView([ISLAND.lat, ISLAND.lon], ISLAND.zoom);
    const osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom:19, attribution:'© OpenStreetMap'});
    const ign = L.tileLayer('https://data.geopf.fr/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&STYLE=normal&TILEMATRIXSET=PM&FORMAT=image/png&LAYER=GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}', {maxZoom:18, attribution:'© IGN'});
    const photo = L.tileLayer('https://data.geopf.fr/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&STYLE=normal&TILEMATRIXSET=PM&FORMAT=image/jpeg&LAYER=ORTHOIMAGERY.ORTHOPHOTOS&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}', {maxZoom:19, attribution:'© IGN'});
    osm.addTo(pickMap);
    L.control.layers({'Plan OpenStreetMap':osm, 'Plan IGN':ign, 'Photo aérienne IGN':photo}, null, {collapsed:true}).addTo(pickMap);
    /* Si OpenStreetMap refuse les tuiles (page ouverte depuis un fichier local, sans « Referer »), on bascule sur le plan IGN. */
    let osmFails = 0;
    osm.on('tileerror', () => {
      if (++osmFails === 3 && pickMap.hasLayer(osm)){ pickMap.removeLayer(osm); ign.addTo(pickMap); }
    });
    pickMap.on('click', e => setPoint(e.latlng.lat, e.latlng.lng, false));
  }
  setTimeout(() => pickMap.invalidateSize(), 50);
}
function setPoint(lat, lon, recenter){
  $('f-lat').value = lat.toFixed(6);
  $('f-lon').value = lon.toFixed(6);
  if (!pickMap) return;
  if (!pickMarker){
    pickMarker = L.marker([lat, lon], {draggable:true}).addTo(pickMap);
    pickMarker.on('dragend', () => { const p = pickMarker.getLatLng(); $('f-lat').value = p.lat.toFixed(6); $('f-lon').value = p.lng.toFixed(6); });
  } else pickMarker.setLatLng([lat, lon]);
  if (recenter) pickMap.setView([lat, lon], 17);
}
function clearPoint(){
  if (pickMarker && pickMap){ pickMap.removeLayer(pickMarker); }
  pickMarker = null;
  if (pickMap) pickMap.setView([ISLAND.lat, ISLAND.lon], ISLAND.zoom);
}
function coordsTyped(){
  const lat = parseFloat($('f-lat').value), lon = parseFloat($('f-lon').value);
  if (!isNaN(lat) && !isNaN(lon) && pickMap) setPoint(lat, lon, true);
}
function pasteCoords(){
  const m = $('f-paste').value.match(/(-?\d+[.,]\d+)\s*[,;\s]\s*(-?\d+[.,]\d+)/);
  if (m){
    setPoint(parseFloat(m[1].replace(',','.')), parseFloat(m[2].replace(',','.')), true);
    $('f-paste').value = '';
  }
}

function openAdd(){
  if (!_POIS.length && !confirm("Aucun fichier pois.js n'est chargé : vous allez créer une liste incomplète. Continuer ?")) return;
  $('edit-idx').value = '-1';
  $('modal-title').textContent = 'Ajouter un lieu';
  $('modal-alert').className = 'alert';
  $('f-name').value = '';
  $('f-cat').value = 'Restaurant'; updateEmoji();
  $('f-lat').value = ''; $('f-lon').value = ''; $('f-paste').value = '';
  $('f-image').value = ''; $('f-desc').value = '';
  fillLinks([]);
  previewImg();
  $('modal').classList.add('open');
  initPickMap(); clearPoint();
}
function openEdit(idx){
  const p = _POIS[idx];
  $('edit-idx').value = idx;
  $('modal-title').textContent = 'Modifier — ' + p.name;
  $('modal-alert').className = 'alert';
  $('f-name').value = p.name;
  $('f-cat').value = p.cat;
  $('f-emoji').value = p.emoji || CAT_EMOJIS[p.cat] || '';
  if (!LAYERS[p.layer]){ const o = document.createElement('option'); o.value = p.layer; o.textContent = '⚠ ' + p.layer + ' (inconnue : invisible sur la carte)'; $('f-layer').appendChild(o); }
  $('f-layer').value = p.layer;
  $('f-lat').value = p.lat; $('f-lon').value = p.lon; $('f-paste').value = '';
  $('f-image').value = p.image || '';
  $('f-desc').value = p.description || '';
  fillLinks(p.links);
  previewImg();
  $('modal').classList.add('open');
  initPickMap();
  clearPoint();
  setPoint(p.lat, p.lon, true);
}
function closeModal(){ $('modal').classList.remove('open'); }

function savePOI(){
  const err = m => showAlert(m, 'warn', 'modal-alert');
  const name = $('f-name').value.trim();
  const lat = parseFloat($('f-lat').value), lon = parseFloat($('f-lon').value);
  const cat = $('f-cat').value;
  if (!name) return err('Le nom est obligatoire.');
  if (isNaN(lat) || isNaN(lon)) return err('Placez le lieu sur la carte (ou saisissez latitude et longitude).');
  if (lat < BOUNDS.latMin || lat > BOUNDS.latMax || lon < BOUNDS.lonMin || lon > BOUNDS.lonMax)
    return err("Ces coordonnées sont en dehors de l'Île-aux-Moines. Vérifiez (latitude ≈ 47,6 ; longitude ≈ −2,85).");

  const image = $('f-image').value.trim();
  if (image && !/^https?:\/\//i.test(image)) return err("L'adresse de la photo doit commencer par https://");

  const links = [];
  for (const row of document.querySelectorAll('#links-box .link-row')){
    let u = row.querySelector('.lk-url').value.trim();
    const l = row.querySelector('.lk-label').value.trim();
    if (!u) continue;
    if (!/^https?:\/\//i.test(u)) u = 'https://' + u.replace(/^\/+/, '');
    links.push([u, l || 'Voir le site']);
  }

  const idx = parseInt($('edit-idx').value);
  const old = idx >= 0 ? _POIS[idx] : null;
  const catChanged = !old || old.cat !== cat;
  if (!LAYERS[$('f-layer').value]) return err('Choisissez une rubrique du menu valide : sinon le lieu ne s\'afficherait pas sur la carte.');
  if (cat === 'Secours' && !/^\s*\d+\s*-/.test(name)) return err('Une plaque de secours doit commencer par son numéro, par exemple « 12 - le Rudel » : le numéro s\'affiche sur la carte.');
  const poi = Object.assign({}, old || {}, {
    name,
    lat: parseFloat(lat.toFixed(6)),
    lon: parseFloat(lon.toFixed(6)),
    cat,
    color: old && !catChanged ? old.color : colorForCat(cat),
    image,
    description: $('f-desc').value.replace(/\r\n/g, '\n').trim(),
    links,
    emoji: $('f-emoji').value.trim() || CAT_EMOJIS[cat] || '📍',
    layer: $('f-layer').value
  });

  const k = keyOf(poi);
  if (_POIS.some((p,i) => i !== idx && keyOf(p) === k)) return err('Un lieu identique (même nom, même position) existe déjà.');

  if (old){
    _POIS[idx] = poi;
    markDirty('Modifié : ' + name);
    showAlert('« ' + name + ' » modifié. Pensez à télécharger pois.js quand vous aurez fini.', 'success');
  } else {
    _POIS.push(poi);
    markDirty('Ajouté : ' + name);
    showAlert('« ' + name + ' » ajouté. Pensez à télécharger pois.js quand vous aurez fini.', 'success');
  }
  if (cat === 'Secours') showAlert('Plaque de secours modifiée : prévenez l\'administrateur, la page secours.html doit être mise à jour.', 'warn');
  closeModal();
  refreshAll();
}

/* ============ Suppression ============ */
function openDelete(idx){
  deleteIdx = idx;
  $('del-name').textContent = _POIS[idx].name + ' (' + _POIS[idx].cat + ')';
  $('del-extra').style.display = _POIS[idx].cat === 'Secours' ? 'block' : 'none';
  $('modal-del').classList.add('open');
}
function closeDel(){ $('modal-del').classList.remove('open'); }
function confirmDelete(){
  if (deleteIdx < 0) return;
  const name = _POIS[deleteIdx].name;
  _POIS.splice(deleteIdx, 1);
  deleteIdx = -1;
  closeDel();
  markDirty('Supprimé : ' + name);
  refreshAll();
  showAlert('« ' + name + ' » supprimé. Pensez à télécharger pois.js quand vous aurez fini.', 'success');
}
function fixLayers(){
  const bad = _POIS.filter(badLayer);
  if (!bad.length) return;
  if (!confirm(bad.length + " lieu(x) ont une couche inconnue de la carte et ne s'affichent pas :\n\n" + bad.map(p => '• ' + p.name + ' (' + p.layer + ')').join('\n') + "\n\nLeur attribuer la couche habituelle de leur catégorie ?")) return;
  bad.forEach(p => { const old = p.layer; p.layer = layerForCat(p.cat); changeLog.push('Couche corrigée : ' + p.name + ' (' + old + ' → ' + p.layer + ')'); });
  markDirty();
  refreshAll();
  showAlert(bad.length + ' lieu(x) corrigé(s). Ils réapparaîtront sur la carte après publication.', 'success');
}
function removeDuplicates(){
  const seen = new Set(), out = [];
  _POIS.forEach(p => { const k = keyOf(p); if (!seen.has(k)){ seen.add(k); out.push(p); } });
  const n = _POIS.length - out.length;
  if (!n) return;
  if (!confirm(n + ' doublon(s) exact(s) (même nom, même position) vont être supprimés ; la première occurrence est conservée. Continuer ?')) return;
  _POIS = out;
  markDirty('Doublons supprimés : ' + n);
  refreshAll();
  showAlert(n + ' doublon(s) supprimé(s).', 'success');
}

/* ============ Export ============ */
function buildExportText(){
  const lines = _POIS.map((p,i) => '  ' + JSON.stringify(p) + (i < _POIS.length-1 ? ',' : ''));
  const head = "// M'IAM — Points d'intérêt de l'Île-aux-Moines\n// Pour modifier un POI : trouvez-le par son nom (Ctrl+F), modifiez les valeurs entre guillemets\n// Champs : name, lat, lon, cat, image, description, links, emoji, layer\n// RÈGLE : ne jamais modifier les accolades { }, crochets [ ] ni les virgules entre POI\n\n";
  const tail = commentLines.length ? commentLines.join('\n') + '\n' : '';
  return head + "const POIS = [\n" + lines.join('\n') + '\n' + tail + '];\n';
}
function checkExport(text){
  const back = parsePoisText(text);
  if (back.length !== _POIS.length) throw new Error('Le contrôle de cohérence a échoué.');
}
function showExport(){
  if (!_POIS.length){ showAlert('Aucun lieu chargé : rien à exporter.', 'warn'); return; }
  const ul = $('change-list');
  ul.innerHTML = changeLog.length ? changeLog.map(l => '<li>' + esc(l) + '</li>').join('') : '<li>Aucune modification depuis le chargement.</li>';
  const warns = [];
  Object.entries(MENU_COUNTS).forEach(([layer, n]) => {
    const now = _POIS.filter(p => p.layer === layer).length;
    if (now !== n) warns.push('Le menu de index.html affiche « (' + n + ') » pour ' + LAYERS[layer] + ' mais il y en a maintenant ' + now + ' : à signaler à l\'administrateur.');
  });
  if (_POIS.some(p => p.cat === 'Secours') && changeLog.some(l => /plaque|^(Ajouté|Modifié|Supprimé) : \d+\s*-/i.test(l))) warns.push('Plaques de secours modifiées : la page secours.html doit être régénérée par l\'administrateur.');
  _POIS.filter(badLayer).forEach(p => warns.push('« ' + p.name + ' » est invisible sur la carte (couche inconnue : ' + p.layer + ').'));
  ul.innerHTML += warns.map(w => '<li style="color:#f5cba7">⚠️ ' + esc(w) + '</li>').join('');
  $('export-zone').style.display = 'block';
  $('export-zone').scrollIntoView({behavior:'smooth'});
}
function downloadExport(){
  try {
    const text = buildExportText(); checkExport(text);
    const blob = new Blob([text], {type:'text/javascript;charset=utf-8'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = 'pois.js';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    dirty = false; updateBadge();
    showAlert('Fichier pois.js téléchargé (' + _POIS.length + ' lieux). Envoyez-le maintenant à l\'administrateur.', 'success');
  } catch(e){ showAlert('Export impossible : ' + e.message, 'error'); }
}
function copyExport(){
  try {
    const text = buildExportText(); checkExport(text);
    navigator.clipboard.writeText(text).then(
      () => showAlert('Contenu copié. Le téléchargement du fichier est plus sûr que le copier-coller.', 'success'),
      () => showAlert('Copie impossible : utilisez « Télécharger pois.js ».', 'warn'));
  } catch(e){ showAlert('Export impossible : ' + e.message, 'error'); }
}

/* ============ Démarrage ============ */
window.addEventListener('DOMContentLoaded', autoLoad);
</script>
</body>
</html>
