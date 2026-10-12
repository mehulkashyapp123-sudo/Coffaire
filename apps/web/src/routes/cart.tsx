import type { Route } from './+types/cart';
import { seo } from '@/lib/seo';
import { CartView } from '@/components/cart/cart-view';

export function meta({ matches, location }: Route.MetaArgs) {
	return seo({ matches, location }, {
		title: 'Your Cart | Coffaire Nagpur',
		description: 'Review your Coffaire order — coffee, pizza, desserts and more — and check out securely.',
		noindex: true,
	});
}

export default function CartPage() {
	return <main><CartView /></main>;
}
