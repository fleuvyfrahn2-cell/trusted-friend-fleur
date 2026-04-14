const API_KEY = "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";

async function sendMessage() {
  const input = document.getElementById("userInput");
  const text = input.value.trim();
  if (!text) return;

  addMessage("user", text);

  const reply = await generateReply(text);
  addMessage("ai", reply);

  input.value = "";
}

async function generateReply(text) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Tu es Fleur, une IA douce, intelligente et empathique."
        },
        {
          role: "user",
          content: text
        }
      ]
    })
  });

  const data = await response.json();

  return data.choices?.[0]?.message?.content || "Erreur de réponse 🌸";
}

function addMessage(type, text) {
  const chat = document.getElementById("chat");
  const div = document.createElement("div");
  div.classList.add("message", type);
  div.innerText = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
             }
