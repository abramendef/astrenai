"use strict";

// Keys for localStorage
const SETTINGS_KEY = "astren_settings";
const HISTORY_KEY = "astren_history";

// Default settings
const DEFAULT_SETTINGS = {
  apiBase: "",
  sendHistory: true,
  useSystemPrompt: false,
  systemPrompt: ""
};

// Default API Base (used only if no settings are stored yet)
const DEFAULT_TEST_API = "http://localhost:8000";

// Elements
const chatEl = document.getElementById("chat");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const clearBtn = document.getElementById("clearBtn");
const copyLastBtn = document.getElementById("copyLastBtn");
const exportBtn = document.getElementById("exportBtn");
const statusBar = document.getElementById("statusBar");

// Settings modal elements
const openSettingsBtn = document.getElementById("openSettingsBtn");
const settingsModal = document.getElementById("settingsModal");
const closeSettingsBtn = document.getElementById("closeSettingsBtn");
const saveSettingsBtn = document.getElementById("saveSettingsBtn");
const cancelSettingsBtn = document.getElementById("cancelSettingsBtn");
const apiBaseInput = document.getElementById("apiBaseInput");
const sendHistoryToggle = document.getElementById("sendHistoryToggle");
const useSystemPromptToggle = document.getElementById("useSystemPromptToggle");
const systemPromptInput = document.getElementById("systemPromptInput");

// In-memory state
let settings = loadSettings();
let history = loadHistory();

// If first run and apiBase is empty, initialize with default test URL and persist
if (!settings.apiBase) {
  settings.apiBase = DEFAULT_TEST_API;
  saveSettings();
}

// Initialize UI with settings
applySettingsToUI(settings);
renderHistory();
scrollToBottom();

// Event listeners
sendBtn.addEventListener("click", onSend);
clearBtn.addEventListener("click", onClear);
copyLastBtn.addEventListener("click", onCopyLast);
exportBtn.addEventListener("click", onExport);

messageInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    onSend();
  }
});

openSettingsBtn.addEventListener("click", () => openModal(settingsModal));
closeSettingsBtn.addEventListener("click", () => closeModal(settingsModal));
cancelSettingsBtn.addEventListener("click", () => closeModal(settingsModal));
saveSettingsBtn.addEventListener("click", onSaveSettings);

settingsModal.addEventListener("click", (e) => {
  if (e.target === settingsModal) closeModal(settingsModal);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !settingsModal.classList.contains("hidden")) {
    closeModal(settingsModal);
  }
});

function onSend() {
  clearStatus();
  const userText = messageInput.value.trim();
  if (!userText) return;

  if (!settings.apiBase) {
    showError("Configura la API Base en Settings.");
    openModal(settingsModal);
    return;
  }

  const messageToSend = settings.useSystemPrompt && settings.systemPrompt
    ? `${settings.systemPrompt.trim()}\n\n${userText}`
    : userText;

  // Add user message to UI immediately, but do not include in payload history
  const userMsg = { role: "user", content: userText };
  pushMessage(userMsg);
  messageInput.value = "";

  // Build payload
  const payload = {
    message: messageToSend,
    history: settings.sendHistory ? history.slice() : []
  };

  // Call backend
  setSending(true);
  fetch(safeJoinUrl(settings.apiBase, "/ai/chat"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })
    .then(async (res) => {
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`HTTP ${res.status} ${res.statusText}${text ? ` - ${text}` : ""}`);
      }
      return res.json();
    })
    .then((data) => {
      const answer = (data && (data.answer || data.response || data.text)) || "";
      const aiMsg = { role: "assistant", content: String(answer) };
      pushMessage(aiMsg);
    })
    .catch((err) => {
      console.error(err);
      showError("No se pudo obtener respuesta de la API. Revisa la URL, CORS o tu conexión.");
      const errorMsg = { role: "assistant", content: "[Error] No se pudo responder. Intenta de nuevo." };
      pushMessage(errorMsg);
    })
    .finally(() => setSending(false));
}

function onClear() {
  clearStatus();
  chatEl.innerHTML = "";
  // Confirm clearing stored history
  const alsoClear = confirm("¿También borrar historial guardado?");
  if (alsoClear) {
    history = [];
    saveHistory();
  }
}

