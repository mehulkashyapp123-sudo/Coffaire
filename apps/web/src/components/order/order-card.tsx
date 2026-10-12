import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { Check, Plus } from 'lucide-react';
import { formatCurrency, type ProductListItem } from '@/api/ecommerce-api';
import { useCart } from '@/hooks/use-cart';

export function OrderCard({ product, index }: { product: ProductListItem; index: number }) {
	const { addLine } = useCart();
	const [added, setAdded] = useState(false);
	const timer = useRef<number | undefined>(undefined);

	useEffect(() => () => window.clearTimeout(timer.current), []);

	const variant = product.variants[0];
	const price = product.price_formatted || formatCurrency(product.price_in_cents, product.currency_info);
	const needsOptions = product.options.length > 0;
	const soldOut = !product.purchasable || !variant;

	const handleAdd = () => {
		if (!variant) {
			return;
		}
		addLine({
			productId: product.id,
			variantId: variant.id,
			title: product.title,
			priceInCents: product.price_in_cents,
			currencyInfo: product.currency_info,
			image: product.image || null,
			manageInventory: variant.manage_inventory,
		});
		setAdded(true);
		window.clearTimeout(timer.current);
		timer.current = window.setTimeout(() => setAdded(false), 1600);
	};

	return (
		<article className="order-card">
			<Link to={`/order/${product.url_handle}`} className="order-card-media" aria-label={product.title}>
				{product.image ? <img src={product.image} alt={product.title} loading="lazy" /> : null}
				<span className="card-index">{String(index + 1).padStart(2, '0')}</span>
			</Link>
			<div className="order-card-detail">
				<span className="card-category">{product.subtitle || 'Coffaire Classic'}</span>
				<div className="featured-title-row">
					<h3>{product.title}</h3>
					<strong>{price}</strong>
				</div>
				<p>{product.seo.description}</p>
				{needsOptions ? (
					<Link to={`/order/${product.url_handle}`} className="button button-dark order-add">CHOOSE OPTIONS</Link>
				) : soldOut ? (
					<button type="button" className="button button-dark order-add" disabled>SOLD OUT</button>
				) : (
					<button type="button" className="button button-dark order-add" onClick={handleAdd}>
						{added ? <><Check size={14} /> ADDED</> : <><Plus size={14} /> ADD TO CART</>}
					</button>
				)}
			</div>
		</article>
	);
}
