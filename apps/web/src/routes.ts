import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
	index('routes/home.tsx'),
	route('menu', 'routes/menu.tsx'),
	route('order', 'routes/order.tsx'),
	route('order/:handle', 'routes/order.$handle.tsx'),
	route('cart', 'routes/cart.tsx'),
	route('checkout/success', 'routes/checkout.success.tsx'),
	route('checkout/cancelled', 'routes/checkout.cancelled.tsx'),
	route('llms.txt', 'routes/llms.txt.ts'),
	route('sitemap.xml',  'routes/sitemap.xml.ts'),
	route('robots.txt', 'routes/robots.txt.ts'),
	route('api/health', 'routes/api.health.ts'),
	route('api/*', 'routes/api.$.ts'),
] satisfies RouteConfig;
