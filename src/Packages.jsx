import React, { useState, useEffect, useRef } from 'react';
import {
    MapPin, Star, Phone, Clock, Heart, Menu, X, Headset, Plane,
    CheckCircle2, Shield, Gift, MessageCircle, ChevronRight
} from 'lucide-react';

const typography = { heading: 'font-serif tracking-tight', body: 'font-sans' };
const WHATSAPP = 'https://wa.me/917827743041';
const CALL = 'tel:+919103599174';

const Reveal = ({ children, className = '', delay = 0, direction = 'up' }) => {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
        obs.observe(el);
        return () => obs.disconnect();
    }, []);
    const dir = { up: 'opacity-0 translate-y-12', left: 'opacity-0 -translate-x-12', right: 'opacity-0 translate-x-12', scale: 'opacity-0 scale-95' }[direction];
    return <div ref={ref} className={`${dir} ${visible ? '!opacity-100 !translate-x-0 !translate-y-0 !scale-100' : ''} transition-all duration-700 ease-out ${className}`} style={{ transitionDuration: '800ms', transitionDelay: `${delay}ms` }}>{children}</div>;
};

const packages = [
    { id: 1, title: 'Kashmir Tour', duration: '3 Nights & 4 Days', price: '₹ 8,800', tag: null, image: 'https://images.unsplash.com/photo-1597074866923-dc0589150e65?auto=format&fit=crop&q=80&w=800', desc: 'A perfect short getaway to experience the magic of Kashmir — from Dal Lake to Mughal Gardens.' },
    { id: 2, title: 'Family Kashmir Package', duration: '4 Nights & 5 Days', price: '₹ 10,300', tag: null, image: 'https://images.unsplash.com/photo-1626507421379-37f07823b123?auto=format&fit=crop&q=80&w=800', desc: 'A family-friendly itinerary with kid-safe activities, scenic drives, and comfortable stays.' },
    { id: 3, title: 'Kashmir Trip', duration: '5 Nights & 6 Days', price: '₹ 12,800', tag: null, image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&q=80&w=800', desc: 'Explore Srinagar, Gulmarg, Pahalgam and Sonmarg in one well-paced journey.' },
    { id: 4, title: 'Summer Kashmir Package', duration: '6 Nights & 7 Days', price: '₹ 14,200', tag: 'Peak Season Special', image: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&q=80&w=800', desc: 'The best of Kashmir in summer — lush meadows, blooming tulips, and cool mountain air.' },
    { id: 5, title: 'Kashmir Holiday Package', duration: '6 Nights & 7 Days', price: '₹ 14,200', tag: null, image: 'https://images.unsplash.com/photo-1605649487212-4d4ce3e015ac?auto=format&fit=crop&q=80&w=800', desc: 'A relaxed holiday with ample time at each destination — no rushing, just enjoying.' },
    { id: 6, title: 'Trip to Kashmir', duration: '7 Nights & 8 Days', price: '₹ 16,200', tag: null, image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=800', desc: 'An in-depth Kashmir experience covering all major highlights plus offbeat gems.' },
    { id: 7, title: 'Vaishno Devi Package', duration: '4 Nights & 5 Days', price: '₹ 11,500', tag: 'Divine Pilgrimage', image: 'https://images.unsplash.com/photo-1618083707368-b382cdcb82c2?auto=format&fit=crop&q=80&w=800', desc: 'A spiritual journey to Vaishno Devi with comfortable accommodation and guided trek.' },
    { id: 8, title: 'Kashmir Grand Tour', duration: '8 Nights & 9 Days', price: '₹ 18,500', tag: 'Premium Experience', image: 'https://images.unsplash.com/photo-1516483638261-f40889eba30e?auto=format&fit=crop&q=80&w=800', desc: 'The ultimate Kashmir experience — luxury stays, private transfers, and exclusive access.' }
];

const PackageCard = ({ pkg, onNavigate, index }) => (
    <Reveal delay={index * 100}>
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm card-lift border border-[#F2F4F7] group flex flex-col h-full">
            <div className="relative h-56 overflow-hidden img-zoom">
                <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" loading="lazy" />
                {pkg.tag && <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#FF7200] text-white text-[10px] font-bold uppercase animate-pulse-glow">{pkg.tag}</div>}
                <div className="absolute bottom-3 right-3 bg-[#071B3A]/80 backdrop-blur-sm px-3 py-1.5 rounded-lg text-white">
                    <span className="text-[10px] text-gray-300 block">Starting from</span>
                    <span className="text-lg font-bold">{pkg.price}</span>
                    <span className="text-[10px] text-gray-300"> /person</span>
                </div>
            </div>
            <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-3 text-[#687386] text-xs mb-3">
                    <span className="flex items-center gap-1"><Clock size={12} /> {pkg.duration}</span>
                </div>
                <h3 className="font-bold text-[#071B3A] text-lg mb-2 group-hover:text-[#FF7200] transition-colors">{pkg.title}</h3>
                <p className="text-[#687386] text-sm leading-relaxed mb-4 flex-1">{pkg.desc}</p>
                <div className="grid grid-cols-3 gap-2 mb-4">
                    {['Hotels', 'Meals', 'Sightseeing'].map((h, i) => (
                        <div key={i} className="flex items-center justify-center gap-1 text-xs text-[#071B3A] bg-[#F8F6F1] rounded-lg py-1.5 font-medium">
                            <CheckCircle2 size={12} className="text-[#FF7200]" /> {h}
                        </div>
                    ))}
                </div>
                <div className="flex items-center gap-2 mb-4 text-xs text-[#FF7200] font-semibold">
                    <Gift size={14} /> Free Gifts Included with Every Booking
                </div>
                <p className="text-[#687386] text-[11px] mb-4">Min 6 PAX on double sharing basis</p>
                <div className="flex gap-3">
                    <a href={`https://wa.me/917827743041?text=Hi! I'm interested in the ${pkg.title} package.`} target="_blank" rel="noopener noreferrer"
                       className="btn-shine flex-1 inline-flex items-center justify-center px-4 py-2.5 rounded-lg font-semibold text-sm bg-[#25D366] text-white hover:bg-[#1ebe57] transition-all duration-300 hover:shadow-lg hover:shadow-[#25D366]/20">WhatsApp</a>
                    <button onClick={() => onNavigate('contact')} className="btn-shine flex-1 inline-flex items-center justify-center px-4 py-2.5 rounded-lg font-semibold text-sm bg-[#FF7200] text-white hover:bg-[#E66600] transition-all duration-300 hover:shadow-lg hover:shadow-[#FF7200]/20">Enquire Now</button>
                </div>
            </div>
        </div>
    </Reveal>
);

export default function PackagesPage({ onNavigate }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    useEffect(() => {
        const h = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', h, { passive: true });
        return () => window.removeEventListener('scroll', h);
    }, []);

    return (
        <div className="min-h-screen bg-[#F8F6F1] font-sans overflow-x-hidden selection:bg-[#FF7200] selection:text-white page-enter">
            {/* Header */}
            <div className="bg-[#071B3A] text-white py-2 px-4 md:px-8 text-xs font-medium justify-between items-center hidden md:flex">
                <div className="flex items-center gap-2"><span className="text-[#FF7200] animate-float inline-block">✈</span> Your trusted local partner for unforgettable Kashmir experiences</div>
                <div className="flex items-center gap-6">
                    <a href={CALL} className="flex items-center gap-2 hover:text-[#FF7200] transition-colors"><Phone size={14} className="text-[#FF7200]" /> +91 91035 99174</a>
                    <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#FF7200] transition-colors"><Headset size={14} className="text-[#FF7200]" /> WhatsApp Us</a>
                </div>
            </div>
            <header className={`sticky top-0 z-50 w-full transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-2' : 'bg-white py-4 md:py-5 border-b border-gray-100'}`}>
                <div className="max-w-[1380px] mx-auto px-4 md:px-8 flex justify-between items-center">
                    <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="flex items-center gap-2 cursor-pointer z-50 group">
                        <img src="/logo.webp" alt="The Indian Wings" className="h-11 md:h-13 w-auto transition-transform duration-300 group-hover:scale-105" />
                    </a>
                    <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
                        {['Home', 'Packages', 'Gallery', 'About Us'].map((link) => (
                            <a key={link} href="#" onClick={(e) => { e.preventDefault(); if (link === 'Home') onNavigate('home'); else if (link === 'Packages') onNavigate('packages'); else if (link === 'Gallery') onNavigate('gallery'); else if (link === 'About Us') onNavigate('about'); }}
                               className={`text-sm font-medium hover:text-[#FF7200] transition-colors relative py-2 group ${link === 'Packages' ? 'text-[#FF7200]' : 'text-[#071B3A]'}`}>
                                {link}<span className={`absolute bottom-0 left-0 h-0.5 bg-[#FF7200] transition-all duration-500 group-hover:w-full ${link === 'Packages' ? 'w-full' : 'w-0'}`}></span>
                            </a>
                        ))}
                    </nav>
                    <div className="hidden lg:flex items-center gap-4">
                        <a href={CALL} className="btn-shine inline-flex items-center justify-center px-4 py-2 rounded-[10px] font-semibold text-sm bg-white text-[#071B3A] border border-[#071B3A] hover:bg-[#071B3A] hover:text-white transition-all duration-300">Call Us</a>
                        <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn-shine inline-flex items-center justify-center px-5 py-2 rounded-[10px] font-semibold text-sm bg-[#25D366] text-white hover:bg-[#1ebe57] hover:shadow-lg hover:shadow-[#25D366]/30 hover:-translate-y-0.5 transition-all duration-300">WhatsApp</a>
                    </div>
                    <button className="lg:hidden text-[#071B3A] z-50 p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X size={28} className="text-white" /> : <Menu size={28} />}
                    </button>
                </div>
                <div className={`fixed inset-0 bg-[#071B3A]/98 backdrop-blur-lg z-40 flex flex-col pt-24 px-8 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${mobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
                    <nav className="flex flex-col gap-8 overflow-y-auto pb-6">
                        {['Home', 'Packages', 'Gallery', 'About Us'].map((link, i) => (
                            <a key={link} href="#" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); if (link === 'Home') onNavigate('home'); else if (link === 'Packages') onNavigate('packages'); else if (link === 'Gallery') onNavigate('gallery'); else if (link === 'About Us') onNavigate('about'); }}
                               className={`text-3xl font-serif text-white hover:text-[#FF7200] transition-all duration-300 transform ${mobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}
                               style={{ transitionDelay: mobileMenuOpen ? `${200 + i * 80}ms` : '0ms' }}>{link}</a>
                        ))}
                    </nav>
                    <div className="mt-auto pb-12 pt-6 flex flex-col gap-4 border-t border-white/10">
                        <a href={CALL} className="w-full inline-flex items-center justify-center px-6 py-4 rounded-[10px] font-semibold text-sm bg-transparent text-white border border-white hover:bg-white/10 transition-all">Call Us</a>
                        <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="w-full inline-flex items-center justify-center px-6 py-4 rounded-[10px] font-semibold text-sm bg-[#25D366] text-white hover:bg-[#1ebe57] transition-all">WhatsApp</a>
                    </div>
                </div>
            </header>

            <main>
                {/* Hero */}
                <section className="relative h-[350px] md:h-[420px] overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1597074866923-dc0589150e65?auto=format&fit=crop&q=80&w=1600" alt="Kashmir packages" className="w-full h-full object-cover animate-[scale-in_1.5s_ease_forwards]" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#071B3A]/90 via-[#071B3A]/60 to-transparent"></div>
                    <div className="absolute inset-0 flex items-center">
                        <div className="max-w-[1380px] mx-auto px-4 md:px-8 w-full">
                            <Reveal><div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-[#FF7200] text-sm font-semibold mb-4 border border-white/10"><Plane size={16} className="animate-float" /> KASHMIR PACKAGES</div></Reveal>
                            <Reveal delay={100}><h1 className={`${typography.heading} text-4xl md:text-6xl text-white font-bold mb-4`}>Explore Paradise<br />on Earth</h1></Reveal>
                            <Reveal delay={200}><p className="text-gray-300 text-lg max-w-xl font-light">Handpicked Kashmir tour packages with no hidden charges, free airport pickup, and customizable itineraries.</p></Reveal>
                        </div>
                    </div>
                </section>

                {/* Trust badges */}
                <section className="py-8 bg-white border-b border-[#F2F4F7]">
                    <div className="max-w-[1380px] mx-auto px-4 md:px-8">
                        <Reveal><div className="flex flex-wrap items-center gap-3 justify-center">
                            {[{ icon: <Shield size={16} />, text: 'No hidden charges' }, { icon: <Plane size={16} />, text: 'Free airport pickup' }, { icon: <MapPin size={16} />, text: 'Customizable itinerary' }, { icon: <CheckCircle2 size={16} />, text: 'Pay 30% to confirm' }].map((item, i) => (
                                <div key={i} className="flex items-center gap-2 px-4 py-2.5 bg-[#F8F6F1] rounded-full text-sm font-medium text-[#071B3A] border border-transparent hover:border-[#FF7200]/30 hover:bg-[#FF7200]/5 transition-all duration-300">
                                    <span className="text-[#FF7200]">{item.icon}</span> {item.text}
                                </div>
                            ))}
                        </div></Reveal>
                    </div>
                </section>

                {/* Packages Grid */}
                <section className="py-16 md:py-24 bg-white">
                    <div className="max-w-[1380px] mx-auto px-4 md:px-8">
                        <Reveal><div className="text-center mb-12">
                            <h2 className={`${typography.heading} text-3xl md:text-5xl font-bold text-[#071B3A] mb-4`}>Tour Packages</h2>
                            <p className="text-[#687386] text-lg max-w-2xl mx-auto">Discover our carefully curated tour packages designed to give you the ultimate Kashmir experience</p>
                        </div></Reveal>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {packages.map((pkg, i) => <PackageCard key={pkg.id} pkg={pkg} onNavigate={onNavigate} index={i} />)}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-20 md:py-28 bg-gradient-to-br from-[#071B3A] via-[#0a2248] to-[#071B3A] relative overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage:'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize:'30px 30px'}}></div>
                    <div className="max-w-[800px] mx-auto px-4 md:px-8 text-center relative z-10">
                        <Reveal>
                            <h2 className={`${typography.heading} text-3xl md:text-5xl text-white font-bold mb-6`}>Can't find what you're looking for?</h2>
                            <p className="text-gray-300 text-lg mb-10 font-light">Let us create a custom Kashmir itinerary designed just for you.</p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn-shine inline-flex items-center justify-center px-8 py-4 rounded-[10px] font-semibold text-base bg-[#25D366] text-white hover:bg-[#1ebe57] hover:shadow-xl hover:shadow-[#25D366]/30 hover:-translate-y-1 transition-all duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="mr-2"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                                    Customize My Trip
                                </a>
                                <a href={CALL} className="btn-shine inline-flex items-center justify-center px-8 py-4 rounded-[10px] font-semibold text-base bg-transparent text-white border-2 border-white/30 hover:border-white hover:bg-white/10 transition-all duration-300">Call an Expert</a>
                            </div>
                        </Reveal>
                    </div>
                </section>
            </main>

            <footer className="bg-[#05132A] text-white pt-16 pb-8"><div className="max-w-[1380px] mx-auto px-4 md:px-8"><div className="flex flex-col md:flex-row justify-between items-center gap-6 border-t border-white/10 pt-8"><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="group"><img src="/logo.webp" alt="The Indian Wings" className="h-10 w-auto transition-transform duration-300 group-hover:scale-105" /></a><p className="text-gray-500 text-sm">© 2026 The Indian Wings. All Rights Reserved.</p></div></div></footer>

            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-50 group">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-[#25D366] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all duration-300 animate-whatsapp-pulse">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </div>
            </a>

        </div>
    );
}
