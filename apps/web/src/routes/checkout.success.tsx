import type { Route } from './+types/checkout.success';
import { seo } from '@/lib/seo';
import { CheckoutSuccess } from '@/components/cart/checkout-success';

export function meta({ matches, location }: Route.MetaArgs) {
	return seo({ matches, location }, {
		title: 'Order Confirmed | Coffaire Nagpur',
		description: 'Thank you — your Coffaire order is confirmed and a receipt is on its way.',
		noindex: true,
	});
}

export default function CheckoutSuccessPage() {
	return <main><CheckoutSuccess /></main>;
}
