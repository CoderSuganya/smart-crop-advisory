const sidebar = document.getElementById('sidebar');
const toggleBtn = document.getElementById('toggle-sidebar');
const chatPanel = document.getElementById('chat-panel');
const expandBtn = document.getElementById('expand');
const toggleModeBtn = document.getElementById('toggle-mode');

const sendBtn = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');
const newChatBtn = document.querySelector('.new-chat-btn');
const historyDiv = document.getElementById('history');

let chatHistory = []; // stores previous chats
let currentChat = [];

// Sidebar toggle
toggleBtn.addEventListener('click', () => {
  const expanded = chatPanel.classList.contains('fullscreen');
  if(expanded) chatPanel.classList.remove('fullscreen');
  sidebar.classList.toggle('collapsed');
});

// Chat expand
expandBtn.addEventListener('click', () => {
  const collapsed = sidebar.classList.contains('collapsed');
  if(!collapsed) sidebar.classList.add('collapsed');
  chatPanel.classList.toggle('fullscreen');
});

// Dark mode
toggleModeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  toggleModeBtn.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

// Send message
sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', e => { if(e.key==='Enter') sendMessage(); });

function sendMessage() {
  const msg = userInput.value.trim();
  if(!msg) return;

  const userP = document.createElement('div');
  userP.classList.add('chat-message', 'user-msg');
  userP.textContent = msg;
  chatBox.appendChild(userP);

  currentChat.push({ sender: 'user', text: msg });

  // Dummy bot reply
  const botP = document.createElement('div');
  botP.classList.add('chat-message', 'bot-msg');
  botP.textContent = "Bot: " + msg; // replace with real logic
  chatBox.appendChild(botP);

  currentChat.push({ sender: 'bot', text: "Bot: " + msg });

  userInput.value = '';
  chatBox.scrollTop = chatBox.scrollHeight;
}

// New Chat
newChatBtn.addEventListener('click', () => {
  if(currentChat.length){
    chatHistory.unshift(currentChat); // add to history
    updateHistoryUI();
  }
  currentChat = [];
  chatBox.innerHTML = '';
});

// Update recent chats UI
function updateHistoryUI() {
  historyDiv.innerHTML = '';
  chatHistory.forEach((chat, index) => {
    const btn = document.createElement('button');
    btn.textContent = `Chat ${chatHistory.length - index}`;
    btn.addEventListener('click', () => loadChat(index));
    historyDiv.appendChild(btn);
  });
}

// Load a previous chat
function loadChat(index) {
  const chat = chatHistory[index];
  currentChat = [...chat];
  chatBox.innerHTML = '';
  chat.forEach(msg => {
    const div = document.createElement('div');
    div.classList.add('chat-message', msg.sender === 'user' ? 'user-msg' : 'bot-msg');
    div.textContent = msg.text;
    chatBox.appendChild(div);
  });
  chatBox.scrollTop = chatBox.scrollHeight;
}
