import { FormEvent, useState } from 'react';
import { Link } from 'react-router';
import { ArrowUpRight, Phone, MapPin, Send } from 'lucide-react';
import {
	address,
	phone,
	phoneUrl,
	directionsUrl,
	whatsappUrl,
} from '@/data/site';

export function SiteFooter() {
	const [submitted, setSubmitted] = useState(false);

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const form = event.currentTarget;
		const formData = new FormData(form);

		const name = String(formData.get('name') || '').trim();
		const customerPhone = String(formData.get('phone') || '').trim();
		const email = String(formData.get('email') || '').trim();
		const message = String(formData.get('message') || '').trim();

		if (!name || !customerPhone || !message) {
			return;
		}

		const enquiryMessage = [
			'Hi Coffaire! I would like to make an enquiry.',
			'',
			`Name: ${name}`,
			`Phone: ${customerPhone}`,
			email ? `Email: ${email}` : '',
			'',
			`Enquiry: ${message}`,
		]
			.filter(Boolean)
			.join('\n');

		
		
		const whatsappNumber = '918208656229';
		const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
			enquiryMessage,
		)}`;

		window.open(whatsappLink, '_blank', 'noopener,noreferrer');

		setSubmitted(true);
		form.reset();
	};

	return (
		<footer className="site-footer" id="contact">
			<div className="footer-top wrap">
				<div className="footer-intro">
					<span className="eyebrow light">COME ON IN</span>

					<h2>
						Let’s Get You Your
						<br />
						<em>Daily Dose.</em>
					</h2>

					<p>
						Planning a visit, gathering or celebration? Send us a quick
						enquiry and our team will get back to you on WhatsApp.
					</p>

					<div className="footer-buttons">
						<a href={phoneUrl} className="button button-cream">
							<Phone size={16} />
							CALL NOW
						</a>

						<a
							href={directionsUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="button button-outline-light"
						>
							GET DIRECTIONS
							<ArrowUpRight size={17} />
						</a>

						<a
							href={whatsappUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="button button-outline-light"
						>
							WHATSAPP US
							<ArrowUpRight size={17} />
						</a>
					</div>
				</div>

				<div className="footer-details">
					<div>
						<span className="footer-label">FIND US</span>

						<p>
							{address}
						</p>

						<a
							href={directionsUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="text-link light-link"
						>
							<MapPin size={16} />
							Open in Maps
							<ArrowUpRight size={15} />
						</a>
					</div>

					<div>
						<span className="footer-label">SAY HELLO</span>

						<a className="footer-phone" href={phoneUrl}>
							{phone}
						</a>

						<p>Open Daily · 8 AM – 11 PM</p>
					</div>
				</div>
			</div>

			{/* Customer enquiry */}
			<div className="wrap" style={{ paddingBottom: '5rem' }}>
				<div
					style={{
						borderTop: '1px solid rgba(255,255,255,0.16)',
						paddingTop: '4rem',
						display: 'grid',
						gridTemplateColumns: 'minmax(0, 0.85fr) minmax(0, 1.15fr)',
						gap: '3rem',
						alignItems: 'start',
					}}
				>
					<div>
						<span className="eyebrow light">HAVE A QUESTION?</span>

						<h2>
							Let’s Talk
							<br />
							<em>Over Coffee.</em>
						</h2>

						<p>
							Have a question about the menu, a gathering, a birthday,
							or your next visit? Fill in the form and send your enquiry
							directly to Coffaire on WhatsApp.
						</p>
					</div>

					<form
						onSubmit={handleSubmit}
						style={{
							display: 'grid',
							gap: '1rem',
						}}
					>
						<div
							style={{
								display: 'grid',
								gridTemplateColumns: '1fr 1fr',
								gap: '1rem',
							}}
						>
							<label
								style={{
									display: 'grid',
									gap: '0.45rem',
								}}
							>
								<span className="footer-label">YOUR NAME *</span>
								<input
									type="text"
									name="name"
									required
									placeholder="Your name"
									autoComplete="name"
									style={{
										width: '100%',
										padding: '0.9rem 1rem',
										border: '1px solid rgba(255,255,255,0.2)',
										borderRadius: '2px',
										background: 'rgba(255,255,255,0.06)',
										color: 'inherit',
										font: 'inherit',
										outline: 'none',
									}}
								/>
							</label>

							<label
								style={{
									display: 'grid',
									gap: '0.45rem',
								}}
							>
								<span className="footer-label">PHONE *</span>
								<input
									type="tel"
									name="phone"
									required
									placeholder="Your phone number"
									autoComplete="tel"
									style={{
										width: '100%',
										padding: '0.9rem 1rem',
										border: '1px solid rgba(255,255,255,0.2)',
										borderRadius: '2px',
										background: 'rgba(255,255,255,0.06)',
										color: 'inherit',
										font: 'inherit',
										outline: 'none',
									}}
								/>
							</label>
						</div>

						<label
							style={{
								display: 'grid',
								gap: '0.45rem',
							}}
						>
							<span className="footer-label">EMAIL</span>
							<input
								type="email"
								name="email"
								placeholder="your@email.com"
								autoComplete="email"
								style={{
									width: '100%',
									padding: '0.9rem 1rem',
									border: '1px solid rgba(255,255,255,0.2)',
									borderRadius: '2px',
									background: 'rgba(255,255,255,0.06)',
									color: 'inherit',
									font: 'inherit',
									outline: 'none',
								}}
							/>
						</label>

						<label
							style={{
								display: 'grid',
								gap: '0.45rem',
							}}
						>
							<span className="footer-label">YOUR ENQUIRY *</span>
							<textarea
								name="message"
								required
								rows={5}
								placeholder="Tell us how we can help..."
								style={{
									width: '100%',
									padding: '0.9rem 1rem',
									border: '1px solid rgba(255,255,255,0.2)',
									borderRadius: '2px',
									background: 'rgba(255,255,255,0.06)',
									color: 'inherit',
									font: 'inherit',
									outline: 'none',
									resize: 'vertical',
								}}
							/>
						</label>

						<button
							type="submit"
							className="button button-cream"
							style={{
								border: 'none',
								cursor: 'pointer',
								justifyContent: 'center',
							}}
						>
							<Send size={16} />
							SEND ENQUIRY ON WHATSAPP
						</button>

						{submitted && (
							<p
								role="status"
								style={{
									margin: 0,
									fontSize: '0.9rem',
									opacity: 0.8,
								}}
							>
								Your enquiry has been prepared in WhatsApp. Send the
								message there to complete your enquiry.
							</p>
						)}
					</form>
				</div>
			</div>

			<div className="footer-bottom wrap">
				<div>
					<Link to="/" className="brand footer-brand">
						<span className="brand-name">
							COFFAIRE<span className="brand-dot">.</span>
						</span>

						<span className="brand-tag">YOUR DAILY DOSE CAFE</span>
					</Link>

					<p>Coffee, food, conversations and everyday moments.</p>
				</div>

				<nav aria-label="Footer navigation">
					<Link to="/">Home</Link>
					<Link to="/menu">Menu</Link>
					<Link to="/#about">About</Link>
					<Link to="/#gallery">Gallery</Link>
					<Link to="/#contact">Contact</Link>
				</nav>

				<span className="copyright">
					© 2026 Coffaire, Your Daily Dose Cafe. All rights reserved.
				</span>
			</div>
		</footer>
	);
}
