import type { Route } from './+types/menu';
import { seo } from '@/lib/seo';
import { images } from '@/data/site';
import { MenuIntro } from '@/components/menu/menu-intro';
import { MenuBoard } from '@/components/menu/menu-board';
export function meta({ matches, location }: Route.MetaArgs) {
 return seo({ matches, location }, { title: 'Menu | Coffee, Pizza & Desserts at Coffaire Nagpur', description: 'Explore the Coffaire menu in Nagpur: espresso coffee, matcha, cold brews, frappes, mocktails, Neapolitan pizza, brownies and more on Katol Road.', image: images.pizza });
}
export default function MenuPage() { return <main><MenuIntro /><MenuBoard /></main>; }
