import { Plus } from 'lucide-react';
import { faqs } from '@/data/faq';

export function FaqSection() {
	return (
		<section className="faq-section section-pad" id="faq">
			<div className="wrap">
				<div className="experience-heading">
					<span className="eyebrow">GOOD TO KNOW</span>
					<h2>Questions,<br /><em>Answered.</em></h2>
				</div>
				<div className="faq-list">
					{faqs.map((faq) => (
						<details className="faq-item" key={faq.question}>
							<summary>
								{faq.question}
								<Plus size={18} aria-hidden="true" />
							</summary>
							<p>{faq.answer}</p>
						</details>
					))}
				</div>
			</div>
		</section>
	);
}
