import { useEffect } from 'react';
import { Link } from 'react-router';
import { Check, Coffee } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { useLoyalty } from '@/hooks/use-loyalty';
import { whatsappUrl } from '@/data/site';

export function CheckoutSuccess() {
	const { isLoading, clear } = useCart();
	const { stamps, isLoading: loyaltyLoading, addStamp } = useLoyalty();

	useEffect(() => {
		if (!isLoading) {
			clear();
			addStamp();
		}
	}, [isLoading, clear, addStamp]);

	return (
		<section className="checkout-status section-pad">
			<div className="wrap">
				<div className="checkout-panel">
					<span className="checkout-icon"><Check size={26} strokeWidth={2.2} /></span>
					<h2>Thank you — your order has been <em>received</em></h2>
<p>
    Your order has been received successfully. Please complete your UPI payment using the
    instructions provided at checkout. Your order will be confirmed once payment is verified.
</p>
					<div className="checkout-actions">
						<Link className="button button-dark" to="/order">ORDER SOMETHING ELSE</Link>
						<Link className="button button-cream" to="/">BACK TO HOME</Link>
					</div>
					<a className="checkout-whatsapp" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
						Need help with your order? Chat with us on WhatsApp
					</a>
					{!loyaltyLoading && (
						<p className="loyalty-earned">
							<Coffee size={14} />
							{stamps === 0
								? 'Your Daily Dose card is complete — show it at the counter and start a fresh one.'
								: `Stamp ${stamps} of 9 added to your Daily Dose card.`}{' '}
							<Link to="/#loyalty">See your card</Link>
						</p>
					)}
				</div>
			</div>
		</section>
	);
}
