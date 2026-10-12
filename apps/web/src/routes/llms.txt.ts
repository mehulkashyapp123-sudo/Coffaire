import type { Route } from './+types/llms.txt';
import { siteOrigin } from '@/lib/site-origin.server';
import { getProducts } from '@/api/ecommerce-api';

export async function loader({ request }: Route.LoaderArgs) {
	const origin = siteOrigin(request);

	let productLines = '';
	try {
		const { products } = await getProducts({ limit: 100, exclude_types: 'subscription' });
		productLines = products
			.filter((product) => product.url_handle && !product.seo.noindex)
			.map((product) => `- [${product.title}](${origin}/order/${product.url_handle}): ${product.seo.description}`)
			.join('\n');
	} catch {
		// Store unreachable — the page list below still serves.
	}

	const body = `# Coffaire, Your Daily Dose Cafe

> A café on Katol Road, Nagpur serving specialty coffee, matcha, cold brews, Neapolitan pizza and desserts. Open daily 8 AM to 11 PM.

## Pages
- [Home](${origin}/): Coffaire, Your Daily Dose Cafe — coffee, food and good moments in Nagpur.
- [Menu](${origin}/menu): The full café menu with prices — coffee, cold coffee, matcha, cold brew, frappes, mocktails, chocolate, desserts, pizza and sides.
- [Order Online](${origin}/order): Order coffee, pizza and desserts online for pickup at the café.
- [Questions](${origin}/#faq): Opening hours, location, ordering and customisation answers.

## Order menu
${productLines}
`;

	return new Response(body, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'public, max-age=3600',
		},
	});
}
