import type { Route } from './+types/order.$handle';
import { absoluteUrl, seo, siteOriginFrom } from '@/lib/seo';
import { EcommerceApiError, getProductByHandle, toPriceUnits } from '@/api/ecommerce-api';
import type { Product } from '@/api/ecommerce-api';
import { ProductDetail } from '@/components/order/product-detail';

const productJsonLd = (product: Product, url: string) => {
	const images = product.images.length
		? product.images.map((image) => image.url)
		: [product.seo.image].filter(Boolean);

	return {
		'@context': 'https://schema.org',
		'@type': 'Product',
		name: product.title,
		description: product.seo.description,
		...(images.length ? { image: images } : {}),
		sku: product.variants[0]?.sku || undefined,
		offers: {
			'@type': 'Offer',
			url,
			price: toPriceUnits(product.price_in_cents, product.currency_info),
			priceCurrency: product.currency.toUpperCase(),
			availability: product.purchasable
				? 'https://schema.org/InStock'
				: 'https://schema.org/OutOfStock',
		},
	};
};

export function meta({ matches, location, loaderData }: Route.MetaArgs) {
	if (!loaderData) {
		return seo({ matches, location }, {
			title: 'Item not found | Coffaire',
			description: 'This item is no longer available on our order menu.',
			noindex: true,
		});
	}

	const { product } = loaderData;

	return seo({ matches, location }, {
		title: product.seo.title,
		description: product.seo.description,
		image: product.seo.image,
		noindex: product.seo.noindex,
		jsonLd: productJsonLd(product, absoluteUrl(siteOriginFrom(matches), location.pathname)),
	});
}

export async function loader({ params }: Route.LoaderArgs) {
	try {
		return { product: await getProductByHandle(params.handle) };
	} catch (error) {
		if (error instanceof EcommerceApiError && error.status === 404) {
			throw new Response('Not found', { status: 404 });
		}

		throw error;
	}
}

export default function OrderItemPage({ loaderData }: Route.ComponentProps) {
	return <main><ProductDetail product={loaderData.product} /></main>;
}
