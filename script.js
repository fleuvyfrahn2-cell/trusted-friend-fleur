function startApp() {
  document.querySelector(".intro").classList.add("hidden");
  document.getElementById("app").classList.remove("hidden");
}

function sendMessage() {
  const input = document.getElementById("userInput");
  const text = input.value.trim();
  if (!text) return;

  addMessage("user", text);

  let reply = generateReply(text);
  setTimeout(() => {
    addMessage("ai", reply);
    saveMemory(text, reply);
  }, 500);

  input.value = "";
}

function addMessage(type, text) {
  const chat = document.getElementById("chat");
  const div = document.createElement("div");
  div.classList.add("message", type);
  div.innerText = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

/* IA simple (simulation) */
function generateReply(text) {
  text = text.toLowerCase();

  if (text.includes("bonjour")) return "Bonjour 🌸 Je suis Fleur, ton amie IA.";
  if (text.includes("tu t'appelles")) return "Je m'appelle Fleur 🌸";
  if (text.includes("aide")) return "Je suis là pour toi. Dis-moi ce qui ne va pas.";
  if (text.includes("amour")) return "L’amour est une émotion forte… raconte-moi 💜";

  return "Je t’écoute attentivement 🌸";
}

/* Mémoire simple */
function saveMemory(user, ai) {
  let history = JSON.parse(localStorage.getItem("chat")) || [];
  history.push({ user, ai });
  localStorage.setItem("chat", JSON.stringify(history));
}

function resetChat() {
  localStorage.removeItem("chat");
  document.getElementById("chat").innerHTML = "";
}
