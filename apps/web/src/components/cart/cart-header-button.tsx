import { Link } from 'react-router';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';

export function CartHeaderButton() {
	const { count, isLoading } = useCart();
	const label = !isLoading && count > 0 ? `Cart, ${count} item${count === 1 ? '' : 's'}` : 'Cart';

	return (
		<Link to="/cart" className="header-cart" aria-label={label}>
			<ShoppingBag size={17} strokeWidth={1.8} />
			<span>CART</span>
			{!isLoading && count > 0 ? <span className="cart-badge" aria-hidden="true">{count}</span> : null}
		</Link>
	);
}
