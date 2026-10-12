import { ArrowUpRight } from 'lucide-react';
import { gallery } from '@/data/site';
import { Reveal } from '@/components/reveal';

const shareUrl = `https://wa.me/918208656229?text=${encodeURIComponent(
	'Hi Coffaire! I would like to share a photo from my visit.',
)}`;

const spans = ['wall-s1', 'wall-s2', 'wall-s2', 'wall-s3', 'wall-s3', 'wall-s1', 'wall-s2', 'wall-s2'];

export function VisualWall() {
	return (
		<section className="wall-section section-pad" id="wall">
			<div className="wrap">
				<div className="section-head">
					<div>
						<span className="eyebrow">FROM OUR TABLES</span>
						<h2>Moments,<br /><em>Captured.</em></h2>
					</div>
					<p>A scroll through coffee, food and everyday café moments — shot at Coffaire.</p>
				</div>
				<Reveal>
					<div className="wall-grid">
						{gallery.map((item, i) => (
							<div className={`wall-tile ${spans[i % spans.length]}`} key={`${item.label}-${i}`}>
								<img src={item.image} alt={item.alt} width="800" height="600" loading="lazy" />
								<span>{item.label}</span>
							</div>
						))}
					</div>
				</Reveal>
				<div className="wall-cta">
					<p>Shot something worth sharing at the café? Send us your photos — we would love to see them.</p>
					<a href={shareUrl} target="_blank" rel="noopener noreferrer" className="button button-dark">
						SHARE YOUR PHOTOS <ArrowUpRight size={18} />
					</a>
				</div>
			</div>
		</section>
	);
}
