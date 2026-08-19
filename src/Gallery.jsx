import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Phone, Menu, X, Headset, Camera, Maximize2 } from 'lucide-react';

const typography = { heading: 'font-serif tracking-tight' };
const WHATSAPP = 'https://wa.me/917827743041';
const CALL = 'tel:+919103599174';

const Reveal = ({ children, className = '', delay = 0 }) => {
    const ref = useRef(null); const [v, setV] = useState(false);
    useEffect(() => { const el = ref.current; if (!el) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); o.disconnect(); } }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }); o.observe(el); return () => o.disconnect(); }, []);
    return <div ref={ref} className={`opacity-0 translate-y-12 ${v ? '!opacity-100 !translate-y-0' : ''} transition-all duration-700 ease-out ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
};

const galleryImages = [
    { id: 1, src: 'https://images.unsplash.com/photo-1597074866923-dc0589150e65?auto=format&fit=crop&q=80&w=1200', title: 'Dal Lake, Srinagar', category: 'srinagar' },
    { id: 2, src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=800', title: 'Pahalgam Valley', category: 'pahalgam' },
    { id: 3, src: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&q=80&w=800', title: 'Gulmarg Meadows', category: 'gulmarg' },
    { id: 4, src: 'https://images.unsplash.com/photo-1605649487212-4d4ce3e015ac?auto=format&fit=crop&q=80&w=1200', title: 'Sonmarg Gold', category: 'sonmarg' },
    { id: 5, src: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&q=80&w=800', title: 'Mughal Gardens', category: 'srinagar' },
    { id: 6, src: 'https://images.unsplash.com/photo-1626507421379-37f07823b123?auto=format&fit=crop&q=80&w=800', title: 'Snow Mountains', category: 'gulmarg' },
    { id: 7, src: 'https://images.unsplash.com/photo-1618083707368-b382cdcb82c2?auto=format&fit=crop&q=80&w=1200', title: 'Shikara Ride', category: 'srinagar' },
    { id: 8, src: 'https://images.unsplash.com/photo-1516483638261-f40889eba30e?auto=format&fit=crop&q=80&w=800', title: 'Pahalgam River', category: 'pahalgam' },
    { id: 9, src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=800', title: 'Betaab Valley', category: 'pahalgam' },
    { id: 10, src: 'https://images.unsplash.com/photo-1597074866923-dc0589150e65?auto=format&fit=crop&q=80&w=800', title: 'Houseboat Stay', category: 'srinagar' },
    { id: 11, src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=1200', title: 'Mountain Peaks', category: 'sonmarg' },
    { id: 12, src: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&q=80&w=800', title: 'Gulmarg Gondola', category: 'gulmarg' }
];

const categories = ['all', 'srinagar', 'pahalgam', 'gulmarg', 'sonmarg'];

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
                               className={`text-sm font-medium hover:text-[#FF7200] transition-colors relative py-2 group ${link === 'Gallery' ? 'text-[#FF7200]' : 'text-[#071B3A]'}`}>
                                {link}<span className={`absolute bottom-0 left-0 h-0.5 bg-[#FF7200] transition-all duration-500 group-hover:w-full ${link === 'Gallery' ? 'w-full' : 'w-0'}`}></span>
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
                               className={`text-3xl font-serif text-white hover:text-[#FF7200] transition-all duration-300 ${mobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}
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

export default function GalleryPage({ onNavigate }) {
    const [activeCategory, setActiveCategory] = useState('all');
    const [lightbox, setLightbox] = useState(null);
    const filtered = activeCategory === 'all' ? galleryImages : galleryImages.filter(img => img.category === activeCategory);

    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape') setLightbox(null);
            if (lightbox !== null) {
                if (e.key === 'ArrowRight') setLightbox((lightbox + 1) % filtered.length);
                if (e.key === 'ArrowLeft') setLightbox((lightbox - 1 + filtered.length) % filtered.length);
            }
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [lightbox, filtered.length]);

    return (
        <div className="min-h-screen bg-[#F8F6F1] font-sans overflow-x-hidden selection:bg-[#FF7200] selection:text-white page-enter">
            <Header onNavigate={onNavigate} />
            <main>
                {/* Hero */}
                <section className="relative h-[350px] md:h-[420px] overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1597074866923-dc0589150e65?auto=format&fit=crop&q=80&w=1600" alt="Kashmir gallery" className="w-full h-full object-cover animate-[scale-in_1.5s_ease_forwards]" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#071B3A]/90 via-[#071B3A]/60 to-transparent"></div>
                    <div className="absolute inset-0 flex items-center">
                        <div className="max-w-[1380px] mx-auto px-4 md:px-8 w-full">
                            <Reveal><div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-[#FF7200] text-sm font-semibold mb-4 border border-white/10"><Camera size={16} /> GALLERY</div></Reveal>
                            <Reveal delay={100}><h1 className={`${typography.heading} text-4xl md:text-6xl text-white font-bold mb-4`}>Kashmir Through<br />Our Lens</h1></Reveal>
                            <Reveal delay={200}><p className="text-gray-300 text-lg max-w-xl font-light">A visual journey through the breathtaking beauty of Kashmir — captured by our team and happy travelers.</p></Reveal>
                        </div>
                    </div>
                </section>

                {/* Gallery Grid */}
                <section className="py-16 md:py-24 bg-white">
                    <div className="max-w-[1380px] mx-auto px-4 md:px-8">
                        <Reveal><div className="flex flex-wrap items-center gap-3 mb-12 justify-center">
                            {categories.map(cat => (
                                <button key={cat} onClick={() => setActiveCategory(cat)}
                                    className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${activeCategory === cat ? 'bg-[#FF7200] text-white shadow-lg shadow-[#FF7200]/20 scale-105' : 'bg-[#F3F5F7] text-[#071B3A] hover:bg-[#FF7200]/10 hover:text-[#FF7200]'}`}>
                                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                </button>
                            ))}
                        </div></Reveal>

                        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
                            {filtered.map((img, i) => (
                                <Reveal key={img.id} delay={i * 80}>
                                    <div className="break-inside-avoid relative group cursor-pointer rounded-2xl overflow-hidden card-lift" onClick={() => setLightbox(i)}>
                                        <img src={img.src} alt={img.title} className="w-full object-cover transform group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#071B3A]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                        <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                            <h3 className="text-white font-bold text-lg">{img.title}</h3>
                                            <p className="text-white/70 text-sm capitalize">{img.category}</p>
                                        </div>
                                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/40 transition-colors"><Maximize2 size={16} className="text-white" /></div>
                                        </div>
                                    </div>
                                </Reveal>
                            ))}
                        </div>

                        {filtered.length === 0 && (
                            <div className="text-center py-20 animate-fade-in"><Camera size={48} className="text-[#DDE2E8] mx-auto mb-4" /><p className="text-[#687386] text-lg">No images found in this category.</p></div>
                        )}
                    </div>
                </section>
            </main>

            {/* Lightbox */}
            {lightbox !== null && (
                <div className="fixed inset-0 z-[100] bg-[#071B3A]/95 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in" onClick={() => setLightbox(null)}>
                    <button onClick={() => setLightbox(null)} className="absolute top-6 right-6 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 z-10"><X size={24} /></button>
                    <button onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + filtered.length) % filtered.length); }} className="absolute left-4 md:left-8 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 z-10"><span className="text-xl">←</span></button>
                    <button onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % filtered.length); }} className="absolute right-4 md:right-8 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 z-10"><span className="text-xl">→</span></button>
                    <div className="max-w-5xl w-full animate-[scale-in_0.3s_ease_forwards]" onClick={(e) => e.stopPropagation()}>
                        <img src={filtered[lightbox].src} alt={filtered[lightbox].title} className="w-full h-auto max-h-[80vh] object-contain rounded-xl shadow-2xl" />
                        <div className="text-center mt-6 animate-[slide-up_0.4s_ease_forwards]">
                            <h3 className="text-white font-bold text-xl">{filtered[lightbox].title}</h3>
                            <p className="text-white/60 text-sm capitalize">{filtered[lightbox].category}</p>
                        </div>
                    </div>
                </div>
            )}

            <footer className="bg-[#05132A] text-white pt-16 pb-8"><div className="max-w-[1380px] mx-auto px-4 md:px-8"><div className="flex flex-col md:flex-row justify-between items-center gap-6 border-t border-white/10 pt-8"><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="group"><img src="/logo.webp" alt="The Indian Wings" className="h-10 w-auto transition-transform duration-300 group-hover:scale-105" /></a><p className="text-gray-500 text-sm">© 2026 The Indian Wings. All Rights Reserved.</p></div></div></footer>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-50 group"><div className="w-14 h-14 md:w-16 md:h-16 bg-[#25D366] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all duration-300 animate-whatsapp-pulse"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg></div></a>
        </div>
    );
}
