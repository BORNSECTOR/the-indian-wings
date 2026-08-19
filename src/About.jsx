import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Phone, Mail, Clock, Menu, X, Headset, CheckCircle2, Shield, Users, Award } from 'lucide-react';

const typography = { heading: 'font-serif tracking-tight' };
const WHATSAPP = 'https://wa.me/917827743041';
const CALL = 'tel:+919103599174';

const Reveal = ({ children, className = '', delay = 0, direction = 'up' }) => {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current; if (!el) return;
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
        obs.observe(el); return () => obs.disconnect();
    }, []);
    const dir = { up: 'opacity-0 translate-y-12', left: 'opacity-0 -translate-x-12', right: 'opacity-0 translate-x-12' }[direction];
    return <div ref={ref} className={`${dir} ${visible ? '!opacity-100 !translate-x-0 !translate-y-0' : ''} transition-all duration-700 ease-out ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
};

const AnimCounter = ({ end, suffix = '' }) => {
    const ref = useRef(null); const countRef = useRef(null); const done = useRef(false);
    useEffect(() => {
        const el = ref.current; if (!el) return;
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting && !done.current) { done.current = true;
                const s = performance.now(); const step = (n) => { const p = Math.min((n - s) / 2000, 1); const e = 1 - Math.pow(1 - p, 3); if (countRef.current) countRef.current.textContent = Math.floor(e * end); if (p < 1) requestAnimationFrame(step); }; requestAnimationFrame(step);
            }
        }, { threshold: 0.5 }); obs.observe(el); return () => obs.disconnect();
    }, [end]);
    return <span ref={ref}><span ref={countRef}>0</span>{suffix}</span>;
};

const Header = ({ onNavigate }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    useEffect(() => { const h = () => setIsScrolled(window.scrollY > 20); window.addEventListener('scroll', h, { passive: true }); return () => window.removeEventListener('scroll', h); }, []);
    return (
        <>
            <div className="bg-[#071B3A] text-white py-2 px-4 md:px-8 text-xs font-medium justify-between items-center hidden md:flex">
                <div className="flex items-center gap-2"><span className="text-[#FF7200] animate-float inline-block">✈</span> Your trusted local partner for unforgettable Kashmir experiences</div>
                <div className="flex items-center gap-6">
                    <a href={CALL} className="flex items-center gap-2 hover:text-[#FF7200] transition-colors"><Phone size={14} className="text-[#FF7200]" /> +91 91035 99174</a>
                    <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#FF7200] transition-colors"><Headset size={14} className="text-[#FF7200]" /> WhatsApp Us</a>
                </div>
            </div>
            <header className={`sticky top-0 z-50 w-full transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-2' : 'bg-white py-4 md:py-5 border-b border-gray-100'}`}>
                <div className="max-w-[1380px] mx-auto px-4 md:px-8 flex justify-between items-center">
                    <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="flex items-center gap-2 cursor-pointer z-50 group"><img src="/logo.webp" alt="The Indian Wings" className="h-11 md:h-13 w-auto transition-transform duration-300 group-hover:scale-105" /></a>
                    <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
                        {['Home', 'Packages', 'Gallery', 'About Us'].map((link) => (
                            <a key={link} href="#" onClick={(e) => { e.preventDefault(); if (link === 'Home') onNavigate('home'); else if (link === 'Packages') onNavigate('packages'); else if (link === 'Gallery') onNavigate('gallery'); else if (link === 'About Us') onNavigate('about'); }}
                               className={`text-sm font-medium hover:text-[#FF7200] transition-colors relative py-2 group ${link === 'About Us' ? 'text-[#FF7200]' : 'text-[#071B3A]'}`}>
                                {link}<span className={`absolute bottom-0 left-0 h-0.5 bg-[#FF7200] transition-all duration-500 group-hover:w-full ${link === 'About Us' ? 'w-full' : 'w-0'}`}></span>
                            </a>
                        ))}
                    </nav>
                    <div className="hidden lg:flex items-center gap-4">
                        <a href={CALL} className="btn-shine inline-flex items-center justify-center px-4 py-2 rounded-[10px] font-semibold text-sm bg-white text-[#071B3A] border border-[#071B3A] hover:bg-[#071B3A] hover:text-white transition-all duration-300">Call Us</a>
                        <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn-shine inline-flex items-center justify-center px-5 py-2 rounded-[10px] font-semibold text-sm bg-[#25D366] text-white hover:bg-[#1ebe57] transition-all duration-300">WhatsApp</a>
                    </div>
                    <button className="lg:hidden text-[#071B3A] z-50 p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>{mobileMenuOpen ? <X size={28} className="text-white" /> : <Menu size={28} />}</button>
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
        </>
    );
};

