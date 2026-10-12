import type { Route } from './+types/checkout.cancelled';
import { seo } from '@/lib/seo';
import { CheckoutCancelled } from '@/components/cart/checkout-cancelled';

export function meta({ matches, location }: Route.MetaArgs) {
	return seo({ matches, location }, {
		title: 'Checkout Cancelled | Coffaire Nagpur',
		description: 'No payment was taken — your Coffaire cart is saved and ready whenever you are.',
		noindex: true,
	});
}

export default function CheckoutCancelledPage() {
	return <main><CheckoutCancelled /></main>;
}
