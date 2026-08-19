import { MapPin, Users, CheckCircle2, Shield, Award, Headset, Heart, Compass, Plane } from 'lucide-react';

import { Header, Footer, FloatingWhatsApp, ScrollToTop, Reveal, AnimCounter, FadeImg, PageHero, WhatsAppGlyph, WHATSAPP, CALL } from './shared.jsx';
import { ABOUT_COLLAGE, PAGE_HEROES, CTA_BACKGROUND } from './images.js';

export default function AboutPage({ onNavigate }) {
    return (
        <div className="min-h-screen bg-[#F8F6F1] font-sans overflow-x-hidden selection:bg-[#FF7200] selection:text-white page-enter">
            <Header onNavigate={onNavigate} active="about" />
            <main>
                <PageHero
                    badge="ABOUT US"
                    icon={<Users size={16} />}
                    title="Our Kashmir Story"
                    subtitle="Born and raised in Kashmir, we've been sharing the beauty of our homeland with travelers for over 15 years."
                    image={PAGE_HEROES.about}
                />

                {/* Our story */}
                <section className="py-20 md:py-28 bg-white">
                    <div className="max-w-[1380px] mx-auto px-4 md:px-8">
                        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
                            <Reveal direction="left" className="w-full lg:w-1/2">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F8F6F1] text-[#FF7200] text-xs font-bold uppercase tracking-wider mb-6 border border-[#FF7200]/20">Our Story</div>
                                <h2 className="font-serif tracking-tight text-3xl md:text-5xl font-bold text-[#071B3A] mb-8 leading-tight">
                                    More than a travel agency — <span className="text-gradient italic">we're your Kashmiri hosts</span>
                                </h2>
                                <p className="text-[#687386] text-lg mb-8 leading-relaxed">The Indian Wings was founded with a simple belief: every traveler deserves an authentic Kashmir experience. We don't just plan trips — we open our doors, share our stories, and guide you through the land we call home.</p>
                                <p className="text-[#687386] text-lg mb-8 leading-relaxed">For over 15 years, we've helped thousands of families, couples, and solo travelers discover the true beauty of Kashmir — from the serene Dal Lake to the snow-capped peaks of Gulmarg.</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 mb-10">
                                    {['15+ Years in Kashmir', '500+ Happy Families', 'Local Srinagar Team', 'Verified Guides & Transport'].map((item, i) => (
                                        <div key={i} className="flex items-center gap-3 group">
                                            <div className="w-6 h-6 rounded-full bg-[#FF7200]/10 flex items-center justify-center shrink-0 group-hover:bg-[#FF7200] transition-colors duration-300">
                                                <CheckCircle2 size={14} className="text-[#FF7200] group-hover:text-white transition-colors" />
                                            </div>
                                            <span className="text-[#071B3A] font-semibold text-sm group-hover:translate-x-1 transition-transform duration-300">{item}</span>
                                        </div>
                                    ))}
                                </div>
                                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn-shine inline-flex items-center justify-center px-6 py-3 rounded-[10px] font-semibold text-sm bg-gradient-to-r from-[#FF7200] to-[#FFB347] text-white hover:shadow-lg hover:shadow-[#FF7200]/30 transition-all duration-300">
                                    Talk to Our Team →
                                </a>
                            </Reveal>

                            {/* Collage */}
                            <Reveal direction="right" className="w-full lg:w-1/2 relative min-h-[520px]">
                                <div className="absolute top-0 right-0 w-[60%] h-[250px] rounded-3xl overflow-hidden shadow-lg z-10 border-4 border-white img-zoom animate-float">
                                    <FadeImg src={ABOUT_COLLAGE[0].img} alt={ABOUT_COLLAGE[0].alt} className="w-full h-full object-cover" />
                                </div>
                                <div className="absolute top-[120px] left-0 w-[52%] h-[310px] rounded-3xl overflow-hidden shadow-2xl z-20 border-4 border-white img-zoom">
                                    <FadeImg src={ABOUT_COLLAGE[1].img} alt={ABOUT_COLLAGE[1].alt} className="w-full h-full object-cover" />
                                </div>
                                <div className="absolute bottom-0 right-8 w-[46%] h-[210px] rounded-3xl overflow-hidden shadow-lg z-30 border-4 border-white img-zoom">
                                    <FadeImg src={ABOUT_COLLAGE[2].img} alt={ABOUT_COLLAGE[2].alt} className="w-full h-full object-cover" />
                                </div>
                                <div className="absolute -left-4 md:-left-12 top-1/4 bg-white p-6 rounded-2xl shadow-xl z-40 border border-[#F2F4F7] animate-float" style={{ animationDelay: '1.2s' }}>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <div className="text-2xl font-bold text-[#FF7200]"><AnimCounter end={15} suffix="+" /></div>
                                            <div className="text-[10px] text-[#687386] font-semibold uppercase tracking-wider">Years</div>
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold text-[#FF7200]"><AnimCounter end={500} suffix="+" /></div>
                                            <div className="text-[10px] text-[#687386] font-semibold uppercase tracking-wider">Families</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute -bottom-6 right-0 w-32 h-32 bg-[#FF7200]/10 rounded-full blur-2xl animate-drift pointer-events-none"></div>
                            </Reveal>
                        </div>
                    </div>
                </section>

                {/* Stats band */}
                <section className="py-16 bg-[#071B3A] relative overflow-hidden">
                    <div className="grain absolute inset-0 opacity-[0.05] pointer-events-none"></div>
                    <div className="max-w-[1380px] mx-auto px-4 md:px-8 relative">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                { num: 500, s: '+', l: 'Happy Families', i: <Users size={24} /> },
                                { num: 15, s: '+', l: 'Years Experience', i: <Award size={24} /> },
                                { num: 24, s: '/7', l: 'Trip Support', i: <Headset size={24} /> },
                                { num: 50, s: '+', l: 'Destinations', i: <MapPin size={24} /> },
                            ].map((item, i) => (
                                <Reveal key={i} delay={i * 100}>
                                    <div className="text-center group">
                                        <div className="w-14 h-14 mx-auto bg-white/10 text-[#FFB347] rounded-2xl flex items-center justify-center mb-4 group-hover:bg-gradient-to-br group-hover:from-[#FF7200] group-hover:to-[#FFB347] group-hover:text-white group-hover:rotate-6 transition-all duration-500">{item.i}</div>
                                        <div className="text-2xl md:text-3xl font-bold text-white mb-1"><AnimCounter end={item.num} suffix={item.s} /></div>
                                        <div className="text-gray-400 text-sm">{item.l}</div>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Quote band with parallax image */}
                <section className="relative py-28 md:py-36 overflow-hidden bg-[#071B3A]">
                    <div
                        className="absolute inset-0 bg-cover bg-center md:bg-fixed"
                        style={{ backgroundImage: `url(${CTA_BACKGROUND})` }}
                    ></div>
                    <div className="absolute inset-0 bg-[#071B3A]/75"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071B3A]/60 via-transparent to-[#071B3A]/60"></div>
                    <div className="max-w-[900px] mx-auto px-4 md:px-8 text-center relative z-10">
                        <Reveal direction="blur">
                            <Plane size={36} className="text-[#FFB347] mx-auto mb-8 animate-float" />
                            <p className="font-serif italic text-2xl md:text-4xl text-white leading-snug mb-8">
                                "Gar firdaus bar rue zamin ast, hami asto, hamin asto, hamin ast."
                            </p>
                            <p className="text-white/70 text-base font-light">If there is a paradise on earth, it is this, it is this, it is this — <span className="text-[#FFB347] font-medium">Amir Khusrau</span></p>
                        </Reveal>
                    </div>
                </section>

                {/* Values */}
                <section className="py-20 md:py-28 bg-white">
                    <div className="max-w-[1380px] mx-auto px-4 md:px-8">
                        <Reveal>
                            <div className="text-center mb-14">
                                <h2 className="font-serif tracking-tight text-3xl md:text-5xl font-bold text-[#071B3A] mb-4">What We Stand For</h2>
                            </div>
                        </Reveal>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                            {[
                                { icon: <Heart size={26} />, title: 'Hospitality First', desc: 'Every guest is family. We treat your journey as if it were our own.' },
                                { icon: <Shield size={26} />, title: 'Trust & Safety', desc: 'Verified guides, secure transport and 24/7 support on every trip.' },
                                { icon: <Compass size={26} />, title: 'Authenticity', desc: 'Real Kashmiri experiences — homestays, local food, hidden trails.' },
                            ].map((item, i) => (
                                <Reveal key={i} delay={i * 130} direction="scale">
                                    <div className="group text-center bg-[#F8F6F1] rounded-3xl p-10 border border-[#F2F4F7] card-lift">
                                        <div className="w-16 h-16 mx-auto bg-white text-[#FF7200] rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-gradient-to-br group-hover:from-[#FF7200] group-hover:to-[#FFB347] group-hover:text-white group-hover:rotate-6 transition-all duration-500">
                                            {item.icon}
                                        </div>
                                        <h3 className="font-bold text-[#071B3A] text-xl mb-3">{item.title}</h3>
                                        <p className="text-[#687386] text-sm leading-relaxed">{item.desc}</p>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-20 bg-[#F8F6F1]">
                    <div className="max-w-[800px] mx-auto px-4 md:px-8 text-center">
                        <Reveal direction="blur">
                            <h2 className="font-serif tracking-tight text-3xl md:text-5xl font-bold text-[#071B3A] mb-6">Ready to Experience Kashmir?</h2>
                            <p className="text-[#687386] text-lg mb-10">Let us plan your perfect Kashmir trip. Contact us today.</p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn-shine inline-flex items-center justify-center px-8 py-4 rounded-[10px] font-semibold text-base bg-[#25D366] text-white hover:bg-[#1ebe57] hover:shadow-xl hover:shadow-[#25D366]/30 hover:-translate-y-1 transition-all duration-300">
                                    <WhatsAppGlyph size={18} className="mr-2" /> WhatsApp Us
                                </a>
                                <a href={CALL} className="btn-shine inline-flex items-center justify-center px-8 py-4 rounded-[10px] font-semibold text-base bg-[#071B3A] text-white hover:bg-[#05132A] hover:shadow-xl hover:-translate-y-1 transition-all duration-300">Call Us Now</a>
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
