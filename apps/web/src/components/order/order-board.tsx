import type { ProductListItem } from '@/api/ecommerce-api';
import { OrderCard } from '@/components/order/order-card';

export function OrderBoard({ products }: { products: ProductListItem[] }) {
	return (
		<section className="order-board-section section-pad">
			<div className="wrap">
				<div className="section-head">
					<div>
						<span className="eyebrow"><span className="eyebrow-line" />Order Online</span>
						<h2>Order Your <em>Favourites</em></h2>
					</div>
					<p>Add your favourites to the cart and check out securely — made fresh at our Katol Road counter.</p>
				</div>
				{products.length === 0 ? (
					<p className="order-empty">
						Our online ordering menu is being refreshed right now. Please check back soon, or call us to place an order.
					</p>
				) : (
					<div className="order-grid">
						{products.map((product, index) => (
							<OrderCard key={product.id} product={product} index={index} />
						))}
					</div>
				)}
			</div>
		</section>
	);
}
