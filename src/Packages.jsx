import {
    MapPin, Phone, Clock, Heart, CheckCircle2, Shield, Gift, Plane, Star
} from 'lucide-react';

import { Header, Footer, FloatingWhatsApp, ScrollToTop, Reveal, FadeImg, PageHero, WhatsAppGlyph, WHATSAPP, CALL } from './shared.jsx';
import { PACKAGES, PAGE_HEROES } from './images.js';

const PackageCard = ({ pkg, onNavigate, index }) => (
    <Reveal delay={(index % 3) * 100}>
        <div className="bg-white rounded-3xl overflow-hidden shadow-sm card-lift border border-[#F2F4F7] group flex flex-col h-full">
            <div className="relative h-60 overflow-hidden img-zoom">
                <FadeImg src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071B3A]/50 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500"></div>
                {pkg.tag && <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#FF7200] text-white text-[10px] font-bold uppercase animate-pulse-glow">{pkg.tag}</div>}
                <button aria-label="Save to wishlist" className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 hover:text-[#FF7200] transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
                    <Heart size={15} />
                </button>
                <div className="absolute bottom-3 right-3 glass-dark px-3.5 py-2 rounded-xl text-white">
                    <span className="text-[10px] text-gray-300 block">Starting from</span>
                    <span className="text-xl font-bold">{pkg.price}</span>
                    <span className="text-[10px] text-gray-300"> /person</span>
                </div>
            </div>
            <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-3 text-[#687386] text-xs mb-3">
                    <span className="flex items-center gap-1"><Clock size={12} /> {pkg.duration}</span>
                    <span className="w-1 h-1 bg-[#DDE2E8] rounded-full"></span>
                    <span className="flex items-center gap-1"><Star size={12} className="text-[#FF7200] fill-[#FF7200]" /> 4.9</span>
                </div>
                <h3 className="font-bold text-[#071B3A] text-lg mb-2 group-hover:text-[#FF7200] transition-colors">{pkg.title}</h3>
                <p className="text-[#687386] text-sm leading-relaxed mb-4 flex-1">{pkg.desc}</p>
                <div className="grid grid-cols-3 gap-2 mb-4">
                    {['Hotels', 'Meals', 'Sightseeing'].map((h, i) => (
                        <div key={i} className="flex items-center justify-center gap-1 text-xs text-[#071B3A] bg-[#F8F6F1] rounded-lg py-1.5 font-medium hover:bg-[#FF7200]/10 transition-colors">
                            <CheckCircle2 size={12} className="text-[#FF7200]" /> {h}
                        </div>
                    ))}
                </div>
                <div className="flex items-center gap-2 mb-4 text-xs text-[#FF7200] font-semibold">
                    <Gift size={14} /> Free Gifts Included with Every Booking
                </div>
                <p className="text-[#687386] text-[11px] mb-4">Min 6 PAX on double sharing basis</p>
                <div className="flex gap-3 mt-auto">
                    <a href={`https://wa.me/917827743041?text=Hi! I'm interested in the ${pkg.title} package.`} target="_blank" rel="noopener noreferrer"
                       className="btn-shine flex-1 inline-flex items-center justify-center px-4 py-2.5 rounded-lg font-semibold text-sm bg-[#25D366] text-white hover:bg-[#1ebe57] transition-all duration-300 hover:shadow-lg hover:shadow-[#25D366]/20">WhatsApp</a>
                    <button onClick={() => onNavigate('contact')} className="btn-shine flex-1 inline-flex items-center justify-center px-4 py-2.5 rounded-lg font-semibold text-sm bg-gradient-to-r from-[#FF7200] to-[#FFB347] text-white hover:shadow-lg hover:shadow-[#FF7200]/30 transition-all duration-300">Enquire Now</button>
                </div>
            </div>
        </div>
    </Reveal>
);

export default function PackagesPage({ onNavigate }) {
    return (
        <div className="min-h-screen bg-[#F8F6F1] font-sans overflow-x-hidden selection:bg-[#FF7200] selection:text-white page-enter">
            <Header onNavigate={onNavigate} active="packages" />
            <main>
                <PageHero
                    badge="KASHMIR PACKAGES"
                    icon={<Plane size={16} />}
                    title={<>Explore Paradise<br />on Earth</>}
                    subtitle="Handpicked Kashmir tour packages with no hidden charges, free airport pickup, and customizable itineraries."
                    image={PAGE_HEROES.packages}
                />

                {/* Trust badges */}
                <section className="py-8 bg-white border-b border-[#F2F4F7]">
                    <div className="max-w-[1380px] mx-auto px-4 md:px-8">
                        <Reveal>
                            <div className="flex flex-wrap items-center gap-3 justify-center">
                                {[
                                    { icon: <Shield size={16} />, text: 'No hidden charges' },
                                    { icon: <Plane size={16} />, text: 'Free airport pickup' },
                                    { icon: <MapPin size={16} />, text: 'Customizable itinerary' },
                                    { icon: <CheckCircle2 size={16} />, text: 'Pay 30% to confirm' },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-2 px-4 py-2.5 bg-[#F8F6F1] rounded-full text-sm font-medium text-[#071B3A] border border-transparent hover:border-[#FF7200]/30 hover:bg-[#FF7200]/5 hover:-translate-y-0.5 transition-all duration-300">
                                        <span className="text-[#FF7200]">{item.icon}</span> {item.text}
                                    </div>
                                ))}
                            </div>
                        </Reveal>
                    </div>
                </section>

                {/* Packages grid */}
                <section className="py-16 md:py-24 bg-white">
                    <div className="max-w-[1380px] mx-auto px-4 md:px-8">
                        <Reveal>
                            <div className="text-center mb-12">
                                <h2 className="font-serif tracking-tight text-3xl md:text-5xl font-bold text-[#071B3A] mb-4">Tour <span className="text-gradient">Packages</span></h2>
                                <p className="text-[#687386] text-lg max-w-2xl mx-auto">Discover our carefully curated tour packages designed to give you the ultimate Kashmir experience</p>
                            </div>
                        </Reveal>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {PACKAGES.map((pkg, i) => <PackageCard key={pkg.id} pkg={pkg} onNavigate={onNavigate} index={i} />)}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-20 md:py-28 bg-gradient-to-br from-[#071B3A] via-[#0a2248] to-[#071B3A] relative overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '30px 30px' }}></div>
                    <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF7200]/10 rounded-full blur-3xl animate-drift pointer-events-none"></div>
                    <div className="max-w-[800px] mx-auto px-4 md:px-8 text-center relative z-10">
                        <Reveal direction="blur">
                            <h2 className="font-serif tracking-tight text-3xl md:text-5xl text-white font-bold mb-6">Can't find what you're looking for?</h2>
                            <p className="text-gray-300 text-lg mb-10 font-light">Let us create a custom Kashmir itinerary designed just for you.</p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn-shine inline-flex items-center justify-center px-8 py-4 rounded-[10px] font-semibold text-base bg-[#25D366] text-white hover:bg-[#1ebe57] hover:shadow-xl hover:shadow-[#25D366]/30 hover:-translate-y-1 transition-all duration-300">
                                    <WhatsAppGlyph size={18} className="mr-2" /> Customize My Trip
                                </a>
                                <a href={CALL} className="btn-shine inline-flex items-center justify-center px-8 py-4 rounded-[10px] font-semibold text-base bg-transparent text-white border-2 border-white/30 hover:border-white hover:bg-white/10 transition-all duration-300">
                                    <Phone size={16} className="mr-2" /> Call an Expert
                                </a>
                            </div>
                        </Reveal>
                    </div>
                </section>
            </main>

            <Footer onNavigate={onNavigate} />
            <FloatingWhatsApp />
            <ScrollToTop />
        </div>
    );
}
