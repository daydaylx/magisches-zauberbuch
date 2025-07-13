import { serve } from "https://deno.land/std@0.177.0/http/server.ts"\;

serve(async (req) => {
  const { history, config } = await req.json();

  const prompt = `
Du bist eine KI, die interaktive Textadventures generiert.
Erzeuge die nächste Szene auf Basis dieser History:
${JSON.stringify(history)}

Story-Konfiguration:
${JSON.stringify(config)}

Antwortformat (JSON):
{
  "title": "...",
  "description": "...",
  "choices": [
    { "text": "...", "targetSceneId": "..." }
  ]
}
`;

  const result = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${Deno.env.get("OPENROUTER_API_KEY")}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "openai/gpt-4o",
      messages: [{ role: "user", content: prompt }]
    })
  });

  const data = await result.json();
  const content = data.choices?.[0]?.message?.content;

  return new Response(content, {
    headers: { "Content-Type": "application/json" }
  });
});
