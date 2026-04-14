const API_KEY = "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";

async function getAIResponse(text) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium",
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: text
      })
    }
  );

  const data = await response.json();

  console.log(data);

  // Hugging Face peut retourner différents formats
  if (data?.generated_text) return data.generated_text;
  if (data?.[0]?.generated_text) return data[0].generated_text;

  return "Fleur ne peut pas répondre pour le moment 🌸";
}
