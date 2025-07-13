import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'\;
import { corsHeaders } from '../_shared/cors.ts';

serve(async (req: Request) => {
  if (req.method !== 'POST') {
    return new Response('Nur POST erlaubt', { status: 405, headers: corsHeaders });
  }

  const { contextText, systemPrompt, apiKey } = await req.json();

  const body = {
    model: 'openai/gpt-4o',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: contextText }
    ]
  };

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  const result = await response.json();

  return new Response(JSON.stringify(result), {
    status: 200,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  });
});
