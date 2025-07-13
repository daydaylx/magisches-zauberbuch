import { serve } from "https://deno.land/std@0.177.0/http/server.ts"\;

serve(async (req) => {
  const { history } = await req.json();

  const prompt = `
Fasse die bisherige Geschichte in wenigen Sätzen zusammen:
${JSON.stringify(history)}

Format:
{
  "summary": "..."
}
`;

  const result = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${Deno.env.get("OPENROUTER_API_KEY")}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "openai/gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }]
    })
  });

  const data = await result.json();
  const content = data.choices?.[0]?.message?.content;

  return new Response(content, {
    headers: { "Content-Type": "application/json" }
  });
});
