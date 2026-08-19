import { useState, useEffect } from 'react';
import { Camera, Maximize2, X, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';

import { Header, Footer, FloatingWhatsApp, ScrollToTop, Reveal, FadeImg, PageHero, WhatsAppGlyph } from './shared.jsx';
import { GALLERY_IMAGES, GALLERY_CATEGORIES, PAGE_HEROES } from './images.js';

export default function GalleryPage({ onNavigate }) {
    const [activeCategory, setActiveCategory] = useState('all');
    const [lightbox, setLightbox] = useState(null);

    const filtered = activeCategory === 'all' ? GALLERY_IMAGES : GALLERY_IMAGES.filter(img => img.category === activeCategory);

    /* keyboard navigation */
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

    useEffect(() => {
        document.body.style.overflow = lightbox !== null ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [lightbox]);

    return (
        <div className="min-h-screen bg-[#F8F6F1] font-sans overflow-x-hidden selection:bg-[#FF7200] selection:text-white page-enter">
            <Header onNavigate={onNavigate} active="gallery" />
            <main>
                <PageHero
                    badge="GALLERY"
                    icon={<Camera size={16} />}
                    title={<>Kashmir Through<br />Our Lens</>}
                    subtitle="A visual journey through the breathtaking beauty of Kashmir — captured by our team and happy travelers."
                    image={PAGE_HEROES.gallery}
                />

                {/* Gallery grid */}
                <section className="py-16 md:py-24 bg-white">
                    <div className="max-w-[1380px] mx-auto px-4 md:px-8">
                        <Reveal>
                            <div className="flex flex-wrap items-center gap-3 mb-12 justify-center">
                                {GALLERY_CATEGORIES.map(cat => (
                                    <button key={cat} onClick={() => setActiveCategory(cat)}
                                        className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${activeCategory === cat ? 'bg-gradient-to-r from-[#FF7200] to-[#FFB347] text-white shadow-lg shadow-[#FF7200]/30 scale-105' : 'bg-[#F3F5F7] text-[#071B3A] hover:bg-[#FF7200]/10 hover:text-[#FF7200]'}`}>
                                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </Reveal>

                        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
                            {filtered.map((img, i) => (
                                <Reveal key={`${img.title}-${i}`} delay={(i % 3) * 90} direction="scale">
                                    <div className="break-inside-avoid relative group cursor-zoom-in rounded-2xl overflow-hidden card-lift" onClick={() => setLightbox(i)}>
                                        <FadeImg src={img.src} alt={img.title} className="w-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#071B3A]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                        <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                            <h3 className="text-white font-bold text-lg">{img.title}</h3>
                                            <p className="text-white/70 text-sm capitalize flex items-center gap-1"><MapPin size={12} /> {img.category}</p>
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

                {/* CTA */}
                <section className="py-16 bg-[#F8F6F1]">
                    <div className="max-w-[800px] mx-auto px-4 md:px-8 text-center">
                        <Reveal>
                            <h2 className="font-serif tracking-tight text-3xl md:text-4xl font-bold text-[#071B3A] mb-4">Want to See It All in Person?</h2>
                            <p className="text-[#687386] text-lg mb-8">Photos don't do Kashmir justice. Come experience it yourself.</p>
                            <a href="https://wa.me/917827743041?text=Hi! I'd love to plan a Kashmir trip." target="_blank" rel="noopener noreferrer"
                               className="btn-shine inline-flex items-center justify-center px-8 py-4 rounded-[10px] font-semibold text-base bg-[#25D366] text-white hover:bg-[#1ebe57] hover:shadow-xl hover:shadow-[#25D366]/30 hover:-translate-y-1 transition-all duration-300">
                                <WhatsAppGlyph size={18} className="mr-2" /> Plan My Trip
                            </a>
                        </Reveal>
                    </div>
                </section>
            </main>

            {/* Lightbox */}
            {lightbox !== null && (
                <div className="fixed inset-0 z-[100] bg-[#071B3A]/95 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in" onClick={() => setLightbox(null)}>
                    <button onClick={() => setLightbox(null)} aria-label="Close" className="absolute top-6 right-6 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 hover:rotate-90 transition-all duration-300 z-10"><X size={24} /></button>
                    <button onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + filtered.length) % filtered.length); }} aria-label="Previous"
                        className="absolute left-4 md:left-8 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-[#FF7200] transition-all duration-300 hover:scale-110 z-10"><ChevronLeft size={24} /></button>
                    <button onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % filtered.length); }} aria-label="Next"
                        className="absolute right-4 md:right-8 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-[#FF7200] transition-all duration-300 hover:scale-110 z-10"><ChevronRight size={24} /></button>
                    <div key={lightbox} className="max-w-5xl w-full animate-[scale-in_0.35s_cubic-bezier(0.16,1,0.3,1)_forwards]" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-center min-h-[50vh]">
                            <img src={filtered[lightbox].src} alt={filtered[lightbox].title} className="w-full h-auto max-h-[76vh] object-contain rounded-xl shadow-2xl" />
                        </div>
                        <div className="flex items-center justify-center gap-4 mt-6">
                            <div className="text-left">
                                <h3 className="text-white font-bold text-xl">{filtered[lightbox].title}</h3>
                                <p className="text-white/60 text-sm capitalize">{filtered[lightbox].category}</p>
                            </div>
                            <span className="text-white/50 text-sm font-semibold tabular-nums ml-6 border border-white/15 rounded-full px-3 py-1">
                                {lightbox + 1} / {filtered.length}
                            </span>
                        </div>
                    </div>
                </div>
            )}

            <Footer onNavigate={onNavigate} />
            <FloatingWhatsApp />
            <ScrollToTop />
        </div>
    );
}
