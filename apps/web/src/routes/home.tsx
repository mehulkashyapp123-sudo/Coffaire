import type { Route } from './+types/home';
import { seo } from '@/lib/seo';
import { images } from '@/data/site';
import { faqs } from '@/data/faq';

import { Hero } from '@/components/home/hero';
import { FeaturedMenu } from '@/components/home/featured-menu';
import { SeasonalSpecials } from '@/components/home/seasonal-specials';
import { SignatureSpotlight } from '@/components/home/signature-spotlight';
import { About } from '@/components/home/about';
import { Experience } from '@/components/home/experience';
import { PizzaFeature } from '@/components/home/pizza-feature';
import { Gallery } from '@/components/home/gallery';
import { VisualWall } from '@/components/home/visual-wall';
import { Celebrations } from '@/components/home/celebrations';
import { Location } from '@/components/home/location';
import { FaqSection } from '@/components/home/faq-section';

export function meta({ matches, location }: Route.MetaArgs) {
  return seo(
    { matches, location },
    {
      title: 'Coffaire – Your Daily Dose Cafe | Coffee & Pizza in Nagpur',
      description:
        'Discover Coffaire, Your Daily Dose Cafe on Katol Road, Nagpur. Explore coffee, matcha, cold brews, Neapolitan pizza, desserts and more. Open daily from 8 AM to 11 PM.',
      image: images.hero,
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'CafeOrCoffeeShop',
          name: 'Coffaire, Your Daily Dose Cafe',
          address: {
            '@type': 'PostalAddress',
            streetAddress:
              'Shree Renuka Complex, Plot No. 95, Friends Colony Main Road, Katol Road',
            addressLocality: 'Nagpur',
            addressRegion: 'Maharashtra',
            postalCode: '440013',
            addressCountry: 'IN',
          },
          openingHours: 'Mo-Su 08:00-23:00',
          openingHoursSpecification: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: [
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
              'Sunday',
            ],
            opens: '08:00',
            closes: '23:00',
          },
        },
        {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        },
      ],
    },
  );
}

export default function HomePage() {
  return (
    <main>
      <Hero />
      <FeaturedMenu />
      <SeasonalSpecials />
      <SignatureSpotlight />
      <About />
      <Experience />
      <PizzaFeature />
      <Gallery />
      <VisualWall />
      <Celebrations />
      <Location />
      <FaqSection />
    </main>
  );
}