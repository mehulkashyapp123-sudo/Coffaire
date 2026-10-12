import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';

export function CheckoutCancelled() {
	return (
		<section className="checkout-status section-pad">
			<div className="wrap">
				<div className="checkout-panel">
					<h2>No worries — nothing was <em>charged</em></h2>
					<p>
						You stepped away before completing the payment, so no payment was taken. Your cart is just as
						you left it, ready whenever you are.
					</p>
					<div className="checkout-actions">
						<Link className="button button-dark" to="/cart">BACK TO MY CART <ArrowRight size={14} /></Link>
						<Link className="button button-cream" to="/order">KEEP BROWSING</Link>
					</div>
				</div>
			</div>
		</section>
	);
}
