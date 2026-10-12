import type { Route } from './+types/order';
import { seo } from '@/lib/seo';
import { getProducts } from '@/api/ecommerce-api';
import { OrderBoard } from '@/components/order/order-board';

export function meta({ matches, location }: Route.MetaArgs) {
	return seo({ matches, location }, {
		title: 'Order Online | Coffaire Nagpur — Coffee, Pizza & Desserts',
		description: 'Order Coffaire favourites online — café lattes, matcha, cold brews, Neapolitan pizza, brownies and more, picked up fresh from our Katol Road café in Nagpur.',
	});
}

export async function loader() {
	const { products } = await getProducts({
		limit: 60,
		sort_by: 'order',
		order: 'ASC',
		exclude_types: 'subscription',
	});

	return { products };
}

export default function OrderPage({ loaderData }: Route.ComponentProps) {
	return <main><OrderBoard products={loaderData.products} /></main>;
}
