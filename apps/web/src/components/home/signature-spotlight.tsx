import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';
import { images } from '@/data/site';
import { Reveal } from '@/components/reveal';

export function SignatureSpotlight() {
	return (
		<section className="signature-section section-pad">
			<div className="wrap signature-grid">
				<Reveal className="signature-copy">
					<span className="eyebrow">THE SIGNATURE POUR</span>
					<h2>Coconut Coffee <em>Cloud.</em></h2>
					<div className="small-rule" />
					<p>
						A Coffaire original from our Cloud series — coffee under a light, silky coconut cloud.
						If it is your first visit, start here.
					</p>
					<p className="signature-price">₹220 · part of the Cloud series</p>
					<Link to="/order" className="button button-dark">ORDER YOURS <ArrowUpRight size={18} /></Link>
				</Reveal>
				<Reveal delay={120}>
					<div className="signature-photo">
						<img src={images.cloud} alt="Iced coconut coffee cloud drink" width="800" height="600" loading="lazy" />
						<span className="signature-badge">SIGNATURE · CLOUD SERIES</span>
					</div>
				</Reveal>
			</div>
		</section>
	);
}