export default function AboutPage({ onNavigate }) {
    return (
        <div className="min-h-screen bg-[#F8F6F1] font-sans overflow-x-hidden selection:bg-[#FF7200] selection:text-white page-enter">
            <Header onNavigate={onNavigate} />
            <main>
                {/* Hero */}
                <section className="relative h-[350px] md:h-[420px] overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1597074866923-dc0589150e65?auto=format&fit=crop&q=80&w=1600" alt="Kashmir" className="w-full h-full object-cover animate-[scale-in_1.5s_ease_forwards]" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#071B3A]/90 via-[#071B3A]/60 to-transparent"></div>
                    <div className="absolute inset-0 flex items-center">
                        <div className="max-w-[1380px] mx-auto px-4 md:px-8 w-full">
                            <Reveal><div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-[#FF7200] text-sm font-semibold mb-4 border border-white/10"><Users size={16} /> ABOUT US</div></Reveal>
                            <Reveal delay={100}><h1 className={`${typography.heading} text-4xl md:text-6xl text-white font-bold mb-4`}>Our Kashmir Story</h1></Reveal>
                            <Reveal delay={200}><p className="text-gray-300 text-lg max-w-xl font-light">Born and raised in Kashmir, we've been sharing the beauty of our homeland with travelers for over 15 years.</p></Reveal>
                        </div>
                    </div>
                </section>

                {/* Our Story */}
                <section className="py-20 md:py-28 bg-white">
                    <div className="max-w-[1380px] mx-auto px-4 md:px-8">
                        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
                            <Reveal direction="left" className="w-full lg:w-1/2">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F8F6F1] text-[#FF7200] text-xs font-bold uppercase tracking-wider mb-6 border border-[#FF7200]/20">Our Story</div>
                                <h2 className={`${typography.heading} text-3xl md:text-5xl font-bold text-[#071B3A] mb-8 leading-tight`}>More than a travel agency — <span className="text-[#FF7200] italic">we're your Kashmiri hosts</span></h2>
                                <p className="text-[#687386] text-lg mb-8 leading-relaxed">The Indian Wings was founded with a simple belief: every traveler deserves an authentic Kashmir experience. We don't just plan trips — we open our doors, share our stories, and guide you through the land we call home.</p>
                                <p className="text-[#687386] text-lg mb-8 leading-relaxed">For over 15 years, we've helped thousands of families, couples, and solo travelers discover the true beauty of Kashmir — from the serene Dal Lake to the snow-capped peaks of Gulmarg.</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 mb-10">
                                    {['15+ Years in Kashmir', '500+ Happy Families', 'Local Srinagar Team', 'Verified Guides & Transport'].map((item, i) => (
                                        <div key={i} className="flex items-center gap-3 group"><div className="w-6 h-6 rounded-full bg-[#FF7200]/10 flex items-center justify-center shrink-0 group-hover:bg-[#FF7200] transition-colors"><CheckCircle2 size={14} className="text-[#FF7200] group-hover:text-white transition-colors" /></div><span className="text-[#071B3A] font-semibold text-sm">{item}</span></div>
                                    ))}
                                </div>
                                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn-shine inline-flex items-center justify-center px-6 py-3 rounded-[10px] font-semibold text-sm bg-[#FF7200] text-white hover:bg-[#E66600] transition-all duration-300 hover:shadow-lg hover:shadow-[#FF7200]/20">Talk to Our Team →</a>
                            </Reveal>
                            <Reveal direction="right" className="w-full lg:w-1/2 relative min-h-[500px]">
                                <div className="absolute top-0 right-0 w-[60%] h-[240px] rounded-2xl overflow-hidden shadow-lg z-10 border-4 border-white img-zoom">
                                    <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=800" alt="Kashmir Mountains" className="w-full h-full object-cover" loading="lazy" />
                                </div>
                                <div className="absolute top-[120px] left-0 w-[50%] h-[300px] rounded-2xl overflow-hidden shadow-2xl z-20 border-4 border-white img-zoom">
                                    <img src="https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&q=80&w=800" alt="Kashmir Lake" className="w-full h-full object-cover" loading="lazy" />
                                </div>
                                <div className="absolute bottom-0 right-10 w-[45%] h-[200px] rounded-2xl overflow-hidden shadow-lg z-30 border-4 border-white img-zoom">
                                    <img src="https://images.unsplash.com/photo-1597074866923-dc0589150e65?auto=format&fit=crop&q=80&w=800" alt="Dal Lake" className="w-full h-full object-cover" loading="lazy" />
                                </div>
                                <div className="absolute -left-4 md:-left-12 top-1/4 bg-white p-6 rounded-2xl shadow-xl z-40 border border-[#F2F4F7] animate-float">
                                    <div className="grid grid-cols-2 gap-6">
                                        <div><div className="text-2xl font-bold text-[#FF7200]"><AnimCounter end={15} suffix="+" /></div><div className="text-[10px] text-[#687386] font-semibold uppercase tracking-wider">Years</div></div>
                                        <div><div className="text-2xl font-bold text-[#FF7200]"><AnimCounter end={500} suffix="+" /></div><div className="text-[10px] text-[#687386] font-semibold uppercase tracking-wider">Families</div></div>
                                    </div>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </section>

                {/* Stats */}
                <section className="py-16 bg-[#071B3A]">
                    <div className="max-w-[1380px] mx-auto px-4 md:px-8">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                            {[{ num: 500, s: '+', l: 'Happy Families', i: <Users size={24} /> }, { num: 15, s: '+', l: 'Years Experience', i: <Award size={24} /> }, { num: 24, s: '/7', l: 'Trip Support', i: <Headset size={24} /> }, { num: 50, s: '+', l: 'Destinations', i: <MapPin size={24} /> }].map((item, i) => (
                                <Reveal key={i} delay={i * 100}>
                                    <div className="text-center group">
                                        <div className="w-14 h-14 mx-auto bg-white/10 text-[#FF7200] rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#FF7200] group-hover:text-white group-hover:rotate-6 transition-all duration-500">{item.i}</div>
                                        <div className="text-2xl md:text-3xl font-bold text-white mb-1"><AnimCounter end={item.num} suffix={item.s} /></div>
                                        <div className="text-gray-400 text-sm">{item.l}</div>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-20 bg-[#F8F6F1]">
                    <div className="max-w-[800px] mx-auto px-4 md:px-8 text-center">
                        <Reveal>
                            <h2 className={`${typography.heading} text-3xl md:text-5xl font-bold text-[#071B3A] mb-6`}>Ready to Experience Kashmir?</h2>
                            <p className="text-[#687386] text-lg mb-10">Let us plan your perfect Kashmir trip. Contact us today.</p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn-shine inline-flex items-center justify-center px-8 py-4 rounded-[10px] font-semibold text-base bg-[#25D366] text-white hover:bg-[#1ebe57] hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="mr-2"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg> WhatsApp Us</a>
                                <a href={CALL} className="btn-shine inline-flex items-center justify-center px-8 py-4 rounded-[10px] font-semibold text-base bg-[#071B3A] text-white hover:bg-[#05132A] hover:shadow-xl hover:-translate-y-1 transition-all duration-300">Call Us Now</a>
                            </div>
                        </Reveal>
                    </div>
                </section>
            </main>
            <footer className="bg-[#05132A] text-white pt-16 pb-8"><div className="max-w-[1380px] mx-auto px-4 md:px-8"><div className="flex flex-col md:flex-row justify-between items-center gap-6 border-t border-white/10 pt-8"><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="group"><img src="/logo.webp" alt="The Indian Wings" className="h-10 w-auto transition-transform duration-300 group-hover:scale-105" /></a><p className="text-gray-500 text-sm">© 2026 The Indian Wings. All Rights Reserved.</p></div></div></footer>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-50 group"><div className="w-14 h-14 md:w-16 md:h-16 bg-[#25D366] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all duration-300 animate-whatsapp-pulse"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg></div></a>
        </div>
    );
}
