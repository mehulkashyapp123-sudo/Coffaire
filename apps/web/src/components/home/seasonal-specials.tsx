import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';
import { images } from '@/data/site';
import { Reveal } from '@/components/reveal';

const picks = [
	{
		name: 'Mango Matcha Latte',
		price: 200,
		image: images.matcha,
		description: 'Matcha with a mango twist.',
		category: 'Matcha',
	},
	{
		name: 'Dark Mocha Frappe',
		price: 220,
		image: images.frappe,
		description: 'Dark chocolate and coffee, blended cold.',
		category: 'Frappe',
	},
	{
		name: 'Truffle Mushroom Pizza',
		price: 380,
		image: images.pizza,
		description: 'Bechamel, sautéed mushrooms and truffle oil.',
		category: 'Pizza',
	},
	{
		name: 'Sizzling Choco Walnut Brownie',
		price: 220,
		image: images.brownie,
		description: 'Served warm with vanilla ice cream.',
		category: 'Dessert',
	},
];

export function SeasonalSpecials() {
	return (
		<section className="seasonal-section section-pad" id="specials">
			<div className="wrap">
				<div className="section-head">
					<div>
						<span className="eyebrow">CURRENTLY ON OUR LIST</span>
						<h2>What We&rsquo;re <em>Pouring Now.</em></h2>
					</div>
					<p>A few favourites from the menu worth crossing the door for today.</p>
				</div>
				<div className="seasonal-grid">
					{picks.map((item, i) => (
						<Reveal key={item.name} delay={i * 60}>
							<article className="featured-card">
								<div className="featured-image">
									<img src={item.image} alt={item.name} width="800" height="600" loading="lazy" />
									<span className="card-index">0{i + 1}</span>
								</div>
								<div className="featured-detail">
									<span className="card-category">{item.category}</span>
									<div className="featured-title-row">
										<h3>{item.name}</h3>
										<strong>₹{item.price}</strong>
									</div>
									<p>{item.description}</p>
								</div>
							</article>
						</Reveal>
					))}
				</div>
				<div className="center-cta">
					<Link to="/menu" className="button button-dark">SEE THE FULL MENU <ArrowUpRight size={18} /></Link>
				</div>
			</div>
		</section>
	);
}