function onCopyLast() {
  clearStatus();
  const last = [...history].reverse().find((m) => m.role === "assistant");
  if (!last) {
    showError("No hay respuesta para copiar.");
    return;
  }
  const text = last.content;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => showStatus("Copiado."), () => showError("No se pudo copiar."));
  } else {
    // Fallback
    const ta = document.createElement("textarea");
    ta.value = text; document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); showStatus("Copiado."); } catch (_) { showError("No se pudo copiar."); }
    document.body.removeChild(ta);
  }
}

function onExport() {
  clearStatus();
  const toSave = { history, settings };
  const blob = new Blob([JSON.stringify(toSave, null, 2)], { type: "application/json;charset=utf-8" });
  const a = document.createElement("a");
  const ymd = new Date().toISOString().slice(0,10).replaceAll("-", "");
  a.download = `astrenai_chat_${ymd}.json`;
  a.href = URL.createObjectURL(blob);
  a.click();
  URL.revokeObjectURL(a.href);
}

function onSaveSettings() {
  const newSettings = {
    apiBase: apiBaseInput.value.trim(),
    sendHistory: !!sendHistoryToggle.checked,
    useSystemPrompt: !!useSystemPromptToggle.checked,
    systemPrompt: systemPromptInput.value.trim()
  };
  settings = { ...DEFAULT_SETTINGS, ...newSettings };
  saveSettings();
  closeModal(settingsModal);
  showStatus("Settings guardados.");
}

function openModal(el) {
  el.classList.remove("hidden");
  // Focus first input
  setTimeout(() => apiBaseInput.focus(), 0);
}

function closeModal(el) {
  el.classList.add("hidden");
  openSettingsBtn.focus();
}

function setSending(isSending) {
  sendBtn.disabled = isSending;
  messageInput.disabled = isSending;
  sendBtn.textContent = isSending ? "Enviando..." : "Enviar";
}

function pushMessage(msg) {
  history.push(msg);
  saveHistory();
  appendMessageToUI(msg);
  scrollToBottom();
}

function appendMessageToUI(msg) {
  const wrapper = document.createElement("div");
  wrapper.className = `msg ${msg.role === "user" ? "user" : "ai"}`;

  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.innerHTML = msg.role === "assistant" ? renderWithCitations(msg.content) : escapeHtml(msg.content);

  wrapper.appendChild(bubble);
  chatEl.appendChild(wrapper);
}

function renderHistory() {
  chatEl.innerHTML = "";
  for (const msg of history) appendMessageToUI(msg);
}

function scrollToBottom() {
  chatEl.scrollTop = chatEl.scrollHeight;
}

function renderWithCitations(text) {
  const escaped = escapeHtml(text);
  const citationRegex = /\[[^\]]+\s@\s\d+\]/g;
  return escaped.replace(citationRegex, (m) => `<span class="chip" tabindex="0" role="button" title="Cita">${m}</span>`);
}

function escapeHtml(str) {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function showStatus(msg) {
  statusBar.textContent = msg;
  statusBar.classList.remove("hidden", "error");
}

function showError(msg) {
  statusBar.textContent = msg;
  statusBar.classList.remove("hidden");
  statusBar.classList.add("error");
}

function clearStatus() {
  statusBar.textContent = "";
  statusBar.classList.add("hidden");
  statusBar.classList.remove("error");
}

function loadSettings() {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return { ...DEFAULT_SETTINGS, ...(parsed || {}) };
  } catch (_) {
    return { ...DEFAULT_SETTINGS };
  }
}

function saveSettings() {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  applySettingsToUI(settings);
}

function applySettingsToUI(s) {
  apiBaseInput.value = s.apiBase || "";
  sendHistoryToggle.checked = !!s.sendHistory;
  useSystemPromptToggle.checked = !!s.useSystemPrompt;
  systemPromptInput.value = s.systemPrompt || "";
}

function loadHistory() {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    if (Array.isArray(parsed)) return parsed.filter(v => v && typeof v.content === "string" && (v.role === "user" || v.role === "assistant"));
    return [];
  } catch (_) {
    return [];
  }
}

function saveHistory() {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

function safeJoinUrl(base, path) {
  if (!base) return path;
  const b = base.endsWith("/") ? base.slice(0, -1) : base;
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${b}${p}`;
}


