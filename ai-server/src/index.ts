export interface Env {
	AI: Ai;
	MY_RATE_LIMITER: any;
}

addEventListener('fetch', (event) => {
	event.respondWith(handleRequest(event.request));
});

const corsHeaders = {
	'Access-Control-Allow-Headers': '*',
	'Access-Control-Allow-Methods': 'POST',
	'Access-Control-Allow-Origin': '*',
};

async function handleRequest(request: any) {
	if (request.method === 'OPTIONS') {
		return new Response('OK', {
			headers: corsHeaders,
		});
	} else if (request.method === 'POST') {
		return fetch(request);
	} else if (request.method === 'GET') {
		return fetch(request);
	} else {
		return new Response('Method not allowed', {
			status: 405,
			headers: corsHeaders,
		});
	}
}

export default {
	async fetch(request, env): Promise<Response> {
		try {
			const { pathname } = new URL(request.url);

			const { success } = await env.MY_RATE_LIMITER.limit({ key: pathname });
			if (!success) {
				return new Response(`429 Failure – rate limit exceeded for ${pathname}`, { status: 429 });
			}

			const body = await request.json();
			const text = (body as any).text;
			if (!text || text.length === 0) {
				return new Response(JSON.stringify({ success: false }));
			}
			const response = await env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
				prompt: `Generate a short summary of this:${text}`,
			});

			return new Response(JSON.stringify({ ...response, success: true }));
		} catch (err) {
			return new Response(JSON.stringify({ success: false }));
		}
	},
} satisfies ExportedHandler<Env>;
