import { useState } from 'react';
import { Link } from 'react-router';
import { ArrowRight, Clock3, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { formatCurrency, getProductQuantities, initializeCheckout } from '@/api/ecommerce-api';
import { useCart } from '@/hooks/use-cart';
import { phoneUrl, whatsappUrl } from '@/data/site';

export function CartView() {
	const { lines, isLoading, setQuantity, removeLine, totalInCents } = useCart();
	const [checkingOut, setCheckingOut] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const money = (cents: number) =>
		formatCurrency(cents, lines[0]?.currencyInfo ?? null) || `₹${(cents / 100).toFixed(2)}`;

	const handleCheckout = async () => {
		if (lines.length === 0 || checkingOut) {
			return;
		}
		setCheckingOut(true);
		setError(null);
		try {
			if (lines.some((line) => line.manageInventory)) {
				const { variants } = await getProductQuantities({
					fields: 'inventory_quantity',
					product_ids: lines.map((line) => line.productId),
				});
				const stockById = new Map(variants.map((v) => [v.id, v.inventory_quantity]));
				const shortLine = lines.find((line) => {
					const available = stockById.get(line.variantId);
					return available != null && line.quantity > available;
				});
				if (shortLine) {
					setError(`"${shortLine.title}" has only limited stock left. Please lower the quantity and try again.`);
					setCheckingOut(false);
					return;
				}
			}
			const { url } = await initializeCheckout({
				items: lines.map((line) => ({ variant_id: line.variantId, quantity: line.quantity })),
				successUrl: `${window.location.origin}/checkout/success`,
				cancelUrl: `${window.location.origin}/checkout/cancelled`,
				locale: 'en',
			});
			// The store client tags the hosted checkout URL with the store owner's
			// language, which is Hindi — force English so the payment page matches
			// the rest of the site.
			const checkoutUrl = url.includes('lang=')
				? url.replace(/([?&])lang=[^&]*/, '$1lang=en')
				: url;
			window.location.href = checkoutUrl;
		} catch {
			setError('We could not start checkout just now. Please try again in a moment.');
			setCheckingOut(false);
		}
	};

	if (isLoading) {
		return (
			<section className="cart-section section-pad">
				<div className="wrap">
					<span className="eyebrow"><span className="eyebrow-line" />Your Cart</span>
					<h2>Checking your cart…</h2>
					<div className="cart-skeleton" aria-hidden="true"><div /><div /><div /></div>
				</div>
			</section>
		);
	}

	if (lines.length === 0) {
		return (
			<section className="cart-section section-pad">
				<div className="wrap">
					<span className="eyebrow"><span className="eyebrow-line" />Your Cart</span>
					<h2>Your cart is <em>empty</em></h2>
					<p className="cart-empty-text">
						Nothing here yet. Browse our order menu and add your favourites — coffee, pizza, desserts and more.
					</p>
					<Link className="button button-dark" to="/order">BROWSE THE ORDER MENU <ArrowRight size={14} /></Link>
				</div>
			</section>
		);
	}

	return (
		<section className="cart-section section-pad">
			<div className="wrap">
				<span className="eyebrow"><span className="eyebrow-line" />Your Cart</span>
				<h2>Review your <em>order</em></h2>
				<div className="cart-layout">
					<div className="cart-lines">
						{lines.map((line) => (
							<div className="cart-line" key={line.variantId}>
								{line.image ? <img src={line.image} alt={line.title} /> : <span className="cart-line-thumb" aria-hidden="true" />}
								<div>
									<p className="cart-line-title">{line.title}</p>
									<p className="cart-line-unit">{money(line.priceInCents)} each</p>
									<div className="cart-line-actions">
										<div className="qty-controls">
											<button
												type="button"
												aria-label={`Decrease quantity of ${line.title}`}
												onClick={() => setQuantity(line.variantId, line.quantity - 1)}
											>
												<Minus size={14} />
											</button>
											<span>{line.quantity}</span>
											<button
												type="button"
												aria-label={`Increase quantity of ${line.title}`}
												onClick={() => setQuantity(line.variantId, line.quantity + 1)}
											>
												<Plus size={14} />
											</button>
										</div>
										<button
											type="button"
											className="cart-remove"
											aria-label={`Remove ${line.title} from cart`}
											onClick={() => removeLine(line.variantId)}
										>
											<Trash2 size={16} />
										</button>
									</div>
								</div>
								<strong className="cart-line-total">{money(line.priceInCents * line.quantity)}</strong>
							</div>
						))}
					</div>
					<aside className="cart-summary">
						<h2>Order Summary</h2>
						<div className="cart-summary-row"><span>Items</span><span>{lines.reduce((sum, line) => sum + line.quantity, 0)}</span></div>
						<div className="cart-summary-row"><span>Subtotal</span><span>{money(totalInCents)}</span></div>
						<div className="cart-summary-total"><span>Total</span><span>{money(totalInCents)}</span></div>
						<button type="button" className="button button-dark cart-checkout" onClick={handleCheckout} disabled={checkingOut}>
							{checkingOut ? 'STARTING CHECKOUT…' : <>PROCEED TO CHECKOUT <ArrowRight size={14} /></>}
						</button>
						{error ? <p className="cart-error" role="alert">{error}</p> : null}
						<p className="cart-note"><ShoppingBag size={13} /> Pickup at the café — you pay securely on the next screen.</p>
					<p className="cart-note"><Clock3 size={13} /> After ordering, <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">WhatsApp us</a> or call <a href={phoneUrl}>08208656229</a> with your preferred pickup time.</p>
					</aside>
				</div>
			</div>
		</section>
	);
}
