import { Coffee, UsersRound, CakeSlice, UtensilsCrossed } from 'lucide-react';
const moments = [
 { icon: Coffee, title: 'Coffee & Conversations', text: 'A relaxed setting for catching up over coffee.' },
 { icon: UsersRound, title: 'Casual Meetups', text: 'A place to spend time with friends.' },
 { icon: CakeSlice, title: 'Dessert Moments', text: 'Sweet treats for an afternoon or evening break.' },
 { icon: UtensilsCrossed, title: 'Food & Coffee', text: 'A menu that goes beyond just coffee.' },
];
export function Experience() { return <section className="experience-section section-pad"><div className="wrap"><div className="experience-heading"><span className="eyebrow">THE EVERYDAY EXPERIENCE</span><h2>Come For The Coffee.<br /><em>Stay For The Moments.</em></h2></div><div className="experience-grid">{moments.map(({icon: Icon, title, text}, i) => <article className="experience-card" key={title}><div className="experience-icon"><Icon size={27} strokeWidth={1.35} /></div><span className="experience-number">0{i + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>; }
