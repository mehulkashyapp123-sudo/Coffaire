import { Link } from 'react-router';
import { BookOpen, MapPin, Phone } from 'lucide-react';
import { directionsUrl, phoneUrl } from '@/data/site';

export function MobileActionBar() {
	return (
		<nav className="mobile-action-bar" aria-label="Quick actions">
			<a href={phoneUrl}>
				<Phone size={17} /> CALL
			</a>

			<Link to="/menu">
				<BookOpen size={17} /> MENU
			</Link>

			<a
				href={directionsUrl}
				target="_blank"
				rel="noopener noreferrer"
				aria-label="Get directions"
			>
				<MapPin size={17} /> MAP
			</a>
		</nav>
	);
}