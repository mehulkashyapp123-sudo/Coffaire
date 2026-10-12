import { Link } from 'react-router';
import { ArrowUpRight, Coffee, Pizza, CakeSlice, MapPin } from 'lucide-react';
import { featured } from '@/data/site';

export function FeaturedMenu() {
  return (
    <>
      <div className="quick-strip">
        <div className="wrap quick-inner">
          <span><Coffee size={19} /> Specialty Coffee</span>
          <span><Pizza size={19} /> Neapolitan Pizza</span>
          <span><CakeSlice size={19} /> Desserts</span>
          <span><MapPin size={19} /> Katol Road, Nagpur</span>
        </div>
      </div>

      <section className="featured-section section-pad" id="featured">
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="eyebrow">FEATURED FROM OUR MENU</span>
              <h2>Something For <em>Every Mood.</em></h2>
            </div>

            <p>
              From carefully crafted coffee to indulgent desserts and
              Neapolitan pizza, explore a menu made for every kind of café moment.
            </p>
          </div>

          <div className="featured-grid">
            {featured.map((item, i) => (
              <article className="featured-card" key={item.name}>
                <div className="featured-image">
                  <img
                    src={item.image}
                    alt={item.name}
                    width="800"
                    height="600"
                    loading="lazy"
                  />
                  <span className="card-index">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className="featured-detail">
                  <span className="card-category">{item.category}</span>

                  <div className="featured-title-row">
                    <h3>{item.name}</h3>
                    <strong>₹{item.price}</strong>
                  </div>

                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="center-cta">
            <Link to="/menu" className="button button-dark">
              VIEW FULL MENU <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}