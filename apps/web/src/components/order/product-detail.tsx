import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { ArrowLeft, Check, Minus, Plus } from 'lucide-react';
import { formatCurrency, type Product, type ProductVariant } from '@/api/ecommerce-api';
import { useCart } from '@/hooks/use-cart';

const resolveVariant = (product: Product, selected: Record<string, string>): ProductVariant | null => {
	if (product.options.length === 0) {
		return product.variants[0] ?? null;
	}

	return (
		product.variants.find((variant) =>
			product.options.every((option) =>
				variant.options.some((vo) => vo.option_id === option.id && vo.value === selected[option.id]),
			),
		) ?? null
	);
};

const FLAVOURS = ['Classic', 'Vanilla', 'Hazelnut', 'Caramel', 'Mocha', 'Tiramisu'];
const PIZZA_ADDONS = [
	{ name: 'Extra Cheese', price: 200 },
	{ name: 'Chicken', price: 60 },
	{ name: 'Paneer', price: 50 },
	{ name: 'Single Veggie', price: 30 },
];

export function ProductDetail({ product }: { product: Product }) {
	const { addLine } = useCart();
	const [selected, setSelected] = useState<Record<string, string>>(() =>
		Object.fromEntries(product.options.map((option) => [option.id, option.values[0]?.value ?? ''])),
	);
	const [quantity, setQuantity] = useState(1);
	const [added, setAdded] = useState(false);
	const [flavour, setFlavour] = useState('Classic');
	const timer = useRef<number | undefined>(undefined);

	const isCoffee = /latte|coffee|cappuccino|americano|macchiato|cortado|flat white/i.test(product.title);
	const isPizza = /pizza|garlic bread/i.test(product.title);

	useEffect(() => () => window.clearTimeout(timer.current), []);

	const variant = resolveVariant(product, selected);
	const unitPrice = variant ? (variant.sale_price_in_cents ?? variant.price_in_cents) : product.price_in_cents;
	const price =
		formatCurrency(unitPrice, variant?.currency_info ?? product.currency_info) || product.price_formatted;
	const stock = variant?.manage_inventory ? variant.inventory_quantity : null;
	const limited = stock != null && stock > 0 ? stock : null;
	const canAdd = Boolean(variant) && product.purchasable && (stock == null || stock > 0);

	const handleAdd = () => {
		if (!variant) {
			return;
		}
		addLine({
			productId: product.id,
			variantId: variant.id,
			title: isCoffee && flavour !== 'Classic' ? `${product.title} · ${flavour}` : product.title,
			priceInCents: unitPrice,
			currencyInfo: variant.currency_info ?? product.currency_info,
			image: product.image || null,
			manageInventory: variant.manage_inventory,
			quantity,
		});
		setAdded(true);
		window.clearTimeout(timer.current);
		timer.current = window.setTimeout(() => setAdded(false), 1600);
	};

	return (
		<section className="product-detail-section section-pad">
			<div className="wrap">
				<Link to="/order" className="order-back"><ArrowLeft size={14} /> BACK TO ORDER MENU</Link>
				<div className="product-layout">
					<div className="product-media">
						{product.image ? <img src={product.image} alt={product.seo.image_alt || product.title} /> : null}
					</div>
					<div className="product-info">
						<span className="card-category">{product.subtitle || 'Coffaire Classic'}</span>
						<h1 className="product-title">{product.title}</h1>
						<p className="product-price">{price}</p>
						{product.description ? (
							<div className="product-description" dangerouslySetInnerHTML={{ __html: product.description }} />
						) : null}
						{product.options.length > 0 && (
							<div className="product-options">
								{product.options.map((option) => (
									<label key={option.id}>
										{option.title}
										<select
											value={selected[option.id] ?? ''}
											onChange={(event) =>
												setSelected((prev) => ({ ...prev, [option.id]: event.target.value }))
											}
										>
											{option.values.map((value) => (
												<option key={value.id} value={value.value}>{value.value}</option>
											))}
										</select>
									</label>
								))}
							</div>
						)}
						{isCoffee && (
							<div className="product-options">
								<label>
									Flavour
									<select value={flavour} onChange={(event) => setFlavour(event.target.value)}>
										{FLAVOURS.map((flavourOption) => (
											<option key={flavourOption} value={flavourOption}>{flavourOption}</option>
										))}
									</select>
								</label>
							</div>
						)}
						{isPizza && (
							<div className="product-addons">
								<span className="product-addons-label">Add-ons available at the café</span>
								<div className="addon-chips">
									{PIZZA_ADDONS.map((addon) => (
										<span key={addon.name}>{addon.name} · +₹{addon.price}</span>
									))}
								</div>
								<p className="stock-note">Ask for add-ons at the counter when you pick up your order.</p>
							</div>
						)}
						<div className="qty-row">
							<div className="qty-controls">
								<button
									type="button"
									aria-label="Decrease quantity"
									onClick={() => setQuantity((q) => Math.max(1, q - 1))}
									disabled={quantity <= 1}
								>
									<Minus size={15} />
								</button>
								<span>{quantity}</span>
								<button
									type="button"
									aria-label="Increase quantity"
									onClick={() => setQuantity((q) => Math.min(limited ?? 99, q + 1))}
									disabled={limited != null && quantity >= limited}
								>
									<Plus size={15} />
								</button>
							</div>
							<button type="button" className="button button-dark" onClick={handleAdd} disabled={!canAdd}>
								{added ? <><Check size={14} /> ADDED TO CART</> : <><Plus size={14} /> ADD TO CART</>}
							</button>
						</div>
						{stock != null && stock > 0 && stock <= 5 ? (
							<p className="stock-note">Only {stock} left in stock right now.</p>
						) : null}
						{stock === 0 ? <p className="stock-note">Sold out for now — check back soon.</p> : null}
					</div>
				</div>
			</div>
		</section>
	);
}
