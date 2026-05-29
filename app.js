// ═══════════════════════════════════════════════
// THEME (light / dark)
// ═══════════════════════════════════════════════
(function() {
  var saved = localStorage.getItem('jsph-theme');
  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  var isDark = saved ? saved === 'dark' : prefersDark;
  if (isDark) document.documentElement.classList.add('dark');
  else document.documentElement.classList.add('light');
})();

function _updateThemeBtn() {
  var btn = document.getElementById('theme-toggle-btn');
  if (!btn) return;
  var isDark = document.documentElement.classList.contains('dark');
  btn.textContent = isDark ? '☀️' : '🌙';
  btn.title = isDark ? 'Switch to light mode' : 'Switch to dark mode';
}

function toggleTheme() {
  var html = document.documentElement;
  if (html.classList.contains('dark')) {
    html.classList.remove('dark');
    html.classList.add('light');
    localStorage.setItem('jsph-theme', 'light');
  } else {
    html.classList.remove('light');
    html.classList.add('dark');
    localStorage.setItem('jsph-theme', 'dark');
  }
  _updateThemeBtn();
}

document.addEventListener('DOMContentLoaded', _updateThemeBtn);

// ═══════════════════════════════════════════════
// SVG ICON SYSTEM
// ═══════════════════════════════════════════════
function icon(name, size) {
  size = size || 16;
  var icons = {
    'refresh':       '<path d="M4 4a6 6 0 1 1 0 8"/><polyline points="1,4 4,4 4,7"/>',
    'plus':          '<line x1="8" y1="2" x2="8" y2="14"/><line x1="2" y1="8" x2="14" y2="8"/>',
    'search':        '<circle cx="7" cy="7" r="5"/><line x1="11" y1="11" x2="14" y2="14"/>',
    'filter':        '<polygon points="2,2 14,2 9,9 9,14 7,14 7,9"/>',
    'copy':          '<rect x="5" y="5" width="8" height="10" rx="1"/><rect x="3" y="3" width="8" height="10" rx="1"/>',
    'broadcast':     '<path d="M2 8 a6 6 0 0 1 12 0"/><path d="M5 8 a3 3 0 0 1 6 0"/><circle cx="8" cy="8" r="1" fill="currentColor"/>',
    'check':         '<polyline points="2,8 6,12 14,4"/>',
    'alert':         '<path d="M8 2 L15 14 L1 14 Z"/><line x1="8" y1="7" x2="8" y2="10"/><circle cx="8" cy="12" r=".6" fill="currentColor"/>',
    'clock':         '<circle cx="8" cy="8" r="6"/><polyline points="8,4 8,8 11,10"/>',
    'sync':          '<path d="M4 4a6 6 0 1 1 0 8"/><polyline points="1,4 4,4 4,7"/>',
    'user':          '<circle cx="8" cy="5" r="3"/><path d="M2 14 a6 4 0 0 1 12 0"/>',
    'users':         '<circle cx="6" cy="5" r="2.5"/><path d="M1 13 a5 3.5 0 0 1 10 0"/><circle cx="11" cy="5" r="2.5"/><path d="M11 13 a4 3 0 0 1 5 0"/>',
    'briefcase':     '<rect x="3" y="6" width="10" height="8" rx="1"/><path d="M6 6V4a2 2 0 0 1 4 0v2"/>',
    'funnel':        '<polygon points="2,2 14,2 9,9 9,14 7,14 7,9"/>',
    'trending':      '<polyline points="2,12 6,7 9,10 14,4"/>',
    'calendar':      '<rect x="2" y="3" width="12" height="11" rx="1"/><line x1="2" y1="7" x2="14" y2="7"/><line x1="5" y1="1" x2="5" y2="5"/><line x1="11" y1="1" x2="11" y2="5"/>',
    'peso':          '<path d="M5 3h4a3 3 0 0 1 0 6H5V3z"/><line x1="5" y1="9" x2="11" y2="9"/><line x1="5" y1="3" x2="5" y2="14"/>',
    'chart-bar':     '<rect x="2" y="9" width="3" height="5"/><rect x="6.5" y="5" width="3" height="9"/><rect x="11" y="2" width="3" height="12"/>',
    'reopen':        '<path d="M4 8 a4 4 0 1 1 8 0"/><polyline points="12,4 12,8 8,8"/>',
    'cancel-x':      '<line x1="4" y1="4" x2="12" y2="12"/><line x1="12" y1="4" x2="4" y2="12"/>',
    'hold':          '<rect x="4" y="2" width="3" height="12" rx="1"/><rect x="9" y="2" width="3" height="12" rx="1"/>',
    'history':       '<circle cx="8" cy="8" r="6"/><polyline points="8,5 8,8 10,10"/><path d="M2 8 a6 6 0 0 1 10-4"/>',
    'shield':        '<path d="M8 2 L14 5 L14 10 Q14 13 8 15 Q2 13 2 10 L2 5 Z"/>',
    'eye':           '<path d="M2 8 Q8 2 14 8 Q8 14 2 8"/><circle cx="8" cy="8" r="2"/>',
    'settings':      '<circle cx="8" cy="8" r="3"/><path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.2 3.2l1.4 1.4M11.4 11.4l1.4 1.4M3.2 12.8l1.4-1.4M11.4 4.6l1.4-1.4"/>',
    'match':         '<circle cx="5" cy="8" r="3"/><circle cx="11" cy="8" r="3"/><line x1="8" y1="5" x2="8" y2="11"/>',
    'warning':       '<path d="M8 2 L15 14 L1 14 Z"/><line x1="8" y1="7" x2="8" y2="10"/><circle cx="8" cy="12" r=".6" fill="currentColor"/>',
    'chevron-down':  '<polyline points="4,6 8,10 12,6"/>',
    'chevron-right': '<polyline points="6,4 10,8 6,12"/>',
    'dot':           '<circle cx="8" cy="8" r="3" fill="currentColor"/>',
    'cloud':         '<path d="M12 12H4a4 4 0 0 1 0-8 5.5 5.5 0 0 1 10.9 1.7A3 3 0 0 1 12 12z"/>',
    'report':        '<path d="M9 2H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V6z"/><polyline points="9,2 9,6 13,6"/><line x1="5" y1="9" x2="11" y2="9"/><line x1="5" y1="11" x2="9" y2="11"/>',
    'send':          '<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22,2 15,22 11,13 2,9"/>',
    'whatsapp':      '<path d="M8 2a6 6 0 0 0-5.3 8.8L2 14l3.3-.7A6 6 0 1 0 8 2z"/><path d="M6 7.5a.5.5 0 0 0 0 1H7l.5 1.5H7a.5.5 0 0 0 0 1h1.5a.5.5 0 0 0 .5-.5V7.5a.5.5 0 0 0-.5-.5H6z"/>',
  };
  var paths = icons[name] || '';
  return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;flex-shrink:0" aria-hidden="true">' + paths + '</svg>';
}

// ═══════════════════════════════════════════════
// ROLE CONFIG
// ═══════════════════════════════════════════════
const ROLE_CONFIG = {
  admins: [
    'markchristianpjalandoon@gmail.com'
  ],
  coordinators: {
    // 'email@example.com': { name: 'Coordinator Name', commissionRate: 0.30, active: true }
  }
};

// Merged at runtime with Firebase /config/roles (Firebase takes precedence)
var _mergedRoleConfig = null;
function getRoleConfig() {
  return _mergedRoleConfig || ROLE_CONFIG;
}

var currentUserRole  = 'coordinator'; // safe default until auth resolves
var currentUserEmail = '';
var _uidRole = null; // role fetched from users/{uid}/role — beats email config

function getUserRole(email) {
  // UID-based role always wins over email config
  if (_uidRole) return _uidRole;
  if (!email) return 'coordinator';
  const rc = getRoleConfig();
  if (rc.admins && rc.admins.indexOf(email) >= 0) return 'admin';
  if (rc.coordinators && rc.coordinators[email] && rc.coordinators[email].active !== false) return 'coordinator';
  return 'coordinator'; // default: coordinator (safer than viewer)
}

function isAdmin() { return currentUserRole === 'admin'; }
function isCoordinator() { return currentUserRole === 'coordinator'; }
function canEdit() { return currentUserRole === 'admin' || currentUserRole === 'coordinator'; }

function renderIfAdmin(value, fallback) {
  return isAdmin() ? value : (fallback !== undefined ? fallback : '—');
}

function applyRoleUI() {
  var admin = isAdmin();
  var coord = isCoordinator();

  // Role badge
  var badge = document.getElementById('role-badge');
  if (badge) {
    badge.style.display = '';
    if (admin) { badge.textContent = 'ADMIN'; badge.className = 'role-badge role-admin'; }
    else if (coord) { badge.textContent = 'COORD'; badge.className = 'role-badge role-coordinator'; }
    else { badge.textContent = 'VIEWER'; badge.className = 'role-badge role-viewer'; }
  }

  // Tabs: hide Hired and Analytics for coordinators
  var hiredTab = document.getElementById('tab-btn-hired');
  if (hiredTab) hiredTab.style.display = admin ? '' : 'none';
  var atBtn = document.getElementById('tab-btn-analytics');
  if (atBtn) atBtn.classList.toggle('hidden', !admin);

  // Top stats bar: hidden for coordinators
  var statsBar = document.getElementById('stats-bar');
  if (statsBar) statsBar.style.display = admin ? '' : 'none';

  // Header action buttons: admin-only
  var syncBtn = document.getElementById('sync-btn');
  if (syncBtn) syncBtn.style.display = admin ? 'flex' : 'none';
  var apiBtn = document.getElementById('api-key-btn');
  if (apiBtn) apiBtn.style.display = admin ? '' : 'none';

  // Quick Add: admins and coordinators (intake task)
  var qaBtn = document.getElementById('quick-add-btn');
  if (qaBtn) qaBtn.style.display = (admin || coord) ? '' : 'none';
}

window._onUserRoleReady = function(email, uidRole) {
  currentUserEmail = email;
  if (uidRole === 'admin' || uidRole === 'coordinator') {
    _uidRole = uidRole;
  } else {
    _uidRole = null;
  }
  currentUserRole = getUserRole(email);
  applyRoleUI();
  // Start guided tour for first-time coordinators
  if (typeof checkAndStartTour === 'function') checkAndStartTour();
};

async function loadFirebaseRoleConfig() {
  if (typeof window._fbSdkGet !== 'function') return;
  try {
    var data = await window._fbSdkGet();
    if (!data || !data.config || !data.config.roles) return;
    _mergedRoleConfig = {
      admins: data.config.roles.admins || ROLE_CONFIG.admins,
      coordinators: Object.assign({}, ROLE_CONFIG.coordinators, _coordsFromFb(data.config.roles.coordinators))
    };
    if (currentUserEmail) { currentUserRole = getUserRole(currentUserEmail); applyRoleUI(); }
  } catch(e) {
    console.warn('Role config load failed:', e.message);
  }
}

// Firebase keys cannot contain . # $ / [ ] — email addresses have dots.
// Transform at the Firebase boundary only; in-memory structure stays email-keyed.
function _coordsForFb(coordinators) {
  var out = {};
  Object.entries(coordinators || {}).forEach(function(e) {
    var email = e[0], coord = e[1];
    // Replace all invalid Firebase key chars; @ is allowed, only . is common in emails
    var key = 'c_' + email.replace(/[.#$[\]\/]/g, '_');
    out[key] = Object.assign({}, coord, { email: email });
  });
  return out;
}

function _coordsFromFb(fbCoords) {
  var out = {};
  Object.values(fbCoords || {}).forEach(function(coord) {
    if (coord && coord.email) {
      out[coord.email] = { name: coord.name, commissionRate: coord.commissionRate, active: coord.active };
    }
  });
  return out;
}

async function saveFirebaseRoleConfig() {
  if (typeof window._fbSdkSet !== 'function') {
    console.error('[saveFirebaseRoleConfig] _fbSdkSet not available');
    showToast('Firebase SDK not ready.', 'red');
    return;
  }
  try {
    console.log('[saveFirebaseRoleConfig] Writing to jobsearchph/config/roles');
    var _rc = getRoleConfig();
    var _payload = { admins: _rc.admins, coordinators: _coordsForFb(_rc.coordinators) };
    var ok = await window._fbSdkSet('config/roles', _payload);
    if (!ok) console.error('[saveFirebaseRoleConfig] Write returned false');
  } catch(e) {
    console.error('[saveFirebaseRoleConfig] Write threw:', e);
    showToast('Save failed: ' + e.message, 'red');
  }
}

// ─── COORDINATOR ATTRIBUTION ───
function getCoordinatorEmail(joId) {
  try { return localStorage.getItem('jo_coordinator_' + joId) || ''; } catch(e) { return ''; }
}

function getCoordinatorName(email) {
  if (!email) return '';
  var rc = getRoleConfig();
  var coord = rc.coordinators && rc.coordinators[email];
  return coord ? coord.name : email.split('@')[0];
}

function setCoordinatorForJO(joId, email) {
  localStorage.setItem('jo_coordinator_' + joId, email);
  fbSync('jo_coordinators/' + joId, email);
}

// ─── COMMISSION ───
function formatPeso(amount) {
  if (isNaN(amount) || amount === null || amount === undefined) return '—';
  return '₱' + Math.round(amount).toLocaleString('en-PH');
}

function computeAndSaveCommission(pid, joId) {
  var coordEmail = getCoordinatorEmail(joId);
  if (!coordEmail) return;
  var rc = getRoleConfig();
  var coord = rc.coordinators && rc.coordinators[coordEmail];
  if (!coord) return;
  var rate = coord.commissionRate || 0;
  var jo = jobOrders.find(function(j) { return j.id === joId; });
  var baseFee = 0;
  if (jo) {
    var rawFee = (jo.feeAmount || '').replace(/[^0-9.]/g, '');
    baseFee = parseFloat(rawFee) || 0;
  }
  if (!baseFee) {
    // Try from hire_data feeAmount
    var hd = {};
    try { hd = JSON.parse(localStorage.getItem('hire_data_' + pid) || '{}'); } catch(e) {}
    var rawFee2 = (hd.feeAmount || '').replace(/[^0-9.]/g, '');
    baseFee = parseFloat(rawFee2) || 0;
  }
  var amount = Math.round(baseFee * rate);
  var commissionRecord = { coordinatorEmail: coordEmail, rate: rate, baseFee: baseFee, amount: amount, computedAt: new Date().toISOString() };
  var key = 'hire_data_' + pid;
  var hireData = {};
  try { hireData = JSON.parse(localStorage.getItem(key) || '{}'); } catch(e) {}
  hireData.commission = commissionRecord;
  localStorage.setItem(key, JSON.stringify(hireData));
  fbSyncDebounced('hire_data/' + pid, hireData);
  fbSync('commissions/' + pid, commissionRecord);
}

// ═══════════════════════════════════════════════
// CONFIG
// ═══════════════════════════════════════════════
// API Key — loaded from localStorage, never hardcoded in file
let ANTHROPIC_API_KEY = localStorage.getItem('anthropic_api_key') || '';

function getApiKey() {
  return localStorage.getItem('anthropic_api_key') || '';
}

function promptApiKey() {
  const existing = localStorage.getItem('anthropic_api_key') || '';
  const key = prompt(
    existing
      ? 'Update your Anthropic API key (leave blank to keep current):'
      : 'Enter your Anthropic API key to use AI Matcher:\n(Starts with sk-ant-...)',
    ''
  );
  if (key && key.trim().startsWith('sk-ant-')) {
    localStorage.setItem('anthropic_api_key', key.trim());
    ANTHROPIC_API_KEY = key.trim();
    showToast('API key saved to this browser', 'green');
  } else if (key && key.trim()) {
    alert('That doesn\'t look like a valid Anthropic key. It should start with sk-ant-');
  }
}

const SHEET_CANDIDATES = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSxIFw8KDwhsz4Xw55Z3-GUb9yoyEBpnhKHovv2YYQEMxBqh0E4fRCDqCvHi3a6MrmWjaN0_e2KnGx2/pub?gid=1026175595&single=true&output=csv";
const SHEET_JOB_REQUESTS = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSxIFw8KDwhsz4Xw55Z3-GUb9yoyEBpnhKHovv2YYQEMxBqh0E4fRCDqCvHi3a6MrmWjaN0_e2KnGx2/pub?gid=865983128&single=true&output=csv";
const SHEET_PLACEMENTS = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSxIFw8KDwhsz4Xw55Z3-GUb9yoyEBpnhKHovv2YYQEMxBqh0E4fRCDqCvHi3a6MrmWjaN0_e2KnGx2/pub?gid=576481838&single=true&output=csv";

// ═══════════════════════════════════════════════
// STATE
// ═══════════════════════════════════════════════
let candidates = [];
let jobOrders = [];
let placements = [];
let blacklist = {};
let flaggedCands = {};
let manualPlacements = [];
let _hiddenDuplicates = [];   // candidate IDs skipped as duplicates
let _hiddenUnderage   = [];   // candidate IDs skipped as underage
let _dupPairs         = [];   // [{hiddenCand, keptId, matchType}] for cleanup modal
let _underageCands    = [];   // full candidate objects for cleanup modal
let candidateNotes = {};
let joStatusOverrides = {};   // { joId: 'Active'|'On Hold'|'Cancelled'|'Fulfilled' }
let candidateRatings = {};    // { candId: { rating, docs, notes } }
// Mid-call edits captured from the ERA call modal. Override layer: any field
// here takes precedence over the same field on the Sheet-sourced candidate.
// Keys: candId → { skills, pastJobs, expectedPay, startDate, civilStatus }.
// MUST NOT be touched by the 120 s Sheets poll — only by call-modal saves
// and Firebase listener echoes. Merge is applied at the parser chokepoint
// so every display site sees the override automatically.
let candidateOverrides = {};

// ═══════════════════════════════════════════════
// LOCAL STORAGE
// ═══════════════════════════════════════════════
function loadLocal() {
  try { blacklist = JSON.parse(localStorage.getItem('blacklist') || '{}'); } catch(e){ blacklist={}; }
  try { flaggedCands = JSON.parse(localStorage.getItem('flagged_cands') || '{}'); } catch(e){ flaggedCands={}; }
  try { manualPlacements = JSON.parse(localStorage.getItem('manual_placements') || '[]'); } catch(e){ manualPlacements=[]; }
  try { candidateNotes = JSON.parse(localStorage.getItem('candidate_notes') || '{}'); } catch(e){ candidateNotes={}; }
  try { joStatusOverrides = JSON.parse(localStorage.getItem('jo_status_overrides') || '{}'); } catch(e){ joStatusOverrides={}; }
  try { candidateRatings = JSON.parse(localStorage.getItem('candidate_ratings') || '{}'); } catch(e){ candidateRatings={}; }
  try { candidateOverrides = JSON.parse(localStorage.getItem('candidate_overrides') || '{}'); } catch(e){ candidateOverrides={}; }
  try { eraContactLogs = JSON.parse(localStorage.getItem('era_contact_logs') || '{}'); } catch(e){ eraContactLogs={}; }
  try { callQueue = JSON.parse(localStorage.getItem('call_queue') || '{}'); } catch(e){ callQueue={}; }
}

// ═══════════════════════════════════════════════
// JOB ORDER LIFECYCLE EVENTS
// ═══════════════════════════════════════════════
function getJobOrderEvents(joId) {
  try { return JSON.parse(localStorage.getItem('jo_events_' + joId) || '[]'); } catch(e) { return []; }
}

function saveJobOrderEvents(joId, events) {
  localStorage.setItem('jo_events_' + joId, JSON.stringify(events));
  fbSync('jo_events/' + joId, events);
}

function addJobOrderEvent(joId, event) {
  var events = getJobOrderEvents(joId);
  events.push(event);
  saveJobOrderEvents(joId, events);
  return events;
}

// Single source of truth for days open — respects reopen cycles
function getDaysOpen(jo) {
  if (!jo) return 0;
  var events = getJobOrderEvents(jo.id);
  var resetTypes = ['created', 'reopened', 'resumed'];
  var resetEvents = events.filter(function(e) { return resetTypes.indexOf(e.type) >= 0; });
  if (resetEvents.length > 0) {
    resetEvents.sort(function(a, b) { return new Date(b.date) - new Date(a.date); });
    var d = parseDateFlex(resetEvents[0].date);
    if (d && !isNaN(d)) return Math.floor((Date.now() - d.getTime()) / 86400000);
  }
  // Fallback: use original creation date (timestamp field)
  if (jo.timestamp) {
    var dt = parseDateFlex(jo.timestamp);
    if (dt && !isNaN(dt)) return Math.floor((Date.now() - dt.getTime()) / 86400000);
  }
  return 0;
}

// Returns the start-of-current-cycle ISO date string (for filtering current-cycle candidates)
function getLastCycleStartDate(joId) {
  var events = getJobOrderEvents(joId);
  var resetTypes = ['created', 'reopened', 'resumed'];
  var resets = events.filter(function(e) { return resetTypes.indexOf(e.type) >= 0; });
  if (!resets.length) return null;
  resets.sort(function(a, b) { return new Date(b.date) - new Date(a.date); });
  return resets[0].date;
}

// Count how many times this JO has been reopened
function getReopenCount(joId) {
  var events = getJobOrderEvents(joId);
  return events.filter(function(e) { return e.type === 'reopened'; }).length;
}

// One-time migration: seed created events for JOs that have none
function migrateJobOrderEvents() {
  var flagKey = 'jo_events_migrated_v1';
  if (localStorage.getItem(flagKey)) return;
  var migrated = 0;
  jobOrders.forEach(function(jo) {
    var existing = getJobOrderEvents(jo.id);
    if (existing.length > 0) return; // already has events
    var events = [];
    var createdDate = jo.timestamp
      ? (parseDateFlex(jo.timestamp) ? new Date(parseDateFlex(jo.timestamp)).toISOString().split('T')[0] : new Date().toISOString().split('T')[0])
      : new Date().toISOString().split('T')[0];
    events.push({ type: 'created', date: createdDate, migrated: true });
    var status = joStatusOverrides[jo.id] || jo.sheetStatus || 'Active';
    if (status === 'Fulfilled') events.push({ type: 'fulfilled', date: createdDate, note: 'Migrated from existing data', migrated: true });
    if (status === 'Cancelled') {
      var cx = {}; try { cx = JSON.parse(localStorage.getItem('jo_cancellation_' + jo.id) || '{}'); } catch(e) {}
      var cancelDate = cx.cancelledAt ? cx.cancelledAt.split('T')[0] : createdDate;
      events.push({ type: 'cancelled', date: cancelDate, reason: cx.reason || '', migrated: true });
    }
    saveJobOrderEvents(jo.id, events);
    migrated++;
  });
  localStorage.setItem(flagKey, '1');
  if (migrated > 0 && isAdmin()) {
    showToast(migrated + ' job orders migrated to lifecycle tracking', 'green');
  }
}

function openReopenModal(joId) {
  if (!isAdmin()) return;
  var jo = jobOrders.find(function(j) { return j.id === joId; });
  if (!jo) return;
  document.getElementById('reopen-jo-hidden-id').value = joId;
  document.getElementById('reopen-jo-subtitle').textContent = joId + ' — ' + (jo.position || '') + (jo.company ? ' · ' + jo.company : '');
  var prevStatus = joStatusOverrides[joId] || jo.sheetStatus || jo.status || 'Unknown';
  document.getElementById('reopen-prev-status').textContent = prevStatus;
  document.getElementById('reopen-reason-select').value = '';
  document.getElementById('reopen-notes-input').value = '';
  document.getElementById('reopen-confirm-btn').disabled = true;
  // Populate handler select
  var hSel = document.getElementById('reopen-handler-select');
  while (hSel.options.length > 1) hSel.remove(1);
  var rc = getRoleConfig();
  Object.entries(rc.coordinators || {}).forEach(function(e) {
    var opt = document.createElement('option');
    opt.value = e[0];
    opt.textContent = e[1].name || e[0];
    if (getCoordinatorEmail(joId) === e[0]) opt.selected = true;
    hSel.appendChild(opt);
  });
  openModal('modal-reopen-jo');
}

function confirmReopenJO() {
  var joId = document.getElementById('reopen-jo-hidden-id').value;
  var reason = document.getElementById('reopen-reason-select').value;
  if (!reason) { showToast('Please select a reopen reason.', 'red'); return; }
  var notes = (document.getElementById('reopen-notes-input').value || '').trim();
  var newHandler = document.getElementById('reopen-handler-select').value;
  var today = new Date().toISOString().split('T')[0];

  // Add reopened event
  addJobOrderEvent(joId, { type: 'reopened', date: today, reason: reason, notes: notes, reopenedBy: currentUserEmail });

  // Update coordinator if changed
  if (newHandler) setCoordinatorForJO(joId, newHandler);

  // Change status to Active and clear any pending delayed close
  joStatusOverrides[joId] = 'Active';
  saveJOStatusOverrides();
  localStorage.removeItem('jo_delayed_close_' + joId);
  fbSync('jo_delayed_close/' + joId, null);
  var jo = jobOrders.find(function(j) { return j.id === joId; });
  if (jo) jo.status = 'Active';

  closeModal('modal-reopen-jo');
  renderJobOrders([...placements, ...manualPlacements]);
  updateStats();
  buildReminderBanner();
  showToast('Job order ' + joId + ' reopened — ' + reason, 'green');
}

function _lsSet(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); }
  catch(e) { if (e.name === 'QuotaExceededError') showToast('Storage full — clear old data', 'red'); else console.error('localStorage write failed:', key, e.message); }
}
function saveBlacklist() { _lsSet('blacklist', blacklist); fbSync('blacklist', blacklist); }
function saveFlaggedCands() { _lsSet('flagged_cands', flaggedCands); fbSync('flagged_cands', flaggedCands); }
function saveManualPlacements() { _lsSet('manual_placements', manualPlacements); fbSync('manual_placements', manualPlacements); }
function saveCandidateNotes() { _lsSet('candidate_notes', candidateNotes); fbSync('candidate_notes', candidateNotes); }
function saveJOStatusOverrides() { _lsSet('jo_status_overrides', joStatusOverrides); fbSync('jo_status_overrides', joStatusOverrides); }
function saveCandidateRatings() { _lsSet('candidate_ratings', candidateRatings); fbSyncDebounced('candidate_ratings', candidateRatings); }
// Save mid-call candidate edits. IMMEDIATE fbSync (not debounced) because
// the coordinator expects the cross-device sync to land within seconds of
// hitting Save, and the write is rare (once per call) — debouncing buys nothing.
function saveCandidateOverrides() { _lsSet('candidate_overrides', candidateOverrides); fbSync('candidate_overrides', candidateOverrides); }

// Inline-save helper for the profile-modal Personal Info grid. Writes one
// field into candidateOverrides[candId] and re-merges the in-memory candidate
// so other open surfaces see the change. When hasKids flips to anything other
// than 'Yes', numKids is cleared in the same write to prevent stale orphans.
function saveCandPersonalField(candId, field, value) {
  if (!candidateOverrides[candId]) candidateOverrides[candId] = {};
  candidateOverrides[candId][field] = value;
  if (field === 'hasKids' && value !== 'Yes') {
    candidateOverrides[candId].numKids = '';
  }
  saveCandidateOverrides();
  const ci = candidates.findIndex(function(x) { return x.id === candId; });
  if (ci >= 0) candidates[ci] = _applyCandOverride(candidates[ci]);
  const modal = document.getElementById('modal-cand-profile');
  if (modal && modal.classList.contains('open')) openCandModal(candId);
}
// Merge override-over-base for the five editable fields. Empty-string overrides
// are persisted deliberately (the coordinator cleared a wrong value). Derived
// experienceFlag is recomputed from the overridden pastJobs.
function _applyCandOverride(c) {
  const ov = candidateOverrides[c.id];
  if (!ov) return c;
  const out = Object.assign({}, c);
  const has = function(k) { return ov[k] !== undefined && ov[k] !== null; };
  if (has('skills'))      out.skills      = ov.skills;
  if (has('pastJobs'))    { out.pastJobs  = ov.pastJobs; out.experienceFlag = (ov.pastJobs.length > 10 ? 'yes' : 'no'); }
  if (has('expectedPay')) out.expectedPay = ov.expectedPay;
  if (has('startDate'))   out.startDate   = ov.startDate;
  if (has('civilStatus')) out.civilStatus = ov.civilStatus;
  if (has('hasKids'))     out.hasKids     = ov.hasKids;
  if (has('numKids'))     out.numKids     = ov.numKids;
  return out;
}

// ═══════════════════════════════════════════════
// CSV PARSER
// ═══════════════════════════════════════════════
function parseCSV(text) {
  // Character-by-character parser — handles newlines INSIDE quoted fields.
  // Pre-splitting by \n loses the inQ state across lines, causing row
  // misalignment when candidates enter multi-line Skills / Experience text.
  const rows = [];
  let cols = [];
  let cur  = '';
  let inQ  = false;
  // Normalize line endings so we only deal with \n
  const t = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n').trimEnd();
  for (let i = 0; i < t.length; i++) {
    const ch = t[i];
    if (ch === '"') {
      if (!inQ) {
        inQ = true;
      } else if (t[i + 1] === '"') {   // escaped quote ""
        cur += '"'; i++;
      } else {
        inQ = false;
      }
    } else if (ch === ',' && !inQ) {
      cols.push(cur.trim()); cur = '';
    } else if (ch === '\n' && !inQ) {  // real row boundary
      cols.push(cur.trim());
      if (cols.some(function(c) { return c !== ''; })) rows.push(cols);
      cols = []; cur = '';
    } else {
      cur += ch;
    }
  }
  // Flush the final field / row
  cols.push(cur.trim());
  if (cols.some(function(c) { return c !== ''; })) rows.push(cols);
  return rows;
}

async function fetchCSV(url) {
  const cacheBuster = `&t=${Date.now()}`;
  const resp = await fetch(url + cacheBuster);
  if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
  return parseCSV(await resp.text());
}

// ═══════════════════════════════════════════════
// DATA LOAD
// ═══════════════════════════════════════════════
function repairShiftedPlacements() {
  // NOTE: This used to be flag-gated by 'placements_shift_repaired_v2' so it
  // ran exactly once per browser. That broke as soon as any further row
  // deletions happened in the source sheet — IDs shifted again, but the
  // flag prevented a second repair, leaving placements pointing at the
  // wrong candidate (e.g. Zennia C450 → opens Dona). The repair is
  // idempotent (only acts when name→id no longer matches), so it's safe
  // to run on every load.

  // Build name→id AND phone→id lookups from current candidates sheet.
  // Phone is the more reliable key when two candidates share a name;
  // name is the fallback when phone is missing on the placement.
  const nameToId = {};
  const phoneToId = {};
  const normPhone = p => (p || '').replace(/\D/g, '').slice(-10);
  candidates.forEach(c => {
    if (c.name) nameToId[c.name.trim().toLowerCase()] = c.id;
    const ph = normPhone(c.phone);
    if (ph.length >= 7) phoneToId[ph] = c.id;
  });

  // 1. Fix manual placements
  let placementsChanged = false;
  const idRemapping = {};
  manualPlacements.forEach(p => {
    if (!p.candidateName && !p.candidatePhone) return;
    // Prefer phone match (stable across renames); fall back to name.
    const ph = normPhone(p.candidatePhone);
    let correctId = (ph.length >= 7 && phoneToId[ph]) || null;
    if (!correctId && p.candidateName) {
      correctId = nameToId[p.candidateName.trim().toLowerCase()] || null;
    }
    if (correctId && correctId !== p.candidateId) {
      console.log(`Repairing placement: ${p.candidateName || '(no name)'} — ${p.candidateId} → ${correctId}`);
      idRemapping[p.candidateId] = correctId;
      p.candidateId = correctId;
      placementsChanged = true;
    }
  });
  if (placementsChanged) saveManualPlacements();

  // 2. Migrate ALL candidate-keyed data from wrong IDs to correct IDs.
  //
  // SAFETY RULES (read before changing this):
  //  - Move only when target is empty / missing. Never overwrite an existing
  //    value at the destination, because after an ID shift the OLD slot
  //    might already be occupied by a DIFFERENT candidate's new data (e.g.
  //    Zennia was C450, deletions happened, now Dona is C450; if Dona has
  //    entered any data since the shift it must not be clobbered by
  //    Zennia's old data being moved over to C449).
  //  - Track per-store stats so the toast tells the user exactly what moved.
  //  - This list MUST stay in sync with every candidate-keyed store. Audit
  //    by grepping: candidateOverrides[, candidateRatings[, blacklist[,
  //    flaggedCands[, candidateNotes[, eraContactLogs[, callQueue[,
  //    and any 'foo_' + candId localStorage pattern.
  const migrationStats = {};
  const _bump = (label) => { migrationStats[label] = (migrationStats[label] || 0) + 1; };

  // Helper: move obj[wrong] → obj[correct] if correct is empty. Returns true if moved.
  const _moveObjKey = (obj, wrong, correct, label, saveFn) => {
    if (!obj[wrong]) return false;
    const tgt = obj[correct];
    const tgtEmpty = !tgt || (typeof tgt === 'object' && Object.keys(tgt).length === 0);
    if (!tgtEmpty) {
      console.warn(`[id-repair] ${label}: ${wrong} → ${correct} BLOCKED (target already has data; left as-is to avoid clobbering)`);
      return false;
    }
    obj[correct] = obj[wrong];
    delete obj[wrong];
    if (saveFn) saveFn();
    _bump(label);
    return true;
  };

  // Helper: move localStorage 'prefix_<wrong>' → 'prefix_<correct>' if dest empty.
  const _moveLsKey = (prefix, wrong, correct, label, fbPath) => {
    const srcKey = prefix + wrong;
    const dstKey = prefix + correct;
    const src = localStorage.getItem(srcKey);
    if (src === null) return false;
    if (localStorage.getItem(dstKey) !== null) {
      console.warn(`[id-repair] ${label}: ${srcKey} → ${dstKey} BLOCKED (destination already exists)`);
      return false;
    }
    localStorage.setItem(dstKey, src);
    localStorage.removeItem(srcKey);
    if (fbPath) { try { fbSync(fbPath + correct, JSON.parse(src)); } catch(_) {} }
    _bump(label);
    return true;
  };

  Object.entries(idRemapping).forEach(([wrongId, correctId]) => {
    console.log(`[id-repair] migrating ${wrongId} → ${correctId}`);

    // In-memory objects keyed directly by candidateId
    _moveObjKey(candidateRatings,   wrongId, correctId, 'candidateRatings',   saveCandidateRatings);
    _moveObjKey(candidateOverrides, wrongId, correctId, 'candidateOverrides', saveCandidateOverrides);  // ← was missing (caused HAS KIDS data loss)
    _moveObjKey(blacklist,          wrongId, correctId, 'blacklist',          saveBlacklist);            // ← was missing
    _moveObjKey(flaggedCands,       wrongId, correctId, 'flaggedCands',       saveFlaggedCands);
    _moveObjKey(eraContactLogs,     wrongId, correctId, 'eraContactLogs',     saveEraContactLogs);

    // localStorage keys with prefix + candidateId
    _moveLsKey('cand_notes_', wrongId, correctId, 'cand_notes', 'cand_notes/');
    // prow_extra_ and hire_data_ use placementId, which is "joId_candId_idx".
    // We rewrite any key whose embedded candId matches the wrong one.
    ['prow_extra_', 'hire_data_'].forEach(prefix => {
      Object.keys(localStorage).forEach(key => {
        if (!key.startsWith(prefix)) return;
        // Match _<wrongId> bounded by _ or end-of-string so 'C45' doesn't match 'C459'
        const re = new RegExp('(^|_)' + wrongId + '(_|$)');
        if (!re.test(key.slice(prefix.length))) return;
        const newKey = prefix + key.slice(prefix.length).replace(re, (m, a, b) => a + correctId + b);
        if (localStorage.getItem(newKey) !== null) {
          console.warn(`[id-repair] ${prefix}: ${key} → ${newKey} BLOCKED (destination exists)`);
          return;
        }
        localStorage.setItem(newKey, localStorage.getItem(key));
        localStorage.removeItem(key);
        _bump(prefix.replace(/_$/, ''));
      });
    });

    // Composite-key stores: candidateNotes is keyed "joId_candId"
    Object.keys(candidateNotes).forEach(k => {
      const parts = k.split('_');
      // Last segment is candId in current usage; rebuild if it matches
      if (parts[parts.length - 1] !== wrongId) return;
      const newK = parts.slice(0, -1).concat(correctId).join('_');
      if (candidateNotes[newK] !== undefined) {
        console.warn(`[id-repair] candidateNotes: ${k} → ${newK} BLOCKED (exists)`);
        return;
      }
      candidateNotes[newK] = candidateNotes[k];
      delete candidateNotes[k];
      _bump('candidateNotes');
    });
    if (migrationStats.candidateNotes) saveCandidateNotes();

    // Composite-key store: callQueue is keyed "candId|joId" (post-migrate format)
    Object.keys(callQueue).forEach(k => {
      const v = callQueue[k];
      if (!v || v.candId !== wrongId) return;
      v.candId = correctId;
      const newK = (typeof _qKey === 'function') ? _qKey(correctId, v.joId || '') : (correctId + '|' + (v.joId || ''));
      if (newK !== k) {
        if (callQueue[newK]) {
          console.warn(`[id-repair] callQueue: ${k} → ${newK} BLOCKED (exists)`);
          return;
        }
        callQueue[newK] = v;
        delete callQueue[k];
      }
      _bump('callQueue');
    });
    if (migrationStats.callQueue && typeof saveCallQueue === 'function') saveCallQueue();
  });

  if (Object.keys(idRemapping).length > 0) {
    fbSync('candidate_ratings', candidateRatings);
    const detail = Object.entries(migrationStats).map(([k,v]) => `${k}:${v}`).join(', ') || '(no data moved)';
    console.log(`[id-repair] summary — ${detail}`);
    showToast(`Repaired ${Object.keys(idRemapping).length} candidate ID(s) · ${detail}`, 'green');
  }

  // ── ORPHAN SCAN ──
  // Detect candidate-keyed data attached to IDs that no longer exist in the
  // candidates array (left over from previous shifts where the old repair
  // didn't cover that store, e.g. candidateOverrides missing Zennia's HAS KIDS).
  // We do NOT auto-recover (we can't know who the data SHOULD belong to without
  // metadata). We log loudly so you can decide.
  try {
    const validIds = new Set(candidates.map(c => c.id));
    const orphans = { candidateOverrides: [], candidateRatings: [], blacklist: [], flaggedCands: [] };
    Object.keys(candidateOverrides || {}).forEach(k => { if (!validIds.has(k)) orphans.candidateOverrides.push(k); });
    Object.keys(candidateRatings   || {}).forEach(k => { if (!validIds.has(k)) orphans.candidateRatings.push(k); });
    Object.keys(blacklist          || {}).forEach(k => { if (!validIds.has(k)) orphans.blacklist.push(k); });
    Object.keys(flaggedCands       || {}).forEach(k => { if (!validIds.has(k)) orphans.flaggedCands.push(k); });
    const total = Object.values(orphans).reduce((a, b) => a + b.length, 0);
    if (total > 0) {
      console.group(`%c⚠ Orphaned candidate data: ${total} key(s)`, 'color:#d97706;font-weight:700');
      Object.entries(orphans).forEach(([store, keys]) => {
        if (!keys.length) return;
        console.log(`${store}: ${keys.join(', ')}`);
        if (store === 'candidateOverrides') {
          keys.forEach(k => console.log(`  ${k} →`, candidateOverrides[k]));
        }
      });
      console.log('Run recoverOrphanOverride("<oldId>", "<newCandidateName>") to re-attach.');
      console.groupEnd();
    }
  } catch (e) { console.warn('[id-repair] orphan scan failed:', e); }
}

// Expose a console helper for manual orphan recovery. Call from devtools:
//   recoverOrphanOverride('C450', 'Zennia Anfone')
// Looks up the candidate by name, then moves candidateOverrides[oldId] → that
// candidate's current id, only if the destination is empty.
window.recoverOrphanOverride = function(oldId, candidateName) {
  const target = candidates.find(c =>
    c.name && c.name.trim().toLowerCase() === (candidateName || '').trim().toLowerCase()
  );
  if (!target) {
    console.error(`No candidate found with name "${candidateName}"`);
    return false;
  }
  const src = candidateOverrides[oldId];
  if (!src) {
    console.error(`No orphan data at candidateOverrides["${oldId}"]`);
    return false;
  }
  const dst = candidateOverrides[target.id];
  if (dst && Object.keys(dst).length > 0) {
    console.error(`candidateOverrides["${target.id}"] is not empty — refusing to overwrite. Inspect manually:`, dst);
    return false;
  }
  candidateOverrides[target.id] = src;
  delete candidateOverrides[oldId];
  saveCandidateOverrides();
  // Re-merge into in-memory candidate so the UI picks it up without reload.
  if (typeof _applyCandOverride === 'function') {
    const idx = candidates.findIndex(c => c.id === target.id);
    if (idx >= 0) candidates[idx] = _applyCandOverride(candidates[idx]);
  }
  console.log(`✓ Recovered ${Object.keys(src).length} field(s) from ${oldId} → ${target.id} (${candidateName})`, src);
  if (typeof renderCandidates === 'function') try { renderCandidates(); } catch(_) {}
  return true;
};

async function loadAll(opts) {
  loadLocal();
  _migrateCallQueue();
  // NOTE: repairShiftedPlacements() used to be called here, but `candidates` is
  // empty until fetchCSV completes below, so the repair found no name→id
  // mappings and silently no-op'd. It's now invoked after candidates parse
  // (search for "POST-LOAD ID REPAIR" below).
  // Apply role from already-set email (may have been set by onAuthStateChanged before loadAll)
  if (window._currentUserEmail) {
    currentUserEmail = window._currentUserEmail;
    currentUserRole  = getUserRole(currentUserEmail);
    applyRoleUI();
  }

  // Spinners only on real loads — never on quiet polls. The 120s _pollSheets
  // path passes opts.skipRenderIfUnchanged=true and may short-circuit at the
  // same-snapshot check below; if we set the spinner unconditionally here and
  // then return early without re-rendering, the spinner is left up forever.
  if (!opts || !opts.skipRenderIfUnchanged) {
    document.getElementById('jo-container').innerHTML = loadingHTML('Loading job orders…');
    document.getElementById('cand-container').innerHTML = loadingHTML('Loading candidates…');
  }

  const results = await Promise.allSettled([
    fetchCSV(SHEET_CANDIDATES),
    fetchCSV(SHEET_JOB_REQUESTS),
    Promise.resolve([])
  ]);

  // CANDIDATES (Row 1 = title "JOB SEEKERS", Row 2 = headers, data from Row 3)
  // Actual columns: A=ID, B=Timestamp, C=Full Name, D=Facebook Name, E=Age, F=Contact, G=Email,
  // H=Job Type (Preferred), I=Skills/Qualifications, J=Preferred Location, K=Expected Pay,
  // L=Gender, M=Past Jobs, N=Resume Link, O=Civil Status, P=When can start, Q=Consent,
  // R=Set-up (stay-in/out), S=Internal Notes
  // NOTE: r[16] (Consent) is still read into c.status for back-compat with
  // getEffectiveVerified — the literal "Verified" check there falls through to
  // isAutoVerified when status is anything else, so consent text in this slot
  // is functionally harmless. The "Status" column the old form had no longer
  // exists in the sheet.
  if (results[0].status === 'fulfilled') {
    const rows = results[0].value;
    // Find the first row where col A looks like a candidate ID (e.g. C001, C002...)
    let dataStart = 1;
    for (let i = 0; i < rows.length; i++) {
      if (rows[i][0] && /^C\d+$/i.test(rows[i][0].trim())) { dataStart = i; break; }
    }
    // Location normalization map
    const normLoc = loc => {
      if (!loc) return '';
      const l = loc.trim().toLowerCase();
      if (l.includes('bacolod')) return 'Bacolod City';
      if (l.includes('talisay')) return 'Talisay City';
      if (l.includes('silay')) return 'Silay City';
      if (l.includes('bago')) return 'Bago City';
      if (l.includes('victorias')) return 'Victorias City';
      if (l.includes('la carlota')) return 'La Carlota City';
      if (l.includes('kabankalan')) return 'Kabankalan City';
      if (l.includes('escalante')) return 'Escalante City';
      if (l.includes('sagay')) return 'Sagay City';
      if (l.includes('cadiz')) return 'Cadiz City';
      if (l.includes('himamaylan')) return 'Himamaylan City';
      if (l.includes('dumaguete')) return 'Dumaguete City';
      if (l.includes('iloilo')) return 'Iloilo City';
      if (l.includes('cebu')) return 'Cebu City';
      if (l.includes('manila') || l.includes('metro')) return 'Metro Manila';
      // Location cleanup: case + variant merges
      if (l.includes('anywhere') || l === 'anywhere po') return 'Anywhere in Negros Occidental';
      if (l.includes('within negros')) return 'Within Negros';
      if (l.includes('murcia')) return 'Murcia';
      return loc.trim().split(',')[0].trim();
    };

    // Shared job-type normalizer (applied after splitting by comma)
    const normJobTypeValue = val => {
      if (!val) return '';
      const v = val.trim();
      const vl = v.toLowerCase();
      // Drop preference qualifiers that are not job types
      if (vl.startsWith('if may') || vl.startsWith('kung may') || vl.includes('overtime ok')) return '';
      // Employment-type detection
      const hasFull = vl.includes('full time') || vl.includes('fulltime') || vl === 'ft';
      const hasPart = vl.includes('part time') || vl.includes('partime') || vl === 'pt';
      const hasAny  = vl === 'any' || vl === 'kahit ano' || vl.includes('kahit ano') || vl.includes('any type') || vl.includes('both');
      if (hasAny || (hasFull && hasPart)) return 'Any / Open';
      if (hasFull) return 'Full Time';
      if (hasPart) return 'Part Time';
      // Role merges
      if (vl === 'housekeeping' || vl === 'sulod balay') return 'Housekeeper / Household Helper';
      if (vl.includes('housekeeper') || vl.includes('household helper')) return 'Housekeeper / Household Helper';
      if (vl === 'canteen helper' || vl.includes('canteen')) return 'Cook / Kitchen Staff';
      if (vl === 'kitchen staff' || vl.includes('cook') || vl.includes('kitchen')) return 'Cook / Kitchen Staff';
      if (vl === 'sales lady' || vl === 'saleslady' || vl.includes('sales')) return 'Sales Agent / Promodiser';
      return v;
    };

    const normJobTypeValues = jt => {
      if (!jt) return [];
      return [...new Set(
        jt.split(',')
          .map(s => normJobTypeValue(s))
          .map(s => s.trim())
          .filter(Boolean)
      )];
    };

    // Keep a single primary job type for legacy UI paths
    const normJobType = jt => normJobTypeValues(jt)[0] || '';

    // Enhanced normLoc: strip "Anywhere", "Negros Occidental", raw barangays
    const normLocCity = loc => {
      if (!loc) return '';
      const l = loc.trim().toLowerCase();
      if (l === 'anywhere' || l === 'negros occidental' || l === 'neg. occ.' || l === 'neg occ') return '';
      if (l.includes('bacolod')) return 'Bacolod City';
      if (l.includes('talisay')) return 'Talisay City';
      if (l.includes('silay')) return 'Silay City';
      if (l.includes('bago')) return 'Bago City';
      if (l.includes('victorias')) return 'Victorias City';
      if (l.includes('la carlota')) return 'La Carlota City';
      if (l.includes('kabankalan')) return 'Kabankalan City';
      if (l.includes('escalante')) return 'Escalante City';
      if (l.includes('sagay')) return 'Sagay City';
      if (l.includes('cadiz')) return 'Cadiz City';
      if (l.includes('himamaylan')) return 'Himamaylan City';
      if (l.includes('dumaguete')) return 'Dumaguete City';
      if (l.includes('iloilo')) return 'Iloilo City';
      if (l.includes('cebu')) return 'Cebu City';
      if (l.includes('manila') || l.includes('metro')) return 'Metro Manila';
      // If it looks like a barangay (no "City"/"Municipality" keyword), keep first comma part
      const firstPart = loc.trim().split(',')[0].trim();
      return firstPart;
    };

    const normalizeSetup = function(raw) {
      if (!raw) return '';
      const s = raw.toLowerCase();
      if (s.includes('stay-in') || s.includes('live-in') || s.includes('stayin')) return 'Stay-in';
      if (s.includes('stay-out') || s.includes('live-out') || s.includes('stayout')) return 'Stay-out';
      if (s.includes('either') || s.includes('both') || s.includes('open')) return 'Either';
      return raw;
    };

    candidates = rows.slice(dataStart).filter(r => r[0] && /^C\d+$/i.test(r[0].trim())).map(r => {
      const ageRaw = r[4] || '';
      const ageInt = parseInt(ageRaw) || 0;
      const pastJobs = r[12] || '';
      const experienceFlag = pastJobs.length > 10 ? 'yes' : 'no';
      const cityFormatted = normLocCity(r[9] || '');
      const jobTypes = normJobTypeValues(r[7] || '');
      const jobTypeFormatted = jobTypes.join(', ');
      return {
        id: r[0].trim() || '',
        timestamp: r[1] || '',
        name: (r[3] && r[3].trim()) ? r[3].trim() : (r[2] || '').trim(),
        facebook: r[3] || '',
        age: ageRaw,
        ageInt,
        phone: r[5] || '',
        email: r[6] || '',
        jobType: jobTypes[0] || '',
        jobTypes,
        jobTypeFormatted,
        jobTypeRaw: r[7] || '',
        skills: r[8] || '',
        location: normLoc(r[9] || ''),
        cityFormatted,
        locationRaw: r[9] || '',
        expectedPay: r[10] || '',
        gender: r[11] || '',
        pastJobs,
        experienceFlag,
        resumeLink: r[13] || '',
        civilStatus: r[14] || '',
        startDate: r[15] || '',
        status: r[16] || 'Unverified',
        setup: normalizeSetup(r[17] || ''),
        candStatus: 'active', // runtime status: active | interview | hired | blacklisted
      };
    });
    // ── Deduplicate: hide all but the first occurrence of a phone/email ──
    const _seenPhone = new Set();
    const _seenEmail = new Set();
    const _phoneToId = {}, _emailToId = {};
    _hiddenDuplicates = [];
    _dupPairs = [];
    candidates = candidates.filter(function(c) {
      if (candidateRatings[c.id] && candidateRatings[c.id].keepBoth) return true; // whitelisted
      if (candidateRatings[c.id] && candidateRatings[c.id].archived) return false; // archived silently
      const ph = (c.phone || '').replace(/\D/g, '').slice(-10);
      const em = (c.email || '').trim().toLowerCase();
      const dupPhone = ph.length >= 7 && _seenPhone.has(ph);
      const dupEmail = em.includes('@') && _seenEmail.has(em);
      if (dupPhone || dupEmail) {
        _hiddenDuplicates.push(c.id);
        const keptId = dupPhone ? _phoneToId[ph] : _emailToId[em];
        _dupPairs.push({ hiddenCand: c, keptId: keptId || '', matchType: dupPhone ? 'phone' : 'email' });
        return false;
      }
      if (ph.length >= 7) { _seenPhone.add(ph); _phoneToId[ph] = c.id; }
      if (em.includes('@')) { _seenEmail.add(em); _emailToId[em] = c.id; }
      return true;
    });

    // ── Underage: hide candidates below 18 ──
    _hiddenUnderage = [];
    _underageCands = [];
    candidates = candidates.filter(function(c) {
      if (candidateRatings[c.id] && candidateRatings[c.id].archived) return false;
      if (c.ageInt > 0 && c.ageInt < 18) {
        _hiddenUnderage.push(c.id);
        _underageCands.push(c);
        return false;
      }
      return true;
    });

    // ── Apply call-captured overrides (poll-safe merge) ──
    // The 120 s Sheets poll re-runs this whole parser path, so overrides are
    // re-applied to fresh base data on every fetch. candidateOverrides itself
    // is in its own localStorage / Firebase key and is never touched by the poll.
    candidates = candidates.map(_applyCandOverride);

    // ── POST-LOAD ID REPAIR ──
    // Runs every load (idempotent). Re-points any placement whose stored
    // candidateId no longer matches the candidate by name/phone — fixes the
    // case where rows were deleted from the source sheet and IDs shifted.
    try { repairShiftedPlacements(); } catch (e) { console.warn('repairShiftedPlacements failed:', e); }

    // ── Console report ──
    console.group('%c🔍 Data Quality Filters', 'color:#1755ED;font-weight:700;font-size:13px');
    console.log('🔁 Duplicates hidden:', _hiddenDuplicates.length, _hiddenDuplicates.length ? _hiddenDuplicates : '(none)');
    console.log('🔞 Underage hidden:', _hiddenUnderage.length, _hiddenUnderage.length ? _hiddenUnderage : '(none)');
    console.groupEnd();

    document.getElementById('cand-error').classList.add('hidden');
  } else {
    showError('cand-error', 'Failed to load candidates: ' + results[0].reason?.message);
    candidates = [];
  }

  // JOB REQUESTS (Row 1 = title, Row 2 = headers, data from Row 3)
  // Columns: A=ID, B=Timestamp, C=Employer/Contact Person (merged), D=Contact#,
  // E=Location/Barangay, F=Email, G=Education, H=Website, I=Job Title/Position,
  // J=Vacancies, K=Job Type, L=Duties, M=Marital Status, N=Age/Gender Pref,
  // O=Skills Needed, P=Experience, Q=Rate/Salary, R=Benefits, S=Schedule/Tools,
  // T=Other Notes, U=JO Status, V=Workers Filled, W=Fee Rate, X=Fee Amount, Y=Remarks
  if (results[1].status === 'fulfilled') {
    const rows = results[1].value;
    // Find first data row (where col A looks like JO ID e.g. JOO-01)
    let joDataStart = 2;
    for (let i = 0; i < rows.length; i++) {
      if (rows[i][0] && /^JO/i.test(rows[i][0].trim())) { joDataStart = i; break; }
    }
    const allJobOrders = rows.slice(joDataStart).filter(r => r[0] && /^JO/i.test(r[0].trim())).map(r => ({
      id: r[0].trim() || '',
      timestamp: r[1] || '',
      company: r[2] || '',
      contactPhone: r[3] || '',
      address: r[4] || '',
      contactEmail: r[5] || '',
      education: r[6] || '',
      website: r[7] || '',
      jobTitle: r[8] || '',
      position: r[8] || '',
      slots: r[9] || '',
      workSchedule: r[10] || '',
      duties: r[11] || '',
      maritalStatus: r[12] || '',
      genderPref: r[13] || '',
      skillsNeeded: r[14] || '',
      experience: r[15] || '',
      salary: r[16] || '',
      benefits: r[17] || '',
      tools: r[18] || '',
      otherNotes: r[19] || '',
      sheetStatus: (r[20] || '').trim(),
      feeRate: r[22] || '',
      feeAmount: r[23] || '',
      remarks: r[24] || '',
    }));
    // Apply localStorage status overrides, show all non-cancelled unless toggled
    // Normalize sheet JO Status case-insensitively and soft-default unknown
    // values (typos, "Pending", "New", "Closed", etc.) to Active so every JO
    // with a JO-style id appears SOMEWHERE — previously the strict whitelist
    // silently dropped any row whose Column U was outside the allowed three
    // values, hiding real job orders from every tab. The visibility filter
    // tabs (Active / On Hold / Cancelled / Fulfilled / All) at the render
    // layer still control what shows by default; this just stops the parser
    // from gating the array itself. localStorage override always wins.
    const _CANON_JO_STATUS = { 'active':'Active','on hold':'On Hold','fulfilled':'Fulfilled','cancelled':'Cancelled','canceled':'Cancelled' };
    jobOrders = allJobOrders.map(jo => {
      const raw = (jo.sheetStatus || '').trim().toLowerCase();
      const canonical = _CANON_JO_STATUS[raw] || 'Active';
      return Object.assign({}, jo, { status: joStatusOverrides[jo.id] || canonical });
    });
    document.getElementById('jo-error').classList.add('hidden');
  } else {
    showError('jo-error', 'Failed to load job orders: ' + results[1].reason?.message);
    jobOrders = [];
  }

  // PLACEMENTS (dynamic start — scan for first row where col B looks like a JO ID)
  // Statuses that should be treated as "Dropped"
  const DROPPED_STATUSES = ['ineligible','rejected by employer','rejected','cancelled','blacklisted','withdrawn','no show','no show for interview','not qualified','failed interview','backed out','dropped / unavailable'];

  // Placements sheet disabled — all placements come from manualPlacements (localStorage/Firebase)
  placements = [];

  // Merge manual placements
  const allPlacements = [...placements, ...manualPlacements];

  // Time-based maintenance always runs, regardless of skipRenderIfUnchanged —
  // a JO past its delayed-close date must close on schedule even on a quiet poll.
  const _delayedMutated = checkDelayedCloses();
  const _poolMutated    = checkPoolRemovals(); // auto-reactivate candidates whose availableFrom passed
  const _maintenanceMutated = _delayedMutated || _poolMutated;

  // Skip DOM rebuild when caller (poll) passed snapshots, IDs are unchanged,
  // and no maintenance function mutated state. Keeps idle polls cheap without
  // letting time-based transitions stay invisible.
  if (opts && opts.skipRenderIfUnchanged && opts.oldCandIds && opts.oldJoIds) {
    const _newCandIds = candidates.map(c => c.id);
    const _newJoIds   = jobOrders.map(j => j.id);
    const _sameCands = _newCandIds.length === opts.oldCandIds.size
      && _newCandIds.every(id => opts.oldCandIds.has(id));
    const _sameJos = _newJoIds.length === opts.oldJoIds.size
      && _newJoIds.every(id => opts.oldJoIds.has(id));
    if (_sameCands && _sameJos && !_maintenanceMutated) {
      updateTimestamp(); // keep the "last updated" pill honest even when nothing rebuilt
      return;
    }
  }

  updateStats();
  migrateJobOrderEvents(); // one-time migration; no-op after first run
  renderJobOrders(allPlacements);
  renderHiredTab();
  renderCandidates();
  populateMatcherDropdown();
  populateFilterDropdowns();
  updateTimestamp();
  _backfillCallQueue();
  updateCallsBadge();
}

function loadingHTML(msg) {
  return `<div class="loading-wrap"><div class="spinner"></div><div class="loading-text">${msg}</div></div>`;
}

function showError(id, msg) {
  const el = document.getElementById(id);
  el.textContent = msg;
  el.classList.remove('hidden');
}

function updateTimestamp() {
  const now = new Date();
  document.getElementById('last-updated-text').textContent =
    now.toLocaleTimeString('en-PH', {hour:'2-digit',minute:'2-digit'});
}

function updateStats() {
  const allPlacements = [...placements, ...manualPlacements];
  // Resolve canonical stage for a placement (uses dispositionStage when present,
  // falls back to legacy status/response). Hoisted as a local so the three
  // metric filters below all use the same definition.
  const _stageOf = function(p) {
    const pid = p.placementId || p.candidateId;
    let ex = {}; try { ex = JSON.parse(localStorage.getItem('prow_extra_' + pid) || '{}'); } catch(e) {}
    return getEffectiveStage(ex, p);
  };
  document.getElementById('stat-candidates').textContent = candidates.length;
  document.getElementById('stat-verified').textContent = candidates.filter(c => getEffectiveVerified(c)).length;
  document.getElementById('stat-active-jobs').textContent = jobOrders.length;
  // §C: Placements count only candidates whose stage is Hired ✓. Pending
  // Requirements explicitly does NOT count (still cancellable, no fee owed).
  // Pre-Hired stages (Broadcasted / Confirmed Interested / Called / Verified /
  // For Employer Review / Interview Scheduled) and exit stages are excluded.
  document.getElementById('stat-placements').textContent = allPlacements.filter(p => _stageOf(p) === 'Hired ✓').length;
  const totalHidden = _hiddenDuplicates.length + _hiddenUnderage.length;
  const noteEl = document.getElementById('stat-hidden-note');
  if (noteEl) {
    noteEl.textContent = totalHidden > 0
      ? totalHidden + ' hidden (' + _hiddenDuplicates.length + ' dup · ' + _hiddenUnderage.length + ' underage)'
      : '';
  }
  // Show cleanup button for admins when there are unresolved hidden candidates
  var cleanupBtn = document.getElementById('cleanup-btn');
  if (cleanupBtn) {
    cleanupBtn.style.display = (isAdmin() && totalHidden > 0) ? '' : 'none';
    cleanupBtn.textContent = 'Cleanup (' + totalHidden + ')';
  }

  // Avg Days to Place (last 30 days)
  const thirtyDaysAgo = Date.now() - 30 * 86400000;
  const daysToPlaceArr = [];
  const replacementTypes = ['Candidate Abandonment / No-Show', 'Replacement Requested'];
  var issueCount = 0;
  allPlacements.forEach(function(p) {
    const pid = p.placementId || p.candidateId;
    var ex = {}; try { ex = JSON.parse(localStorage.getItem('prow_extra_' + pid) || '{}'); } catch(e) {}
    var hireData = {}; try { hireData = JSON.parse(localStorage.getItem('hire_data_' + pid) || '{}'); } catch(e) {}
    // §C: only Hired ✓ counts toward Avg Days to Place — derived from Stage,
    // not the legacy status string, so Pending Requirements stays excluded.
    if (getEffectiveStage(ex, p) !== 'Hired ✓') return;
    if (hireData.issueReported && (hireData.issues || []).some(function(i) { return replacementTypes.indexOf(i.type) >= 0; })) issueCount++;
    var hd = hireData.hireDate;
    if (!hd) return;
    var hdMs = parseDateFlex(hd);
    if (!hdMs || isNaN(hdMs) || hdMs.getTime() < thirtyDaysAgo) return;
    var jo = jobOrders.find(function(j) { return j.id === p.jobOrderId; });
    if (!jo) return;
    // Use cycle start date (from events) not original creation date
    var cycleStart = getLastCycleStartDate(p.jobOrderId);
    var joMs = cycleStart ? parseDateFlex(cycleStart) : (jo.timestamp ? parseDateFlex(jo.timestamp) : null);
    if (!joMs || isNaN(joMs)) return;
    var diff = Math.round((hdMs.getTime() - joMs.getTime()) / 86400000);
    if (diff >= 0) daysToPlaceArr.push(diff);
  });

  var avgDaysEl = document.getElementById('stat-avg-days');
  if (avgDaysEl) avgDaysEl.textContent = daysToPlaceArr.length ? Math.round(daysToPlaceArr.reduce(function(a,b){return a+b;},0)/daysToPlaceArr.length) + 'd' : '—';

  // §C: Replacement Rate denominator = Hired ✓ only (Stage-derived, future-proof).
  var totalHired = allPlacements.filter(function(p) {
    const pid = p.placementId || p.candidateId;
    var ex = {}; try { ex = JSON.parse(localStorage.getItem('prow_extra_' + pid) || '{}'); } catch(e) {}
    return getEffectiveStage(ex, p) === 'Hired ✓';
  }).length;

  var replaceRateEl = document.getElementById('stat-replace-rate');
  var replaceDetailEl = document.getElementById('stat-replace-detail');
  if (replaceRateEl) {
    if (totalHired > 0) {
      replaceRateEl.textContent = Math.round(issueCount / totalHired * 100) + '%';
      if (replaceDetailEl) replaceDetailEl.textContent = issueCount + ' of ' + totalHired + ' placements';
    } else {
      replaceRateEl.textContent = '—';
      if (replaceDetailEl) replaceDetailEl.textContent = '';
    }
  }

  renderBriefingPanel();
}

// ═══════════════════════════════════════════════
// JOB ORDERS — Tab-based layout
// ═══════════════════════════════════════════════
let activeJOTab = 0;
window._joMainView = window._joMainView || 'orders'; // 'orders' | 'interviews'

function renderJobOrders(allPlacements) {
  const container = document.getElementById('jo-container');
  document.getElementById('jo-count').textContent = jobOrders.length;

  if (!jobOrders.length) {
    container.innerHTML = `<div class="empty-state"><div class="empty-icon">—</div>No active job orders found.</div>`;
    return;
  }

  // Interview Overview view
  if (window._joMainView === 'interviews') {
    container.innerHTML = '';
    container.appendChild(buildInterviewViewToggle());
    container.appendChild(buildInterviewOverview());
    return;
  }

  // Clamp active tab
  if (activeJOTab >= jobOrders.length) activeJOTab = 0;

  // Status filter bar
  const filterWrap = document.createElement('div');
  filterWrap.className = 'jo-status-filter-bar';
  filterWrap.style.display = 'flex';
  filterWrap.style.flexWrap = 'wrap';
  filterWrap.style.gap = '6px';
  filterWrap.style.marginBottom = '12px';
  filterWrap.style.alignItems = 'center';
  const statusFilters = ['All','Active','On Hold','Fulfilled','Cancelled'];
  const currentFilter = window._joFilter || 'Active';
  var statusBtnsHtml = statusFilters.map(s =>
    '<button class="jo-status-filter-btn' + (s===currentFilter ? ' sfactive' : '') + '" onclick="setJOFilter(\'' + s + '\')">' + s + '</button>'
  ).join('');
  // Admin: coordinator picker
  if (isAdmin()) {
    var rc = getRoleConfig();
    var coordOpts = '<option value="">All Handlers</option><option value="__unassigned__">Unassigned</option>' +
      Object.entries(rc.coordinators || {}).map(function(e) {
        return '<option value="' + e[0] + '"' + (window._joCoordFilter===e[0]?' selected':'') + '>' + (e[1].name || e[0]) + '</option>';
      }).join('');
    statusBtnsHtml += '<select style="padding:5px 10px;border-radius:8px;border:1px solid var(--border2);font-size:12px;background:var(--card2);color:var(--text);margin-left:8px" onchange="window._joCoordFilter=this.value;renderJobOrders([...placements,...manualPlacements])">' + coordOpts + '</select>';
  }
  // Coordinator: show-all toggle
  if (isCoordinator()) {
    var showAllChecked = window._joShowAll ? ' checked' : '';
    statusBtnsHtml += '<label style="font-size:12px;color:var(--text2);font-weight:600;display:flex;align-items:center;gap:5px;margin-left:8px"><input type="checkbox"' + showAllChecked + ' onchange="window._joShowAll=this.checked;renderJobOrders([...placements,...manualPlacements])"> Show All</label>';
  }
  // Interviews toggle — rightmost in filter bar
  statusBtnsHtml += '<span style="width:1px;background:var(--border2);align-self:stretch;margin:0 4px;display:inline-block"></span>' +
    '<button class="jo-status-filter-btn" style="background:rgba(124,58,237,.10);border-color:rgba(124,58,237,.4);color:var(--purple);font-weight:700" onclick="window._joMainView=\'interviews\';renderJobOrders([...placements,...manualPlacements])">📅 Interviews</button>';
  filterWrap.innerHTML = statusBtnsHtml;

  // Coordinator filter (admin: show picker; coordinator: show own only unless override)
  const coordFilter = window._joCoordFilter || '';
  var baseJOs = currentFilter === 'All' ? jobOrders : jobOrders.filter(jo => jo.status === currentFilter);
  if (isAdmin() && coordFilter) {
    baseJOs = coordFilter === '__unassigned__'
      ? baseJOs.filter(jo => !getCoordinatorEmail(jo.id))
      : baseJOs.filter(jo => getCoordinatorEmail(jo.id) === coordFilter);
  } else if (isCoordinator() && !window._joShowAll) {
    baseJOs = baseJOs.filter(jo => getCoordinatorEmail(jo.id) === currentUserEmail);
  }

  // Filter job orders
  const visibleJOs = baseJOs;

  // Sort active JOs by age (oldest first = most urgent at top)
  visibleJOs.sort(function(a, b) {
    var da = parseDateFlex(a.timestamp), db = parseDateFlex(b.timestamp);
    var ta = da && !isNaN(da) ? da.getTime() : Date.now();
    var tb = db && !isNaN(db) ? db.getTime() : Date.now();
    return ta - tb; // older timestamp = higher urgency = sort first
  });

  if (activeJOTab >= visibleJOs.length) activeJOTab = 0;

  // Build tab bar
  const tabBar = document.createElement('div');
  tabBar.className = 'jo-tab-bar';

  if (!visibleJOs.length) {
    container.innerHTML = '';
    container.appendChild(filterWrap);
    container.innerHTML += '<div class="empty-state"><div class="empty-icon">—</div>No ' + (currentFilter !== 'All' ? currentFilter + ' ' : '') + 'job orders.</div>';
    return;
  }

  visibleJOs.forEach((jo, i) => {
    const joPlacements = allPlacements.filter(p => p.jobOrderId === jo.id);
    const slots = parseInt(jo.slots) || 1;
    const statusColors = {'Active':'var(--accent)','On Hold':'var(--orange)','Fulfilled':'var(--green)','Cancelled':'var(--red)'};
    const _getEx = p => { let ex={}; try{ex=JSON.parse(localStorage.getItem('prow_extra_'+(p.placementId||p.candidateId))||'{}')}catch(e){}; return ex; };
    const broadcastedC = joPlacements.filter(p => getEffectiveStage(_getEx(p), p) === 'Broadcasted').length;
    const confirmedC = joPlacements.filter(p => { const st = getEffectiveStage(_getEx(p), p); return st === 'Confirmed Interested' || st === 'Called / Verified' || st === 'For Employer Review' || st === 'Interview Scheduled' || st === 'Pending Requirements'; }).length;
    const hiredC = joPlacements.filter(p => getEffectiveStage(_getEx(p), p) === 'Hired ✓').length;

    // Age badge — uses getDaysOpen() for correct cycle-aware days
    var daysOpen = getDaysOpen(jo);
    var ageCls = daysOpen >= 7 ? 'age-overdue' : daysOpen >= 4 ? 'age-followup' : 'age-fresh';
    var ageLabel = daysOpen >= 7 ? 'OVERDUE' : daysOpen >= 4 ? 'Follow Up' : 'Fresh';
    var ageBadge = '<span class="age-badge ' + ageCls + '">' + daysOpen + 'd \xB7 ' + ageLabel + '</span>';
    // Reopen count badge for tab button
    var rc2 = getReopenCount(jo.id);
    var tabReopEvts = getJobOrderEvents(jo.id).filter(function(e){ return e.type==='reopened'; });
    var tabLastReason = tabReopEvts.length ? (tabReopEvts[tabReopEvts.length-1].reason||'') : '';
    var tabReopenBadge = rc2 > 0 ? '<span class="reopen-badge' + (tabLastReason.indexOf('Guarantee')>=0?' reopen-badge-guarantee':'') + '">' + (tabLastReason.indexOf('Guarantee')>=0?'Guarantee':'Reopened') + ' \xD7' + rc2 + '</span>' : '';

    const btn = document.createElement('button');
    btn.className = 'jo-tab-btn' + (i === activeJOTab ? ' active' : '') + (jo.status !== 'Active' ? ' jo-tab-nactive' : '');
    const _cxInfo = (() => { try { return JSON.parse(localStorage.getItem('jo_cancellation_' + jo.id) || 'null'); } catch(e) { return null; } })();
    btn.innerHTML =
      '<div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;flex-wrap:wrap">' +
        '<div class="jo-tab-id">' + escHtml(jo.id) + '</div>' +
        '<span class="jo-status-pill" style="color:' + (statusColors[jo.status] || 'var(--text3)') + '">' + escHtml(jo.status) + '</span>' +
        ageBadge + tabReopenBadge +
      '</div>' +
      '<div class="jo-tab-pos">' + escHtml(jo.position) + '</div>' +
      '<div class="jo-tab-company">' + escHtml(jo.company) + '</div>' +
      '<div class="jo-tab-count">' + broadcastedC + ' broadcast \xB7 ' + confirmedC + ' confirmed \xB7 ' + hiredC + '/' + slots + ' hired</div>' +
      (function() {
        var ce = getCoordinatorEmail(jo.id);
        var cn = ce ? getCoordinatorName(ce) : '';
        return '<div style="margin-top:4px"><span class="coord-tag' + (cn ? '' : ' unassigned') + '">' + (cn ? escHtml(cn) : 'Unassigned') + '</span></div>';
      })() +
      (jo.status === 'Cancelled' && _cxInfo ? '<div style="font-size:10px;color:var(--text3);margin-top:3px;font-style:italic">Cancelled \xB7 ' + (isAdmin() ? escHtml(_cxInfo.reason) : '—') + '</div>' : '');
    btn.onclick = () => { activeJOTab = i; renderJobOrders([...placements, ...manualPlacements]); };
    tabBar.appendChild(btn);
  });

  // Override active JO with filtered list
  const jo_active = visibleJOs[activeJOTab];
  const jo_activePlacements = allPlacements.filter(p => p.jobOrderId === jo_active.id);

  const panel = buildJOPanel(jo_active, jo_activePlacements);

  container.innerHTML = '';
  container.appendChild(filterWrap);
  container.appendChild(tabBar);
  container.appendChild(panel);
}

function buildJOPanel(jo, joPlacements) {
  const panel = document.createElement('div');
  panel.className = 'jo-panel';

  // Count hires
  const allP = [...placements,...manualPlacements].filter(p=>p.jobOrderId===jo.id);
  const getExtra = pid => { let ex={}; try{ex=JSON.parse(localStorage.getItem('prow_extra_'+pid)||'{}')}catch(e){}; return ex; };
  const hiredCount = allP.filter(p=>{ const ex=getExtra(p.placementId||p.candidateId); return (ex.status||p.status||'').trim().toLowerCase()==='hired'; }).length;
  const activeCount = allP.filter(p=>{ const ex=getExtra(p.placementId||p.candidateId); const s=(ex.status||p.status||'').trim().toLowerCase(); return s!=='dropped'&&s!=='hired'; }).length;
  const slots = parseInt(jo.slots)||1;
  const isFulfilled = hiredCount >= slots;
  const hiringPct = Math.min(100, Math.round(hiredCount/slots*100));

  const joStatus = jo.status || 'Active';
  const statusCfg = {
    'Active':    { color:'var(--accent)',  bg:'var(--accent-dim2)', label:'Active' },
    'On Hold':   { color:'var(--orange)',  bg:'var(--orange-dim)',  label:'On Hold' },
    'Fulfilled': { color:'var(--green)',   bg:'var(--green-dim)',   label:'Fulfilled' },
    'Cancelled': { color:'var(--red)',     bg:'var(--red-dim)',     label:'Cancelled' },
  };
  const sc = statusCfg[joStatus] || statusCfg['Active'];

  // Status change buttons
  const statusActions = {
    'Active':    [['Hold','On Hold','btn-ghost'],['Cancel','Cancelled','btn-ghost']],
    'On Hold':   [['Reopen','Active','btn-green'],['Cancel','Cancelled','btn-ghost']],
    'Cancelled': [['Reopen','Active','btn-green'],['Hold','On Hold','btn-ghost']],
    'Fulfilled': [['Reopen','Active','btn-green']],
  };
  const statusBtns = (statusActions[joStatus]||[]).map(([label,newStatus,cls])=> {
    if (newStatus === 'Cancelled') return `<button class="btn ${cls}" onclick="openCancelModal('${escAttr(jo.id)}','${escAttr(jo.position)}')">${label}</button>`;
    if (label === 'Reopen') return `<button class="btn ${cls}" onclick="openReopenModal('${escAttr(jo.id)}')">${label}</button>`;
    return `<button class="btn ${cls}" onclick="changeJOStatus('${escAttr(jo.id)}','${newStatus}')">${label}</button>`;
  }).join('');

  const canAdd = joStatus === 'Active' && !isFulfilled;

  const hasShortlist = joPlacements.some(p => {
    const ex = (() => { let e={}; try{e=JSON.parse(localStorage.getItem('prow_extra_'+(p.placementId||p.candidateId))||'{}')}catch(err){}; return e; })();
    return getEffectiveStage(ex, p) === 'For Employer Review';
  });

  const replacementCtx = (() => {
    try {
      const val = localStorage.getItem('pending_replacement_jo_' + jo.id);
      return val ? JSON.parse(val) : null;
    } catch(e){ return null; }
  })();

  // Days open — uses getDaysOpen() which respects reopen cycles
  var joDaysOpen = getDaysOpen(jo);
  var joAgeBadgeHtml = '';
  if (joDaysOpen !== null) {
    var joAgeCls   = joDaysOpen >= 7 ? 'age-overdue' : joDaysOpen >= 4 ? 'age-followup' : 'age-fresh';
    var joAgeLabel = joDaysOpen >= 7 ? 'OVERDUE'     : joDaysOpen >= 4 ? 'Follow Up'    : 'Fresh';
    joAgeBadgeHtml = '<span class="age-badge ' + joAgeCls + '">' + joDaysOpen + ' days open \xB7 ' + joAgeLabel + '</span>';
  }
  // Reopen count badge
  var reopenCount = getReopenCount(jo.id);
  var reopenEvents = getJobOrderEvents(jo.id).filter(function(e){ return e.type==='reopened'; });
  var lastReopenReason = reopenEvents.length ? (reopenEvents[reopenEvents.length-1].reason||'') : '';
  var isGuaranteeReopen = lastReopenReason.indexOf('Guarantee') >= 0;
  var reopenBadgeHtml = reopenCount > 0 ? '<span class="reopen-badge' + (isGuaranteeReopen?' reopen-badge-guarantee':'') + '" onclick="toggleJOHistory(\'' + escAttr(jo.id) + '\')">' + (isGuaranteeReopen?'Guarantee Replacement':'Reopened \xD7'+reopenCount) + '</span>' : '';

  // Coordinator "Handled By" field
  var existingCoordEmail = getCoordinatorEmail(jo.id);
  var coordHtml = '';
  if (isAdmin()) {
    var rc2 = getRoleConfig();
    var coordOpts2 = '<option value="">-- Unassigned --</option>' +
      Object.entries(rc2.coordinators || {}).map(function(e) {
        return '<option value="' + escAttr(e[0]) + '"' + (existingCoordEmail===e[0]?' selected':'') + '>' + escHtml(e[1].name || e[0]) + '</option>';
      }).join('');
    coordHtml = '<div style="display:flex;align-items:center;gap:8px;margin-top:8px"><span style="font-size:10px;font-weight:700;color:var(--text3);text-transform:uppercase;letter-spacing:.5px">Handled By</span>' +
      '<select style="font-size:12px;padding:4px 8px;border-radius:7px;border:1px solid var(--border2);background:var(--card2);color:var(--text)" onchange="setCoordinatorForJO(\'' + escAttr(jo.id) + '\',this.value)">' + coordOpts2 + '</select></div>';
  } else if (existingCoordEmail) {
    coordHtml = '<div style="margin-top:8px"><span class="coord-tag">' + escHtml(getCoordinatorName(existingCoordEmail)) + '</span></div>';
  } else {
    coordHtml = '<div style="margin-top:8px"><span class="coord-tag unassigned">Unassigned</span></div>';
  }

  panel.innerHTML = `
    <div class="jo-panel-header">
      <div class="jo-panel-left">
        <div class="jo-id">${escHtml(jo.id)}</div>
        <div>
          <div class="jo-title">${escHtml(jo.position)}</div>
          <div class="jo-company">${escHtml(jo.company)}</div>
        </div>
      </div>
      <div style="flex:1;min-width:200px">
        <div class="jo-meta" style="flex-wrap:wrap;margin-bottom:8px">
          <div class="jo-meta-item"><span>${escHtml(jo.slots)} slot${slots!==1?'s':''}</span></div>
          <div class="jo-meta-item"><span>${escHtml(jo.salary)}</span></div>
          <div class="jo-meta-item"><span>${joPlacements.length} total</span></div>
          <div class="jo-meta-item"><span style="color:var(--accent)">${activeCount} active</span></div>
          ${joAgeBadgeHtml ? '<div class="jo-meta-item">' + joAgeBadgeHtml + '</div>' : ''}
          ${reopenBadgeHtml ? '<div class="jo-meta-item">' + reopenBadgeHtml + '</div>' : ''}
        </div>
        <div class="jo-hire-progress">
          <div class="jo-hire-bar" style="width:${hiringPct}%"></div>
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;margin-top:5px">
          <span style="font-size:11px;font-weight:700;color:${isFulfilled?'var(--green)':'var(--accent)'}">
            ${hiredCount}/${slots} hired
          </span>
          <span class="jo-status-chip" style="color:${sc.color};background:${sc.bg}">${sc.label}</span>
        </div>
        ${coordHtml}
      </div>
      <div class="jo-panel-actions" style="flex-direction:column;gap:6px;align-items:flex-end">
        <div style="display:flex;gap:6px">
          <button class="btn btn-secondary btn-sm" onclick="openBroadcastModal('${escAttr(jo.id)}')">Broadcast</button>
          ${canAdd
            ? `<button class="btn btn-green" onclick="openAddPlacementModal('${escAttr(jo.id)}','${escAttr(jo.company)}','${escAttr(jo.position)}')">+ Add</button>`
            : `<button class="btn btn-ghost" onclick="confirmAddOverride('${escAttr(jo.id)}','${escAttr(jo.company)}','${escAttr(jo.position)}')">+ Add (Override)</button>`}
        </div>
        <div style="display:flex;gap:6px">
          ${isAdmin() ? statusBtns : ''}
        </div>
        <div style="display:flex;gap:6px">
          <button id="copy-jo-btn-${jo.id.replace(/[^a-z0-9]/gi,'')}" class="btn btn-ghost btn-sm" onclick="copyJobDetails('${escAttr(jo.id)}')">Copy Job Details</button>
          ${hasShortlist ? `<button id="copy-shortlist-btn-${jo.id.replace(/[^a-z0-9]/gi,'')}" class="btn btn-ghost btn-sm" onclick="copyShortlist('${escAttr(jo.id)}')">Copy Shortlist</button>` : ''}
        </div>
      </div>
    </div>
    ${replacementCtx ? `
    <div style="background:rgba(234,88,12,.08);border-bottom:1px solid rgba(234,88,12,.2);padding:10px 22px;display:flex;align-items:center;gap:10px;font-size:12px">
      <span style="font-weight:700;color:var(--orange)">Replacement Needed</span>
      <span style="color:var(--text2)">Previous candidate: <strong>${escHtml(replacementCtx.candName)}</strong> · ${escHtml(replacementCtx.issueType)}</span>
      <span style="font-size:11px;color:var(--text3);margin-left:auto">${escHtml(new Date(replacementCtx.ts).toLocaleDateString('en-PH',{month:'short',day:'numeric'}))}</span>
    </div>` : ''}
  `;

  // If newly fulfilled, trigger popup
  if (isFulfilled && joStatus === 'Active') {
    setTimeout(() => triggerFulfillmentPopup(jo.id, jo.position, jo.company), 300);
  }

  // ── Job Description collapsible section ──
  const jdFields = [
    ['Address',        jo.address],
    ['Contact Person', jo.contactPerson],
    ['Contact #',      jo.contactPhone],
    ['Email',          jo.contactEmail],
    ['Work Schedule',  jo.workSchedule],
    ['Gender Pref',    jo.genderPref],
    ['Civil Status',   jo.civilStatus],
    ['Skills Needed',  jo.skillsNeeded],
    ['Experience',     jo.experience],
    ['Benefits',       jo.benefits],
    ['Tools/Equipment',jo.tools],
    ['Fee Rate',       jo.feeRate],
    ['Fee Amount',     jo.feeAmount],
    ['Other Notes',    jo.otherNotes],
  ].filter(([,v]) => v && v.trim());

  if (jdFields.length) {
    const jdSection = document.createElement('div');
    jdSection.style.cssText = 'border-bottom:1px solid var(--border)';
    const jdId = 'jd-' + jo.id.replace(/[^a-z0-9]/gi, '');
    jdSection.innerHTML = `
      <div onclick="toggleJD('${escAttr(jdId)}')" style="display:flex;align-items:center;gap:10px;padding:10px 18px;cursor:pointer;user-select:none;background:var(--card2);transition:background .15s" onmouseenter="this.style.background='var(--card3)'" onmouseleave="this.style.background='var(--card2)'">
        <span style="font-size:9px;font-weight:800;color:var(--text3);text-transform:uppercase;letter-spacing:.8px;flex:1">Job Description</span>
        <span id="${escAttr(jdId)}-chevron" style="font-size:11px;color:var(--text3);transition:transform .2s">▾</span>
      </div>
      <div id="${escAttr(jdId)}" style="display:none;padding:14px 18px 16px">
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:8px">
          ${jdFields.map(([label, val]) => `
            <div style="background:var(--card2);border:1px solid var(--border);border-radius:10px;padding:10px 12px">
              <div style="font-size:9px;font-weight:700;color:var(--text3);text-transform:uppercase;letter-spacing:.6px;margin-bottom:4px">${escHtml(label)}</div>
              <div style="font-size:12px;color:var(--text);font-weight:500;line-height:1.5;word-break:break-word">${escHtml(val)}</div>
            </div>`).join('')}
        </div>
      </div>
    `;
    panel.appendChild(jdSection);
  }

  // Pipeline funnel — current cycle only
  if (joPlacements.length > 0) {
    const funnelSec = document.createElement('div');
    funnelSec.className = 'pipeline-section';
    const funnelStages = ['Broadcasted','Confirmed Interested','Called / Verified','For Employer Review','Interview Scheduled','Pending Requirements','Hired ✓'];
    const stageCounts = {};
    funnelStages.forEach(function(s) { stageCounts[s] = 0; });
    stageCounts['Dropped / Unavailable'] = 0;
    var cycleStart = getLastCycleStartDate(jo.id);
    var cycleStartMs = cycleStart ? parseDateFlex(cycleStart) : null;
    // Only count current-cycle placements in funnel
    var funnelPlacements = joPlacements.filter(function(p) {
      if (!cycleStartMs) return true;
      var pd = parseDateFlex(p.date || '');
      return !pd || pd >= cycleStartMs;
    });
    funnelPlacements.forEach(function(p) {
      var pid2 = p.placementId || p.candidateId;
      var ex2 = {}; try { ex2 = JSON.parse(localStorage.getItem('prow_extra_' + pid2) || '{}'); } catch(e) {}
      var stg = getEffectiveStage(ex2, p);
      if (stageCounts[stg] !== undefined) stageCounts[stg]++;
      else if (stg === 'Rejected by Employer' || stg === 'Rejected by Candidate') stageCounts['Dropped / Unavailable']++;
    });
    var maxCount = Math.max(1, Math.max.apply(null, funnelStages.map(function(s) { return stageCounts[s]; })));
    var stageColors = ['var(--blue)','var(--accent)','var(--purple)','var(--orange)','var(--green)'];
    var funnelRows = funnelStages.map(function(stage, si) {
      var count = stageCounts[stage] || 0;
      var pct = Math.round(count / maxCount * 100);
      var dropoff = '';
      if (si > 0) {
        var prev = stageCounts[funnelStages[si - 1]] || 0;
        if (prev > 0) {
          var d = Math.round((1 - count / prev) * 100);
          dropoff = '<span class="pipeline-dropoff">(↓ ' + d + '% drop-off)</span>';
        }
      }
      return '<div class="pipeline-row">' +
        '<div class="pipeline-label">' + stage + '</div>' +
        '<div class="pipeline-bar-wrap"><div class="pipeline-bar-fill" style="width:' + pct + '%;background:' + stageColors[si] + '"></div></div>' +
        '<div class="pipeline-count">' + count + '</div>' +
        dropoff +
        '</div>';
    });
    var droppedCount = stageCounts['Dropped / Unavailable'];
    if (droppedCount > 0) {
      funnelRows.push('<div class="pipeline-row">' +
        '<div class="pipeline-label" style="color:var(--text3)">Dropped / Rejected</div>' +
        '<div class="pipeline-bar-wrap"><div class="pipeline-bar-fill" style="width:' + Math.round(droppedCount/maxCount*100) + '%;background:var(--text3)"></div></div>' +
        '<div class="pipeline-count" style="color:var(--text3)">' + droppedCount + '</div>' +
        '<span class="pipeline-dropoff"></span>' +
        '</div>');
    }
    funnelSec.innerHTML = '<div class="pipeline-title">Pipeline Funnel</div>' + funnelRows.join('');
    panel.appendChild(funnelSec);
  }

  // Interview Sessions section
  var isessEl = buildIsessSection(jo, joPlacements);
  if (isessEl) panel.appendChild(isessEl);

  // History timeline section
  var histSec = document.createElement('div');
  histSec.className = 'joc-timeline';
  histSec.id = 'joc-timeline-' + jo.id;
  histSec.style.display = 'none'; // collapsed by default
  var evts = getJobOrderEvents(jo.id);
  var evtDotCls = { created:'joc-dot-created', fulfilled:'joc-dot-fulfilled', reopened:'joc-dot-reopened', on_hold:'joc-dot-onhold', resumed:'joc-dot-created', cancelled:'joc-dot-cancelled' };
  var evtItems = evts.map(function(e) {
    var dc = evtDotCls[e.type] || 'joc-dot-default';
    var dt = e.date ? new Date(e.date).toLocaleDateString('en-PH',{month:'short',day:'numeric',year:'numeric'}) : '';
    var detail = '';
    if (isAdmin()) {
      if (e.candidateName) detail += escHtml(e.candidateName) + ' · ';
      if (e.reason)        detail += escHtml(e.reason);
      if (e.notes)         detail += ' — <em>' + escHtml(e.notes) + '</em>';
    }
    var label = e.type.charAt(0).toUpperCase() + e.type.slice(1).replace('_', ' ');
    return '<div class="joc-event"><div class="joc-dot ' + dc + '">' + label.charAt(0) + '</div>' +
      '<div class="joc-event-body"><div class="joc-event-type">' + escHtml(label) + '</div>' +
      '<div class="joc-event-date">' + dt + (e.migrated?' <em style="color:var(--text3)">(estimated)</em>':'') + '</div>' +
      (detail?'<div class="joc-event-detail">' + detail + '</div>':'') + '</div></div>';
  }).join('');
  if (joDaysOpen > 0 && (joStatusOverrides[jo.id]==='Active'||jo.status==='Active')) {
    evtItems += '<div class="joc-event"><div class="joc-dot joc-dot-created" style="background:var(--green-dim);border-color:var(--green);color:var(--green)">●</div>' +
      '<div class="joc-event-body"><div class="joc-event-type" style="color:var(--green)">Active Now</div>' +
      '<div class="joc-event-date">Day ' + joDaysOpen + '</div></div></div>';
  }
  histSec.innerHTML = '<div class="joc-timeline-title" onclick="toggleJOHistory(\'' + escAttr(jo.id) + '\')" style="display:flex;justify-content:space-between">' +
    '<span>History</span><span id="joc-toggle-icon-' + escAttr(jo.id) + '" style="font-size:10px">▶ Show</span></div>' +
    '<div id="joc-events-' + escAttr(jo.id) + '" style="display:none">' + (evtItems || '<div style="color:var(--text3);font-size:11px">No events recorded.</div>') + '</div>';
  panel.appendChild(histSec);

  // Candidate list with cycle toggle
  const placeSec = document.createElement('div');
  placeSec.className = 'placements-section';

  var cycleStartForFilter = getLastCycleStartDate(jo.id);
  var cycleStartMsForFilter = cycleStartForFilter ? parseDateFlex(cycleStartForFilter) : null;
  var hasPrevCycle = cycleStartMsForFilter && joPlacements.some(function(p) {
    var pd = parseDateFlex(p.date || ''); return pd && pd < cycleStartMsForFilter;
  });
  var showAllCycles = window['_joAllCycles_' + jo.id] === true;

  var toggleHtml = '';
  if (hasPrevCycle) {
    toggleHtml = '<div class="cycle-toggle">' +
      '<button class="cycle-toggle-btn' + (!showAllCycles?' active':'') + '" onclick="window[\'_joAllCycles_' + jo.id + '\']=false;renderJobOrders([...placements,...manualPlacements])">Current Cycle</button>' +
      '<button class="cycle-toggle-btn' + (showAllCycles?' active':'') + '" onclick="window[\'_joAllCycles_' + jo.id + '\']=true;renderJobOrders([...placements,...manualPlacements])">Show All Cycles</button>' +
      '</div>';
  }
  placeSec.innerHTML = '<div class="placements-title">Candidates in This Job Order</div>' + toggleHtml;

  if (joPlacements.length === 0) {
    placeSec.innerHTML += '<div class="empty-placements">No candidates assigned yet.</div>';
  } else {
    // Filter by cycle unless "show all" is on
    var visiblePlacements = joPlacements;
    if (!showAllCycles && cycleStartMsForFilter) {
      visiblePlacements = joPlacements.filter(function(p) {
        var pd = parseDateFlex(p.date || ''); return !pd || pd >= cycleStartMsForFilter;
      });
      if (visiblePlacements.length === 0) visiblePlacements = joPlacements; // fallback: show all if filter removes everything
    }
    // Sort: active statuses first, inactive (Dropped/Not Interested) at bottom
    const statusOrder = { 'Confirmed':0, 'Called':1, 'Interview Scheduled':2, 'For Employer Review':3, 'Broadcasted':4, 'Hired':5, 'Dropped / Unavailable':6 };
    const responseOrder = { 'Interested':0, 'No Response':1, 'Not Interested':2 };
    const sorted = [...joPlacements].sort((a,b) => {
      const getPid = (p, i) => p.placementId || (jo.id + '_' + p.candidateId + '_' + i);
      const getExtra = (p, i) => { try { return JSON.parse(localStorage.getItem('prow_extra_' + getPid(p,i)) || '{}'); } catch(e){ return {}; } };
      const extraA = getExtra(a, 0); const extraB = getExtra(b, 0);
      const aResp = extraA.response || a.response || '';
      const bResp = extraB.response || b.response || '';
      const aStat = extraA.status   || a.status   || '';
      const bStat = extraB.status   || b.status   || '';
      const aInactive = aStat === 'Dropped / Unavailable' || aStat === 'Dropped' || aResp === 'Not Interested';
      const bInactive = bStat === 'Dropped / Unavailable' || bStat === 'Dropped' || bResp === 'Not Interested';
      if (aInactive !== bInactive) return aInactive ? 1 : -1;
      const sa = statusOrder[aStat] ?? 5;
      const sb = statusOrder[bStat] ?? 5;
      if (sa !== sb) return sa - sb;
      return (responseOrder[aResp]??3) - (responseOrder[bResp]??3);
    });
    sorted.forEach((p, idx) => {
      if (blacklist[p.candidateId]) return; // always exclude blacklisted candidates
      var isPrevCycle = cycleStartMsForFilter && !showAllCycles === false && (function(){ var pd=parseDateFlex(p.date||''); return pd && pd < cycleStartMsForFilter; })();
      var isFiltered = !showAllCycles && cycleStartMsForFilter && visiblePlacements.indexOf(p) < 0;
      if (isFiltered) return; // skip if filtered out
      const row = createPlacementRow(p, idx, jo.id);
      // Add prev-cycle badge
      if (isPrevCycle) {
        var nameEl = row.querySelector('.prow-name');
        if (nameEl) nameEl.innerHTML += '<span class="prev-cycle-badge">Prev. Cycle</span>';
      }
      placeSec.appendChild(row);
    });
  }

  panel.appendChild(placeSec);
  return panel;
}

function toggleJOHistory(joId) {
  var evtsEl = document.getElementById('joc-events-' + joId);
  var iconEl = document.getElementById('joc-toggle-icon-' + joId);
  var secEl  = document.getElementById('joc-timeline-' + joId);
  if (!evtsEl) {
    // History section might be collapsed — find in panel and show
    var panelEl = document.querySelector('.jo-panel');
    if (!panelEl) return;
    var timelines = panelEl.querySelectorAll('.joc-timeline');
    timelines.forEach(function(t) { t.style.display=''; });
    return;
  }
  var isOpen = evtsEl.style.display !== 'none';
  evtsEl.style.display = isOpen ? 'none' : '';
  if (iconEl) iconEl.textContent = isOpen ? '▶ Show' : '▼ Hide';
  if (secEl) secEl.style.display = '';
}

function getStageDotClass(stage) {
  const m = {
    'Broadcasted':'dot-messaged',
    'Confirmed Interested':'dot-interested',
    'Called / Verified':'dot-interviewed',
    'For Employer Review':'dot-endorsed',
    'Interview Scheduled':'dot-interview',
    'Pending Requirements':'dot-endorsed',
    'Hired ✓':'dot-hired',
    'Rejected by Employer':'dot-dropped',
    'Rejected by Candidate':'dot-notint',
    'Dropped / Unavailable':'dot-dropped',
    'New / Uncontacted':'dot-default','Messaged':'dot-messaged','Interested':'dot-interested','Interview Completed':'dot-interviewed','Endorsed to Employer':'dot-endorsed',
  };
  return m[stage] || 'dot-default';
}
function getStagePillClass(stage) {
  const m = {
    'Broadcasted':'pill-messaged',
    'Confirmed Interested':'pill-interested',
    'Called / Verified':'pill-interviewed',
    'For Employer Review':'pill-endorsed',
    'Interview Scheduled':'pill-interview',
    'Pending Requirements':'pill-endorsed',
    'Hired ✓':'pill-hired',
    'Rejected by Employer':'pill-dropped',
    'Rejected by Candidate':'pill-notint',
    'Dropped / Unavailable':'pill-dropped',
    'New / Uncontacted':'pill-default','Messaged':'pill-messaged','Interested':'pill-interested','Interview Completed':'pill-interviewed','Endorsed to Employer':'pill-endorsed',
  };
  return m[stage] || 'pill-default';
}
function getEffectiveStage(ex, p) {
  if (ex.dispositionStage) return ex.dispositionStage;
  const s = ex.status   || (p ? p.status   : '') || '';
  const r = ex.response || (p ? p.response : '') || '';
  // New broadcast-flow status values
  if (s === 'Confirmed')              return 'Confirmed Interested';
  if (s === 'Called')                 return 'Called / Verified';
  if (s === 'For Employer Review')    return 'For Employer Review';
  if (s === 'Interview Scheduled')    return 'Interview Scheduled';
  if (s === 'Dropped / Unavailable')  return 'Dropped / Unavailable';
  if (s === 'Dropped / Rejected')     return 'Dropped / Unavailable';
  // Legacy status values
  if (s === 'Hired')          return 'Hired ✓';
  if (s === 'Dropped')        return 'Dropped / Unavailable';
  if (r === 'Not Interested') return 'Rejected by Candidate';
  if (s === 'Interviewed')    return 'Interview Scheduled';
  if (s === 'For Interview')  return 'Interview Scheduled';
  if (r === 'Interested')     return 'Confirmed Interested';
  if (s === 'Messaged')       return 'Broadcasted';
  if (s === 'Broadcasted')    return 'Broadcasted';
  if (p && p.source === 'broadcast') return 'Broadcasted';
  return '';
}
function getStatusDotClass(status, response) {
  if (response === 'Not Interested') return 'dot-notint';
  const m = {
    'Broadcasted':           'dot-messaged',
    'Confirmed':             'dot-interview',
    'Called':                'dot-interviewed',
    'Interview Scheduled':   'dot-interview',
    'For Employer Review':   'dot-interviewed',
    'Hired':                 'dot-hired',
    'Dropped / Unavailable': 'dot-dropped'
  };
  return m[status] || 'dot-default';
}
function getStatusPillClass(status, response) {
  if (response === 'Not Interested') return 'pill-notint';
  const m = {
    'Broadcasted':           'pill-messaged',
    'Confirmed':             'pill-interview',
    'Called':                'pill-interviewed',
    'Interview Scheduled':   'pill-interview',
    'For Employer Review':   'pill-interviewed',
    'Hired':                 'pill-hired',
    'Dropped / Unavailable': 'pill-dropped'
  };
  return m[status] || 'pill-default';
}

// STAGE SYSTEM ARCHITECTURE:
// Two fields coexist per placement row:
//   "Status" (ex.status) — 7-value broadcast-flow shorthand set by coordinators.
//   "Stage"  (ex.dispositionStage) — 8-value detailed disposition set explicitly.
// getEffectiveStage() reads dispositionStage FIRST; status is the legacy fallback.
// The pipeline funnel and analytics ALWAYS use getEffectiveStage() output.
// Coordinators should set the Stage dropdown for detailed tracking; the Status
// dropdown remains for quick updates and backward compatibility with existing data.
// 10-stage pipeline (7 active + 3 exit). Workflow order: top → bottom.
// "Called / Verified" is a required gate before For Employer Review (warn, not block).
// "Pending Requirements" sits between Interview Scheduled and Hired ✓; the
// employer has chosen the candidate but documents are still being gathered.
// A "Placement" only counts at Hired ✓ — Pending Requirements is still cancellable.
const DISPOSITION_STAGES = [
  'Broadcasted',
  'Confirmed Interested',
  'Called / Verified',
  'For Employer Review',
  'Interview Scheduled',
  'Pending Requirements',
  'Hired ✓',
  'Rejected by Employer',
  'Rejected by Candidate',
  'Dropped / Unavailable'
];

// Ordinal rank for active stages — used by the call-gate and duplicate-lock
// warnings. Exit stages are intentionally absent (they are terminal, not ranked).
const STAGE_RANK = {
  'Broadcasted': 1,
  'Confirmed Interested': 2,
  'Called / Verified': 3,
  'For Employer Review': 4,
  'Interview Scheduled': 5,
  'Pending Requirements': 6,
  'Hired ✓': 7
};

// Stage → derived legacy Status. Funnel, commission, and avg-days-to-place
// historically read extra.status; keep writing it for backward-compat, but it
// is now derived from Stage rather than user-edited. Pending Requirements
// derives 'Confirmed' so it stays below the Hired counting/commission threshold.
const STAGE_TO_STATUS = {
  'Broadcasted':            'Broadcasted',
  'Confirmed Interested':   'Confirmed',
  'Called / Verified':      'Called',
  'For Employer Review':    'For Employer Review',
  'Interview Scheduled':    'Interview Scheduled',
  'Pending Requirements':   'Confirmed',
  'Hired ✓':               'Hired',
  'Rejected by Employer':   'Dropped / Unavailable',
  'Rejected by Candidate':  'Dropped / Unavailable',
  'Dropped / Unavailable':  'Dropped / Unavailable'
};

// Standardised reasons surfaced on the row's exit-stage dropdown. Edit here
// to add/rename — the dropdown, the row badge, and the rejection-history
// side panels all read from this one list. "Other" must stay last; selecting
// it reveals a free-text input that persists separately in
// extra.rejectionReasonOther. Legacy saved reasons that aren't in this list
// are rendered as-is on the row and surface in the dropdown as "Other" with
// the legacy text pre-filled into the free-text box.
const REJECTION_REASONS = [
  'Candidate stopped responding / ghosted',
  'Candidate backed out after accepting',
  'Candidate no longer available',
  'Pay / location mismatch',
  'Failed requirements (NBI / ID / medical)',
  'Employer chose someone else',
  'Other'
];

// Swipe-to-remove plumbing for the placement rows in "CANDIDATES IN THIS JOB ORDER".
// Right-swipe (pointer moves right) past 60 px reveals a red Remove affordance.
// Pre-hire accidents commit on swipe + tap. Hired and Replacement records show
// an extra explicit confirm that names the stakes (fee record / guarantee linkage).
// Removal HARD-deletes the placement entry from manualPlacements — it does NOT
// set a Dropped stage and does NOT appear in any funnel bucket. The candidate
// record in the Google Sheet is untouched.
function _attachRowSwipe(row, wrap) {
  let startX = 0, startY = 0;
  let dragging = false;
  let active = false;
  let suppressClick = false;
  let pointerId = null;
  const OPEN_PX = 110;

  row.addEventListener('pointerdown', function(e) {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    startX = e.clientX; startY = e.clientY;
    dragging = false; active = true; pointerId = e.pointerId;
  });

  row.addEventListener('pointermove', function(e) {
    if (!active || e.pointerId !== pointerId) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    if (!dragging) {
      if (Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy) * 1.5) {
        dragging = true;
        wrap.classList.add('swipe-dragging');
        try { row.setPointerCapture(pointerId); } catch(err) {}
      } else if (Math.abs(dy) > 10) {
        active = false; return; // vertical scroll, bail
      } else {
        return;
      }
    }
    e.preventDefault();
    suppressClick = true;
    const base = wrap.classList.contains('swipe-open') ? OPEN_PX : 0;
    const next = Math.max(0, Math.min(OPEN_PX, base + dx));
    row.style.transform = 'translateX(' + next + 'px)';
  });

  function endDrag(e) {
    if (e.pointerId !== pointerId) return;
    if (dragging) {
      const dx = e.clientX - startX;
      const base = wrap.classList.contains('swipe-open') ? OPEN_PX : 0;
      const finalX = Math.max(0, Math.min(OPEN_PX, base + dx));
      row.style.transform = '';
      wrap.classList.remove('swipe-dragging');
      if (finalX > OPEN_PX / 2) wrap.classList.add('swipe-open');
      else wrap.classList.remove('swipe-open');
      try { row.releasePointerCapture(pointerId); } catch(err) {}
    }
    active = false; dragging = false; pointerId = null;
  }
  row.addEventListener('pointerup', endDrag);
  row.addEventListener('pointercancel', endDrag);

  // Beat existing onclick handlers (toggleProw, etc.) when the gesture was a drag.
  row.addEventListener('click', function(e) {
    if (suppressClick) {
      e.stopPropagation();
      e.preventDefault();
      suppressClick = false;
      return;
    }
    if (wrap.classList.contains('swipe-open')) {
      // Tapping the row while the affordance is showing closes it instead of toggling open.
      wrap.classList.remove('swipe-open');
      e.stopPropagation();
      e.preventDefault();
    }
  }, true);
}

function _confirmRemovePlacement(pid) {
  const idx = manualPlacements.findIndex(function(p) { return p.placementId === pid; });
  if (idx < 0) {
    showToast('Cannot remove this placement — record not in manual placements (legacy or Sheet-sourced).', 'red');
    return;
  }
  const p = manualPlacements[idx];
  const candName = p.candidateName || '(unknown candidate)';
  const joId = p.jobOrderId;
  const jo = jobOrders.find(function(j) { return j.id === joId; });

  let ex = {}; try { ex = JSON.parse(localStorage.getItem('prow_extra_' + pid) || '{}'); } catch(e) {}
  const stage = getEffectiveStage(ex, p);
  const isHired = stage === 'Hired ✓';
  const isReplacement = p.isReplacement === true;

  const lines = [];
  if (isHired) {
    let hd = {}; try { hd = JSON.parse(localStorage.getItem('hire_data_' + pid) || '{}'); } catch(e) {}
    const feeRaw = hd.feeAmount || (jo && jo.feeAmount) || '';
    const feeStr = feeRaw ? ('₱' + String(feeRaw).replace(/^[₱$]+/, '')) : '(no fee recorded)';
    lines.push('This is a HIRED placement: ' + candName + ' — fee ' + feeStr + '.');
    lines.push('');
    lines.push('Removing it will:');
    lines.push('  • Erase the placement from this job order');
    lines.push('  • Remove it from your Placements total');
    lines.push('  • Erase the fee record');
    lines.push('');
    lines.push('This is NOT the same as marking the candidate Dropped — there will be no history of it.');
  }
  if (isReplacement) {
    const origPid = p.replacementFor || '';
    const orig = origPid ? manualPlacements.find(function(x) { return x.placementId === origPid; }) : null;
    const origLabel = orig ? (orig.candidateName + ' (' + origPid + ')') : (origPid || 'unknown original');
    if (lines.length) lines.push('');
    else {
      lines.push('Remove ' + candName + ' from this job order? Only the placement record is deleted; the candidate stays in the system.');
      lines.push('');
    }
    lines.push('REPLACEMENT WARNING — this record is the replacement for: ' + origLabel + '.');
    lines.push('Removing it will:');
    lines.push('  • Break the replacementFor linkage to the original');
    lines.push('  • Leave the original placement guarantee in a closed-but-orphaned state that may need to be manually re-issued or fixed');
  }

  if (!lines.length) {
    // Plain pre-hire accident: swipe + tap is already the confirm. Just remove.
    _removePlacement(idx);
    return;
  }
  lines.push('');
  lines.push('Proceed?');
  if (confirm(lines.join('\n'))) {
    _removePlacement(idx);
  }
}

function _removePlacement(idx) {
  const p = manualPlacements[idx];
  manualPlacements.splice(idx, 1);
  saveManualPlacements();
  showToast('Removed ' + (p.candidateName || 'placement') + ' from this job order. The candidate is still in the system.', 'green');
  renderJobOrders([...placements, ...manualPlacements]);
}

function createPlacementRow(p, idx, joId) {
  const pid = p.placementId || `${joId}_${p.candidateId}_${idx}`;
  const isReplacement = p.isReplacement === true;
  const noteKey = `${joId}_${p.candidateId}`;
  const extraKey = `prow_extra_${pid}`;

  // Load extra saved data (followup date, last contacted, interview date, notes)
  let extra = {};
  try { extra = JSON.parse(localStorage.getItem(extraKey) || '{}'); } catch(e){}

  const savedNote     = extra.notes    || candidateNotes[noteKey] || p.notes    || '';
  const savedResponse = extra.response || p.response || 'No Response';
  // Always-on dashboard. Split: input prefill (manual field only) vs. contact-signal date.
  // p.date is NOT a contact signal — it is set by broadcasting.
  const lastContactedInputValue = extra.lastContacted || '';
  const contactSignalDate = extra.lastDirectContactAt || extra.lastContacted || '';
  const lastContacted = contactSignalDate; // kept for downstream local references
  const interviewDate = extra.interviewDate || '';

  // Stage is canonical. ex.status is still WRITTEN by onStageChanged for the
  // Hired-flow filters that read it; we just don't surface it in the row UI.
  const savedStage = getEffectiveStage(extra, p);

  const isExitStage = ['Dropped / Unavailable','Rejected by Employer','Rejected by Candidate'].includes(savedStage);
  const isHiredStage = savedStage === 'Hired ✓';
  const isInactive = isExitStage || isHiredStage;
  // Pipeline-field visibility — Stage drives everything; Response and Last
  // Contacted are pre-confirm tracking only and disappear once the candidate
  // has moved past the calling/verification phase or out of the active pipeline.
  const showResponse      = !isExitStage && !isHiredStage && savedStage !== 'Interview Scheduled' && savedStage !== 'Pending Requirements';
  const showLastContacted = !isExitStage && !isHiredStage;
  const dotClass   = getStageDotClass(savedStage);
  const pillClass  = getStagePillClass(savedStage);
  const pillLabel  = savedStage || 'New';

  // "Broadcast only" badge — true when no real contact (Call or DM via the
  // canonical paths) has been logged. The broadcast walker never stamps
  // lastDirectContactAt, only the Call Modal and the walker's "Log DM sent"
  // button do. Mirrors the Calls-tab "broadcast · never called" vocabulary.
  const isBroadcastOnly = !extra.lastDirectContactAt && !isInactive;

  // Show interview date field for interview-related stages
  const showInterview = ['Interview Scheduled','Interview Completed'].includes(savedStage);

  const row = document.createElement('div');
  row.className = `prow${isInactive ? ' prow-inactive' : ''}`;
  // Color-coded left border by pipeline stage
  const stageBorderColors = {
    'Broadcasted':           '3px solid rgba(100,116,139,.45)',
    'Confirmed Interested':  '3px solid rgba(37,99,235,.6)',
    'Called / Verified':     '3px solid rgba(37,99,235,.5)',
    'Called':                '3px solid rgba(37,99,235,.4)',
    'Confirmed':             '3px solid rgba(37,99,235,.4)',
    'For Employer Review':   '3px solid rgba(124,58,237,.6)',
    'Interview Scheduled':   '3px solid rgba(234,88,12,.6)',
    'Pending Requirements':  '3px solid rgba(124,58,237,.5)',
    'Hired ✓':              '3px solid rgba(22,163,74,.7)',
    'Rejected by Employer':  '3px solid rgba(100,116,139,.3)',
    'Rejected by Candidate': '3px solid rgba(100,116,139,.3)',
    'Dropped / Unavailable': '3px solid rgba(100,116,139,.3)',
  };
  if (isReplacement) {
    row.style.borderLeft = '3px solid var(--orange)';
  } else if (stageBorderColors[savedStage]) {
    row.style.borderLeft = stageBorderColors[savedStage];
  }
  row.id = `prow-${pid}`;

  const contactVia = extra.contactVia || '';
  const savedRejReason = extra.rejectionReason     || '';
  const savedRejOther  = extra.rejectionReasonOther || '';
  // Reason field now reveals for every exit stage, not just the explicitly-Rejected ones.
  const showRejReason  = isExitStage;
  // Legacy-value handling: if the saved reason isn't in the current list,
  // present it in the dropdown as "Other" and pre-fill the free-text with the
  // original string so it stays visible. Saved data is untouched until the
  // coordinator picks a new option.
  const _rejInList     = !savedRejReason || REJECTION_REASONS.indexOf(savedRejReason) >= 0;
  const effectiveRejDropdown = _rejInList ? savedRejReason : 'Other';
  const effectiveRejOther    = savedRejOther || (_rejInList ? '' : savedRejReason);
  const showRejOther   = effectiveRejDropdown === 'Other';
  // Short label for the collapsed row badge — surfaces WHY without expanding.
  // Known reason: full text. Other: truncated free-text (or just "Other"
  // if none). Legacy string not in the list: rendered as-is.
  const _rejBadge = (() => {
    if (!isExitStage || !savedRejReason) return '';
    if (savedRejReason === 'Other') {
      if (!savedRejOther) return 'Other';
      return savedRejOther.length > 40 ? savedRejOther.slice(0, 38) + '…' : savedRejOther;
    }
    return savedRejReason;
  })();

  // Always-on dashboard. Stale detection now uses the direct-contact signal
  // (call logged or DM logged), falling back to the manual lastContacted date.
  // Broadcast-only candidates intentionally have no signal here.
  const effectiveLastContact = extra.lastDirectContactAt || extra.lastContacted || '';
  const fmtLastContact = effectiveLastContact ? fmtDateShort(effectiveLastContact) : '';
  const staleDays = (savedResponse === 'No Response' || savedResponse === '') && effectiveLastContact
    ? daysDiff(effectiveLastContact) : 0;

  // Auto-mark as No Response if 14+ days stale (save silently).
  // Skip when the candidate has advanced past the call gate or has exited
  // the active funnel. Gate on Stage RANK, not status strings — the previous
  // status-string match for 'Interviewed' rotted after the Stage rework and
  // silently auto-marked Interview Scheduled candidates as No Response.
  // STAGE_RANK lookup misses (legacy unstaged rows, exit stages) coerce to 0;
  // exit stages are caught separately via isExitStage so they still skip.
  const _stageRank = STAGE_RANK[savedStage] || 0;
  const _skipAutoMark = isExitStage || _stageRank >= STAGE_RANK['Called / Verified'];
  if (staleDays >= 14 && savedResponse !== 'Not Interested' && !_skipAutoMark) {
    if (!extra.autoMarkedNoResp) {
      extra.autoMarkedNoResp = true;
      extra.response = 'No Response';
      localStorage.setItem(`prow_extra_${pid}`, JSON.stringify(extra));
      fbSync('prow_extras/' + pid, extra);
    }
  }

  row.innerHTML = `
    <div class="prow-header" onclick="toggleProw('${escAttr(pid)}')">
      <div class="prow-status-dot ${dotClass}"></div>
      <div style="flex:1;min-width:0">
        <div style="display:flex;align-items:center;gap:6px">
          <div class="prow-name">${escHtml(p.candidateName)}</div>
          ${isReplacement ? '<span style="font-size:10px;font-weight:700;padding:2px 8px;border-radius:99px;background:var(--orange-dim);color:var(--orange);border:1px solid rgba(234,88,12,.3)">Replacement</span>' : ''}
          <button class="prow-profile-btn" onclick="event.stopPropagation();openCandModalByName('${escAttr(p.candidateName)}','${escAttr(p.candidateId)}')" title="View profile">Profile</button>
        </div>
        <div class="prow-id">${escHtml(p.candidateId)}${fmtLastContact ? ' · ' + escHtml(fmtLastContact) : ''}</div>
      </div>
      <div class="prow-badges">
        ${isBroadcastOnly ? '<span style="font-size:9px;font-weight:800;background:rgba(220,38,38,.12);color:var(--red);border:1px solid rgba(220,38,38,.4);border-radius:6px;padding:1px 6px;text-transform:uppercase;letter-spacing:.4px">broadcast only</span>' : ''}
        ${staleDays >= 14 ? `<span class="prow-stale-badge">${staleDays}d no reply</span>` : ''}
        ${contactVia ? `<span class="prow-via-badge">${escHtml(contactVia)}</span>` : ''}
        <span class="prow-status-pill ${pillClass}">${escHtml(pillLabel)}</span>
        ${_rejBadge ? `<span style="font-size:10px;font-weight:600;background:var(--red-dim);color:var(--red);border:1px solid rgba(220,38,38,.35);border-radius:6px;padding:1px 7px;max-width:180px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${escAttr(savedRejReason === 'Other' ? (savedRejOther || 'Other') : savedRejReason)}">${escHtml(_rejBadge)}</span>` : ''}
        <button class="prow-bl-btn" onclick="event.stopPropagation();prowBlacklist('${escAttr(p.candidateId)}','${escAttr(p.candidateName)}')" title="Blacklist">Block</button>
        <span class="prow-chevron">▾</span>
      </div>
    </div>
    <div class="prow-body">
      <div class="prow-fields">
        <div class="prow-field" id="resp-field-${escAttr(pid)}"${showResponse ? '' : ' style="display:none"'}>
          <div class="prow-field-label">Response</div>
          <select onchange="saveProwField('${escAttr(pid)}','response',this.value,this)">
            ${['No Response','Interested','Not Interested'].map(v=>`<option${v===savedResponse?' selected':''}>${v}</option>`).join('')}
          </select>
        </div>
        <div class="prow-field">
          <div class="prow-field-label">Contacted Via</div>
          <select onchange="saveProwExtra('${escAttr(pid)}','contactVia',this.value);updateViaDisplay(this,'${escAttr(pid)}')">
            ${['','Phone Call','SMS/Text','Facebook Messenger','Gmail'].map(v=>`<option${v===contactVia?' selected':''}>${v}</option>`).join('')}
          </select>
        </div>
        <div class="prow-field" id="lc-field-${escAttr(pid)}"${showLastContacted ? '' : ' style="display:none"'}>
          <div class="prow-field-label">Last Contacted</div>
          <input type="date" value="${escAttr(lastContactedInputValue)}"
            onchange="saveProwExtra('${escAttr(pid)}','lastContacted',this.value)">
        </div>
      </div>

      <div class="prow-fields" style="margin-top:8px">
        <div class="prow-field">
          <div class="prow-field-label">Stage</div>
          <select id="stage-sel-${escAttr(pid)}" onchange="onStageChanged('${escAttr(pid)}',this.value)">
            <option value="">-- Select --</option>
            ${DISPOSITION_STAGES.map(v=>`<option${v===savedStage?' selected':''}>${v}</option>`).join('')}
          </select>
        </div>
        <div class="prow-field" id="rej-reason-field-${escAttr(pid)}"${showRejReason?'':' style="display:none"'}>
          <div class="prow-field-label" style="color:var(--red)">Rejection Reason</div>
          ${createCustomSelect({
            id: 'rej-reason-sel-' + pid,
            options: [{value:'', label:'-- Select --'}].concat(
              REJECTION_REASONS.map(function(v) { return {value: v, label: v}; })
            ),
            value: effectiveRejDropdown,
            placeholder: '-- Select --',
            onchange: function(value) {
              saveProwExtra(pid, 'rejectionReason', value);
              refreshRejOther(pid);
            }
          })}
          <input type="text" id="rej-other-${escAttr(pid)}" value="${escAttr(effectiveRejOther)}" placeholder="Specify reason..."
            onchange="saveProwExtra('${escAttr(pid)}','rejectionReasonOther',this.value)"
            style="margin-top:4px${showRejOther?'':';display:none'}">
        </div>
      </div>

      <div class="prow-fields" style="margin-top:8px">
        ${showInterview ? `
        <div class="prow-field prow-interview-field">
          <div class="prow-field-label" style="color:var(--purple)">Interview Date</div>
          <input type="date" value="${escAttr(interviewDate)}"
            onchange="saveProwExtra('${escAttr(pid)}','interviewDate',this.value)">
        </div>` : ''}
        <div class="prow-field${showInterview?'':' full'}">
          <div class="prow-field-label">Notes</div>
          <input type="text" value="${escAttr(savedNote)}" placeholder="Add notes…"
            onchange="saveProwExtra('${escAttr(pid)}','notes',this.value);saveNote('${escAttr(noteKey)}',this.value)">
        </div>
      </div>

      <div style="margin-top:10px">
        <button class="btn btn-blue" style="width:100%" onclick="openCandModalByName('${escAttr(p.candidateName)}','${escAttr(p.candidateId)}')">View Full Candidate Profile</button>
      </div>
    </div>
  `;

  // Wrap so the row can be right-swiped to reveal a Remove affordance.
  const wrap = document.createElement('div');
  wrap.className = 'prow-swipe-wrap';
  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.className = 'prow-remove-affordance';
  removeBtn.textContent = 'Remove';
  removeBtn.title = 'Remove this placement from this job order (does not delete the candidate)';
  removeBtn.onclick = function(e) {
    e.stopPropagation();
    wrap.classList.remove('swipe-open');
    _confirmRemovePlacement(pid);
  };
  wrap.appendChild(removeBtn);
  wrap.appendChild(row);
  _attachRowSwipe(row, wrap);
  return wrap;
}

function toggleProw(pid) {
  const el = document.getElementById(`prow-${pid}`);
  if (el) el.classList.toggle('open');
}

function toggleJD(id) {
  const el = document.getElementById(id);
  const ch = document.getElementById(id + '-chevron');
  if (!el) return;
  const open = el.style.display === 'none';
  el.style.display = open ? 'block' : 'none';
  if (ch) ch.style.transform = open ? 'rotate(180deg)' : '';
}

function saveProwExtra(pid, field, value) {
  const key = `prow_extra_${pid}`;
  let extra = {};
  try { extra = JSON.parse(localStorage.getItem(key) || '{}'); } catch(e){}
  extra[field] = value;
  _lsSet(key, extra);
  fbSyncDebounced('prow_extras/' + pid, extra);
}

function refreshProwBody(pid) {
  // Re-render just the interview field visibility based on new status
  const row = document.getElementById(`prow-${pid}`);
  if (!row) return;
  const statusSel = document.getElementById(`status-sel-${pid}`);
  const newStatus = statusSel?.value || '';
  const interviewField = row.querySelector('.prow-interview-field');
  const showInterview = ['Interview Scheduled','For Interview','Interviewed'].includes(newStatus);
  if (interviewField) {
    interviewField.style.display = showInterview ? '' : 'none';
  }
}

function refreshProwStage(pid) {
  // Reason field now reveals for every exit stage (including Dropped / Unavailable).
  const stageSel = document.getElementById('stage-sel-' + pid);
  const rejField = document.getElementById('rej-reason-field-' + pid);
  if (!stageSel || !rejField) return;
  const stage = stageSel.value;
  const isExit = ['Rejected by Employer','Rejected by Candidate','Dropped / Unavailable'].includes(stage);
  rejField.style.display = isExit ? '' : 'none';
  if (!isExit) {
    const rejSel = document.getElementById('rej-reason-sel-' + pid);
    if (rejSel) {
      if (rejSel.classList.contains('cs-wrap')) setCustomSelectValue('rej-reason-sel-' + pid, '');
      else rejSel.value = '';
    }
    const rejOther = document.getElementById('rej-other-' + pid);
    if (rejOther) rejOther.style.display = 'none';
  }
}

// Show/hide Response and Last Contacted based on Stage. Called after every
// Stage change so the form follows the new disposition.
function refreshProwFields(pid) {
  const sel = document.getElementById('stage-sel-' + pid);
  if (!sel) return;
  const stage = sel.value;
  const isExit  = ['Dropped / Unavailable','Rejected by Employer','Rejected by Candidate'].includes(stage);
  const isHired = stage === 'Hired ✓';
  const isInterviewOrPending = stage === 'Interview Scheduled' || stage === 'Pending Requirements';
  const showResp     = !isExit && !isHired && !isInterviewOrPending;
  const showLC       = !isExit && !isHired;
  const setVis = (id, visible) => { const el = document.getElementById(id); if (el) el.style.display = visible ? '' : 'none'; };
  setVis('resp-field-' + pid, showResp);
  setVis('lc-field-'   + pid, showLC);
}

// Sync the prow-inactive dim class from the current Stage. Exit stages and
// Hired ✓ both dim the row.
function refreshProwInactivity(pid) {
  const row = document.getElementById('prow-' + pid);
  if (!row) return;
  const sel = document.getElementById('stage-sel-' + pid);
  const stage = sel ? sel.value : '';
  const inactive = ['Dropped / Unavailable','Hired ✓','Rejected by Employer','Rejected by Candidate'].includes(stage);
  row.classList.toggle('prow-inactive', inactive);
}

// Stage transitions that have non-UI side effects. Moved out of the legacy
// saveProwField status path so transitions written programmatically (e.g.
// interview session completion) also trigger them. Verified call sites:
//   • Hired ✓                 → computeAndSaveCommission(pid, jobOrderId)
//   • Interview Scheduled     → addCandidateToInterviewSession(jobOrderId, pid)
function _applyStageSideEffects(pid, newStage) {
  const mp = manualPlacements.find(function(p) { return p.placementId === pid; });
  if (!mp) return;
  if (newStage === 'Hired ✓') {
    computeAndSaveCommission(pid, mp.jobOrderId);
  }
  if (newStage === 'Interview Scheduled') {
    addCandidateToInterviewSession(mp.jobOrderId, pid);
  }
}

// Canonical Stage onchange. Writes dispositionStage, derives Status from
// STAGE_TO_STATUS and mirrors it into manualPlacements + extras for backward
// compatibility with the funnel / commission / avg-days-to-place filters, then
// fires stage-transition side effects and refreshes all visibility.
function onStageChanged(pid, newStage) {
  // Capture the prior canonical stage BEFORE any save so we can revert the
  // select if the §D call-gate or §E duplicate-lock warning is cancelled.
  let _priorStage = '';
  try { _priorStage = (JSON.parse(localStorage.getItem('prow_extra_' + pid) || '{}').dispositionStage) || ''; } catch(_e) {}
  const _revertSelect = function() {
    const sel = document.getElementById('stage-sel-' + pid);
    if (sel) sel.value = _priorStage;
  };

  // §D — Call gate: warn (do not block) when endorsing to employer without a
  // prior Called / Verified pass. Required gate by policy; allow override.
  if (newStage === 'For Employer Review') {
    const priorRank = STAGE_RANK[_priorStage] || 0;
    if (priorRank < STAGE_RANK['Called / Verified']) {
      if (!confirm("This candidate hasn't been Called / Verified yet. Endorse to employer anyway?")) {
        _revertSelect();
        return;
      }
    }
  }

  // §E — Duplicate-lock: warn (do not block) when advancing this candidate
  // past Confirmed Interested on a JO while they are already at
  // Called / Verified or beyond on another JO. Surface the conflict JO + stage
  // so the coordinator can decide; allow override.
  const newRank = STAGE_RANK[newStage] || 0;
  if (newRank > STAGE_RANK['Confirmed Interested']) {
    const mp = manualPlacements.find(function(p) { return p.placementId === pid; });
    if (mp) {
      const conflicts = [...placements, ...manualPlacements]
        .filter(function(x) { return x.candidateId === mp.candidateId && x.jobOrderId !== mp.jobOrderId; })
        .map(function(x) {
          const pidOther = x.placementId || x.candidateId;
          let exOther = {}; try { exOther = JSON.parse(localStorage.getItem('prow_extra_' + pidOther) || '{}'); } catch(_e) {}
          const stageOther = getEffectiveStage(exOther, x);
          const rankOther = STAGE_RANK[stageOther] || 0;
          return rankOther >= STAGE_RANK['Called / Verified'] ? { joId: x.jobOrderId, stage: stageOther } : null;
        })
        .filter(Boolean);
      if (conflicts.length > 0) {
        const lines = conflicts.map(function(c) { return '  • ' + c.joId + ' — ' + c.stage; }).join('\n');
        if (!confirm('This candidate is already in advanced stage on another job order:\n' + lines + '\n\nContinue?')) {
          _revertSelect();
          return;
        }
      }
    }
  }

  saveProwExtra(pid, 'dispositionStage', newStage);

  // Derive Status from Stage (Pending Requirements derives 'Confirmed' so it
  // stays below the Hired counting threshold).
  const derived = STAGE_TO_STATUS[newStage];
  if (derived !== undefined) {
    const statusSel = document.getElementById('status-sel-' + pid);
    if (statusSel) statusSel.value = derived;
    const mp = manualPlacements.find(function(p) { return p.placementId === pid; });
    if (mp && mp.status !== derived) {
      mp.status = derived;
      saveManualPlacements();
    }
    saveProwExtra(pid, 'status', derived);
  }

  _applyStageSideEffects(pid, newStage);

  // Mirror the Response='Interested' Call-Queue trigger: when a candidate
  // is moved into 'Confirmed Interested' via the Stage dropdown (a path
  // that previously bypassed addToCallQueue), queue them for a first call.
  // Idempotent — addToCallQueue itself skips if already queued. Skipped
  // entirely if the candidate has already been directly contacted (call/DM
  // logged), since hasBeenContacted=true means a first call isn't needed.
  if (newStage === 'Confirmed Interested') {
    const _mpQueue = manualPlacements.find(function(p) { return p.placementId === pid; });
    if (_mpQueue && !hasBeenContacted(_mpQueue.candidateId)) {
      // addToCallQueue dedupes per (candidate, job order), so re-queueing the
      // same JO is a no-op while a different JO correctly adds its own entry.
      addToCallQueue(_mpQueue.candidateId, _mpQueue.jobOrderId, pid);
    }
  }

  // UI refresh
  refreshProwStage(pid);
  refreshProwFields(pid);
  refreshProwInactivity(pid);

  // Header dot + pill follow the new stage
  const row = document.getElementById('prow-' + pid);
  if (row) {
    const dot  = row.querySelector('.prow-status-dot');
    const pill = row.querySelector('.prow-status-pill');
    if (dot)  dot.className  = 'prow-status-dot '  + getStageDotClass(newStage);
    if (pill) {
      pill.className   = 'prow-status-pill ' + getStagePillClass(newStage);
      pill.textContent = newStage || 'New';
    }
  }
}

function refreshRejOther(pid) {
  const sel = document.getElementById('rej-reason-sel-' + pid);
  const otherInput = document.getElementById('rej-other-' + pid);
  if (!sel || !otherInput) return;
  // Works for both native <select> (sel.value) and the custom dropdown
  // (.cs-wrap with data-value). Stays backward-compatible during rollout.
  const val = sel.classList.contains('cs-wrap') ? (sel.dataset.value || '') : sel.value;
  otherInput.style.display = val === 'Other' ? '' : 'none';
}

// ═══════════════════════════════════════════════
// BLACKLIST FROM JOB ORDER ROW
// ═══════════════════════════════════════════════
function prowBlacklist(candId, candName) {
  openBlacklistModal(candId, candName);
}

// ═══════════════════════════════════════════════
// CUSTOM DROPDOWN COMPONENT (cs-*)
// ─────────────────────────────────────────────────
// Themable replacement for native <select> popups (which OS-style on light
// theme). createCustomSelect() returns the trigger HTML and registers the
// option list + onchange in _csRegistry. The popup itself is portalled to
// <body> on open so it isn't clipped by overflow:hidden ancestors.
//
//   var html = createCustomSelect({
//     id:       'my-dropdown',
//     options:  [{value:'a', label:'Alpha'}, {value:'b', label:'Beta'}],
//     value:    'a',
//     placeholder: '-- Select --',
//     onchange: function(newValue) { ... }
//   });
//   // Read:  document.getElementById('my-dropdown').dataset.value
//   // Write: setCustomSelectValue('my-dropdown', 'b')   (doesn't fire onchange)
// ═══════════════════════════════════════════════
var _csRegistry = {};       // id → { options, onchange, placeholder }
var _csCurrentOpen = null;  // id of currently open dropdown
var _csHlIdx = 0;           // index of keyboard-highlighted option

function createCustomSelect(opts) {
  // Close any stale popup for the same id (row may be re-rendering)
  if (_csCurrentOpen === opts.id) csClose();
  _csRegistry[opts.id] = {
    options:     opts.options || [],
    onchange:    opts.onchange,
    placeholder: opts.placeholder || '-- Select --'
  };
  var cur = (opts.options || []).find(function(o) { return o.value === (opts.value || ''); });
  var label = cur ? cur.label : (opts.placeholder || '-- Select --');
  return '<div class="cs-wrap" id="' + escAttr(opts.id) + '" data-value="' + escAttr(opts.value || '') + '">' +
    '<button type="button" class="cs-trigger" onclick="csToggle(\'' + escAttr(opts.id) + '\')">' +
      '<span class="cs-label">' + escHtml(label) + '</span>' +
      '<span class="cs-chevron">&#9662;</span>' +
    '</button>' +
  '</div>';
}

function csToggle(id) {
  if (_csCurrentOpen === id) { csClose(); return; }
  csOpen(id);
}

function csOpen(id) {
  csClose();
  var wrap  = document.getElementById(id);
  var entry = _csRegistry[id];
  if (!wrap || !entry) return;
  var current = wrap.getAttribute('data-value') || '';

  var popup = document.createElement('div');
  popup.className = 'cs-popup';
  popup.id = '_cs_popup_' + id;
  popup.innerHTML = entry.options.map(function(o, i) {
    var sel = o.value === current;
    return '<div class="cs-option' + (sel ? ' sel' : '') + '" data-idx="' + i + '" ' +
      'onmouseenter="csHl(' + i + ')" ' +
      'onclick="csPick(\'' + escAttr(id) + '\',' + i + ')">' +
      '<span>' + escHtml(o.label) + '</span>' +
      (sel ? '<span class="cs-check">&#10003;</span>' : '') +
    '</div>';
  }).join('');
  document.body.appendChild(popup);

  _csCurrentOpen = id;
  wrap.classList.add('cs-open');
  csReposition();

  var curIdx = entry.options.findIndex(function(o) { return o.value === current; });
  _csHlIdx = curIdx >= 0 ? curIdx : 0;
  csHl(_csHlIdx);
}

function csClose() {
  if (!_csCurrentOpen) return;
  var popup = document.getElementById('_cs_popup_' + _csCurrentOpen);
  var wrap  = document.getElementById(_csCurrentOpen);
  if (popup) popup.remove();
  if (wrap)  wrap.classList.remove('cs-open');
  _csCurrentOpen = null;
}

// Anchors popup below the trigger; flips above when there isn't room;
// nudges back from the right edge on narrow viewports.
function csReposition() {
  if (!_csCurrentOpen) return;
  var wrap  = document.getElementById(_csCurrentOpen);
  var popup = document.getElementById('_cs_popup_' + _csCurrentOpen);
  if (!wrap || !popup) return;
  var trigger = wrap.querySelector('.cs-trigger');
  var rect = trigger.getBoundingClientRect();
  popup.style.minWidth = rect.width + 'px';
  var ph = popup.offsetHeight;
  var spaceBelow = window.innerHeight - rect.bottom;
  popup.style.top = (spaceBelow < ph + 12 && rect.top > ph + 12)
    ? (rect.top - 4 - ph) + 'px'
    : (rect.bottom + 4) + 'px';
  var pw = popup.offsetWidth;
  var maxLeft = window.innerWidth - pw - 8;
  popup.style.left = Math.min(rect.left, Math.max(8, maxLeft)) + 'px';
}

function csHl(idx) {
  if (!_csCurrentOpen) return;
  var popup = document.getElementById('_cs_popup_' + _csCurrentOpen);
  if (!popup) return;
  var opts = popup.querySelectorAll('.cs-option');
  for (var i = 0; i < opts.length; i++) {
    if (i === idx) opts[i].classList.add('hl');
    else           opts[i].classList.remove('hl');
  }
  _csHlIdx = idx;
}

function csPick(id, idx) {
  var entry = _csRegistry[id];
  var wrap  = document.getElementById(id);
  if (!entry || !wrap) return;
  var opt = entry.options[idx];
  if (!opt) return;
  wrap.setAttribute('data-value', opt.value);
  var lbl = wrap.querySelector('.cs-label');
  if (lbl) lbl.textContent = opt.label;
  csClose();
  if (typeof entry.onchange === 'function') entry.onchange(opt.value);
}

function setCustomSelectValue(id, value) {
  var entry = _csRegistry[id];
  var wrap  = document.getElementById(id);
  if (!entry || !wrap) return;
  var opt = entry.options.find(function(o) { return o.value === value; });
  if (!opt) return;
  wrap.setAttribute('data-value', value);
  var lbl = wrap.querySelector('.cs-label');
  if (lbl) lbl.textContent = opt.label;
}

// Outside click closes (capture phase so trigger's own click doesn't fire it)
document.addEventListener('click', function(e) {
  if (!_csCurrentOpen) return;
  var wrap  = document.getElementById(_csCurrentOpen);
  var popup = document.getElementById('_cs_popup_' + _csCurrentOpen);
  if (wrap  && wrap.contains(e.target))  return;
  if (popup && popup.contains(e.target)) return;
  csClose();
}, true);

// Esc/Arrow/Enter — Esc closes always; arrows + Enter ignored while typing.
document.addEventListener('keydown', function(e) {
  if (!_csCurrentOpen) return;
  var entry = _csRegistry[_csCurrentOpen];
  if (!entry) return;
  if (e.key === 'Escape') { e.preventDefault(); csClose(); return; }
  var ae = document.activeElement;
  if (ae && (ae.tagName === 'INPUT' || ae.tagName === 'TEXTAREA' || ae.isContentEditable)) return;
  if (e.key === 'ArrowDown') { e.preventDefault(); csHl((_csHlIdx + 1) % entry.options.length); return; }
  if (e.key === 'ArrowUp')   { e.preventDefault(); csHl((_csHlIdx - 1 + entry.options.length) % entry.options.length); return; }
  if (e.key === 'Enter')     { e.preventDefault(); csPick(_csCurrentOpen, _csHlIdx); return; }
});

// Reposition on scroll/resize while open (capture catches nested scrolls)
window.addEventListener('scroll', function() { csReposition(); }, true);
window.addEventListener('resize', function() { csReposition(); });

// ═══════════════════════════════════════════════
// REMINDER BANNER
// ═══════════════════════════════════════════════
function showToast(msg, type='gold') {
  const colors = { gold:'var(--gold)', orange:'var(--orange)', green:'var(--green)', red:'var(--red)' };
  const toast = document.createElement('div');
  toast.style.cssText = `
    position:fixed;bottom:24px;right:24px;z-index:9999;
    background:var(--card);border:1px solid ${colors[type]||colors.gold};
    color:var(--text);padding:12px 18px;border-radius:12px;
    font-family:var(--sans);font-size:13px;font-weight:600;
    box-shadow:0 8px 32px rgba(0,0,0,0.5);
    max-width:320px;line-height:1.4;
    animation:fadeUp .3s ease;
    cursor:pointer;
  `;
  toast.textContent = msg;
  toast.onclick = () => toast.remove();
  document.body.appendChild(toast);
  setTimeout(() => { if(toast.parentNode) toast.style.opacity='0'; toast.style.transition='opacity .5s'; setTimeout(()=>toast.remove(),500); }, 6000);
}

function buildReminderBanner() {
  const banner = document.getElementById('reminder-banner');
  if (!banner) return;

  const today = new Date();
  today.setHours(0,0,0,0);
  const tomorrow = new Date(today); tomorrow.setDate(today.getDate()+1);

  const allPlacements = [...placements, ...manualPlacements];
  const items = [];

  allPlacements.forEach(p => {
    // Skip blacklisted, dropped, hired, not interested
    if (blacklist[p.candidateId]) return;

    const pid = p.placementId || p.candidateId;
    let extra = {};
    try { extra = JSON.parse(localStorage.getItem(`prow_extra_${pid}`) || '{}'); } catch(e){}

    const savedResponse = extra.response || p.response || '';
    const savedStatus   = extra.status   || p.status   || '';
    if (savedStatus === 'Dropped / Unavailable' || savedStatus === 'Dropped' || savedStatus === 'Hired' || savedResponse === 'Not Interested') return;

    // Always-on dashboard. Briefing stale alert needs a real contact signal.
    const lastContact = extra.lastDirectContactAt || extra.lastContacted || '';
    const interviewDate = extra.interviewDate || '';
    const jo = jobOrders.find(j => j.id === p.jobOrderId);
    const joLabel = jo ? `${jo.position} @ ${jo.company}` : p.jobOrderId;

    // Interview today or tomorrow
    if (interviewDate) {
      const iDate = new Date(interviewDate); iDate.setHours(0,0,0,0);
      if (iDate.getTime() === today.getTime()) {
        items.push({ icon:'cal', type:'interview-today', name: p.candidateName, detail:'Interview TODAY — ' + joLabel, badge:'Today', badgeClass:'rb-purple', pid });
      } else if (iDate.getTime() === tomorrow.getTime()) {
        items.push({ icon:'cal', type:'interview-tmr', name: p.candidateName, detail:'Interview TOMORROW — ' + joLabel, badge:'Tomorrow', badgeClass:'rb-blue', pid });
      }
    }

    // Auto-flag: broadcast 3+ days ago, no response. This stage-derived alert
    // replaces the old manual extra.followupDate reminder — coordinators no
    // longer set follow-up dates on the prow row; staleness is computed from
    // the contact-signal date instead.
    const daysSince = lastContact ? daysDiff(lastContact) : 0;
    if (daysSince >= 3 && (savedResponse === 'No Response' || savedResponse === '') && savedStatus === 'Broadcasted') {
      items.push({ icon:'alert', type:'stale', name: p.candidateName, detail:'No response for ' + daysSince + 'd — ' + joLabel, badge: daysSince + 'd', badgeClass: daysSince >= 14 ? 'rb-red' : 'rb-orange', pid });
    }
  });

  // Sort: interview today first, then stale by days
  const typeOrder = {'interview-today':0,'interview-tmr':1,'stale':3};
  items.sort((a,b) => (typeOrder[a.type]??9) - (typeOrder[b.type]??9));

  banner.classList.remove('hidden');

  const todayStr = today.toLocaleDateString('en-PH', {weekday:'long', month:'long', day:'numeric'});
  const doneKey = 'reminder_done_' + today.toISOString().split('T')[0];
  let doneSet = new Set();
  try { doneSet = new Set(JSON.parse(localStorage.getItem(doneKey)||'[]')); } catch(e){}

  const renderBanner = () => {
    const pending = items.filter(it => !doneSet.has(it.pid + it.type));
    const done = items.filter(it => doneSet.has(it.pid + it.type));
    const total = items.length;
    const doneCount = done.length;

    if (!items.length) {
      banner.innerHTML = `
        <div class="reminder-banner-header">
          <div class="reminder-banner-title">Daily Reminders</div>
          <div class="reminder-banner-sub">${todayStr}</div>
        </div>
        <div class="reminder-empty">All clear — no follow-ups or alerts today.</div>`;
      return;
    }

    banner.innerHTML = `
      <div class="reminder-banner-header">
        <div style="display:flex;align-items:center;gap:10px;flex:1">
          <div class="reminder-banner-title">Daily Reminders</div>
          <div class="reminder-checklist-progress">
            <div class="reminder-progress-bar" style="width:${total?Math.round(doneCount/total*100):0}%"></div>
          </div>
          <span style="font-size:11px;font-weight:700;color:var(--accent);white-space:nowrap">${doneCount}/${total} done</span>
        </div>
        <div class="reminder-banner-sub">${todayStr}</div>
      </div>
      <div class="reminder-items" id="reminder-items-list">
        ${pending.slice(0,10).map(item => `
          <div class="reminder-item reminder-item-pending" data-key="${escAttr(item.pid+item.type)}" onclick="toggleReminderDone('${escAttr(item.pid+item.type)}','${escAttr(doneKey)}')">
            <div class="reminder-check-box">☐</div>
            <div class="reminder-item-icon">${item.icon}</div>
            <div class="reminder-item-text">
              <div class="reminder-item-name">${escHtml(item.name)}</div>
              <div class="reminder-item-detail">${escHtml(item.detail)}</div>
            </div>
            <span class="reminder-item-badge ${item.badgeClass}">${escHtml(item.badge)}</span>
          </div>`).join('')}
        ${done.length ? `<div class="reminder-done-divider">✓ Completed today (${done.length})</div>` : ''}
        ${done.map(item => `
          <div class="reminder-item reminder-item-done" data-key="${escAttr(item.pid+item.type)}" onclick="toggleReminderDone('${escAttr(item.pid+item.type)}','${escAttr(doneKey)}')">
            <div class="reminder-check-box">☑</div>
            <div class="reminder-item-icon" style="opacity:.4">${item.icon}</div>
            <div class="reminder-item-text" style="text-decoration:line-through;opacity:.5">
              <div class="reminder-item-name">${escHtml(item.name)}</div>
              <div class="reminder-item-detail">${escHtml(item.detail)}</div>
            </div>
            <span class="reminder-item-badge ${item.badgeClass}" style="opacity:.4">${escHtml(item.badge)}</span>
          </div>`).join('')}
      </div>`;
  };

  renderBanner();
}

function toggleReminderDone(key, doneKey) {
  let doneSet = new Set();
  try { doneSet = new Set(JSON.parse(localStorage.getItem(doneKey)||'[]')); } catch(e){}
  if (doneSet.has(key)) doneSet.delete(key); else doneSet.add(key);
  localStorage.setItem(doneKey, JSON.stringify([...doneSet]));
  buildReminderBanner(); // re-render
}

function updateViaDisplay(sel, pid) {
  const row = document.getElementById(`prow-${pid}`);
  if (!row) return;
  const badge = row.querySelector('.prow-via-badge');
  const val = sel.value;
  if (badge) { badge.textContent = val; badge.style.display = val ? '' : 'none'; }
  else if (val) {
    // create it
    const badges = row.querySelector('.prow-badges');
    const b = document.createElement('span');
    b.className = 'prow-via-badge'; b.textContent = val;
    badges.insertBefore(b, badges.firstChild);
  }
}

function saveProwField(pid, field, value, el) {
  // Update in manualPlacements if exists
  const mp = manualPlacements.find(p => p.placementId === pid);
  if (mp) { mp[field] = value; saveManualPlacements(); }
  // Also save to extra so UI reflects on next load
  saveProwExtra(pid, field, value);
  // Auto-enter Call Queue when candidate responds YES / Interested. Commission
  // and interview-session triggers now live in onStageChanged / _applyStageSideEffects;
  // do NOT re-trigger them from the legacy status path (Status is derived and
  // no longer user-editable; firing here would double-count).
  if (field === 'response' && value === 'Interested' && mp) {
    addToCallQueue(mp.candidateId, mp.jobOrderId, pid);
  }
  // Refresh the dot and pill in header without re-rendering. Header now follows
  // the current Stage (the canonical source) rather than the legacy status select.
  const row = document.getElementById(`prow-${pid}`);
  if (!row) return;
  const stageSel = document.getElementById('stage-sel-' + pid);
  const stage = stageSel ? stageSel.value : '';
  const selects = row.querySelectorAll('.prow-body select');
  const response = selects[0]?.value || '';
  const dot = row.querySelector('.prow-status-dot');
  const pill = row.querySelector('.prow-status-pill');
  if (dot)  dot.className  = 'prow-status-dot '  + getStageDotClass(stage);
  if (pill) {
    pill.className   = 'prow-status-pill ' + getStagePillClass(stage);
    pill.textContent = stage || (response === 'Not Interested' ? 'Not Interested' : 'New');
  }
  // Inactive class follows Stage, with response=Not Interested as an early dim
  // before the owner has advanced Stage to Rejected by Candidate.
  const isInactive = ['Dropped / Unavailable','Hired ✓','Rejected by Employer','Rejected by Candidate'].includes(stage)
    || response === 'Not Interested';
  row.classList.toggle('prow-inactive', isInactive);
}

function daysDiff(dateStr) {
  if (!dateStr) return 0;
  const d = parseDateFlex(dateStr);
  if (!d || isNaN(d)) return 0;
  return Math.floor((Date.now() - d.getTime()) / 86400000);
}

function parseDateFlex(s) {
  if (!s) return null;
  s = String(s).trim();
  if (/^\d{4}-\d{2}-\d{2}/.test(s)) return new Date(s);
  var m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (m) return new Date(+m[3], +m[1] - 1, +m[2]);
  var d = new Date(s);
  return isNaN(d) ? null : d;
}

function renderBriefingPanel() {
  const panel = document.getElementById('briefing-panel');
  if (!panel) return;

  const today = Date.now();
  const allP = [...placements, ...manualPlacements];

  // Open job orders count
  const openJOs = jobOrders.filter(function(jo) { return jo.status === 'Active' || jo.status === 'On Hold'; });

  // Days open per JO — uses getDaysOpen() which respects reopen cycles
  var daysOpenArr = openJOs.map(function(jo) { return getDaysOpen(jo); });

  var overdue = daysOpenArr.filter(function(d) { return d > 7; }).length;
  var atRisk  = daysOpenArr.filter(function(d) { return d >= 5 && d <= 6; }).length;
  var avgFill = daysOpenArr.length ? Math.round(daysOpenArr.reduce(function(a, b) { return a + b; }, 0) / daysOpenArr.length) : 0;

  // Placed this month
  var nowDate = new Date();
  var monthStart = new Date(nowDate.getFullYear(), nowDate.getMonth(), 1).getTime();
  var placedThisMonth = 0;
  allP.forEach(function(p) {
    const pid = p.placementId || p.candidateId;
    var ex = {}; try { ex = JSON.parse(localStorage.getItem('prow_extra_' + pid) || '{}'); } catch(e) {}
    var hireData = {}; try { hireData = JSON.parse(localStorage.getItem('hire_data_' + pid) || '{}'); } catch(e) {}
    if ((ex.status || p.status || '').trim().toLowerCase() !== 'hired') return;
    var hd = hireData.hireDate || ex.lastContacted || '';
    if (!hd) return;
    var hMs = parseDateFlex(hd);
    if (hMs && !isNaN(hMs) && hMs.getTime() >= monthStart) placedThisMonth++;
  });

  // Guarantee metrics
  var activeGuarantees = 0;
  var guaranteesExpiringSoon = 0;
  var issuesReported = 0;
  allP.forEach(function(p) {
    const pid = p.placementId || p.candidateId;
    var ex = {}; try { ex = JSON.parse(localStorage.getItem('prow_extra_' + pid) || '{}'); } catch(e) {}
    var hireData = {}; try { hireData = JSON.parse(localStorage.getItem('hire_data_' + pid) || '{}'); } catch(e) {}
    if ((ex.status || p.status || '').trim().toLowerCase() !== 'hired') return;
    var hd = hireData.hireDate;
    if (!hd) return;
    var hdMs = parseDateFlex(hd);
    if (!hdMs || isNaN(hdMs)) return;
    var expireMs = hdMs.getTime() + 30 * 86400000;
    var daysLeft = Math.ceil((expireMs - today) / 86400000);
    if (daysLeft > 0) {
      activeGuarantees++;
      if (daysLeft <= 7) guaranteesExpiringSoon++;
    }
    if (hireData.issueReported) issuesReported++;
  });

  var items = [
    { label: 'Open Job Orders', val: openJOs.length, cls: openJOs.length > 0 ? 'briefing-val-accent' : 'briefing-val-green', tab: 'jobs' },
    { label: 'Avg Days to Fill', val: avgFill > 0 ? avgFill + 'd' : '—', cls: avgFill > 7 ? 'briefing-val-red' : avgFill > 4 ? 'briefing-val-gold' : 'briefing-val-green', tab: '' },
    { label: 'Overdue (>7 days)', val: overdue, cls: overdue > 0 ? 'briefing-val-red' : 'briefing-val-green', tab: 'jobs' },
    { label: 'At Risk (5-6 days)', val: atRisk, cls: atRisk > 0 ? 'briefing-val-gold' : 'briefing-val-green', tab: 'jobs' },
    { label: 'Placed This Month', val: placedThisMonth, cls: 'briefing-val-green', tab: 'hired' },
    { label: 'Active Guarantees', val: activeGuarantees, cls: 'briefing-val-accent', tab: 'hired' },
    { label: 'Guarantees Expiring (7d)', val: guaranteesExpiringSoon, cls: guaranteesExpiringSoon > 0 ? 'briefing-val-red' : 'briefing-val-green', tab: 'hired' },
    { label: 'Issues Reported', val: issuesReported, cls: issuesReported > 0 ? 'briefing-val-red' : 'briefing-val-green', tab: 'hired' },
  ];

  var html = '<div class="briefing-title">Ops Briefing — Today</div>' +
    '<div class="briefing-grid">';
  items.forEach(function(item) {
    var clickable = item.tab && (typeof item.val === 'number' ? item.val > 0 : true);
    var onclick = clickable ? ' onclick="switchTab(\'' + item.tab + '\')"' : '';
    html += '<div class="briefing-item' + (clickable ? ' clickable' : '') + '"' + onclick + '>' +
      '<div class="briefing-item-label">' + item.label + '</div>' +
      '<div class="briefing-item-val ' + item.cls + '">' + item.val + '</div>' +
      '</div>';
  });
  html += '</div>';

  panel.innerHTML = html;
  panel.style.display = '';
}

function renderPoolHealth() {
  const bar = document.getElementById('pool-health-bar');
  if (!bar || !candidates.length) { if (bar) bar.style.display = 'none'; return; }

  const allP = [...placements, ...manualPlacements];
  const respondedIds = new Set();
  const messagedIds  = new Set();

  allP.forEach(function(p) {
    const pid = p.placementId || p.candidateId;
    var ex = {}; try { ex = JSON.parse(localStorage.getItem('prow_extra_' + pid) || '{}'); } catch(e) {}
    var stage = getEffectiveStage(ex, p);
    var sid = p.candidateId;
    if (!sid) return;
    if (stage === 'Broadcasted' || stage === 'Messaged') {
      messagedIds.add(sid);
    } else if (stage !== 'Dropped / Unavailable' && stage !== 'Rejected by Employer' && stage !== 'Rejected by Candidate') {
      respondedIds.add(sid);
    }
  });

  var totalCands = candidates.length;
  var responded  = respondedIds.size;
  var noResponse = 0;
  messagedIds.forEach(function(id) { if (!respondedIds.has(id)) noResponse++; });
  var blacklisted = Object.keys(blacklist).length;
  var removedFromPool = Object.values(candidateRatings).filter(function(r) { return r && r.removedFromPool; }).length;
  var pct = totalCands > 0 ? Math.round(responded / totalCands * 100) : 0;

  bar.innerHTML = '<div class="pool-health-label">Pool Health</div>' +
    '<div class="pool-health-track"><div class="pool-health-fill" style="width:' + pct + '%"></div></div>' +
    '<div class="pool-health-pct">' + pct + '% responsive</div>' +
    '<div class="pool-health-stats">' +
    '<div class="pool-stat-item">Total: <b>' + totalCands + '</b></div>' +
    '<div class="pool-stat-item">Responded: <b style="color:var(--green)">' + responded + '</b></div>' +
    '<div class="pool-stat-item">No Response: <b style="color:var(--gold2)">' + noResponse + '</b></div>' +
    (removedFromPool > 0 ? '<div class="pool-stat-item">Removed: <b style="color:var(--text3)">' + removedFromPool + '</b></div>' : '') +
    '<div class="pool-stat-item">Blacklisted: <b style="color:var(--red)">' + blacklisted + '</b></div>' +
    '</div>';
  bar.style.display = 'flex';
}

function isCandInactive(candId, extrasCache) {
  const ratings = candidateRatings[candId];
  const scores = ratings ? (ratings.scores || {}) : {};
  if (scores.noShow === true) return true;
  if (scores.lateReply === true) {
    const logs = eraContactLogs[candId] || [];
    const lastLog = logs.length ? logs[logs.length - 1] : null;
    if (!lastLog || daysDiff(lastLog.date) >= 14) return true;
  }
  const allP = [...placements, ...manualPlacements].filter(function(p) { return p.candidateId === candId; });
  for (var i = 0; i < allP.length; i++) {
    const p = allP[i];
    const pid = p.placementId || p.candidateId;
    const ex = getPlacementExtra(pid, extrasCache);
    // Always-on dashboard. 21-day inactive rule requires real direct contact.
    const lc = ex.lastDirectContactAt || ex.lastContacted || '';
    const resp = ex.response || p.response || 'No Response';
    if ((resp === 'No Response' || resp === '') && lc && daysDiff(lc) >= 21) return true;
  }
  return false;
}

function fmtDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  return d.toLocaleDateString('en-PH', { month: 'long', day: 'numeric', year: 'numeric' });
}

function fmtDateShort(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  return d.toLocaleDateString('en-PH', { month: 'long', day: 'numeric' });
}

function toggleJOCard(card) { /* replaced by tab system */ }

function updatePlacementLocal(id, field, value) {
  const mp = manualPlacements.find(p => p.placementId === id);
  if (mp) { mp[field] = value; saveManualPlacements(); }
}

function saveNote(key, val) {
  candidateNotes[key] = val;
  saveCandidateNotes();
}

// ═══════════════════════════════════════════════
// CANDIDATES — COMPACT FILTER BAR
// ═══════════════════════════════════════════════

let _candFilters = { jobType: [], location: [], status: [], gender: [], ageMin: 18, ageMax: 65, payRange: [], eraScore: [], setup: [], blacklist: 'hide', showHired: false, activeStatus: 'active', regDateRange: 'all', sortBy: 'newest' };

// ─── SETUP OVERRIDE (user-editable work arrangement per candidate) ───
function getEffectiveSetup(c) {
  var ratings = candidateRatings[c.id] || {};
  return ratings.setupOverride !== undefined ? ratings.setupOverride : (c.setup || '');
}

function setSetupOverride(candId, value) {
  if (!candidateRatings[candId]) candidateRatings[candId] = {};
  if (value) {
    candidateRatings[candId].setupOverride = value;
  } else {
    delete candidateRatings[candId].setupOverride;
  }
  saveCandidateRatings();
  renderCandidates();
  // Refresh profile modal if open for this candidate
  var modalInner = document.getElementById('cand-modal-inner');
  if (modalInner && modalInner.dataset.candId === candId) openCandModal(candId);
}

function buildSetupToggleHTML(candId) {
  var setup = getEffectiveSetup({ id: candId, setup: (candidates.find(function(c){ return c.id===candId; })||{}).setup });
  var idA = escAttr(candId);
  function btn(val, label, cls) {
    var active = setup === val ? ' active' : '';
    return '<button class="setup-toggle ' + cls + active + '" onclick="event.stopPropagation();setSetupOverride(\'' + idA + '\',\'' + val + '\')">' + label + '</button>';
  }
  var notSetActive = (!setup || setup === '') ? ' active' : '';
  return btn('Stay-in', 'Stay-In', 'st-in') +
         btn('Stay-out', 'Stay-Out', 'st-out') +
         btn('Either', 'Either', 'st-ei') +
         '<button class="setup-toggle st-ei' + notSetActive + '" onclick="event.stopPropagation();setSetupOverride(\'' + idA + '\',\'\')" style="color:var(--text3)">Not Set</button>';
}
let _candActivePanel = null;
let _candJobTypes = [];

function initCandFilters() {
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.cf-btn-wrap') && !e.target.closest('.cf-bl-wrap')) {
      if (_candActivePanel) { _candActivePanel = null; buildCandFilterBar(); }
      if (_broadcastActivePanel) { _broadcastActivePanel = null; buildBroadcastFilterBar(); }
    }
  });
}

function buildCandFilterBar() {
  const bar = document.getElementById('cand-cf-bar');
  if (!bar) return;
  const defs = [
    { key: 'jobType',   neutral: 'All job types',    prefix: 'Job type' },
    { key: 'location',  neutral: 'All locations',    prefix: 'Location' },
    { key: 'setup',     neutral: 'All setups',       prefix: 'Setup' },
    { key: 'status',    neutral: 'All statuses',     prefix: 'Status' },
    { key: 'gender',    neutral: 'All genders',      prefix: 'Gender' },
    { key: 'age',       neutral: 'All ages',         prefix: 'Age' },
    { key: 'payRange',  neutral: 'All pay ranges',   prefix: 'Pay' },
    { key: 'eraScore',  neutral: 'All ERA scores',   prefix: 'ERA' },
  ];
  const hiredOn = _candFilters.showHired;
  const hiredBtn = '<button class="cf-btn' + (hiredOn ? ' active' : '') + '" onclick="toggleShowHired()" title="' + (hiredOn ? 'Hide hired candidates' : 'Show hired candidates') + '">' +
    (hiredOn ? '<span class="cf-dot"></span>' : '') + 'Hired' + '</button>';
  const as = _candFilters.activeStatus;
  const _aLabels = { active: 'Active Only', inactive: 'Show Inactive', all: 'All' };
  const activeToggle = '<div style="display:flex;gap:3px">' +
    ['active','inactive','all'].map(function(v) {
      const sel = as === v;
      return '<button class="era-tier-btn' + (sel ? ' sel' : '') + '"' +
        (sel ? ' style="background:rgba(23,85,237,.10);border-color:rgba(23,85,237,.45);color:var(--accent);border-width:1.5px"' : '') +
        ' onclick="_candFilters.activeStatus=\'' + v + '\';renderCandidates()">' + _aLabels[v] + '</button>';
    }).join('') + '</div>';
  const sb = _candFilters.sortBy || 'newest';
  const _sLabels = { newest: 'Newest First', oldest: 'Oldest First', era: 'Highest ERA' };
  const sortToggle = '<div style="display:flex;gap:3px">' +
    ['newest','oldest','era'].map(function(v) {
      const sel = sb === v;
      return '<button class="era-tier-btn' + (sel ? ' sel' : '') + '"' +
        (sel ? ' style="background:rgba(23,85,237,.10);border-color:rgba(23,85,237,.45);color:var(--accent);border-width:1.5px"' : '') +
        ' onclick="_candFilters.sortBy=\'' + v + '\';renderCandidates()">' + _sLabels[v] + '</button>';
    }).join('') + '</div>';
  const btns = defs.map(function(d) { return buildCfBtnWrap(d.key, d.neutral, d.prefix); }).join('') +
    hiredBtn + activeToggle + sortToggle + buildRegDateBtn() + buildCfBlWrap();
  bar.innerHTML = btns;
  if (_candActivePanel === 'age') setTimeout(initAgeSlider, 0);
}

function buildCfBtnWrap(key, neutralLabel, prefix) {
  const f = _candFilters;
  let isActive = false, label = neutralLabel;
  if (key === 'age') {
    isActive = !(f.ageMin === 18 && f.ageMax === 65);
    label = isActive ? 'Age \u00b7 ' + f.ageMin + '\u2013' + f.ageMax : neutralLabel;
  } else if (key === 'eraScore') {
    isActive = f.eraScore.length > 0;
    label = isActive ? 'ERA \u00b7 ' + f.eraScore.join(', ') : neutralLabel;
  } else {
    const arr = f[key] || [];
    isActive = arr.length > 0;
    label = isActive ? prefix + ' \u00b7 ' + arr.length : neutralLabel;
  }
  const isOpen = _candActivePanel === key;
  const dot = isActive ? '<span class="cf-dot"></span>' : '';
  const chev = '<span class="cf-chev">' + (isOpen ? '\u25b4' : '\u25be') + '</span>';
  const panel = isOpen ? buildCfPanel(key) : '';
  return '<div class="cf-btn-wrap">' +
    '<button class="cf-btn' + (isActive ? ' active' : '') + '" onclick="toggleCandPanel(\'' + key + '\')">' +
    dot + escHtml(label) + chev + '</button>' + panel + '</div>';
}

function buildCfBlWrap() {
  const val = _candFilters.blacklist;
  const isActive = val !== 'hide';
  const opts = [['hide','Hide Blacklisted'],['show','Show All'],['only','Blacklisted Only']];
  return '<div class="cf-bl-wrap">' +
    '<select class="cf-bl-select' + (isActive ? ' bl-active' : '') + '" onchange="setCandBlacklist(this.value)">' +
    opts.map(function(o) { return '<option value="' + o[0] + '"' + (val === o[0] ? ' selected' : '') + '>' + o[1] + '</option>'; }).join('') +
    '</select></div>';
}

function buildCfPanel(key) {
  if (key === 'jobType') return buildCfCheckPanel('jobType', 'Job Type', _candJobTypes.length ? _candJobTypes : ['Kasambahay','Yaya/Babysitter','Cook/Labandera','Driver','Dishwasher/Kitchen','Server/Waiter']);
  if (key === 'location') return buildCfCheckPanel('location', 'Location', ['Bacolod City','Talisay','Silay','Bago City','Others']);
  if (key === 'status') return buildCfCheckPanel('status', 'Status', ['Not Ready','Needs Verification','Ready','Hired','Blacklisted','Removed from Pool']);
  if (key === 'gender') return buildCfCheckPanel('gender', 'Gender', ['Female','Male','Others']);
  if (key === 'age') return buildAgePanel();
  if (key === 'payRange') return buildCfCheckPanel('payRange', 'Pay Range', ['Below \u20b15,000','\u20b15,000\u2013\u20b17,000','\u20b17,001\u2013\u20b110,000','\u20b110,001\u2013\u20b115,000','Above \u20b115,000']);
  if (key === 'eraScore') return buildEraTierPanel();
  if (key === 'setup') return buildCfCheckPanel('setup', 'Setup / Arrangement', ['Stay-in','Stay-out','Either']);
  return '';
}

function buildCfCheckPanel(key, title, opts) {
  const selected = _candFilters[key] || [];
  const items = opts.map(function(o) {
    const safe = o.replace(/'/g, '');
    const chk = selected.indexOf(o) >= 0 ? ' checked' : '';
    return '<label class="cf-check-item"><input type="checkbox"' + chk + ' onchange="candFilterToggle(\'' + key + '\',\'' + safe + '\')">' + escHtml(o) + '</label>';
  }).join('');
  return '<div class="cf-panel open">' +
    '<div class="cf-panel-hd"><span class="cf-panel-title">' + title + '</span><span class="cf-clear" onclick="candFilterClear(\'' + key + '\')">Clear</span></div>' +
    '<div class="cf-checklist">' + items + '</div></div>';
}

function buildAgePanel() {
  const lo = _candFilters.ageMin, hi = _candFilters.ageMax;
  const loP = ((lo - 18) / 47 * 100).toFixed(1);
  const hiP = ((hi - 18) / 47 * 100).toFixed(1);
  return '<div class="cf-panel open" style="min-width:240px">' +
    '<div class="cf-panel-hd"><span class="cf-panel-title">Age Range</span><span class="cf-clear" onclick="candAgeReset()">Reset</span></div>' +
    '<div class="dr-wrap">' +
    '<div class="dr-lbl" id="dr-age-lbl">' + lo + ' \u2013 ' + hi + ' years old</div>' +
    '<div class="dr-track-wrap" id="dr-track-wrap">' +
    '<div class="dr-track"></div>' +
    '<div class="dr-fill" id="dr-fill" style="left:' + loP + '%;width:' + (parseFloat(hiP) - parseFloat(loP)) + '%"></div>' +
    '<div class="dr-handle" id="dr-lo" style="left:' + loP + '%"></div>' +
    '<div class="dr-handle" id="dr-hi" style="left:' + hiP + '%"></div>' +
    '</div>' +
    '<div class="dr-reset-row"><span class="dr-reset" onclick="candAgeReset()">Reset to 18\u201365</span></div>' +
    '</div></div>';
}

function buildEraTierPanel() {
  const selected = _candFilters.eraScore || [];
  const tiers = [
    ['Below 3', 'var(--red)',    'rgba(220,38,38,.12)',  'rgba(220,38,38,.5)'],
    ['3\u20135', 'var(--gold)',  'rgba(245,158,11,.12)', 'rgba(245,158,11,.5)'],
    ['5\u20137', 'var(--accent)','rgba(23,85,237,.10)',  'rgba(23,85,237,.45)'],
    ['7\u20138', 'var(--purple)','rgba(124,58,237,.10)', 'rgba(124,58,237,.45)'],
    ['8\u201310','var(--green)', 'rgba(5,150,105,.10)',  'rgba(5,150,105,.45)'],
  ];
  const pills = tiers.map(function(t) {
    const lbl = t[0], col = t[1], bg = t[2], border = t[3];
    const sel = selected.indexOf(lbl) >= 0;
    const style = sel ? 'background:' + bg + ';border-color:' + border + ';color:' + col + ';border-width:1.5px' : '';
    const safe = lbl.replace(/'/g, '');
    return '<button class="era-tier-btn' + (sel ? ' sel' : '') + '" style="' + style + '" onclick="candFilterToggle(\'eraScore\',\'' + safe + '\')">' + escHtml(lbl) + '</button>';
  }).join('');
  return '<div class="cf-panel open" style="min-width:280px">' +
    '<div class="cf-panel-hd"><span class="cf-panel-title">ERA Score</span><span class="cf-clear" onclick="candFilterClear(\'eraScore\')">Clear</span></div>' +
    '<div class="era-tier-row">' + pills + '</div></div>';
}

function buildRegDateBtn() {
  const val = _candFilters.regDateRange;
  const isActive = val !== 'all';
  const _rdLabels = { all: 'All time', '7d': 'Last 7 days', '30d': 'Last 30 days', '3m': 'Last 3 months' };
  const isOpen = _candActivePanel === 'regDate';
  const dot = isActive ? '<span class="cf-dot"></span>' : '';
  const chev = '<span class="cf-chev">' + (isOpen ? '▴' : '▾') + '</span>';
  let panel = '';
  if (isOpen) {
    const opts = [['all','All time'],['7d','Last 7 days'],['30d','Last 30 days'],['3m','Last 3 months']];
    const items = opts.map(function(o) {
      const sel = val === o[0];
      return '<button style="display:block;width:100%;text-align:left;padding:7px 14px;border:none;' +
        'background:' + (sel ? 'rgba(23,85,237,.08)' : 'none') + ';' +
        'color:' + (sel ? 'var(--accent)' : 'var(--text2)') + ';' +
        'font-size:12px;font-weight:' + (sel ? '700' : '500') + ';' +
        'cursor:pointer;font-family:var(--sans)" onclick="setRegDateRange(\'' + o[0] + '\')">' + o[1] + '</button>';
    }).join('');
    panel = '<div class="cf-panel open" style="min-width:160px">' + items + '</div>';
  }
  const label = isActive ? 'Registered · ' + _rdLabels[val] : 'Registration Date';
  return '<div class="cf-btn-wrap">' +
    '<button class="cf-btn' + (isActive ? ' active' : '') + '" onclick="toggleCandPanel(\'regDate\')">' +
    dot + label + chev + '</button>' + panel + '</div>';
}

function setRegDateRange(val) {
  _candFilters.regDateRange = val;
  _candActivePanel = null;
  buildCandFilterBar();
  renderCandidates();
}

function toggleCandPanel(key) {
  _candActivePanel = _candActivePanel === key ? null : key;
  buildCandFilterBar();
}

function candFilterToggle(key, val) {
  if (!_candFilters[key]) _candFilters[key] = [];
  const arr = _candFilters[key];
  const idx = arr.indexOf(val);
  if (idx >= 0) arr.splice(idx, 1); else arr.push(val);
  renderCandidates();
  buildCandFilterBar();
}

function candFilterClear(key) {
  _candFilters[key] = [];
  renderCandidates();
  buildCandFilterBar();
}

function setCandBlacklist(val) {
  _candFilters.blacklist = val;
  renderCandidates();
  buildCandFilterBar();
}

function toggleShowHired() {
  _candFilters.showHired = !_candFilters.showHired;
  renderCandidates();
  buildCandFilterBar();
}

function candAgeReset() {
  _candFilters.ageMin = 18; _candFilters.ageMax = 65;
  renderCandidates();
  buildCandFilterBar();
  setTimeout(initAgeSlider, 0);
}

function initAgeSlider() {
  const trackWrap = document.getElementById('dr-track-wrap');
  const loH = document.getElementById('dr-lo');
  const hiH = document.getElementById('dr-hi');
  const fill = document.getElementById('dr-fill');
  const lbl  = document.getElementById('dr-age-lbl');
  if (!trackWrap || !loH || !hiH) return;

  function pctToVal(p) { return Math.round(18 + (p / 100) * 47); }
  function valToPct(v) { return ((v - 18) / 47) * 100; }

  function updateVis() {
    const lo = _candFilters.ageMin, hi = _candFilters.ageMax;
    const loP = valToPct(lo), hiP = valToPct(hi);
    loH.style.left = loP + '%';
    hiH.style.left = hiP + '%';
    if (fill) { fill.style.left = loP + '%'; fill.style.width = (hiP - loP) + '%'; }
    if (lbl) lbl.textContent = lo + ' \u2013 ' + hi + ' years old';
  }

  function startDrag(e, which) {
    e.preventDefault(); e.stopPropagation();
    const rect = trackWrap.getBoundingClientRect();
    function onMove(ev) {
      const cx = ev.touches ? ev.touches[0].clientX : ev.clientX;
      const pct = Math.max(0, Math.min(100, (cx - rect.left) / rect.width * 100));
      const val = pctToVal(pct);
      if (which === 'lo') _candFilters.ageMin = Math.min(val, _candFilters.ageMax - 1);
      else _candFilters.ageMax = Math.max(val, _candFilters.ageMin + 1);
      updateVis();
      renderCandidates();
    }
    function onUp() {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
      document.removeEventListener('touchmove', onMove);
      document.removeEventListener('touchend', onUp);
      buildCandFilterBar();
      setTimeout(initAgeSlider, 0);
    }
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    document.addEventListener('touchmove', onMove, { passive: false });
    document.addEventListener('touchend', onUp);
  }

  loH.onmousedown = function(e) { startDrag(e, 'lo'); };
  hiH.onmousedown = function(e) { startDrag(e, 'hi'); };
  loH.ontouchstart = function(e) { startDrag(e, 'lo'); };
  hiH.ontouchstart = function(e) { startDrag(e, 'hi'); };
}

function parsePayAmount(str) {
  if (!str) return null;
  const n = parseInt((str + '').replace(/[^\d]/g, ''));
  return isNaN(n) ? null : n;
}

function matchPayRange(c, ranges) {
  if (!ranges.length) return true;
  const pay = parsePayAmount(c.expectedPay);
  if (pay === null) return false;
  return ranges.some(function(r) {
    if (r === 'Below \u20b15,000') return pay < 5000;
    if (r === '\u20b15,000\u2013\u20b17,000') return pay >= 5000 && pay <= 7000;
    if (r === '\u20b17,001\u2013\u20b110,000') return pay >= 7001 && pay <= 10000;
    if (r === '\u20b110,001\u2013\u20b115,000') return pay >= 10001 && pay <= 15000;
    if (r === 'Above \u20b115,000') return pay > 15000;
    return false;
  });
}

function matchEraTier(candId, tiers) {
  if (!tiers.length) return true;
  const score = calcERA(candId).score;
  return tiers.some(function(t) {
    if (t === 'Below 3') return score < 3;
    if (t === '3\u20135') return score >= 3 && score < 5;
    if (t === '5\u20137') return score >= 5 && score < 7;
    if (t === '7\u20138') return score >= 7 && score < 8;
    if (t === '8\u201310') return score >= 8;
    return false;
  });
}

// ═══════════════════════════════════════════════
// CANDIDATES
// ═══════════════════════════════════════════════
function populateFilterDropdowns() {
  _candJobTypes = [...new Set(candidates.flatMap(function(c) { return c.jobTypes && c.jobTypes.length ? c.jobTypes : (c.jobType ? [c.jobType] : []); }).filter(Boolean))].sort();
  buildCandFilterBar();
}

function renderCandidates() {
  renderPoolHealth();
  const container = document.getElementById('cand-container');
  const summaryEl = document.getElementById('cand-filter-summary');
  try {
    // Per-render extras cache — parse every placement's prow_extra ONCE.
    // Passed through to isCandidateHired/isCandInactive/isHighDemand so they
    // skip the per-call localStorage + JSON.parse on every candidate.
    // External callers (profile modal, walker, calls tab) still call these
    // helpers without a cache and fall back to on-demand parsing.
    const extrasCache = new Map();
    const _allP = [...placements, ...manualPlacements];
    for (let _i = 0; _i < _allP.length; _i++) {
      const _p = _allP[_i];
      const _pid = _p.placementId || _p.candidateId;
      if (extrasCache.has(_pid)) continue;
      let _ex = {};
      try { _ex = JSON.parse(localStorage.getItem('prow_extra_' + _pid) || '{}'); } catch(_e) {}
      extrasCache.set(_pid, _ex);
    }

    const search = String(document.getElementById('cand-search')?.value || '').toLowerCase();
    const f = _candFilters;
    const hiredIds = new Set((candidates || []).filter(function(c) { return c && c.id && isCandidateHired(c.id, extrasCache); }).map(function(c) { return c.id; }));

    let filtered = (candidates || []).filter(function(c) {
      if (!c || !c.id) return false;

      // Search
      const name = String(c.name || '').toLowerCase();
      const cid = String(c.id || '').toLowerCase();
      if (search && !name.includes(search) && !cid.includes(search)) return false;

      // Job type
      if (f.jobType.length) {
        const ct = Array.isArray(c.jobTypes) && c.jobTypes.length ? c.jobTypes : (c.jobType ? [c.jobType] : []);
        if (!f.jobType.some(function(t) { return ct.indexOf(t) >= 0; })) return false;
      }

      // Location
      if (f.location.length) {
        const loc = c.location || '';
        const knownLocs = ['Bacolod City','Talisay','Silay','Bago City'];
        const locMatch = f.location.some(function(l) {
          if (l === 'Others') return !knownLocs.some(function(k) { return loc.includes(k); });
          return loc.includes(l);
        });
        if (!locMatch) return false;
      }

      // Status + hired + blacklist + removed
      const isBlacklisted = !!blacklist[c.id];
      const isHired = hiredIds.has(c.id);
      const isRemoved = !!(candidateRatings[c.id] && candidateRatings[c.id].removedFromPool);
      // Hired: always exclude unless showHired is on
      if (isHired && !f.showHired) return false;

      if (f.status.length) {
        const statusMatch = f.status.some(function(s) {
          if (s === 'Hired') return isHired;
          if (s === 'Blacklisted') return isBlacklisted;
          if (s === 'Removed from Pool') return isRemoved;
          return false;
        });
        if (!statusMatch) return false;
        // When explicitly filtering for removed/blacklisted, don't double-hide
        if (f.status.indexOf('Blacklisted') < 0 && f.status.indexOf('Removed from Pool') < 0) {
          if (f.blacklist === 'hide' && isBlacklisted) return false;
          if (f.blacklist === 'only' && !isBlacklisted) return false;
          if (isRemoved) return false; // hide removed unless explicitly requested
        }
      } else {
        if (f.blacklist === 'hide' && isBlacklisted) return false;
        if (f.blacklist === 'only' && !isBlacklisted) return false;
        if (isRemoved) return false; // hide removed by default
      }

      // Gender
      if (f.gender.length) {
        const g = c.gender || '';
        const gMatch = f.gender.some(function(gv) {
          if (gv === 'Others') return ['Female','Male'].indexOf(g) < 0;
          return g === gv;
        });
        if (!gMatch) return false;
      }

      // Age range
      if (!(f.ageMin === 18 && f.ageMax === 65)) {
        const age = parseInt(c.age) || 0;
        if (age > 0 && (age < f.ageMin || age > f.ageMax)) return false;
      }

      // Pay range
      if (f.payRange.length && !matchPayRange(c, f.payRange)) return false;

      // ERA score
      if (f.eraScore.length && !matchEraTier(c.id, f.eraScore)) return false;

      // Setup / arrangement
      if (f.setup && f.setup.length) {
        const su = getEffectiveSetup(c);
        if (!f.setup.some(function(v) { return su === v; })) return false;
      }

      // Active / inactive status
      if (f.activeStatus === 'active' && isCandInactive(c.id, extrasCache)) return false;
      if (f.activeStatus === 'inactive' && !isCandInactive(c.id, extrasCache)) return false;

      // Registration date range
      if (f.regDateRange !== 'all') {
        const ts = (c.timestamp || '').split(' ')[0];
        if (!ts) return false;
        const daysMap = { '7d': 7, '30d': 30, '3m': 91 };
        if (daysDiff(ts) > (daysMap[f.regDateRange] || 0)) return false;
      }

      return true;
    });

    document.getElementById('cand-count').textContent = filtered.length;

    if (summaryEl) {
      const hiddenHired = !f.showHired ? hiredIds.size : 0;
      const parts = [];
      if (f.jobType.length) parts.push(f.jobType.join(', '));
      if (f.gender.length) parts.push(f.gender.join(', '));
      if (f.location.length) parts.push(f.location.join(', '));
      if (f.status.length) parts.push(f.status.join(', '));
      if (!(f.ageMin === 18 && f.ageMax === 65)) parts.push('Age ' + f.ageMin + '\u2013' + f.ageMax);
      if (f.payRange.length) parts.push(f.payRange.length + ' pay range' + (f.payRange.length > 1 ? 's' : ''));
      if (f.eraScore.length) parts.push('ERA: ' + f.eraScore.join(', '));
      if (f.setup && f.setup.length) parts.push('Setup: ' + f.setup.join(', '));
      if (f.showHired) parts.push('Hired included');
      if (f.activeStatus === 'active') parts.push('Active only');
      if (f.activeStatus === 'inactive') parts.push('Inactive only');
      if (f.regDateRange !== 'all') parts.push('Newest first');
      summaryEl.textContent = 'Showing ' + filtered.length + ' candidates' +
        (hiddenHired > 0 ? ' \u00b7 ' + hiddenHired + ' hired hidden' : '') +
        ' \u00b7 Sorted ' + (f.regDateRange !== 'all' ? 'newest first' : 'highest rating first') +
        (parts.length ? ' \u00b7 ' + parts.join(' \u00b7 ') : '');
    }

    if (!filtered.length) {
      container.innerHTML = '<div class="empty-state" style="grid-column:1/-1"><div class="empty-icon">\u2014</div>No candidates match your filters.</div>';
      return;
    }

    container.innerHTML = '';

    const sortMode = f.sortBy || 'newest';
    filtered.sort(function(a, b) {
      if (sortMode === 'newest' || sortMode === 'oldest') {
        const tsA = (a.timestamp || '').split(' ')[0];
        const tsB = (b.timestamp || '').split(' ')[0];
        return sortMode === 'newest' ? tsB.localeCompare(tsA) : tsA.localeCompare(tsB);
      }
      // ERA highest first
      const scoreDiff = calcCandRating(b.id) - calcCandRating(a.id);
      if (scoreDiff !== 0) return scoreDiff;
      const verDiff = Number(getEffectiveVerified(b)) - Number(getEffectiveVerified(a));
      if (verDiff !== 0) return verDiff;
      return String(a.name || '').localeCompare(String(b.name || ''));
    });

    let rendered = 0;
    filtered.forEach(function(c) {
      try { container.appendChild(createCandCard(c, extrasCache)); rendered++; }
      catch (err) { console.error('Card render failed for', c?.id, err); }
    });

    if (!rendered) {
      container.innerHTML = '<div class="empty-state" style="grid-column:1/-1"><div class="empty-icon">\u2014</div>Unable to render candidate cards. Please refresh.</div>';
    }
  } catch (err) {
    console.error('renderCandidates failed:', err);
    if (summaryEl) summaryEl.textContent = 'Candidate view encountered an error. Try Refresh.';
    if (container) container.innerHTML = '<div class="error-msg" style="grid-column:1/-1">Candidates tab failed to render. Please click Refresh.</div>';
  }
}

function genderEmoji(g) {
  if (!g) return 'P';
  const gl = g.toLowerCase();
  if (gl.includes('female') || gl.includes('girl') || gl.includes('woman')) return 'F';
  if (gl.includes('male') || gl.includes('boy') || gl.includes('man')) return 'M';
  return 'P';
}

function createCandCard(c, extrasCache) {
  const isBlacklisted = !!blacklist[c.id];
  const bl = blacklist[c.id] || {};
  const isRemoved = !!(candidateRatings[c.id] && candidateRatings[c.id].removedFromPool);
  const removalReason = isRemoved ? (candidateRatings[c.id].removalReason || '') : '';

  const card = document.createElement('div');
  card.className = 'cand-card' + (isBlacklisted ? ' blacklisted' : '') + (isRemoved ? ' blacklisted' : '');
  const _candIsInactive = isCandInactive(c.id, extrasCache);
  if (_candIsInactive && _candFilters.activeStatus === 'inactive') card.style.opacity = '0.65';

  // Compute ERA + rating + color + label ONCE per card. Previously these
  // were called 5+ times per card (each call re-runs calcERA which does an
  // O(n) candidates.find).
  const _era         = calcERA(c.id);
  const _candRating  = _era.score;
  const _ratingColor = getRatingColor(_candRating);
  const _ratingLabel = getRatingLabel(_candRating).label;
  const _docConf     = getDocConfidence(c.id);

  const effectiveVerifiedCard = getEffectiveVerified(c);
  const autoVerCard = isAutoVerified(c.id) && c.status !== 'Verified';
  const verifiedBadge = effectiveVerifiedCard
    ? `<span class="cand-badge badge-verified">Verified${autoVerCard?' (auto)':''}</span>`
    : '<span class="cand-badge badge-unverified">Unverified</span>';

  const blBadge = isBlacklisted
    ? `<span class="cand-badge badge-blacklisted">Blacklisted: ${escHtml(bl.reason||'')}</span>`
    : '';
  const isFlagged = !!flaggedCands[c.id];
  const flagBadge = isFlagged ? `<span class="cand-badge badge-flagged">Flagged: ${escHtml(flaggedCands[c.id].reason||'Issue Reported')}</span>` : '';

  const cardAutoTags = getAutoTags(c.id);
  card.style.cursor = 'pointer';
  card.onclick = (e) => { if (!e.target.closest('.btn')) openCandModal(c.id); };
  const autoTagBadges = cardAutoTags.map(t => `<span class="cand-badge" style="background:${t.color}18;color:${t.color};border-color:${t.color}40">${t.label}</span>`).join('');
  const inactiveBadge = _candIsInactive && _candFilters.activeStatus === 'inactive'
    ? '<span class="cand-badge" style="background:var(--card3);color:var(--text3);border-color:var(--border3)">Inactive</span>' : '';
  const removedBadge = isRemoved
    ? `<span class="cand-badge" style="background:var(--card3);color:var(--text3);border-color:var(--border2)">Removed: ${escHtml(removalReason)}</span>` : '';
  card.innerHTML = `
    <div class="cand-card-top">
      <div class="cand-avatar">${genderEmoji(c.gender)}</div>
      <div style="flex:1">
        <div class="cand-name">${escHtml(c.name)}</div>
        <div class="cand-id">${escHtml(c.id)} · ${escHtml(c.timestamp?.split(' ')[0]||'')}</div>
        <div class="cand-badges">${verifiedBadge}${blBadge}${flagBadge}${removedBadge}${autoTagBadges}${inactiveBadge}</div>
      </div>
      <div style="color:var(--text3);font-size:11px;padding-top:2px">View</div>
    </div>
    <div class="cand-details">
      <div class="cand-detail"><span class="cand-detail-label">Age</span><span class="cand-detail-val">${escHtml(c.age)}</span></div>
      <div class="cand-detail"><span class="cand-detail-label">Gender</span><span class="cand-detail-val">${escHtml(c.gender)}</span></div>
      <div class="cand-detail"><span class="cand-detail-label">Job Type</span><span class="cand-detail-val">${escHtml(c.jobTypeFormatted || c.jobType)}</span></div>
      <div class="cand-detail"><span class="cand-detail-label">Location</span><span class="cand-detail-val">${escHtml(c.location)}</span></div>
      <div class="cand-detail"><span class="cand-detail-label">Registered</span><span class="cand-detail-val">${escHtml(fmtDate(c.timestamp?.split(' ')[0]||''))}</span></div>
      <div class="cand-detail" style="grid-column:1/-1">
        <span class="cand-detail-label">ERA Score</span>
        <span style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
          <span style="color:${_ratingColor};font-weight:800;font-family:var(--mono);font-size:14px">${_candRating}</span>
          <span style="font-size:11px;font-weight:700;padding:1px 7px;border-radius:99px;background:${_ratingColor}18;color:${_ratingColor};border:1px solid ${_ratingColor}40">${_ratingLabel}</span>
          <span style="font-size:10px;color:var(--text3)">E:${_era.E>=0?'+':''}${_era.E.toFixed(1)} R:${_era.R>=0?'+':''}${_era.R.toFixed(1)} A:${_era.A>=0?'+':''}${_era.A.toFixed(1)}</span>
          <span style="font-size:10px;font-weight:600;color:${_docConf.color};margin-left:6px">Docs: ${_docConf.label}</span>
        </span>
      </div>
      ${isHighDemand(c.id, extrasCache) ? '<div class="cand-detail" style="grid-column:1/-1"><span style="font-size:10px;font-weight:700;color:var(--orange)">High Demand — in multiple active orders</span></div>' : ''}
      <div class="cand-detail"><span class="cand-detail-label">Expected Pay</span><span class="cand-detail-val">${escHtml(c.expectedPay)}</span></div>
      <div class="cand-detail" style="grid-column:1/-1">
        <span class="cand-detail-label">Setup</span>
        <span class="setup-toggle-wrap">${buildSetupToggleHTML(c.id)}</span>
      </div>
      <div class="cand-detail"><span class="cand-detail-label">Past Jobs</span><span class="cand-detail-val">${escHtml(c.pastJobs||'—')}</span></div>
    </div>
    ${c.skills ? `<div class="cand-skills">${escHtml(c.skills)}</div>` : ''}
    <div class="cand-card-actions">
      ${!isBlacklisted
        ? `<button class="btn btn-red" onclick="openBlacklistModal('${escAttr(c.id)}','${escAttr(c.name)}')">Blacklist</button>`
        : `<button class="btn btn-ghost" onclick="removeBlacklist('${escAttr(c.id)}')">Remove Blacklist</button>`
      }
      ${isRemoved
        ? `<button class="btn btn-ghost" onclick="reactivateFromPool('${escAttr(c.id)}')">Reactivate</button>`
        : `<button class="btn btn-ghost" style="color:var(--text3)" onclick="openRemoveFromPoolModal('${escAttr(c.id)}')">Remove from Pool</button>`
      }
      <button class="btn btn-green" onclick="openAddToJOModal('${escAttr(c.id)}','${escAttr(c.name)}')">+ Add to Job Order</button>
    </div>
  `;
  return card;
}

// ═══════════════════════════════════════════════
// BLACKLIST
// ═══════════════════════════════════════════════
function openBlacklistModal(id, name) {
  document.getElementById('bl-cand-id').value = id;
  document.getElementById('bl-cand-name').value = name;
  document.getElementById('bl-notes').value = '';
  openModal('modal-blacklist');
}

function confirmBlacklist() {
  const id = document.getElementById('bl-cand-id').value;
  const reason = document.getElementById('bl-reason').value;
  const notes = document.getElementById('bl-notes').value;
  blacklist[id] = { reason, notes, date: new Date().toISOString() };
  saveBlacklist();
  closeModal('modal-blacklist');
  renderCandidates();
}

function removeBlacklist(id) {
  if (!confirm('Remove this candidate from the blacklist?')) return;
  delete blacklist[id];
  saveBlacklist();
  renderCandidates();
}

// ═══════════════════════════════════════════════
// REMOVE FROM POOL
// ═══════════════════════════════════════════════
function openRemoveFromPoolModal(candId) {
  document.getElementById('rfp-cand-id').value = candId;
  document.querySelectorAll('input[name="rfp-reason"]').forEach(function(r) { r.checked = false; });
  document.getElementById('rfp-notes').value = '';
  document.getElementById('rfp-available-from').value = '';
  document.getElementById('rfp-available-field').style.display = 'none';
  // Show/hide availableFrom field when Temporarily Unavailable is selected
  document.querySelectorAll('input[name="rfp-reason"]').forEach(function(r) {
    r.onchange = function() {
      document.getElementById('rfp-available-field').style.display =
        this.value === 'Temporarily Unavailable' ? '' : 'none';
    };
  });
  openModal('modal-remove-pool');
}

function saveRemoveFromPool() {
  const candId = document.getElementById('rfp-cand-id').value;
  if (!candId) return;
  const reasonEl = document.querySelector('input[name="rfp-reason"]:checked');
  if (!reasonEl) { showToast('Please select a reason.', 'red'); return; }
  const reason = reasonEl.value;
  const notes  = document.getElementById('rfp-notes').value.trim();
  const avFrom = document.getElementById('rfp-available-from').value;
  if (!candidateRatings[candId]) candidateRatings[candId] = {};
  candidateRatings[candId].removedFromPool = true;
  candidateRatings[candId].removalReason   = reason;
  candidateRatings[candId].removalNote     = notes;
  candidateRatings[candId].removalDate     = new Date().toISOString().split('T')[0];
  if (reason === 'Temporarily Unavailable' && avFrom) {
    candidateRatings[candId].availableFrom = avFrom;
  } else {
    delete candidateRatings[candId].availableFrom;
  }
  saveCandidateRatings();
  closeModal('modal-remove-pool');
  closeCandModal();
  renderCandidates();
  updateStats();
  showToast('Candidate removed from pool: ' + reason, 'green');
}

function reactivateFromPool(candId) {
  if (!candidateRatings[candId]) return;
  delete candidateRatings[candId].removedFromPool;
  delete candidateRatings[candId].removalReason;
  delete candidateRatings[candId].removalNote;
  delete candidateRatings[candId].removalDate;
  delete candidateRatings[candId].availableFrom;
  saveCandidateRatings();
  closeCandModal();
  renderCandidates();
  updateStats();
  showToast('Candidate reactivated and returned to pool.', 'green');
}

function checkPoolRemovals() {
  var today = new Date().toISOString().split('T')[0];
  var changed = false;
  Object.keys(candidateRatings).forEach(function(candId) {
    var r = candidateRatings[candId];
    if (!r || !r.removedFromPool || !r.availableFrom) return;
    if (r.availableFrom <= today) {
      delete r.removedFromPool;
      delete r.removalReason;
      delete r.removalNote;
      delete r.removalDate;
      delete r.availableFrom;
      changed = true;
    }
  });
  if (changed) saveCandidateRatings();
  return changed;
}

// ═══════════════════════════════════════════════
// ADD PLACEMENT MODAL (from JO card)
// ═══════════════════════════════════════════════
function openAddPlacementModal(joId, company, position) {
  const sel = document.getElementById('modal-jo-select');
  sel.innerHTML = jobOrders.map(jo => `<option value="${escAttr(jo.id)}" data-company="${escAttr(jo.company)}" data-pos="${escAttr(jo.position)}"${jo.id===joId?' selected':''}>${jo.id} – ${jo.position}</option>`).join('');

  document.getElementById('modal-company').value = company;
  document.getElementById('modal-position').value = position;
  document.getElementById('modal-cand-id').value = '';
  document.getElementById('modal-cand-name').value = '';
  document.getElementById('modal-cand-id').removeAttribute('readonly');
  document.getElementById('modal-date').value = new Date().toISOString().split('T')[0];
  document.getElementById('modal-notes').value = '';

  sel.onchange = function() {
    const opt = this.selectedOptions[0];
    document.getElementById('modal-company').value = opt?.dataset.company || '';
    document.getElementById('modal-position').value = opt?.dataset.pos || '';
  };

  openModal('modal-add-placement');
  setTimeout(initCandAutofill, 50);
}

function savePlacement() {
  const joId = document.getElementById('modal-jo-select').value;
  const candId = document.getElementById('modal-cand-id').value.trim();
  const candName = document.getElementById('modal-cand-name').value.trim();
  const company = document.getElementById('modal-company').value;
  const position = document.getElementById('modal-position').value;
  const response = document.getElementById('modal-response').value;
  const status = document.getElementById('modal-status').value;
  const date = document.getElementById('modal-date').value;
  const notes = document.getElementById('modal-notes').value;

  if (!joId || !candName) { alert('Please fill in Job Order and Candidate Name.'); return; }

  const doSave = () => {
    const placement = {
      placementId: `M-${Date.now()}`,
      jobOrderId: joId,
      candidateId: candId || `M-${Date.now().toString(36)}`,
      candidateName: (() => { const cObj = candidates.find(x => x.id === candId) || candidates.find(x => x.name.trim().toLowerCase() === candName.trim().toLowerCase()); return cObj ? cObj.name : candName; })(),
      company, position, response, status, date, notes,
      source: 'manual'
    };
    const replacementCtx = (() => { try { return JSON.parse(localStorage.getItem('pending_replacement_jo_' + joId) || 'null'); } catch(e){ return null; } })();
    if (replacementCtx) {
      placement.isReplacement = true;
      placement.replacesCandidate = replacementCtx.candId;
      placement.replacementReason = replacementCtx.issueType;
      localStorage.removeItem('pending_replacement_jo_' + joId);
      fbSync('pending_replacement/' + joId, null);
    }
    manualPlacements.push(placement);
    saveManualPlacements();
    closeModal('modal-add-placement');
    renderJobOrders([...placements, ...manualPlacements]);
    buildReminderBanner();
    updateStats();
  };

  // Diagnostic: log why a candidate might not appear in the JO list
  if (candId) {
    const _dbgC = candidates.find(function(x) { return x.id === candId; });
    const _dbgAllP = [...placements, ...manualPlacements];
    const _dbgAlreadyIn = _dbgAllP.some(function(p) { return p.jobOrderId === joId && p.candidateId === candId; });
    console.group('%c[Add Placement Debug] ' + candName + ' (' + candId + ')', 'color:#1755ED;font-weight:700');
    console.log('Blacklisted:', !!blacklist[candId]);
    console.log('Removed from pool:', !!(candidateRatings[candId] && candidateRatings[candId].removedFromPool));
    console.log('Globally hired:', isCandidateHired(candId));
    console.log('Already in this JO (' + joId + '):', _dbgAlreadyIn);
    console.log('In candidates array:', !!_dbgC);
    if (_dbgAlreadyIn) {
      const existing = _dbgAllP.filter(function(p) { return p.jobOrderId === joId && p.candidateId === candId; });
      console.log('Existing placements in this JO:', existing);
      const existingEx = existing.map(function(p) {
        try { return JSON.parse(localStorage.getItem('prow_extra_' + (p.placementId || p.candidateId)) || '{}'); } catch(e) { return {}; }
      });
      console.log('Their prow_extra data:', existingEx);
    }
    console.groupEnd();
    checkDuplicateBeforeAdd(candId, candName, joId, doSave);
  } else {
    doSave();
  }
}

// ═══════════════════════════════════════════════
// ADD TO JO MODAL (from Candidate card)
// ═══════════════════════════════════════════════
function openAddToJOModal(candId, candName) {
  document.getElementById('atj-cand-id').value = candId;
  document.getElementById('atj-cand-name').value = candName;
  document.getElementById('atj-cand-display').value = `${candName} (${candId})`;
  document.getElementById('atj-jo-select').innerHTML = jobOrders.map(jo => `<option value="${escAttr(jo.id)}" data-company="${escAttr(jo.company)}" data-pos="${escAttr(jo.position)}">${jo.id} – ${jo.position} @ ${jo.company}</option>`).join('');
  document.getElementById('atj-date').value = new Date().toISOString().split('T')[0];
  document.getElementById('atj-notes').value = '';
  openModal('modal-add-to-jo');
}

function saveAtjPlacement() {
  const candId = document.getElementById('atj-cand-id').value;
  const candName = document.getElementById('atj-cand-name').value;
  const joSel = document.getElementById('atj-jo-select');
  const joId = joSel.value;
  const opt = joSel.selectedOptions[0];
  const company = opt?.dataset.company || '';
  const position = opt?.dataset.pos || '';
  const response = document.getElementById('atj-response').value;
  const status = document.getElementById('atj-status').value;
  const date = document.getElementById('atj-date').value;
  const notes = document.getElementById('atj-notes').value;

  if (!joId) { alert('Please select a Job Order.'); return; }

  // Check already placed (same-JO is a hard block; cross-JO is checked below
  // by the dismissible warning).
  const allP = [...placements, ...manualPlacements];
  if (allP.find(p => p.jobOrderId === joId && p.candidateId === candId)) {
    alert('This candidate is already in that Job Order.');
    return;
  }

  const doSave = () => {
    const placement = {
      placementId: `M-${Date.now()}`,
      jobOrderId: joId,
      candidateId: candId,
      candidateName: (() => { const cObj = candidates.find(x => x.id === candId); return cObj ? cObj.name : candName; })(),
      company, position, response, status, date, notes,
      source: 'manual'
    };
    const replacementCtxAtj = (() => { try { return JSON.parse(localStorage.getItem('pending_replacement_jo_' + joId) || 'null'); } catch(e){ return null; } })();
    if (replacementCtxAtj) {
      placement.isReplacement = true;
      placement.replacesCandidate = replacementCtxAtj.candId;
      placement.replacementReason = replacementCtxAtj.issueType;
      localStorage.removeItem('pending_replacement_jo_' + joId);
      fbSync('pending_replacement/' + joId, null);
    }

    manualPlacements.push(placement);
    saveManualPlacements();
    closeModal('modal-add-to-jo');
    renderJobOrders([...placements, ...manualPlacements]);
    buildReminderBanner();
    updateStats();
  };

  // Cross-JO dismissible warning — mirrors savePlacement's wrapping. Skips
  // straight to save when candId is absent (no candidate to look up).
  if (candId) {
    checkDuplicateBeforeAdd(candId, candName, joId, doSave);
  } else {
    doSave();
  }
}

// ═══════════════════════════════════════════════
// AI MATCHER
// ═══════════════════════════════════════════════
function populateMatcherDropdown() {
  const sel = document.getElementById('matcher-jo-select');
  sel.innerHTML = '<option value="">— Select a Job Order —</option>' +
    jobOrders.map(jo => `<option value="${escAttr(jo.id)}">${jo.id} – ${jo.position} @ ${jo.company}</option>`).join('');
}

function openMatcherForJO(joId) {
  switchTab('matcher');
  const sel = document.getElementById('matcher-jo-select');
  sel.value = joId;
}

async function runMatcher() {
  ANTHROPIC_API_KEY = getApiKey();
  if (!ANTHROPIC_API_KEY) {
    promptApiKey();
    ANTHROPIC_API_KEY = getApiKey();
    if (!ANTHROPIC_API_KEY) return;
  }
  const joId = document.getElementById('matcher-jo-select').value;
  if (!joId) { alert('Please select a Job Order first.'); return; }

  const jo = jobOrders.find(j => j.id === joId);
  if (!jo) { alert('Job order not found.'); return; }

  const resultsEl = document.getElementById('matcher-results');
  resultsEl.innerHTML = `<div class="ai-loading"><div class="spinner"></div><span>Analyzing candidates with AI…</span></div>`;

  // Already placed in this JO
  const allP = [...placements, ...manualPlacements];
  const alreadyPlaced = new Set(allP.filter(p => p.jobOrderId === joId).map(p => p.candidateId));

  // ── Match Safety Rules: strict filtering ──
  const getPEx = p => { try { return JSON.parse(localStorage.getItem('prow_extra_'+(p.placementId||p.candidateId))||'{}'); } catch(e){ return {}; } };

  const baseEligible = candidates.filter(c => {
    if (blacklist[c.id]) return false;
    if (alreadyPlaced.has(c.id)) return false;
    return true;
  });

  const strictEligible = baseEligible.filter(c => !allP.some(p => {
    if (p.candidateId !== c.id) return false;
    const ex = getPEx(p);
    const dStage = ex.dispositionStage || '';
    const legacyStatus = ex.status || p.status || '';
    return dStage === 'Dropped / Unavailable' || dStage === 'Hired' || legacyStatus === 'Hired';
  }));

  const eligible = strictEligible.length > 0 ? strictEligible : baseEligible;

  if (eligible.length === 0) {
    resultsEl.innerHTML = `<div class="ai-status-msg">No eligible candidates to rank.</div>`;
    return;
  }

  // Build rejection history map for penalty scoring
  const rejHistMap = {};
  allP.forEach(p => {
    const ex = getPEx(p);
    const dStage = ex.dispositionStage || '';
    if (dStage !== 'Rejected by Employer' && dStage !== 'Rejected by Candidate') return;
    const reason = ex.rejectionReason || '';
    if (!reason) return;
    if (!rejHistMap[p.candidateId]) rejHistMap[p.candidateId] = [];
    rejHistMap[p.candidateId].push({ reason, reasonOther: ex.rejectionReasonOther || '', stage: dStage });
  });

  const isHouseholdJO = /yaya|kasambahay|nanny|household|helper|housekeeper|all.around/i.test(jo.position || '');

  const getLocalRejPenalty = candId => {
    let total = 0;
    (rejHistMap[candId] || []).forEach(r => {
      if (r.reason === 'Has young child / no guardian' && isHouseholdJO) total += 2.0;
      else if (r.reason === 'Attitude / behavior concern') total += 2.0;
      else if (r.reason === 'No show / unresponsive') total += 1.5;
      else if (r.reason === 'Salary mismatch') total += 1.0;
      else if (r.reason === 'Location issue') total += 1.0;
      else if (r.reason === 'Employer preference') total += 0.5;
      else if (r.reason !== 'Already placed elsewhere') total += 0.5;
    });
    return total;
  };

  // Step 1: Calculate ERA with JO context
  // Step 2: Sort by adjusted ERA score (ERA minus rejection penalty) → job match → location match
  const scoredEligible = eligible.map(c => {
    const era = calcERA(c.id, joId);
    const jobMatchScore = era.qualityFlags?.jobMatch ? 1 : 0;
    const locMatchScore = era.qualityFlags?.locationMatch ? 1 : 0;
    const rejPenalty = getLocalRejPenalty(c.id);
    return { c, era, jobMatchScore, locMatchScore, rejPenalty };
  });

  scoredEligible.sort((a, b) => {
    const scoreA = a.era.score - a.rejPenalty;
    const scoreB = b.era.score - b.rejPenalty;
    if (scoreB !== scoreA) return scoreB - scoreA;
    if (b.jobMatchScore !== a.jobMatchScore) return b.jobMatchScore - a.jobMatchScore;
    return b.locMatchScore - a.locMatchScore;
  });

  // Top 30 only for token efficiency
  const eligibleSorted = scoredEligible.slice(0, 30).map(x => x.c);

  // ERA score descending — higher-scoring candidates first.
  eligibleSorted.sort((a, b) => calcERA(b.id, joId).score - calcERA(a.id, joId).score);

  // Helper: extract numeric salary
  const parseSalary = val => { const n = parseInt((val||'').replace(/[^0-9]/g,'')); return isNaN(n)?null:n; };
  const joSalaryNum = parseSalary(jo.salary);

  const candSummaries = eligibleSorted.map(c => {
    const era = calcERA(c.id, joId);
    const docs = (candidateRatings[c.id]?.docs)||{};
    const docStr = ['brgy','police','resume','nbi','validId'].filter(k=>docs[k]).join(',') || 'none';
    const effVer = getEffectiveVerified(c);
    const rLabel = getRatingLabel(era.score).label;
    const qf = era.qualityFlags || {};
    // R1: derive readiness from ERA score alone (no gateOk dependency).
    const readinessLevel = era.score >= 7 ? 'Ready' : era.score >= 5 ? 'Needs Verification' : 'Not Ready';
    const candNotes = getCandNotes(c.id);
    const latestNote = candNotes.length ? candNotes[0].text : '';
    const setupPref = getEffectiveSetup(c);
    const candSalaryNum = parseSalary(c.expectedPay);
    const salaryFlag = joSalaryNum && candSalaryNum && candSalaryNum > joSalaryNum ? 'SalaryHigh' : (joSalaryNum && candSalaryNum && candSalaryNum <= joSalaryNum ? 'SalaryOK' : 'SalaryUnknown');
    const missing = [];
    if (!c.phone && !c.facebook) missing.push('no contact');
    if (!c.location) missing.push('no location');
    if (!c.expectedPay) missing.push('no salary');
    if (!c.jobType) missing.push('no job type');
    if (!effVer && !docs.validId) missing.push('no ID');
    const rejHist = (rejHistMap[c.id] || []).map(r => r.reason + (r.reasonOther ? ': ' + r.reasonOther : '')).join('; ') || 'none';
    return `ID: ${c.id} | ERA: ${era.score} (${rLabel}) | Readiness: ${readinessLevel} | E:${era.E>=0?'+':''}${era.E.toFixed(1)} R:${era.R>=0?'+':''}${era.R.toFixed(1)} A:${era.A>=0?'+':''}${era.A.toFixed(1)} | Name: ${c.name} | Age: ${c.age||'?'} | Gender: ${c.gender||'?'} | Job: ${c.jobTypeFormatted||c.jobType||'?'} | Setup: ${setupPref||'?'} | City: ${c.cityFormatted||c.location||'?'} | Pay: ${c.expectedPay||'?'} | SalaryFlag: ${salaryFlag} | Skills: ${c.skills||'none'} | PastJobs: ${c.pastJobs||'none'} | Exp: ${c.experienceFlag} | Verified: ${effVer?'Yes':'No'} | Docs: ${docStr} | JobMatch: ${qf.jobMatch?'Yes':'No'} | LocMatch: ${qf.locationMatch?'Yes':'No'} | AgeMatch: ${qf.ageMatch?'Yes':'No'} | MissingFields: ${missing.join(',')||'none'} | Note: ${latestNote||''} | RejHist: ${rejHist}`;
  }).join('\n');

  // Job type equivalents for context
  const JOB_GROUPS = [
    'Yaya / Babysitter, Kasambahay, Housekeeper, Nanny, Household Helper, All-around helper',
    'Cook / Kitchen Staff, Dishwasher, Barista',
    'Driver (Personal / Company), Delivery Rider',
    'Security Guard',
    'Office Admin / Secretary, Encoder / Data Entry',
  ];

  const prompt = `You are a job matching assistant for Job Search PH, a DOLE-compliant blue-collar placement agency in Bacolod City, Philippines specializing in household workers (Yaya, Kasambahay, All-around helpers).

JOB ORDER:
ID: ${jo.id}
Company/Employer: ${jo.company}
Position: ${jo.position}
Slots: ${jo.slots}
Offered Salary: ${jo.salary}
Location: ${jo.address||'Bacolod area'}
Setup: ${jo.workSchedule||'not specified'}
Gender Preference: ${jo.genderPref||'any'}
Skills Needed: ${jo.skillsNeeded||'none specified'}
Other Notes: ${jo.otherNotes||''}

EQUIVALENT JOB TYPE GROUPS (treat roles in the same group as matching):
${JOB_GROUPS.join('\n')}

ELIGIBLE CANDIDATES:
${candSummaries}

Rank the TOP 3 best-fit candidates. Apply these matching rules in order:
1. JOB MATCH — candidate job type must match or be equivalent to the position. Treat similar roles as matching (e.g. Yaya = Kasambahay = Nanny = Household Helper).
2. LOCATION — prefer candidates in the same city as the employer. Flag if location is far or unknown.
3. SALARY — if SalaryFlag is SalaryHigh, flag it as a concern. If SalaryOK, note it positively. If SalaryUnknown, flag as TBD.
4. SETUP — prefer candidates whose setup preference (stay-in/stay-out) matches the job.
5. READINESS — Ready > Partial > Unproven. Never rank Unproven #1 unless no other option.
6. MISSING FIELDS — if MissingFields is not "none", list them as gaps in the flags field.

For each ranked candidate, include a "checklist" object with these exact keys (true/false/null):
- jobMatch: does candidate job type match the position?
- locationMatch: is candidate location same city as employer?
- salaryOk: is expected pay within offered salary?
- setupMatch: does setup preference match?
- hasDocuments: has at least one document verified?
- profileComplete: are MissingFields empty?

Return ONLY valid JSON array, no markdown, no preamble:
[
  {
    "rank": 1,
    "id": "C-xxx",
    "name": "Full Name",
    "fit": "Excellent|Good|Fair|Poor",
    "reason": "Short reason why this candidate fits (2-3 sentences)",
    "flags": "Specific concerns or missing info (or empty string)",
    "nextStep": "Recommended next action",
    "checklist": { "jobMatch": true, "locationMatch": true, "salaryOk": true, "setupMatch": null, "hasDocuments": false, "profileComplete": true }
  }
]`;

  try {
    const resp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 4000,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    if (!resp.ok) {
      const err = await resp.json().catch(()=>({}));
      throw new Error(err.error?.message || `HTTP ${resp.status}`);
    }

    const data = await resp.json();
    const raw = data.content?.find(b=>b.type==='text')?.text || '[]';
    const clean = raw.replace(/```json|```/g,'').trim();
    const ranked = JSON.parse(clean);

    renderMatcherResults(ranked, joId);
  } catch (err) {
    resultsEl.innerHTML = `<div class="error-msg">AI Matcher error: ${escHtml(err.message)}</div>`;
  }
}

function renderMatcherResults(ranked, joId) {
  const resultsEl = document.getElementById('matcher-results');

  if (!ranked.length) {
    resultsEl.innerHTML = `<div class="ai-status-msg">No ranked results returned.</div>`;
    return;
  }

  resultsEl.innerHTML = `<div style="font-size:12px;color:var(--text3);margin-bottom:8px;">Showing ${ranked.length} ranked candidates for this job order</div>`;

  const allPl = [...placements, ...manualPlacements];
  const getExR = p => { try { return JSON.parse(localStorage.getItem('prow_extra_'+(p.placementId||p.candidateId))||'{}'); } catch(e){ return {}; } };
  const getRejWarnings = candId => {
    const w = [];
    allPl.forEach(p => {
      if (p.candidateId !== candId) return;
      const ex = getExR(p);
      const dStage = ex.dispositionStage || '';
      if (dStage !== 'Rejected by Employer' && dStage !== 'Rejected by Candidate') return;
      const reason = ex.rejectionReason || '';
      if (!reason) return;
      const by = dStage === 'Rejected by Employer' ? 'Employer' : 'Candidate';
      w.push(by + ': ' + reason + (ex.rejectionReasonOther ? ' (' + ex.rejectionReasonOther + ')' : ''));
    });
    return w;
  };

  ranked.forEach(r => {
    const fitClass = {
      'Excellent': 'fit-excellent',
      'Good': 'fit-good',
      'Fair': 'fit-fair',
      'Poor': 'fit-poor'
    }[r.fit] || 'fit-fair';

    // Build readiness checklist
    const cl = r.checklist || {};
    const checkItems = [
      { key: 'jobMatch',        label: 'Job match' },
      { key: 'locationMatch',   label: 'Location' },
      { key: 'salaryOk',        label: 'Salary' },
      { key: 'setupMatch',      label: 'Setup' },
      { key: 'hasDocuments',    label: 'Documents' },
      { key: 'profileComplete', label: 'Profile complete' },
    ];
    const checklistHtml = checkItems.map(item => {
      const val = cl[item.key];
      const icon = val === true ? '\u2705' : val === false ? '\u274c' : '\u26a0\ufe0f';
      const color = val === true ? 'var(--green)' : val === false ? 'var(--red)' : 'var(--gold)';
      return `<span style="font-size:11px;color:${color};white-space:nowrap">${icon} ${item.label}</span>`;
    }).join(' ');

    const rejWarnings = getRejWarnings(r.id);
    const rejWarningHtml = rejWarnings.length
      ? `<div class="ai-rej-warning">&#9888; Prior rejection: ${escHtml(rejWarnings.join(' | '))}</div>`
      : '';

    const card = document.createElement('div');
    card.className = 'ai-result-card';
    card.innerHTML = `
      <div class="ai-rank rank-${r.rank}">#${r.rank}</div>
      <div>
        <div style="display:flex;gap:8px;align-items:center;margin-bottom:4px">
          <div class="ai-name">${escHtml(r.name)}</div>
          <span class="fit-badge ${fitClass}">${escHtml(r.fit)}</span>
          <span style="font-family:var(--mono);font-size:10px;color:var(--text3)">${escHtml(r.id)}</span>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:8px;padding:8px;background:var(--card2);border-radius:8px;border:1px solid var(--border)">${checklistHtml}</div>
        ${rejWarningHtml}
        <div class="ai-reason">${escHtml(r.reason)}</div>
        ${r.flags ? `<div class="ai-flags">&#9873; ${escHtml(r.flags)}</div>` : ''}
        ${r.nextStep ? `<div class="ai-next">&rarr; ${escHtml(r.nextStep)}</div>` : ''}
      </div>
      <div>
        <button class="btn btn-green" onclick="addFromMatcher('${escAttr(joId)}','${escAttr(r.id)}','${escAttr(r.name)}')">+ Add</button>
      </div>
    `;
    resultsEl.appendChild(card);
  });
}

function addFromMatcher(joId, candId, candName) {
  document.getElementById('atj-cand-id').value = candId;
  document.getElementById('atj-cand-name').value = candName;
  document.getElementById('atj-cand-display').value = `${candName} (${candId})`;
  document.getElementById('atj-jo-select').innerHTML = jobOrders.map(jo => `<option value="${escAttr(jo.id)}" data-company="${escAttr(jo.company)}" data-pos="${escAttr(jo.position)}"${jo.id===joId?' selected':''}>${jo.id} – ${jo.position} @ ${jo.company}</option>`).join('');
  document.getElementById('atj-date').value = new Date().toISOString().split('T')[0];
  document.getElementById('atj-notes').value = '';
  openModal('modal-add-to-jo');
}

// ═══════════════════════════════════════════════
// CANDIDATE PROFILE MODAL
// ═══════════════════════════════════════════════
function openCandModal(candId) {
  try { _openCandModalInner(candId); } catch(err) { alert('Profile error: ' + err.message); console.error(err); }
}
function openCandModalByName(name, fallbackId) {
  const byId = candidates.find(x => x.id === fallbackId);
  // Only trust the ID lookup if the name also matches. This guards against
  // the "shifted ID" bug where a stale placement's candidateId now resolves
  // to a different person (e.g. Zennia's old C450 → Dona after row deletions).
  if (byId && name && byId.name &&
      byId.name.trim().toLowerCase() === name.trim().toLowerCase()) {
    openCandModal(fallbackId);
    return;
  }
  const byName = candidates.find(x =>
    x.name.trim().toLowerCase() === (name || '').trim().toLowerCase()
  );
  if (byName) {
    if (byId && byId.id !== byName.id) {
      console.warn(`Stale candidateId for "${name}": ${fallbackId} → ${byName.id}`);
    }
    openCandModal(byName.id);
    return;
  }
  // No name match — fall back to whatever the ID resolved to, if anything.
  if (byId) { openCandModal(fallbackId); return; }
  alert('Candidate not found: ' + name);
}
function _openCandModalInner(candId) {
  // Primary lookup by ID
  let c = candidates.find(x => x.id === candId);

  // Fallback: if ID not found, try matching by name from placements
  if (!c) {
    const allPlacements = [...placements, ...manualPlacements];
    const matchedPlacement = allPlacements.find(p => p.candidateId === candId);
    if (matchedPlacement?.candidateName) {
      c = candidates.find(x =>
        x.name.trim().toLowerCase() === matchedPlacement.candidateName.trim().toLowerCase()
      );
      if (c) {
        allPlacements.forEach(p => {
          if (p.candidateId === candId && p.candidateName.trim().toLowerCase() === c.name.trim().toLowerCase()) {
            p.candidateId = c.id;
          }
        });
        manualPlacements.forEach(p => {
          if (p.candidateId === candId && p.candidateName.trim().toLowerCase() === c.name.trim().toLowerCase()) {
            p.candidateId = c.id;
          }
        });
        saveManualPlacements();
      }
    }
  }

  if (!c) {
    alert('Candidate details not found in current data.');
    return;
  }
  importPendingIntakeNotes(candId, c.name);

  const isBlacklisted = !!blacklist[c.id];
  const isRemoved = !!(candidateRatings[c.id] && candidateRatings[c.id].removedFromPool);
  const removedReason = isRemoved ? (candidateRatings[c.id].removalReason || '') : '';
  const removedDate   = isRemoved ? (candidateRatings[c.id].removalDate || '') : '';
  const availFrom     = isRemoved ? (candidateRatings[c.id].availableFrom || '') : '';
  const effectiveVerified = getEffectiveVerified(c);
  const autoVerifiedByDoc = isAutoVerified(c.id) && c.status !== 'Verified';
  const verifiedBadge = effectiveVerified
    ? `<span class="cand-badge badge-verified">Verified${autoVerifiedByDoc ? ' (auto)' : ''}</span>`
    : '<span class="cand-badge badge-unverified">Unverified</span>';
  const blBadge = isBlacklisted ? '<span class="cand-badge badge-blacklisted">Blacklisted</span>' : '';

  const field = (label, val, full=false) => `
    <div class="cand-modal-field${full?' full':''}">
      <div class="cand-modal-field-label">${label}</div>
      <div class="cand-modal-field-val${!val?' empty':''}">${val ? escHtml(val) : '—'}</div>
    </div>`;

  const contactBtns = [];
  if (c.phone) {
    contactBtns.push(`<a class="cand-modal-contact-btn" href="tel:${encodeURIComponent(c.phone)}" style="border-color:rgba(5,150,105,.3);background:rgba(5,150,105,.06)">
      <div><div class="label" style="color:var(--green)">Phone Call</div><div class="sub">${escHtml(c.phone)}</div></div></a>`);
    contactBtns.push(`<a class="cand-modal-contact-btn" href="sms:${encodeURIComponent(c.phone)}">
      <div><div class="label">SMS / Text</div><div class="sub">${escHtml(c.phone)}</div></div></a>`);
  }
  if (c.facebook) {
    const fbSearch = `https://www.facebook.com/search/people/?q=${encodeURIComponent(c.facebook)}`;
    contactBtns.push(`<a class="cand-modal-contact-btn" href="${fbSearch}" target="_blank">
      <div><div class="label">Facebook Messenger</div><div class="sub">${escHtml(c.facebook)}</div></div></a>`);
  }
  if (c.email) {
    contactBtns.push(`<a class="cand-modal-contact-btn" href="mailto:${encodeURIComponent(c.email)}">
      <div><div class="label">Gmail / Email</div><div class="sub">${escHtml(c.email)}</div></div></a>`);
  }

  const ratingFull  = calcCandRatingFull(c.id);
  const rating      = ratingFull.score;
  const ratingColor = getRatingColor(rating);
  const ratingStars = getRatingStars(rating);
  const storedRating = candidateRatings[c.id] || {};
  const docs   = storedRating.docs    || {};
  const scores = storedRating.scores  || {};
  const activeJOs = getCandidateActiveJOs(c.id);
  const highDemand = activeJOs.length >= 2;

  // Readiness + placement history data
  const candAllPlacements = [...placements, ...manualPlacements].filter(p => p.candidateId === c.id);
  const candPlacExtras = candAllPlacements.map(p => {
    const pid = p.placementId || p.candidateId;
    let ex = {};
    try { ex = JSON.parse(localStorage.getItem('prow_extra_' + pid) || '{}'); } catch(e){}
    return { p, ex };
  });
  const allLastContactsMeta = candPlacExtras
    // Always-on dashboard. Profile "Last Contacted" must not surface broadcast dates.
    .map(({p, ex}) => ({ date: ex.lastDirectContactAt || ex.lastContacted || '', via: ex.contactVia || '' }))
    .filter(x => x.date)
    .sort((a, b) => b.date.localeCompare(a.date));
  const lastContactedOverall = allLastContactsMeta[0]?.date || '';
  const lastContactedVia = allLastContactsMeta[0]?.via || '';

  const inner = document.getElementById('cand-modal-inner');
  inner.dataset.candId = c.id;
  inner.innerHTML = `
    <div class="cand-modal-hero">
      <div class="cand-modal-avatar">${genderEmoji(c.gender)}</div>
      <div style="flex:1">
        <div class="cand-modal-name">${escHtml(c.name)}</div>
        <div class="cand-modal-id">${escHtml(c.id)} · Registered ${escHtml(fmtDate(c.timestamp?.split(' ')[0]||''))}</div>
        <div class="cand-badges">${verifiedBadge}${blBadge}${getAutoTags(c.id).map(t=>`<span class="cand-badge" style="background:${t.color}18;color:${t.color};border-color:${t.color}40">${t.label}</span>`).join('')}</div>
      </div>
      <button class="cand-modal-close" onclick="closeCandModal()">×</button>
    </div>
    <div class="cand-modal-body">

      ${isRemoved ? `
      <div style="background:rgba(100,116,139,.10);border:1px solid rgba(100,116,139,.3);border-radius:12px;padding:12px 16px;margin-bottom:16px;display:flex;align-items:center;gap:12px;flex-wrap:wrap">
        <div style="flex:1">
          <div style="font-size:12px;font-weight:700;color:var(--text2)">Removed from Pool · ${escHtml(removedReason)}</div>
          <div style="font-size:11px;color:var(--text3);margin-top:2px">${removedDate ? 'Removed on ' + escHtml(removedDate) : ''}${availFrom ? ' · Available from ' + escHtml(availFrom) : ''}</div>
        </div>
        <button class="btn btn-green" style="font-size:12px;padding:6px 14px" onclick="reactivateFromPool('${escAttr(c.id)}')">Reactivate</button>
      </div>` : ''}

      <div class="cand-modal-section">
        <div class="cand-modal-section-title">Rating</div>

        <!-- ERA Score Hero -->
        <div class="era-hero">
          <div class="era-circle" style="border-color:${ratingColor};color:${ratingColor}">
            <div class="era-score-num">${rating}</div>
            <div class="era-score-sub">ERA</div>
          </div>
          <div style="flex:1;min-width:0">
            <div class="era-label-badge" style="background:${ratingColor}18;color:${ratingColor};border-color:${ratingColor}40">
              ${getRatingLabel(rating).label}${ratingFull.isBlacklisted ? ' · Do Not Recommend' : ''}
            </div>
            <div class="era-stars">${ratingStars}</div>
            ${highDemand ? '<div class="rating-hd-tag">High Demand</div>' : ''}
            ${activeJOs.length ? `<div style="font-size:11px;color:var(--text2);margin-top:4px">Active in ${activeJOs.length} JO${activeJOs.length>1?'s':''}</div>` : ''}
          </div>
        </div>

        <!-- ERA Pillars -->
        <div class="era-pillars">
          ${[
            ['E','Eligibility',    ratingFull.era.E, 5.5, ratingFull.era.eBreakdown, 'var(--accent)'],
            ['R','Responsiveness', ratingFull.era.R, 3.0, ratingFull.era.rBreakdown, 'var(--green)'],
            ['A','Attitude',       ratingFull.era.A, 4.0, ratingFull.era.aBreakdown, 'var(--purple)'],
          ].map(([key,name,val,max,bd,col]) => `
            <div class="era-pillar">
              <div class="era-pillar-header">
                <span class="era-pillar-key" style="color:${col}">${key}</span>
                <span class="era-pillar-name">${name}</span>
                <span class="era-pillar-val" style="color:${col}">${val >= 0 ? '+' : ''}${val.toFixed(1)}</span>
              </div>
              <div class="era-pillar-bar-bg">
                <div class="era-pillar-bar-fill" style="width:${Math.max(0,Math.min(100,(val/max)*100))}%;background:${col}"></div>
              </div>
              <div class="era-pillar-breakdown">
                ${bd.map(b=>`<div class="era-bd-row">
                  <span class="era-bd-sign ${b.sign==='+'?'era-plus':b.sign==='-'?'era-minus':''}">${b.sign}</span>
                  <span class="era-bd-label">${escHtml(b.label)}</span>
                  <span class="era-bd-val">${typeof b.val==='number'?b.val.toFixed(1):b.val}</span>
                </div>`).join('') || '<div class="era-bd-row" style="color:var(--text3);font-style:italic">No data yet</div>'}
              </div>
            </div>`).join('')}
        </div>

        <!-- Bonus row -->
        ${ratingFull.era.bonus > 0 ? `
        <div class="era-bonus-row">
          <span class="era-bonus-label">Bonuses</span>
          <span class="era-bonus-val">+${ratingFull.era.bonus.toFixed(1)}</span>
          <span class="era-bonus-items">${ratingFull.era.bonusBreakdown.map(b=>escHtml(b.label)).join(' · ')}</span>
        </div>` : ''}

        <!-- Total -->
        <div class="era-total-row">
          <span>Base 2.0 + E(${ratingFull.era.E>=0?'+':''}${ratingFull.era.E.toFixed(1)}) + R(${ratingFull.era.R>=0?'+':''}${ratingFull.era.R.toFixed(1)}) + A(${ratingFull.era.A>=0?'+':''}${ratingFull.era.A.toFixed(1)}) + Bonus(${ratingFull.era.bonus>=0?'+':''}${ratingFull.era.bonus.toFixed(1)})</span>
          <span class="era-total-score" style="color:${ratingColor}">${rating}</span>
        </div>

        <!-- Readiness Gate Status -->
        <div class="quality-flags-row">
          ${[
            ['Valid ID',    ratingFull.era.hasValidId],
            ['R Signal',    ratingFull.era.hasRSignal],
            ['A Signal',    ratingFull.era.hasASignal],
            ['Doc Cap',     ratingFull.era.docCap + ' / 10'],
          ].map(([label, met]) => {
            if (typeof met === 'string') {
              return `<div class="quality-flag-chip" style="border-color:var(--accent)20;background:var(--accent)10;color:var(--accent)">
                ${label}: <strong>${met}</strong>
              </div>`;
            }
            const color = met ? 'var(--green)' : 'var(--red)';
            const text  = met ? 'Met' : 'Missing';
            return `<div class="quality-flag-chip" style="border-color:${color}20;background:${color}10;color:${color}">
              ${label}: <strong>${text}</strong>
            </div>`;
          }).join('')}
        </div>

        <!-- Documents -->
        <div class="cand-modal-section-title" style="margin-top:14px">
          Documents
          ${(() => { const dc = getDocConfidence(c.id); return `<span style="font-size:10px;font-weight:700;color:${dc.color};margin-left:8px;background:${dc.color}15;padding:2px 8px;border-radius:99px;border:1px solid ${dc.color}40">${dc.label}</span>`; })()}
          ${autoVerifiedByDoc ? '<span style="font-size:10px;font-weight:700;color:var(--green);margin-left:4px;background:rgba(5,150,105,.1);padding:2px 8px;border-radius:99px;border:1px solid rgba(5,150,105,.3)">Auto-Verified</span>' : ''}
        </div>
        <div class="rating-docs-grid">
          ${[
            ['brgy',    'Brgy Clearance',     '+0.5', true],
            ['police',  'Police Clearance',   '+1.0', true],
            ['nbi',     'NBI Clearance',      '+0.5', true],
            ['validId', 'Valid ID',           '+0.5', true],
            ['resume',  'Resume',             '+0.5', false],
            ['medical', 'Medical Cert',       'info', true],
          ].map(([key,label,pts,isVerifyDoc])=>`
          <div class="rating-doc-card ${docs[key]?'doc-checked':''}" onclick="saveCandDoc('${escAttr(c.id)}','${key}',${!docs[key]})">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px">
              ${isVerifyDoc ? '<div style="font-size:8px;color:var(--accent);font-weight:700;background:var(--accent-dim);padding:1px 5px;border-radius:4px">VERIFIES</div>' : '<div></div>'}
            </div>
            <div class="doc-name">${label}</div>
            <div class="doc-pts" style="color:${pts==='info'?'var(--text3)':pts.startsWith('+')?'var(--green)':'var(--red)'}">${pts}</div>
            <div class="doc-status">${docs[key]?'Submitted':'Not yet'}</div>
          </div>`).join('')}
        </div>

        <!-- Call Attitude -->
        <div class="cand-modal-section-title" style="margin-top:14px">Call Attitude</div>
        <div class="attitude-row">
          ${[1,2,3,4,5].map(n => {
            const labels = {1:'Poor',2:'Below Avg',3:'Average',4:'Good',5:'Excellent'};
            const pts = {1:'-1.5',2:'-0.5',3:'0',4:'+1.0',5:'+1.0'};
            const sel = (scores.callAttitude||0) === n;
            return `<button class="attitude-btn ${sel?'attitude-sel':''}" onclick="saveCandScore('${escAttr(c.id)}','callAttitude',${n})">
              <div class="att-num">${n}</div>
              <div class="att-label">${labels[n]}</div>
              <div class="att-pts">${pts[n]}</div>
            </button>`;
          }).join('')}
        </div>

        <!-- Behavior Flags -->
        <div class="cand-modal-section-title" style="margin-top:14px">Behavior Flags <span style="font-size:10px;color:var(--text3);font-weight:400;margin-left:4px">Click to toggle</span></div>
        <div class="era-flags-section">
          <div class="era-flags-group-label" style="color:var(--green)">R — Responsiveness</div>
          <div class="rating-flags-grid">
            ${[
              ['repliedFast',   'Replied within 24 hours',       'R +1.0', false],
              ['answeredCall',  'Answered call',                  'R +1.0', false],
              ['confirmedIntv', 'Confirmed availability',         'R +1.0', false],
              ['lateReply',     'Slow reply (3+ days)',           'R -1.0', true],
              ['noShow',        'No response',                    'R -2.5', true],
              ['multiFollowup', 'Needed multiple follow-ups',     'R -1.0', true],
            ].map(([key,label,pts,bad]) => `
              <div class="rating-flag-card ${scores[key]?'flag-active':''} ${bad?'flag-bad':'flag-good'}" onclick="saveCandScore('${escAttr(c.id)}','${key}',${!scores[key]})">
                <div class="flag-label" style="font-size:11px;font-weight:600">${label}</div>
                <div class="flag-pts" style="color:${bad?'var(--red)':'var(--green)'}">${pts}</div>
                <div class="flag-check">${scores[key]?'☑':'☐'}</div>
              </div>`).join('')}
          </div>
          <div class="era-flags-group-label" style="color:var(--purple);margin-top:10px">A — Attitude</div>
          <div class="rating-flags-grid">
            ${[
              ['polite',              'Clear communication',                  'A +1.0', false],
              ['passedScreening',     'Consistent answers',                   'A +1.0', false],
              ['willingToWork',       'Willing to work',                      'A +0.5', false],
              ['followsInstructions', 'Follows instructions',                 'A +0.5', false],
              ['hesitantAnswers',     'Hesitant answers',                     'A -1.0', true],
              ['confusingAnswers',    'Confusing / inconsistent answers',     'A -1.0', true],
            ].map(([key,label,pts,bad]) => `
              <div class="rating-flag-card ${scores[key]?'flag-active':''} ${bad?'flag-bad':'flag-good'}" onclick="saveCandScore('${escAttr(c.id)}','${key}',${!scores[key]})">
                <div class="flag-label" style="font-size:11px;font-weight:600">${label}</div>
                <div class="flag-pts" style="color:${bad?'var(--red)':'var(--green)'}">${pts}</div>
                <div class="flag-check">${scores[key]?'☑':'☐'}</div>
              </div>`).join('')}
          </div>
          <div class="era-flags-group-label" style="color:var(--text3);margin-top:10px">Track Record (Bonus)</div>
          <div class="rating-flags-grid">
            ${[
              ['showedUp',     'Showed up to interview',     'Bonus +1.5', false],
              ['completedJob', 'Completed a job',            'Bonus +2.0', false],
              ['workIntentConfirmed',   'Work intent confirmed',   'E +1.0', false],
              ['availabilityConfirmed', 'Availability confirmed',  'E +1.0', false],
              ['backedOut',    'Backed out after accepting', 'Bonus -2.0', true],
            ].map(([key,label,pts,bad]) => `
              <div class="rating-flag-card ${scores[key]?'flag-active':''} ${bad?'flag-bad':'flag-good'}" onclick="saveCandScore('${escAttr(c.id)}','${key}',${!scores[key]})">
                <div class="flag-label" style="font-size:11px;font-weight:600">${label}</div>
                <div class="flag-pts" style="color:${bad?'var(--red)':'var(--text3)'}">${pts}</div>
                <div class="flag-check">${scores[key]?'☑':'☐'}</div>
              </div>`).join('')}
          </div>
        </div>
      </div>

      <div class="cand-modal-section">
        <div class="cand-modal-section-title">Personal Info</div>
        <div class="cand-modal-grid">
          ${field('Age', c.age)}
          ${field('Gender', c.gender)}
          ${field('Location', c.locationRaw || c.location)}
          ${field('Expected Pay', c.expectedPay)}
          <div class="cand-modal-field"><div class="cand-modal-field-label">Setup</div><div class="cand-modal-field-val"><span class="setup-toggle-wrap">${buildSetupToggleHTML(c.id)}</span></div></div>
          ${field('Job Type', c.jobTypeRaw || c.jobType)}
          ${field('Verified Status', effectiveVerified ? (autoVerifiedByDoc ? 'Verified (auto via docs)' : 'Verified') : 'Unverified')}
          ${field('Last Contacted', lastContactedOverall ? (fmtDate(lastContactedOverall) + (lastContactedVia ? ' · ' + lastContactedVia : '')) : '—')}
          <div class="cand-modal-field">
            <div class="cand-modal-field-label">Civil Status</div>
            <div class="cand-modal-field-val">
              <select onchange="saveCandPersonalField('${escAttr(c.id)}','civilStatus',this.value)" style="width:100%;background:var(--card2);border:1px solid var(--border2);color:var(--text);padding:5px 8px;border-radius:6px;font-family:var(--sans);font-size:12px;outline:none">
                ${['','Single','Married','Separated','Widowed','Other'].map(v=>`<option value="${escAttr(v)}"${v===(c.civilStatus||'')?' selected':''}>${v||'—'}</option>`).join('')}
              </select>
            </div>
          </div>
          <div class="cand-modal-field">
            <div class="cand-modal-field-label">Has Kids</div>
            <div class="cand-modal-field-val">
              <select onchange="saveCandPersonalField('${escAttr(c.id)}','hasKids',this.value)" style="width:100%;background:var(--card2);border:1px solid var(--border2);color:var(--text);padding:5px 8px;border-radius:6px;font-family:var(--sans);font-size:12px;outline:none">
                ${['','Yes','No'].map(v=>`<option value="${escAttr(v)}"${v===(c.hasKids||'')?' selected':''}>${v||'—'}</option>`).join('')}
              </select>
            </div>
          </div>
          ${c.hasKids === 'Yes' ? `
          <div class="cand-modal-field">
            <div class="cand-modal-field-label"># of Kids</div>
            <div class="cand-modal-field-val">
              <input type="number" min="0" max="20" value="${escAttr(c.numKids||'')}" onchange="saveCandPersonalField('${escAttr(c.id)}','numKids',this.value)" style="width:100%;background:var(--card2);border:1px solid var(--border2);color:var(--text);padding:5px 8px;border-radius:6px;font-family:var(--mono);font-size:12px;outline:none">
            </div>
          </div>` : ''}
        </div>
      </div>

      <div class="cand-modal-section">
        <div class="cand-modal-section-title">Experience</div>
        <div class="cand-modal-grid">
          ${field('Skills & Qualifications', c.skills, true)}
          ${field('Past Jobs / Work History', c.pastJobs, true)}
        </div>
      </div>

      <div class="cand-modal-section">
        <div class="cand-modal-section-title">Contact</div>
        <button class="btn btn-ghost" style="width:100%;margin-bottom:8px;justify-content:center;gap:8px" onclick="openTmplPickerForCand('${escAttr(c.id)}','${escAttr(c.name)}')">
          Copy Message Template
        </button>
        ${contactBtns.length ? `<div style="display:flex;flex-direction:column;gap:8px">${contactBtns.join('')}</div>` : ''}
      </div>

      ${candPlacExtras.length ? `
      <div class="cand-modal-section">
        <div class="cand-modal-section-title">Job Order Activity</div>
        ${candPlacExtras.map(({p, ex}) => {
          const jo = jobOrders.find(j => j.id === p.jobOrderId);
          const joLabel = jo ? escHtml(jo.jobTitle || jo.position || p.jobOrderId) : escHtml(p.jobOrderId);
          const joComp  = jo ? escHtml(jo.company || '') : '';
          const status  = ex.status || p.status || 'Messaged';
          const notes   = ex.notes || '';
          // Always-on dashboard. Profile JO Activity per-row "Last contacted".
          const lc      = ex.lastDirectContactAt || ex.lastContacted || '';
          const dotCls  = getStatusDotClass(status, ex.response || p.response || '');
          return `<div style="padding:10px 12px;border:1px solid var(--border);border-radius:8px;margin-bottom:8px;font-size:13px">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">
              <span class="status-dot ${dotCls}"></span>
              <span style="font-weight:600;color:var(--text)">${joLabel}</span>
              ${joComp ? `<span style="color:var(--text3)">· ${joComp}</span>` : ''}
              <span style="margin-left:auto;font-size:11px;color:var(--text3)">${escHtml(p.jobOrderId)}</span>
            </div>
            <div style="display:flex;gap:12px;flex-wrap:wrap;font-size:11px;color:var(--text2);margin-bottom:${notes?'6px':'0'}">
              <span>Status: <strong>${escHtml(status)}</strong></span>
              ${lc ? `<span>Last contacted: <strong>${escHtml(fmtDate(lc))}</strong></span>` : ''}
              ${ex.contactVia ? `<span>Via: <strong>${escHtml(ex.contactVia)}</strong></span>` : ''}
            </div>
            ${notes ? `<div style="font-size:12px;color:var(--text2);border-top:1px solid var(--border);padding-top:6px;margin-top:2px">${escHtml(notes)}</div>` : ''}
          </div>`;
        }).join('')}
      </div>` : ''}

      ${buildContactHistory(c.id)}

      ${buildCandNotesSection(c.id)}

      <div class="cand-modal-section" id="prof-msg-section-${escAttr(c.id)}">
        <div class="cand-modal-section-title">Profile Message</div>
        <button class="prof-msg-btn" onclick="generateCandidateProfile('${escAttr(c.id)}')">
          Generate Profile Message
        </button>
      </div>

      <div style="display:flex;gap:8px;padding-top:4px;flex-wrap:wrap">
        ${!isBlacklisted
          ? `<button class="btn btn-red" style="flex:1" onclick="closeCandModal();openBlacklistModal('${escAttr(c.id)}','${escAttr(c.name)}')">Blacklist</button>`
          : `<button class="btn btn-ghost" style="flex:1" onclick="closeCandModal();removeBlacklist('${escAttr(c.id)}')">Remove Blacklist</button>`}
        ${isRemoved
          ? `<button class="btn btn-ghost" style="flex:1;color:var(--green);border-color:rgba(22,163,74,.4)" onclick="reactivateFromPool('${escAttr(c.id)}')">Reactivate</button>`
          : `<button class="btn btn-ghost" style="flex:1;color:var(--text3)" onclick="openRemoveFromPoolModal('${escAttr(c.id)}')">Remove from Pool</button>`}
        <button class="btn btn-green" style="flex:1" onclick="closeCandModal();openAddToJOModal('${escAttr(c.id)}','${escAttr(c.name)}')">+ Add to Job Order</button>
      </div>
    </div>
  `;

  document.getElementById('modal-cand-profile').classList.add('open');
}

function closeCandModal() {
  document.getElementById('modal-cand-profile').classList.remove('open');
}

// ═══════════════════════════════════════════════
// PROFILE MESSAGE GENERATOR
// ═══════════════════════════════════════════════
function generateCandidateProfile(candId) {
  const section = document.getElementById('prof-msg-section-' + candId);
  if (!section) return;

  const c = candidates.find(function(x) { return x.id === candId; });
  if (!c) return;

  const ratingFull  = calcCandRatingFull(candId);
  const rating      = ratingFull.score;
  const ratingLabel = getRatingLabel(rating).label;
  const stored      = candidateRatings[candId] || {};
  const docs        = stored.docs  || {};

  // First name only
  const firstName = (c.name || '').split(' ')[0] || c.name || '';

  // Location — use city or fall back to "Bacolod City"
  const location = c.cityFormatted || c.location || 'Bacolod City';

  // Job type — use formatted value
  const jobType = c.jobTypeFormatted || c.jobType || 'Details to be confirmed';

  // Skills line — use skills field, fall back to past jobs, then placeholder
  const skillsLine = (c.skills && c.skills.trim())
    ? c.skills.trim()
    : (c.pastJobs && c.pastJobs.trim())
      ? c.pastJobs.trim()
      : 'Details to be confirmed';

  // Salary
  const salary = (c.expectedPay && c.expectedPay.trim()) ? c.expectedPay.trim() : 'To be discussed';

  // Documents note
  const allKeyDocs = docs.validId && docs.brgy && docs.police && docs.nbi;
  const docNote = allKeyDocs
    ? 'All key documents on file.'
    : 'Still completing documents.';

  const msg =
`Candidate Profile – ${firstName}

- ${c.gender || 'Female'}, ${c.age || '—'} years old
- From ${location}
- Applying as ${jobType}

Experience & Skills
- ${skillsLine}

Availability
- Ready for interview
- Can start once requirements are completed

Expected Salary
- ${salary}

Note
- ${docNote}
- ERA Score: ${rating}/10 (${ratingLabel})`;

  const safeId = candId.replace(/[^a-zA-Z0-9_-]/g, '');
  section.innerHTML =
    '<div class="cand-modal-section-title">Profile Message</div>' +
    '<textarea class="prof-msg-textarea" id="prof-msg-ta-' + safeId + '" spellcheck="false">' +
    msg.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;') +
    '</textarea>' +
    '<button class="prof-msg-copy-btn" onclick="copyProfMsg(\'' + safeId + '\',this)">Copy to Clipboard</button>';
}

function copyProfMsg(safeId, btn) {
  const ta = document.getElementById('prof-msg-ta-' + safeId);
  if (!ta) return;
  navigator.clipboard.writeText(ta.value).then(function() {
    const orig = btn.textContent;
    btn.textContent = 'Copied!';
    btn.style.background = 'rgba(5,150,105,0.25)';
    setTimeout(function() { btn.textContent = orig; btn.style.background = ''; }, 2000);
  }).catch(function() {
    ta.select();
    document.execCommand('copy');
  });
}

// ═══════════════════════════════════════════════
// JOB STATUS SYSTEM
// ═══════════════════════════════════════════════
function setJOFilter(status) {
  window._joFilter = status;
  activeJOTab = 0;
  renderJobOrders([...placements, ...manualPlacements]);
}

function changeJOStatus(joId, newStatus) {
  joStatusOverrides[joId] = newStatus;
  saveJOStatusOverrides();
  const jo = jobOrders.find(j => j.id === joId);
  if (jo) jo.status = newStatus;
  // Log lifecycle event
  var today = new Date().toISOString().split('T')[0];
  if (newStatus === 'Fulfilled') {
    addJobOrderEvent(joId, { type: 'fulfilled', date: today, changedBy: currentUserEmail });
  } else if (newStatus === 'On Hold') {
    addJobOrderEvent(joId, { type: 'on_hold', date: today, changedBy: currentUserEmail });
  } else if (newStatus === 'Active') {
    addJobOrderEvent(joId, { type: 'resumed', date: today, changedBy: currentUserEmail });
  }
  renderJobOrders([...placements, ...manualPlacements]);
  buildReminderBanner();
  showToast('Job Order ' + joId + ' → ' + newStatus, newStatus === 'Active' ? 'green' : 'orange');
}

function onCancelReasonChange(sel) {
  const isOther = sel.value === 'Other';
  const otherField = document.getElementById('cancel-other-field');
  const otherInput = document.getElementById('cancel-other-input');
  otherField.style.display = isOther ? 'block' : 'none';
  if (isOther) {
    otherInput.value = '';
    document.getElementById('cancel-confirm-btn').disabled = true;
    otherInput.focus();
  } else {
    document.getElementById('cancel-confirm-btn').disabled = !sel.value;
  }
}

function openCancelModal(joId, position) {
  document.getElementById('cancel-jo-subtitle').textContent = joId + ' – ' + position;
  document.getElementById('cancel-jo-hidden-id').value = joId;
  document.getElementById('cancel-reason-select').value = '';
  document.getElementById('cancel-other-field').style.display = 'none';
  document.getElementById('cancel-other-input').value = '';
  document.getElementById('cancel-notes-input').value = '';
  document.getElementById('cancel-confirm-btn').disabled = true;
  openModal('modal-cancel-jo');
}

function confirmCancelJO() {
  const joId = document.getElementById('cancel-jo-hidden-id').value;
  const selected = document.getElementById('cancel-reason-select').value;
  if (!selected) return;
  const reason = selected === 'Other'
    ? 'Other: ' + document.getElementById('cancel-other-input').value.trim()
    : selected;
  if (!reason.replace('Other: ', '').trim()) return;
  const userEmail = window._currentUserEmail || (document.getElementById('header-user-email') || {}).textContent || 'unknown';
  const cancelledAt = new Date().toISOString();
  const cancelNotes = (document.getElementById('cancel-notes-input').value || '').trim();
  const cancellationData = { reason: reason, notes: cancelNotes, cancelledAt: cancelledAt, cancelledBy: userEmail };
  localStorage.setItem('jo_cancellation_' + joId, JSON.stringify(cancellationData));
  fbSync('jobOrders/' + joId + '/cancellation', cancellationData);
  joStatusOverrides[joId] = 'Cancelled';
  saveJOStatusOverrides();
  const jo = jobOrders.find(j => j.id === joId);
  if (jo) jo.status = 'Cancelled';
  closeModal('modal-cancel-jo');
  renderJobOrders([...placements, ...manualPlacements]);
  buildReminderBanner();
  showToast('Job Order ' + joId + ' cancelled – ' + reason, 'red');
}

function buildFullJobDetailsText(jo) {
  const toBullets = (text) => {
    if (!text || !text.trim()) return '';
    const items = text.split(/[\n;]+/).map(s => s.trim()).filter(Boolean);
    return items.map(s => '• ' + s).join('\n');
  };
  const parts = ['JOB OPENING — Job Search PH', ''];
  if (jo.position) parts.push('Position: ' + jo.position);
  if (jo.address)  parts.push('Location: ' + jo.address);
  if (jo.salary)   parts.push('Salary: ₱' + String(jo.salary).replace(/^[₱$]+/, '') + '/month');
  if (jo.workSchedule) parts.push('Setup: ' + jo.workSchedule);
  const qualLines = [];
  if (jo.genderPref)  qualLines.push('• Gender Pref: ' + jo.genderPref);
  if (jo.experience)  qualLines.push('• Experience: ' + jo.experience);
  if (qualLines.length) { parts.push(''); parts.push('QUALIFICATIONS'); parts.push(qualLines.join('\n')); }
  const dutiesBullets = toBullets(jo.duties || jo.skillsNeeded);
  if (dutiesBullets) { parts.push(''); parts.push('DUTIES & RESPONSIBILITIES'); parts.push(dutiesBullets); }
  if (jo.duties && jo.skillsNeeded) {
    const skillsBullets = toBullets(jo.skillsNeeded);
    if (skillsBullets) { parts.push(''); parts.push('SKILLS NEEDED'); parts.push(skillsBullets); }
  }
  const benefitsBullets = toBullets(jo.benefits);
  if (benefitsBullets) { parts.push(''); parts.push('BENEFITS'); parts.push(benefitsBullets); }
  if (jo.otherNotes) { parts.push(''); parts.push('ABOUT THE EMPLOYER'); parts.push(jo.otherNotes); }
  parts.push('');
  parts.push('Interested? Message us to apply!');
  return parts.join('\n');
}

// Short Taglish intro used by the broadcast walker — leads with the three
// deciders (role, location, salary) plus setup. Keeps the first contact short;
// the long buildFullJobDetailsText output is sent only after the candidate replies YES.
function buildShortBroadcastMessage(jo, c) {
  const fullName = ((c && (c.name || c.facebook)) || '').trim();
  const firstName = fullName.split(/\s+/)[0] || 'po';
  const bits = [];
  if (jo.position)     bits.push(jo.position);
  if (jo.address)      bits.push(jo.address);
  if (jo.salary)       bits.push('₱' + String(jo.salary).replace(/^[₱$]+/, '') + '/month');
  if (jo.workSchedule) bits.push(jo.workSchedule);
  const offer = bits.length ? bits.join(', ') : 'job opening';
  return 'Hi ' + firstName + '! May opening kami: ' + offer + '.\n\nInterested ka? Reply YES and isend ko ang complete details.';
}

function copyJobDetails(joId) {
  const jo = jobOrders.find(j => j.id === joId);
  if (!jo) return;
  const text = buildFullJobDetailsText(jo);
  const btnId = 'copy-jo-btn-' + joId.replace(/[^a-z0-9]/gi, '');
  const finish = () => {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    const orig = btn.innerHTML;
    btn.textContent = 'Copied!';
    btn.style.color = 'var(--green)';
    setTimeout(() => { btn.innerHTML = orig; btn.style.color = ''; }, 2000);
  };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(finish).catch(() => {
      fallbackCopy(text); finish();
    });
  } else {
    fallbackCopy(text); finish();
  }
}
// ─── BROADCAST WORKFLOW ───

let _broadcastJoId      = null;
let _lastBroadcastJoId  = null; // tracks previous JO for selection persistence
let _broadcastSelected  = new Set();
let _bcSortBy           = 'era'; // 'era' | 'newest' | 'name'
let _broadcastFilters   = { jobType:[], location:[], gender:[], ageMin:18, ageMax:55, payRange:[], eraScore:[], setup:[], activeStatus:'active' };
let _broadcastActivePanel = null;

const BC_FILTER_DEFAULTS = { jobType:[], location:[], gender:[], ageMin:18, ageMax:55, payRange:[], eraScore:[], setup:[], activeStatus:'active' };

function _bcFilterKey() {
  var uid = (currentUserEmail || 'anon').replace(/[.#$[\]/]/g, '_');
  return 'config/broadcastFilters/' + uid;
}

function saveBcFilters() {
  var payload = Object.assign({}, _broadcastFilters, { sortBy: _bcSortBy });
  fbSyncDebounced(_bcFilterKey(), payload, 1200);
  var el = document.getElementById('bc-filters-saved');
  if (el) { el.style.opacity = '1'; setTimeout(function(){ el.style.opacity = '0'; }, 2000); }
}

async function loadBcFilters() {
  if (typeof window._fbSdkGet !== 'function') return;
  try {
    var data = await window._fbSdkGet();
    var parts = _bcFilterKey().split('/');
    var node = data;
    for (var i = 0; i < parts.length; i++) { if (!node) return; node = node[parts[i]]; }
    if (!node) return;
    _broadcastFilters = {
      jobType:      Array.isArray(node.jobType)  ? node.jobType  : [],
      location:     Array.isArray(node.location) ? node.location : [],
      gender:       Array.isArray(node.gender)   ? node.gender   : [],
      ageMin:       typeof node.ageMin === 'number' ? node.ageMin : 18,
      ageMax:       typeof node.ageMax === 'number' ? node.ageMax : 55,
      payRange:     Array.isArray(node.payRange)  ? node.payRange  : [],
      eraScore:     Array.isArray(node.eraScore)  ? node.eraScore  : [],
      setup:        Array.isArray(node.setup)     ? node.setup     : [],
      activeStatus: node.activeStatus || 'active',
    };
    if (node.sortBy) _bcSortBy = node.sortBy;
  } catch(e) { console.warn('[loadBcFilters]', e.message); }
}

function resetAllBcFilters() {
  _broadcastFilters = Object.assign({}, BC_FILTER_DEFAULTS);
  _bcSortBy = 'era';
  fbSync(_bcFilterKey(), null); // clear from Firebase
  buildBroadcastFilterBar();
  renderBroadcastList();
  _updateBcSortBtns();
  showToast('Filters reset.', 'gold');
}

function setBcSort(val) {
  _bcSortBy = val;
  _updateBcSortBtns();
  renderBroadcastList();
  saveBcFilters();
}

function _updateBcSortBtns() {
  ['era','newest','name'].forEach(function(v) {
    var btn = document.getElementById('bcsort-' + v);
    if (!btn) return;
    var active = _bcSortBy === v;
    btn.className = 'era-tier-btn' + (active ? ' sel' : '');
    btn.style.cssText = active ? 'background:rgba(23,85,237,.10);border-color:rgba(23,85,237,.45);color:var(--accent);border-width:1.5px' : '';
  });
}

function verifyBroadcastList() {
  var filtered = _getBroadcastFiltered();
  var allP = [...placements, ...manualPlacements];
  var inPipeline = new Set(allP.filter(function(p){ return p.jobOrderId === _broadcastJoId; }).map(function(p){ return p.candidateId; }));
  var nBlacklisted = 0, nInPipeline = 0, nRemoved = 0, nHired = 0;
  candidates.forEach(function(c) {
    if (blacklist[c.id]) nBlacklisted++;
    else if (isCandidateHired(c.id)) nHired++;
    else if (candidateRatings[c.id] && candidateRatings[c.id].removedFromPool) nRemoved++;
    else if (inPipeline.has(c.id)) nInPipeline++;
  });
  var ready = filtered.length;
  var el = document.getElementById('bc-verify-result');
  if (el) {
    el.style.display = '';
    el.innerHTML = '<span style="color:var(--green);font-weight:700">' + ready + ' ready</span>' +
      '<span style="color:var(--text3);margin-left:8px">· Excluded: ' +
      nInPipeline + ' in pipeline, ' + nBlacklisted + ' blacklisted, ' + nRemoved + ' removed, ' + nHired + ' hired</span>';
  }
  // Keep selection only from verified list
  _broadcastSelected = new Set([..._broadcastSelected].filter(function(id){ return filtered.some(function(c){ return c.id === id; }); }));
  updateBroadcastCount();
  renderBroadcastList();
  showToast(ready + ' candidates verified and ready to broadcast.', 'green');
}

function buildBroadcastFilterBar() {
  const bar = document.getElementById('broadcast-cf-bar');
  if (!bar) return;
  const f = _broadcastFilters;
  const defs = [
    { key:'jobType',  neutral:'All job types',  prefix:'Job Type' },
    { key:'gender',   neutral:'All genders',     prefix:'Gender' },
    { key:'location', neutral:'All locations',   prefix:'Location' },
    { key:'setup',    neutral:'All setups',      prefix:'Setup' },
    { key:'age',      neutral:'All ages',        prefix:'Age' },
    { key:'payRange', neutral:'All pay ranges',  prefix:'Pay' },
    { key:'eraScore', neutral:'All ERA scores',  prefix:'ERA' },
  ];
  const as = f.activeStatus;
  const _aL = { active:'Active Only', inactive:'Inactive', all:'All' };
  const activeToggle = '<div style="display:flex;gap:3px">' +
    ['active','inactive','all'].map(function(v) {
      const sel = as === v;
      return '<button class="era-tier-btn'+(sel?' sel':'')+'"'+(sel?' style="background:rgba(23,85,237,.10);border-color:rgba(23,85,237,.45);color:var(--accent);border-width:1.5px"':'')+
        ' onclick="_broadcastFilters.activeStatus=\''+v+'\';saveBcFilters();renderBroadcastList();buildBroadcastFilterBar()">'+_aL[v]+'</button>';
    }).join('')+'</div>';
  // Blacklist is always hard-excluded — no toggle shown
  bar.innerHTML = defs.map(function(d){ return _buildBcBtnWrap(d.key, d.neutral, d.prefix); }).join('') + activeToggle;
  if (_broadcastActivePanel === 'age') setTimeout(_initBcAgeSlider, 0);
}

function _buildBcBtnWrap(key, neutralLabel, prefix) {
  const f = _broadcastFilters;
  let isActive = false, label = neutralLabel;
  if (key === 'age') {
    isActive = !(f.ageMin === 18 && f.ageMax === 55);
    label = isActive ? 'Age · '+f.ageMin+'–'+f.ageMax : neutralLabel;
  } else if (key === 'eraScore') {
    isActive = f.eraScore.length > 0;
    label = isActive ? 'ERA · '+f.eraScore.join(', ') : neutralLabel;
  } else {
    const arr = f[key] || [];
    isActive = arr.length > 0;
    label = isActive ? prefix+' · '+arr.length : neutralLabel;
  }
  const isOpen = _broadcastActivePanel === key;
  const dot = isActive ? '<span class="cf-dot"></span>' : '';
  const chev = '<span class="cf-chev">'+(isOpen ? '▴' : '▾')+'</span>';
  const panel = isOpen ? _buildBcPanel(key) : '';
  return '<div class="cf-btn-wrap"><button class="cf-btn'+(isActive?' active':'')+'" onclick="toggleBcPanel(\''+key+'\')">'+
    dot+escHtml(label)+chev+'</button>'+panel+'</div>';
}

function _buildBcPanel(key) {
  const allJobTypes = _candJobTypes.length ? _candJobTypes : ['Kasambahay','Yaya/Babysitter','Cook/Labandera','Driver','All-around Helper'];
  if (key === 'jobType')  return _buildBcCheckPanel('jobType',  'Job Type', allJobTypes);
  if (key === 'gender')   return _buildBcCheckPanel('gender',   'Gender',   ['Female','Male','Others']);
  if (key === 'setup')    return _buildBcCheckPanel('setup',    'Setup',    ['Stay-in','Stay-out','Either']);
  if (key === 'payRange') return _buildBcCheckPanel('payRange', 'Pay Range',['Below ₱5,000','₱5,000–₱7,000','₱7,001–₱10,000','₱10,001–₱15,000','Above ₱15,000']);
  if (key === 'location') {
    const locs = [...new Set(candidates.map(function(c){ return c.cityFormatted||c.location||''; }).filter(Boolean))].sort();
    return _buildBcCheckPanel('location', 'Location', locs);
  }
  if (key === 'eraScore') {
    const sel = _broadcastFilters.eraScore || [];
    const tiers = [['Below 3','var(--red)','rgba(220,38,38,.12)','rgba(220,38,38,.5)'],['3–5','var(--gold)','rgba(245,158,11,.12)','rgba(245,158,11,.5)'],['5–7','var(--accent)','rgba(23,85,237,.10)','rgba(23,85,237,.45)'],['7–8','var(--purple)','rgba(124,58,237,.10)','rgba(124,58,237,.45)'],['8–10','var(--green)','rgba(5,150,105,.10)','rgba(5,150,105,.45)']];
    const pills = tiers.map(function(t){
      const lbl=t[0],col=t[1],bg=t[2],border=t[3];
      const isSel = sel.indexOf(lbl)>=0;
      const style = isSel ? 'background:'+bg+';border-color:'+border+';color:'+col+';border-width:1.5px' : '';
      return '<button class="era-tier-btn'+(isSel?' sel':'')+'" style="'+style+'" onclick="bcFilterToggle(\'eraScore\',\''+lbl.replace(/'/g,'\'')+'\')" >'+escHtml(lbl)+'</button>';
    }).join('');
    return '<div class="cf-panel open" style="min-width:280px"><div class="cf-panel-hd"><span class="cf-panel-title">ERA Score</span><span class="cf-clear" onclick="bcFilterClear(\'eraScore\')">Clear</span></div><div class="era-tier-row">'+pills+'</div></div>';
  }
  if (key === 'age') {
    return '<div class="cf-panel open" style="min-width:260px">' +
      '<div class="cf-panel-hd"><span class="cf-panel-title">Age Range</span><span class="cf-clear" onclick="bcAgeReset()">Reset</span></div>' +
      '<div style="padding:6px 14px 14px">' +
        '<div id="bc-age-label" style="font-size:12px;font-weight:700;color:var(--text2);text-align:center;margin-bottom:14px">' + _broadcastFilters.ageMin + ' – ' + _broadcastFilters.ageMax + ' yrs</div>' +
        '<div id="bc-age-track-wrap" style="position:relative;height:6px;margin:0 12px 6px;cursor:pointer">' +
          '<div style="position:absolute;inset:0;background:var(--card3);border-radius:99px"></div>' +
          '<div id="bc-age-fill" style="position:absolute;top:0;height:100%;background:var(--accent);border-radius:99px"></div>' +
          '<div id="bc-age-lo" style="position:absolute;top:50%;width:20px;height:20px;border-radius:50%;background:var(--card);border:2.5px solid var(--accent);box-shadow:0 1px 6px rgba(37,99,235,.35);transform:translate(-50%,-50%);cursor:grab;touch-action:none;z-index:2"></div>' +
          '<div id="bc-age-hi" style="position:absolute;top:50%;width:20px;height:20px;border-radius:50%;background:var(--card);border:2.5px solid var(--accent);box-shadow:0 1px 6px rgba(37,99,235,.35);transform:translate(-50%,-50%);cursor:grab;touch-action:none;z-index:2"></div>' +
        '</div>' +
      '</div>' +
    '</div>';
  }
  return '';
}

function _buildBcCheckPanel(key, title, opts) {
  const selected = _broadcastFilters[key] || [];
  const items = opts.map(function(o) {
    const safe = o.replace(/'/g,'');
    const chk = selected.indexOf(o) >= 0 ? ' checked' : '';
    return '<label class="cf-check-item"><input type="checkbox"'+chk+' onchange="bcFilterToggle(\''+key+'\',\''+safe+'\')">'+escHtml(o)+'</label>';
  }).join('');
  return '<div class="cf-panel open"><div class="cf-panel-hd"><span class="cf-panel-title">'+title+'</span><span class="cf-clear" onclick="bcFilterClear(\''+key+'\')">Clear</span></div><div class="cf-checklist">'+items+'</div></div>';
}

function toggleBcPanel(key) {
  _broadcastActivePanel = _broadcastActivePanel === key ? null : key;
  buildBroadcastFilterBar();
}

function bcFilterToggle(key, val) {
  if (!_broadcastFilters[key]) _broadcastFilters[key] = [];
  const arr = _broadcastFilters[key];
  const idx = arr.indexOf(val);
  if (idx >= 0) arr.splice(idx, 1); else arr.push(val);
  saveBcFilters();
  renderBroadcastList();
  buildBroadcastFilterBar();
}

function bcFilterClear(key) {
  _broadcastFilters[key] = [];
  saveBcFilters();
  renderBroadcastList();
  buildBroadcastFilterBar();
}

function bcAgeInput() {
  // oninput: update filter + re-filter candidates; do NOT rebuild the bar
  // (rebuilding destroys the input elements mid-type, causing the reset bug)
  const lo = parseInt(document.getElementById('bc-age-min')?.value) || 18;
  const hi = parseInt(document.getElementById('bc-age-max')?.value) || 65;
  _broadcastFilters.ageMin = Math.min(lo, hi);
  _broadcastFilters.ageMax = Math.max(lo, hi);
  renderBroadcastList();
}

function bcAgeCommit() {
  // onblur / Enter: same as above, then rebuild bar to update pill label
  const lo = parseInt(document.getElementById('bc-age-min')?.value) || 18;
  const hi = parseInt(document.getElementById('bc-age-max')?.value) || 65;
  _broadcastFilters.ageMin = Math.min(lo, hi);
  _broadcastFilters.ageMax = Math.max(lo, hi);
  saveBcFilters();
  renderBroadcastList();
  buildBroadcastFilterBar();
}

function bcAgeReset() {
  _broadcastFilters.ageMin = 18; _broadcastFilters.ageMax = 55;
  saveBcFilters();
  renderBroadcastList();
  buildBroadcastFilterBar();
}

function _initBcAgeInputs() { _initBcAgeSlider(); } // legacy alias

function _initBcAgeSlider() {
  const trackWrap = document.getElementById('bc-age-track-wrap');
  const loH  = document.getElementById('bc-age-lo');
  const hiH  = document.getElementById('bc-age-hi');
  const fill = document.getElementById('bc-age-fill');
  const lbl  = document.getElementById('bc-age-label');
  if (!trackWrap || !loH || !hiH) return;

  const MIN_AGE = 18, MAX_AGE = 55;
  function valToPct(v) { return (v - MIN_AGE) / (MAX_AGE - MIN_AGE); }
  function pctToVal(p) { return Math.round(MIN_AGE + p * (MAX_AGE - MIN_AGE)); }

  function updateVis() {
    const lo = _broadcastFilters.ageMin, hi = _broadcastFilters.ageMax;
    const loP = valToPct(lo) * 100, hiP = valToPct(hi) * 100;
    loH.style.left = loP + '%';
    hiH.style.left = hiP + '%';
    if (fill) { fill.style.left = loP + '%'; fill.style.width = (hiP - loP) + '%'; }
    if (lbl)  lbl.textContent = lo + ' – ' + hi + ' yrs';
  }
  updateVis();

  function startDrag(e, which) {
    e.preventDefault();
    const rect = trackWrap.getBoundingClientRect();
    function onMove(ev) {
      const pct = Math.max(0, Math.min(1, (ev.clientX - rect.left) / rect.width));
      const val = pctToVal(pct);
      if (which === 'lo') _broadcastFilters.ageMin = Math.min(val, _broadcastFilters.ageMax - 1);
      else               _broadcastFilters.ageMax = Math.max(val, _broadcastFilters.ageMin + 1);
      _broadcastFilters.ageMin = Math.max(MIN_AGE, _broadcastFilters.ageMin);
      _broadcastFilters.ageMax = Math.min(MAX_AGE, _broadcastFilters.ageMax);
      updateVis();
      renderBroadcastList();
    }
    function onUp() {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerup',   onUp);
      buildBroadcastFilterBar();
      saveBcFilters();
    }
    document.addEventListener('pointermove', onMove);
    document.addEventListener('pointerup',   onUp);
  }

  loH.addEventListener('pointerdown', function(e) { startDrag(e, 'lo'); });
  hiH.addEventListener('pointerdown', function(e) { startDrag(e, 'hi'); });
}

async function openBroadcastModal(joId) {
  const joChanged = joId !== _lastBroadcastJoId;
  const prevSelected = new Set(_broadcastSelected); // remember for notice

  // Preserve selections only if same JO, otherwise reset
  if (joChanged) _broadcastSelected = new Set();
  _broadcastJoId     = joId;
  _lastBroadcastJoId = joId;
  _broadcastActivePanel = null;

  const jo = jobOrders.find(j => j.id === joId);
  if (!jo) return;

  // Summary
  const summary = document.getElementById('broadcast-jo-summary');
  summary.innerHTML = [
    jo.position ? `<span><strong>${escHtml(jo.position)}</strong></span>` : '',
    jo.company  ? `<span>${escHtml(jo.company)}</span>` : '',
    jo.salary   ? `<span>${escHtml(jo.salary)}/mo</span>` : '',
    jo.address  ? `<span>${escHtml(jo.address)}</span>` : '',
  ].filter(Boolean).join('');

  // Load saved filters from Firebase; fall back to job-type pre-fill if none saved
  await loadBcFilters();

  // If no saved filters exist (all arrays empty, defaults), auto-fill job type from JO
  const hasCustomFilters = _broadcastFilters.jobType.length || _broadcastFilters.gender.length || _broadcastFilters.location.length;
  if (!hasCustomFilters) {
    const pos = (jo.position || '').toLowerCase();
    const jobKeywords = ['yaya','kasambahay','helper','housekeeper','nanny','caregiver','driver','cook','laundry','cleaner','janitor','all-around'];
    const preJobTypes = [...new Set(candidates
      .filter(c => {
        const ct = (c.jobTypeFormatted || c.jobType || '').toLowerCase();
        return ct && (pos.includes(ct) || ct.includes(pos) || jobKeywords.some(k => pos.includes(k) && ct.includes(k)));
      })
      .map(c => c.jobTypeFormatted || c.jobType || '')
      .filter(Boolean)
    )];
    if (preJobTypes.length) _broadcastFilters.jobType = preJobTypes;
  }

  document.getElementById('broadcast-search').value = '';
  // Clear verify result when re-opening
  var vrEl = document.getElementById('bc-verify-result'); if (vrEl) vrEl.style.display = 'none';
  buildBroadcastFilterBar();
  _updateBcSortBtns();
  renderBroadcastList();

  // Show "previously selected" notice if restored
  if (!joChanged && prevSelected.size > 0 && _broadcastSelected.size > 0) {
    showToast(_broadcastSelected.size + ' previously selected candidates restored.', 'gold');
  }

  document.getElementById('modal-broadcast').classList.add('open');
}

function closeBroadcastModal() {
  document.getElementById('modal-broadcast').classList.remove('open');
  _broadcastJoId = null;
  _broadcastSelected = new Set();
}

function _getBroadcastFiltered() {
  const search = (document.getElementById('broadcast-search')?.value || '').toLowerCase().trim();
  const f = _broadcastFilters;
  const allP = [...placements, ...manualPlacements].filter(p => p.jobOrderId === _broadcastJoId);
  const alreadyIn = new Set(allP.map(p => p.candidateId)); // already in THIS JO pipeline at any stage

  const result = candidates.filter(function(c) {
    // ── Permanent hard exclusions — no toggle overrides these ──
    if (blacklist[c.id])                                                       return false; // blacklisted
    if (isCandidateHired(c.id))                                                return false; // globally hired
    if (candidateRatings[c.id] && candidateRatings[c.id].removedFromPool)     return false; // removed from pool
    if (alreadyIn.has(c.id))                                                   return false; // already in this JO

    // ── Active / inactive toggle ──
    if (f.activeStatus === 'active'   && isCandInactive(c.id)) return false;
    if (f.activeStatus === 'inactive' && !isCandInactive(c.id)) return false;

    // ── Search ──
    if (search && !c.name.toLowerCase().includes(search) && !c.id.toLowerCase().includes(search)) return false;

    // ── Job type ──
    if (f.jobType.length) {
      const ct = Array.isArray(c.jobTypes) && c.jobTypes.length ? c.jobTypes : (c.jobType ? [c.jobType] : []);
      if (!f.jobType.some(function(t) { return ct.indexOf(t) >= 0; })) return false;
    }
    // ── Gender ──
    if (f.gender.length) {
      const g = c.gender || '';
      const gMatch = f.gender.some(function(gv) {
        if (gv === 'Others') return ['Female','Male'].indexOf(g) < 0;
        return g === gv;
      });
      if (!gMatch) return false;
    }
    // ── Location ──
    if (f.location.length) {
      const loc = c.cityFormatted || c.location || '';
      const knownLocs = ['Bacolod City','Talisay','Silay','Bago City'];
      const locMatch = f.location.some(function(l) {
        if (l === 'Others') return !knownLocs.some(function(k) { return loc.includes(k); });
        return loc.includes(l);
      });
      if (!locMatch) return false;
    }
    // ── Setup ──
    if (f.setup.length) {
      const su = getEffectiveSetup(c);
      if (!f.setup.some(function(v) { return su === v; })) return false;
    }
    // ── Age ──
    if (!(f.ageMin === 18 && f.ageMax === 65)) {
      const age = parseInt(c.age) || 0;
      if (age > 0 && (age < f.ageMin || age > f.ageMax)) return false;
    }
    // ── Pay range ──
    if (f.payRange.length && !matchPayRange(c, f.payRange)) return false;
    // ── ERA tiers ──
    if (f.eraScore.length && !matchEraTier(c.id, f.eraScore)) return false;

    return true;
  });

  // Apply sort
  result.sort(function(a, b) {
    if (_bcSortBy === 'newest') {
      const ta = (a.timestamp || '').split(' ')[0];
      const tb = (b.timestamp || '').split(' ')[0];
      return tb.localeCompare(ta);
    }
    if (_bcSortBy === 'name') {
      return String(a.name || '').localeCompare(String(b.name || ''));
    }
    return calcERA(b.id).score - calcERA(a.id).score; // default: ERA
  });

  return result;
}

function renderBroadcastList() {
  const filtered = _getBroadcastFiltered();
  const list = document.getElementById('broadcast-cand-list');
  if (!list) return;

  // Update match count label
  const countEl = document.getElementById('bc-match-count');
  if (countEl) countEl.textContent = 'Showing ' + filtered.length + ' candidates';

  if (!filtered.length) {
    list.innerHTML = '<div style="padding:20px;text-align:center;color:var(--text3);font-size:13px">No candidates match your filters.</div>';
    _broadcastSelected = new Set([..._broadcastSelected].filter(id => filtered.some(c => c.id === id)));
    updateBroadcastCount();
    return;
  }

  // Remove any selections no longer in filtered list
  _broadcastSelected = new Set([..._broadcastSelected].filter(id => filtered.some(c => c.id === id)));

  const today = Date.now();
  const sevenDaysMs = 7 * 86400000;

  list.innerHTML = filtered.map(c => {
    const era = calcERA(c.id);
    const eraColor = era.score >= 7 ? 'var(--green)' : era.score >= 5 ? 'var(--gold)' : 'var(--red)';
    const sel = _broadcastSelected.has(c.id);
    const regDate = (c.timestamp || '').split(' ')[0];
    const regMs = regDate ? new Date(regDate).getTime() : 0;
    const isNew = regMs > 0 && (today - regMs) <= sevenDaysMs;
    const regLabel = regDate ? fmtDateShort(regDate) : '—';
    return `<div class="broadcast-cand-row${sel ? ' selected' : ''}" id="brow-${escAttr(c.id)}" onclick="toggleBroadcastCand('${escAttr(c.id)}')">
      <input type="checkbox" ${sel ? 'checked' : ''} onclick="event.stopPropagation();toggleBroadcastCand('${escAttr(c.id)}')">
      <div>
        <div class="bc-cand-name" onclick="event.stopPropagation();openCandModal('${escAttr(c.id)}')">${escHtml(c.name)}${isNew ? ' <span style="font-size:9px;font-weight:700;background:rgba(22,163,74,.15);color:var(--green);border:1px solid rgba(22,163,74,.3);border-radius:4px;padding:0 4px">New</span>' : ''}</div>
        <div class="bc-cand-id" onclick="event.stopPropagation();openCandModal('${escAttr(c.id)}')">${escHtml(c.id)}${regLabel ? ' · <span style="color:var(--text3)">' + escHtml(regLabel) + '</span>' : ''}</div>
      </div>
      <div style="font-weight:700;color:${eraColor}">${era.score.toFixed(1)}</div>
      <div style="color:var(--text2)">${escHtml(c.jobTypeFormatted || c.jobType || '—')}</div>
      <div style="color:var(--text2)">${escHtml(c.cityFormatted || c.location || '—')}</div>
      <div style="color:var(--text2)">${escHtml(getEffectiveSetup(c) || '—')}</div>
      <div style="color:var(--text2)">${escHtml(c.expectedPay || '—')}</div>
    </div>`;
  }).join('');

  updateBroadcastCount();
}

function toggleBroadcastCand(candId) {
  if (_broadcastSelected.has(candId)) {
    _broadcastSelected.delete(candId);
  } else {
    _broadcastSelected.add(candId);
  }
  const row = document.getElementById('brow-' + candId);
  if (row) {
    row.classList.toggle('selected', _broadcastSelected.has(candId));
    const cb = row.querySelector('input[type=checkbox]');
    if (cb) cb.checked = _broadcastSelected.has(candId);
  }
  updateBroadcastCount();
}

function broadcastSelectAll() {
  const filtered = _getBroadcastFiltered(); // only visible, filtered, eligible candidates
  filtered.forEach(c => _broadcastSelected.add(c.id));
  renderBroadcastList();
  showToast(filtered.length + ' candidates selected.', 'green');
}

function updateBroadcastCount() {
  const n = _broadcastSelected.size;
  const el = document.getElementById('broadcast-selected-count');
  if (el) el.textContent = n + ' selected';
  const footer = document.getElementById('broadcast-footer-count');
  if (footer) footer.textContent = n + ' candidate' + (n !== 1 ? 's' : '') + ' selected';
}

// SEND-ASSIST WALKER — see comment at _walkerStart for the manual-send contract.
let _walker = null;

function broadcastSelected() {
  if (!_broadcastJoId || !_broadcastSelected.size) return;
  _walkerStart(_broadcastJoId, [..._broadcastSelected]);
}

// _walkerStart: open a one-at-a-time stepper over the selected candidate list.
// HARD RULE: this never auto-sends a Messenger message. The "Copy & Open Messenger"
// button copies the short personalized intro to the clipboard and opens Facebook
// People-search pre-filled with the candidate's FB name; the human owner clicks
// the right profile, opens Message, pastes, and sends manually.
// Broadcasted is marked on Copy click (not on Next) — accepts the rare over-log of
// abandoned-after-copy in exchange for never losing a half-walked batch.
function _walkerStart(joId, candIds) {
  _walker = {
    joId: joId,
    candIds: candIds.slice(),
    idx: 0,
    markedIds: new Set(),    // those we wrote a manualPlacements entry for
    skippedIds: new Set(),   // those the owner explicitly Skipped without copying
    alreadyInIds: new Set(), // those already in the JO before we started
  };
  // Pre-compute already-in-JO so the walker can show the badge consistently
  const existing = new Set([...placements, ...manualPlacements]
    .filter(function(p) { return p.jobOrderId === joId; })
    .map(function(p) { return p.candidateId; }));
  candIds.forEach(function(id) { if (existing.has(id)) _walker.alreadyInIds.add(id); });
  closeBroadcastModal();
  openModal('modal-bc-walker');
  _renderWalker();
}

function _renderWalker() {
  if (!_walker) return;
  const wrap = document.getElementById('bc-walker-body');
  if (!wrap) return;
  const w = _walker;
  if (w.idx >= w.candIds.length) { _walkerFinish(); return; }
  const candId = w.candIds[w.idx];
  const c = candidates.find(function(x) { return x.id === candId; });
  const jo = jobOrders.find(function(j) { return j.id === w.joId; });
  if (!c || !jo) { w.idx++; _renderWalker(); return; }
  const isDup = w.alreadyInIds.has(candId);
  const wasMarked = w.markedIds.has(candId);
  const fbName = c.facebook || c.name || '';
  const shortMsg = buildShortBroadcastMessage(jo, c);
  const dupBadge = isDup
    ? '<div style="background:rgba(234,88,12,.12);border:1px solid rgba(234,88,12,.4);color:var(--orange);font-size:11px;font-weight:700;padding:6px 10px;border-radius:8px;margin-bottom:10px">Already in this JO — copy will not re-mark Broadcasted.</div>'
    : '';
  const markedBadge = wasMarked
    ? '<div style="background:rgba(22,163,74,.12);border:1px solid rgba(22,163,74,.4);color:var(--green);font-size:11px;font-weight:700;padding:6px 10px;border-radius:8px;margin-bottom:10px">Marked Broadcasted on this device.</div>'
    : '';
  wrap.innerHTML =
    '<div style="padding:20px 24px">' +
      '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">' +
        '<div style="font-size:11px;font-weight:700;color:var(--text3);text-transform:uppercase;letter-spacing:.6px">' +
          'Broadcast Walker · ' + (w.idx + 1) + ' of ' + w.candIds.length +
        '</div>' +
        '<button class="btn btn-ghost btn-sm" onclick="_walkerClose()">Close</button>' +
      '</div>' +
      dupBadge + markedBadge +
      '<div style="font-size:18px;font-weight:800;margin-bottom:2px">' + escHtml(c.name) + '</div>' +
      '<div style="font-size:12px;color:var(--text2);margin-bottom:14px">' +
        escHtml(c.id) + (fbName ? ' · FB: <strong>' + escHtml(fbName) + '</strong>' : ' · no FB name on record') +
      '</div>' +
      '<div style="font-size:11px;font-weight:700;color:var(--text3);text-transform:uppercase;letter-spacing:.6px;margin-bottom:6px">Short intro (clipboard)</div>' +
      '<pre id="bc-walker-msg" style="background:var(--card2);border:1px solid var(--border);border-radius:8px;padding:10px 12px;font-family:var(--sans);font-size:13px;line-height:1.5;white-space:pre-wrap;word-break:break-word;color:var(--text);margin:0 0 16px">' +
        escHtml(shortMsg) +
      '</pre>' +
      '<div style="display:flex;flex-direction:column;gap:8px">' +
        '<button class="btn btn-primary" onclick="_walkerCopyName()"' +
          (fbName ? '' : ' disabled title="No FB name on record"') +
          '>Copy name</button>' +
        '<button class="btn btn-blue" onclick="_walkerCopyMessage()">Copy message</button>' +
        '<button class="btn btn-ghost btn-sm" onclick="_walkerCopyFull()">Copy full details (for after candidate replies YES)</button>' +
        '<button class="btn btn-gold" onclick="_walkerLogDmSent()" style="margin-top:4px">Log DM sent</button>' +
        '<div style="display:flex;gap:8px;margin-top:6px">' +
          '<button class="btn btn-ghost" style="flex:1" onclick="_walkerSkip()">Skip</button>' +
          '<button class="btn btn-green" style="flex:2" onclick="_walkerNext()">Next →</button>' +
        '</div>' +
      '</div>' +
    '</div>';
}

// Copy candidate FB name — this is the mark-on-copy trigger. Copying the name
// is the moment the owner commits to reaching out, so it writes the Broadcasted
// placement entry. The owner pastes the name into Facebook search themselves;
// no automatic window.open (broadcast candidates often have generic / duplicate
// names so the auto-search produced mostly wrong matches).
function _walkerCopyName() {
  if (!_walker) return;
  const w = _walker;
  const candId = w.candIds[w.idx];
  const c = candidates.find(function(x) { return x.id === candId; });
  if (!c) return;
  const name = c.facebook || c.name || '';
  if (!name) return;
  const after = function() {
    if (!w.alreadyInIds.has(candId)) {
      _walkerMarkBroadcasted(candId);
    }
    showToast('Name copied — paste into Facebook search.', 'green');
    _renderWalker();
  };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(name).then(after).catch(function() { fallbackCopy(name); after(); });
  } else {
    fallbackCopy(name);
    after();
  }
}

// Pure clipboard for the short intro — no marking, no side effects. Marking
// already happened on Copy name; Copy message can be re-clicked freely.
function _walkerCopyMessage() {
  if (!_walker) return;
  const w = _walker;
  const candId = w.candIds[w.idx];
  const c = candidates.find(function(x) { return x.id === candId; });
  const jo = jobOrders.find(function(j) { return j.id === w.joId; });
  if (!c || !jo) return;
  const shortMsg = buildShortBroadcastMessage(jo, c);
  const after = function() { showToast('Intro message copied — paste into the Messenger chat.', 'green'); };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(shortMsg).then(after).catch(function() { fallbackCopy(shortMsg); after(); });
  } else {
    fallbackCopy(shortMsg);
    after();
  }
}

function _walkerCopyFull() {
  if (!_walker) return;
  const jo = jobOrders.find(function(j) { return j.id === _walker.joId; });
  if (!jo) return;
  const text = buildFullJobDetailsText(jo);
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(function() {
      showToast('Full job details copied.', 'green');
    }).catch(function() {
      fallbackCopy(text);
      showToast('Full job details copied.', 'green');
    });
  } else {
    fallbackCopy(text);
    showToast('Full job details copied.', 'green');
  }
}

function _walkerMarkBroadcasted(candId) {
  if (!_walker) return;
  const w = _walker;
  const c = candidates.find(function(x) { return x.id === candId; });
  if (!c) return;
  const today = new Date().toISOString().split('T')[0];
  const pid = w.joId + '_' + candId + '_bc_' + Date.now() + '_' + Math.random().toString(36).slice(2,6);
  manualPlacements.push({
    placementId: pid,
    jobOrderId: w.joId,
    candidateId: c.id,
    candidateName: c.name,
    status: 'Broadcasted',
    dispositionStage: 'Broadcasted',
    date: today,
    source: 'broadcast',
  });
  saveManualPlacements();
  w.markedIds.add(candId);
}

// Logging a manual DM is a real direct contact (distinct from broadcast).
// Stamps lastDirectContactAt + contactVia on the placement for this JO + candidate.
// contactVia is auto-filled ONLY when empty — never overwrites a manual choice.
function _walkerLogDmSent() {
  if (!_walker) return;
  const w = _walker;
  const candId = w.candIds[w.idx];
  const c = candidates.find(function(x) { return x.id === candId; });
  if (!c) return;
  if (!w.markedIds.has(candId) && !w.alreadyInIds.has(candId)) {
    _walkerMarkBroadcasted(candId);
  }
  const allP = [...placements, ...manualPlacements].filter(function(p) {
    return p.jobOrderId === w.joId && p.candidateId === candId;
  });
  if (!allP.length) { showToast('Could not find placement to log DM.', 'red'); return; }
  // Prefer most-recently-dated placement when duplicates exist.
  allP.sort(function(a, b) { return (b.date || '').localeCompare(a.date || ''); });
  const target = allP[0];
  const pid = target.placementId || target.candidateId;
  const today = new Date().toISOString().split('T')[0];
  saveProwExtra(pid, 'lastDirectContactAt', today);
  let _exForVia = {};
  try { _exForVia = JSON.parse(localStorage.getItem('prow_extra_' + pid) || '{}'); } catch(_e) {}
  if (!_exForVia.contactVia) {
    saveProwExtra(pid, 'contactVia', 'Facebook Messenger');
  }
  // Also stamp eraContactLogs so isCandInactive's lateReply staleness check
  // sees DM contact attempts, not just calls.
  if (!eraContactLogs[candId]) eraContactLogs[candId] = [];
  eraContactLogs[candId].push({
    method: 'FB Messenger',
    outcome: 'DM Sent',
    date: today,
    ts: Date.now(),
  });
  saveEraContactLogs();
  showToast('DM logged for ' + c.name + '.', 'green');
  _renderWalker();
}

function _walkerNext() {
  if (!_walker) return;
  _walker.idx++;
  _renderWalker();
}

function _walkerSkip() {
  if (!_walker) return;
  const candId = _walker.candIds[_walker.idx];
  if (candId && !_walker.markedIds.has(candId)) {
    _walker.skippedIds.add(candId);
  }
  _walker.idx++;
  _renderWalker();
}

function _walkerFinish() {
  if (!_walker) return;
  const w = _walker;
  const jo = jobOrders.find(function(j) { return j.id === w.joId; });
  // One broadcast_log entry per walker session, listing only actually-marked candidates.
  if (w.markedIds.size > 0) {
    const markedIds = [...w.markedIds];
    const markedNames = markedIds.map(function(id) {
      const c = candidates.find(function(x) { return x.id === id; });
      return c ? c.name : id;
    });
    const logEntry = {
      ts: new Date().toISOString(),
      joId: w.joId,
      employer: jo ? jo.company : w.joId,
      candIds: markedIds,
      candNames: markedNames,
      count: markedIds.length
    };
    let log = [];
    try { log = JSON.parse(localStorage.getItem('broadcast_log') || '[]'); } catch(e) { log = []; }
    log.unshift(logEntry);
    if (log.length > 50) log = log.slice(0, 50);
    localStorage.setItem('broadcast_log', JSON.stringify(log));
    fbSync('broadcast_log', log);
  }
  const wrap = document.getElementById('bc-walker-body');
  if (wrap) {
    wrap.innerHTML =
      '<div style="padding:30px 24px;text-align:center">' +
        '<div style="font-size:36px;margin-bottom:8px;color:var(--green)">✓</div>' +
        '<div style="font-size:18px;font-weight:800;margin-bottom:6px">Walker complete</div>' +
        '<div style="font-size:13px;color:var(--text2);margin-bottom:20px">' +
          w.markedIds.size + ' marked Broadcasted · ' +
          w.skippedIds.size + ' skipped · ' +
          w.alreadyInIds.size + ' already in JO' +
        '</div>' +
        '<button class="btn btn-primary" onclick="_walkerClose()">Close</button>' +
      '</div>';
  }
}

function _walkerClose() {
  closeModal('modal-bc-walker');
  const hadWork = _walker && _walker.markedIds.size > 0;
  _walker = null;
  if (hadWork) renderJobOrders([...placements, ...manualPlacements]);
}

function showBroadcastHistory() {
  var log = [];
  try { log = JSON.parse(localStorage.getItem('broadcast_log') || '[]'); } catch(e) { log = []; }
  if (!log.length) { showToast('No broadcast history yet.', 'gold'); return; }
  var recent = log.slice(0, 20);
  var rows = recent.map(function(entry) {
    var dateStr = entry.ts ? new Date(entry.ts).toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—';
    var names = (entry.candNames || []).slice(0, 5).join(', ') + (entry.candNames && entry.candNames.length > 5 ? ' +' + (entry.candNames.length - 5) + ' more' : '');
    return '<tr>' +
      '<td style="font-family:var(--mono);font-size:11px;color:var(--text3)">' + dateStr + '</td>' +
      '<td style="font-weight:600">' + escHtml(entry.joId || '—') + '</td>' +
      '<td>' + escHtml(entry.employer || '—') + '</td>' +
      '<td style="font-family:var(--mono);color:var(--accent);font-weight:700">' + (entry.count || 0) + '</td>' +
      '<td style="font-size:11px;color:var(--text2)">' + escHtml(names) + '</td>' +
      '</tr>';
  }).join('');
  var html = '<div style="padding:20px 24px"><div style="font-size:15px;font-weight:800;margin-bottom:16px">Broadcast History (last 20)</div>' +
    '<div style="overflow-x:auto"><table class="bc-log-table">' +
    '<thead><tr><th>Date</th><th>JO</th><th>Employer</th><th>#</th><th>Candidates</th></tr></thead>' +
    '<tbody>' + rows + '</tbody></table></div>' +
    '<div style="text-align:right;margin-top:14px"><button class="btn btn-ghost" onclick="closeBroadcastModal()" style="font-size:12px">Close</button></div></div>';
  var bc = document.querySelector('.broadcast-modal');
  if (bc) bc.innerHTML = html;
}

function copyShortlist(joId) {
  const jo = jobOrders.find(j => j.id === joId);
  if (!jo) return;
  const allP = [...placements, ...manualPlacements].filter(p => p.jobOrderId === joId);
  const shortlisted = allP.filter(p => {
    const ex = (() => { let e={}; try{e=JSON.parse(localStorage.getItem('prow_extra_'+(p.placementId||p.candidateId))||'{}')}catch(err){}; return e; })();
    return getEffectiveStage(ex, p) === 'For Employer Review';
  });
  if (!shortlisted.length) { showToast('No candidates in For Employer Review stage', 'gold'); return; }

  const today = new Date().toLocaleDateString('en-PH', { year:'numeric', month:'long', day:'numeric' });
  const lines = [
    'CANDIDATE SHORTLIST',
    (jo.position || '') + ' for ' + (jo.company || ''),
    'Date: ' + today,
    '',
  ];
  shortlisted.forEach((p, idx) => {
    const c = candidates.find(x => x.id === p.candidateId);
    const expText = (c?.pastJobs || c?.skills || '').slice(0, 80);
    lines.push('[#' + (idx + 1) + '] ' + (p.candidateName || p.candidateId));
    if (c) {
      lines.push('- Age: ' + (c.age || '?') + ' | Gender: ' + (c.gender || '?'));
      lines.push('- Location: ' + (c.cityFormatted || c.location || '?'));
      if (expText) lines.push('- Experience: ' + expText);
      lines.push('- Expected Pay: ' + (c.expectedPay || '?'));
      lines.push('- Setup: ' + (getEffectiveSetup(c) || '?'));
      lines.push('- Available: ' + (c.startDate || '?'));
    }
    lines.push('');
  });
  lines.push('Reply with the candidate number(s) you want to interview. We will schedule accordingly.');
  lines.push('');
  lines.push('Job Search PH');

  const text = lines.join('\n');
  const safeId = joId.replace(/[^a-z0-9]/gi, '');
  const btnId = 'copy-shortlist-btn-' + safeId;
  const finish = () => {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    const orig = btn.innerHTML;
    btn.textContent = 'Copied!';
    btn.style.color = 'var(--green)';
    showToast('Shortlist copied!', 'green');
    setTimeout(() => { btn.innerHTML = orig; btn.style.color = ''; }, 2000);
  };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(finish).catch(() => { fallbackCopy(text); finish(); });
  } else {
    fallbackCopy(text); finish();
  }
}

function fallbackCopy(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand('copy'); } catch(e) {}
  document.body.removeChild(ta);
}

function confirmAddOverride(joId, company, position) {
  const jo = jobOrders.find(j => j.id === joId);
  const slots = parseInt(jo?.slots)||1;
  const hiredCount = [...placements,...manualPlacements].filter(p=>{
    if(p.jobOrderId!==joId) return false;
    const ex = (() => { let e={}; try{e=JSON.parse(localStorage.getItem('prow_extra_'+(p.placementId||p.candidateId))||'{}')}catch(err){}; return e; })();
    return (ex.status||p.status)==='Hired';
  }).length;
  const msg = jo?.status === 'Fulfilled'
    ? `This job order is marked Fulfilled (${hiredCount}/${slots} hired). Add another candidate anyway?`
    : `All ${slots} slot(s) are filled. Add another candidate anyway?`;
  if (confirm(msg)) openAddPlacementModal(joId, company, position);
}

function triggerFulfillmentPopup(joId, position, company) {
  // Prevent double popup
  const key = `fulfilled_popup_${joId}`;
  if (sessionStorage.getItem(key)) return;
  sessionStorage.setItem(key, '1');

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay open';
  overlay.id = 'fulfill-modal-overlay';
  overlay.innerHTML = `
    <div class="modal" style="max-width:420px">
      <div style="font-size:28px;text-align:center;margin-bottom:8px"></div>
      <h3 style="text-align:center;margin-bottom:6px">Order Fulfilled!</h3>
      <p style="text-align:center;font-size:13px;color:var(--text2);margin-bottom:20px">
        All slots for <strong>${escHtml(position)}</strong> at <strong>${escHtml(company)}</strong> have been hired.
      </p>
      <div class="modal-field">
        <div class="modal-label">Remarks / Notes</div>
        <textarea id="fulfill-remarks" placeholder="e.g. Employer satisfied, smooth placement…" style="width:100%;background:var(--card2);border:1px solid var(--border2);color:var(--text);padding:10px;border-radius:8px;font-family:var(--sans);font-size:12px;outline:none;resize:vertical;min-height:70px"></textarea>
      </div>
      <div class="modal-field">
        <div class="modal-label">Payment Status</div>
        <select id="fulfill-payment" style="width:100%;background:var(--card2);border:1px solid var(--border2);color:var(--text);padding:8px 12px;border-radius:8px;font-family:var(--sans);font-size:12px;outline:none">
          <option>Paid</option>
          <option>Pending Payment</option>
          <option>Waived</option>
        </select>
      </div>
      <div class="modal-field">
        <div class="modal-label">Close Order</div>
        <select id="fulfill-close" style="width:100%;background:var(--card2);border:1px solid var(--border2);color:var(--text);padding:8px 12px;border-radius:8px;font-family:var(--sans);font-size:12px;outline:none">
          <option value="now">Close now</option>
          <option value="3">Close in 3 days</option>
          <option value="5">Close in 5 days</option>
          <option value="7">Close in 7 days</option>
          <option value="no">Keep open (don't close yet)</option>
        </select>
      </div>
      <div class="modal-actions" style="display:flex;gap:8px;justify-content:flex-end;margin-top:20px">
        <button class="btn btn-ghost" onclick="document.getElementById('fulfill-modal-overlay').remove()">Keep Open</button>
        <button class="btn btn-green" onclick="confirmFulfill('${escAttr(joId)}')">✓ Close Order</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
}

function confirmFulfill(joId) {
  const remarks = document.getElementById('fulfill-remarks')?.value || '';
  const payment = document.getElementById('fulfill-payment')?.value || '';
  const closeOpt = document.getElementById('fulfill-close')?.value || 'now';

  // Save fulfillment data
  const key = `jo_fulfill_${joId}`;
  const fulfillData = { remarks, payment, closeOpt, date: new Date().toISOString() };
  localStorage.setItem(key, JSON.stringify(fulfillData));
  fbSync('jo_fulfill/' + joId, fulfillData);

  document.getElementById('fulfill-modal-overlay')?.remove();

  if (closeOpt === 'no') {
    showToast('Order kept open. Data saved.', 'green');
    return;
  }

  if (closeOpt === 'now') {
    changeJOStatus(joId, 'Fulfilled');
  } else {
    // Schedule delayed close
    const days = parseInt(closeOpt);
    const closeDate = new Date(); closeDate.setDate(closeDate.getDate() + days);
    localStorage.setItem(`jo_delayed_close_${joId}`, closeDate.toISOString());
    fbSync('jo_delayed_close/' + joId, closeDate.toISOString());
    showToast(`Order will auto-close in ${days} days`, 'green');
  }
}

// Check for delayed closes on load
function checkDelayedCloses() {
  const now = new Date();
  let mutated = false;
  jobOrders.forEach(jo => {
    const key = `jo_delayed_close_${jo.id}`;
    const closeDate = localStorage.getItem(key);
    if (closeDate && new Date(closeDate) <= now && jo.status === 'Active') {
      changeJOStatus(jo.id, 'Fulfilled');
      localStorage.removeItem(key);
      mutated = true;
    }
  });
  return mutated;
}

// ═══════════════════════════════════════════════
// CANDIDATE RATING SYSTEM (1-10)
// ═══════════════════════════════════════════════
// Docs that trigger auto-verify (any 1 = Verified)
const AUTO_VERIFY_DOCS = ['brgy','police','nbi','validId','medical'];

function isAutoVerified(candId) {
  const docs = (candidateRatings[candId]?.docs) || {};
  return AUTO_VERIFY_DOCS.some(k => docs[k]);
}

function getEffectiveVerified(c) {
  if (!c) return false;
  return c.status === 'Verified' || isAutoVerified(c.id);
}

function getPlacementExtra(pid, extrasCache) {
  if (extrasCache && extrasCache.has(pid)) return extrasCache.get(pid);
  let ex = {};
  try { ex = JSON.parse(localStorage.getItem('prow_extra_' + pid) || '{}'); } catch(e) {}
  return ex;
}

function isCandidateHired(candId, extrasCache) {
  return [...placements, ...manualPlacements].some(p => {
    if (p.candidateId !== candId) return false;
    const ex = getPlacementExtra(p.placementId || p.candidateId, extrasCache);
    return (ex.status || p.status || '').trim().toLowerCase() === 'hired';
  });
}

// Per-candidate predicates used by the WARM "Needs a Call" list.
// All read placements + manualPlacements + prow_extras already in scope.
const _POST_INTEREST_STAGES = ['Confirmed Interested','Called / Verified','For Employer Review','Interview Scheduled','Pending Requirements','Hired ✓'];

function broadcastCount(candId) {
  return manualPlacements.filter(function(p) { return p.candidateId === candId && p.source === 'broadcast'; }).length;
}

function hasBeenContacted(candId, extrasCache) {
  return [...placements, ...manualPlacements].some(function(p) {
    if (p.candidateId !== candId) return false;
    const ex = getPlacementExtra(p.placementId || p.candidateId, extrasCache);
    return !!ex.lastDirectContactAt;
  });
}

function saidInterested(candId, extrasCache) {
  return [...placements, ...manualPlacements].some(function(p) {
    if (p.candidateId !== candId) return false;
    const ex = getPlacementExtra(p.placementId || p.candidateId, extrasCache);
    if ((ex.response || p.response) === 'Interested') return true;
    return _POST_INTEREST_STAGES.indexOf(getEffectiveStage(ex, p)) >= 0;
  });
}

function saidNotInterested(candId, extrasCache) {
  return [...placements, ...manualPlacements].some(function(p) {
    if (p.candidateId !== candId) return false;
    const ex = getPlacementExtra(p.placementId || p.candidateId, extrasCache);
    if ((ex.response || p.response) === 'Not Interested') return true;
    return getEffectiveStage(ex, p) === 'Rejected by Candidate';
  });
}

// Pick a placement to launch a call against. For WARM (broadcast-only) the
// most-recently-dated broadcast placement matches _walkerLogDmSent's heuristic.
// Only considers placements that HAVE a placementId — submitCallDecision
// skips the lastDirectContactAt stamp when placementId is falsy, which would
// keep a freshly-called candidate stuck on the WARM list.
function pickCallTarget(candId) {
  const broadcasts = manualPlacements
    .filter(function(p) { return p.candidateId === candId && p.source === 'broadcast' && p.placementId; })
    .slice()
    .sort(function(a, b) { return (b.date || '').localeCompare(a.date || ''); });
  if (broadcasts.length) {
    const t = broadcasts[0];
    return { joId: t.jobOrderId, placementId: t.placementId };
  }
  // Fallback: any placement of this candidate that HAS a placementId.
  const any = [...placements, ...manualPlacements].find(function(p) { return p.candidateId === candId && p.placementId; });
  return any ? { joId: any.jobOrderId, placementId: any.placementId } : { joId: '', placementId: '' };
}

// ═══════════════════════════════════════════════
// ERA SCORING SYSTEM
// Eligibility + Responsiveness + Attitude
// ═══════════════════════════════════════════════

function calcERA(candId, joId) {
  const stored = candidateRatings[candId] || {};
  const docs   = stored.docs   || {};
  const scores = stored.scores || {};
  const c = candidates.find(x => x.id === candId);
  const jo = joId ? jobOrders.find(j => j.id === joId) : null;

  // ── QUALITY FLAGS (for AI Matcher only — not part of ERA score) ──
  const qualityFlags = { ageMatch: null, locationMatch: null, jobMatch: null };
  if (jo) {
    const candJobFmt = (c?.jobTypeFormatted || c?.jobType || '').toLowerCase();
    const joPos      = (jo.position || '').toLowerCase();
    const jobKeywords = ['yaya','kasambahay','helper','housekeeper','nanny','caregiver','driver','cook','laundry','cleaner','janitor'];
    const roleMatch = candJobFmt && joPos && (
      joPos.includes(candJobFmt) || candJobFmt.includes(joPos) ||
      jobKeywords.some(kw => joPos.includes(kw) && candJobFmt.includes(kw))
    );
    qualityFlags.jobMatch = roleMatch ? true : false;
    const candCity = (c?.cityFormatted || c?.location || '').toLowerCase();
    const joCity   = (jo.company || '').toLowerCase();
    qualityFlags.locationMatch = candCity ? (candCity.includes('bacolod') || candCity === joCity) : null;
    const candAge = c?.ageInt || parseInt(c?.age) || 0;
    qualityFlags.ageMatch = candAge > 0 ? (candAge >= 20 && candAge <= 45) : null;
  }

  // ── E: ELIGIBILITY ──
  let E = 0;
  const eBreakdown = [];

  const basicInfoComplete = !!(c?.name && c?.phone && c?.jobType && c?.location);
  if (docs.validId)          { E += 1.0; eBreakdown.push({ label: 'Valid ID submitted',          val: 1.0, sign: '+' }); }
  if (basicInfoComplete)     { E += 1.0; eBreakdown.push({ label: 'Basic information complete',  val: 1.0, sign: '+' }); }
  else                       { E -= 1.0; eBreakdown.push({ label: 'Missing key information',     val: 1.0, sign: '-' }); }
  if (scores.workIntentConfirmed)   { E += 1.0; eBreakdown.push({ label: 'Work intent confirmed',   val: 1.0, sign: '+' }); }
  if (scores.availabilityConfirmed) { E += 1.0; eBreakdown.push({ label: 'Availability confirmed',  val: 1.0, sign: '+' }); }
  if (docs.brgy)    { E += 0.5; eBreakdown.push({ label: 'Brgy Clearance',    val: 0.5, sign: '+' }); }
  if (docs.police)  { E += 1.0; eBreakdown.push({ label: 'Police Clearance',  val: 1.0, sign: '+' }); }
  if (docs.nbi)     { E += 0.5; eBreakdown.push({ label: 'NBI Clearance',     val: 0.5, sign: '+' }); }
  if (docs.medical) { E += 0.5; eBreakdown.push({ label: 'Medical Cert',      val: 0.5, sign: '+' }); }
  if (docs.resume)  { E += 0.5; eBreakdown.push({ label: 'Resume',            val: 0.5, sign: '+' }); }

  // ── R: RESPONSIVENESS ──
  let R = 0;
  const rBreakdown = [];
  const hasRActivity = !!(scores.repliedFast || scores.answeredCall || scores.confirmedIntv || scores.lateReply || scores.noShow || scores.multiFollowup);

  if (scores.repliedFast)    { R += 1.0; rBreakdown.push({ label: 'Replied within 24 hours',      val: 1.0, sign: '+' }); }
  if (scores.answeredCall)   { R += 1.0; rBreakdown.push({ label: 'Answered call',                 val: 1.0, sign: '+' }); }
  if (scores.confirmedIntv)  { R += 1.0; rBreakdown.push({ label: 'Confirmed availability',        val: 1.0, sign: '+' }); }
  if (scores.lateReply)      { R -= 1.0; rBreakdown.push({ label: 'Slow reply (3+ days)',          val: 1.0, sign: '-' }); }
  if (scores.noShow)         { R -= 2.5; rBreakdown.push({ label: 'No response',                   val: 2.5, sign: '-' }); }
  if (scores.multiFollowup)  { R -= 1.0; rBreakdown.push({ label: 'Needed multiple follow-ups',   val: 1.0, sign: '-' }); }

  R = Math.min(3.0, R);

  // ── A: ATTITUDE ──
  let A = 0;
  const aBreakdown = [];
  const att = parseInt(scores.callAttitude) || 0;
  const hasAActivity = !!(att > 0 || scores.polite || scores.willingToWork || scores.passedScreening || scores.followsInstructions || scores.hesitantAnswers || scores.confusingAnswers);

  if (att >= 4) {
    A += 1.0; aBreakdown.push({ label: 'Good call attitude', val: 1.0, sign: '+' });
  } else if (att === 3) {
    aBreakdown.push({ label: 'Average call attitude', val: 0, sign: '=' });
  } else if (att === 2) {
    A -= 0.5; aBreakdown.push({ label: 'Below average attitude', val: 0.5, sign: '-' });
  } else if (att === 1) {
    A -= 1.5; aBreakdown.push({ label: 'Poor attitude', val: 1.5, sign: '-' });
  }
  if (scores.polite)           { A += 1.0; aBreakdown.push({ label: 'Clear communication',              val: 1.0, sign: '+' }); }
  if (scores.passedScreening)  { A += 1.0; aBreakdown.push({ label: 'Consistent answers',               val: 1.0, sign: '+' }); }
  if (scores.willingToWork)    { A += 0.5; aBreakdown.push({ label: 'Willing to work',                  val: 0.5, sign: '+' }); }
  if (scores.followsInstructions) { A += 0.5; aBreakdown.push({ label: 'Follows instructions',          val: 0.5, sign: '+' }); }
  if (scores.hesitantAnswers)  { A -= 1.0; aBreakdown.push({ label: 'Hesitant answers',                 val: 1.0, sign: '-' }); }
  if (scores.confusingAnswers) { A -= 1.0; aBreakdown.push({ label: 'Confusing / inconsistent answers', val: 1.0, sign: '-' }); }

  A = Math.min(4.0, A);

  // ── BONUSES — Track record ──
  let bonus = 0;
  const bonusBreakdown = [];
  if (scores.showedUp)     { bonus += 1.5; bonusBreakdown.push({ label: 'Showed up to interview',     val: 1.5, sign: '+' }); }
  if (scores.completedJob) { bonus += 2.0; bonusBreakdown.push({ label: 'Completed a job',            val: 2.0, sign: '+' }); }
  if (scores.backedOut)    { bonus -= 2.0; bonusBreakdown.push({ label: 'Backed out after accepting', val: 2.0, sign: '-' }); }

  const hasDocs = Object.values(docs).some(Boolean);

  // ── DOCUMENT-BASED SCORE CAP ──
  const hasValidId  = !!docs.validId;
  const hasBrgy     = !!docs.brgy;
  const hasPolice   = !!docs.police;
  const hasNBI      = !!docs.nbi;
  const hasMedical  = !!docs.medical;
  const hasResume   = !!docs.resume;
  const docCount    = [hasBrgy, hasPolice, hasNBI, hasMedical, hasResume].filter(Boolean).length;

  let docCap;
  if (!hasValidId) {
    docCap = 6;
  } else if (hasBrgy && hasPolice && (hasNBI || hasMedical)) {
    docCap = 10;
  } else if ((hasPolice || hasBrgy) && docCount >= 2) {
    docCap = 9;
  } else {
    docCap = 8;
  }

  const docConfidence = (hasBrgy && hasPolice && (hasNBI || hasMedical)) ? 'Complete' :
                        (docCount >= 2 ? 'Partial' : 'Incomplete');

  // ── FINAL SCORE ──
  let total = 2.0 + E + R + A + bonus;
  total = Math.min(total, docCap);
  if (!hasAActivity) total = Math.min(total, 7.0);
  const isBlacklisted = !!blacklist[candId];
  if (isBlacklisted) total = Math.min(total, 2.0);

  const final = Math.min(10, Math.max(1, Math.round(total * 10) / 10));

  return {
    score: final,
    E: Math.round(E * 10) / 10,
    R: Math.round(R * 10) / 10,
    A: Math.round(A * 10) / 10,
    bonus: Math.round(bonus * 10) / 10,
    eBreakdown, rBreakdown, aBreakdown, bonusBreakdown,
    isBlacklisted, qualityFlags,
    hasRActivity, hasAActivity, hasDocs,
    hasValidId,
    docCap, docConfidence
  };
}

function calcCandRatingFull(candId, joId) {
  const era = calcERA(candId, joId);
  // Build flat breakdown for legacy display
  const breakdown = [
    { label: 'Base Score', val: 2.0, sign: '' },
    ...era.eBreakdown.map(b => ({ ...b, label: '[E] ' + b.label })),
    ...era.rBreakdown.map(b => ({ ...b, label: '[R] ' + b.label })),
    ...era.aBreakdown.map(b => ({ ...b, label: '[A] ' + b.label })),
    ...era.bonusBreakdown.map(b => ({ ...b, label: '[+] ' + b.label })),
  ];
  if (era.isBlacklisted) breakdown.push({ label: 'Blacklisted (capped at 2.0)', val: '→ 2.0', sign: '' });
  return { score: era.score, breakdown, isBlacklisted: era.isBlacklisted, era };
}

function calcCandRating(candId) {
  return calcERA(candId).score;
}

function getDocConfidence(candId) {
  const stored = candidateRatings[candId] || {};
  const docs = stored.docs || {};
  const coreCount = [docs.brgy, docs.police, docs.nbi].filter(Boolean).length;
  if (coreCount === 3) return { label: 'Complete',   color: 'var(--green)' };
  if (coreCount >= 1)  return { label: 'Partial',    color: 'var(--orange)' };
  return                      { label: 'Incomplete', color: 'var(--red)' };
}

function getAutoTags(candId) {
  const era = calcERA(candId);
  const stored = candidateRatings[candId] || {};
  const scores = stored.scores || {};
  const tags = [];
  if (scores.noShow)        tags.push({ label: 'No Response',    color: 'var(--red)' });
  if (era.score >= 8.0)     tags.push({ label: 'High Potential', color: 'var(--accent)' });
  return tags;
}

function getRatingLabel(r) {
  if (r >= 9) return { label: 'Elite',   color: '#059669' };
  if (r >= 7) return { label: 'Strong',  color: 'var(--accent)' };
  if (r >= 5) return { label: 'Average', color: 'var(--orange)' };
  return             { label: 'Risk',    color: 'var(--red)' };
}

function getRatingColor(r) {
  return getRatingLabel(r).color;
}

function getRatingStars(r) {
  const filled = Math.min(5, Math.round(r / 2));
  return '★'.repeat(filled) + '☆'.repeat(5 - filled);
}

function saveCandScore(candId, key, val) {
  // Guard: "No response" (noShow) can only be set ON if direct contact was
  // actually attempted (call or DM logged) AND at least 3 days have passed.
  // Toggling OFF (val=false) is always allowed (reversible).
  if (key === 'noShow' && val === true) {
    const allP = [...placements, ...manualPlacements].filter(function(p) { return p.candidateId === candId; });
    let mostRecentDirect = '';
    for (let i = 0; i < allP.length; i++) {
      const p = allP[i];
      const pid = p.placementId || p.candidateId;
      let ex = {};
      try { ex = JSON.parse(localStorage.getItem('prow_extra_' + pid) || '{}'); } catch(_e) {}
      const d = ex.lastDirectContactAt || '';
      if (d && d > mostRecentDirect) mostRecentDirect = d;
    }
    if (!mostRecentDirect) {
      showToast("Can't mark No Response — no direct contact logged yet.", 'orange');
      return;
    }
    if (daysDiff(mostRecentDirect) < 3) {
      showToast('Wait 3 days after contact before marking No Response.', 'orange');
      return;
    }
  }
  if (!candidateRatings[candId]) candidateRatings[candId] = {};
  if (!candidateRatings[candId].scores) candidateRatings[candId].scores = {};
  candidateRatings[candId].scores[key] = val;
  saveCandidateRatings();
  const modal = document.getElementById('modal-cand-profile');
  if (modal?.classList.contains('open')) openCandModal(candId);
}

function saveCandDoc(candId, docKey, val) {
  if (!candidateRatings[candId]) candidateRatings[candId] = { docs: {} };
  if (!candidateRatings[candId].docs) candidateRatings[candId].docs = {};
  candidateRatings[candId].docs[docKey] = val;
  saveCandidateRatings();

  // Auto-verify: if any trigger doc is now submitted, mark locally verified
  const autoVer = isAutoVerified(candId);
  if (!candidateRatings[candId]) candidateRatings[candId] = {};
  candidateRatings[candId].autoVerified = autoVer;
  saveCandidateRatings();

  // Show toast if newly verified
  if (autoVer && val) showToast(`${candId} auto-verified via document`, 'green');

  // Re-render cand modal + candidate card if visible
  const modal = document.getElementById('modal-cand-profile');
  if (modal?.classList.contains('open')) openCandModal(candId);
  // Refresh candidates view to update badge
  renderCandidates();
}

function saveCandAdjustment(candId, val) {
  // legacy kept for compatibility
  if (!candidateRatings[candId]) candidateRatings[candId] = {};
  candidateRatings[candId].adjustment = parseFloat(val) || 0;
  saveCandidateRatings();
  const modal = document.getElementById('modal-cand-profile');
  if (modal?.classList.contains('open')) openCandModal(candId);
}

// ═══════════════════════════════════════════════
// DUPLICATE CANDIDATE WARNING + HIGH DEMAND TAG
// ═══════════════════════════════════════════════
function getCandidateActiveJOs(candId, extrasCache) {
  const allP = [...placements, ...manualPlacements].filter(p => p.candidateId === candId);
  return allP.filter(p => {
    const jo = jobOrders.find(j => j.id === p.jobOrderId);
    if (!jo || jo.status !== 'Active') return false;
    const ex = getPlacementExtra(p.placementId || p.candidateId, extrasCache);
    const s = ex.status || p.status || '';
    return s !== 'Dropped';
  });
}

function isHighDemand(candId, extrasCache) {
  return getCandidateActiveJOs(candId, extrasCache).length >= 2;
}

function checkDuplicateBeforeAdd(candId, candName, joId, onConfirm) {
  // All placements of this candidate on OTHER active JOs.
  const otherP = [...placements, ...manualPlacements].filter(function(p) {
    if (p.candidateId !== candId) return false;
    if (p.jobOrderId === joId) return false;
    const jo = jobOrders.find(function(j) { return j.id === p.jobOrderId; });
    return jo && jo.status === 'Active';
  });
  if (!otherP.length) { onConfirm(); return; }

  // Bucket each other-JO placement by its effective stage:
  //   Hired ✓       → hard block (Hired wins over everything)
  //   Active stage  → dismissible warning (STAGE_RANK keys active stages)
  //   Exit stage    → silently allowed (absent from STAGE_RANK)
  const hiredOn  = [];
  const activeOn = [];
  otherP.forEach(function(p) {
    const ex = getPlacementExtra(p.placementId || p.candidateId);
    const stage = getEffectiveStage(ex, p);
    if (stage === 'Hired ✓')      hiredOn.push({ p: p, stage: stage });
    else if (STAGE_RANK[stage])    activeOn.push({ p: p, stage: stage });
  });

  if (hiredOn.length) {
    const list = hiredOn.map(function(x) {
      const jo = jobOrders.find(function(j) { return j.id === x.p.jobOrderId; });
      return x.p.jobOrderId + (jo ? ' — ' + jo.company : '');
    }).join(', ');
    alert('Cannot add — ' + candName + ' is currently Hired on ' + list + '. Move them off Hired first if the placement has ended.');
    return;
  }

  if (activeOn.length) {
    const list = activeOn.map(function(x) {
      const jo = jobOrders.find(function(j) { return j.id === x.p.jobOrderId; });
      return x.p.jobOrderId + (jo ? ' — ' + jo.company : '') + ' (' + x.stage + ')';
    }).join(', ');
    const msg = candName + ' is already in: ' + list + '\n\nAdd to this job order anyway?';
    if (confirm(msg)) onConfirm();
    return;
  }

  // All other-JO placements are at exit stages — allow silently.
  onConfirm();
}

// ═══════════════════════════════════════════════
// SMART AUTOFILL IN ADD PLACEMENT MODAL
// ═══════════════════════════════════════════════
function initCandAutofill() {
  const nameInput = document.getElementById('modal-cand-name');
  const idInput = document.getElementById('modal-cand-id');
  const dropdown = document.getElementById('modal-cand-dropdown');
  if (!nameInput || !dropdown) return;

  nameInput.oninput = function() {
    const q = this.value.toLowerCase().trim();
    if (q.length < 2) { dropdown.style.display='none'; return; }
    const matches = candidates.filter(c =>
      c.name.toLowerCase().includes(q) || c.id.toLowerCase().includes(q)
    ).slice(0, 8);
    if (!matches.length) { dropdown.style.display='none'; return; }
    dropdown.innerHTML = matches.map(c => `
      <div class="autofill-item" onclick="selectAutofillCand('${escAttr(c.id)}','${escAttr(c.name)}','${escAttr(c.phone||'')}')">
        <div style="font-weight:600">${escHtml(c.name)}</div>
        <div style="font-size:10px;color:var(--text3)">${escHtml(c.id)} · ${escHtml(c.jobTypeFormatted || c.jobType)} · ${escHtml(c.location)}</div>
      </div>
    `).join('');
    dropdown.style.display = 'block';
  };

  idInput.oninput = function() {
    const q = this.value.trim();
    if (!q) return;
    const c = candidates.find(x => x.id.toLowerCase() === q.toLowerCase());
    if (c) selectAutofillCand(c.id, c.name, c.phone||'');
  };

  document.addEventListener('click', e => {
    if (!e.target.closest('#modal-cand-name') && !e.target.closest('#modal-cand-dropdown'))
      dropdown.style.display = 'none';
  });
}

function selectAutofillCand(id, name, phone) {
  document.getElementById('modal-cand-id').value = id;
  document.getElementById('modal-cand-name').value = name;
  document.getElementById('modal-cand-dropdown').style.display = 'none';
}

// ═══════════════════════════════════════════════
// HIRED TAB
// ═══════════════════════════════════════════════

function toggleHiredDetails(pid) {
  const el  = document.getElementById('hd-' + pid);
  const btn = document.getElementById('hdb-' + pid);
  if (!el) return;
  const open = el.classList.toggle('open');
  if (btn) btn.textContent = open ? '▲ Hide Timeline & Notes' : '▼ View Timeline & Notes';
}

function buildHiredExpanded(p, ex, jo, hireData, pid, c, allPlacements) {
  // ── Position in shortlist ──
  const joAll = allPlacements.filter(function(pl){ return pl.jobOrderId === p.jobOrderId; });
  joAll.sort(function(a,b){ return (a.date||'').localeCompare(b.date||''); });
  const myKey = p.placementId || p.candidateId;
  const pos   = joAll.findIndex(function(pl){ return (pl.placementId||pl.candidateId) === myKey; }) + 1;
  const total = joAll.length;

  // ── Days calculations ──
  const addedDate   = p.date || '';
  const contactDate = ex.lastContacted || '';
  const hiredDate   = hireData.hireDate || '';
  function daysBetween(d1, d2) {
    if (!d1 || !d2) return null;
    var diff = Math.round((new Date(d2) - new Date(d1)) / 86400000);
    return diff >= 0 ? diff : null;
  }
  const daysToContact = daysBetween(addedDate, contactDate);
  const daysToHireFull = daysBetween(addedDate, hiredDate);
  const daysContactHire = daysBetween(contactDate || addedDate, hiredDate);

  const pillsHTML = '<div class="hired-summary-pills">' +
    '<div class="hired-pill"><div class="hired-pill-val">' + (pos > 0 ? '#' + pos : '—') + '</div><div class="hired-pill-lbl">of ' + total + ' sent</div></div>' +
    '<div class="hired-pill"><div class="hired-pill-val">' + (daysToContact !== null ? daysToContact : '—') + '</div><div class="hired-pill-lbl">Days to Contact</div></div>' +
    '<div class="hired-pill"><div class="hired-pill-val">' + (daysContactHire !== null ? daysContactHire : '—') + '</div><div class="hired-pill-lbl">Contact to Hire</div></div>' +
    '<div class="hired-pill"><div class="hired-pill-val">' + (daysToHireFull !== null ? daysToHireFull : '—') + '</div><div class="hired-pill-lbl">Total Days</div></div>' +
    '</div>';

  const metaRows = [];
  if (c && c.timestamp) metaRows.push('<span style="color:var(--text3)">Registered:</span> ' + fmtDate(c.timestamp.split(' ')[0]));
  if (addedDate) metaRows.push('<span style="color:var(--text3)">Added to JO:</span> ' + fmtDate(addedDate));
  if (contactDate) metaRows.push('<span style="color:var(--text3)">Last Contact:</span> ' + fmtDate(contactDate));
  if (ex.interviewDate) metaRows.push('<span style="color:var(--text3)">Interview:</span> ' + fmtDate(ex.interviewDate));
  if (hiredDate) metaRows.push('<span style="color:var(--text3)">Hired:</span> ' + fmtDate(hiredDate));
  if (ex.contactVia) metaRows.push('<span style="color:var(--text3)">Via:</span> ' + escHtml(ex.contactVia));
  const metaHTML = metaRows.length ? '<div style="display:grid;grid-template-columns:1fr 1fr;gap:5px;font-size:11px;color:var(--text2);margin-bottom:14px">' + metaRows.map(function(r){ return '<div>' + r + '</div>'; }).join('') + '</div>' : '';

  // ── Timeline ──
  var events = [];
  // Convert any date string to a numeric timestamp for reliable sorting
  function tlMs(d) {
    if (!d) return Infinity;
    var t = new Date(d.replace(' ', 'T')).getTime();
    return isNaN(t) ? Infinity : t;
  }

  var regRaw = c && c.timestamp ? c.timestamp : '';
  if (regRaw)              events.push({ date: regRaw,           label: 'Registered as candidate',                        sub: '',                                                    cls: 'tl-reg',     pri: 0 });
  if (addedDate)           events.push({ date: addedDate,        label: 'Added to Job Order ' + escHtml(p.jobOrderId),    sub: jo ? escHtml(jo.company||'') : '',                     cls: 'tl-added',   pri: 1 });
  if (contactDate)         events.push({ date: contactDate,      label: 'Contacted',                                      sub: ex.contactVia ? 'Via ' + escHtml(ex.contactVia) : '', cls: 'tl-contact', pri: 2 });
  if (ex.followupDate)     events.push({ date: ex.followupDate,  label: 'Follow-up #1',                                   sub: '',                                                    cls: 'tl-contact', pri: 3 });
  if (ex.interviewDate)    events.push({ date: ex.interviewDate, label: 'Interview scheduled',                            sub: '',                                                    cls: 'tl-intv',    pri: 4 });
  if ((ex.status === 'Interviewed' || ex.status === 'Hired') && (ex.interviewDate || contactDate)) {
    var intResult = ex.status === 'Hired' ? 'Passed' : 'Completed';
    events.push({ date: ex.interviewDate || contactDate, label: 'Interview completed', sub: intResult, cls: 'tl-intv', pri: 5 });
  }
  if (hiredDate) events.push({ date: hiredDate, label: 'Hired', sub: escHtml(jo ? (jo.company||'') : (p.company||'')), cls: 'tl-hired', pri: 6 });
  (hireData.issues || []).forEach(function(iss) {
    events.push({ date: iss.ts ? iss.ts.split('T')[0] : '', label: 'Issue Reported — ' + escHtml(iss.type), sub: escHtml(iss.description) + ' [' + (iss.urgency||'Normal') + ']', cls: 'tl-issue', pri: 7 });
  });

  var allP2 = [...placements, ...manualPlacements].filter(function(p2) {
    return p2.jobOrderId === p.jobOrderId && p2.isReplacement === true && p2.replacesCandidate === p.candidateId;
  });
  allP2.forEach(function(p2) {
    var pid2 = p2.placementId || p2.candidateId;
    var ex2 = {}; try { ex2 = JSON.parse(localStorage.getItem('prow_extra_' + pid2) || '{}'); } catch(e) {}
    var hireData2 = {}; try { hireData2 = JSON.parse(localStorage.getItem('hire_data_' + pid2) || '{}'); } catch(e) {}
    if ((ex2.status || p2.status) === 'Hired' || hireData2.hireDate) {
      events.push({ date: hireData2.hireDate || ex2.lastContacted || '', label: 'Replacement Hired — ' + escHtml(p2.candidateName), sub: 'Replaced due to: ' + escHtml(p2.replacementReason || 'Issue reported'), cls: 'tl-hired', pri: 8 });
    } else {
      events.push({ date: p2.date || '', label: 'Replacement In Progress — ' + escHtml(p2.candidateName), sub: 'Currently being matched/interviewed', cls: 'tl-intv', pri: 8 });
    }
  });

  // Sort oldest→newest using real Date ms; same timestamp uses logical priority
  events.sort(function(a,b){
    var ta = tlMs(a.date), tb = tlMs(b.date);
    return ta !== tb ? ta - tb : (a.pri||0) - (b.pri||0);
  });
  var tlHTML = events.length ? '<div class="hired-section-label">Timeline</div><div class="hired-tl">' +
    events.map(function(ev){
      return '<div class="hired-tl-item">' +
        '<div class="hired-tl-dot ' + ev.cls + '"></div>' +
        '<div class="hired-tl-date">' + (ev.date ? fmtDate(ev.date) : 'Date unknown') + '</div>' +
        '<div class="hired-tl-label">' + ev.label + '</div>' +
        (ev.sub ? '<div class="hired-tl-sub">' + ev.sub + '</div>' : '') +
        '</div>';
    }).join('') + '</div>' : '';

  // ── Activity & Notes ──
  var activities = [];
  try {
    var cn = JSON.parse(localStorage.getItem('cand_notes_' + p.candidateId) || '[]');
    cn.forEach(function(n){ activities.push({ ts: n.ts||'', text: n.text, src: 'Profile Note' }); });
  } catch(e2) {}
  if (ex.notes) activities.push({ ts: ex.lastContacted || addedDate || '', text: ex.notes, src: 'Placement (' + p.jobOrderId + ')' });
  if (hireData.notes) activities.push({ ts: hiredDate || '', text: hireData.notes, src: 'Hire Note' });
  if (jo && jo.otherNotes) activities.push({ ts: '', text: jo.otherNotes, src: 'JO Notes' });
  activities.sort(function(a,b){
    var at = a.ts || '\uFFFF';
    var bt = b.ts || '\uFFFF';
    return at < bt ? -1 : at > bt ? 1 : 0;
  });
  var actHTML = activities.length ? '<div class="hired-section-label">Activity &amp; Notes</div>' +
    activities.map(function(a){
      return '<div class="activity-item">' +
        '<div class="activity-header">' +
          '<span class="activity-source">' + escHtml(a.src) + '</span>' +
          '<span class="activity-date">' + (a.ts ? fmtDate(a.ts.split('T')[0]) : '') + '</span>' +
        '</div>' +
        '<div class="activity-text">' + escHtml(a.text) + '</div>' +
        '</div>';
    }).join('') : '';

  return '<div class="hired-section-label">Placement Summary</div>' + pillsHTML + metaHTML + tlHTML + actHTML;
}

function renderHiredTab() {
  renderMyEarnings();
  const container = document.getElementById('hired-container');
  if (!container) return;

  const filterJO   = document.getElementById('hired-filter-jo')?.value || '';
  const filterFee  = document.getElementById('hired-filter-fee')?.value || '';
  const filterGuar = document.getElementById('hired-filter-guar')?.value || '';
  const searchRaw  = (document.getElementById('hired-search')?.value || '').trim().toLowerCase();

  const allP = [...placements, ...manualPlacements];
  const hiredRows = [];

  allP.forEach(p => {
    if (blacklist[p.candidateId]) return;
    const pid = p.placementId || p.candidateId;
    let ex = {};
    try { ex = JSON.parse(localStorage.getItem('prow_extra_' + pid) || '{}'); } catch(e) {}
    const status = (ex.status || p.status || '').trim().toLowerCase();
    if (status !== 'hired') return;

    const jo = jobOrders.find(j => j.id === p.jobOrderId);
    const hireKey = `hire_data_${pid}`;
    let hireData = {};
    try { hireData = JSON.parse(localStorage.getItem(hireKey) || '{}'); } catch(e) {}

    hiredRows.push({ p, ex, jo, hireData, pid });
  });

  // Populate JO filter (always rebuild to stay fresh)
  const joSel = document.getElementById('hired-filter-jo');
  if (joSel) {
    const prevVal = joSel.value;
    while (joSel.options.length > 1) joSel.remove(1);
    const joIds = [...new Set(hiredRows.map(r => r.p.jobOrderId))];
    joIds.forEach(id => {
      const o = document.createElement('option');
      o.value = id;
      const jo = jobOrders.find(j => j.id === id);
      o.textContent = id + (jo ? ' — ' + jo.company : '');
      joSel.appendChild(o);
    });
    if (prevVal) joSel.value = prevVal;
  }

  // Filter
  let filtered = hiredRows;
  if (filterJO)  filtered = filtered.filter(r => r.p.jobOrderId === filterJO);
  if (filterFee === 'Unpaid') filtered = filtered.filter(r => (r.hireData.feeStatus || 'Pending') !== 'Paid' && (r.hireData.feeStatus || 'Pending') !== 'Waived');
  else if (filterFee) filtered = filtered.filter(r => (r.hireData.feeStatus || 'Pending') === filterFee);
  if (filterGuar) {
    filtered = filtered.filter(r => {
      const g = getGuaranteeStatus(r);
      return g.key === filterGuar;
    });
  }
  if (searchRaw) {
    filtered = filtered.filter(r => {
      const candName = (r.p.candidateName || '').toLowerCase();
      const employer = (r.jo ? r.jo.company : '').toLowerCase();
      const position = (r.jo ? r.jo.position : '').toLowerCase();
      return candName.includes(searchRaw) || employer.includes(searchRaw) || position.includes(searchRaw);
    });
  }

  document.getElementById('hired-count').textContent = filtered.length;
  const countEl = document.getElementById('hired-record-count');
  if (countEl) {
    const isFiltered = filterJO || filterFee || filterGuar || searchRaw;
    countEl.textContent = 'Showing ' + filtered.length + ' of ' + hiredRows.length + ' hired records' + (isFiltered ? ' (filtered)' : '');
  }

  if (!filtered.length) {
    container.innerHTML = '<div class="empty-state" style="grid-column:1/-1"><div class="empty-icon">—</div>No hired candidates' + (filterJO || filterFee || filterGuar || searchRaw ? ' matching filters' : '') + '.</div>';
    renderGuarWatch(hiredRows);
    return;
  }

  // Sort: most recent hire date first
  filtered.sort((a,b) => {
    const da = a.hireData.hireDate || a.ex.lastContacted || '';
    const db = b.hireData.hireDate || b.ex.lastContacted || '';
    return db.localeCompare(da);
  });

  // Summary stats
  const daysToHireArr = filtered.map(({ p, ex, hireData }) => {
    const added = p.date || ex.lastContacted || '';
    const hired = hireData.hireDate || '';
    if (!added || !hired) return null;
    const d = Math.round((new Date(hired) - new Date(added)) / 86400000);
    return d >= 0 ? d : null;
  }).filter(d => d !== null);
  const avgDays = daysToHireArr.length ? Math.round(daysToHireArr.reduce((a,b)=>a+b,0) / daysToHireArr.length) : null;
  const fastestDays = daysToHireArr.length ? Math.min(...daysToHireArr) : null;
  // Conversion rate: total hired (unfiltered) / active job orders
  const totalHiredAll = hiredRows.length;
  const activeJOCount = jobOrders.length;
  const convRate = activeJOCount > 0 ? Math.round((totalHiredAll / activeJOCount) * 100) : null;

  // Repeat employers: group hiredRows by employer name (jo.company) or jobOrderId, count those with > 1 hire
  const employerCounts = {};
  hiredRows.forEach(function(r) {
    const key = (r.jo && r.jo.company && r.jo.company.trim()) ? r.jo.company.trim().toLowerCase() : r.p.jobOrderId;
    employerCounts[key] = (employerCounts[key] || 0) + 1;
  });
  const repeatEmployers = Object.values(employerCounts).filter(function(n) { return n > 1; }).length;

  const summaryHTML = `
    <div style="grid-column:1/-1;display:flex;gap:10px;flex-wrap:wrap;margin-bottom:4px">
      <div style="flex:1;min-width:120px;background:var(--card);border:1px solid var(--border);border-radius:12px;padding:12px 16px">
        <div style="font-size:10px;font-weight:700;color:var(--text3);text-transform:uppercase;letter-spacing:.6px;margin-bottom:4px">Total Hired</div>
        <div style="font-size:22px;font-weight:800;color:var(--accent)">${filtered.length}</div>
      </div>
      <div style="flex:1;min-width:120px;background:var(--card);border:1px solid var(--border);border-radius:12px;padding:12px 16px">
        <div style="font-size:10px;font-weight:700;color:var(--text3);text-transform:uppercase;letter-spacing:.6px;margin-bottom:4px">Avg Days to Hire</div>
        <div style="font-size:22px;font-weight:800;color:var(--text)">${avgDays !== null ? avgDays + ' days' : '—'}</div>
        ${fastestDays !== null ? `<div style="font-size:10px;color:var(--green)">Fastest: ${fastestDays} days</div>` : ''}
      </div>
      <div style="flex:1;min-width:120px;background:var(--card);border:1px solid var(--border);border-radius:12px;padding:12px 16px">
        <div style="font-size:10px;font-weight:700;color:var(--text3);text-transform:uppercase;letter-spacing:.6px;margin-bottom:4px">Conversion Rate</div>
        <div style="font-size:22px;font-weight:800;color:var(--green)">${convRate !== null ? convRate + '%' : '—'}</div>
        <div style="font-size:10px;color:var(--text3)">job orders converted</div>
      </div>
      <div style="flex:1;min-width:120px;background:var(--card);border:1px solid var(--border);border-radius:12px;padding:12px 16px">
        <div style="font-size:10px;font-weight:700;color:var(--text3);text-transform:uppercase;letter-spacing:.6px;margin-bottom:4px">Repeat Employers</div>
        <div style="font-size:22px;font-weight:800;color:var(--purple)">${repeatEmployers}</div>
        <div style="font-size:10px;color:var(--text3)">hired more than once</div>
      </div>
    </div>`;

  container.innerHTML = summaryHTML;
  filtered.forEach(({ p, ex, jo, hireData, pid }) => {
    const card = buildHiredCard(p, ex, jo, hireData, pid, allP);
    container.appendChild(card);
  });

  renderGuarWatch(hiredRows);
}

function renderGuarWatch(hiredRows) {
  const section = document.getElementById('guar-watch-section');
  if (!section) return;

  const today = Date.now();
  const active = [];
  hiredRows.forEach(function(r) {
    const hd = r.hireData.hireDate;
    if (!hd) return;
    const hireMs = new Date(hd).getTime();
    if (isNaN(hireMs)) return;
    const expireMs = hireMs + 30 * 86400000;
    const daysLeft = Math.ceil((expireMs - today) / 86400000);
    if (daysLeft > 0) active.push({ r: r, daysLeft: daysLeft, expireMs: expireMs });
  });

  if (!active.length) {
    section.innerHTML = '';
    return;
  }

  active.sort(function(a, b) { return a.daysLeft - b.daysLeft; });

  var rows = active.map(function(item) {
    const r = item.r;
    const daysLeft = item.daysLeft;
    var cls = daysLeft <= 7 ? 'guar-days-red' : daysLeft <= 14 ? 'guar-days-gold' : 'guar-days-green';
    var issueIcon = r.hireData.issueReported ? ' <span class="badge-red" style="font-size:9px;padding:1px 5px;border-radius:4px">Issue</span>' : '';
    var expireDate = new Date(item.expireMs).toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' });
    var hireDate = new Date(r.hireData.hireDate).toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' });
    var employer = r.jo ? escHtml(r.jo.company || '') : '—';
    var position = r.jo ? escHtml(r.jo.position || '') : '—';
    var candName = escHtml(r.p.candidateName || r.p.candidateId || '—');
    var waMsg = 'Hi ' + (r.jo ? r.jo.company : 'Employer') + ', just checking in on ' + (r.p.candidateName || 'your new hire') + ' — is everything going well? We are here if you need anything.';
    var waUrl = 'https://wa.me/?text=' + encodeURIComponent(waMsg);
    return '<tr>' +
      '<td>' + candName + '</td>' +
      '<td>' + employer + '</td>' +
      '<td>' + position + '</td>' +
      '<td>' + hireDate + '</td>' +
      '<td>' + expireDate + '</td>' +
      '<td class="' + cls + '">' + daysLeft + ' day' + (daysLeft !== 1 ? 's' : '') + issueIcon + '</td>' +
      '<td><a href="' + waUrl + '" target="_blank" style="font-size:11px;color:var(--green);font-weight:600;white-space:nowrap">WhatsApp</a></td>' +
      '</tr>';
  }).join('');

  section.innerHTML = '<div class="guar-watch-section">' +
    '<div style="font-size:13px;font-weight:800;letter-spacing:-0.3px;margin-bottom:12px">Guarantee Watch <span style="font-size:11px;font-weight:600;color:var(--text3)">' + active.length + ' active</span></div>' +
    '<div class="guar-table-wrap">' +
    '<table class="guar-table"><thead><tr>' +
    '<th>Candidate</th><th>Employer</th><th>Position</th><th>Hire Date</th><th>Expires</th><th>Days Left</th><th>Action</th>' +
    '</tr></thead><tbody>' + rows + '</tbody></table>' +
    '</div></div>';
}

function getGuaranteeStatus({ hireData, pid }) {
  if (hireData.issueReported) return { key:'issue', label:'Issue Reported', color:'var(--orange)' };
  const hireDate = hireData.hireDate;
  if (!hireDate) return { key:'active', label:'Guarantee Active', color:'var(--accent)' };
  const daysSince = daysDiff(hireDate);
  if (daysSince > 30) return { key:'expired', label:'30-day Guarantee Expired', color:'var(--text3)' };
  const remaining = 30 - daysSince;
  return { key:'active', label:`${remaining} days remaining`, color:'var(--accent)' };
}

function buildHiredCard(p, ex, jo, hireData, pid, allPlacements) {
  const card = document.createElement('div');
  const hasUrgentIssue = hireData.issueUrgent || ((hireData.issues||[]).some(function(i){ return i.urgency === 'Urgent'; }));
  card.className = 'hired-card' + (hasUrgentIssue ? ' issue-urgent' : '');

  const gStatus = getGuaranteeStatus({ hireData, pid });
  const feeStatus = hireData.feeStatus || 'Pending';
  const feePaidAmount = hireData.feePaidAmount || hireData.feeAmount || '';
  const feePaidAmountNum = parseFloat((feePaidAmount + '').replace(/[^0-9.]/g, '')) || 0;
  const feeUiHtml = feeStatus === 'Paid'
    ? `<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
         <span style="background:rgba(5,150,105,.12);color:#059669;border:1.5px solid rgba(5,150,105,.4);border-radius:99px;padding:4px 14px;font-size:12px;font-weight:800">
           Paid ${feePaidAmountNum > 0 ? '₱' + feePaidAmountNum.toLocaleString('en-PH') : ''}
           ${hireData.feePaidDate ? ' · ' + hireData.feePaidDate : ''}
           ${hireData.feePaymentMethod ? ' · ' + hireData.feePaymentMethod : ''}
         </span>
         <button onclick="openFeePayModal('${escAttr(pid)}','${escAttr(p.jobOrderId)}')" style="padding:3px 10px;border-radius:8px;border:1px solid var(--border2);background:transparent;color:var(--text3);font-size:11px;font-weight:600;cursor:pointer;font-family:var(--sans)">Edit</button>
       </div>`
    : feeStatus === 'Waived'
      ? `<div style="display:flex;align-items:center;gap:8px">
           <span style="background:rgba(100,116,139,.12);color:#64748b;border:1.5px solid rgba(100,116,139,.4);border-radius:99px;padding:4px 14px;font-size:12px;font-weight:700">Waived</span>
           <button onclick="saveHireData('${escAttr(pid)}','feeStatus','Pending');renderHiredTab()" style="padding:3px 10px;border-radius:8px;border:1px solid var(--border2);background:transparent;color:var(--text3);font-size:11px;cursor:pointer;font-family:var(--sans)">Undo</button>
         </div>`
      : `<div style="display:flex;gap:6px;flex-wrap:wrap">
           <button onclick="openFeePayModal('${escAttr(pid)}','${escAttr(p.jobOrderId)}')" style="padding:6px 16px;border-radius:9px;border:1.5px solid rgba(5,150,105,.5);background:rgba(5,150,105,.08);color:#059669;font-weight:700;font-size:12px;cursor:pointer;font-family:var(--sans)">Mark Fee Paid</button>
           <button onclick="saveHireData('${escAttr(pid)}','feeStatus','Waived');renderHiredTab()" style="padding:6px 12px;border-radius:9px;border:1px solid var(--border2);background:transparent;color:var(--text3);font-size:11px;cursor:pointer;font-family:var(--sans)">Waive</button>
         </div>`;
  const hireDate = hireData.hireDate || '';
  const feeAmount = hireData.feeAmount || '';
  const c = candidates.find(x => x.id === p.candidateId);

  const eraResult = calcERA(p.candidateId);
  const eraScore = eraResult.score;
  const eraColor = eraScore >= 7 ? 'var(--green)' : eraScore >= 5 ? 'var(--gold)' : 'var(--red)';

  // Days to hire: JO placed date (jo.timestamp) → candidate hire date
  const joPlacedDate = jo?.timestamp ? jo.timestamp.split(' ')[0] : '';
  const daysToHire = (joPlacedDate && hireDate)
    ? Math.round((new Date(hireDate) - new Date(joPlacedDate)) / 86400000)
    : null;

  // Days remaining: MAX(0, 30 - days since hire date)
  const daysRemaining = hireDate ? Math.max(0, 30 - Math.round((new Date() - new Date(hireDate)) / 86400000)) : null;

  card.innerHTML = `
    <div class="hired-card-header">
      <div style="display:flex;align-items:center;gap:10px;flex:1">
        <div class="cand-avatar" style="width:40px;height:40px;font-size:18px">${genderEmoji(c?.gender||'')}</div>
        <div>
          <div style="font-size:15px;font-weight:700">${escHtml(p.candidateName)}</div>
          <div style="font-size:11px;color:var(--text3);font-family:var(--mono);display:flex;align-items:center;gap:6px">
            ${escHtml(p.candidateId)}
            <span style="padding:1px 6px;border-radius:4px;font-size:10px;font-weight:700;background:${eraColor}18;color:${eraColor};border:1px solid ${eraColor}40">ERA: ${eraScore}</span>
          </div>
        </div>
      </div>
      <div style="text-align:right">
        <div style="font-size:11px;font-weight:700;color:${gStatus.color}">${gStatus.label}</div>
        <div style="font-size:10px;color:var(--text3);margin-top:2px">${jo ? escHtml(jo.company) : escHtml(p.company||'')}</div>
      </div>
    </div>

    <div class="hired-card-meta">
      <div class="hired-meta-item"><span class="hm-label">Position</span><span>${escHtml(p.position || jo?.position || '—')}</span></div>
      <div class="hired-meta-item"><span class="hm-label">Job Order</span><span style="font-family:var(--mono);font-size:11px">${escHtml(p.jobOrderId)}</span></div>
      <div class="hired-meta-item"><span class="hm-label">Hire Date</span>
        <input type="date" value="${escAttr(hireDate)}" class="hired-inline-input"
          onchange="saveHireData('${escAttr(pid)}','hireDate',this.value);renderHiredTab()">
      </div>
      <div class="hired-meta-item"><span class="hm-label">Days to Hire</span>
        <span style="font-weight:700;color:${daysToHire !== null && daysToHire <= 14 ? 'var(--green)' : daysToHire !== null && daysToHire <= 30 ? 'var(--accent)' : 'var(--text2)'}">
          ${daysToHire !== null && daysToHire >= 0 ? daysToHire + ' days' : '—'}
        </span>
      </div>
      <div class="hired-meta-item"><span class="hm-label">Days Remaining</span>
        <span style="font-weight:700;color:${daysRemaining !== null && daysRemaining > 10 ? 'var(--green)' : daysRemaining !== null && daysRemaining > 0 ? 'var(--orange)' : 'var(--text3)'}">
          ${daysRemaining !== null ? daysRemaining + ' days' : '—'}
        </span>
      </div>
      <div class="hired-meta-item"><span class="hm-label">Fee Amount</span>
        <input type="text" value="${escAttr(feeAmount)}" placeholder="e.g. 1400" class="hired-inline-input"
          onchange="saveHireData('${escAttr(pid)}','feeAmount',this.value)">
      </div>
      <div class="hired-meta-item" style="grid-column:1/-1">
        <span class="hm-label">Fee Status</span>
        <div style="margin-top:6px">${feeUiHtml}</div>
      </div>
    </div>

    ${jo?.workSchedule || jo?.salary || jo?.skillsNeeded ? `
    <div style="background:var(--bg);border:1px solid var(--border);border-radius:8px;padding:8px 12px;font-size:12px;color:var(--text2);margin-bottom:10px;display:flex;flex-wrap:wrap;gap:10px">
      ${jo.workSchedule ? `<span><strong>Schedule:</strong> ${escHtml(jo.workSchedule)}</span>` : ''}
      ${jo.salary ? `<span><strong>Salary:</strong> ${escHtml(jo.salary)}</span>` : ''}
      ${jo.skillsNeeded ? `<span><strong>Skills:</strong> ${escHtml(jo.skillsNeeded)}</span>` : ''}
    </div>` : ''}

    <div class="hired-guarantee-bar">
      <div class="hired-guarantee-fill" style="width:${Math.min(100,Math.max(0,hireDate?Math.round(Math.min(daysDiff(hireDate),30)/30*100):0))}%;background:${gStatus.key==='expired'?'var(--green)':gStatus.key==='issue'?'var(--orange)':'var(--accent)'}"></div>
    </div>
    <div style="display:flex;justify-content:space-between;font-size:10px;color:var(--text3);margin-top:4px;padding:0 2px;margin-bottom:10px">
      <span>Hire date</span>
      <span style="color:${gStatus.color};font-weight:600">${gStatus.label}</span>
      <span>Day 30</span>
    </div>

    <div class="hired-meta-item" style="margin-bottom:10px">
      <span class="hm-label">Notes</span>
      <input type="text" value="${escAttr(hireData.notes||'')}" placeholder="Add notes about this placement…" class="hired-inline-input"
        onchange="saveHireData('${escAttr(pid)}','notes',this.value)">
    </div>

    ${(() => {
      const issues = hireData.issues || [];
      if (!issues.length) {
        return `<div style="display:flex;gap:6px;flex-wrap:wrap"><button class="btn btn-ghost btn-sm" style="flex:1" onclick="openIssueModal('${escAttr(pid)}')">Report Issue</button><button class="btn btn-secondary btn-sm" style="flex:1" onclick="openCandModalByName('${escAttr(p.candidateName)}','${escAttr(p.candidateId)}')">Profile</button></div>`;
      }
      const latest = issues[issues.length - 1];
      const urgIcon  = '';
      const isReopened = joStatusOverrides[p.jobOrderId] === 'Active' && hireData.issueReported;
      return `
        <div style="grid-column:1/-1;background:rgba(234,88,12,.06);border:1px solid rgba(234,88,12,.2);border-radius:12px;overflow:hidden;margin-top:4px">
          <div onclick="toggleIssuePanel('${escAttr(pid)}')" style="display:flex;align-items:center;gap:10px;padding:10px 14px;cursor:pointer">
            <span style="font-size:11px;font-weight:700;color:var(--orange)">Issue</span>
            <div style="flex:1;min-width:0">
              <div style="font-size:12px;font-weight:700;color:var(--orange)">${escHtml(latest.type)}</div>
              <div style="font-size:11px;color:var(--text3);margin-top:1px">${urgIcon} ${latest.urgency} · ${escHtml(new Date(latest.ts).toLocaleDateString('en-PH',{month:'short',day:'numeric',year:'numeric'}))}</div>
            </div>
            <span style="font-size:10px;color:var(--text3);font-weight:600">${issues.length > 1 ? issues.length + ' issues' : ''}</span>
            <span id="issue-chevron-${escAttr(pid)}" style="font-size:11px;color:var(--text3);transition:transform .2s">▾</span>
          </div>
          <div id="issue-panel-${escAttr(pid)}" style="display:none;border-top:1px solid rgba(234,88,12,.15);padding:12px 14px;background:rgba(255,255,255,.6)">
            ${issues.map((iss, i) => `
              <div style="${i > 0 ? 'border-top:1px solid var(--border);margin-top:10px;padding-top:10px' : ''}">
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
                  <span style="font-size:11px;font-weight:700;color:var(--orange)">${escHtml(iss.type)}</span>
                  <span style="font-size:10px;color:var(--text3)">${iss.urgency}</span>
                  <span style="font-size:10px;color:var(--text3);margin-left:auto">${escHtml(new Date(iss.ts).toLocaleDateString('en-PH',{month:'short',day:'numeric'}))}</span>
                </div>
                <div style="font-size:12px;color:var(--text2);line-height:1.5;background:var(--card2);border-radius:8px;padding:8px 10px;border:1px solid var(--border)">${escHtml(iss.description)}</div>
                ${iss.action ? `<div style="font-size:11px;color:var(--text3);margin-top:4px">Action: <strong>${escHtml(iss.action)}</strong></div>` : ''}
              </div>`).join('')}
            <div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap">
              <button class="btn btn-ghost" style="flex:1;font-size:11px" onclick="openIssueModal('${escAttr(pid)}')">+ Add Issue</button>
              ${!isReopened
                ? `<button class="btn btn-warning btn-sm" style="flex:1" onclick="reopenJOForReplacement('${escAttr(p.jobOrderId)}','${escAttr(pid)}','${escAttr(p.candidateName)}','${escAttr(latest.type)}')">Reopen for Replacement</button>`
                : `<span style="font-size:11px;font-weight:700;color:var(--green);padding:6px 10px;background:var(--green-dim);border-radius:8px;border:1px solid rgba(5,150,105,.3)">✓ JO Reopened</span>`}
              <button class="btn btn-secondary btn-sm" style="flex:1" onclick="openCandModalByName('${escAttr(p.candidateName)}','${escAttr(p.candidateId)}')">Profile</button>
            </div>
          </div>
        </div>`;
    })()}

    <button class="hired-expand-btn" id="hdb-${escAttr(pid)}" onclick="toggleHiredDetails('${escAttr(pid)}')">▼ View Timeline &amp; Notes</button>
    <div class="hired-details" id="hd-${escAttr(pid)}">
      ${buildHiredExpanded(p, ex, jo, hireData, pid, c, allPlacements || [])}
    </div>
  `;
  return card;
}

function saveHireData(pid, field, value) {
  const key = 'hire_data_' + pid;
  let d = {};
  try { d = JSON.parse(localStorage.getItem(key)||'{}'); } catch(e){}
  d[field] = value;
  _lsSet(key, d);
  fbSyncDebounced('hire_data/' + pid, d);
  // Recompute commission when hire date is set
  if (field === 'hireDate' && value) {
    var p = [...placements, ...manualPlacements].find(function(pl) { return (pl.placementId || pl.candidateId) === pid; });
    if (p) computeAndSaveCommission(pid, p.jobOrderId);
  }
}

function openFeePayModal(pid, joId) {
  document.getElementById('fee-pay-pid').value = pid;
  // Pre-fill amount from hire_data or job order
  let hd = {};
  try { hd = JSON.parse(localStorage.getItem('hire_data_' + pid) || '{}'); } catch(e) {}
  const jo = jobOrders.find(j => j.id === joId);
  const prefillAmount = hd.feePaidAmount || hd.feeAmount || (jo ? jo.feeAmount : '') || '';
  const numericAmount = parseFloat((prefillAmount + '').replace(/[^0-9.]/g, '')) || '';
  document.getElementById('fee-pay-amount').value = numericAmount || '';
  document.getElementById('fee-pay-date').value = hd.feePaidDate || new Date().toISOString().split('T')[0];
  document.getElementById('fee-pay-method').value = hd.feePaymentMethod || 'Cash';
  document.getElementById('fee-pay-notes').value = hd.feePaymentNotes || '';
  openModal('modal-fee-pay');
}

function saveFeePayment() {
  const pid = document.getElementById('fee-pay-pid').value;
  if (!pid) return;
  const amount = document.getElementById('fee-pay-amount').value.trim();
  const date   = document.getElementById('fee-pay-date').value;
  const method = document.getElementById('fee-pay-method').value;
  const notes  = document.getElementById('fee-pay-notes').value.trim();
  if (!amount || !date) { showToast('Amount and date are required.', 'red'); return; }
  const key = 'hire_data_' + pid;
  let d = {};
  try { d = JSON.parse(localStorage.getItem(key) || '{}'); } catch(e) {}
  d.feeStatus          = 'Paid';
  d.feePaidAmount      = amount;
  d.feePaidDate        = date;
  d.feePaymentMethod   = method;
  d.feePaymentNotes    = notes;
  // Also set feeAmount if not already set, so analytics can pick it up
  if (!d.feeAmount) d.feeAmount = amount;
  _lsSet(key, d);
  fbSync('hire_data/' + pid, d);
  closeModal('modal-fee-pay');
  renderHiredTab();
  showToast('Fee payment recorded — ₱' + parseFloat(amount).toLocaleString('en-PH'), 'green');
}

function openCleanupModal() {
  if (!isAdmin()) return;
  var inner = document.getElementById('cleanup-inner');
  if (!inner) return;

  function candCard(c, badgeHtml, actionHtml) {
    var era = calcCandRating(c.id);
    var eraColor = era >= 7 ? 'var(--green)' : era >= 5 ? 'var(--gold)' : 'var(--red)';
    return '<div style="background:var(--card2);border:1px solid var(--border);border-radius:10px;padding:10px 14px;flex:1;min-width:180px">' +
      '<div style="font-size:13px;font-weight:700;margin-bottom:2px">' + escHtml(c.name) + '</div>' +
      '<div style="font-size:10px;color:var(--text3);font-family:var(--mono);margin-bottom:4px">' + escHtml(c.id) + '</div>' +
      '<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:4px">' + badgeHtml + '</div>' +
      '<div style="font-size:11px;color:var(--text2)">' +
        (c.jobTypeFormatted || c.jobType || '—') + ' · ' + (c.location || '—') + '<br>' +
        'Age: ' + (c.age || '—') + ' · ' + (c.timestamp ? c.timestamp.split(' ')[0] : '—') +
      '</div>' +
      '<div style="margin-top:4px;font-size:12px;font-weight:800;color:' + eraColor + '">ERA ' + era + '</div>' +
      (actionHtml ? '<div style="margin-top:8px">' + actionHtml + '</div>' : '') +
      '</div>';
  }

  // ── Duplicates ──
  var dupHtml = '';
  if (_dupPairs.length > 0) {
    dupHtml = '<div style="font-size:13px;font-weight:800;margin-bottom:10px;color:var(--orange)">Duplicates (' + _dupPairs.length + ')</div>';
    _dupPairs.forEach(function(pair, i) {
      var hc = pair.hiddenCand;
      var kc = candidates.find(function(x) { return x.id === pair.keptId; });
      var matchBadge = '<span style="font-size:10px;background:var(--orange-dim);color:var(--orange);padding:1px 7px;border-radius:4px;font-weight:700">Same ' + pair.matchType + '</span>';
      var hiddenActions = '<button onclick="archiveCandFromCleanup(\'' + escAttr(hc.id) + '\')" class="btn btn-red" style="font-size:11px;padding:4px 10px;width:100%">Archive This</button>' +
        '<button onclick="keepBothCandidates(\'' + escAttr(hc.id) + '\')" class="btn btn-ghost" style="font-size:11px;padding:4px 10px;width:100%;margin-top:4px">Keep Both</button>';
      var keptActions = kc ? '<button onclick="archiveCandFromCleanup(\'' + escAttr(kc.id) + '\')" class="btn btn-ghost" style="font-size:11px;padding:4px 10px;width:100%;color:var(--red)">Archive Kept Instead</button>' : '';
      dupHtml += '<div style="border:1px solid var(--border);border-radius:12px;padding:12px;margin-bottom:12px;background:var(--card)">' +
        '<div style="font-size:10px;font-weight:700;color:var(--text3);text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px">Pair ' + (i+1) + ' — ' + pair.matchType + ' match</div>' +
        '<div style="display:flex;gap:10px;flex-wrap:wrap">' +
          (kc ? candCard(kc, '<span style="font-size:10px;background:var(--green-dim);color:var(--green);padding:1px 7px;border-radius:4px;font-weight:700">In Pool</span>' + matchBadge, keptActions) : '<div style="flex:1;min-width:180px;color:var(--text3);font-size:12px;padding:10px">Original not found</div>') +
          candCard(hc, '<span style="font-size:10px;background:var(--red-dim);color:var(--red);padding:1px 7px;border-radius:4px;font-weight:700">Hidden</span>' + matchBadge, hiddenActions) +
        '</div></div>';
    });
  } else {
    dupHtml = '<div style="color:var(--text3);font-size:12px;padding:12px 0">No duplicate candidates.</div>';
  }

  // ── Underage ──
  var undHtml = '';
  if (_underageCands.length > 0) {
    undHtml = '<div style="font-size:13px;font-weight:800;margin:16px 0 10px;color:var(--red)">Underage (' + _underageCands.length + ')</div>';
    _underageCands.forEach(function(c) {
      var actions = '<button onclick="archiveCandFromCleanup(\'' + escAttr(c.id) + '\')" class="btn btn-red" style="font-size:11px;padding:4px 10px;width:100%">Archive</button>';
      undHtml += '<div style="border:1px solid var(--border);border-radius:12px;padding:12px;margin-bottom:10px;background:var(--card);display:flex;gap:10px">' +
        candCard(c, '<span style="font-size:10px;background:var(--red-dim);color:var(--red);padding:1px 7px;border-radius:4px;font-weight:700">Age ' + escHtml(c.age) + '</span>', actions) +
        '</div>';
    });
  } else {
    undHtml = '<div style="color:var(--text3);font-size:12px;padding:12px 0">No underage candidates.</div>';
  }

  inner.innerHTML = dupHtml + undHtml;
  openModal('modal-cleanup');
}

function archiveCandFromCleanup(candId) {
  if (!confirm('Archive candidate ' + candId + '? They will be permanently removed from the pool.')) return;
  if (!candidateRatings[candId]) candidateRatings[candId] = {};
  candidateRatings[candId].archived = true;
  saveCandidateRatings();
  // Remove from tracking arrays immediately
  _dupPairs = _dupPairs.filter(function(p) { return p.hiddenCand.id !== candId && p.keptId !== candId; });
  _hiddenDuplicates = _hiddenDuplicates.filter(function(id) { return id !== candId; });
  _underageCands = _underageCands.filter(function(c) { return c.id !== candId; });
  _hiddenUnderage = _hiddenUnderage.filter(function(id) { return id !== candId; });
  // Also remove from main candidates if it was the kept one
  candidates = candidates.filter(function(c) { return c.id !== candId; });
  updateStats();
  renderCandidates();
  openCleanupModal(); // re-render modal
  showToast('Candidate ' + candId + ' archived.', 'green');
}

function keepBothCandidates(hiddenCandId) {
  var pair = _dupPairs.find(function(p) { return p.hiddenCand.id === hiddenCandId; });
  if (!pair) return;
  if (!candidateRatings[hiddenCandId]) candidateRatings[hiddenCandId] = {};
  candidateRatings[hiddenCandId].keepBoth = true;
  saveCandidateRatings();
  // Add hidden candidate back to candidates array immediately
  candidates.push(pair.hiddenCand);
  _dupPairs = _dupPairs.filter(function(p) { return p.hiddenCand.id !== hiddenCandId; });
  _hiddenDuplicates = _hiddenDuplicates.filter(function(id) { return id !== hiddenCandId; });
  updateStats();
  renderCandidates();
  openCleanupModal();
  showToast('Both candidates are now in the pool.', 'green');
}

function openIssueModal(pid) {
  const allP = [...placements, ...manualPlacements];
  const p = allP.find(function(pl) { return (pl.placementId || pl.candidateId) === pid; });
  if (!p) return;
  const jo = jobOrders.find(function(j) { return j.id === p.jobOrderId; });
  let hireData = {};
  try { hireData = JSON.parse(localStorage.getItem('hire_data_' + pid) || '{}'); } catch(e) {}
  const hireDate = hireData.hireDate || '';
  const daysRemaining = hireDate ? Math.max(0, 30 - Math.round((new Date() - new Date(hireDate)) / 86400000)) : null;

  document.getElementById('ri-pid').value = pid;
  document.getElementById('ri-jo-id').value = p.jobOrderId;
  document.getElementById('ri-cand-id').value = p.candidateId;
  document.getElementById('ri-cand-name').textContent = p.candidateName;
  document.getElementById('ri-cand-id-display').textContent = p.candidateId;
  document.getElementById('ri-jo-display').textContent = p.jobOrderId;
  document.getElementById('ri-employer').textContent = jo ? jo.company : (p.company || '—');
  document.getElementById('ri-position').textContent = p.position || (jo && jo.position) || '—';
  document.getElementById('ri-hire-date').textContent = hireDate ? fmtDate(hireDate) : '—';
  document.getElementById('ri-days-remaining').textContent = daysRemaining !== null ? daysRemaining + ' days' : '—';

  document.getElementById('ri-type').value = '';
  document.getElementById('ri-description').value = '';
  document.getElementById('ri-action').value = '';
  setUrgency('Normal');

  openModal('modal-report-issue');
}

function submitIssueReport() {
  const pid = document.getElementById('ri-pid').value;
  const joId = document.getElementById('ri-jo-id').value;
  const candId = document.getElementById('ri-cand-id').value;
  const issueType = document.getElementById('ri-type').value;
  const urgency = document.getElementById('ri-urgency-val')?.value || 'Normal';
  const description = document.getElementById('ri-description').value.trim();
  const action = document.getElementById('ri-action').value;

  if (!issueType) { showToast('Please select an Issue Type.', 'orange'); return; }
  if (!description) { showToast('Please describe the issue.', 'orange'); return; }

  const ts = new Date().toISOString();
  const issue = { ts: ts, type: issueType, urgency: urgency, description: description, action: action };

  let hireData = {};
  try { hireData = JSON.parse(localStorage.getItem('hire_data_' + pid) || '{}'); } catch(e) {}
  const issues = hireData.issues ? hireData.issues.slice() : [];
  issues.push(issue);

  saveHireData(pid, 'issues', issues);
  saveHireData(pid, 'issueReported', true);
  saveHireData(pid, 'issueNote', issueType);
  if (urgency === 'Urgent') saveHireData(pid, 'issueUrgent', true);

  flaggedCands[candId] = { ts: ts, reason: issueType, pid: pid };
  saveFlaggedCands();

  closeModal('modal-report-issue');
  renderHiredTab();
  showToast('Issue reported and saved.', urgency === 'Urgent' ? 'red' : 'orange');

  const hireDateVal = hireData.hireDate || '';
  const daysSinceHire = hireDateVal ? Math.round((new Date() - new Date(hireDateVal)) / 86400000) : 999;
  const withinGuarantee = hireDateVal && daysSinceHire < 30;
  const triggersReopen = urgency === 'Urgent' || issueType.includes('Replacement');
  if (withinGuarantee && triggersReopen && joId) {
    joStatusOverrides[joId] = 'Active';
    saveJOStatusOverrides();
    localStorage.removeItem('jo_delayed_close_' + joId);
    fbSync('jo_delayed_close/' + joId, null);
    var _rJo = jobOrders.find(function(j) { return j.id === joId; });
    if (_rJo) _rJo.status = 'Active';
    renderJobOrders([...placements, ...manualPlacements]);
    showToast('Job order ' + joId + ' reopened automatically — within 30-day guarantee', 'green');
  }

  const replacementTypes = ['Candidate Abandonment / No-Show', 'Replacement Requested'];
  if (replacementTypes.includes(issueType)) {
    const _repCtx = { candId: candId, candName: document.getElementById('ri-cand-name').textContent, issueType: issueType, ts: new Date().toISOString() };
    localStorage.setItem('pending_replacement_jo_' + joId, JSON.stringify(_repCtx));
    fbSync('pending_replacement/' + joId, _repCtx);
    setTimeout(function() {
      if (confirm('Do you want to open AI Matcher now to find a replacement?')) {
        openMatcherForJO(joId);
      }
    }, 350);
  }
}

// ═══════════════════════════════════════════════
// CANDIDATE PROFILE NOTES (with timestamps)
// ═══════════════════════════════════════════════
function getCandNotes(candId) {
  try { return JSON.parse(localStorage.getItem(`cand_notes_${candId}`) || '[]'); } catch(e) { return []; }
}

function saveCandNote(candId, text) {
  if (!text.trim()) return;
  const notes = getCandNotes(candId);
  notes.unshift({ text: text.trim(), ts: new Date().toISOString() });
  const trimmed = notes.slice(0, 50);
  localStorage.setItem(`cand_notes_${candId}`, JSON.stringify(trimmed));
  fbSync('cand_notes/' + candId, trimmed);
  openCandModal(candId); // re-render modal
}

function importPendingIntakeNotes(candId, name) {
  var key = 'quick_intake_' + name.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
  var pending = localStorage.getItem(key);
  if (!pending) return;
  try {
    var data = JSON.parse(pending);
    if (data.notes) {
      var notes = getCandNotes(candId);
      var alreadyIn = notes.some(function(n) { return n.text === data.notes && n.source === 'intake'; });
      if (!alreadyIn) {
        notes.unshift({ text: data.notes, ts: data.ts || new Date().toISOString(), source: 'intake' });
        localStorage.setItem('cand_notes_' + candId, JSON.stringify(notes.slice(0, 50)));
      }
    }
    // Import source if set and not already recorded
    if (data.source && data.source !== 'Unknown') {
      if (!candidateRatings[candId]) candidateRatings[candId] = {};
      if (!candidateRatings[candId].source) {
        candidateRatings[candId].source = data.source;
        saveCandidateRatings();
      }
    }
    localStorage.removeItem(key);
  } catch(e) {}
}

function deleteCandNote(candId, idx) {
  const notes = getCandNotes(candId);
  notes.splice(idx, 1);
  localStorage.setItem(`cand_notes_${candId}`, JSON.stringify(notes));
  fbSync('cand_notes/' + candId, notes);
  openCandModal(candId);
}

function buildCandNotesSection(candId) {
  const notes = getCandNotes(candId);
  const noteItems = notes.map((n, i) => `
    <div class="cand-note-item">
      <div class="cand-note-ts">${new Date(n.ts).toLocaleDateString('en-PH',{month:'short',day:'numeric',year:'numeric',hour:'2-digit',minute:'2-digit'})}</div>
      <div class="cand-note-text">${escHtml(n.text)}</div>
      <button class="cand-note-del" onclick="deleteCandNote('${escAttr(candId)}',${i})">×</button>
    </div>`).join('') || '<div style="color:var(--text3);font-size:12px;font-style:italic;padding:8px 0">No notes yet.</div>';

  return `
    <div class="cand-modal-section">
      <div class="cand-modal-section-title">Notes</div>
      <div style="display:flex;gap:8px;margin-bottom:10px">
        <input type="text" id="cand-note-input-${escAttr(candId)}" placeholder="Add a note…"
          style="flex:1;background:var(--card2);border:1px solid var(--border2);color:var(--text);padding:8px 12px;border-radius:8px;font-family:var(--sans);font-size:12px;outline:none"
          onkeydown="if(event.key==='Enter')saveCandNote('${escAttr(candId)}',this.value)">
        <button class="btn btn-accent" onclick="saveCandNote('${escAttr(candId)}',document.getElementById('cand-note-input-${escAttr(candId)}').value)">Add</button>
      </div>
      <div class="cand-notes-list">${noteItems}</div>
    </div>`;
}

// ═══════════════════════════════════════════════
// REFLECTION LOG
// ═══════════════════════════════════════════════
// Unified Contact History — merges rich calls (candidateCalls) and lightweight
// contact attempts (eraContactLogs) into one chronological timeline.
//
// Dedup: submitCallDecision writes BOTH a rich candidateCalls row AND a
// lightweight eraContactLogs 'Phone Call' entry for the same call. The dedup
// key is (date, candId): if a rich call exists on a given calendar date,
// suppress any 'Phone Call' eraContactLogs entry sharing that date. FB
// Messenger entries (walker DM logs) are never written to candidateCalls,
// so they always pass through. Legacy 'Phone call' (lowercase) entries from
// the deleted Screening tab survive too — they don't have a matching rich
// row so they're treated as standalone events.
function buildContactHistory(candId) {
  const calls = getCandidateCalls(candId);
  const richDates = new Set();
  const richRows = Object.values(calls).map(function(call) {
    if (call.date) richDates.add(call.date);
    return {
      kind: 'call',
      date: call.date || (call.createdAt ? call.createdAt.split('T')[0] : ''),
      ts: call.createdAt ? new Date(call.createdAt).getTime() : 0,
      call: call,
    };
  });

  const logs = eraContactLogs[candId] || [];
  const lightRows = logs.filter(function(e) {
    if (e.method === 'Phone Call' && richDates.has(e.date)) return false;
    return true;
  }).map(function(e) {
    return {
      kind: 'log',
      date: e.date || '',
      ts: typeof e.ts === 'number' ? e.ts : 0,
      log: e,
    };
  });

  const all = richRows.concat(lightRows).sort(function(a, b) {
    if (b.ts !== a.ts) return b.ts - a.ts;
    return (b.date || '').localeCompare(a.date || '');
  });

  if (!all.length) {
    return '<div class="cand-modal-section">' +
      '<div class="cand-modal-section-title">Contact History</div>' +
      '<div style="color:var(--text3);font-size:12px;font-style:italic;padding:8px 0">No calls or DMs logged yet.</div>' +
      '</div>';
  }

  const rows = all.map(function(row) {
    if (row.kind === 'call') {
      const call = row.call;
      const outcomeColor = call.outcome === 'Answered' ? 'var(--green)' : 'var(--gold2)';
      const decisionColor = call.decision === 'Confirmed Interested' || call.decision === 'For Employer Review' ? 'var(--green)'
        : call.decision === 'Rejected by Jobseeker' ? 'var(--red)' : 'var(--text2)';
      return '<div style="border:1px solid var(--border);border-radius:10px;padding:10px 14px;margin-bottom:8px;font-size:12px">' +
        '<div style="display:flex;gap:10px;align-items:center;margin-bottom:4px;flex-wrap:wrap">' +
          '<span style="font-size:10px;font-weight:700;background:rgba(37,99,235,.12);color:var(--accent);border:1px solid rgba(37,99,235,.35);border-radius:6px;padding:1px 6px">CALL</span>' +
          '<span style="font-weight:700;color:var(--text2)">' + escHtml(call.date || '') + (call.time ? ' ' + escHtml(call.time) : '') + '</span>' +
          '<span style="font-weight:700;color:' + outcomeColor + '">' + escHtml(call.outcome || '') + '</span>' +
          '<span style="font-weight:700;color:' + decisionColor + '">' + escHtml(call.decision || '') + '</span>' +
          '<span style="color:var(--text3);font-size:11px;margin-left:auto">ERA ' + (call.eraScore || '—') + '</span>' +
        '</div>' +
        (call.notes ? '<div style="color:var(--text2);line-height:1.5;border-top:1px solid var(--border);padding-top:6px;margin-top:4px">' + escHtml(call.notes) + '</div>' : '') +
        (call.calledBy ? '<div style="font-size:10px;color:var(--text3);margin-top:4px">Called by: ' + escHtml(call.calledBy) + '</div>' : '') +
      '</div>';
    }
    const log = row.log;
    const methodColor = log.method === 'FB Messenger' ? 'var(--purple)' : 'var(--text2)';
    return '<div style="border:1px solid var(--border);border-radius:10px;padding:8px 12px;margin-bottom:8px;font-size:12px;display:flex;gap:10px;align-items:center;flex-wrap:wrap">' +
      '<span style="font-size:10px;font-weight:700;background:rgba(100,116,139,.12);color:var(--text2);border:1px solid rgba(100,116,139,.35);border-radius:6px;padding:1px 6px">CONTACT</span>' +
      '<span style="font-weight:700;color:' + methodColor + '">' + escHtml(log.method || '') + '</span>' +
      '<span style="color:var(--text2)">' + escHtml(log.outcome || '') + '</span>' +
      '<span style="color:var(--text3);font-size:11px;margin-left:auto">' + escHtml(log.date || '') + '</span>' +
      '</div>';
  }).join('');

  return '<div class="cand-modal-section">' +
    '<div class="cand-modal-section-title">Contact History (' + all.length + ')</div>' +
    rows +
    '</div>';
}

// ═══════════════════════════════════════════════
// TAB SWITCHING
// ═══════════════════════════════════════════════
function switchTab(tab) {
  // Role gates
  if (tab === 'analytics' && !isAdmin()) { tab = 'jobs'; }
  if (tab === 'hired'     && !isAdmin()) { tab = 'jobs'; }
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(el => el.classList.remove('active'));
  var tabEl = document.getElementById('tab-' + tab);
  if (tabEl) tabEl.classList.add('active');
  const allTabs = ['jobs','candidates','hired','matcher','calls','analytics'];
  const idx = allTabs.indexOf(tab);
  document.querySelectorAll('.tab')[idx]?.classList.add('active');
  if (tab === 'hired')     renderHiredTab();
  if (tab === 'templates') renderTemplatesTab();
  if (tab === 'analytics') renderAnalyticsTab();
  if (tab === 'calls')     renderCallsTab();
}

// ═══════════════════════════════════════════════
// MODAL HELPERS
// ═══════════════════════════════════════════════
function openModal(id) {
  document.getElementById(id).classList.add('open');
}
function closeModal(id) {
  document.getElementById(id).classList.remove('open');
}

// Close modals on overlay click
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', e => {
    if (e.target === overlay) overlay.classList.remove('open');
  });
});

// ═══════════════════════════════════════════════
// REFRESH
// ═══════════════════════════════════════════════
async function refreshAll() {
  // Update API key button appearance
  const btn = document.getElementById('api-key-btn');
  if (btn) {
    const hasKey = !!localStorage.getItem('anthropic_api_key');
    btn.title = hasKey ? 'API Key is set — click to update' : 'No API Key — click to add';
    btn.style.borderColor = hasKey ? 'var(--green)' : 'var(--orange)';
    btn.style.color = hasKey ? 'var(--green)' : 'var(--orange)';
  }
  await loadAll();
}

// ═══════════════════════════════════════════════
// SHEETS POLL — surface new Google Form submissions live
// ═══════════════════════════════════════════════
const SHEETS_POLL_MS = 120 * 1000;
let _pollInFlight = false;
async function _pollSheets() {
  if (_pollInFlight || document.hidden) return;
  // Skip poll if any editable element has focus — re-render would blow away
  // an in-progress edit anywhere in the dashboard, not just prow rows.
  const ae = document.activeElement;
  if (ae && (ae.tagName === 'INPUT' || ae.tagName === 'SELECT' || ae.tagName === 'TEXTAREA')) return;
  // Skip while the Call Modal is open — a re-render mid-call would wipe
  // in-progress notes / scoring. Poll resumes once the modal closes.
  if (_isCallModalOpen()) return;
  _pollInFlight = true;
  try {
    const oldCandIds = new Set(candidates.map(c => c.id));
    const oldJoIds   = new Set(jobOrders.map(j => j.id));
    await loadAll({ skipRenderIfUnchanged: true, oldCandIds, oldJoIds });
    const addedCands = candidates.filter(c => !oldCandIds.has(c.id));
    if (addedCands.length > 0) {
      showToast(addedCands.length + ' new candidate' + (addedCands.length === 1 ? '' : 's') + ' added', 'green');
    }
    const addedJos = jobOrders.filter(j => !oldJoIds.has(j.id));
    if (addedJos.length > 0) {
      showToast(addedJos.length + ' new job order' + (addedJos.length === 1 ? '' : 's') + ' added', 'green');
    }
  } catch (e) { console.warn('[pollSheets]', e.message); }
  finally { _pollInFlight = false; }
}
setInterval(_pollSheets, SHEETS_POLL_MS);

// ═══════════════════════════════════════════════
// MESSAGE TEMPLATES
// ═══════════════════════════════════════════════
const TMPL_STORAGE_KEY = 'message_templates_v3';

const DEFAULT_TEMPLATES = [
  // ── Initial Outreach ──
  {
    id: 'init_sms_1',
    category: 'Initial Outreach',
    channel: 'SMS',
    title: 'First Contact',
    body: `Hi {name} 😊\n\nThis is Job Search PH. May available kami na {position} in Bacolod with salary na {salary} 👍\n\nStill looking ka pa for work? Reply YES po 😊`
  },
  {
    id: 'init_fb_1',
    category: 'Initial Outreach',
    channel: 'Facebook',
    title: 'First Message',
    body: `Hi {name}! 😊\n\nGood day! This is Job Search PH from Bacolod City.\n\nWe currently have an opening for {position} with salary na {salary} 👍\n\nAre you still looking for work? Let us know if interested 😊`
  },
  // ── Follow-up ──
  {
    id: 'followup_sms_1',
    category: 'Follow-up',
    channel: 'SMS',
    title: 'Follow-up #1',
    body: `Hi {name} 😊\n\nJust checking lang po 👍\n\nAvailable pa ang {position}. Interested ka pa ba? Reply YES 😊`
  },
  {
    id: 'followup_fb_1',
    category: 'Follow-up',
    channel: 'Facebook',
    title: 'Follow-up',
    body: `Hi {name}! 😊\n\nJust following up 👍\n\nStill available ang {position} and we think bagay ka for this role 😊\n\nLet us know if interested ka 👍`
  },
  {
    id: 'followup_sms_2',
    category: 'Follow-up',
    channel: 'SMS',
    title: 'Follow-up #2 (Last Push)',
    body: `Hi {name} 😊\n\nLast follow-up na lang po 👍\n\nAvailable pa ang {position}. If interested ka, please reply YES now 😊`
  },
  // ── Interview ──
  {
    id: 'intv_sms_1',
    category: 'Interview',
    channel: 'SMS',
    title: 'Interview Invite',
    body: `Hi {name}! 😊\n\nGood news 👍 You are scheduled for interview for {position}\n\n📅 {date}\n⏰ {time}\n\nPlease reply YES to confirm 😊`
  },
  {
    id: 'intv_fb_1',
    category: 'Interview',
    channel: 'Facebook',
    title: 'Interview Invite',
    body: `Hi {name}! 😊\n\nYou are invited for an interview for {position} 👍\n\n📅 {date}\n⏰ {time}\n\nPlease confirm if available ka 😊`
  },
  {
    id: 'intv_remind_sms',
    category: 'Interview',
    channel: 'SMS',
    title: 'Interview Reminder',
    body: `Hi {name} 😊\n\nReminder lang for your interview tomorrow 👍\n\nPlease be ready and keep your phone open 😊`
  },
  {
    id: 'intv_noshow_fb',
    category: 'Interview',
    channel: 'Facebook',
    title: 'No-Show Follow-up',
    body: `Hi {name} 😊\n\nWe noticed you weren't able to attend your interview today 👍\n\nAre you still interested? We can reschedule if okay sa imo 😊`
  },
  // ── Job Offer ──
  {
    id: 'hired_sms_1',
    category: 'Job Offer',
    channel: 'SMS',
    title: 'Congratulations — SMS',
    body: `Hi {name}! 😊\n\nCongratulations 👍 You are selected as {position}\n\nWe will update you for your start date 😊`
  },
  {
    id: 'hired_fb_1',
    category: 'Job Offer',
    channel: 'Facebook',
    title: 'Congratulations — Facebook',
    body: `Hi {name}! 😊\n\nGood news 👍 You have been selected for the {position}\n\nWe'll guide you on the next steps and requirements 😊`
  },
  // ── Documents ──
  {
    id: 'docs_sms_1',
    category: 'Documents',
    channel: 'SMS',
    title: 'Document Requirements',
    body: `Hi {name} 😊\n\nPlease prepare:\n• Barangay Clearance\n• Police Clearance\n• NBI Clearance\n• Valid ID\n• Resume (if available)\n\nBring original + photocopy 👍`
  },
  {
    id: 'docs_fb_1',
    category: 'Documents',
    channel: 'Facebook',
    title: 'Document Requirements',
    body: `Hi {name}! 😊\n\nFor your application, please prepare:\n\n✔ Barangay Clearance\n✔ Police Clearance\n✔ NBI Clearance\n✔ Valid ID\n✔ Resume (if available)\n\nLet us know if may questions 😊`
  },
  // ── General ──
  {
    id: 'gen_decline',
    category: 'General',
    channel: 'Facebook',
    title: 'Decline Message',
    body: `Hi {name} 😊\n\nThank you for your interest 👍\n\nThe position has already been filled, but we'll contact you once may available na bagay sa imo 😊`
  },
  {
    id: 'gen_intro',
    category: 'General',
    channel: 'Facebook',
    title: 'Agency Intro',
    body: `Hi {name}! 😊\n\nThis is Job Search PH 👍\n\nWe help match jobseekers with employers here in Bacolod (Yaya, Kasambahay, Helpers)\n\n✔ Libre apply\n✔ No placement fee\n✔ Fast matching\n\nInterested ka? Message lang 😊`
  },
];

function getTemplates() {
  try {
    const saved = JSON.parse(localStorage.getItem(TMPL_STORAGE_KEY) || 'null');
    return saved || DEFAULT_TEMPLATES;
  } catch(e) { return DEFAULT_TEMPLATES; }
}

function saveTemplates(tmpls) {
  localStorage.setItem(TMPL_STORAGE_KEY, JSON.stringify(tmpls));
  fbSync('templates', tmpls);
}

function fillTemplateVars(body, vars) {
  if (!vars) return body;
  return body
    .replace(/\{name\}/g,     vars.name     || '{name}')
    .replace(/\{position\}/g, vars.position || '{position}')
    .replace(/\{company\}/g,  vars.company  || '{company}')
    .replace(/\{salary\}/g,   vars.salary   || '{salary}')
    .replace(/\{date\}/g,     vars.date     || '{date}')
    .replace(/\{time\}/g,     vars.time     || '{time}');
}

function highlightVars(text) {
  return escHtml(text).replace(
    /\{(name|position|company|salary|date|time)\}/g,
    '<span class="tmpl-var">{$1}</span>'
  );
}

function copyTemplateText(text, btnEl) {
  navigator.clipboard.writeText(text).then(() => {
    if (btnEl) {
      btnEl.textContent = 'Copied!';
      btnEl.classList.add('copied');
      setTimeout(() => { btnEl.textContent = 'Copy'; btnEl.classList.remove('copied'); }, 2000);
    }
    showToast('Message copied to clipboard!', 'green');
  }).catch(() => {
    // Fallback for older browsers
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
    if (btnEl) {
      btnEl.textContent = 'Copied!';
      btnEl.classList.add('copied');
      setTimeout(() => { btnEl.textContent = 'Copy'; btnEl.classList.remove('copied'); }, 2000);
    }
    showToast('Message copied!', 'green');
  });
}

// ── Render full Templates tab ──
let _tmplActiveCat = 'All';
let _tmplActiveCh = '';

function renderTemplatesTab() {
  const container = document.getElementById('templates-container');
  if (!container) return;
  const tmpls = getTemplates();
  const cats = ['All', ...new Set(tmpls.map(t => t.category))];
  document.getElementById('tmpl-count').textContent = tmpls.length;

  const filtered = tmpls.filter(t => {
    if (_tmplActiveCat !== 'All' && t.category !== _tmplActiveCat) return false;
    if (_tmplActiveCh && t.channel !== _tmplActiveCh) return false;
    return true;
  });

  const catPills = cats.map(cat =>
    `<button class="tmpl-cat-pill${cat === _tmplActiveCat ? ' tmpl-active' : ''}" onclick="_tmplActiveCat='${escAttr(cat)}';renderTemplatesTab()">${escHtml(cat)}</button>`
  ).join('');

  const channels = ['All Channels','SMS','Facebook','General'];
  const chSelect = `<select class="tmpl-channel-filter" onchange="_tmplActiveCh=this.value==='All Channels'?'':this.value;renderTemplatesTab()">
    ${channels.map(ch => `<option${(_tmplActiveCh === ch || (!_tmplActiveCh && ch === 'All Channels')) ? ' selected' : ''}>${ch}</option>`).join('')}
  </select>`;

  const chClass = ch => ({ 'SMS':'ch-sms','Facebook':'ch-fb' }[ch] || 'ch-general');

  const cards = filtered.map((t, i) => `
    <div class="tmpl-card">
      <div class="tmpl-cat-label">${escHtml(t.category)}</div>
      <div class="tmpl-card-top">
        <span class="tmpl-channel-badge ${chClass(t.channel)}">${escHtml(t.channel)}</span>
        <span class="tmpl-title">${escHtml(t.title)}</span>
      </div>
      <div class="tmpl-body-preview">${highlightVars(t.body)}</div>
      <div class="tmpl-card-footer">
        <button class="tmpl-copy-btn" id="tmpl-copy-tab-${escAttr(t.id)}" onclick="copyTemplateText(${JSON.stringify(t.body)},this)">Copy</button>
      </div>
    </div>`).join('');

  container.innerHTML = `
    <div class="tmpl-filter-bar">
      ${catPills}
      ${chSelect}
    </div>
    ${filtered.length
      ? `<div class="tmpl-grid">${cards}</div>`
      : `<div class="empty-state"><div class="empty-icon">—</div>No templates in this category.</div>`}
  `;
}

// ── Template Picker (from candidate modal) ──
let _tmplPickerVars = null;
let _tmplPickerCat = 'All';

function openTmplPickerForCand(candId, candName) {
  const c = candidates.find(x => x.id === candId);
  // Try to find the most recent active placement for this candidate
  const allP = [...placements, ...manualPlacements].filter(p => p.candidateId === candId);
  let position = '', company = '', salary = '';
  if (allP.length) {
    const latest = allP[allP.length - 1];
    position = latest.position || '';
    company  = latest.company  || '';
    const jo = jobOrders.find(j => j.id === latest.jobOrderId);
    if (jo) {
      position = position || jo.position || '';
      company  = company  || jo.company  || '';
      salary   = jo.salary || '';
    }
  }
  _tmplPickerVars = { name: candName, position, company, salary, date: '{date}', time: '{time}' };
  _tmplPickerCat = 'All';
  _renderTmplPicker();
  document.getElementById('tmpl-picker-overlay').classList.add('open');
}

function closeTmplPicker() {
  document.getElementById('tmpl-picker-overlay').classList.remove('open');
  _tmplPickerVars = null;
}

function _renderTmplPicker() {
  const tmpls = getTemplates();
  const cats = ['All', ...new Set(tmpls.map(t => t.category))];

  // Context bar
  const ctxEl = document.getElementById('tmpl-picker-context');
  if (_tmplPickerVars && ctxEl) {
    const parts = [_tmplPickerVars.name, _tmplPickerVars.position, _tmplPickerVars.company].filter(Boolean);
    ctxEl.textContent = 'For: ' + parts.join(' — ');
    ctxEl.classList.add('visible');
  }

  // Category pills
  const catBar = document.getElementById('tmpl-picker-cat-bar');
  if (catBar) {
    catBar.innerHTML = cats.map(cat =>
      `<button class="tmpl-cat-pill${cat === _tmplPickerCat ? ' tmpl-active' : ''}" onclick="_tmplPickerCat='${escAttr(cat)}';_renderTmplPicker()">${escHtml(cat)}</button>`
    ).join('');
  }

  const filtered = tmpls.filter(t => _tmplPickerCat === 'All' || t.category === _tmplPickerCat);
  const chClass = ch => ({ 'SMS':'ch-sms','Facebook':'ch-fb' }[ch] || 'ch-general');

  const body = document.getElementById('tmpl-picker-body');
  if (!body) return;
  body.innerHTML = filtered.map(t => {
    const filled = _tmplPickerVars ? fillTemplateVars(t.body, _tmplPickerVars) : t.body;
    return `
      <div class="tmpl-card" style="margin-bottom:12px">
        <div class="tmpl-cat-label">${escHtml(t.category)}</div>
        <div class="tmpl-card-top">
          <span class="tmpl-channel-badge ${chClass(t.channel)}">${escHtml(t.channel)}</span>
          <span class="tmpl-title">${escHtml(t.title)}</span>
        </div>
        <div class="tmpl-body-preview">${_tmplPickerVars ? escHtml(filled) : highlightVars(t.body)}</div>
        <div class="tmpl-card-footer">
          <button class="tmpl-copy-btn" onclick="copyTemplateText(${JSON.stringify(filled)},this)">Copy</button>
        </div>
      </div>`;
  }).join('') || '<div class="empty-state" style="padding:20px 0"><div class="empty-icon">—</div>No templates here.</div>';
}

// ═══════════════════════════════════════════════
// UTILITIES
// ═══════════════════════════════════════════════
function escHtml(str) {
  return String(str || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function escAttr(str) {
  return String(str || '').replace(/'/g,'&#39;').replace(/"/g,'&quot;');
}

// ═══════════════════════════════════════════════
// FIREBASE CLOUD SYNC
// ═══════════════════════════════════════════════

function getFirebaseUrl(path) {
  const dbUrl = localStorage.getItem('firebase_db_url');
  if (!dbUrl) return null;
  const token = window._fbAuthToken || localStorage.getItem('firebase_secret');
  const auth = token ? '?auth=' + encodeURIComponent(token) : '';
  const base = dbUrl.replace(/\/$/, '');
  return base + '/jobsearchph' + (path ? '/' + path : '') + '.json' + auth;
}

function setSyncStatus(status) {
  const dot = document.getElementById('sync-dot');
  const lbl = document.getElementById('sync-label');
  if (!dot) return;
  dot.className = 'sync-dot ' + status;
  if (status === 'synced')       lbl.textContent = 'Synced';
  else if (status === 'syncing') lbl.textContent = 'Syncing';
  else if (status === 'stale')   lbl.textContent = 'Stale?';
  else if (status === 'error')   lbl.textContent = 'Sync Error';
  else                            lbl.textContent = 'Sync';
}

// Honest sync-pill state. "Synced" requires the realtime listener to have
// applied a remote snapshot recently — not just send-success. Without this,
// the pill could claim Synced after a write while the listener was silently
// disconnected and other devices' changes were never received.
const _SYNC_STALE_MS = 5 * 60 * 1000; // pill goes "Stale?" after this long with no remote event
let _listenerEverFired = false;
let _lastReceiveAt = 0;
let _inFlightWrites = 0;
let _lastSyncError = null;

function _refreshSyncStatus() {
  if (_lastSyncError) { setSyncStatus('error'); return; }
  if (_inFlightWrites > 0 || Object.keys(_fbDebounceTimers).length > 0) {
    setSyncStatus('syncing'); return;
  }
  if (!_listenerEverFired) { setSyncStatus('default'); return; }
  if (Date.now() - _lastReceiveAt > _SYNC_STALE_MS) { setSyncStatus('stale'); return; }
  setSyncStatus('synced');
}

// Passive tick — re-evaluates from local clock only, no Firebase call. Keeps the
// pill from falsely claiming Synced when the listener has gone quiet.
setInterval(function() { _refreshSyncStatus(); }, 30 * 1000);

// Exposed for the module-scope onValue error callback.
window._markListenerError = function(msg) {
  _lastSyncError = msg || 'Listener error';
  _refreshSyncStatus();
};

window._fbLastWrite = 0;

// Per-tab device id so the realtime listener can recognize its own write echoes
// and skip them per-path, instead of going deaf for 3 seconds after every write.
const _deviceId = (function() {
  let id = sessionStorage.getItem('_fbDeviceId');
  if (!id) {
    id = Math.random().toString(36).slice(2, 12);
    try { sessionStorage.setItem('_fbDeviceId', id); } catch(e) {}
  }
  return id;
})();

function _stripMeta(obj) {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return obj;
  if (!('_writtenBy' in obj) && !('_writtenAt' in obj)) return obj;
  const out = {};
  for (const k in obj) {
    if (k !== '_writtenBy' && k !== '_writtenAt') out[k] = obj[k];
  }
  return out;
}

function _isFromMe(obj) {
  return !!(obj && typeof obj === 'object' && obj._writtenBy === _deviceId);
}

function _isProwBodyFocused() {
  const el = document.activeElement;
  return !!(el && el !== document.body && el.closest && el.closest('.prow-body'));
}

// True while the Call Assessment modal is open. Used to suppress background
// sync re-renders that would otherwise wipe in-progress call notes / scoring.
function _isCallModalOpen() {
  const m = document.getElementById('modal-call-assess');
  return !!(m && m.classList.contains('open'));
}

let _renderDeferred = false;
let _deferredHandlerAttached = false;
function _runDeferredRender() {
  if (!_renderDeferred) return;
  _renderDeferred = false;
  loadLocal();
  var allP = [...placements, ...manualPlacements];
  updateStats();
  renderJobOrders(allP);
  renderHiredTab();
  renderCandidates();
}
function _deferRenderUntilBlur() {
  _renderDeferred = true;
  if (_deferredHandlerAttached) return;
  _deferredHandlerAttached = true;
  const handler = function(e) {
    const next = e.relatedTarget;
    if (!next || !next.closest || !next.closest('.prow-body')) {
      document.removeEventListener('focusout', handler, true);
      _deferredHandlerAttached = false;
      _runDeferredRender();
    }
  };
  document.addEventListener('focusout', handler, true);
}

async function fbSync(path, data) {
  window._fbLastWrite = Date.now();
  if (typeof window._fbSdkSet !== 'function') {
    // SDK not loaded yet — data is safe in localStorage; skip silently.
    // The REST fallback was removed because it sent unauthenticated PUT requests.
    console.warn('[fbSync] SDK not ready, write queued locally for path:', path);
    return;
  }
  _inFlightWrites++;
  _refreshSyncStatus();
  // Tag the write so the realtime listener can recognize its own echo on this device.
  // Plain objects get the tag embedded; arrays get a sibling meta path (no schema change).
  let payload = data;
  if (data && typeof data === 'object' && !Array.isArray(data)) {
    payload = Object.assign({}, data, { _writtenBy: _deviceId, _writtenAt: Date.now() });
  } else if (Array.isArray(data)) {
    window._fbSdkSet(path + '_meta', { _writtenBy: _deviceId, _writtenAt: Date.now() });
  }
  const ok = await window._fbSdkSet(path, payload);
  _inFlightWrites = Math.max(0, _inFlightWrites - 1);
  if (!ok) {
    _lastSyncError = 'Write failed: ' + path;
    _refreshSyncStatus();
    showToast('Cloud sync failed for ' + path.split('/')[0] + ' — data saved locally only. Check your connection.', 'red');
    return;
  }
  _refreshSyncStatus();
}

const _fbDebounceTimers = {};
const _fbPendingData = {};
function fbSyncDebounced(path, data, delay) {
  delay = delay || 900;
  clearTimeout(_fbDebounceTimers[path]);
  _fbPendingData[path] = data;
  _fbDebounceTimers[path] = setTimeout(() => {
    const pending = _fbPendingData[path];
    delete _fbPendingData[path];
    delete _fbDebounceTimers[path];
    fbSync(path, pending);
  }, delay);
  _refreshSyncStatus();
}

// Flush every pending debounced write immediately. Called when the tab is about
// to be hidden or unloaded so writes inside the 900 ms window are not lost.
// Best-effort: the underlying SDK call is async, but firing it before unload
// gives the browser a chance to complete the request in-flight.
function _fbFlushPending() {
  Object.keys(_fbDebounceTimers).forEach(function(path) {
    clearTimeout(_fbDebounceTimers[path]);
    const data = _fbPendingData[path];
    delete _fbPendingData[path];
    delete _fbDebounceTimers[path];
    if (data !== undefined) fbSync(path, data);
  });
}
document.addEventListener('visibilitychange', function() {
  if (document.visibilityState === 'hidden') _fbFlushPending();
});
window.addEventListener('pagehide', _fbFlushPending);

// Called by the onValue listener whenever Firebase data changes.
// _applyFbData skips paths that this device just wrote (per-path device-id check).
// If a prow input is focused, defer the re-render until focus leaves so we don't
// blow away the user's in-progress edit; saveProwExtra's read-modify-write means
// the user's typed value will win on blur.
window._fbOnRemoteData = function(data) {
  if (!data) return;
  _applyFbData(data);
  loadLocal();
  _listenerEverFired = true;
  _lastReceiveAt = Date.now();
  _lastSyncError = null;
  if (_isProwBodyFocused()) {
    _deferRenderUntilBlur();
    _refreshSyncStatus();
    return;
  }
  // Call Modal open: data is already applied to localStorage/memory above;
  // skip the background tab re-render so the open modal's in-progress input
  // is never disturbed. Tabs refresh on the next sync/poll after it closes.
  if (_isCallModalOpen()) {
    _refreshSyncStatus();
    return;
  }
  var allP = [...placements, ...manualPlacements];
  updateStats();
  renderJobOrders(allP);
  renderHiredTab();
  renderCandidates();
  _refreshSyncStatus();
};

// Write all Firebase fields to localStorage — plain overwrite (Firebase is authoritative).
// Per-path: skip subtrees this device just wrote (echo) and strip _writtenBy/_writtenAt
// from objects before persisting so consumers never see meta fields.
function _applyFbData(data) {
  // Root-level key is an echo if either the inline tag matches us OR a sibling _meta does.
  const ownsRoot = (key) => _isFromMe(data[key]) || _isFromMe(data[key + '_meta']);
  // Per-id map entry is an echo if either the entry's inline tag matches OR its sibling _meta does.
  const ownsEntry = (mapObj, key) => _isFromMe(mapObj[key]) || _isFromMe(mapObj[key + '_meta']);
  const isMetaKey = (k) => k.endsWith('_meta');

  if (data.blacklist && !ownsRoot('blacklist'))
    localStorage.setItem('blacklist', JSON.stringify(_stripMeta(data.blacklist)));
  if (data.flagged_cands && !ownsRoot('flagged_cands'))
    localStorage.setItem('flagged_cands', JSON.stringify(_stripMeta(data.flagged_cands)));
  if (data.manual_placements && !ownsRoot('manual_placements'))
    localStorage.setItem('manual_placements', JSON.stringify(data.manual_placements));
  if (data.candidate_notes && !ownsRoot('candidate_notes'))
    localStorage.setItem('candidate_notes', JSON.stringify(_stripMeta(data.candidate_notes)));
  if (data.jo_status_overrides && !ownsRoot('jo_status_overrides'))
    localStorage.setItem('jo_status_overrides', JSON.stringify(_stripMeta(data.jo_status_overrides)));
  if (data.candidate_ratings && !ownsRoot('candidate_ratings'))
    localStorage.setItem('candidate_ratings', JSON.stringify(_stripMeta(data.candidate_ratings)));
  if (data.candidate_overrides && !ownsRoot('candidate_overrides')) {
    const _cov = _stripMeta(data.candidate_overrides);
    localStorage.setItem('candidate_overrides', JSON.stringify(_cov));
    candidateOverrides = _cov;
    // Re-apply overrides to the in-memory candidates array so remote edits
    // show on this device immediately — the candidates array is rebuilt only
    // on Sheet fetches (loadAll), not on every listener fire.
    candidates = candidates.map(_applyCandOverride);
  }
  if (data.templates && !ownsRoot('templates'))
    localStorage.setItem('templates', JSON.stringify(data.templates));
  if (data.prow_extras)
    Object.entries(data.prow_extras).forEach(function(e) {
      if (isMetaKey(e[0]) || ownsEntry(data.prow_extras, e[0])) return;
      localStorage.setItem('prow_extra_' + e[0], JSON.stringify(_stripMeta(e[1])));
    });
  if (data.hire_data)
    Object.entries(data.hire_data).forEach(function(e) {
      if (isMetaKey(e[0]) || ownsEntry(data.hire_data, e[0])) return;
      localStorage.setItem('hire_data_' + e[0], JSON.stringify(_stripMeta(e[1])));
    });
  if (data.cand_notes)
    Object.entries(data.cand_notes).forEach(function(e) {
      if (isMetaKey(e[0]) || ownsEntry(data.cand_notes, e[0])) return;
      localStorage.setItem('cand_notes_' + e[0], JSON.stringify(e[1]));
    });
  if (data.jo_fulfill)
    Object.entries(data.jo_fulfill).forEach(function(e) {
      if (isMetaKey(e[0]) || ownsEntry(data.jo_fulfill, e[0])) return;
      localStorage.setItem('jo_fulfill_' + e[0], JSON.stringify(_stripMeta(e[1])));
    });
  if (data.jo_delayed_close)
    Object.entries(data.jo_delayed_close).forEach(function(e) {
      if (isMetaKey(e[0]) || ownsEntry(data.jo_delayed_close, e[0])) return;
      localStorage.setItem('jo_delayed_close_' + e[0], e[1]);
    });
  if (data.reflections)
    Object.entries(data.reflections).forEach(function(e) {
      if (isMetaKey(e[0]) || ownsEntry(data.reflections, e[0])) return;
      localStorage.setItem('reflection_' + e[0], JSON.stringify(e[1]));
    });
  if (data.jobOrders)
    Object.entries(data.jobOrders).forEach(function(e) {
      if (isMetaKey(e[0])) return;
      if (e[1] && e[1].cancellation) localStorage.setItem('jo_cancellation_' + e[0], JSON.stringify(_stripMeta(e[1].cancellation)));
    });
  if (data.era_contact_logs && !ownsRoot('era_contact_logs'))
    localStorage.setItem('era_contact_logs', JSON.stringify(_stripMeta(data.era_contact_logs)));
  if (data.broadcast_log && !ownsRoot('broadcast_log'))
    localStorage.setItem('broadcast_log', JSON.stringify(data.broadcast_log));
  if (data.callQueue && !ownsRoot('callQueue')) {
    const stripped = _stripMeta(data.callQueue);
    callQueue = stripped;
    _migrateCallQueue();
    localStorage.setItem('call_queue', JSON.stringify(callQueue));
    updateCallsBadge();
  }
  if (data.pending_replacement)
    Object.entries(data.pending_replacement).forEach(function(e) {
      if (isMetaKey(e[0]) || ownsEntry(data.pending_replacement, e[0])) return;
      if (e[1]) localStorage.setItem('pending_replacement_jo_' + e[0], JSON.stringify(_stripMeta(e[1])));
      else localStorage.removeItem('pending_replacement_jo_' + e[0]);
    });
  if (data.jo_coordinators)
    Object.entries(data.jo_coordinators).forEach(function(e) {
      if (isMetaKey(e[0]) || ownsEntry(data.jo_coordinators, e[0])) return;
      localStorage.setItem('jo_coordinator_' + e[0], e[1]);
    });
  if (data.jo_events)
    Object.entries(data.jo_events).forEach(function(e) {
      if (isMetaKey(e[0]) || ownsEntry(data.jo_events, e[0])) return;
      localStorage.setItem('jo_events_' + e[0], JSON.stringify(e[1]));
    });
  if (data.interviewSessions)
    Object.entries(data.interviewSessions).forEach(function(e) {
      if (isMetaKey(e[0]) || ownsEntry(data.interviewSessions, e[0])) return;
      var sessArr = Object.values(e[1] || {});
      _lsSet('jo_interview_sessions_' + e[0], sessArr);
    });
  if (data.config && data.config.roles) {
    _mergedRoleConfig = { admins: data.config.roles.admins || ROLE_CONFIG.admins, coordinators: Object.assign({}, ROLE_CONFIG.coordinators, _coordsFromFb(data.config.roles.coordinators)) };
    if (currentUserEmail) { currentUserRole = getUserRole(currentUserEmail); applyRoleUI(); }
  }
}

function _fbMergeObj(key, fbData) {
  var local = {}; try { local = JSON.parse(localStorage.getItem(key) || '{}'); } catch(_e) {}
  localStorage.setItem(key, JSON.stringify(Object.assign({}, _stripMeta(fbData), local)));
}

async function fbPullSilent() {
  const url = getFirebaseUrl('');
  if (!url) return;
  try {
    const res = await fetch(url);
    if (!res.ok) return;
    const data = await res.json();
    if (!data) return;
    if (data.blacklist)           _fbMergeObj('blacklist',           data.blacklist);
    if (data.flagged_cands)       _fbMergeObj('flagged_cands',       data.flagged_cands);
    if (data.manual_placements) {
      var _localMp = []; try { _localMp = JSON.parse(localStorage.getItem('manual_placements') || '[]'); } catch(_e) {}
      var _fbMp = Array.isArray(data.manual_placements) ? data.manual_placements : [];
      var _localPids = new Set(_localMp.map(function(p) { return p.placementId; }));
      var _merged = _localMp.concat(_fbMp.filter(function(p) { return p.placementId && !_localPids.has(p.placementId); }));
      localStorage.setItem('manual_placements', JSON.stringify(_merged));
    }
    if (data.candidate_notes)     _fbMergeObj('candidate_notes',     data.candidate_notes);
    if (data.jo_status_overrides) _fbMergeObj('jo_status_overrides', data.jo_status_overrides);
    if (data.candidate_ratings)   _fbMergeObj('candidate_ratings',   data.candidate_ratings);
    if (data.candidate_overrides) _fbMergeObj('candidate_overrides', data.candidate_overrides);
    if (data.templates)           localStorage.setItem('templates',   JSON.stringify(data.templates));
    if (data.prow_extras)
      Object.entries(data.prow_extras).forEach(function(e) { if (!localStorage.getItem('prow_extra_' + e[0])) localStorage.setItem('prow_extra_' + e[0], JSON.stringify(e[1])); });
    if (data.hire_data)
      Object.entries(data.hire_data).forEach(function(e) { if (!localStorage.getItem('hire_data_' + e[0])) localStorage.setItem('hire_data_' + e[0], JSON.stringify(e[1])); });
    if (data.cand_notes)
      Object.entries(data.cand_notes).forEach(function(e) { localStorage.setItem('cand_notes_' + e[0], JSON.stringify(e[1])); });
    if (data.jo_fulfill)
      Object.entries(data.jo_fulfill).forEach(function(e) { localStorage.setItem('jo_fulfill_' + e[0], JSON.stringify(e[1])); });
    if (data.jo_delayed_close)
      Object.entries(data.jo_delayed_close).forEach(function(e) { localStorage.setItem('jo_delayed_close_' + e[0], e[1]); });
    if (data.reflections)
      Object.entries(data.reflections).forEach(function(e) { localStorage.setItem('reflection_' + e[0], JSON.stringify(e[1])); });
    if (data.jobOrders)
      Object.entries(data.jobOrders).forEach(function(e) {
        if (e[1] && e[1].cancellation) localStorage.setItem('jo_cancellation_' + e[0], JSON.stringify(e[1].cancellation));
      });
    if (data.era_contact_logs) _fbMergeObj('era_contact_logs', data.era_contact_logs);
    if (data.broadcast_log)    localStorage.setItem('broadcast_log', JSON.stringify(data.broadcast_log));
    if (data.jo_coordinators)
      Object.entries(data.jo_coordinators).forEach(function(e) { localStorage.setItem('jo_coordinator_' + e[0], e[1]); });
    if (data.jo_events)
      Object.entries(data.jo_events).forEach(function(e) { localStorage.setItem('jo_events_' + e[0], JSON.stringify(e[1])); });
    if (data.config && data.config.roles) {
      _mergedRoleConfig = {
        admins: data.config.roles.admins || ROLE_CONFIG.admins,
        coordinators: Object.assign({}, ROLE_CONFIG.coordinators, _coordsFromFb(data.config.roles.coordinators))
      };
    }
  } catch(e) {
    console.warn('fbPullSilent failed:', e.message);
  }
}

async function loadFromFirebase() {
  if (typeof window._fbSdkGet !== 'function') return;
  _inFlightWrites++;
  _refreshSyncStatus();
  try {
    const data = await window._fbSdkGet();
    if (!data) {
      _inFlightWrites = Math.max(0, _inFlightWrites - 1);
      _listenerEverFired = true; _lastReceiveAt = Date.now(); _lastSyncError = null;
      _refreshSyncStatus();
      return;
    }

    if (data.blacklist)           _fbMergeObj('blacklist',           data.blacklist);
    if (data.flagged_cands)       _fbMergeObj('flagged_cands',       data.flagged_cands);
    if (data.manual_placements) {
      var _localMp2 = []; try { _localMp2 = JSON.parse(localStorage.getItem('manual_placements') || '[]'); } catch(_e2) {}
      var _fbMp2 = Array.isArray(data.manual_placements) ? data.manual_placements : [];
      var _localPids2 = new Set(_localMp2.map(function(p) { return p.placementId; }));
      var _merged2 = _localMp2.concat(_fbMp2.filter(function(p) { return p.placementId && !_localPids2.has(p.placementId); }));
      localStorage.setItem('manual_placements', JSON.stringify(_merged2));
    }
    if (data.candidate_notes)     _fbMergeObj('candidate_notes',     data.candidate_notes);
    if (data.jo_status_overrides) _fbMergeObj('jo_status_overrides', data.jo_status_overrides);
    if (data.candidate_ratings)   _fbMergeObj('candidate_ratings',   data.candidate_ratings);
    if (data.candidate_overrides) _fbMergeObj('candidate_overrides', data.candidate_overrides);
    if (data.templates)           localStorage.setItem(TMPL_STORAGE_KEY, JSON.stringify(data.templates));
    if (data.prow_extras)
      Object.entries(data.prow_extras).forEach(function(e) { if (!localStorage.getItem('prow_extra_' + e[0])) localStorage.setItem('prow_extra_' + e[0], JSON.stringify(e[1])); });
    if (data.hire_data)
      Object.entries(data.hire_data).forEach(function(e) { if (!localStorage.getItem('hire_data_' + e[0])) localStorage.setItem('hire_data_' + e[0], JSON.stringify(e[1])); });
    if (data.cand_notes)
      Object.entries(data.cand_notes).forEach(function(e) { localStorage.setItem('cand_notes_' + e[0], JSON.stringify(e[1])); });
    if (data.jo_fulfill)
      Object.entries(data.jo_fulfill).forEach(function(e) { localStorage.setItem('jo_fulfill_' + e[0], JSON.stringify(e[1])); });
    if (data.jo_delayed_close)
      Object.entries(data.jo_delayed_close).forEach(function(e) { localStorage.setItem('jo_delayed_close_' + e[0], e[1]); });
    if (data.reflections)
      Object.entries(data.reflections).forEach(function(e) { localStorage.setItem('reflection_' + e[0], JSON.stringify(e[1])); });
    if (data.jobOrders)
      Object.entries(data.jobOrders).forEach(function(e) {
        if (e[1] && e[1].cancellation) localStorage.setItem('jo_cancellation_' + e[0], JSON.stringify(e[1].cancellation));
      });
    if (data.era_contact_logs) _fbMergeObj('era_contact_logs', data.era_contact_logs);
    if (data.broadcast_log)    localStorage.setItem('broadcast_log', JSON.stringify(data.broadcast_log));
    if (data.jo_coordinators)
      Object.entries(data.jo_coordinators).forEach(function(e) { localStorage.setItem('jo_coordinator_' + e[0], e[1]); });
    if (data.jo_events)
      Object.entries(data.jo_events).forEach(function(e) { localStorage.setItem('jo_events_' + e[0], JSON.stringify(e[1])); });
    if (data.config && data.config.roles) {
      _mergedRoleConfig = { admins: data.config.roles.admins || ROLE_CONFIG.admins, coordinators: Object.assign({}, ROLE_CONFIG.coordinators, _coordsFromFb(data.config.roles.coordinators)) };
      if (currentUserEmail) { currentUserRole = getUserRole(currentUserEmail); applyRoleUI(); }
    }

    loadLocal();
    const allP = [...placements, ...manualPlacements];
    updateStats();
    renderJobOrders(allP);
    renderHiredTab();
    renderCandidates();
    _inFlightWrites = Math.max(0, _inFlightWrites - 1);
    _listenerEverFired = true; _lastReceiveAt = Date.now(); _lastSyncError = null;
    _refreshSyncStatus();
  } catch(e) {
    _inFlightWrites = Math.max(0, _inFlightWrites - 1);
    _lastSyncError = 'Load failed: ' + e.message;
    _refreshSyncStatus();
    console.error('Firebase load error:', e.message);
  }
}

async function pushAllToFirebase() {
  if (typeof window._fbSdkSetRoot !== 'function') throw new Error('Firebase SDK not ready');
  const prowExtras = {}, hireData = {}, candNotesMap = {}, joFulfill = {}, joDelayedClose = {}, reflections = {}, joOrders = {}, joCoords = {}, joEvtsMap = {};
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    try {
      if (k.startsWith('prow_extra_'))           prowExtras[k.slice(11)]     = JSON.parse(localStorage.getItem(k));
      else if (k.startsWith('hire_data_'))        hireData[k.slice(10)]       = JSON.parse(localStorage.getItem(k));
      else if (k.startsWith('cand_notes_'))       candNotesMap[k.slice(11)]   = JSON.parse(localStorage.getItem(k));
      else if (k.startsWith('jo_fulfill_'))       joFulfill[k.slice(11)]      = JSON.parse(localStorage.getItem(k));
      else if (k.startsWith('jo_delayed_close_')) joDelayedClose[k.slice(17)] = localStorage.getItem(k);
      else if (k.startsWith('reflection_'))       reflections[k.slice(11)]    = JSON.parse(localStorage.getItem(k));
      else if (k.startsWith('jo_coordinator_'))   joCoords[k.slice(15)]       = localStorage.getItem(k);
      else if (k.startsWith('jo_events_') && !k.startsWith('jo_events_migrated')) {
        try { joEvtsMap[k.slice(10)] = JSON.parse(localStorage.getItem(k)); } catch(e2) {}
      }
      else if (k.startsWith('jo_cancellation_')) {
        const cx = JSON.parse(localStorage.getItem(k));
        const cxId = k.slice(16);
        joOrders[cxId] = joOrders[cxId] || {};
        joOrders[cxId].cancellation = cx;
      }
    } catch(e2) {}
  }
  const payload = {
    blacklist:           blacklist           || {},
    manual_placements:   manualPlacements    || [],
    candidate_notes:     candidateNotes      || {},
    jo_status_overrides: joStatusOverrides   || {},
    candidate_ratings:   candidateRatings    || {},
    candidate_overrides: candidateOverrides  || {},
    era_contact_logs:    eraContactLogs      || {},
    templates:           getTemplates(),
    prow_extras:         prowExtras,
    hire_data:           hireData,
    cand_notes:          candNotesMap,
    jo_fulfill:          joFulfill,
    jo_delayed_close:    joDelayedClose,
    reflections:         reflections,
    jobOrders:           joOrders,
    jo_coordinators:     joCoords,
    jo_events:           joEvtsMap,
    broadcast_log:       (function(){ try { return JSON.parse(localStorage.getItem('broadcast_log') || '[]'); } catch(e) { return []; } })(),
    config:              { roles: getRoleConfig() }
  };
  _inFlightWrites++;
  _refreshSyncStatus();
  const ok = await window._fbSdkSetRoot(payload);
  _inFlightWrites = Math.max(0, _inFlightWrites - 1);
  if (!ok) {
    _lastSyncError = 'Force push failed';
    _refreshSyncStatus();
    throw new Error('Firebase write failed');
  }
  _refreshSyncStatus();
}

function openSyncModal() {
  document.getElementById('sync-db-url').value  = localStorage.getItem('firebase_db_url')  || '';
  document.getElementById('sync-secret').value  = localStorage.getItem('firebase_secret')  || '';
  document.getElementById('sync-test-result').textContent = '';
  document.getElementById('sync-setup-modal').classList.add('open');
}

function closeSyncModal() {
  document.getElementById('sync-setup-modal').classList.remove('open');
}

function _syncSaveInputs() {
  const dbUrl  = document.getElementById('sync-db-url').value.trim();
  const secret = document.getElementById('sync-secret').value.trim();
  if (dbUrl) localStorage.setItem('firebase_db_url', dbUrl);
  if (secret) localStorage.setItem('firebase_secret', secret);
  else localStorage.removeItem('firebase_secret');
}

function _syncResult(msg, color) {
  const el = document.getElementById('sync-test-result');
  if (!el) return;
  el.style.color = color || 'var(--text2)';
  el.textContent = msg;
}

async function saveSyncConfig() {
  _syncSaveInputs();
  const dbUrl = localStorage.getItem('firebase_db_url');
  if (!dbUrl) { _syncResult('Please enter your Firebase Database URL.', 'var(--orange)'); return; }
  const url = getFirebaseUrl('');
  _syncResult('Connecting to:\n' + url.replace(/\?auth=.*/, '?auth=***'), 'var(--text3)');
  try {
    const res = await fetch(url);
    const body = await res.text();
    if (!res.ok) {
      _syncResult('HTTP Error ' + res.status + '\n' + body, 'var(--red)');
      return;
    }
    let existing = null;
    try { existing = JSON.parse(body); } catch(e) {}
    const hasCloudData = existing && typeof existing === 'object' && Object.keys(existing).length > 0;
    if (hasCloudData) {
      _syncResult('Connected — found cloud data. Downloading now…', 'var(--green)');
      await loadFromFirebase();
      _syncResult('Done! Data downloaded to this device.', 'var(--green)');
    } else {
      _syncResult('Connected — cloud is empty. Uploading local data…', 'var(--green)');
      await pushAllToFirebase();
      _syncResult('Done! Data uploaded to cloud.', 'var(--green)');
    }
  } catch(e) {
    _syncResult('Error: ' + e.message, 'var(--red)');
    console.error('Sync connect error:', e);
  }
}

async function syncForcePush() {
  _syncSaveInputs();
  if (!localStorage.getItem('firebase_db_url')) { _syncResult('Enter your Firebase URL first.', 'var(--orange)'); return; }
  _syncResult('Uploading all local data to cloud…', 'var(--text3)');
  try {
    await pushAllToFirebase();
    _syncResult('Upload complete!', 'var(--green)');
  } catch(e) {
    _syncResult('Upload failed: ' + e.message, 'var(--red)');
  }
}

async function syncForcePull() {
  _syncSaveInputs();
  if (!localStorage.getItem('firebase_db_url')) { _syncResult('Enter your Firebase URL first.', 'var(--orange)'); return; }
  _syncResult('Downloading data from cloud…', 'var(--text3)');
  try {
    await loadFromFirebase();
    _syncResult('Download complete! Data refreshed.', 'var(--green)');
  } catch(e) {
    _syncResult('Download failed: ' + e.message, 'var(--red)');
  }
}

// ═══════════════════════════════════════════════
// SCREENING TAB
// ═══════════════════════════════════════════════

let eraContactLogs = {};

// ─── CALLS STATE ───
let callQueue = {};       // { candidateId: { joId, placementId, enteredQueueAt, status, scheduledFor, callbackReason } }
let candidateCalls = {};  // { candidateId: { callId: {...} } }  — in-memory cache, Firebase is authoritative
let _callsView = 'queue'; // 'queue' | 'callbacks'
let _callsFilterJo = '';

function saveCallQueue() {
  _lsSet('call_queue', callQueue);
  fbSync('callQueue', callQueue);
}

function saveCandidateCall(candId, callId, callData) {
  if (!candidateCalls[candId]) candidateCalls[candId] = {};
  candidateCalls[candId][callId] = callData;
  localStorage.setItem('candidate_calls_' + candId, JSON.stringify(candidateCalls[candId]));
  fbSync('candidateCalls/' + candId + '/' + callId, callData);
}

function getCandidateCalls(candId) {
  if (candidateCalls[candId]) return candidateCalls[candId];
  try { return JSON.parse(localStorage.getItem('candidate_calls_' + candId) || '{}'); } catch(e) { return {}; }
}

// Call-queue keys are composite (candId|joId) so one candidate can be queued
// for several job orders at once — each entry keeps its own JO context, so a
// call always logs against the job order the coordinator is actually working,
// not whichever JO the candidate happened to be queued under first.
function _qKey(candId, joId) { return candId + '|' + (joId || ''); }

function _candHasQueueEntry(candId) {
  return Object.values(callQueue).some(function(e) { return e && e.candId === candId; });
}

// Normalize legacy entries (keyed by bare candId, no candId field) into the
// composite-key format. Idempotent — safe to run on every load / sync.
function _migrateCallQueue() {
  var changed = false;
  var out = {};
  Object.keys(callQueue).forEach(function(k) {
    var v = callQueue[k] || {};
    var candId = v.candId || k;
    if (!v.candId) { v.candId = candId; changed = true; }
    var nk = _qKey(candId, v.joId || '');
    if (nk !== k) changed = true;
    out[nk] = v;
  });
  if (changed) callQueue = out;
  return changed;
}

function addToCallQueue(candId, joId, placementId) {
  var key = _qKey(candId, joId);
  if (callQueue[key]) return; // already queued for this job order
  callQueue[key] = { candId: candId, joId: joId, placementId: placementId, enteredQueueAt: new Date().toISOString(), status: 'pending' };
  saveCallQueue();
  updateCallsBadge();
}

function removeFromCallQueue(candId, joId) {
  // With joId: drop only that candidate's entry for that one job order. Without
  // it (legacy callers): drop every queue entry for the candidate.
  if (joId !== undefined && joId !== null) {
    delete callQueue[_qKey(candId, joId)];
  } else {
    Object.keys(callQueue).forEach(function(k) {
      if ((callQueue[k] && callQueue[k].candId === candId) || k === candId) delete callQueue[k];
    });
  }
  saveCallQueue();
  updateCallsBadge();
}

// One-time-per-load recovery for candidates who reached "interested" through
// a path that bypassed the Response-dropdown trigger (Stage-dropdown change
// before the forward fix, cross-device prow_extras sync, legacy data). For
// each eligible candidate, attach the queue entry to the placement that
// actually carries the interested signal — preferring a placement currently
// at exactly 'Confirmed Interested', or with Response='Interested' and stage
// rank not past Confirmed Interested. If no qualifying placement exists, the
// candidate has moved past needing a first call and is skipped.
//
// Idempotent: removeFromCallQueue is only invoked by submitCallDecision
// branches that also stamp lastDirectContactAt, so any candidate a coordinator
// has cleared has hasBeenContacted=true on next load and the gate below
// excludes them. Running this on every load cannot resurrect a cleared
// candidate.
function _backfillCallQueue() {
  let _added = 0;
  candidates.forEach(function(c) {
    if (!c || !c.id) return;
    if (blacklist[c.id])           return;
    if (_candHasQueueEntry(c.id))  return; // already queued (any job order)
    if (isCandidateHired(c.id))    return;
    if (saidNotInterested(c.id))   return;
    if (isCandInactive(c.id))      return;
    if (hasBeenContacted(c.id))    return; // already called, no first-call needed
    if (!saidInterested(c.id))     return;

    // Pick a placement that carries the interested signal AND hasn't advanced
    // past Confirmed Interested. If the candidate is at Called/Verified or
    // beyond on every placement, there's nothing useful to call about here.
    const allP = [...placements, ...manualPlacements].filter(function(p) {
      return p.candidateId === c.id && p.placementId;
    });
    const qualifying = allP.filter(function(p) {
      const ex = getPlacementExtra(p.placementId);
      const stage = getEffectiveStage(ex, p);
      if (stage === 'Confirmed Interested') return true;
      if ((ex.response || p.response) === 'Interested') {
        return (STAGE_RANK[stage] || 0) <= STAGE_RANK['Confirmed Interested'];
      }
      return false;
    });
    if (!qualifying.length) return;

    qualifying.sort(function(a, b) { return (b.date || '').localeCompare(a.date || ''); });
    const t = qualifying[0];
    addToCallQueue(c.id, t.jobOrderId, t.placementId);
    _added++;
  });
  if (_added > 0) console.log('[backfillCallQueue] recovered ' + _added + ' orphaned interested candidate(s)');
}

function updateCallsBadge() {
  var pending = Object.values(callQueue).filter(function(e){ return e.status === 'pending'; }).length;
  var callbacks = Object.values(callQueue).filter(function(e){ return e.status === 'scheduled'; }).length;
  var total = pending + callbacks;
  var badge = document.getElementById('calls-tab-badge');
  if (badge) { badge.style.display = total > 0 ? '' : 'none'; badge.textContent = total; }
  var countEl = document.getElementById('calls-count');
  if (countEl) countEl.textContent = total;
}

function saveEraContactLogs() { _lsSet('era_contact_logs', eraContactLogs); fbSyncDebounced('era_contact_logs', eraContactLogs); }

// ═══════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════
function toggleIssuePanel(pid) {
  const panel   = document.getElementById('issue-panel-' + pid);
  const chevron = document.getElementById('issue-chevron-' + pid);
  if (!panel) return;
  const open = panel.style.display === 'none';
  panel.style.display = open ? 'block' : 'none';
  if (chevron) chevron.style.transform = open ? 'rotate(180deg)' : '';
}

function reopenJOForReplacement(joId, pid, candName, issueType) {
  if (!confirm('Reopen ' + joId + ' for replacement?\n\nThis will set the job order back to Active and flag it as needing a replacement for ' + candName + '.')) return;
  joStatusOverrides[joId] = 'Active';
  saveJOStatusOverrides();
  localStorage.removeItem('jo_delayed_close_' + joId);
  fbSync('jo_delayed_close/' + joId, null);
  const jo = jobOrders.find(j => j.id === joId);
  if (jo) jo.status = 'Active';
  localStorage.setItem('pending_replacement_jo_' + joId, JSON.stringify({
    candId: pid, candName, issueType, ts: new Date().toISOString()
  }));
  fbSync('pending_replacement/' + joId, { candName, issueType, ts: new Date().toISOString() });
  renderHiredTab();
  renderJobOrders([...placements, ...manualPlacements]);
  showToast(joId + ' reopened for replacement — check Job Orders tab', 'orange');
}

function setUrgency(val) {
  document.getElementById('ri-urgency-val').value = val;
  ['Urgent','Normal','Low'].forEach(v => {
    const btn = document.getElementById('urg-' + v.toLowerCase());
    if (!btn) return;
    const isActive = v === val;
    const colors = { Urgent: ['var(--red)','rgba(220,38,38,.08)'], Normal: ['var(--orange)','rgba(234,88,12,.08)'], Low: ['var(--text3)','rgba(100,116,139,.06)'] };
    btn.style.borderColor = isActive ? colors[v][0] : 'var(--border2)';
    btn.style.background  = isActive ? colors[v][1] : 'transparent';
    btn.style.color       = isActive ? colors[v][0] : 'var(--text2)';
    btn.style.fontWeight  = isActive ? '700' : '600';
  });
}

// ═══════════════════════════════════════════════
// ANALYTICS TAB
// ═══════════════════════════════════════════════
var _analyticsSection = 'trends';
var _trendsRange = '6m';
var _trendsMetrics = { candidates: true, jobOrders: false, placements: true, revenue: false, broadcasts: false };

function renderAnalyticsTab() {
  if (!isAdmin()) { switchTab('jobs'); return; }
  var inner = document.getElementById('analytics-inner');
  if (!inner) return;

  var navItems = [
    { key: 'trends',       label: 'Trends' },
    { key: 'removals',     label: 'Pool Removals' },
    { key: 'cancellation', label: 'Cancellations' },
    { key: 'reopen',       label: 'Reopen Patterns' },
    { key: 'pipeline',     label: 'Pipeline Drop-off' },
    { key: 'timing',       label: 'Time-to-Placement' },
    { key: 'employers',    label: 'Employers' },
    { key: 'revenue',      label: 'Revenue' },
    { key: 'commission',   label: 'Commission' },
    { key: 'team',         label: 'Manage Team' },
  ];
  var nav = '<div class="analytics-nav">' +
    navItems.map(function(n) {
      return '<button class="analytics-nav-btn' + (n.key===_analyticsSection?' active':'') + '" onclick="_analyticsSection=\'' + n.key + '\';renderAnalyticsTab()">' + n.label + '</button>';
    }).join('') + '</div>';

  var content = '';
  if (_analyticsSection === 'trends')       content = buildTrendsView();
  else if (_analyticsSection === 'removals')   content = buildRemovalsAnalysis();
  else if (_analyticsSection === 'cancellation') content = buildCancellationAnalysis();
  else if (_analyticsSection === 'reopen')   content = buildReopenAnalysis();
  else if (_analyticsSection === 'pipeline') content = buildPipelineDropoff();
  else if (_analyticsSection === 'timing')   content = buildTimingDistribution();
  else if (_analyticsSection === 'employers') content = buildEmployerTable();
  else if (_analyticsSection === 'revenue')  content = buildRevenueTable();
  else if (_analyticsSection === 'commission') content = buildCommissionTable();
  else if (_analyticsSection === 'team')     content = buildManageTeam();

  inner.innerHTML = nav + content;
}

function buildRemovalsAnalysis() {
  const REASONS = ['Found a Job','No Longer Looking','Relocated','Uncontactable','Temporarily Unavailable','Candidate Withdrew','Other'];
  const REASON_COLORS = { 'Found a Job':'#16A34A','No Longer Looking':'#2563EB','Relocated':'#EA580C','Uncontactable':'#DC2626','Temporarily Unavailable':'#D97706','Candidate Withdrew':'#7C3AED','Other':'#64748B' };

  var removed = Object.entries(candidateRatings).filter(function(e) { return e[1] && e[1].removedFromPool; });
  var total = removed.length;

  var reasonCounts = {};
  REASONS.forEach(function(r) { reasonCounts[r] = 0; });
  removed.forEach(function(e) { var r = e[1].removalReason || 'Other'; if (!reasonCounts[r]) reasonCounts[r] = 0; reasonCounts[r]++; });

  var monthMap = {};
  for (var m = 5; m >= 0; m--) {
    var d = new Date(); d.setDate(1); d.setMonth(d.getMonth() - m);
    var mk = d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0');
    monthMap[mk] = {}; REASONS.forEach(function(r) { monthMap[mk][r] = 0; });
  }
  removed.forEach(function(e) {
    var r = e[1].removalReason || 'Other';
    var mk = (e[1].removalDate || '').slice(0, 7);
    if (monthMap[mk]) monthMap[mk][r] = (monthMap[mk][r] || 0) + 1;
  });

  var maxR = Math.max(1, Math.max.apply(null, Object.values(reasonCounts)));
  var bars = REASONS.filter(function(r) { return reasonCounts[r] > 0; }).map(function(r) {
    var pct = Math.round(reasonCounts[r] / maxR * 100);
    var pcOfTotal = total ? Math.round(reasonCounts[r] / total * 100) : 0;
    return '<div class="chart-bar-row"><div class="chart-bar-label" style="min-width:220px;color:' + (REASON_COLORS[r]||'var(--text3)') + ';font-weight:600">' + escHtml(r) + '</div>' +
      '<div class="chart-bar-track"><div class="chart-bar-fill" style="width:' + pct + '%;background:' + (REASON_COLORS[r]||'var(--text3)') + '"><span>' + reasonCounts[r] + '</span></div></div>' +
      '<div class="chart-bar-count">' + pcOfTotal + '%</div></div>';
  }).join('');

  var monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var mRows = Object.entries(monthMap).sort(function(a,b){ return b[0].localeCompare(a[0]); }).map(function(e) {
    var mk = e[0], mv = e[1];
    var parts = mk.split('-'); var mLabel = monthNames[parseInt(parts[1])-1] + ' ' + parts[0];
    var mTotal = Object.values(mv).reduce(function(a,b){return a+b;},0);
    if (!mTotal) return '';
    return '<tr><td style="font-weight:600">' + mLabel + '</td>' +
      REASONS.map(function(r){ return '<td style="font-family:var(--mono);text-align:center;color:' + (mv[r]>0?(REASON_COLORS[r]||'var(--text2)'):'var(--text3)') + ';font-weight:' + (mv[r]>0?'700':'400') + '">' + (mv[r]||'—') + '</td>'; }).join('') +
      '<td style="font-family:var(--mono);font-weight:700">' + mTotal + '</td></tr>';
  }).filter(Boolean).join('');

  return '<div class="analytics-section"><div class="analytics-section-title">Pool Removals <span style="font-size:11px;font-weight:600;color:var(--text3)">' + total + ' total</span></div>' +
    (bars || '<div style="color:var(--text3);font-size:12px;padding:12px 0">No candidates removed from pool yet.</div>') +
    (mRows ? '<div class="analytics-table-wrap" style="margin-top:16px"><table class="analytics-table"><thead><tr><th>Month</th>' +
      REASONS.map(function(r){ return '<th style="text-align:center;font-size:9px">' + r.split(' ')[0] + '</th>'; }).join('') +
      '<th>Total</th></tr></thead><tbody>' + mRows + '</tbody></table></div>' : '') + '</div>';
}

function buildTrendsView() {
  // ── Build period buckets ──
  var now = new Date();
  var periods = [];
  var fmt, groupFn;
  if (_trendsRange === '4w') {
    for (var w = 3; w >= 0; w--) {
      var d = new Date(now); d.setDate(d.getDate() - w * 7);
      var wk = d.getFullYear() + '-W' + String(Math.ceil((d - new Date(d.getFullYear(),0,1))/86400000/7)+1).padStart(2,'0');
      periods.push({ key: wk, label: 'Wk ' + (4-w) });
    }
    groupFn = function(ds) {
      var d = parseDateFlex(ds); if (!d || isNaN(d)) return null;
      return d.getFullYear() + '-W' + String(Math.ceil((d - new Date(d.getFullYear(),0,1))/86400000/7)+1).padStart(2,'0');
    };
  } else if (_trendsRange === '12m') {
    for (var m = 11; m >= 0; m--) { var dt2 = new Date(now.getFullYear(), now.getMonth()-m, 1); periods.push({ key: dt2.getFullYear()+'-'+String(dt2.getMonth()+1).padStart(2,'0'), label: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][dt2.getMonth()]+' '+dt2.getFullYear().toString().slice(2) }); }
    groupFn = function(ds) { var d=parseDateFlex(ds); if(!d||isNaN(d))return null; return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0'); };
  } else { // 6m default
    for (var m2 = 5; m2 >= 0; m2--) { var dt3 = new Date(now.getFullYear(), now.getMonth()-m2, 1); periods.push({ key: dt3.getFullYear()+'-'+String(dt3.getMonth()+1).padStart(2,'0'), label: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][dt3.getMonth()] }); }
    groupFn = function(ds) { var d=parseDateFlex(ds); if(!d||isNaN(d))return null; return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0'); };
  }

  var data = { candidates:{}, jobOrders:{}, placements:{}, revenue:{}, broadcasts:{} };
  periods.forEach(function(p) { Object.keys(data).forEach(function(k) { data[k][p.key] = 0; }); });

  // Candidates registered
  candidates.forEach(function(c) { var k=groupFn((c.timestamp||'').split(' ')[0]); if(k&&data.candidates[k]!==undefined) data.candidates[k]++; });
  // Job orders created
  jobOrders.forEach(function(jo) { var k=groupFn((jo.timestamp||'').split(' ')[0]); if(k&&data.jobOrders[k]!==undefined) data.jobOrders[k]++; });
  // Placements made (by hire date)
  var allP=[...placements,...manualPlacements];
  allP.forEach(function(p) {
    var pid=p.placementId||p.candidateId;
    var hd={}; try{hd=JSON.parse(localStorage.getItem('hire_data_'+pid)||'{}');}catch(e){}
    var ex={}; try{ex=JSON.parse(localStorage.getItem('prow_extra_'+pid)||'{}');}catch(e){}
    if((ex.status||p.status||'').toLowerCase()!=='hired') return;
    var k=groupFn(hd.hireDate||(ex.lastContacted||'')); if(k&&data.placements[k]!==undefined) data.placements[k]++;
    var fee=parseFloat(((hd.feePaidAmount||hd.feeAmount)||'').replace(/[^0-9.]/g,''))||0;
    if(hd.feeStatus==='Paid'&&k&&data.revenue[k]!==undefined) data.revenue[k]+=fee;
  });
  // Broadcasts
  var log=[]; try{log=JSON.parse(localStorage.getItem('broadcast_log')||'[]');}catch(e){}
  log.forEach(function(e) { var k=groupFn((e.ts||'').split('T')[0]); if(k&&data.broadcasts[k]!==undefined) data.broadcasts[k]+=(e.count||0); });

  // ── SVG chart ──
  var metricDefs = [
    { key:'candidates', label:'New Candidates', color:'#2563EB' },
    { key:'jobOrders',  label:'Job Orders',     color:'#EA580C' },
    { key:'placements', label:'Placements',     color:'#16A34A' },
    { key:'revenue',    label:'Revenue (₱)',     color:'#7C3AED' },
    { key:'broadcasts', label:'Broadcasts Sent', color:'#D97706' },
  ];
  var activeMetrics = metricDefs.filter(function(m) { return _trendsMetrics[m.key]; });

  var svgW = 560, svgH = 180, padL = 40, padB = 24, padR = 10, padT = 10;
  var chartW = svgW - padL - padR, chartH = svgH - padB - padT;
  var n = periods.length;
  var allVals = []; activeMetrics.forEach(function(m) { periods.forEach(function(p) { allVals.push(data[m.key][p.key]||0); }); });
  var maxVal = Math.max(1, Math.max.apply(null, allVals));

  function xPos(i) { return padL + (i / Math.max(1, n-1)) * chartW; }
  function yPos(v) { return padT + chartH - (v / maxVal) * chartH; }

  var svgContent = '';
  // Grid lines
  for (var gi = 0; gi <= 4; gi++) {
    var gy = padT + (gi/4)*chartH;
    var gv = Math.round(maxVal*(1-gi/4));
    svgContent += '<line x1="' + padL + '" y1="' + gy + '" x2="' + (svgW-padR) + '" y2="' + gy + '" stroke="var(--border)" stroke-width="1"/>';
    svgContent += '<text x="' + (padL-4) + '" y="' + (gy+4) + '" text-anchor="end" font-size="8" fill="var(--text3)">' + (gv>=1000?(gv/1000).toFixed(1)+'k':gv) + '</text>';
  }
  // X axis labels
  periods.forEach(function(p, i) { svgContent += '<text x="' + xPos(i) + '" y="' + (svgH-4) + '" text-anchor="middle" font-size="9" fill="var(--text3)">' + escHtml(p.label) + '</text>'; });
  // Lines
  activeMetrics.forEach(function(m) {
    var pts = periods.map(function(p, i) { return xPos(i) + ',' + yPos(data[m.key][p.key]||0); }).join(' ');
    svgContent += '<polyline points="' + pts + '" fill="none" stroke="' + m.color + '" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>';
    periods.forEach(function(p, i) { var v=data[m.key][p.key]||0; svgContent += '<circle cx="' + xPos(i) + '" cy="' + yPos(v) + '" r="3.5" fill="' + m.color + '"/>'; });
  });

  var svg = '<svg width="100%" viewBox="0 0 ' + svgW + ' ' + svgH + '" style="overflow:visible">' + svgContent + '</svg>';

  // ── Legend ──
  var legend = '<div style="display:flex;flex-wrap:wrap;gap:12px;margin-top:8px">' +
    metricDefs.map(function(m) {
      var on = _trendsMetrics[m.key];
      return '<button onclick="_trendsMetrics[\'' + m.key + '\']=!' + (on?'true':'false') + ';renderAnalyticsTab()" style="display:flex;align-items:center;gap:5px;padding:3px 10px;border-radius:99px;border:1.5px solid ' + (on?m.color:'var(--border2)') + ';background:' + (on?m.color+'18':'transparent') + ';cursor:pointer;font-family:var(--sans);font-size:11px;font-weight:600;color:' + (on?m.color:'var(--text3)') + '">' +
        '<span style="width:8px;height:8px;border-radius:50%;background:' + m.color + ';display:inline-block"></span>' + escHtml(m.label) + '</button>';
    }).join('') + '</div>';

  // ── Range selector ──
  var ranges = [['4w','Last 4 Weeks'],['6m','Last 6 Months'],['12m','Last 12 Months']];
  var rangeSel = '<div style="display:flex;gap:6px;margin-bottom:16px">' +
    ranges.map(function(r) {
      var act = _trendsRange === r[0];
      return '<button onclick="_trendsRange=\'' + r[0] + '\';renderAnalyticsTab()" style="padding:4px 12px;border-radius:8px;border:1.5px solid ' + (act?'var(--accent)':'var(--border2)') + ';background:' + (act?'var(--accent-dim2)':'transparent') + ';color:' + (act?'var(--accent)':'var(--text2)') + ';font-size:12px;font-weight:600;cursor:pointer;font-family:var(--sans)">' + r[1] + '</button>';
    }).join('') + '</div>';

  // ── Summary table: current vs previous period ──
  var cur = periods[periods.length-1].key;
  var prev = periods.length >= 2 ? periods[periods.length-2].key : null;
  var tableRows = metricDefs.map(function(m) {
    var cv = data[m.key][cur]||0, pv = prev ? (data[m.key][prev]||0) : null;
    var chg = (pv !== null && pv > 0) ? Math.round((cv-pv)/pv*100) : null;
    var chgHtml = chg === null ? '<span style="color:var(--text3)">—</span>' :
      '<span style="font-weight:700;color:' + (chg>=0?'var(--green)':'var(--red)') + '">' + (chg>=0?'+':'') + chg + '%</span>';
    return '<tr><td style="font-weight:600">' + escHtml(m.label) + '</td>' +
      '<td style="font-family:var(--mono);text-align:right">' + (m.key==='revenue'?'₱'+cv.toLocaleString('en-PH'):cv) + '</td>' +
      '<td style="font-family:var(--mono);text-align:right;color:var(--text3)">' + (prev?(m.key==='revenue'?'₱'+pv.toLocaleString('en-PH'):pv):'—') + '</td>' +
      '<td style="text-align:right">' + chgHtml + '</td></tr>';
  }).join('');
  var table = '<div class="analytics-table-wrap" style="margin-top:16px"><table class="analytics-table"><thead><tr><th>Metric</th><th style="text-align:right">Current</th><th style="text-align:right">Previous</th><th style="text-align:right">Change</th></tr></thead><tbody>' + tableRows + '</tbody></table></div>';

  return '<div class="analytics-section">' +
    '<div class="analytics-section-title">Trends</div>' +
    rangeSel + legend +
    '<div style="margin-top:16px;background:var(--card2);border:1px solid var(--border);border-radius:12px;padding:16px">' + svg + '</div>' +
    table + '</div>';
}

// ═══════════════════════════════════════════════
// CALLS TAB
// ═══════════════════════════════════════════════

function setCallsView(view) {
  _callsView = view;
  var qBtn = document.getElementById('calls-view-btn-queue');
  var cBtn = document.getElementById('calls-view-btn-callbacks');
  var nBtn = document.getElementById('calls-view-btn-needs-call');
  if (qBtn) { qBtn.className = view === 'queue' ? 'btn btn-gold' : 'btn btn-ghost'; qBtn.style.fontSize = '12px'; qBtn.style.padding = '5px 14px'; }
  if (cBtn) { cBtn.className = view === 'callbacks' ? 'btn btn-gold' : 'btn btn-ghost'; cBtn.style.fontSize = '12px'; cBtn.style.padding = '5px 14px'; }
  if (nBtn) { nBtn.className = view === 'needs-call' ? 'btn btn-gold' : 'btn btn-ghost'; nBtn.style.fontSize = '12px'; nBtn.style.padding = '5px 14px'; }
  renderCallsTab();
}

function renderCallsTab() {
  const inner = document.getElementById('calls-inner');
  if (!inner) return;
  updateCallsBadge();
  updateNeedsCallCount();
  if (_callsView === 'queue') inner.innerHTML = buildCallQueueHTML();
  else if (_callsView === 'needs-call') inner.innerHTML = buildNeedsCallHTML();
  else inner.innerHTML = buildCallbacksHTML();
}

function _getNeedsCallCandidates() {
  // Per-render extras cache — same pattern as renderCandidates. Parse every
  // placement's prow_extra ONCE, then thread the Map through the five helpers
  // that would otherwise re-read+re-parse localStorage per candidate.
  // broadcastCount reads only manualPlacements (no extras) so it doesn't
  // need the cache.
  const extrasCache = new Map();
  const _allP = [...placements, ...manualPlacements];
  for (let _i = 0; _i < _allP.length; _i++) {
    const _p = _allP[_i];
    const _pid = _p.placementId || _p.candidateId;
    if (extrasCache.has(_pid)) continue;
    let _ex = {};
    try { _ex = JSON.parse(localStorage.getItem('prow_extra_' + _pid) || '{}'); } catch(_e) {}
    extrasCache.set(_pid, _ex);
  }
  return candidates.filter(function(c) {
    if (blacklist[c.id]) return false;
    if (isCandidateHired(c.id, extrasCache)) return false;
    if (saidNotInterested(c.id, extrasCache)) return false;
    if (isCandInactive(c.id, extrasCache)) return false;
    if (saidInterested(c.id, extrasCache)) return false;
    if (hasBeenContacted(c.id, extrasCache)) return false;
    return broadcastCount(c.id) >= 1;
  });
}

function updateNeedsCallCount() {
  var el = document.getElementById('calls-needs-count');
  if (!el) return;
  var n = _getNeedsCallCandidates().length;
  el.textContent = n;
  el.style.display = n > 0 ? '' : 'none';
}

function buildCallQueueHTML() {
  // Gather queue entries with candidate + JO data
  const entries = Object.entries(callQueue)
    .filter(function(e) { return e[1].status === 'pending'; })
    .map(function(e) {
      const q = e[1], candId = q.candId || e[0];
      const c = candidates.find(function(x) { return x.id === candId; });
      const jo = jobOrders.find(function(j) { return j.id === q.joId; });
      const hoursWaiting = Math.round((Date.now() - new Date(q.enteredQueueAt).getTime()) / 3600000);
      return { candId, q, c, jo, hoursWaiting };
    })
    .filter(function(e) { return e.c; }) // only those still in candidates list
    .sort(function(a, b) { return new Date(a.q.enteredQueueAt) - new Date(b.q.enteredQueueAt); }); // oldest first

  const joIds = [...new Set(entries.map(function(e) { return e.q.joId; }))];
  const joFilter = '<div style="display:flex;gap:8px;align-items:center;margin-bottom:16px;flex-wrap:wrap">' +
    '<span style="font-size:12px;font-weight:700;color:var(--text3)">Filter by JO:</span>' +
    '<button class="era-tier-btn' + (_callsFilterJo === '' ? ' sel' : '') + '" style="' + (_callsFilterJo === '' ? 'background:rgba(23,85,237,.10);border-color:rgba(23,85,237,.45);color:var(--accent);border-width:1.5px' : '') + '" onclick="_callsFilterJo=\'\';renderCallsTab()">All</button>' +
    joIds.map(function(id) {
      const jo = jobOrders.find(function(j) { return j.id === id; });
      const sel = _callsFilterJo === id;
      return '<button class="era-tier-btn' + (sel ? ' sel' : '') + '" style="' + (sel ? 'background:rgba(23,85,237,.10);border-color:rgba(23,85,237,.45);color:var(--accent);border-width:1.5px' : '') + '" onclick="_callsFilterJo=\'' + escAttr(id) + '\';renderCallsTab()">' + escHtml(id) + (jo ? ' — ' + escHtml(jo.company) : '') + '</button>';
    }).join('') + '</div>';

  const filtered = _callsFilterJo ? entries.filter(function(e) { return e.q.joId === _callsFilterJo; }) : entries;

  if (!filtered.length) {
    return joFilter + '<div style="padding:40px;text-align:center;color:var(--text3);font-family:var(--mono);font-size:13px">No candidates in the call queue.<br><small style="font-size:11px;margin-top:8px;display:block">Candidates enter the queue when their Response is set to "Interested".</small></div>';
  }

  const rows = filtered.map(function(e) {
    const { candId, q, c, jo, hoursWaiting } = e;
    const overdue = hoursWaiting >= 48;
    const eraScore = calcCandRating(candId);
    const eraColor = eraScore >= 7 ? 'var(--green)' : eraScore >= 5 ? 'var(--gold)' : 'var(--red)';
    const waitLabel = hoursWaiting < 1 ? 'Just now' : hoursWaiting < 24 ? hoursWaiting + 'h ago' : Math.floor(hoursWaiting/24) + 'd ago';
    // HOT badge: came from a broadcast and still has no direct contact stamp.
    const hotBadge = (broadcastCount(candId) >= 1 && !hasBeenContacted(candId))
      ? ' <span style="display:inline-block;font-size:9px;font-weight:800;background:rgba(220,38,38,.12);color:var(--red);border:1px solid rgba(220,38,38,.4);border-radius:6px;padding:1px 6px;margin-left:4px;text-transform:uppercase;letter-spacing:.4px">broadcast · never called</span>'
      : '';
    return '<div class="call-queue-row' + (overdue ? ' overdue' : '') + '">' +
      '<div>' +
        '<div style="font-size:14px;font-weight:700">' + escHtml(c.name) + hotBadge + '</div>' +
        '<div style="font-size:11px;color:var(--text3);font-family:var(--mono);margin-top:2px">' + escHtml(candId) + ' · ' + escHtml(c.jobTypeFormatted || c.jobType || '—') + '</div>' +
        '<div style="font-size:11px;color:var(--text2);margin-top:2px">' + (jo ? escHtml(jo.id) + ' — ' + escHtml(jo.position) + ' @ ' + escHtml(jo.company) : escHtml(q.joId)) + '</div>' +
        (c.phone ? '<div style="font-size:11px;color:var(--accent);margin-top:2px;font-family:var(--mono)">' + escHtml(c.phone) + '</div>' : '') +
      '</div>' +
      '<div style="text-align:center">' +
        '<span style="font-size:14px;font-weight:800;color:' + eraColor + '">' + eraScore + '</span>' +
        '<div style="font-size:9px;color:var(--text3)">ERA</div>' +
      '</div>' +
      '<div style="text-align:center">' +
        '<span style="font-size:12px;font-weight:700;color:' + (overdue ? 'var(--red)' : 'var(--text2)') + '">' + escHtml(waitLabel) + '</span>' +
        (overdue ? '<div style="font-size:9px;font-weight:700;color:var(--red);margin-top:2px">OVERDUE</div>' : '') +
      '</div>' +
      '<div>' +
        (c.phone ? '<button class="btn btn-ghost" style="font-size:11px;padding:4px 10px;width:100%;margin-bottom:4px" onclick="navigator.clipboard.writeText(\'' + escAttr(c.phone) + '\').then(function(){showToast(\'Number copied!\',\'green\')})">Copy #</button>' : '') +
      '</div>' +
      '<div>' +
        '<button class="btn btn-gold" style="font-size:12px;padding:6px 16px;white-space:nowrap" onclick="openCallAssessment(\'' + escAttr(candId) + '\',\'' + escAttr(q.joId) + '\',\'' + escAttr(q.placementId||'') + '\')">Start Call</button>' +
      '</div>' +
    '</div>';
  }).join('');

  return joFilter +
    '<div style="font-size:12px;color:var(--text3);margin-bottom:12px">' + filtered.length + ' candidate' + (filtered.length !== 1 ? 's' : '') + ' waiting for a call</div>' +
    rows;
}

function buildCallbacksHTML() {
  const entries = Object.entries(callQueue)
    .filter(function(e) { return e[1].status === 'scheduled' && e[1].scheduledFor; })
    .map(function(e) {
      const q = e[1], candId = q.candId || e[0];
      const c = candidates.find(function(x) { return x.id === candId; });
      const jo = jobOrders.find(function(j) { return j.id === q.joId; });
      const scheduledMs = new Date(q.scheduledFor).getTime();
      const overdue = scheduledMs < Date.now();
      return { candId, q, c, jo, scheduledMs, overdue };
    })
    .filter(function(e) { return e.c; })
    .sort(function(a, b) { return a.scheduledMs - b.scheduledMs; });

  if (!entries.length) {
    return '<div style="padding:40px;text-align:center;color:var(--text3);font-family:var(--mono);font-size:13px">No scheduled callbacks.</div>';
  }

  const rows = entries.map(function(e) {
    const { candId, q, c, jo, overdue } = e;
    const schedLabel = new Date(q.scheduledFor).toLocaleString('en-PH', { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    return '<div class="call-queue-row' + (overdue ? ' overdue' : '') + '">' +
      '<div>' +
        '<div style="font-size:14px;font-weight:700">' + escHtml(c.name) + '</div>' +
        '<div style="font-size:11px;color:var(--text3);font-family:var(--mono);margin-top:2px">' + escHtml(candId) + '</div>' +
        '<div style="font-size:11px;color:var(--text2);margin-top:2px">' + (jo ? escHtml(jo.id) + ' — ' + escHtml(jo.company) : escHtml(q.joId)) + '</div>' +
        (q.callbackReason ? '<div style="font-size:11px;color:var(--text3);margin-top:2px">Reason: ' + escHtml(q.callbackReason) + '</div>' : '') +
      '</div>' +
      '<div style="font-size:12px;font-weight:700;color:' + (overdue ? 'var(--red)' : 'var(--accent)') + '">' +
        escHtml(schedLabel) + (overdue ? '<div style="font-size:10px;font-weight:800;color:var(--red)">OVERDUE</div>' : '') +
      '</div>' +
      '<div></div><div></div>' +
      '<div>' +
        '<button class="btn btn-gold" style="font-size:12px;padding:6px 16px;white-space:nowrap" onclick="openCallAssessment(\'' + escAttr(candId) + '\',\'' + escAttr(q.joId) + '\',\'' + escAttr(q.placementId||'') + '\')">Call Now</button>' +
      '</div>' +
    '</div>';
  }).join('');

  return '<div style="font-size:12px;color:var(--text3);margin-bottom:12px">' + entries.length + ' scheduled callback' + (entries.length !== 1 ? 's' : '') + '</div>' + rows;
}

// WARM list: broadcast-to candidates who never said yes and were never directly
// contacted. Logging a call via openCallAssessment stamps lastDirectContactAt
// and drops the candidate off this list automatically.
function buildNeedsCallHTML() {
  const cands = _getNeedsCallCandidates();
  // Decorate with broadcast metadata for sort + display.
  const decorated = cands.map(function(c) {
    const broadcasts = manualPlacements
      .filter(function(p) { return p.candidateId === c.id && p.source === 'broadcast'; })
      .slice()
      .sort(function(a, b) { return (b.date || '').localeCompare(a.date || ''); });
    const bcCount = broadcasts.length;
    const latestDate = broadcasts.length ? (broadcasts[0].date || '') : '';
    const joIds = [...new Set(broadcasts.map(function(b) { return b.jobOrderId; }))];
    return { c, bcCount, latestDate, joIds };
  });
  decorated.sort(function(a, b) {
    if (b.bcCount !== a.bcCount) return b.bcCount - a.bcCount;
    return (b.latestDate || '').localeCompare(a.latestDate || '');
  });

  if (!decorated.length) {
    return '<div style="padding:40px;text-align:center;color:var(--text3);font-family:var(--mono);font-size:13px">No one waiting for a first call — everyone broadcast has been contacted or responded.</div>';
  }

  const rows = decorated.map(function(d) {
    const c = d.c;
    const target = pickCallTarget(c.id);
    // One Call button per distinct job order the candidate was broadcast to, so
    // the coordinator picks the JO explicitly instead of pickCallTarget guessing
    // a single one and logging the call against the wrong job order.
    const joTargets = d.joIds.map(function(id) {
      const bp = manualPlacements
        .filter(function(p) { return p.candidateId === c.id && p.jobOrderId === id && p.source === 'broadcast' && p.placementId; })
        .sort(function(a, b) { return (b.date || '').localeCompare(a.date || ''); })[0];
      return { joId: id, placementId: bp ? bp.placementId : '' };
    }).filter(function(t) { return t.placementId; });
    let callBtns;
    if (joTargets.length > 1) {
      callBtns = joTargets.map(function(t) {
        return '<button class="btn btn-gold" style="font-size:11px;padding:5px 10px;width:100%;margin-bottom:4px;white-space:nowrap" onclick="openCallAssessment(\'' + escAttr(c.id) + '\',\'' + escAttr(t.joId) + '\',\'' + escAttr(t.placementId) + '\')">Call · ' + escHtml(t.joId) + '</button>';
      }).join('');
    } else {
      const t = joTargets[0] || target;
      callBtns = (t && t.placementId)
        ? '<button class="btn btn-gold" style="font-size:12px;padding:6px 16px;white-space:nowrap" onclick="openCallAssessment(\'' + escAttr(c.id) + '\',\'' + escAttr(t.joId) + '\',\'' + escAttr(t.placementId) + '\')">Call</button>'
        : '<button class="btn btn-ghost" style="font-size:12px;padding:6px 16px;white-space:nowrap" disabled title="No placement to log against — add to a job order first">Call</button>';
    }
    const joLabels = d.joIds.map(function(id) {
      const jo = jobOrders.find(function(j) { return j.id === id; });
      return jo ? (escHtml(id) + ' — ' + escHtml(jo.company || jo.position || '')) : escHtml(id);
    }).join(', ');
    const meta = [];
    if (c.jobTypeFormatted || c.jobType) meta.push(escHtml(c.jobTypeFormatted || c.jobType));
    if (c.location)                       meta.push(escHtml(c.location));
    if (c.expectedPay)                    meta.push('₱' + escHtml(c.expectedPay));
    const metaLine = meta.length ? '<div style="font-size:11px;color:var(--text2);margin-top:2px">' + meta.join(' · ') + '</div>' : '';
    const bcPill = '<span style="display:inline-block;font-size:10px;font-weight:700;background:rgba(100,116,139,.15);color:var(--text2);border:1px solid rgba(100,116,139,.35);border-radius:6px;padding:1px 7px;margin-left:6px">broadcast ' + d.bcCount + '×</span>';
    return '<div class="call-queue-row">' +
      '<div>' +
        '<div style="font-size:14px;font-weight:700">' + escHtml(c.name) + bcPill + '</div>' +
        '<div style="font-size:11px;color:var(--text3);font-family:var(--mono);margin-top:2px">' + escHtml(c.id) + '</div>' +
        '<div style="font-size:11px;color:var(--text2);margin-top:2px">' + joLabels + '</div>' +
        metaLine +
        (c.phone ? '<div style="font-size:11px;color:var(--accent);margin-top:2px;font-family:var(--mono)">' + escHtml(c.phone) + '</div>' : '') +
      '</div>' +
      '<div style="text-align:center">' +
        '<span style="font-size:11px;color:var(--text3)">last bc</span>' +
        '<div style="font-size:12px;font-weight:700;color:var(--text2)">' + (d.latestDate ? escHtml(fmtDateShort(d.latestDate)) : '—') + '</div>' +
      '</div>' +
      '<div></div>' +
      '<div>' +
        (c.phone ? '<button class="btn btn-ghost" style="font-size:11px;padding:4px 10px;width:100%;margin-bottom:4px" onclick="navigator.clipboard.writeText(\'' + escAttr(c.phone) + '\').then(function(){showToast(\'Number copied!\',\'green\')})">Copy #</button>' : '') +
      '</div>' +
      '<div>' + callBtns + '</div>' +
    '</div>';
  }).join('');

  return '<div style="font-size:12px;color:var(--text3);margin-bottom:12px">' + decorated.length + ' candidate' + (decorated.length !== 1 ? 's' : '') + ' broadcast to but never directly contacted</div>' + rows;
}

// ─── CALL ASSESSMENT MODAL ───

var _callAssess = { candId: null, joId: null, placementId: null, outcome: null, decision: null };

function openCallAssessment(candId, joId, placementId) {
  _callAssess = { candId, joId, placementId: placementId || '', outcome: null, decision: null };
  _renderCallAssessment();
  openModal('modal-call-assess');
}

// Fields in the Call Modal that hold unsaved, in-progress input. Captured
// before every _renderCallAssessment rebuild and restored after, so a
// re-render (attitude/outcome click, or any future trigger) never wipes
// what the coordinator is typing mid-call.
var _CALL_MODAL_FIELD_IDS = [
  'call-notes-input',
  'cov-skills', 'cov-pastjobs', 'cov-pay', 'cov-start',
  'cov-civil', 'cov-haskids', 'cov-numkids'
];
function _captureCallModalFields() {
  var snap = {};
  _CALL_MODAL_FIELD_IDS.forEach(function(id) {
    var el = document.getElementById(id);
    if (el) snap[id] = el.value;
  });
  return snap;
}
function _restoreCallModalFields(snap) {
  if (!snap) return;
  _CALL_MODAL_FIELD_IDS.forEach(function(id) {
    if (snap[id] === undefined) return;
    var el = document.getElementById(id);
    if (el) el.value = snap[id];
  });
}

function _renderCallAssessment() {
  const inner = document.getElementById('call-assess-inner');
  if (!inner) return;
  // Capture any in-progress input before the rebuild discards it (restored
  // after innerHTML is rewritten). First render captures nothing → no-op.
  const _preserve = _captureCallModalFields();
  const { candId, joId, outcome } = _callAssess;
  const c  = candidates.find(function(x) { return x.id === candId; });
  const jo = jobOrders.find(function(j) { return j.id === joId; });
  if (!c) { inner.innerHTML = '<p style="color:var(--red)">Candidate not found.</p>'; return; }

  const era = calcERA(candId);
  const eraColor = era.score >= 7 ? 'var(--green)' : era.score >= 5 ? 'var(--gold)' : 'var(--red)';
  const stored = candidateRatings[candId] || {};
  const scores = stored.scores || {};
  const docs   = stored.docs   || {};

  const outcomeOpts = [
    { val:'Answered',     label:'✅ Answered' },
    { val:'No Answer',    label:'📵 No Answer' },
    { val:'Busy',         label:'🔄 Busy' },
    { val:'Wrong Number', label:'❌ Wrong Number' },
    { val:'Unreachable',  label:'📴 Unreachable' },
  ];
  const outcomeBtns = outcomeOpts.map(function(o) {
    const active = outcome === o.val;
    const cls = active ? (o.val === 'Answered' ? 'active-answered' : 'active-noanswer') : '';
    return '<button class="call-outcome-btn ' + cls + '" onclick="setCallOutcome(\'' + o.val + '\')">' + o.label + '</button>';
  }).join('');

  let assessHTML = '';
  if (outcome === 'Answered') {
    // Build live ERA score
    const eraLive = calcERA(candId);
    const liveCls = eraLive.score >= 7 ? 'var(--green)' : eraLive.score >= 5 ? 'var(--gold)' : 'var(--red)';

    function chk(key, label, sign, pts) {
      const checked = scores[key] ? ' checked' : '';
      const signColor = sign === '+' ? 'var(--green)' : 'var(--red)';
      return '<label class="call-check-row"><input type="checkbox"' + checked + ' onchange="toggleCallScore(\'' + escAttr(candId) + '\',\'' + key + '\',this.checked)">' +
        '<span style="flex:1">' + label + '</span><span style="font-size:10px;font-weight:700;color:' + signColor + ';white-space:nowrap">' + sign + ' ' + pts + '</span></label>';
    }

    const attVal = parseInt(scores.callAttitude) || 0;
    const attBtns = [1,2,3,4,5].map(function(n) {
      const labels = {1:'Poor',2:'Below Avg',3:'Average',4:'Good',5:'Excellent'};
      const pts    = {1:'-1.5',2:'-0.5',3:'0',4:'+1.0',5:'+1.0'};
      const sel = attVal === n;
      return '<button style="flex:1;padding:6px 4px;border-radius:7px;border:1.5px solid ' + (sel ? 'var(--accent)' : 'var(--border2)') + ';background:' + (sel ? 'var(--accent-dim2)' : 'transparent') + ';color:' + (sel ? 'var(--accent)' : 'var(--text2)') + ';font-size:11px;font-weight:' + (sel ? '700' : '500') + ';cursor:pointer;font-family:var(--sans)" onclick="setCallAttitude(\'' + escAttr(candId) + '\',' + n + ')">' +
        '<div>' + n + '</div><div style="font-size:9px">' + labels[n] + '</div><div style="font-size:9px;color:var(--text3)">' + pts[n] + '</div>' +
        '</button>';
    }).join('');

    assessHTML = '<div class="call-era-live">' +
      '<div class="call-era-score" style="color:' + liveCls + '">' + eraLive.score + '</div>' +
      '<div><div style="font-size:11px;font-weight:700;color:var(--text2)">Live ERA Score</div>' +
      '<div style="font-size:10px;color:var(--text3)">Updates as you fill each section</div>' +
      '<div style="font-size:11px;margin-top:2px">E: ' + (eraLive.E>=0?'+':'') + eraLive.E.toFixed(1) + ' · R: ' + (eraLive.R>=0?'+':'') + eraLive.R.toFixed(1) + ' · A: ' + (eraLive.A>=0?'+':'') + eraLive.A.toFixed(1) + '</div>' +
      '</div></div>' +
      '<div class="call-assess-section">' +
        '<div class="call-assess-title">Responsiveness (R)</div>' +
        chk('answeredCall',   'Answered call promptly',          '+', 'R 1.0') +
        chk('repliedFast',    'Replied quickly when messaged',   '+', 'R 1.0') +
        chk('confirmedIntv',  'Confirmed availability for job',  '+', 'R 1.0') +
        chk('multiFollowup',  'Needed multiple follow-ups',      '−', 'R 1.0') +
      '</div>' +
      '<div class="call-assess-section">' +
        '<div class="call-assess-title">Eligibility — Confirmed During Call (E)</div>' +
        chk('workIntentConfirmed',   'Work intent confirmed',     '+', 'E 1.0') +
        chk('availabilityConfirmed', 'Availability confirmed',    '+', 'E 1.0') +
      '</div>' +
      '<div class="call-assess-section">' +
        '<div class="call-assess-title">Attitude (A) — Call Rating</div>' +
        '<div style="display:flex;gap:5px;margin-bottom:10px">' + attBtns + '</div>' +
        chk('polite',             'Communicates clearly',        '+', 'A 1.0') +
        chk('passedScreening',    'Consistent / reliable answers','+','A 1.0') +
        chk('willingToWork',      'Willing and enthusiastic',    '+', 'A 0.5') +
        chk('followsInstructions','Follows instructions',        '+', 'A 0.5') +
        chk('hesitantAnswers',    'Hesitant or evasive answers', '−', 'A 1.0') +
        chk('confusingAnswers',   'Confusing or inconsistent',   '−', 'A 1.0') +
      '</div>';
  }

  const showDecision = outcome === 'Answered';
  const showNonAnswerOpts = outcome && outcome !== 'Answered';

  // "Update candidate info (from call)" — editable override layer. Pre-filled
  // with current merged values (c.* already reflects any saved override). Save
  // writes to candidateOverrides[candId] via the immediate fbSync path so the
  // 120 s Sheets poll cannot overwrite it. Does NOT close the modal so the
  // ERA scoring + decision-in-progress state survives the save.
  const covCurrent = candidateOverrides[candId] || {};
  const covSkills  = covCurrent.skills      !== undefined ? covCurrent.skills      : (c.skills      || '');
  const covPast    = covCurrent.pastJobs    !== undefined ? covCurrent.pastJobs    : (c.pastJobs    || '');
  const covPay     = covCurrent.expectedPay !== undefined ? covCurrent.expectedPay : (c.expectedPay || '');
  const covStart   = covCurrent.startDate   !== undefined ? covCurrent.startDate   : (c.startDate   || '');
  const covCivil   = covCurrent.civilStatus !== undefined ? covCurrent.civilStatus : (c.civilStatus || '');
  const covHasKids = covCurrent.hasKids     !== undefined ? covCurrent.hasKids     : (c.hasKids     || '');
  const covNumKids = covCurrent.numKids     !== undefined ? covCurrent.numKids     : (c.numKids     || '');
  const editSectionHTML = showDecision ? '<div class="call-assess-section">' +
    '<div class="call-assess-title">Update candidate info (from call)</div>' +
    '<div style="font-size:11px;color:var(--text3);margin-bottom:10px">Edits are stored separately from the Google Form data and survive every 120 s sync. Only what changed needs editing.</div>' +
    '<div style="display:flex;flex-direction:column;gap:8px">' +
      '<label style="display:flex;flex-direction:column;gap:3px;font-size:11px;font-weight:700;color:var(--text2)">Skills / Qualifications' +
        '<textarea id="cov-skills" style="width:100%;min-height:50px;background:var(--card);border:1px solid var(--border2);border-radius:8px;padding:8px;font-family:var(--sans);font-size:12px;color:var(--text);resize:vertical;outline:none">' + escHtml(covSkills) + '</textarea>' +
      '</label>' +
      '<label style="display:flex;flex-direction:column;gap:3px;font-size:11px;font-weight:700;color:var(--text2)">Past Jobs / Experience' +
        '<textarea id="cov-pastjobs" style="width:100%;min-height:50px;background:var(--card);border:1px solid var(--border2);border-radius:8px;padding:8px;font-family:var(--sans);font-size:12px;color:var(--text);resize:vertical;outline:none">' + escHtml(covPast) + '</textarea>' +
      '</label>' +
      '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px">' +
        '<label style="display:flex;flex-direction:column;gap:3px;font-size:11px;font-weight:700;color:var(--text2)">Expected Pay' +
          '<input type="text" id="cov-pay" value="' + escAttr(covPay) + '" style="background:var(--card);border:1px solid var(--border2);border-radius:8px;padding:7px 9px;font-family:var(--sans);font-size:12px;color:var(--text);outline:none">' +
        '</label>' +
        '<label style="display:flex;flex-direction:column;gap:3px;font-size:11px;font-weight:700;color:var(--text2)">When Can Start' +
          '<input type="text" id="cov-start" value="' + escAttr(covStart) + '" style="background:var(--card);border:1px solid var(--border2);border-radius:8px;padding:7px 9px;font-family:var(--sans);font-size:12px;color:var(--text);outline:none">' +
        '</label>' +
        '<label style="display:flex;flex-direction:column;gap:3px;font-size:11px;font-weight:700;color:var(--text2)">Civil Status' +
          '<select id="cov-civil" style="background:var(--card);border:1px solid var(--border2);border-radius:8px;padding:7px 9px;font-family:var(--sans);font-size:12px;color:var(--text);outline:none">' +
            ['','Single','Married','Separated','Widowed','Other'].map(function(v){ return '<option value="' + escAttr(v) + '"' + (v === covCivil ? ' selected' : '') + '>' + (v || '—') + '</option>'; }).join('') +
          '</select>' +
        '</label>' +
      '</div>' +
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">' +
        '<label style="display:flex;flex-direction:column;gap:3px;font-size:11px;font-weight:700;color:var(--text2)">Has Kids' +
          '<select id="cov-haskids" style="background:var(--card);border:1px solid var(--border2);border-radius:8px;padding:7px 9px;font-family:var(--sans);font-size:12px;color:var(--text);outline:none">' +
            ['','Yes','No'].map(function(v){ return '<option value="' + escAttr(v) + '"' + (v === covHasKids ? ' selected' : '') + '>' + (v || '—') + '</option>'; }).join('') +
          '</select>' +
        '</label>' +
        '<label style="display:flex;flex-direction:column;gap:3px;font-size:11px;font-weight:700;color:var(--text2)"># of Kids' +
          '<input type="number" min="0" max="20" id="cov-numkids" value="' + escAttr(covNumKids) + '" style="background:var(--card);border:1px solid var(--border2);border-radius:8px;padding:7px 9px;font-family:var(--mono);font-size:12px;color:var(--text);outline:none">' +
        '</label>' +
      '</div>' +
      '<button class="btn btn-blue" style="align-self:flex-start;margin-top:4px" onclick="saveCandOverrideFromCall(\'' + escAttr(candId) + '\')">Save updates</button>' +
    '</div>' +
    '</div>' : '';

  const decisionHTML = showDecision ? editSectionHTML + '<div class="call-assess-section">' +
    '<div class="call-assess-title">Call Notes</div>' +
    '<textarea id="call-notes-input" placeholder="What was discussed, any concerns…" style="width:100%;min-height:80px;background:var(--card);border:1px solid var(--border2);border-radius:9px;padding:10px;font-family:var(--sans);font-size:13px;color:var(--text);resize:vertical;outline:none" onchange=""></textarea>' +
    '</div>' +
    '<div class="call-assess-section">' +
    '<div class="call-assess-title">Decision (required)</div>' +
    '<div style="display:flex;flex-wrap:wrap;gap:8px">' +
    '<button class="call-decision-btn confirmed" onclick="submitCallDecision(\'Confirmed Interested\')">Confirmed Interested →</button>' +
    '<button class="call-decision-btn for-review" onclick="submitCallDecision(\'For Employer Review\')">For Employer Review →</button>' +
    '<button class="call-decision-btn callback" onclick="showCallbackScheduler()">Schedule Callback</button>' +
    '<button class="call-decision-btn rejected" onclick="submitCallDecision(\'Rejected by Jobseeker\')">Rejected by Jobseeker</button>' +
    '</div>' +
    '<div id="callback-scheduler" style="display:none;margin-top:12px;padding:12px;background:var(--bg);border:1px solid var(--border);border-radius:10px">' +
    '<div style="font-size:12px;font-weight:700;color:var(--text2);margin-bottom:8px">Schedule Callback</div>' +
    '<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">' +
    '<input type="date" id="cb-date" style="padding:6px 10px;border-radius:7px;border:1px solid var(--border2);background:var(--card2);color:var(--text);font-size:12px">' +
    '<input type="time" id="cb-time" style="padding:6px 10px;border-radius:7px;border:1px solid var(--border2);background:var(--card2);color:var(--text);font-size:12px">' +
    '<input type="text" id="cb-reason" placeholder="Reason (optional)" style="flex:1;min-width:160px;padding:6px 10px;border-radius:7px;border:1px solid var(--border2);background:var(--card2);color:var(--text);font-family:var(--sans);font-size:12px">' +
    '<button class="btn btn-gold" onclick="submitCallDecision(\'Scheduled Callback\')">Confirm Callback</button>' +
    '</div></div>' +
    '</div>' : '';

  const nonAnswerHTML = showNonAnswerOpts ? '<div class="call-assess-section">' +
    '<div class="call-assess-title">Log Attempt</div>' +
    '<div style="display:flex;gap:8px;flex-wrap:wrap">' +
    '<button class="call-decision-btn callback" onclick="submitCallDecision(\'Retry Later\')">Retry Later</button>' +
    '<button class="call-decision-btn callback" onclick="showCallbackScheduler()">Schedule Callback</button>' +
    '</div>' +
    '<div id="callback-scheduler" style="display:none;margin-top:12px;padding:12px;background:var(--bg);border:1px solid var(--border);border-radius:10px">' +
    '<div style="font-size:12px;font-weight:700;color:var(--text2);margin-bottom:8px">Schedule Callback</div>' +
    '<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">' +
    '<input type="date" id="cb-date" style="padding:6px 10px;border-radius:7px;border:1px solid var(--border2);background:var(--card2);color:var(--text);font-size:12px">' +
    '<input type="time" id="cb-time" style="padding:6px 10px;border-radius:7px;border:1px solid var(--border2);background:var(--card2);color:var(--text);font-size:12px">' +
    '<input type="text" id="cb-reason" placeholder="Reason (optional)" style="flex:1;min-width:160px;padding:6px 10px;border-radius:7px;border:1px solid var(--border2);background:var(--card2);color:var(--text);font-family:var(--sans);font-size:12px">' +
    '<button class="btn btn-gold" onclick="submitCallDecision(\'Scheduled Callback\')">Confirm Callback</button>' +
    '</div></div>' +
    '</div>' : '';

  inner.innerHTML = '<div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:16px">' +
    '<div>' +
      '<h3 style="margin:0 0 4px">' + escHtml(c.name) + '</h3>' +
      '<div style="font-size:12px;color:var(--text3);font-family:var(--mono)">' + escHtml(candId) + ' · ' + escHtml(c.jobTypeFormatted || c.jobType || '—') + '</div>' +
      (jo ? '<div style="font-size:12px;color:var(--text2);margin-top:2px">' + escHtml(jo.id) + ' — ' + escHtml(jo.position) + ' @ ' + escHtml(jo.company) + '</div>' : '') +
      (c.phone ? '<div style="display:flex;align-items:center;gap:8px;margin-top:6px"><a href="tel:' + encodeURIComponent(c.phone) + '" style="font-size:14px;font-weight:800;color:var(--accent);font-family:var(--mono)">' + escHtml(c.phone) + '</a>' +
        '<button class="btn btn-ghost" style="font-size:11px;padding:3px 9px" onclick="navigator.clipboard.writeText(\'' + escAttr(c.phone) + '\').then(function(){showToast(\'Copied!\',\'green\')})">Copy</button></div>' : '') +
    '</div>' +
    '<button onclick="closeModal(\'modal-call-assess\')" style="background:none;border:none;font-size:22px;cursor:pointer;color:var(--text3);padding:0 4px;line-height:1">×</button>' +
    '</div>' +
    '<div class="call-assess-section"><div class="call-assess-title">Call Outcome</div>' +
    '<div style="display:flex;gap:6px;flex-wrap:wrap">' + outcomeBtns + '</div></div>' +
    assessHTML + decisionHTML + nonAnswerHTML;

  // Restore in-flight values into the freshly-rebuilt fields. Missing fields
  // (e.g. outcome changed away from Answered) are skipped via the null check.
  _restoreCallModalFields(_preserve);
}

function setCallOutcome(val) {
  _callAssess.outcome = val;
  // Auto-set answeredCall score if answered
  if (val === 'Answered') {
    const candId = _callAssess.candId;
    if (!candidateRatings[candId]) candidateRatings[candId] = {};
    if (!candidateRatings[candId].scores) candidateRatings[candId].scores = {};
    candidateRatings[candId].scores.answeredCall = true;
    saveCandidateRatings();
  }
  _renderCallAssessment();
}

function toggleCallScore(candId, key, val) {
  if (!candidateRatings[candId]) candidateRatings[candId] = {};
  if (!candidateRatings[candId].scores) candidateRatings[candId].scores = {};
  candidateRatings[candId].scores[key] = val;
  saveCandidateRatings();
  // Re-render just the live score section without closing modal
  const eraLive = calcERA(candId);
  const liveCls = eraLive.score >= 7 ? 'var(--green)' : eraLive.score >= 5 ? 'var(--gold)' : 'var(--red)';
  const liveEl = document.querySelector('.call-era-score');
  if (liveEl) { liveEl.style.color = liveCls; liveEl.textContent = eraLive.score; }
  const eraDetail = document.querySelector('.call-era-live div:nth-child(2) div:nth-child(3)');
  if (eraDetail) eraDetail.textContent = 'E: ' + (eraLive.E>=0?'+':'') + eraLive.E.toFixed(1) + ' · R: ' + (eraLive.R>=0?'+':'') + eraLive.R.toFixed(1) + ' · A: ' + (eraLive.A>=0?'+':'') + eraLive.A.toFixed(1);
}

function setCallAttitude(candId, val) {
  if (!candidateRatings[candId]) candidateRatings[candId] = {};
  if (!candidateRatings[candId].scores) candidateRatings[candId].scores = {};
  candidateRatings[candId].scores.callAttitude = val;
  saveCandidateRatings();
  _renderCallAssessment(); // re-render to update button styles
}

// Save the mid-call candidate info edits. Writes to candidateOverrides
// (the poll-safe override layer), updates the in-memory candidate so other
// open UIs (profile, placement rows, broadcast modal) reflect the change
// immediately, then toasts. Does NOT close the modal or re-render the call
// modal — the ERA scoring + decision-in-progress state must survive Save.
function saveCandOverrideFromCall(candId) {
  const skills      = (document.getElementById('cov-skills')   || {}).value || '';
  const pastJobs    = (document.getElementById('cov-pastjobs') || {}).value || '';
  const expectedPay = (document.getElementById('cov-pay')      || {}).value || '';
  const startDate   = (document.getElementById('cov-start')    || {}).value || '';
  const civilStatus = (document.getElementById('cov-civil')    || {}).value || '';
  const hasKids     = (document.getElementById('cov-haskids')  || {}).value || '';
  // If hasKids isn't 'Yes', drop any number — no orphan stale value.
  const numKids     = hasKids === 'Yes' ? ((document.getElementById('cov-numkids') || {}).value || '') : '';
  candidateOverrides[candId] = { skills: skills, pastJobs: pastJobs, expectedPay: expectedPay, startDate: startDate, civilStatus: civilStatus, hasKids: hasKids, numKids: numKids };
  saveCandidateOverrides();
  // Re-apply override on the in-memory candidate so other surfaces re-read merged.
  const ci = candidates.findIndex(function(x) { return x.id === candId; });
  if (ci >= 0) candidates[ci] = _applyCandOverride(candidates[ci]);
  showToast('Candidate info updated from call.', 'green');
}

function showCallbackScheduler() {
  var el = document.getElementById('callback-scheduler');
  if (el) {
    el.style.display = el.style.display === 'none' ? '' : 'none';
    // Pre-fill date to tomorrow
    var dateEl = document.getElementById('cb-date');
    if (dateEl && !dateEl.value) {
      var tmr = new Date(); tmr.setDate(tmr.getDate() + 1);
      dateEl.value = tmr.toISOString().split('T')[0];
    }
  }
}

function submitCallDecision(decision) {
  const { candId, joId, placementId, outcome } = _callAssess;
  const c  = candidates.find(function(x) { return x.id === candId; });
  const jo = jobOrders.find(function(j) { return j.id === joId; });

  // Collect callback info if scheduling
  let scheduledFor = null, callbackReason = '';
  if (decision === 'Scheduled Callback') {
    const dateEl = document.getElementById('cb-date');
    const timeEl = document.getElementById('cb-time');
    const reasonEl = document.getElementById('cb-reason');
    if (!dateEl || !dateEl.value) { showToast('Please pick a callback date.', 'red'); return; }
    scheduledFor = dateEl.value + (timeEl && timeEl.value ? 'T' + timeEl.value : 'T09:00');
    callbackReason = reasonEl ? reasonEl.value.trim() : '';
  }

  const notes = (document.getElementById('call-notes-input') || {}).value || '';
  const callId = 'call_' + Date.now();
  const now = new Date();
  const era = calcERA(candId);
  const stored = candidateRatings[candId] || {};
  const scores = stored.scores || {};

  // Write call log to Firebase
  const callData = {
    date: now.toISOString().split('T')[0],
    time: now.toTimeString().slice(0,5),
    outcome: outcome || 'Unknown',
    eligibilityScore: era.E,
    responsivenessScore: era.R,
    attitudeScore: era.A,
    eraScore: era.score,
    scores: Object.assign({}, scores),
    notes: notes,
    decision: decision,
    scheduledCallback: scheduledFor ? { date: scheduledFor, reason: callbackReason } : null,
    calledBy: currentUserEmail,
    createdAt: now.toISOString(),
    joId: joId,
    placementId: placementId,
  };
  saveCandidateCall(candId, callId, callData);

  // Stamp direct-contact signal on the placement so staleness/inactive logic
  // recognises this call as a real contact attempt (broadcast does not stamp).
  // contactVia is auto-filled ONLY when empty — never overwrites a manual choice.
  if (placementId) {
    saveProwExtra(placementId, 'lastDirectContactAt', now.toISOString().split('T')[0]);
    let _exForVia = {};
    try { _exForVia = JSON.parse(localStorage.getItem('prow_extra_' + placementId) || '{}'); } catch(_e) {}
    if (!_exForVia.contactVia) {
      saveProwExtra(placementId, 'contactVia', 'Phone Call');
    }
  }

  // Keep isCandInactive's lateReply 14-day staleness path receiving fresh data
  // now that the Screening tab's contact-log writers are gone.
  if (!eraContactLogs[candId]) eraContactLogs[candId] = [];
  eraContactLogs[candId].push({
    method: 'Phone Call',
    outcome: outcome || decision || 'Logged',
    date: now.toISOString().split('T')[0],
    ts: Date.now(),
  });
  saveEraContactLogs();

  // Update call queue based on decision
  if (decision === 'Confirmed Interested' || decision === 'For Employer Review') {
    // Move to confirmed stage in the placement row
    const pidToUpdate = placementId || (joId + '_' + candId + '_bc');
    const mp = manualPlacements.find(function(p) { return p.placementId === placementId; });
    if (mp) {
      saveProwExtra(pidToUpdate, 'dispositionStage', decision);
      saveProwExtra(pidToUpdate, 'response', 'Interested');
    }
    removeFromCallQueue(candId, joId);
    showToast(c ? c.name : candId + ' → ' + decision, 'green');
  } else if (decision === 'Rejected by Jobseeker') {
    const pidToUpdate = placementId || (joId + '_' + candId + '_bc');
    saveProwExtra(pidToUpdate, 'dispositionStage', 'Rejected by Candidate');
    removeFromCallQueue(candId, joId);
    showToast('Logged as Rejected by Jobseeker.', 'orange');
  } else if (decision === 'Scheduled Callback') {
    const _ckey = _qKey(candId, joId);
    callQueue[_ckey] = Object.assign({}, callQueue[_ckey] || {}, {
      candId: candId,
      status: 'scheduled',
      scheduledFor: scheduledFor,
      callbackReason: callbackReason,
      joId: joId,
      placementId: placementId,
    });
    saveCallQueue();
    updateCallsBadge();
    showToast('Callback scheduled for ' + scheduledFor.replace('T',' '), 'green');
  } else {
    // Retry Later — stay in queue, just log the attempt
    showToast('Attempt logged. Candidate stays in queue.', 'gold');
  }

  closeModal('modal-call-assess');
  if (_callsView === 'queue' || _callsView === 'callbacks') renderCallsTab();
}

// ─── CALL HISTORY section inside candidate profile ───

function buildReopenAnalysis() {
  // Gather all reopen events across all job orders
  var reopenEvents = [];
  var allJOIds = jobOrders.map(function(jo){ return jo.id; });
  // Also check overrides that have been cancelled/fulfilled to catch all JOs ever touched
  Object.keys(joStatusOverrides).forEach(function(id){ if (allJOIds.indexOf(id)<0) allJOIds.push(id); });
  allJOIds.forEach(function(joId) {
    var events = getJobOrderEvents(joId);
    events.filter(function(e){ return e.type==='reopened'; }).forEach(function(e) {
      reopenEvents.push({ joId: joId, event: e });
    });
  });
  var total = reopenEvents.length;
  var totalFulfilled = allJOIds.filter(function(joId) {
    var events = getJobOrderEvents(joId);
    return events.some(function(e){ return e.type==='fulfilled'; });
  }).length;
  var reopenRate = totalFulfilled > 0 ? Math.round(total/totalFulfilled*100) : 0;

  // Avg time from last fulfillment to reopen
  var timeToReopenDays = [];
  allJOIds.forEach(function(joId) {
    var events = getJobOrderEvents(joId).slice().sort(function(a,b){ return new Date(a.date)-new Date(b.date); });
    for (var i=1;i<events.length;i++) {
      if (events[i].type==='reopened') {
        // Find preceding fulfilled
        for (var j=i-1;j>=0;j--) {
          if (events[j].type==='fulfilled') {
            var d1=parseDateFlex(events[j].date), d2=parseDateFlex(events[i].date);
            if (d1&&d2) { timeToReopenDays.push(Math.round((d2-d1)/86400000)); break; }
          }
        }
      }
    }
  });
  var avgTimeToReopen = timeToReopenDays.length ? Math.round(timeToReopenDays.reduce(function(a,b){return a+b;},0)/timeToReopenDays.length) : null;
  var avgLabel = avgTimeToReopen===null ? '—' : avgTimeToReopen + 'd';
  var avgInsight = '';
  if (avgTimeToReopen!==null) {
    if (avgTimeToReopen < 7) avgInsight = ' — Candidates failing in probation window';
    else if (avgTimeToReopen <= 30) avgInsight = ' — Likely guarantee replacements';
    else avgInsight = ' — Employer opening a new need';
  }

  // Reason breakdown
  var reasonCounts = {};
  reopenEvents.forEach(function(re) {
    var r = (re.event.reason||'Unknown').replace(/^Other:\s*/,'Other');
    reasonCounts[r] = (reasonCounts[r]||0)+1;
  });
  var reasons = Object.entries(reasonCounts).sort(function(a,b){ return b[1]-a[1]; });
  var maxR = reasons.length ? reasons[0][1] : 1;
  var bars = reasons.map(function(r) {
    var pct = Math.round(r[1]/maxR*100);
    var pcOfTotal = total ? Math.round(r[1]/total*100) : 0;
    return '<div class="chart-bar-row"><div class="chart-bar-label" style="min-width:240px">' + escHtml(r[0]) + '</div>' +
      '<div class="chart-bar-track"><div class="chart-bar-fill" style="width:' + pct + '%;background:var(--orange)"><span>' + r[1] + '</span></div></div>' +
      '<div class="chart-bar-count">' + pcOfTotal + '%</div></div>';
  }).join('');

  // Reopen rate by coordinator (admin only)
  var coordRows = '';
  if (isAdmin()) {
    var rc = getRoleConfig();
    var coordStats = {};
    Object.keys(rc.coordinators||{}).forEach(function(email){ coordStats[email]={fulfilled:0,reopened:0}; });
    allJOIds.forEach(function(joId) {
      var ce = getCoordinatorEmail(joId); if(!ce||!coordStats[ce]) return;
      var events = getJobOrderEvents(joId);
      if (events.some(function(e){ return e.type==='fulfilled'; })) coordStats[ce].fulfilled++;
      if (events.some(function(e){ return e.type==='reopened'; })) coordStats[ce].reopened++;
    });
    coordRows = '<div class="analytics-table-wrap" style="margin-top:14px"><table class="analytics-table"><thead><tr><th>Coordinator</th><th>Fulfilled</th><th>Reopened</th><th>Reopen Rate</th></tr></thead><tbody>' +
      Object.entries(coordStats).map(function(e) {
        var nm=escHtml((rc.coordinators[e[0]]||{}).name||e[0]);
        var rate=e[1].fulfilled>0?Math.round(e[1].reopened/e[1].fulfilled*100)+'%':'—';
        return '<tr><td>' + nm + '</td><td>' + e[1].fulfilled + '</td><td>' + e[1].reopened + '</td><td>' + rate + '</td></tr>';
      }).join('') + '</tbody></table></div>';
  }

  // Summary cards
  var cards = '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:12px;margin-bottom:20px">' +
    [['Total Reopened', total, 'var(--orange)'],
     ['Reopen Rate', reopenRate+'%', 'var(--gold2)'],
     ['Avg Days to Reopen', avgLabel, 'var(--text)']
    ].map(function(x) {
      return '<div style="background:var(--card2);border:1px solid var(--border);border-radius:10px;padding:12px 16px">' +
        '<div style="font-size:9px;font-weight:700;color:var(--text3);text-transform:uppercase;letter-spacing:.6px;margin-bottom:4px">' + x[0] + '</div>' +
        '<div style="font-size:20px;font-weight:800;color:' + x[2] + '">' + x[1] + '</div>' +
        (x[0]==='Avg Days to Reopen'?'<div style="font-size:10px;color:var(--text3)">' + avgInsight + '</div>':'') +
        '</div>';
    }).join('') + '</div>';

  return '<div class="analytics-section"><div class="analytics-section-title">Reopen Patterns <span style="font-size:11px;font-weight:600;color:var(--text3)">' + total + ' total reopened</span></div>' +
    cards + (bars||'<div style="color:var(--text3);font-size:12px">No reopen events recorded.</div>') + coordRows + '</div>';
}

function buildCancellationAnalysis() {
  // Gather cancelled JO data
  var cancelled = [];
  jobOrders.forEach(function(jo) {
    var cxRaw = localStorage.getItem('jo_cancellation_' + jo.id);
    if (!cxRaw) return;
    var cx = {}; try { cx = JSON.parse(cxRaw); } catch(e) { return; }
    // Use last cycle start for days open (not original creation date)
    var daysOpen = 0;
    var cycleS = getLastCycleStartDate(jo.id);
    var refDate = cycleS ? parseDateFlex(cycleS) : (jo.timestamp ? parseDateFlex(jo.timestamp) : null);
    if (refDate) daysOpen = Math.floor((new Date(cx.cancelledAt||Date.now()) - refDate) / 86400000);
    cancelled.push({ jo: jo, cx: cx, daysOpen: Math.max(0, daysOpen) });
  });
  // Also count from joStatusOverrides
  Object.keys(joStatusOverrides).forEach(function(joId) {
    if (joStatusOverrides[joId] !== 'Cancelled') return;
    if (cancelled.some(function(c){ return c.jo.id === joId; })) return;
    var cxRaw = localStorage.getItem('jo_cancellation_' + joId);
    if (!cxRaw) return;
    var cx = {}; try { cx = JSON.parse(cxRaw); } catch(e) { return; }
    var jo = { id: joId, company: cx.company||joId, position: '', timestamp: '' };
    cancelled.push({ jo: jo, cx: cx, daysOpen: 0 });
  });

  var total = cancelled.length;
  var avgDaysOpen = total ? Math.round(cancelled.reduce(function(a,b){ return a+b.daysOpen; },0)/total) : 0;
  var reasonCounts = {};
  cancelled.forEach(function(c) {
    var r = (c.cx.reason||'Unknown').replace(/^Other:\s*/,'Other');
    reasonCounts[r] = (reasonCounts[r]||0) + 1;
  });
  var reasons = Object.entries(reasonCounts).sort(function(a,b){ return b[1]-a[1]; });
  var topReason = reasons.length ? reasons[0][0] : '—';
  var thisMonth = new Date(); thisMonth.setDate(1); thisMonth.setHours(0,0,0,0);
  var cancelledThisMonth = cancelled.filter(function(c) { var dt=parseDateFlex(c.cx.cancelledAt||''); return dt && dt>=thisMonth; }).length;
  var totalJOs = jobOrders.length + total;
  var cancelRate = totalJOs ? Math.round(total/totalJOs*100) : 0;

  // Summary cards
  var cards = '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:12px;margin-bottom:20px">' +
    [['Total Cancelled', total, 'var(--red)'],
     ['Avg Days Open', avgDaysOpen+'d', 'var(--gold2)'],
     ['Top Reason', topReason.length>20?topReason.slice(0,20)+'…':topReason, 'var(--text)'],
     ['Cancel Rate', cancelRate+'%', 'var(--orange)'],
     ['This Month', cancelledThisMonth, 'var(--red)']
    ].map(function(x) {
      return '<div style="background:var(--card2);border:1px solid var(--border);border-radius:10px;padding:12px 16px">' +
        '<div style="font-size:9px;font-weight:700;color:var(--text3);text-transform:uppercase;letter-spacing:.6px;margin-bottom:4px">' + x[0] + '</div>' +
        '<div style="font-size:20px;font-weight:800;color:' + x[2] + '">' + x[1] + '</div></div>';
    }).join('') + '</div>';

  // Bar chart of reasons
  var maxR = reasons.length ? reasons[0][1] : 1;
  var bars = '<div style="margin-bottom:20px">' +
    reasons.map(function(r) {
      var pct = Math.round(r[1]/maxR*100);
      var pcOfTotal = total ? Math.round(r[1]/total*100) : 0;
      return '<div class="chart-bar-row">' +
        '<div class="chart-bar-label" style="min-width:220px">' + escHtml(r[0]) + '</div>' +
        '<div class="chart-bar-track"><div class="chart-bar-fill" style="width:' + pct + '%;background:var(--red)"><span>' + r[1] + '</span></div></div>' +
        '<div class="chart-bar-count" style="color:var(--text3)">' + pcOfTotal + '%</div>' +
        '</div>';
    }).join('') + '</div>';

  // Cancellation log table (admin only — notes visible to admin)
  var tableRows = cancelled.slice().sort(function(a,b){ return (b.cx.cancelledAt||'').localeCompare(a.cx.cancelledAt||''); }).map(function(c) {
    var dateStr = c.cx.cancelledAt ? new Date(c.cx.cancelledAt).toLocaleDateString('en-PH',{month:'short',day:'numeric',year:'numeric'}) : '—';
    var coordEmail = getCoordinatorEmail(c.jo.id);
    var coordName = coordEmail ? getCoordinatorName(coordEmail) : '—';
    return '<tr><td>' + dateStr + '</td><td>' + escHtml(c.jo.company||'—') + '</td><td>' + escHtml(c.jo.position||'—') + '</td>' +
      '<td style="font-family:var(--mono)">' + c.daysOpen + 'd</td>' +
      '<td>' + escHtml(c.cx.reason||'—') + '</td><td>' + escHtml(coordName) + '</td>' +
      '<td style="color:var(--text3);font-size:11px">' + escHtml(c.cx.notes||'') + '</td></tr>';
  }).join('');

  // 6-month trend chart (SVG)
  var monthCounts = {};
  for (var m=5;m>=0;m--) { var d=new Date(); d.setDate(1); d.setMonth(d.getMonth()-m); monthCounts[d.getFullYear()+'-'+(d.getMonth()+1)] = 0; }
  cancelled.forEach(function(c) { var dt=parseDateFlex(c.cx.cancelledAt||''); if(!dt) return; var mk=dt.getFullYear()+'-'+(dt.getMonth()+1); if(monthCounts[mk]!==undefined) monthCounts[mk]++; });
  var mKeys = Object.keys(monthCounts);
  var mMax = Math.max(1, Math.max.apply(null, Object.values(monthCounts)));
  var svgW = 420, svgH = 80, barW = Math.floor(svgW/mKeys.length)-8;
  var svgBars = mKeys.map(function(mk, i) {
    var cnt = monthCounts[mk];
    var bh = Math.max(4, Math.round(cnt/mMax*(svgH-20)));
    var x = i * (svgW/mKeys.length) + 4;
    var y = svgH - bh - 2;
    var label = mk.split('-')[1]; // month number
    return '<rect x="' + x + '" y="' + y + '" width="' + barW + '" height="' + bh + '" rx="3" fill="var(--red)" opacity=".7"/>' +
      '<text x="' + (x+barW/2) + '" y="' + (svgH+2) + '" text-anchor="middle" font-size="9" fill="var(--text3)">' + label + '</text>' +
      '<text x="' + (x+barW/2) + '" y="' + (y-3) + '" text-anchor="middle" font-size="8" fill="var(--text2)">' + cnt + '</text>';
  }).join('');
  var trendChart = '<div style="margin-bottom:20px"><div style="font-size:11px;font-weight:700;color:var(--text3);margin-bottom:8px">6-Month Trend</div>' +
    '<svg width="' + svgW + '" height="' + (svgH+14) + '" style="overflow:visible">' + svgBars + '</svg></div>';

  return '<div class="analytics-section">' +
    '<div class="analytics-section-title">Cancellation Analysis <span style="font-size:11px;font-weight:600;color:var(--text3)">' + total + ' total cancelled</span></div>' +
    cards + bars + trendChart +
    '<div class="analytics-table-wrap"><table class="analytics-table"><thead><tr>' +
    '<th>Date</th><th>Employer</th><th>Position</th><th>Days Open</th><th>Reason</th><th>Handler</th><th>Notes</th></tr></thead><tbody>' +
    (tableRows || '<tr><td colspan="7" style="text-align:center;color:var(--text3)">No cancellations recorded.</td></tr>') +
    '</tbody></table></div></div>';
}

function buildPipelineDropoff() {
  var stages = ['Broadcasted','Confirmed Interested','For Employer Review','Interview Scheduled','Hired ✓'];
  var counts = {}; stages.forEach(function(s){ counts[s]=0; });
  var allP = [...placements,...manualPlacements];
  allP.forEach(function(p) {
    var pid = p.placementId||p.candidateId;
    var ex = {}; try { ex=JSON.parse(localStorage.getItem('prow_extra_'+pid)||'{}'); } catch(e){}
    var stg = getEffectiveStage(ex,p);
    if (counts[stg]!==undefined) counts[stg]++;
  });
  var maxC = Math.max(1, Math.max.apply(null, stages.map(function(s){ return counts[s]; })));
  var colors = ['var(--blue)','var(--accent)','var(--purple)','var(--orange)','var(--green)'];
  var worstDropIdx = -1; var worstDrop = -1;
  var rows = stages.map(function(stage, i) {
    var cnt = counts[stage];
    var pct = Math.round(cnt/maxC*100);
    var dropoffHtml = '';
    if (i>0) {
      var prev = counts[stages[i-1]]||0;
      if (prev>0) {
        var d = Math.round((1-cnt/prev)*100);
        if (d>worstDrop) { worstDrop=d; worstDropIdx=i; }
        dropoffHtml = '<span style="font-size:10px;color:var(--text3);margin-left:8px">↓ ' + d + '% drop-off' + (i===worstDropIdx?'  <b style=color:var(--red)>Biggest drop-off</b>':'') + '</span>';
      }
    }
    return '<div class="chart-bar-row" style="' + (i===worstDropIdx?'background:rgba(220,38,38,.05);border-radius:8px;padding:4px 8px':'') + '">' +
      '<div class="chart-bar-label" style="min-width:200px;font-weight:' + (i===worstDropIdx?'700':'500') + ';color:' + (i===worstDropIdx?'var(--red)':'var(--text2)') + '">' + stage + (i===worstDropIdx?' — biggest drop-off':'') + '</div>' +
      '<div class="chart-bar-track"><div class="chart-bar-fill" style="width:' + pct + '%;background:' + colors[i] + '"><span>' + cnt + '</span></div></div>' +
      '<div class="chart-bar-count">' + cnt + '</div>' + dropoffHtml + '</div>';
  }).join('');
  return '<div class="analytics-section"><div class="analytics-section-title">Pipeline Drop-off Analysis</div>' + rows + '</div>';
}

function buildTimingDistribution() {
  var buckets = { '1-3d':0, '4-5d':0, '6-7d':0, '8-10d':0, '10+d':0 };
  var allP = [...placements,...manualPlacements];
  allP.forEach(function(p) {
    var pid = p.placementId||p.candidateId;
    var ex = {}; try { ex=JSON.parse(localStorage.getItem('prow_extra_'+pid)||'{}'); } catch(e){}
    var hd = {}; try { hd=JSON.parse(localStorage.getItem('hire_data_'+pid)||'{}'); } catch(e){}
    if ((ex.status||p.status||'').trim().toLowerCase()!=='hired') return;
    var hireDate = hd.hireDate; if(!hireDate) return;
    var jo = jobOrders.find(function(j){ return j.id===p.jobOrderId; });
    if (!jo) return;
    var cycleS = getLastCycleStartDate(p.jobOrderId);
    var hdMs=parseDateFlex(hireDate), joMs=cycleS ? parseDateFlex(cycleS) : (jo.timestamp ? parseDateFlex(jo.timestamp) : null);
    if (!hdMs||!joMs) return;
    var days = Math.round((hdMs-joMs)/86400000);
    if (days<=3) buckets['1-3d']++;
    else if (days<=5) buckets['4-5d']++;
    else if (days<=7) buckets['6-7d']++;
    else if (days<=10) buckets['8-10d']++;
    else buckets['10+d']++;
  });
  var maxB = Math.max(1, Math.max.apply(null, Object.values(buckets)));
  var bars = Object.entries(buckets).map(function(b) {
    var pct = Math.round(b[1]/maxB*100);
    return '<div class="chart-bar-row"><div class="chart-bar-label" style="min-width:80px">' + b[0] + '</div>' +
      '<div class="chart-bar-track"><div class="chart-bar-fill" style="width:' + pct + '%;background:var(--accent)"><span>' + b[1] + '</span></div></div>' +
      '<div class="chart-bar-count">' + b[1] + ' placements</div></div>';
  }).join('');
  return '<div class="analytics-section"><div class="analytics-section-title">Time-to-Placement Distribution</div>' + bars + '</div>';
}

function buildEmployerTable() {
  var employerMap = {};
  jobOrders.forEach(function(jo) {
    var key = (jo.company||'Unknown').trim();
    if (!employerMap[key]) employerMap[key] = { orders:0, placements:0, cancellations:0, replacements:0, revenue:0, firstJO:'', lastActivity:'', joList:[] };
    employerMap[key].orders++;
    var ts = (jo.timestamp||'').split(' ')[0];
    if (!employerMap[key].firstJO || ts < employerMap[key].firstJO) employerMap[key].firstJO = ts;
    if (ts > employerMap[key].lastActivity) employerMap[key].lastActivity = ts;
    var isCancelled = jo.status==='Cancelled'||joStatusOverrides[jo.id]==='Cancelled';
    if (isCancelled) employerMap[key].cancellations++;
    employerMap[key].joList.push({ id: jo.id, position: jo.position, status: jo.status, ts: ts, placements: 0, hired: 0 });
  });
  var allP = [...placements,...manualPlacements];
  allP.forEach(function(p) {
    var jo = jobOrders.find(function(j){ return j.id===p.jobOrderId; });
    var key = jo ? (jo.company||'Unknown').trim() : 'Unknown';
    if (!employerMap[key]) employerMap[key] = { orders:0, placements:0, cancellations:0, replacements:0, revenue:0, firstJO:'', lastActivity:'', joList:[] };
    var pid = p.placementId||p.candidateId;
    var ex={}; try{ex=JSON.parse(localStorage.getItem('prow_extra_'+pid)||'{}');}catch(e){}
    var hd={}; try{hd=JSON.parse(localStorage.getItem('hire_data_'+pid)||'{}');}catch(e){}
    var joEntry = employerMap[key].joList.find(function(j){ return j.id===p.jobOrderId; });
    if (joEntry) joEntry.placements++;
    if ((ex.status||p.status||'').trim().toLowerCase()==='hired') {
      employerMap[key].placements++;
      if (joEntry) joEntry.hired++;
      var fee = parseFloat(((hd.feePaidAmount||hd.feeAmount)||'').replace(/[^0-9.]/g,''))||0;
      if (hd.feeStatus==='Paid') employerMap[key].revenue+=fee;
      var hd2 = hd.hireDate || (ex.lastContacted||'');
      if (hd2 > employerMap[key].lastActivity) employerMap[key].lastActivity = hd2;
    }
    if (hd.issueReported&&(hd.issues||[]).some(function(i){ return i.type==='Replacement Requested'||i.type==='Candidate Abandonment / No-Show'; })) employerMap[key].replacements++;
  });

  var sorted = Object.entries(employerMap).sort(function(a,b){ return b[1].placements-a[1].placements; });
  var total = sorted.length;
  var returning = sorted.filter(function(e){ return e[1].orders>=2; }).length;
  var loyal = sorted.filter(function(e){ return e[1].orders>=3; }).length;

  // Summary bar
  var summary = '<div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:16px">' +
    [['Total Employers', total, 'var(--accent)'],['% Returning (2+ JOs)', total?Math.round(returning/total*100)+'%':'—','var(--gold2)'],['% Loyal (3+ JOs)', total?Math.round(loyal/total*100)+'%':'—','var(--green)']].map(function(s) {
      return '<div style="background:var(--card2);border:1px solid var(--border);border-radius:10px;padding:10px 16px;flex:1;min-width:100px">' +
        '<div style="font-size:9px;font-weight:700;color:var(--text3);text-transform:uppercase;letter-spacing:.5px;margin-bottom:3px">' + s[0] + '</div>' +
        '<div style="font-size:20px;font-weight:800;color:' + s[2] + '">' + s[1] + '</div></div>';
    }).join('') + '</div>';

  var rows = sorted.map(function(e, idx) {
    var key=e[0], em=e[1];
    var badge = em.orders>=3 ? '<span style="font-size:10px;background:rgba(22,163,74,.12);color:var(--green);border:1px solid rgba(22,163,74,.3);padding:1px 7px;border-radius:4px;font-weight:700">Loyal</span>'
      : em.orders>=2 ? '<span style="font-size:10px;background:var(--gold-dim);color:var(--gold2);border:1px solid rgba(217,119,6,.3);padding:1px 7px;border-radius:4px;font-weight:700">Returning</span>'
      : '<span style="font-size:10px;background:var(--card3);color:var(--text3);border:1px solid var(--border2);padding:1px 7px;border-radius:4px;font-weight:700">New</span>';
    var replRate = em.placements>0 ? Math.round(em.replacements/em.placements*100)+'%' : '—';
    var joDetail = '<tr id="emp-detail-' + idx + '" style="display:none"><td colspan="8" style="padding:0"><div style="background:var(--card2);border-top:1px solid var(--border);padding:10px 14px">' +
      '<table style="width:100%;font-size:11px;border-collapse:collapse">' +
      '<tr style="color:var(--text3);font-weight:700"><td style="padding:4px 8px">JO ID</td><td>Position</td><td>Status</td><td>Placements</td><td>Hired</td><td>Date</td></tr>' +
      em.joList.map(function(j) {
        return '<tr style="border-top:1px solid var(--border)"><td style="padding:4px 8px;font-family:var(--mono);font-size:10px">' + escHtml(j.id) + '</td><td>' + escHtml(j.position||'—') + '</td>' +
          '<td><span style="font-weight:600;color:' + (j.status==='Active'?'var(--accent)':j.status==='Fulfilled'?'var(--green)':'var(--text3)') + '">' + escHtml(j.status||'—') + '</span></td>' +
          '<td style="font-family:var(--mono)">' + j.placements + '</td><td style="font-family:var(--mono)">' + j.hired + '</td><td style="font-family:var(--mono);font-size:10px">' + escHtml(j.ts||'—') + '</td></tr>';
      }).join('') + '</table></div></td></tr>';
    return '<tr style="cursor:pointer" onclick="var r=document.getElementById(\'emp-detail-' + idx + '\');r.style.display=r.style.display===\'none\'?\'table-row\':\'none\'">' +
      '<td>' + escHtml(key) + '</td>' +
      '<td>' + badge + '</td>' +
      '<td style="font-family:var(--mono)">' + em.firstJO + '</td>' +
      '<td style="font-family:var(--mono)">' + em.orders + '</td>' +
      '<td style="font-family:var(--mono)">' + em.placements + '</td>' +
      '<td style="font-family:var(--mono)">' + em.lastActivity + '</td>' +
      '<td>' + replRate + '</td>' +
      '<td style="font-family:var(--mono)">' + formatPeso(em.revenue) + '</td>' +
      '<td style="color:var(--text3);font-size:10px">▾</td></tr>' + joDetail;
  }).join('');

  return '<div class="analytics-section"><div class="analytics-section-title">Employer Retention</div>' +
    summary +
    '<div class="analytics-table-wrap"><table class="analytics-table"><thead><tr>' +
    '<th>Employer</th><th>Retention</th><th>First JO</th><th>Total JOs</th><th>Total Placements</th><th>Last Activity</th><th>Replace Rate</th><th>Revenue</th><th></th>' +
    '</tr></thead><tbody>' + (rows||'<tr><td colspan="9" style="text-align:center;color:var(--text3)">No data.</td></tr>') + '</tbody></table></div></div>';
}

function buildRevenueTable() {
  var monthMap = {};
  function getMonthKey(ds) { var d=parseDateFlex(ds); if(!d) return null; return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0'); }
  // Init last 6 months
  for (var m=5;m>=0;m--) { var d2=new Date(); d2.setDate(1); d2.setMonth(d2.getMonth()-m); var mk=d2.getFullYear()+'-'+String(d2.getMonth()+1).padStart(2,'0'); monthMap[mk]={joCount:0,placed:0,cancelled:0,collected:0,pending:0}; }
  jobOrders.forEach(function(jo) {
    var mk=getMonthKey(jo.timestamp); if(!mk||!monthMap[mk]) return;
    monthMap[mk].joCount++;
    if (jo.status==='Cancelled'||joStatusOverrides[jo.id]==='Cancelled') monthMap[mk].cancelled++;
  });
  var allP=[...placements,...manualPlacements];
  allP.forEach(function(p) {
    var pid=p.placementId||p.candidateId;
    var ex={}; try{ex=JSON.parse(localStorage.getItem('prow_extra_'+pid)||'{}');}catch(e){}
    var hd={}; try{hd=JSON.parse(localStorage.getItem('hire_data_'+pid)||'{}');}catch(e){}
    if ((ex.status||p.status||'').trim().toLowerCase()!=='hired') return;
    var mk=getMonthKey(hd.hireDate); if(!mk||!monthMap[mk]) return;
    monthMap[mk].placed++;
    var fee=parseFloat(((hd.feePaidAmount||hd.feeAmount)||'').replace(/[^0-9.]/g,''))||0;
    if (hd.feeStatus==='Paid') monthMap[mk].collected+=fee; else monthMap[mk].pending+=fee;
  });
  var monthNames=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var rows=Object.entries(monthMap).sort(function(a,b){return b[0].localeCompare(a[0]);}).map(function(e){
    var mk=e[0],mv=e[1];
    var parts=mk.split('-'); var mLabel=monthNames[parseInt(parts[1])-1]+' '+parts[0];
    return '<tr><td style="font-weight:600">' + mLabel + '</td><td style="font-family:var(--mono)">' + mv.joCount + '</td><td style="font-family:var(--mono)">' + mv.placed + '</td><td style="font-family:var(--mono)">' + mv.cancelled + '</td>' +
      '<td style="color:var(--green);font-weight:700;font-family:var(--mono)">' + formatPeso(mv.collected) + '</td><td style="color:var(--gold2);font-family:var(--mono)">' + formatPeso(mv.pending) + '</td></tr>';
  }).join('');
  return '<div class="analytics-section"><div class="analytics-section-title">Monthly Revenue Summary</div><div class="analytics-table-wrap"><table class="analytics-table"><thead><tr><th>Month</th><th>Job Orders</th><th>Placed</th><th>Cancelled</th><th>Fees Collected</th><th>Fees Pending</th></tr></thead><tbody>' + rows + '</tbody></table></div></div>';
}

function buildCommissionTable() {
  if (!isAdmin()) return '';
  var rc = getRoleConfig();
  var coordEmails = Object.keys(rc.coordinators||{});
  var now = new Date(); var monthStart = new Date(now.getFullYear(),now.getMonth(),1).getTime();
  var stats = {};
  coordEmails.forEach(function(email) { stats[email]={monthCount:0,allCount:0,monthEarned:0,allEarned:0,pending:0}; });
  var allP=[...placements,...manualPlacements];
  allP.forEach(function(p) {
    var pid=p.placementId||p.candidateId;
    var hd={}; try{hd=JSON.parse(localStorage.getItem('hire_data_'+pid)||'{}');}catch(e){}
    var comm=hd.commission; if(!comm||!comm.coordinatorEmail) return;
    var email=comm.coordinatorEmail; if(!stats[email]) stats[email]={monthCount:0,allCount:0,monthEarned:0,allEarned:0,pending:0};
    var hdMs=parseDateFlex(hd.hireDate);
    var isThisMonth = hdMs && hdMs.getTime()>=monthStart;
    stats[email].allCount++;
    stats[email].allEarned+=comm.amount||0;
    if (hd.feeStatus!=='Paid') stats[email].pending+=comm.amount||0;
    if (isThisMonth) { stats[email].monthCount++; stats[email].monthEarned+=comm.amount||0; }
  });
  var rows = coordEmails.map(function(email) {
    var s=stats[email]||{monthCount:0,allCount:0,monthEarned:0,allEarned:0,pending:0};
    var name=escHtml((rc.coordinators[email]||{}).name||email);
    return '<tr><td style="font-weight:600">' + name + '</td><td style="font-family:var(--mono)">' + s.monthCount + '</td><td style="font-family:var(--mono)">' + s.allCount + '</td>' +
      '<td style="color:var(--green);font-family:var(--mono);font-weight:700">' + formatPeso(s.monthEarned) + '</td>' +
      '<td style="color:var(--green);font-family:var(--mono);font-weight:700">' + formatPeso(s.allEarned) + '</td>' +
      '<td style="color:var(--gold2);font-family:var(--mono)">' + formatPeso(s.pending) + '</td>' +
      '<td><button class="btn btn-green" style="font-size:11px;padding:4px 10px" onclick="markCoordPaid(\'' + escAttr(email) + '\')">Mark Paid</button></td></tr>';
  }).join('');
  return '<div class="analytics-section"><div class="analytics-section-title">Commission Tracking</div><div class="analytics-table-wrap"><table class="analytics-table"><thead><tr><th>Coordinator</th><th>Month</th><th>All Time</th><th>Earned (Month)</th><th>Earned (All Time)</th><th>Pending Payout</th><th>Action</th></tr></thead><tbody>' + (rows||'<tr><td colspan="7" style="text-align:center;color:var(--text3)">No coordinators configured.</td></tr>') + '</tbody></table></div></div>';
}

function markCoordPaid(email) {
  var now = new Date();
  var ym = now.getFullYear() + '-' + String(now.getMonth()+1).padStart(2,'0');
  var payoutKey = 'commission_payout_' + email.replace(/[^a-z0-9]/gi,'_') + '_' + ym;
  localStorage.setItem(payoutKey, new Date().toISOString());
  fbSync('commissionPayouts/' + email.replace('@','_').replace(/\./g,'_') + '/' + ym, new Date().toISOString());
  showToast('Payout recorded for ' + getCoordinatorName(email), 'green');
}

function buildManageTeam() {
  var rc = getRoleConfig();
  var rows = Object.entries(rc.coordinators||{}).map(function(e) {
    var email=e[0], coord=e[1];
    var isActive = coord.active !== false;
    return '<tr>' +
      '<td><input class="team-name-input" value="' + escAttr(coord.name||'') + '" onchange="updateCoordField(\'' + escAttr(email) + '\',\'name\',this.value)"></td>' +
      '<td style="font-family:var(--mono);font-size:11px;color:var(--text3)">' + escHtml(email) + '</td>' +
      '<td><input class="team-rate-input" type="number" min="0" max="100" step="1" value="' + Math.round((coord.commissionRate||0)*100) + '" onchange="updateCoordField(\'' + escAttr(email) + '\',\'commissionRate\',this.value/100)">%</td>' +
      '<td><span style="color:' + (isActive?'var(--green)':'var(--text3)') + '">' + (isActive?'Active':'Inactive') + '</span></td>' +
      '<td style="display:flex;gap:6px">' +
        '<button class="btn btn-ghost" style="font-size:11px;padding:4px 10px" onclick="toggleCoordActive(\'' + escAttr(email) + '\')">' + (isActive?'Deactivate':'Activate') + '</button>' +
        '<button class="btn btn-red" style="font-size:11px;padding:4px 10px" onclick="removeCoordinator(\'' + escAttr(email) + '\')">Remove</button>' +
      '</td></tr>';
  }).join('');
  var addForm = '<div style="margin-top:16px;background:var(--card2);border:1px solid var(--border);border-radius:10px;padding:14px 18px">' +
    '<div style="font-size:11px;font-weight:700;color:var(--text3);text-transform:uppercase;letter-spacing:.5px;margin-bottom:10px">Add New Coordinator</div>' +
    '<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">' +
    '<input id="new-coord-name" class="team-name-input" placeholder="Full Name" style="flex:1;min-width:140px">' +
    '<input id="new-coord-email" type="email" class="team-name-input" placeholder="email@example.com" style="flex:1;min-width:200px">' +
    '<input id="new-coord-rate" class="team-rate-input" type="number" value="30" min="0" max="100">%' +
    '<button class="btn btn-green" onclick="addCoordinator()" style="font-size:12px">+ Add</button>' +
    '</div></div>';
  return '<div class="analytics-section"><div class="analytics-section-title">Manage Team</div>' +
    '<div class="analytics-table-wrap"><table class="team-table"><thead><tr><th>Name</th><th>Email</th><th>Commission Rate</th><th>Status</th><th>Actions</th></tr></thead><tbody>' +
    (rows||'<tr><td colspan="5" style="text-align:center;color:var(--text3)">No coordinators yet.</td></tr>') + '</tbody></table></div>' + addForm + '</div>';
}

function updateCoordField(email, field, value) {
  var rc = getRoleConfig();
  if (!rc.coordinators[email]) return;
  rc.coordinators[email][field] = field==='commissionRate' ? parseFloat(value) : value;
  _mergedRoleConfig = rc;
  saveFirebaseRoleConfig().then(function() {
    // Name changes appear in Handled By dropdown — re-render JO panels
    renderJobOrders([...placements, ...manualPlacements]);
  });
}

function toggleCoordActive(email) {
  var rc = getRoleConfig();
  if (!rc.coordinators[email]) return;
  rc.coordinators[email].active = rc.coordinators[email].active === false ? true : false;
  _mergedRoleConfig = rc;
  saveFirebaseRoleConfig().then(function() {
    renderAnalyticsTab();
    renderJobOrders([...placements, ...manualPlacements]);
  });
}

function removeCoordinator(email) {
  if (!confirm('Remove coordinator ' + email + '? Historical records are preserved.')) return;
  var rc = getRoleConfig();
  delete rc.coordinators[email];
  _mergedRoleConfig = rc;
  saveFirebaseRoleConfig().then(function() {
    renderAnalyticsTab();
    renderJobOrders([...placements, ...manualPlacements]);
  });
}

async function addCoordinator() {
  var name  = (document.getElementById('new-coord-name')||{}).value||'';
  var email = (document.getElementById('new-coord-email')||{}).value||'';
  var rate  = parseFloat((document.getElementById('new-coord-rate')||{}).value||'30')/100;
  if (!name||!email) { showToast('Name and email required.', 'red'); return; }

  var rc = getRoleConfig();
  rc.coordinators = rc.coordinators||{};
  rc.coordinators[email] = { name: name.trim(), commissionRate: rate, active: true };
  _mergedRoleConfig = rc;

  console.log('[AddCoordinator] Writing coordinator to Firebase path: config/roles', rc.coordinators);
  if (typeof window._fbSdkSet !== 'function') {
    console.error('[AddCoordinator] _fbSdkSet not available — Firebase SDK not ready');
    showToast('Firebase not ready. Please refresh and try again.', 'red');
    return;
  }

  try {
    var ok = await window._fbSdkSet('config/roles', { admins: rc.admins, coordinators: _coordsForFb(rc.coordinators) });
    console.log('[AddCoordinator] Firebase write result:', ok, 'for coordinator:', email);
    if (ok) {
      showToast(name.trim() + ' added to team.', 'green');
      var nEl = document.getElementById('new-coord-name');
      var eEl = document.getElementById('new-coord-email');
      var rEl = document.getElementById('new-coord-rate');
      if (nEl) nEl.value = '';
      if (eEl) eEl.value = '';
      if (rEl) rEl.value = '30';
      // Re-render Manage Team table AND all JO panels so Handled By dropdown updates immediately
      renderAnalyticsTab();
      renderJobOrders([...placements, ...manualPlacements]);
    } else {
      console.error('[AddCoordinator] Firebase write returned false — check Firebase rules and network');
      showToast('Save failed — check browser console for details.', 'red');
    }
  } catch(e) {
    console.error('[AddCoordinator] Firebase write threw:', e);
    showToast('Save failed: ' + e.message, 'red');
  }
}

// ─── COORDINATOR SELF-VIEW (My Earnings card) ───
function renderMyEarnings() {
  if (!isCoordinator()) return;
  var container = document.getElementById('my-earnings-card');
  if (!container) return;
  var rc = getRoleConfig();
  var coord = rc.coordinators && rc.coordinators[currentUserEmail];
  if (!coord) return;
  var now = new Date(); var monthStart = new Date(now.getFullYear(),now.getMonth(),1).getTime();
  var monthCount=0, monthEarned=0, pending=0;
  var detailRows = [];
  var allP=[...placements,...manualPlacements];
  allP.forEach(function(p) {
    var pid=p.placementId||p.candidateId;
    var hd={}; try{hd=JSON.parse(localStorage.getItem('hire_data_'+pid)||'{}');}catch(e){}
    var comm=hd.commission; if(!comm||comm.coordinatorEmail!==currentUserEmail) return;
    var hdMs=parseDateFlex(hd.hireDate); if(!hdMs) return;
    var isThisMonth=hdMs.getTime()>=monthStart;
    if(isThisMonth) { monthCount++; monthEarned+=comm.amount||0; }
    if(hd.feeStatus!=='Paid') pending+=comm.amount||0;
    var jo=jobOrders.find(function(j){return j.id===p.jobOrderId;});
    detailRows.push('<div class="earnings-detail-row"><span>' + escHtml(p.candidateName||p.candidateId) + ' — ' + escHtml(jo?jo.company:'') + '</span><span style="font-weight:700;color:var(--green)">' + formatPeso(comm.amount) + '</span></div>');
  });
  var monthName=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][now.getMonth()]+' '+now.getFullYear();
  container.innerHTML = '<div class="earnings-card">' +
    '<div class="earnings-metric"><div class="earnings-metric-val">' + monthCount + '</div><div class="earnings-metric-label">Placements</div></div>' +
    '<div class="earnings-metric"><div class="earnings-metric-val">' + formatPeso(monthEarned) + '</div><div class="earnings-metric-label">Earned</div></div>' +
    '<div class="earnings-metric"><div class="earnings-metric-val" style="color:var(--gold2)">' + formatPeso(pending) + '</div><div class="earnings-metric-label">Pending</div></div>' +
    '</div>' + (detailRows.length ? '<div style="margin-top:10px">' + detailRows.join('') + '</div>' : '');
  container.style.display='';
}

// ═══════════════════════════════════════════════
// GUIDED TOUR
// ═══════════════════════════════════════════════

var TOUR_STEPS = [
  {
    tab: null,
    targetFn: function() { return document.querySelector('.tabs'); },
    title: 'Job Orders Tab',
    body: 'This is where all employer requests live. Click a job order to expand it and see its full candidate pipeline.'
  },
  {
    tab: 'jobs',
    targetFn: function() { return document.querySelector('#jo-container .pipeline-section') || document.getElementById('jo-container'); },
    title: 'Pipeline Funnel',
    body: 'Track where each candidate is: Broadcasted → Confirmed Interested → For Employer Review → Interview Scheduled → Hired ✓. Expand any job order to see its funnel.'
  },
  {
    tab: 'jobs',
    targetFn: function() { return document.querySelector('.jo-panel-actions .btn-secondary') || document.querySelector('.jo-panel-actions'); },
    title: 'Broadcast Button',
    body: 'Send job details to a filtered list of matching candidates. Filter by job type, age, ERA score, gender, and location — then select and broadcast.'
  },
  {
    tab: 'jobs',
    targetFn: function() {
      var btns = document.querySelectorAll('.jo-panel-actions .btn-green');
      return btns[0] || document.querySelector('.jo-panel-actions');
    },
    title: '+ Add Button',
    body: 'Manually add a specific candidate to this job order when you already know who to place. Use this for direct referrals or AI Matcher picks.'
  },
  {
    tab: 'candidates',
    targetFn: function() { return document.querySelectorAll('.tab')[1] || null; },
    title: 'Candidates Tab',
    body: 'Your full candidate pool. Use the filter bar to narrow by job type, location, ERA score, age, gender, or setup. Click any card to open their full profile.'
  },
  {
    tab: 'candidates',
    targetFn: function() { return document.querySelector('#cand-container .cand-card-actions .btn-green') || document.getElementById('cand-container'); },
    title: '+ Add to Job Order',
    body: 'From any candidate card, click "+ Add to Job Order" to assign them directly to an open job order without leaving the Candidates tab.'
  },
];

var _tourStep = 0;
var _tourActive = false;

function startTour(fromHelp) {
  _tourStep = 0;
  _tourActive = true;
  var ov = document.getElementById('tour-overlay');
  var tt = document.getElementById('tour-tooltip');
  if (ov) ov.classList.add('active');
  if (tt) tt.style.display = 'block';
  _showTourStep();
}

function _showTourStep() {
  var step = TOUR_STEPS[_tourStep];
  if (!step) { endTour(); return; }
  if (step.tab) {
    switchTab(step.tab);
    setTimeout(_positionTour, 320);
  } else {
    _positionTour();
  }
}

function _positionTour() {
  var step = TOUR_STEPS[_tourStep];
  var hl = document.getElementById('tour-highlight');
  var tt = document.getElementById('tour-tooltip');
  if (!hl || !tt) return;

  var target = step.targetFn();
  if (target) {
    var r = target.getBoundingClientRect();
    var pad = 6;
    hl.style.top    = (r.top    - pad) + 'px';
    hl.style.left   = (r.left   - pad) + 'px';
    hl.style.width  = (r.width  + pad*2) + 'px';
    hl.style.height = (r.height + pad*2) + 'px';
    hl.style.opacity = '1';

    var mobile = window.innerWidth < 640;
    var ttW = mobile ? window.innerWidth - 24 : 320;
    var ttH = 200;
    var spaceBelow = window.innerHeight - r.bottom;
    var spaceAbove = r.top;
    var left = Math.max(12, Math.min(r.left, window.innerWidth - ttW - 12));
    var top;
    if (!mobile && spaceBelow > ttH + 20) {
      top = r.bottom + 14;
    } else if (spaceAbove > ttH + 20) {
      top = r.top - ttH - 14;
    } else {
      top = Math.max(60, r.bottom + 10);
      left = 12;
    }
    tt.style.top  = top  + 'px';
    tt.style.left = left + 'px';
    tt.style.transform = '';
  } else {
    hl.style.opacity = '0';
    tt.style.top = '50%';
    tt.style.left = '50%';
    tt.style.transform = 'translate(-50%,-50%)';
  }

  document.getElementById('tour-step-lbl').textContent = 'Step ' + (_tourStep+1) + ' of ' + TOUR_STEPS.length;
  document.getElementById('tour-title').textContent = step.title;
  document.getElementById('tour-body').textContent  = step.body;
  document.getElementById('tour-prev').style.display = _tourStep > 0 ? '' : 'none';
  var isLast = _tourStep === TOUR_STEPS.length - 1;
  var nxt = document.getElementById('tour-next');
  nxt.textContent = isLast ? 'Done ✓' : 'Next →';
}

function tourNext() {
  if (_tourStep >= TOUR_STEPS.length - 1) { endTour(); return; }
  _tourStep++;
  _showTourStep();
}

function tourPrev() {
  if (_tourStep > 0) { _tourStep--; _showTourStep(); }
}

function skipTour() { endTour(); }

function endTour() {
  _tourActive = false;
  var ov = document.getElementById('tour-overlay');
  var hl = document.getElementById('tour-highlight');
  var tt = document.getElementById('tour-tooltip');
  if (ov) ov.classList.remove('active');
  if (hl) hl.style.opacity = '0';
  if (tt) tt.style.display = 'none';
  if (typeof window._fbMarkTourSeen === 'function') window._fbMarkTourSeen();
  showToast('Tour complete! Open Help anytime to relaunch.', 'green');
}

function checkAndStartTour() {
  if (isAdmin()) return;
  if (window._fbHasSeenTour === true) return;
  setTimeout(startTour, 900);
}

// ═══════════════════════════════════════════════
// HELP MODAL
// ═══════════════════════════════════════════════

function openHelpModal() {
  document.getElementById('help-modal-overlay').classList.add('open');
}
function closeHelpModal() {
  document.getElementById('help-modal-overlay').classList.remove('open');
}

// ═══════════════════════════════════════════════
// INTERVIEW SESSIONS
// ═══════════════════════════════════════════════

function getInterviewSessions(joId) {
  try { return JSON.parse(localStorage.getItem('jo_interview_sessions_' + joId) || '[]'); } catch(e) { return []; }
}

function saveInterviewSessions(joId, sessions) {
  _lsSet('jo_interview_sessions_' + joId, sessions);
  if (typeof window._fbSdkSet === 'function') {
    var fbMap = {};
    sessions.forEach(function(s) { fbMap[s.id] = s; });
    window._fbLastWrite = Date.now();
    window._fbSdkSet('interviewSessions/' + joId, sessions.length ? fbMap : null);
  }
}

function addCandidateToInterviewSession(joId, pid) {
  var sessions = getInterviewSessions(joId);
  var alreadyIn = sessions.some(function(s) {
    return s.status !== 'cancelled' && s.candidateIds && s.candidateIds.indexOf(pid) !== -1;
  });
  if (alreadyIn) return;
  var draft = null;
  for (var i = 0; i < sessions.length; i++) {
    if (sessions[i].status === 'draft') { draft = sessions[i]; break; }
  }
  if (!draft) {
    var activeCount = sessions.filter(function(s) { return s.status !== 'cancelled'; }).length;
    draft = {
      id: 'sess_' + Date.now(),
      name: 'Session ' + (activeCount + 1),
      date: '', time: '', location: '', notes: '', setup: 'In Person',
      candidateIds: [], status: 'draft',
      outcome: null, selectedCandidateId: null,
      createdAt: new Date().toISOString()
    };
    sessions.push(draft);
  }
  draft.candidateIds.push(pid);
  saveInterviewSessions(joId, sessions);
}

function buildIsessSection(jo, joPlacements) {
  var sessions = getInterviewSessions(jo.id);
  if (!sessions || !sessions.length) return null;
  // Display-only filter: cancelled sessions are hidden by default but the
  // records stay intact in storage. A muted toggle reveals them on demand.
  var visible   = sessions.filter(function(s) { return s.status !== 'cancelled'; });
  var cancelled = sessions.filter(function(s) { return s.status === 'cancelled'; });
  if (!visible.length && !cancelled.length) return null;
  var el = document.createElement('div');
  el.className = 'isess-section';
  el.id = 'isess-' + jo.id;
  var visibleHtml = visible.map(function(sess) { return buildIsessCard(jo, sess, joPlacements); }).join('');
  var cancelledHtml = '';
  if (cancelled.length) {
    var wrapId = 'isess-cancelled-' + jo.id;
    var togId  = 'isess-cancelled-tog-' + jo.id;
    var showLabel = 'Show cancelled (' + cancelled.length + ')';
    var hideLabel = 'Hide cancelled (' + cancelled.length + ')';
    cancelledHtml =
      '<button id="' + togId + '" class="btn btn-ghost" style="font-size:11px;padding:4px 10px;color:var(--text3);margin-top:6px" ' +
        'onclick="(function(){var w=document.getElementById(\'' + wrapId + '\');var t=document.getElementById(\'' + togId + '\');' +
          'var open=w.style.display!==\'none\';w.style.display=open?\'none\':\'\';' +
          't.textContent=open?\'' + showLabel + '\':\'' + hideLabel + '\';})()">' +
        showLabel +
      '</button>' +
      '<div id="' + wrapId + '" style="display:none;margin-top:10px">' +
        cancelled.map(function(sess) { return buildIsessCard(jo, sess, joPlacements); }).join('') +
      '</div>';
  }
  el.innerHTML = '<div class="isess-section-title">Interview Sessions</div>' + visibleHtml + cancelledHtml;
  return el;
}

function buildIsessCard(jo, sess, joPlacements) {
  var badgeCls = { draft:'isess-badge-draft', scheduled:'isess-badge-scheduled', completed:'isess-badge-completed', cancelled:'isess-badge-cancelled' }[sess.status] || 'isess-badge-draft';
  var badgeLbl = sess.status.charAt(0).toUpperCase() + sess.status.slice(1);
  var dateStr = 'Not yet scheduled';
  if (sess.date && sess.time) {
    try {
      var d = new Date(sess.date + 'T' + sess.time);
      dateStr = d.toLocaleDateString('en-PH', { month:'short', day:'numeric', year:'numeric' }) + ' at ' + sess.time;
    } catch(e) { dateStr = sess.date + ' ' + sess.time; }
  }
  var metaParts = ['<span>' + escHtml(dateStr) + '</span>'];
  if (sess.setup) metaParts.push('<span>' + escHtml(sess.setup) + '</span>');
  if (sess.location) metaParts.push('<span>' + escHtml(sess.location) + '</span>');
  var candIds = sess.candidateIds || [];
  var candHtml = candIds.length ? candIds.map(function(pid) {
    var p = joPlacements.find(function(x) { return (x.placementId || x.candidateId) === pid; });
    var name = p ? escHtml(p.candidateName || p.candidateId || pid) : escHtml(pid);
    var era = calcERA(p ? p.candidateId : pid);
    var eraStr = (era && typeof era.score === 'number') ? ' <span style="font-size:10px;color:var(--text3)">ERA ' + era.score.toFixed(1) + '</span>' : '';
    return '<div class="isess-cand">' + name + eraStr + '</div>';
  }).join('') : '<div class="isess-cand" style="color:var(--text3);font-style:italic">No candidates yet</div>';
  var jA = escAttr(jo.id), sA = escAttr(sess.id);
  var btns = '';
  if (sess.status === 'draft') {
    btns += '<button class="btn btn-ghost" style="font-size:11px;padding:4px 10px" onclick="openIsessDateModal(\'' + jA + '\',\'' + sA + '\')">Set Date &amp; Time</button>';
  }
  if (sess.status === 'scheduled') {
    btns += '<button class="btn btn-green" style="font-size:11px;padding:4px 10px" onclick="openIsessCompleteModal(\'' + jA + '\',\'' + sA + '\')">Mark Complete</button>';
    btns += '<button class="btn btn-ghost" style="font-size:11px;padding:4px 10px" onclick="openIsessDateModal(\'' + jA + '\',\'' + sA + '\')">Edit</button>';
  }
  if (sess.status !== 'cancelled' && sess.status !== 'completed') {
    btns += '<button class="btn btn-ghost" style="font-size:11px;padding:4px 10px;color:var(--red)" onclick="cancelIsess(\'' + jA + '\',\'' + sA + '\')">Cancel</button>';
  }
  btns += '<button class="btn btn-ghost" style="font-size:11px;padding:4px 10px" onclick="copyIsessSummary(\'' + jA + '\',\'' + sA + '\')">Copy Summary</button>';
  return '<div class="isess-card">' +
    '<div class="isess-header"><span class="isess-name">' + escHtml(sess.name) + '</span><span class="isess-badge ' + badgeCls + '">' + badgeLbl + '</span></div>' +
    '<div class="isess-meta">' + metaParts.join('') + '</div>' +
    '<div class="isess-cands">' + candHtml + '</div>' +
    '<div class="isess-actions">' + btns + '</div>' +
    '</div>';
}

function openIsessDateModal(joId, sessId) {
  var sessions = getInterviewSessions(joId);
  var sess = sessions.find(function(s) { return s.id === sessId; });
  if (!sess) return;
  document.getElementById('isess-modal-jo-id').value   = joId;
  document.getElementById('isess-modal-sess-id').value = sessId;
  document.getElementById('isess-modal-name').value     = sess.name || '';
  document.getElementById('isess-modal-date').value     = sess.date || '';
  document.getElementById('isess-modal-time').value     = sess.time || '';
  document.getElementById('isess-modal-setup').value    = sess.setup || 'In Person';
  document.getElementById('isess-modal-location').value = sess.location || '';
  document.getElementById('isess-modal-notes').value    = sess.notes || '';
  var allP = [].concat(placements, manualPlacements);
  var names = (sess.candidateIds || []).map(function(pid) {
    var p = allP.find(function(x) { return (x.placementId || x.candidateId) === pid; });
    return p ? (p.candidateName || pid) : pid;
  });
  document.getElementById('isess-modal-cand-list').textContent = names.length ? names.join(', ') : 'No candidates yet';
  openModal('modal-isess-date');
}

function saveIsessDate() {
  var joId   = document.getElementById('isess-modal-jo-id').value;
  var sessId = document.getElementById('isess-modal-sess-id').value;
  var date   = document.getElementById('isess-modal-date').value;
  var time   = document.getElementById('isess-modal-time').value;
  if (!date || !time) { showToast('Date and time are required.', 'red'); return; }
  var sessions = getInterviewSessions(joId);
  var sess = sessions.find(function(s) { return s.id === sessId; });
  if (!sess) { showToast('Session not found.', 'red'); return; }
  sess.name     = document.getElementById('isess-modal-name').value.trim() || sess.name;
  sess.date     = date;
  sess.time     = time;
  sess.setup    = document.getElementById('isess-modal-setup').value;
  sess.location = document.getElementById('isess-modal-location').value.trim();
  sess.notes    = document.getElementById('isess-modal-notes').value.trim();
  sess.status   = 'scheduled';
  (sess.candidateIds || []).forEach(function(pid) { saveProwExtra(pid, 'dispositionStage', 'Interview Scheduled'); });
  saveInterviewSessions(joId, sessions);
  closeModal('modal-isess-date');
  showToast('Session scheduled — ' + (sess.candidateIds||[]).length + ' candidate(s) set to Interview Scheduled.', 'green');
  renderJobOrders([].concat(placements, manualPlacements));
}

function openIsessCompleteModal(joId, sessId) {
  var sessions = getInterviewSessions(joId);
  var sess = sessions.find(function(s) { return s.id === sessId; });
  if (!sess) return;
  document.getElementById('isess-complete-jo-id').value   = joId;
  document.getElementById('isess-complete-sess-id').value = sessId;
  document.getElementById('isess-complete-outcome').value = '';
  var hiredRow = document.getElementById('isess-complete-hired-row');
  if (hiredRow) hiredRow.style.display = 'none';
  var sel = document.getElementById('isess-complete-hired-sel');
  sel.innerHTML = '<option value="">-- Select candidate --</option>';
  var allP = [].concat(placements, manualPlacements);
  (sess.candidateIds || []).forEach(function(pid) {
    var p = allP.find(function(x) { return (x.placementId || x.candidateId) === pid; });
    var opt = document.createElement('option');
    opt.value = pid;
    opt.textContent = p ? (p.candidateName || pid) : pid;
    sel.appendChild(opt);
  });
  openModal('modal-isess-complete');
}

function _isessUpdateCompleteUI() {
  var outcome = document.getElementById('isess-complete-outcome').value;
  var row = document.getElementById('isess-complete-hired-row');
  if (row) row.style.display = outcome === 'selected' ? '' : 'none';
}

function confirmIsessComplete() {
  var joId    = document.getElementById('isess-complete-jo-id').value;
  var sessId  = document.getElementById('isess-complete-sess-id').value;
  var outcome = document.getElementById('isess-complete-outcome').value;
  if (!outcome) { showToast('Please select an outcome.', 'red'); return; }
  var hiredPid = '';
  if (outcome === 'selected') {
    hiredPid = document.getElementById('isess-complete-hired-sel').value;
    if (!hiredPid) { showToast('Please select the hired candidate.', 'red'); return; }
  }
  var sessions = getInterviewSessions(joId);
  var sess = sessions.find(function(s) { return s.id === sessId; });
  if (!sess) { showToast('Session not found.', 'red'); return; }
  sess.status = 'completed'; sess.outcome = outcome; sess.selectedCandidateId = hiredPid || null;
  var mpChanged = false;
  (sess.candidateIds || []).forEach(function(pid) {
    var mp = manualPlacements.find(function(x) { return x.placementId === pid; });
    if (outcome === 'selected') {
      if (pid === hiredPid) {
        saveProwExtra(pid, 'status', 'Hired'); saveProwExtra(pid, 'dispositionStage', 'Hired ✓');
        if (mp) { mp.status = 'Hired'; mp.dispositionStage = 'Hired ✓'; mpChanged = true; }
        // Fire commission via the unified side-effects helper — this path used
        // to silently skip computeAndSaveCommission because it writes Status
        // directly through saveProwExtra, not through the old saveProwField path.
        _applyStageSideEffects(pid, 'Hired ✓');
      } else {
        saveProwExtra(pid, 'status', 'Dropped'); saveProwExtra(pid, 'dispositionStage', 'Dropped / Unavailable');
        if (mp) { mp.status = 'Dropped'; mp.dispositionStage = 'Dropped / Unavailable'; mpChanged = true; }
      }
    } else {
      saveProwExtra(pid, 'status', 'Interviewed'); saveProwExtra(pid, 'dispositionStage', '');
      if (mp) { mp.status = 'Interviewed'; mp.dispositionStage = ''; mpChanged = true; }
    }
  });
  if (mpChanged) saveManualPlacements();
  saveInterviewSessions(joId, sessions);
  closeModal('modal-isess-complete');
  showToast(outcome === 'selected'
    ? 'Done — 1 hired, ' + ((sess.candidateIds||[]).length - 1) + ' dropped.'
    : 'Session complete — ' + (sess.candidateIds||[]).length + ' candidate(s) set to Interviewed.', 'green');
  renderJobOrders([].concat(placements, manualPlacements));
}

function cancelIsess(joId, sessId) {
  if (!confirm('Cancel this interview session?')) return;
  var sessions = getInterviewSessions(joId);
  var sess = sessions.find(function(s) { return s.id === sessId; });
  if (sess) sess.status = 'cancelled';
  saveInterviewSessions(joId, sessions);
  showToast('Session cancelled.', 'orange');
  renderJobOrders([].concat(placements, manualPlacements));
}
// Re-render helper used from overview action buttons
function _iovRerender() { renderJobOrders([...placements,...manualPlacements]); }

function copyIsessSummary(joId, sessId) {
  var sessions = getInterviewSessions(joId);
  var sess = sessions.find(function(s) { return s.id === sessId; });
  if (!sess) return;
  var jo = jobOrders.find(function(j) { return j.id === joId; });
  var dtStr = 'TBD';
  if (sess.date && sess.time) {
    try {
      var d = new Date(sess.date + 'T' + sess.time);
      dtStr = d.toLocaleDateString('en-PH', { month:'long', day:'numeric', year:'numeric' }) + ' at ' + sess.time;
    } catch(e) { dtStr = sess.date + ' ' + sess.time; }
  }
  var allP = [].concat(placements, manualPlacements);
  var candLines = (sess.candidateIds || []).map(function(pid) {
    var p = allP.find(function(x) { return (x.placementId || x.candidateId) === pid; });
    var name = p ? (p.candidateName || pid) : pid;
    var c = p ? candidates.find(function(cd) { return cd.id === p.candidateId; }) : null;
    var jt = c ? (c.jobTypeFormatted || c.jobType || '') : '';
    var era = calcERA(p ? p.candidateId : pid);
    var eraStr = (era && typeof era.score === 'number') ? era.score.toFixed(1) : 'N/A';
    return '• ' + name + (jt ? ' — ' + jt : '') + ' — ERA ' + eraStr;
  }).join('\n') || '(none)';
  var lines = [
    'INTERVIEW SCHEDULE — ' + (jo ? jo.position : joId) + ' (' + joId + ')',
    'Employer: ' + (jo ? jo.company : ''),
    'Session: ' + sess.name,
    'Date & Time: ' + dtStr,
    'Setup: ' + (sess.setup || 'In Person'),
    'Location/Link: ' + (sess.location || 'TBD'),
    '', 'Candidates:', candLines
  ];
  if (sess.notes && sess.notes.trim()) { lines.push(''); lines.push('Notes: ' + sess.notes.trim()); }
  var text = lines.join('\n');
  var fallback = function() {
    var ta = document.createElement('textarea'); ta.value = text;
    ta.style.cssText = 'position:fixed;opacity:0'; document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); showToast('Summary copied!', 'green'); } catch(e) { showToast('Copy failed.', 'red'); }
    document.body.removeChild(ta);
  };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(function() { showToast('Summary copied!', 'green'); }).catch(fallback);
  } else { fallback(); }
}

// ═══════════════════════════════════════════════
// INTERVIEW OVERVIEW
// ═══════════════════════════════════════════════
window._iviewMode = 'list'; // 'list' | 'calendar'

function buildInterviewViewToggle() {
  var div = document.createElement('div');
  div.style.cssText = 'display:flex;gap:6px;align-items:center;margin-bottom:14px;flex-wrap:wrap';
  div.innerHTML =
    '<button class="jo-status-filter-btn sfactive" onclick="window._joMainView=\'orders\';renderJobOrders([...placements,...manualPlacements])" style="color:var(--text2)">← Job Orders</button>' +
    '<span style="flex:1"></span>' +
    '<button id="iov-btn-list" class="jo-status-filter-btn' + (window._iviewMode==='list' ? ' sfactive' : '') + '" onclick="window._iviewMode=\'list\';renderJobOrders([...placements,...manualPlacements])">☰ List</button>' +
    '<button id="iov-btn-cal"  class="jo-status-filter-btn' + (window._iviewMode==='calendar' ? ' sfactive' : '') + '" onclick="window._iviewMode=\'calendar\';renderJobOrders([...placements,...manualPlacements])">📅 Calendar</button>' +
    '<button class="btn btn-green" style="font-size:12px;padding:6px 14px" onclick="openScheduleInterviewModal()">+ Schedule Interview</button>';
  return div;
}

function _getAllSessions() {
  var all = [];
  jobOrders.forEach(function(jo) {
    var sessions = getInterviewSessions(jo.id);
    sessions.forEach(function(sess) { all.push({ jo: jo, sess: sess }); });
  });
  return all;
}

function buildInterviewOverview() {
  var all = _getAllSessions();
  var allP = [...placements, ...manualPlacements];
  var today = new Date(); today.setHours(0,0,0,0);
  var weekEnd = new Date(today); weekEnd.setDate(weekEnd.getDate() + 7);

  var upcoming = all.filter(function(e) {
    if (e.sess.status === 'cancelled') return false;
    if (!e.sess.date) return true; // draft — count as upcoming
    var d = new Date(e.sess.date); d.setHours(0,0,0,0);
    return d >= today;
  });
  var thisWeek = upcoming.filter(function(e) {
    if (!e.sess.date) return false;
    var d = new Date(e.sess.date); d.setHours(0,0,0,0);
    return d >= today && d <= weekEnd;
  });
  var candCount = 0;
  upcoming.forEach(function(e) { if (e.sess.status !== 'completed') candCount += (e.sess.candidateIds || []).length; });

  var summaryBar = '<div class="iov-summary-bar">' +
    '<div class="iov-stat"><div class="iov-stat-label">Upcoming Interviews</div><div class="iov-stat-val">' + upcoming.length + '</div></div>' +
    '<div class="iov-stat"><div class="iov-stat-label">Sessions This Week</div><div class="iov-stat-val">' + thisWeek.length + '</div></div>' +
    '<div class="iov-stat"><div class="iov-stat-label">Candidates Awaiting</div><div class="iov-stat-val">' + candCount + '</div></div>' +
    '</div>';

  var div = document.createElement('div');
  div.innerHTML = summaryBar + (window._iviewMode === 'calendar' ? buildInterviewCalendar(all, allP) : buildInterviewList(all, allP));
  return div;
}

function buildInterviewList(all, allP) {
  // Group by JO
  var joMap = {};
  all.forEach(function(e) {
    if (e.sess.status === 'cancelled') return;
    if (!joMap[e.jo.id]) joMap[e.jo.id] = { jo: e.jo, sessions: [] };
    joMap[e.jo.id].sessions.push(e.sess);
  });
  var joGroups = Object.values(joMap).sort(function(a, b) {
    var nextA = a.sessions.filter(function(s){return s.date;}).sort(function(x,y){return x.date.localeCompare(y.date);})[0];
    var nextB = b.sessions.filter(function(s){return s.date;}).sort(function(x,y){return x.date.localeCompare(y.date);})[0];
    if (!nextA && !nextB) return 0;
    if (!nextA) return 1;
    if (!nextB) return -1;
    return nextA.date.localeCompare(nextB.date);
  });
  if (!joGroups.length) return '<div style="padding:32px;text-align:center;color:var(--text3);font-family:var(--mono)">No interview sessions yet. Click "+ Schedule Interview" to create one.</div>';
  return joGroups.map(function(g) {
    var jo = g.jo;
    var sessSorted = g.sessions.slice().sort(function(a, b) {
      if (!a.date) return 1; if (!b.date) return -1;
      return (a.date + (a.time||'')).localeCompare(b.date + (b.time||''));
    });
    var header = '<div class="iov-employer-header">' +
      '<span style="font-family:var(--mono);font-size:11px;color:var(--accent);background:var(--accent-dim);padding:2px 7px;border-radius:5px">' + escHtml(jo.id) + '</span>' +
      '<span>' + escHtml(jo.company) + '</span>' +
      '<span style="font-size:12px;color:var(--text3)">— ' + escHtml(jo.position) + '</span>' +
    '</div>';
    var sessBlocks = sessSorted.map(function(sess) { return buildIovSessionBlock(jo, sess, allP); }).join('');
    return '<div class="iov-employer-group">' + header + sessBlocks + '</div>';
  }).join('');
}

function buildInterviewCalendar(all, allP) {
  // Group sessions by date
  var dateMap = {};
  all.forEach(function(e) {
    if (e.sess.status === 'cancelled') return;
    var dk = e.sess.date || '_noddate';
    if (!dateMap[dk]) dateMap[dk] = [];
    dateMap[dk].push(e);
  });
  var today = new Date(); today.setHours(0,0,0,0);
  var todayStr = today.toISOString().split('T')[0];
  var sortedDates = Object.keys(dateMap).sort();

  if (!sortedDates.length) return '<div style="padding:32px;text-align:center;color:var(--text3);font-family:var(--mono)">No sessions scheduled.</div>';

  return sortedDates.map(function(dk) {
    var entries = dateMap[dk].slice().sort(function(a, b) { return (a.sess.time||'').localeCompare(b.sess.time||''); });
    var dayLabel, dayClass = 'iov-cal-date';
    if (dk === '_noddate') { dayLabel = 'Not Yet Scheduled (Draft)'; }
    else {
      var d = new Date(dk + 'T00:00:00');
      dayLabel = d.toLocaleDateString('en-PH', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
      if (dk === todayStr) { dayLabel = 'TODAY — ' + dayLabel; dayClass += ' today'; }
      else if (dk < todayStr) { dayClass += ' past'; }
    }
    var blocks = entries.map(function(e) { return buildIovSessionBlock(e.jo, e.sess, allP); }).join('');
    return '<div class="iov-cal-day"><div class="' + dayClass + '">' + escHtml(dayLabel) + '</div>' + blocks + '</div>';
  }).join('');
}

function buildIovSessionBlock(jo, sess, allP) {
  var badgeCls = { draft:'isess-badge-draft', scheduled:'isess-badge-scheduled', completed:'isess-badge-completed', cancelled:'isess-badge-cancelled' }[sess.status] || 'isess-badge-draft';
  var badgeLbl = sess.status.charAt(0).toUpperCase() + sess.status.slice(1);
  var dateStr = '';
  if (sess.date && sess.time) {
    try {
      var d = new Date(sess.date + 'T' + sess.time);
      dateStr = d.toLocaleDateString('en-PH', { month:'short', day:'numeric' }) + ' · ' + sess.time;
    } catch(e) { dateStr = sess.date + ' ' + sess.time; }
  }
  var meta = [dateStr, sess.setup, sess.location].filter(Boolean).map(escHtml).join(' · ');
  var candHtml = (sess.candidateIds || []).length ? (sess.candidateIds || []).map(function(pid) {
    var p = allP.find(function(x) { return (x.placementId || x.candidateId) === pid; });
    var name = p ? escHtml(p.candidateName || pid) : escHtml(pid);
    var c = p ? candidates.find(function(cd) { return cd.id === p.candidateId; }) : null;
    var jt = c ? (c.jobTypeFormatted || c.jobType || '') : '';
    var era = calcERA(p ? p.candidateId : pid);
    var eraStr = (era && typeof era.score === 'number') ? era.score.toFixed(1) : '—';
    var eraCol = era.score >= 7 ? 'var(--green)' : era.score >= 5 ? 'var(--gold)' : 'var(--red)';
    return '<div class="iov-cand-row"><span style="font-size:10px;color:var(--text3)">•</span>' + name + (jt ? '<span style="color:var(--text3)">— ' + escHtml(jt) + '</span>' : '') + '<span style="font-family:var(--mono);font-size:10px;font-weight:700;color:' + eraCol + ';margin-left:auto">ERA ' + eraStr + '</span></div>';
  }).join('') : '<div style="font-size:11px;color:var(--text3);font-style:italic;padding:3px 0">No candidates added yet</div>';

  var jA = escAttr(jo.id), sA = escAttr(sess.id);
  var editBtn = (sess.status === 'draft' || sess.status === 'scheduled')
    ? '<button class="btn btn-ghost" style="font-size:11px;padding:4px 10px" onclick="openIsessDateModal(\'' + jA + '\',\'' + sA + '\')">Edit</button>' : '';
  var completeBtn = sess.status === 'scheduled'
    ? '<button class="btn btn-green" style="font-size:11px;padding:4px 10px" onclick="openIsessCompleteModal(\'' + jA + '\',\'' + sA + '\')">Mark Complete</button>' : '';
  var cancelBtn = (sess.status !== 'cancelled' && sess.status !== 'completed')
    ? '<button class="btn btn-ghost" style="font-size:11px;padding:4px 10px;color:var(--red)" onclick="cancelIsess(\'' + jA + '\',\'' + sA + '\');renderJobOrders([...placements,...manualPlacements])">Cancel</button>' : '';
  var copyBtn = '<button class="btn btn-ghost" style="font-size:11px;padding:4px 10px" onclick="copyIsessSummary(\'' + jA + '\',\'' + sA + '\')">Copy Summary</button>';

  return '<div class="iov-session-block">' +
    '<div class="iov-session-header">' +
      '<span class="iov-session-name">' + escHtml(sess.name) + '</span>' +
      '<span class="isess-badge ' + badgeCls + '">' + badgeLbl + '</span>' +
      (meta ? '<span class="iov-session-meta" style="margin:0">' + meta + '</span>' : '') +
    '</div>' +
    '<div>' + candHtml + '</div>' +
    '<div class="iov-session-actions">' + editBtn + completeBtn + cancelBtn + copyBtn + '</div>' +
    '</div>';
}

function openScheduleInterviewModal() {
  // Populate JO select with active JOs
  var sel = document.getElementById('si-jo-select');
  sel.innerHTML = '<option value="">— Select Job Order —</option>' +
    jobOrders.filter(function(jo){ return jo.status === 'Active'; }).map(function(jo) {
      return '<option value="' + escAttr(jo.id) + '">' + escHtml(jo.id) + ' — ' + escHtml(jo.position) + ' @ ' + escHtml(jo.company) + '</option>';
    }).join('');
  // Clear candidate list
  document.getElementById('si-cand-list').innerHTML = '<div style="color:var(--text3);font-size:12px">Select a job order first.</div>';
  document.getElementById('si-name').value = '';
  document.getElementById('si-date').value = '';
  document.getElementById('si-time').value = '09:00';
  document.getElementById('si-setup').value = 'In Person';
  document.getElementById('si-location').value = '';
  document.getElementById('si-notes').value = '';
  openModal('modal-sched-interview');
}

function schedInterviewJoChange(joId) {
  var listEl = document.getElementById('si-cand-list');
  var nameEl = document.getElementById('si-name');
  if (!joId) { listEl.innerHTML = '<div style="color:var(--text3);font-size:12px">Select a job order first.</div>'; return; }
  var allP = [...placements, ...manualPlacements].filter(function(p) { return p.jobOrderId === joId; });
  var eligible = allP.filter(function(p) {
    var ex = {}; try { ex = JSON.parse(localStorage.getItem('prow_extra_' + (p.placementId || p.candidateId)) || '{}'); } catch(e) {}
    var stage = getEffectiveStage(ex, p);
    return stage === 'For Employer Review' || stage === 'Confirmed Interested' || stage === 'Called' || stage === 'Confirmed' || stage === 'Interview Scheduled';
  });
  // Auto-generate session name
  var existingSessions = getInterviewSessions(joId).filter(function(s){ return s.status !== 'cancelled'; });
  nameEl.value = 'Session ' + (existingSessions.length + 1);
  if (!eligible.length) {
    listEl.innerHTML = '<div style="color:var(--text3);font-size:12px">No eligible candidates (need Confirmed Interested or For Employer Review stage).</div>';
    return;
  }
  listEl.innerHTML = eligible.map(function(p) {
    var pid = p.placementId || p.candidateId;
    var era = calcERA(p ? p.candidateId : pid);
    var eraStr = (era && typeof era.score === 'number') ? ' ERA ' + era.score.toFixed(1) : '';
    return '<label style="display:flex;align-items:center;gap:8px;padding:5px 4px;cursor:pointer;font-size:12px">' +
      '<input type="checkbox" data-pid="' + escAttr(pid) + '" style="width:15px;height:15px;accent-color:var(--accent)">' +
      '<span>' + escHtml(p.candidateName || pid) + '</span>' +
      '<span style="color:var(--text3);font-size:10px;margin-left:auto">' + escHtml(eraStr) + '</span>' +
    '</label>';
  }).join('');
}

function saveScheduleInterview() {
  var joId = document.getElementById('si-jo-select').value;
  var name = document.getElementById('si-name').value.trim();
  var date = document.getElementById('si-date').value;
  var time = document.getElementById('si-time').value;
  if (!joId) { showToast('Please select a job order.', 'red'); return; }
  if (!name) { showToast('Session name is required.', 'red'); return; }
  if (!date || !time) { showToast('Date and time are required.', 'red'); return; }

  var selectedPids = [];
  document.querySelectorAll('#si-cand-list input[type=checkbox]:checked').forEach(function(cb) {
    selectedPids.push(cb.dataset.pid);
  });

  var sessions = getInterviewSessions(joId);
  var newSess = {
    id: 'sess_' + Date.now(),
    name: name, date: date, time: time,
    setup: document.getElementById('si-setup').value,
    location: document.getElementById('si-location').value.trim(),
    notes: document.getElementById('si-notes').value.trim(),
    candidateIds: selectedPids,
    status: 'scheduled',
    outcome: null, selectedCandidateId: null,
    createdAt: new Date().toISOString()
  };
  sessions.push(newSess);

  // Move selected candidates to Interview Scheduled stage
  selectedPids.forEach(function(pid) { saveProwExtra(pid, 'dispositionStage', 'Interview Scheduled'); });

  saveInterviewSessions(joId, sessions);
  closeModal('modal-sched-interview');
  showToast('Session created — ' + selectedPids.length + ' candidate(s) set to Interview Scheduled.', 'green');
  renderJobOrders([...placements, ...manualPlacements]);
}


// ═══════════════════════════════════════════════
// LOGIN (merged from inline login script)
// ═══════════════════════════════════════════════
function doLogin(){
  var e=document.getElementById('login-email').value.trim(),p=document.getElementById('login-password').value;
  var err=document.getElementById('login-error'),btn=document.getElementById('login-btn');
  err.style.display='none';
  if(!e||!p){err.textContent='Please enter your email and password.';err.style.display='block';return;}
  btn.textContent='Signing in…';btn.disabled=true;
  window._fbSignIn(e,p).catch(function(ex){
    btn.textContent='Sign In';btn.disabled=false;
    var m={'auth/invalid-credential':'Incorrect email or password.','auth/wrong-password':'Incorrect password.','auth/user-not-found':'No account found.','auth/too-many-requests':'Too many attempts. Try later.'};
    err.textContent=m[ex.code]||'Sign in failed. Try again.';err.style.display='block';
  });
}
loadAll().then(function() {
  loadFirebaseRoleConfig().then(function() {
    if (window._currentUserEmail) {
      currentUserEmail = window._currentUserEmail;
      currentUserRole  = getUserRole(currentUserEmail);
      applyRoleUI();
    }
  });
  initCandFilters();
});
