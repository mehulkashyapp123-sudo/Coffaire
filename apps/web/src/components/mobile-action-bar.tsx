import { Link } from 'react-router';
import { BookOpen, MapPin, Phone, ShoppingBag, ShoppingCart } from 'lucide-react';
import { directionsUrl, phoneUrl } from '@/data/site';
import { useCart } from '@/hooks/use-cart';

export function MobileActionBar() {
	const { count, isLoading } = useCart();
	const cartLabel = !isLoading && count > 0 ? `Cart, ${count} item${count === 1 ? '' : 's'}` : 'Cart';

	return (
		<nav className="mobile-action-bar" aria-label="Quick actions">
			<a href={phoneUrl}><Phone size={17} /> CALL</a>
			<Link to="/menu"><BookOpen size={17} /> MENU</Link>
			<Link to="/order"><ShoppingBag size={17} /> ORDER</Link>
			<Link to="/cart" aria-label={cartLabel}>
				<span className="action-cart-icon" aria-hidden="true">
					<ShoppingCart size={17} />
					{!isLoading && count > 0 ? <span className="action-cart-badge">{count}</span> : null}
				</span>
				CART
			</Link>
			<a href={directionsUrl} target="_blank" rel="noopener noreferrer" aria-label="Get directions"><MapPin size={17} /> MAP</a>
		</nav>
	);
}
