const API_KEY = "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";

function startApp() {
  document.querySelector(".intro").classList.add("hidden");
  document.getElementById("app").classList.remove("hidden");
}

async function sendMessage() {
  const input = document.getElementById("userInput");
  const chat = document.getElementById("chat");

  const text = input.value.trim();
  if (!text) return;

  // afficher message utilisateur
  chat.innerHTML += `<p><b>Toi :</b> ${text}</p>`;
  input.value = "";

  // appel OpenAI
  const reply = await generateReply(text);

  // afficher réponse IA
  chat.innerHTML += `<p><b>Fleur :</b> ${reply}</p>`;
}

async function generateReply(text) {
  try {
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
            content: "Tu es Fleur, une IA douce, empathique et naturelle. Tu parles comme une amie proche."
          },
          {
            role: "user",
            content: text
          }
        ]
      })
    });

    const data = await response.json();

    if (!data.choices) {
      return "Erreur API 🌸 Vérifie ta clé.";
    }

    return data.choices[0].message.content;

  } catch (error) {
    return "Erreur de connexion 🌸";
  }
}

function resetChat() {
  document.getElementById("chat").innerHTML = "";
    }
