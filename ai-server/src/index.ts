export interface Env {
	AI: Ai;
	MY_RATE_LIMITER: any;
}

const corsHeaders = {
	'Access-Control-Allow-Headers': '*',
	'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
	'Access-Control-Allow-Origin': '*',
};

async function handleRequest(request: Request, env: Env): Promise<Response> {
	if (request.method === 'OPTIONS') {
		return new Response('OK', { headers: corsHeaders });
	}

	try {
		const { pathname } = new URL(request.url);
		const { success } = await env.MY_RATE_LIMITER.limit({ key: pathname });

		if (!success) {
			return new Response(`429 Failure – rate limit exceeded for ${pathname}`, {
				status: 429,
				headers: corsHeaders,
			});
		}

		if (request.method === 'POST') {
			const body = await request.json();
			const text = (body as any).text;

			if (!text || text.length === 0) {
				return new Response(JSON.stringify({ success: false }), { headers: corsHeaders });
			}

			const response = await env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
				prompt: `Generate a short summary of this:${text}`,
			});

			return new Response(JSON.stringify({ ...response, success: true }), { headers: corsHeaders });
		}

		if (request.method === 'GET') {
			return new Response('GET request received', { headers: corsHeaders });
		}

		return new Response('Method not allowed', {
			status: 405,
			headers: corsHeaders,
		});
	} catch (err) {
		return new Response(JSON.stringify({ success: false }), {
			status: 500,
			headers: corsHeaders,
		});
	}
}

export default {
	fetch: handleRequest,
} satisfies ExportedHandler<Env>;
