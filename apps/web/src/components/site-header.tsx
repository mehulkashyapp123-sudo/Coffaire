import { useState } from 'react';
import { Link } from 'react-router';
import { ArrowUpRight, Menu as MenuIcon, X } from 'lucide-react';
import { directionsUrl } from '@/data/site';
import { CartHeaderButton } from '@/components/cart/cart-header-button';

const links = [{ label: 'Home', href: '/' }, { label: 'Menu', href: '/menu' }, { label: 'Order Online', href: '/order' }, { label: 'About', href: '/#about' }, { label: 'Gallery', href: '/#gallery' }, { label: 'Contact', href: '/#contact' }];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return <header className="site-header">
    <div className="header-inner">
      <Link to="/" className="brand" aria-label="Coffaire home" onClick={() => setOpen(false)}><span className="brand-name">COFFAIRE<span className="brand-dot">.</span></span><span className="brand-tag">YOUR DAILY DOSE CAFE</span></Link>
      <nav className="desktop-nav" aria-label="Main navigation">{links.map(link => <Link key={link.label} to={link.href}>{link.label}</Link>)}</nav>
      <div className="header-actions"><CartHeaderButton /><Link className="header-menu-link" to="/menu">VIEW MENU <ArrowUpRight size={15} /></Link><a className="header-directions" href={directionsUrl} target="_blank" rel="noopener noreferrer">GET DIRECTIONS <ArrowUpRight size={15} /></a></div>
      <button type="button" className="mobile-toggle" onClick={() => setOpen(!open)} aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open}>{open ? <X size={25} /> : <MenuIcon size={25} />}</button>
    </div>
    {open && <nav className="mobile-nav" aria-label="Mobile navigation">{links.map(link => <Link key={link.label} to={link.href} onClick={() => setOpen(false)}>{link.label}<ArrowUpRight size={17} /></Link>)}<a href={directionsUrl} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>Get directions <ArrowUpRight size={17} /></a></nav>}
  </header>;
}
