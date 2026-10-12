import { Coffee } from 'lucide-react';
import { useLoyalty } from '@/hooks/use-loyalty';

const steps = [
	{ label: 'ORDER', text: 'Place an online order or order at the counter.' },
	{ label: 'COLLECT', text: 'A stamp is added to your digital card with each order.' },
	{ label: 'SHOW', text: 'Show your card at the café — our team will take care of the rest.' },
];

export function Loyalty() {
	const { stamps, isLoading, maxStamps } = useLoyalty();

	return (
		<section className="loyalty-section section-pad" id="loyalty">
			<div className="wrap loyalty-grid">
				<div className="loyalty-copy">
					<span className="eyebrow">THE DAILY DOSE CARD</span>
					<h2>Your Coffee,<br /><em>Rewarded.</em></h2>
					<div className="small-rule" />
					<p>
						A little thank-you for making Coffaire part of your everyday. Collect a stamp with
						each order on your digital card — kept right here on your phone.
					</p>
					<div className="loyalty-steps">
						{steps.map((step) => (
							<span key={step.label}><b>{step.label}</b>{step.text}</span>
						))}
					</div>
				</div>
				<div className="loyalty-card" aria-label="Your digital loyalty card">
					<div className="loyalty-card-head">
						<span className="loyalty-card-brand">COFFAIRE<span className="brand-dot">.</span></span>
						<span className="loyalty-card-sub">DAILY DOSE CARD</span>
					</div>
					<div className="loyalty-stamps">
						{Array.from({ length: maxStamps }, (_, i) => (
							<span key={i} className={`loyalty-stamp${!isLoading && i < stamps ? ' filled' : ''}`}>
								{!isLoading && i < stamps ? <Coffee size={16} strokeWidth={1.8} /> : null}
							</span>
						))}
					</div>
					<p className="loyalty-progress">
						{isLoading
							? 'YOUR DAILY DOSE CARD'
							: stamps >= maxStamps
								? 'CARD COMPLETE — SHOW IT AT THE COUNTER'
								: `${stamps} OF ${maxStamps} STAMPS · ${maxStamps - stamps} TO GO`}
					</p>
					<p className="loyalty-note">Stamps are saved on this device. Show this screen at the café.</p>
				</div>
			</div>
		</section>
	);
}
