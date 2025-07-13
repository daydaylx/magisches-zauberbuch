import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'\;
import { corsHeaders } from '../_shared/cors.ts';

serve(async (req: Request) => {
  if (req.method !== 'POST') {
    return new Response('Nur POST erlaubt', { status: 405, headers: corsHeaders });
  }

  const { playerName } = await req.json();

  const sessionId = crypto.randomUUID();
  const response = {
    sessionId,
    playerName,
    createdAt: new Date().toISOString(),
    initialSceneId: 'intro'
  };

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  });
});
