import { useEffect, useState } from 'react';

const OPEN_HOUR = 8;
const CLOSE_HOUR = 23;

/**
 * Live open/closed indicator for the café's daily 8 AM – 11 PM hours.
 * Renders the static text on the server and on the first client render
 * (hydration-safe), then swaps in the live status once mounted.
 */
export function OpenStatus() {
	const [status, setStatus] = useState<'open' | 'closed' | null>(null);

	useEffect(() => {
		const compute = () => {
			const now = new Date();
			const hour = now.getHours() + now.getMinutes() / 60;
			setStatus(hour >= OPEN_HOUR && hour < CLOSE_HOUR ? 'open' : 'closed');
		};
		compute();
		const id = window.setInterval(compute, 60_000);
		return () => window.clearInterval(id);
	}, []);

	const label =
		status === 'open'
			? 'Open now · until 11 PM'
			: status === 'closed'
				? 'Closed now · opens 8 AM'
				: 'Open Daily · 8 AM – 11 PM';

	return (
		<span className={`open-status${status ? ` ${status}` : ''}`}>
			<span className="open-status-dot" aria-hidden="true" />
			{label}
		</span>
	);
}
