import { ArrowUpRight, CalendarDays, Clock3, Phone, Send, Users } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { images, phoneUrl, phone } from '@/data/site';
import { Reveal } from '@/components/reveal';

const enquiryUrl = `https://wa.me/918208656229?text=${encodeURIComponent(
	'Hi Coffaire! I would like to enquire about a gathering or celebration at the café.',
)}`;

const points = [
	'Birthday and small-group get-togethers',
	'Coffee-and-pizza menus for your table',
	'One WhatsApp message to get started',
];

export function Celebrations() {
	const [submitted, setSubmitted] = useState(false);

	const handleBookingSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const form = event.currentTarget;
		const formData = new FormData(form);

		const name = String(formData.get('name') || '').trim();
		const customerPhone = String(formData.get('phone') || '').trim();
		const date = String(formData.get('date') || '').trim();
		const time = String(formData.get('time') || '').trim();
		const guests = String(formData.get('guests') || '').trim();
		const request = String(formData.get('request') || '').trim();

		if (!name || !customerPhone || !date || !time || !guests) {
			return;
		}

		const bookingMessage = [
			'Hi Coffaire! I would like to make a booking request.',
			'',
			`Name: ${name}`,
			`Phone: ${customerPhone}`,
			`Date: ${date}`,
			`Preferred Time: ${time}`,
			`Number of Guests: ${guests}`,
			request ? `Special Request: ${request}` : '',
			'',
			'Please confirm availability for this booking request.',
		]
			.filter(Boolean)
			.join('\n');

		
		const whatsappNumber = '918208656229';
		const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
			bookingMessage,
		)}`;

		window.open(whatsappLink, '_blank', 'noopener,noreferrer');

		setSubmitted(true);
		form.reset();
	};

	return (
		<section className="celebrations-section section-pad" id="celebrations">
			<div className="wrap celebrations-grid">
				<Reveal className="celebrations-copy">
					<span className="eyebrow light">GATHERINGS &amp; CELEBRATIONS</span>

					<h2>
						Celebrate It <em>Over Coffee.</em>
					</h2>

					<p>
						Birthdays, small get-togethers, catch-ups — tell us what you are
						planning and our team will help you figure out the menu, the
						table and the details.
					</p>

					<div className="celebration-points">
						{points.map((point, i) => (
							<span key={point}>
								<b>0{i + 1}</b>
								{point}
							</span>
						))}
					</div>

					<div className="footer-buttons">
						<a
							href={enquiryUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="button button-cream"
						>
							ENQUIRE ON WHATSAPP
							<ArrowUpRight size={18} />
						</a>

						<a href={phoneUrl} className="button button-outline-light">
							<Phone size={16} />
							CALL THE CAFÉ
						</a>
					</div>
				</Reveal>

				<Reveal delay={120}>
					<div className="signature-photo">
						<img
							src={images.cafe}
							alt="Warm café interior set for a gathering"
							width="800"
							height="600"
							loading="lazy"
						/>

						<span className="signature-badge">
							KATOL ROAD · NAGPUR
						</span>
					</div>
				</Reveal>
			</div>

			{/* Booking request */}
			<div
				className="wrap"
				style={{
					marginTop: '4rem',
				}}
			>
				<div
					style={{
						borderTop: '1px solid rgba(255,255,255,0.16)',
						paddingTop: '4rem',
						display: 'grid',
						gridTemplateColumns:
							'minmax(0, 0.85fr) minmax(0, 1.15fr)',
						gap: '3rem',
						alignItems: 'start',
					}}
				>
					<div>
						<span className="eyebrow light">BOOK YOUR TABLE</span>

						<h2>
							Make It
							<br />
							<em>A Coffee Date.</em>
						</h2>

						<p>
							Request a table for your next visit. Tell us when
							you would like to come and how many people are
							joining you. We'll send your request directly to
							Coffaire on WhatsApp for confirmation.
						</p>

						<p
							style={{
								fontSize: '0.85rem',
								opacity: 0.7,
								marginTop: '1rem',
							}}
						>
							Booking requests are subject to café availability
							and are confirmed by the Coffaire team.
						</p>
					</div>

					<form
						onSubmit={handleBookingSubmit}
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
								<span className="footer-label">
									YOUR NAME *
								</span>

								<input
									type="text"
									name="name"
									required
									placeholder="Your name"
									autoComplete="name"
									style={{
										width: '100%',
										padding: '0.9rem 1rem',
										border:
											'1px solid rgba(255,255,255,0.2)',
										borderRadius: '2px',
										background:
											'rgba(255,255,255,0.06)',
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
								<span className="footer-label">
									PHONE *
								</span>

								<input
									type="tel"
									name="phone"
									required
									placeholder="Your phone number"
									autoComplete="tel"
									style={{
										width: '100%',
										padding: '0.9rem 1rem',
										border:
											'1px solid rgba(255,255,255,0.2)',
										borderRadius: '2px',
										background:
											'rgba(255,255,255,0.06)',
										color: 'inherit',
										font: 'inherit',
										outline: 'none',
									}}
								/>
							</label>
						</div>

						<div
							style={{
								display: 'grid',
								gridTemplateColumns:
									'repeat(3, minmax(0, 1fr))',
								gap: '1rem',
							}}
						>
							<label
								style={{
									display: 'grid',
									gap: '0.45rem',
								}}
							>
								<span className="footer-label">
									DATE *
								</span>

								<div
									style={{
										position: 'relative',
									}}
								>
									<CalendarDays
										size={17}
										style={{
											position: 'absolute',
											left: '0.9rem',
											top: '50%',
											transform:
												'translateY(-50%)',
											opacity: 0.65,
											pointerEvents: 'none',
										}}
									/>

									<input
										type="date"
										name="date"
										required
										style={{
											width: '100%',
											padding: '0.9rem 1rem 0.9rem 2.7rem',
											border:
												'1px solid rgba(255,255,255,0.2)',
											borderRadius: '2px',
											background:
												'rgba(255,255,255,0.06)',
											color: 'inherit',
											font: 'inherit',
											outline: 'none',
										}}
									/>
								</div>
							</label>

							<label
								style={{
									display: 'grid',
									gap: '0.45rem',
								}}
							>
								<span className="footer-label">
									TIME *
								</span>

								<div
									style={{
										position: 'relative',
									}}
								>
									<Clock3
										size={17}
										style={{
											position: 'absolute',
											left: '0.9rem',
											top: '50%',
											transform:
												'translateY(-50%)',
											opacity: 0.65,
											pointerEvents: 'none',
										}}
									/>

									<input
										type="time"
										name="time"
										required
										style={{
											width: '100%',
											padding: '0.9rem 1rem 0.9rem 2.7rem',
											border:
												'1px solid rgba(255,255,255,0.2)',
											borderRadius: '2px',
											background:
												'rgba(255,255,255,0.06)',
											color: 'inherit',
											font: 'inherit',
											outline: 'none',
										}}
									/>
								</div>
							</label>

							<label
								style={{
									display: 'grid',
									gap: '0.45rem',
								}}
							>
								<span className="footer-label">
									GUESTS *
								</span>

								<div
									style={{
										position: 'relative',
									}}
								>
									<Users
										size={17}
										style={{
											position: 'absolute',
											left: '0.9rem',
											top: '50%',
											transform:
												'translateY(-50%)',
											opacity: 0.65,
											pointerEvents: 'none',
										}}
									/>

									<select
										name="guests"
										required
										defaultValue=""
										style={{
											width: '100%',
											padding: '0.9rem 1rem 0.9rem 2.7rem',
											border:
												'1px solid rgba(255,255,255,0.2)',
											borderRadius: '2px',
											background:
												'rgba(255,255,255,0.06)',
											color: 'inherit',
											font: 'inherit',
											outline: 'none',
										}}
									>
										<option value="" disabled>
											Guests
										</option>
										<option value="1">1 guest</option>
										<option value="2">2 guests</option>
										<option value="3">3 guests</option>
										<option value="4">4 guests</option>
										<option value="5">5 guests</option>
										<option value="6">6 guests</option>
										<option value="7">7 guests</option>
										<option value="8">8 guests</option>
										<option value="9">9 guests</option>
										<option value="10+">10+ guests</option>
									</select>
								</div>
							</label>
						</div>

						<label
							style={{
								display: 'grid',
								gap: '0.45rem',
							}}
						>
							<span className="footer-label">
								SPECIAL REQUEST
							</span>

							<textarea
								name="request"
								rows={4}
								placeholder="Birthday, seating preference, celebration details, etc."
								style={{
									width: '100%',
									padding: '0.9rem 1rem',
									border:
										'1px solid rgba(255,255,255,0.2)',
									borderRadius: '2px',
									background:
										'rgba(255,255,255,0.06)',
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
							SEND BOOKING REQUEST ON WHATSAPP
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
								Your booking request has been opened in
								WhatsApp. Send the message to Coffaire to
								complete your request.
							</p>
						)}
					</form>
				</div>
			</div>
		</section>
	);
}