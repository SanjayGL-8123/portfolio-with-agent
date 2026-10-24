/**
 * SANJAY AIOS v2.5 — Mini Portfolio Agent & Neural Co-Pilot
 * Ultra-Premium Glassmorphic UI/UX with Self-Contained Styles
 * Powered by Gemini API with Resilient Client-Side Knowledge Base Fallback
 */

(function () {
  'use strict';

  let knowledgeData = null;
  let isOpen = false;
  let isThinking = false;
  const SESSION_KEY = 'sanjay_agent_session_id';
  const HISTORY_KEY = 'sanjay_agent_chat_history_v2';

  // Self-contained, bulletproof CSS injection to prevent any CSS cache issues
  function injectAgentStyles() {
    if (document.getElementById('sanjay-agent-standalone-styles')) return;

    const style = document.createElement('style');
    style.id = 'sanjay-agent-standalone-styles';
    style.textContent = `
      /* Reset & Positioning */
      .ai-chatbot-widget,
      .mini-agent-widget {
        position: fixed !important;
        bottom: 24px !important;
        right: 24px !important;
        z-index: 999999 !important;
        font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
        box-sizing: border-box !important;
      }

      .ai-chatbot-widget *,
      .mini-agent-widget * {
        box-sizing: border-box !important;
        margin: 0;
        padding: 0;
      }

      /* Floating Action Button */
      .ai-trigger-btn,
      .agent-fab {
        width: 60px !important;
        height: 60px !important;
        border-radius: 50% !important;
        background: linear-gradient(135deg, #0d9488 0%, #10b981 100%) !important;
        color: #ffffff !important;
        border: none !important;
        cursor: pointer !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        font-size: 1.5rem !important;
        box-shadow: 0 8px 30px rgba(16, 185, 129, 0.45), 0 2px 10px rgba(0, 0, 0, 0.3) !important;
        transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease !important;
        position: relative !important;
        outline: none !important;
      }

      .ai-trigger-btn:hover,
      .agent-fab:hover {
        transform: scale(1.08) translateY(-2px) !important;
        box-shadow: 0 12px 35px rgba(16, 185, 129, 0.6), 0 4px 14px rgba(0, 0, 0, 0.35) !important;
      }

      .ai-pulse-ring,
      .agent-fab-pulse {
        position: absolute !important;
        inset: -6px !important;
        border: 2px solid #10b981 !important;
        border-radius: 50% !important;
        animation: agentPulseGlow 2.4s infinite cubic-bezier(0.24, 0, 0.38, 1) !important;
        pointer-events: none !important;
      }

      @keyframes agentPulseGlow {
        0% { transform: scale(0.92); opacity: 0.9; }
        50% { transform: scale(1.3); opacity: 0; }
        100% { transform: scale(1.3); opacity: 0; }
      }

      .agent-fab-badge {
        position: absolute !important;
        top: 2px !important;
        right: 2px !important;
        width: 13px !important;
        height: 13px !important;
        border-radius: 50% !important;
        background-color: #10b981 !important;
        border: 2.5px solid #0b1120 !important;
        box-shadow: 0 0 8px #10b981 !important;
      }

      .agent-fab-tooltip {
        position: absolute !important;
        right: 74px !important;
        top: 50% !important;
        transform: translateY(-50%) !important;
        background: #0f172a !important;
        color: #f8fafc !important;
        padding: 7px 14px !important;
        border-radius: 9999px !important;
        font-size: 0.8rem !important;
        font-weight: 600 !important;
        white-space: nowrap !important;
        box-shadow: 0 10px 25px rgba(0,0,0,0.5) !important;
        border: 1px solid rgba(20, 184, 166, 0.3) !important;
        pointer-events: none !important;
        opacity: 0 !important;
        transition: opacity 0.2s ease, transform 0.2s ease !important;
      }

      .agent-fab:hover .agent-fab-tooltip,
      .ai-trigger-btn:hover .agent-fab-tooltip {
        opacity: 1 !important;
        transform: translateY(-50%) translateX(-4px) !important;
      }

      /* Chat Window Modal */
      .chat-window,
      .agent-chat-window {
        position: absolute !important;
        bottom: 76px !important;
        right: 0 !important;
        width: min(400px, calc(100vw - 32px)) !important;
        height: min(580px, calc(100vh - 110px)) !important;
        background: rgba(11, 17, 32, 0.96) !important;
        border: 1px solid rgba(20, 184, 166, 0.3) !important;
        border-radius: 20px !important;
        box-shadow: 0 25px 60px -10px rgba(0, 0, 0, 0.75), 0 12px 28px -5px rgba(0, 0, 0, 0.4) !important;
        display: flex !important;
        flex-direction: column !important;
        overflow: hidden !important;
        opacity: 0 !important;
        transform: scale(0.92) translateY(20px) !important;
        pointer-events: none !important;
        transition: opacity 0.28s cubic-bezier(0.16, 1, 0.3, 1), transform 0.28s cubic-bezier(0.16, 1, 0.3, 1) !important;
        backdrop-filter: blur(24px) !important;
        -webkit-backdrop-filter: blur(24px) !important;
      }

      .chat-window.active,
      .chat-window.open,
      .agent-chat-window.open {
        opacity: 1 !important;
        transform: scale(1) translateY(0) !important;
        pointer-events: auto !important;
      }

      /* Header */
      .chat-header,
      .agent-chat-header {
        padding: 14px 18px !important;
        background: #0f1c2e !important;
        border-bottom: 1px solid rgba(20, 184, 166, 0.22) !important;
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
      }

      .chat-header-info,
      .agent-chat-header-info {
        display: flex !important;
        align-items: center !important;
        gap: 12px !important;
      }

      .chat-header-info i,
      .agent-chat-avatar {
        width: 38px !important;
        height: 38px !important;
        border-radius: 10px !important;
        background: rgba(20, 184, 166, 0.16) !important;
        border: 1px solid rgba(20, 184, 166, 0.35) !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        color: #14b8a6 !important;
        font-size: 1.15rem !important;
      }

      .agent-chat-title-group h4 {
        font-family: 'Poppins', sans-serif !important;
        font-size: 0.95rem !important;
        font-weight: 700 !important;
        color: #f8fafc !important;
        line-height: 1.2 !important;
      }

      .agent-chat-status {
        font-size: 0.72rem !important;
        color: #94a3b8 !important;
        display: flex !important;
        align-items: center !important;
        gap: 5px !important;
        margin-top: 2px !important;
      }

      .agent-status-dot {
        width: 7px !important;
        height: 7px !important;
        border-radius: 50% !important;
        background-color: #10b981 !important;
        box-shadow: 0 0 6px #10b981 !important;
        display: inline-block !important;
      }

      .agent-header-actions {
        display: flex !important;
        align-items: center !important;
        gap: 6px !important;
      }

      .icon-btn,
      .agent-header-btn {
        width: 32px !important;
        height: 32px !important;
        border-radius: 8px !important;
        border: 1px solid rgba(20, 184, 166, 0.25) !important;
        background: transparent !important;
        color: #94a3b8 !important;
        cursor: pointer !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        font-size: 0.85rem !important;
        transition: all 0.2s ease !important;
      }

      .icon-btn:hover,
      .agent-header-btn:hover {
        background: rgba(20, 184, 166, 0.18) !important;
        color: #14b8a6 !important;
        border-color: rgba(20, 184, 166, 0.45) !important;
      }

      /* Body */
      .chat-body,
      .agent-chat-body {
        flex: 1 !important;
        padding: 16px !important;
        overflow-y: auto !important;
        display: flex !important;
        flex-direction: column !important;
        gap: 12px !important;
        scroll-behavior: smooth !important;
      }

      .chat-body::-webkit-scrollbar,
      .agent-chat-body::-webkit-scrollbar {
        width: 5px !important;
      }

      .chat-body::-webkit-scrollbar-thumb,
      .agent-chat-body::-webkit-scrollbar-thumb {
        background: rgba(20, 184, 166, 0.25) !important;
        border-radius: 10px !important;
      }

      .agent-msg-row {
        display: flex !important;
        gap: 8px !important;
        max-width: 90% !important;
        align-items: flex-end !important;
      }

      .agent-msg-row.bot,
      .chat-msg.bot {
        align-self: flex-start !important;
      }

      .agent-msg-row.user,
      .chat-msg.user {
        align-self: flex-end !important;
        flex-direction: row-reverse !important;
      }

      .agent-mini-avatar {
        width: 26px !important;
        height: 26px !important;
        border-radius: 50% !important;
        background: rgba(20, 184, 166, 0.16) !important;
        border: 1px solid rgba(20, 184, 166, 0.3) !important;
        color: #14b8a6 !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        font-size: 0.75rem !important;
        flex-shrink: 0 !important;
      }

      .agent-bubble,
      .chat-msg {
        padding: 11px 15px !important;
        border-radius: 16px !important;
        font-size: 0.88rem !important;
        line-height: 1.55 !important;
        word-break: break-word !important;
      }

      .agent-msg-row.bot .agent-bubble,
      .chat-msg.bot {
        background: #111d30 !important;
        border: 1px solid rgba(20, 184, 166, 0.22) !important;
        color: #f1f5f9 !important;
        border-bottom-left-radius: 4px !important;
      }

      .agent-msg-row.user .agent-bubble,
      .chat-msg.user {
        background: linear-gradient(135deg, #0f766e 0%, #14b8a6 100%) !important;
        color: #ffffff !important;
        border-bottom-right-radius: 4px !important;
        box-shadow: 0 4px 14px rgba(15, 118, 110, 0.3) !important;
      }

      .agent-bubble a,
      .chat-msg a {
        color: #2dd4bf !important;
        text-decoration: underline !important;
        font-weight: 600 !important;
      }

      .agent-msg-row.user .agent-bubble a {
        color: #ffffff !important;
      }

      .agent-bubble strong,
      .chat-msg strong {
        color: #ffffff !important;
        font-weight: 700 !important;
      }

      .agent-bubble ul,
      .chat-msg ul {
        padding-left: 18px !important;
        margin: 6px 0 !important;
      }

      .agent-bubble li,
      .chat-msg li {
        margin: 3px 0 !important;
      }

      .agent-bubble code,
      .chat-msg code {
        background: rgba(20, 184, 166, 0.16) !important;
        padding: 2px 6px !important;
        border-radius: 4px !important;
        font-family: monospace !important;
        font-size: 0.85em !important;
        color: #38bdf8 !important;
      }

      /* Typing Animation */
      .agent-typing-dots {
        display: flex !important;
        gap: 5px !important;
        padding: 6px 4px !important;
      }

      .agent-typing-dots span {
        width: 7px !important;
        height: 7px !important;
        border-radius: 50% !important;
        background: #14b8a6 !important;
        animation: agentDotPulse 1.4s infinite both !important;
      }

      .agent-typing-dots span:nth-child(2) { animation-delay: 0.2s !important; }
      .agent-typing-dots span:nth-child(3) { animation-delay: 0.4s !important; }

      @keyframes agentDotPulse {
        0%, 80%, 100% { opacity: 0.25; transform: scale(0.85); }
        40% { opacity: 1; transform: scale(1.15); }
      }

      /* Quick Prompt Chips */
      .chat-chips-row,
      .agent-chips-wrapper {
        padding: 8px 12px !important;
        display: flex !important;
        flex-wrap: wrap !important;
        gap: 6px !important;
        border-top: 1px solid rgba(20, 184, 166, 0.16) !important;
        background: #0b1524 !important;
        max-height: 96px !important;
        overflow-y: auto !important;
      }

      .chip-prompt,
      .agent-chip-btn {
        font-size: 0.74rem !important;
        font-weight: 500 !important;
        padding: 5px 11px !important;
        border-radius: 9999px !important;
        background: #111d30 !important;
        border: 1px solid rgba(20, 184, 166, 0.24) !important;
        color: #14b8a6 !important;
        cursor: pointer !important;
        white-space: nowrap !important;
        transition: all 0.2s ease !important;
        font-family: 'Inter', sans-serif !important;
      }

      .chip-prompt:hover,
      .agent-chip-btn:hover {
        background: #14b8a6 !important;
        color: #0b1120 !important;
        font-weight: 600 !important;
        border-color: #14b8a6 !important;
        transform: translateY(-1px) !important;
      }

      /* Footer Form */
      .chat-footer,
      .agent-chat-footer {
        padding: 10px 14px !important;
        background: #0f1c2e !important;
        border-top: 1px solid rgba(20, 184, 166, 0.16) !important;
        display: flex !important;
        flex-direction: column !important;
        gap: 6px !important;
      }

      .agent-input-row {
        display: flex !important;
        gap: 8px !important;
        align-items: center !important;
      }

      .chat-input,
      .agent-chat-input {
        flex: 1 !important;
        background: #070d18 !important;
        border: 1px solid rgba(20, 184, 166, 0.24) !important;
        border-radius: 9999px !important;
        padding: 9px 16px !important;
        font-size: 0.88rem !important;
        color: #f8fafc !important;
        outline: none !important;
        transition: border-color 0.2s ease, box-shadow 0.2s ease !important;
        font-family: 'Inter', sans-serif !important;
      }

      .chat-input:focus,
      .agent-chat-input:focus {
        border-color: #14b8a6 !important;
        box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.18) !important;
      }

      .chat-input::placeholder,
      .agent-chat-input::placeholder {
        color: #64748b !important;
      }

      .agent-send-btn {
        width: 38px !important;
        height: 38px !important;
        border-radius: 50% !important;
        background: #10b981 !important;
        color: #ffffff !important;
        border: none !important;
        cursor: pointer !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        font-size: 0.92rem !important;
        transition: all 0.2s ease !important;
        flex-shrink: 0 !important;
      }

      .agent-send-btn:hover {
        background: #059669 !important;
        transform: scale(1.05) !important;
      }

      .agent-footer-note {
        font-size: 0.68rem !important;
        color: #64748b !important;
        text-align: center !important;
      }
    `;

    document.head.appendChild(style);
  }

  document.addEventListener('DOMContentLoaded', () => {
    injectAgentStyles();
    initAgentWidget();
    loadKnowledgeBase();
  });

  // Also inject styles immediately in case DOMContentLoaded already fired
  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    injectAgentStyles();
    initAgentWidget();
    loadKnowledgeBase();
  }

  function getSessionId() {
    let sid = sessionStorage.getItem(SESSION_KEY);
    if (!sid) {
      sid = 'session_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
      sessionStorage.setItem(SESSION_KEY, sid);
    }
    return sid;
  }

  async function loadKnowledgeBase() {
    if (window.SANJAY_AGENT_KNOWLEDGE) {
      knowledgeData = window.SANJAY_AGENT_KNOWLEDGE;
      return;
    }
    try {
      const resFallback = await fetch('knowledge.json');
      if (resFallback.ok) {
        knowledgeData = await resFallback.json();
      }
    } catch (e) {
      console.info('[MINI AGENT] Using embedded local rules.');
    }
  }

  function initAgentWidget() {
    // Remove any old broken widgets if present
    const oldWidget = document.getElementById('miniAgentWidget') || document.querySelector('.ai-chatbot-widget');
    if (oldWidget) {
      oldWidget.remove();
    }

    const widget = document.createElement('div');
    widget.className = 'mini-agent-widget';
    widget.id = 'miniAgentWidget';
    widget.setAttribute('role', 'region');
    widget.setAttribute('aria-label', 'Sanjay AIOS Co-Pilot');

    widget.innerHTML = `
      <!-- Floating Action Button -->
      <button class="agent-fab" id="agentFab" aria-expanded="false" aria-controls="agentChatWindow" aria-label="Open Sanjay AIOS Co-Pilot">
        <div class="agent-fab-pulse"></div>
        <div class="agent-fab-badge" title="Co-Pilot Active"></div>
        <i class="fa-solid fa-robot" id="agentFabIcon"></i>
        <span class="agent-fab-tooltip">Ask Sanjay AIOS</span>
      </button>

      <!-- Chat Modal Window -->
      <div class="agent-chat-window" id="agentChatWindow" aria-hidden="true">
        <!-- Header -->
        <div class="agent-chat-header">
          <div class="agent-chat-header-info">
            <div class="agent-chat-avatar">
              <i class="fa-solid fa-brain"></i>
            </div>
            <div class="agent-chat-title-group">
              <h4>SANJAY AIOS <span style="color:#14b8a6">v2.5</span></h4>
              <div class="agent-chat-status">
                <span class="agent-status-dot"></span>
                <span>Neural Co-Pilot · Online</span>
              </div>
            </div>
          </div>
          <div class="agent-header-actions">
            <button class="agent-header-btn" id="agentClearBtn" title="Reset Conversation" aria-label="Reset Chat">
              <i class="fa-solid fa-rotate-right"></i>
            </button>
            <button class="agent-header-btn" id="agentCloseBtn" title="Close" aria-label="Close Chat">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>

        <!-- Chat Stream Body -->
        <div class="agent-chat-body" id="agentChatBody"></div>

        <!-- Prompt Suggestions Chips -->
        <div class="agent-chips-wrapper" id="agentChipsWrapper">
          <button class="agent-chip-btn" data-query="Tell me about Sanjay G. L.">👤 About Sanjay</button>
          <button class="agent-chip-btn" data-query="What are Sanjay's top skills and technologies?">🛠️ Skill Matrix</button>
          <button class="agent-chip-btn" data-query="Showcase Sanjay's top projects">🚀 100 Projects</button>
          <button class="agent-chip-btn" data-query="Tell me about your Google Skillshop AI certification">🎓 Google AI Cert</button>
          <button class="agent-chip-btn" data-query="How many verified certificates does Sanjay have?">📜 88+ Certificates</button>
          <button class="agent-chip-btn" data-query="Initialize Interview Mode">🎯 Interview Mode</button>
          <button class="agent-chip-btn" data-query="How can I contact or hire Sanjay?">📬 Contact Info</button>
        </div>

        <!-- Footer Input -->
        <form class="agent-chat-footer" id="agentChatForm">
          <div class="agent-input-row">
            <input 
              type="text" 
              class="agent-chat-input" 
              id="agentChatInput" 
              placeholder="Ask anything about Sanjay..." 
              autocomplete="off"
              maxlength="400"
              aria-label="Ask Sanjay AIOS a question"
            />
            <button type="submit" class="agent-send-btn" id="agentSendBtn" aria-label="Send message">
              <i class="fa-solid fa-paper-plane"></i>
            </button>
          </div>
          <span class="agent-footer-note">⚡ Powered by Sanjay AIOS v2.5 & Knowledge Engine</span>
        </form>
      </div>
    `;

    document.body.appendChild(widget);

    const fab = document.getElementById('agentFab');
    const closeBtn = document.getElementById('agentCloseBtn');
    const clearBtn = document.getElementById('agentClearBtn');
    const form = document.getElementById('agentChatForm');
    const input = document.getElementById('agentChatInput');

    fab.addEventListener('click', () => toggleChat());
    closeBtn.addEventListener('click', () => toggleChat(false));
    clearBtn.addEventListener('click', () => resetChat());

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen) {
        toggleChat(false);
      }
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = input.value.trim();
      if (!val || isThinking) return;
      handleUserQuery(val);
      input.value = '';
    });

    document.querySelectorAll('.agent-chip-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const query = btn.getAttribute('data-query');
        if (query && !isThinking) {
          handleUserQuery(query);
        }
      });
    });

    restoreChatHistory();
  }

  function toggleChat(forceState = null) {
    const chatWindow = document.getElementById('agentChatWindow');
    const fab = document.getElementById('agentFab');
    const fabIcon = document.getElementById('agentFabIcon');
    const input = document.getElementById('agentChatInput');

    isOpen = forceState !== null ? forceState : !isOpen;

    if (isOpen) {
      chatWindow.classList.add('open');
      chatWindow.setAttribute('aria-hidden', 'false');
      fab.setAttribute('aria-expanded', 'true');
      fabIcon.className = 'fa-solid fa-comment-dots';
      setTimeout(() => input && input.focus(), 150);
    } else {
      chatWindow.classList.remove('open');
      chatWindow.setAttribute('aria-hidden', 'true');
      fab.setAttribute('aria-expanded', 'false');
      fabIcon.className = 'fa-solid fa-robot';
    }
  }

  // Expose toggleChat globally for UI triggers
  window.toggleAgentChat = toggleChat;

  function formatMarkdown(text) {
    if (!text) return '';
    let out = String(text);

    out = out.replace(/&/g, '&amp;')
             .replace(/</g, '&lt;')
             .replace(/>/g, '&gt;');

    out = out.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    out = out.replace(/\*(.*?)\*/g, '<em>$1</em>');
    out = out.replace(/`([^`]+)`/g, '<code>$1</code>');
    out = out.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

    const lines = out.split('\n');
    let inList = false;
    let formattedLines = [];

    for (let line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        if (!inList) {
          formattedLines.push('<ul>');
          inList = true;
        }
        formattedLines.push(`<li>${trimmed.substring(2)}</li>`);
      } else {
        if (inList) {
          formattedLines.push('</ul>');
          inList = false;
        }
        if (trimmed) {
          formattedLines.push(`<p>${line}</p>`);
        }
      }
    }
    if (inList) formattedLines.push('</ul>');

    return formattedLines.join('');
  }

  function appendMessage(content, sender = 'bot', save = true) {
    const body = document.getElementById('agentChatBody');
    if (!body) return;

    const row = document.createElement('div');
    row.className = `agent-msg-row ${sender}`;

    if (sender === 'bot') {
      const avatar = document.createElement('div');
      avatar.className = 'agent-mini-avatar';
      avatar.innerHTML = '<i class="fa-solid fa-bolt"></i>';
      row.appendChild(avatar);
    }

    const bubble = document.createElement('div');
    bubble.className = 'agent-bubble';
    bubble.innerHTML = sender === 'user' ? escapeHtml(content) : formatMarkdown(content);
    row.appendChild(bubble);

    body.appendChild(row);
    body.scrollTop = body.scrollHeight;

    if (save) {
      saveMessageToStorage({ content, sender, timestamp: Date.now() });
    }
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.innerText = str;
    return div.innerHTML;
  }

  function showTypingIndicator() {
    const body = document.getElementById('agentChatBody');
    if (!body) return null;

    const row = document.createElement('div');
    row.className = 'agent-msg-row bot agent-typing-row';
    row.id = 'agentTypingIndicator';

    const avatar = document.createElement('div');
    avatar.className = 'agent-mini-avatar';
    avatar.innerHTML = '<i class="fa-solid fa-bolt"></i>';
    row.appendChild(avatar);

    const bubble = document.createElement('div');
    bubble.className = 'agent-bubble';
    bubble.innerHTML = '<div class="agent-typing-dots"><span></span><span></span><span></span></div>';
    row.appendChild(bubble);

    body.appendChild(row);
    body.scrollTop = body.scrollHeight;
    return row;
  }

  function removeTypingIndicator() {
    const el = document.getElementById('agentTypingIndicator');
    if (el) el.remove();
  }

  function restoreChatHistory() {
    const body = document.getElementById('agentChatBody');
    if (!body) return;
    body.innerHTML = '';

    let history = [];
    try {
      const stored = sessionStorage.getItem(HISTORY_KEY);
      if (stored) history = JSON.parse(stored);
    } catch (_) {}

    if (history && history.length > 0) {
      history.forEach(m => appendMessage(m.content, m.sender, false));
    } else {
      const welcome = `⚡ **Sanjay AIOS v2.5 Online**\n\nI am **Sanjay G. L.'s (Sanju)** neural portfolio co-pilot. I can answer questions about his:\n- **100 Production & Showcase Projects** (DermAI, Pure Weaves, GrabNotes, Placement Pro)\n- **88+ Verified Certificates** (including **Google Skillshop AI-Powered Shopping ads Certification**)\n- **Core Tech Stack** (React, Python, SQL, Docker, Kali Linux, AI Agents)\n- **Upcoming Roadmaps** (Vulnerability Scanner, Emotion Detection, Resume Analyzer)\n\nAsk me anything or click a quick prompt below to begin!`;
      appendMessage(welcome, 'bot', true);
    }
  }

  function saveMessageToStorage(msg) {
    try {
      let history = [];
      const stored = sessionStorage.getItem(HISTORY_KEY);
      if (stored) history = JSON.parse(stored);
      history.push(msg);
      if (history.length > 30) history = history.slice(-30);
      sessionStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    } catch (_) {}
  }

  function resetChat() {
    try {
      sessionStorage.removeItem(HISTORY_KEY);
      sessionStorage.removeItem(SESSION_KEY);
    } catch (_) {}
    restoreChatHistory();
  }

  async function handleUserQuery(query) {
    isThinking = true;
    appendMessage(query, 'user');
    const typing = showTypingIndicator();

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const res = await fetch('/api/agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: query,
          session_id: getSessionId()
        }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        removeTypingIndicator();
        if (data && data.reply) {
          appendMessage(data.reply, 'bot');
          isThinking = false;
          return;
        }
      }
    } catch (err) {
      console.info('[MINI AGENT] Backend offline, using client knowledge engine.');
    }

    removeTypingIndicator();
    const fallbackAnswer = generateClientAnswer(query);
    appendMessage(fallbackAnswer, 'bot');
    isThinking = false;
  }

  function generateClientAnswer(query) {
    const qLower = query.toLowerCase().trim();

    // Specific Google / AI Shopping ads Certification match
    if (qLower.includes('shopping ads') || qLower.includes('google cert') || qLower.includes('skillshop') || (qLower.includes('google') && qLower.includes('cert'))) {
      return `🎓 **Google Skillshop AI-Powered Shopping ads Certification**:\n- **Credential Name**: AI-Powered Shopping ads Certification\n- **Issuer**: Google / Skillshop\n- **Issue Date**: June 5, 2026 (Valid until June 5, 2027)\n- **Credential ID**: \`0c84bba4-926a-45d0-9507-e6e85fd1339e\`\n- **Direct Verification Link**: [Verify on Credential.net](https://www.credential.net/0c84bba4-926a-45d0-9507-e6e85fd1339e)\n- **Core Competencies**: Building and optimizing AI-driven retail campaigns, Performance Max for Retail, Merchant Center product feed architectures, and conversion rate optimization.`;
    }

    if (knowledgeData) {
      const qnas = [
        ...(knowledgeData.interview_qna || []),
        ...(knowledgeData.extended_qna || [])
      ];

      for (let item of qnas) {
        const questionText = (item.question || '').toLowerCase();
        if (questionText === qLower || (qLower.length > 6 && questionText.includes(qLower))) {
          return item.answer;
        }
      }

      const queryWords = qLower.replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter(w => w.length > 2);
      let bestItem = null;
      let highestScore = 0;

      for (let item of qnas) {
        const qText = (item.question || '').toLowerCase();
        const keywords = (item.keywords || '').toLowerCase();
        let score = 0;

        for (let word of queryWords) {
          if (qText.includes(word)) score += 3;
          if (keywords.includes(word)) score += 2;
        }

        if (score > highestScore && score >= 4) {
          highestScore = score;
          bestItem = item;
        }
      }

      if (bestItem) {
        return bestItem.answer;
      }
    }

    if (qLower.includes('interview mode') || qLower.includes('interview')) {
      return `🎯 **Interview Mode Active**\n\nYou can ask technical, architectural, or behavioral interview questions regarding Sanjay's background:\n- **Technical**: "Explain CNN architecture", "What is RAG?", "How does an AI Agent work?", "How to prevent SQL Injection and XSS?"\n- **Project Deep-Dive**: "Explain DermAI", "How was Placement Pro engineered?"\n- **Behavioral**: "What are Sanjay's strengths?", "Describe his problem-solving approach."`;
    }

    if (qLower.includes('who are you') || qLower.includes('what is sanjay aios') || qLower.includes('about agent')) {
      return `I am **Sanjay AIOS v2.5**, an autonomous personal developer co-pilot engineered for **Sanjay G. L. (Sanju)**. I operate using a self-contained intelligence engine powered by a 206+ question verified knowledge base covering his education, 100 projects, and 88+ certificates.`;
    }

    if (qLower.includes('who is sanjay') || qLower.includes('tell me about') || qLower.includes('about sanjay') || qLower.includes('background') || qLower.includes('bio')) {
      return `**Sanjay G. L. (Sanju)** is a dedicated BCA student (3rd Year, 5th Semester) at **PES Institute of Advanced Management Studies**, Shivamogga, affiliated with Kuvempu University.\n\nHe is a Full-Stack Developer, AI/ML Intern at Milano Infotech, Oasis Infobyte Star Performer, and NSS volunteer with hands-on experience building production React web apps, Python backend systems, and AI agent architectures.`;
    }

    if (qLower.includes('skill') || qLower.includes('tech stack') || qLower.includes('technolog') || qLower.includes('react') || qLower.includes('python')) {
      return `🛠️ **Sanjay's Core Technical Matrix**:\n- **Frontend**: React 18, TypeScript, JavaScript (ES6+), Modern HTML5/CSS3, Tailwind CSS\n- **Backend**: Python (Flask, FastAPI), Node.js / Express basics, PHP\n- **Database & Architecture**: SQL, MySQL, SQLite, Normalization, Query Optimization\n- **AI & ML**: Google Gemini API, Agentic Workflows, OpenCV, CNN Deep Learning (TensorFlow/Keras), Scikit-learn\n- **Cybersecurity & DevOps**: Kali Linux, Wireshark, TryHackMe, Docker, Git/GitHub, Vercel`;
    }

    if (qLower.includes('project') || qLower.includes('built') || qLower.includes('showcase')) {
      return `🚀 **Sanjay's Showcase Projects** (100 Cataloged Projects):\n- **DermAI**: CNN deep learning model for skin lesion screening with 94% classification accuracy.\n- **Pure Weaves**: Full-stack e-commerce catalog with automated WhatsApp API ordering.\n- **Placement Pro**: Enterprise campus recruitment portal engineered for PESIAMS using FastAPI & SQL.\n- **GrabNotes**: Collaborative academic repository for students with instant doc retrieval.\n- **AI Agent using Google API**: Autonomous reasoning agent integrated with Google Cloud Run.\n- **CRQ Simulator**: Cyber Risk Quantification simulator applying FAIR methodology.\n\nExplore all projects with live demos on the [Projects Page](projects.html)!`;
    }

    if (qLower.includes('certif') || qLower.includes('award') || qLower.includes('credential')) {
      return `🎓 **88+ Verified Certifications**:\nSanjay has earned 88+ verified credentials including:\n- **AI-Powered Shopping ads Certification** — Google Skillshop ([Verify on Credential.net](https://www.credential.net/0c84bba4-926a-45d0-9507-e6e85fd1339e))\n- **AI and Machine Learning Essentials** — DeepLearning.AI\n- **Cybersecurity Fundamentals** — Cisco Networking Academy\n- **Frontend Developer (React), JavaScript, SQL, Python** — HackerRank\n- **Data Structures and Algorithms in Java** — Coding Ninjas\n- **Safe & Responsible Use of AI** — MeitY / Digital India\n- Plus certifications across Microsoft, Infosys Springboard, freeCodeCamp, and NPTEL.`;
    }

    if (qLower.includes('contact') || qLower.includes('email') || qLower.includes('phone') || qLower.includes('hire') || qLower.includes('freelance') || qLower.includes('reach')) {
      return `📬 **Get in Touch with Sanjay G. L.**:\n- **Email**: [sanjaygl2006@gmail.com](mailto:sanjaygl2006@gmail.com)\n- **Phone**: +91 81239 81877\n- **Location**: Shivamogga, Karnataka, India\n- **LinkedIn**: [Sanjay G. L. on LinkedIn](https://www.linkedin.com/in/sanjaygl3006/)\n- **GitHub**: [github.com/SanjayGL-8123](https://github.com/SanjayGL-8123)\n- **Freelance & Internships**: Open for full-stack web and AI engineering opportunities! You can also use the contact form on this page.`;
    }

    if (qLower.includes('spvm') || qLower.includes('tech solution')) {
      return `🌐 **SPVM 3 Tech Solution** is Sanjay's educational and technical ecosystem dedicated to teaching programming fundamentals (Python, JavaScript, C/C++, Java, SQL) and building high-utility web platforms. Follow on YouTube and Instagram at **@spvm3techsolution**.`;
    }

    if (qLower.includes('cnn') || qLower.includes('convolutional') || qLower.includes('deep learning')) {
      return `🧠 **Convolutional Neural Network (CNN) Deep Learning Architecture**:\n1. **Input Layer**: Ingests raw pixel matrices (e.g. 224×224×3 RGB).\n2. **Convolutional Layers**: Slides learned mathematical filters/kernels across features to capture spatial hierarchies (edges, textures, shapes).\n3. **ReLU Activation**: Applies max(0, x) introducing non-linearity.\n4. **Max Pooling**: Downsamples spatial dimensions to reduce computation and prevent overfitting.\n5. **Dense & Softmax**: Flattens high-level representations to compute multi-class probabilities.\n*Applied by Sanjay in DermAI with 94% screening accuracy.*`;
    }

    if (qLower.includes('rag') || qLower.includes('retrieval augmented')) {
      return `💡 **Retrieval-Augmented Generation (RAG)**:\nRAG combines dense vector retrieval (e.g. FAISS, ChromaDB, pgvector) with Large Language Models to eliminate hallucinations by grounding responses in verified facts without model fine-tuning.`;
    }

    if (qLower.includes('agent') || qLower.includes('agentic')) {
      return `🤖 **Autonomous AI Agent Workflows**:\nAn AI Agent perceives its environment, breaks complex goals into multi-step execution plans, dynamically selects and invokes external tools (APIs, web browsers, SQL queries), evaluates results, and iterates autonomously until fulfilling the objective.`;
    }

    return `I am **Sanjay AIOS v2.5**! You can ask me any question about Sanjay's education (BCA at PES IAMS), his 100 projects (DermAI, Pure Weaves, Placement Pro), 88+ certificates (including Google Skillshop AI Certification), technical skills, or direct contact at [sanjaygl2006@gmail.com](mailto:sanjaygl2006@gmail.com).`;
  }

})();
