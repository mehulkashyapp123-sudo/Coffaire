import { useEffect, useRef, type ReactNode } from 'react';

/**
 * Subtle scroll-reveal wrapper: fades and lifts its children into view once,
 * the first time they enter the viewport. Content is visible by default if
 * JavaScript never runs past the observer, and `prefers-reduced-motion`
 * collapses the transition via the global rule in index.css.
 */
export function Reveal({
	children,
	className = '',
	delay = 0,
}: {
	children: ReactNode;
	className?: string;
	delay?: number;
}) {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const element = ref.current;
		if (!element) {
			return;
		}
		const observer = new IntersectionObserver(
			entries => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						element.classList.add('is-visible');
						observer.disconnect();
					}
				}
			},
			{ threshold: 0.15 },
		);
		observer.observe(element);
		return () => observer.disconnect();
	}, []);

	return (
		<div
			ref={ref}
			className={`reveal ${className}`.trim()}
			style={delay ? { transitionDelay: `${delay}ms` } : undefined}
		>
			{children}
		</div>
	);
}
