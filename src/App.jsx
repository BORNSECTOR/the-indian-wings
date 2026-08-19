import { useState, useEffect, useRef, useCallback } from 'react';
import AboutPage from './About.jsx';
import ContactPage from './Contact.jsx';
import GalleryPage from './Gallery.jsx';
import PackagesPage from './Packages.jsx';

import {
    MapPin, Star, Clock, Heart, CheckCircle2, Shield, Plane, Compass,
    Gift, Users, ChevronLeft, ChevronRight, Sparkles, Camera, ArrowRight
} from 'lucide-react';

import { Header, Footer, FloatingWhatsApp, ScrollToTop, Reveal, AnimCounter, SectionBadge, FadeImg, WhatsAppGlyph, WHATSAPP, CALL } from './shared.jsx';
import { HERO, DESTINATIONS, MARQUEE_IMAGES, SEASONS, EXPERIENCES, PACKAGES } from './images.js';

const typography = { heading: 'font-serif tracking-tight', body: 'font-sans' };

/* ============================================================
   3D TILT CARD — subtle perspective on mouse move
   ============================================================ */
const TiltCard = ({ children, className = '', max = 7 }) => {
    const ref = useRef(null);

    const onMove = (e) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        el.style.transform = `perspective(900px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg) translateY(-6px)`;
    };
    const onLeave = () => {
        if (ref.current) ref.current.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)';
    };

    return (
        <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className={`tilt-card ${className}`}>
            {children}
        </div>
    );
};

/* ============================================================
   HERO — full-screen single background image
   ============================================================ */
const FALLING_DOTS = [
    { left: '6%',  delay: '0s',    dur: '14s', size: 5 },
    { left: '14%', delay: '2.5s',  dur: '18s', size: 3 },
    { left: '24%', delay: '5s',    dur: '13s', size: 4 },
    { left: '33%', delay: '1.2s',  dur: '16s', size: 3 },
    { left: '46%', delay: '7s',    dur: '15s', size: 5 },
    { left: '57%', delay: '3.6s',  dur: '19s', size: 3 },
    { left: '66%', delay: '0.8s',  dur: '14s', size: 4 },
    { left: '74%', delay: '6s',    dur: '17s', size: 3 },
    { left: '84%', delay: '4s',    dur: '13s', size: 5 },
    { left: '93%', delay: '2s',    dur: '18s', size: 3 },
];

const Hero = () => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => { const t = setTimeout(() => setLoaded(true), 120); return () => clearTimeout(t); }, []);

    return (
        <section className="relative min-h-[92vh] md:min-h-screen bg-[#071B3A] overflow-hidden flex items-center">
            {/* ---- single background image ---- */}
            <div className="absolute inset-0">
                <img
                    src={HERO.src}
                    alt={HERO.title}
                    className="w-full h-full object-cover animate-kenburns"
                />
            </div>

            {/* ---- overlays ---- */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#071B3A]/95 via-[#071B3A]/55 to-[#071B3A]/20"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#071B3A] via-transparent to-[#071B3A]/40"></div>
            <div className="grain absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none"></div>

            {/* ---- falling sparkle dots ---- */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {FALLING_DOTS.map((d, i) => (
                    <span key={i} className="absolute top-0 rounded-full bg-[#FFB347]/50 animate-fall"
                          style={{ left: d.left, width: d.size, height: d.size, animationDuration: d.dur, animationDelay: d.delay }} />
                ))}
            </div>

            {/* ---- drifting orbs ---- */}
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#FF7200]/10 rounded-full blur-3xl animate-drift pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-[#25D366]/5 rounded-full blur-3xl animate-drift pointer-events-none" style={{ animationDelay: '-8s' }}></div>

            {/* ---- content (centered) ---- */}
            <div className="max-w-[1380px] mx-auto px-4 md:px-8 relative z-10 w-full py-28 md:py-32">
                <div className="max-w-3xl mx-auto text-center">
                    <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-[#FFB347] text-sm font-semibold mb-6 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        <Plane size={16} className="animate-float" /> KASHMIR TOURISM · EST. 2010
                    </div>
                    <h1 className={`${typography.heading} text-[42px] sm:text-6xl md:text-7xl xl:text-[84px] text-white leading-[1.05] mb-6 font-bold`}>
                        <span className={`block transition-all duration-700 delay-100 ${loaded ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}>Discover</span>
                        <span className={`block transition-all duration-700 delay-200 ${loaded ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}>
                            Paradise in
                        </span>
                        <span className={`block relative italic text-gradient transition-all duration-700 delay-300 ${loaded ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}>
                            Kashmir
                            <svg className="absolute w-full h-3 -bottom-1 left-0 text-[#FF7200]" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0,8 Q50,0 100,8" fill="none" stroke="currentColor" strokeWidth="3" className="animate-[dash_1.8s_ease_forwards]" strokeDasharray="200" strokeDashoffset="200" />
                            </svg>
                        </span>
                    </h1>
                    <p className={`text-gray-300 text-lg md:text-xl mb-10 font-light leading-relaxed transition-all duration-700 delay-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                        Your trusted local partner for unforgettable Kashmir experiences. We've been sharing the beauty of our homeland with travelers for over <span className="text-white font-medium">15 years</span>.
                    </p>
                    <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                        <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn-shine animate-gradient-x inline-flex items-center justify-center px-8 py-4 rounded-[10px] font-semibold text-base bg-gradient-to-r from-[#25D366] to-[#1ebe57] text-white hover:shadow-xl hover:shadow-[#25D366]/30 hover:-translate-y-1 transition-all duration-300">
                            <WhatsAppGlyph size={18} className="mr-2" /> Plan Your Kashmir Trip
                        </a>
                        <a href={CALL} className="btn-shine inline-flex items-center justify-center px-8 py-4 rounded-[10px] font-semibold text-base glass text-white hover:bg-white/20 transition-all duration-300">
                            Call an Expert
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

/* ============================================================
   STATS
   ============================================================ */
const Stats = () => {
    const stats = [
        { num: 500, suffix: '+', label: 'Happy Families', icon: <Users size={24} /> },
        { num: 15, suffix: '+', label: 'Years Experience', icon: <Clock size={24} /> },
        { num: 24, suffix: '/7', label: 'Trip Support', icon: <Compass size={24} /> },
        { num: 50, suffix: '+', label: 'Destinations', icon: <MapPin size={24} /> },
    ];
    return (
        <section className="bg-white py-14 md:py-16 border-b border-[#F2F4F7] relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-1 rounded-b-full bg-gradient-to-r from-transparent via-[#FF7200] to-transparent"></div>
            <div className="max-w-[1380px] mx-auto px-4 md:px-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {stats.map((item, i) => (
                        <Reveal key={i} delay={i * 100}>
                            <div className="text-center group">
                                <div className="w-14 h-14 mx-auto bg-[#FF7200]/10 text-[#FF7200] rounded-2xl flex items-center justify-center mb-4 group-hover:bg-gradient-to-br group-hover:from-[#FF7200] group-hover:to-[#FFB347] group-hover:text-white group-hover:rotate-6 transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#FF7200]/30">
                                    {item.icon}
                                </div>
                                <div className="text-3xl md:text-4xl font-bold text-[#071B3A] mb-1">
                                    <AnimCounter end={item.num} suffix={item.suffix} />
                                </div>
                                <div className="text-[#687386] text-sm font-medium">{item.label}</div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

/* ============================================================
   DESTINATIONS
   ============================================================ */
const Destinations = ({ onNavigate }) => (
    <section className="py-20 md:py-28 bg-[#F8F6F1] relative overflow-hidden">
        <div className="absolute top-20 right-0 w-72 h-72 bg-[#FF7200]/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-[1380px] mx-auto px-4 md:px-8 relative">
            <Reveal>
                <div className="text-center mb-14">
                    <SectionBadge icon={<MapPin size={16} />}>DESTINATIONS</SectionBadge>
                    <h2 className={`${typography.heading} text-3xl md:text-5xl font-bold text-[#071B3A] mb-4`}>
                        Explore <span className="text-gradient">Kashmir</span>
                    </h2>
                    <p className="text-[#687386] text-lg max-w-2xl mx-auto">From serene lakes to snow-capped peaks, discover the breathtaking beauty of Kashmir's most iconic destinations</p>
                </div>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {DESTINATIONS.map((dest, i) => (
                    <Reveal key={dest.name} delay={(i % 3) * 120}>
                        <TiltCard>
                            <button onClick={() => onNavigate('gallery')} className="group cursor-pointer rounded-3xl overflow-hidden bg-white shadow-sm card-lift border border-[#F2F4F7] text-left w-full block">
                                <div className="relative h-72 overflow-hidden img-zoom">
                                    <FadeImg src={dest.img} alt={dest.name} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#071B3A]/90 via-[#071B3A]/25 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500"></div>
                                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-white text-[11px] font-bold border border-white/20">
                                        {dest.tag}
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                        <h3 className={`${typography.heading} text-3xl font-bold mb-1 transition-transform duration-500 group-hover:-translate-y-1`}>{dest.name}</h3>
                                        <p className="text-white/75 text-sm font-medium flex items-center gap-1.5"><MapPin size={13} /> {dest.desc}</p>
                                    </div>
                                    <div className="absolute bottom-6 right-6 w-11 h-11 bg-[#FF7200] rounded-full flex items-center justify-center text-white opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 shadow-lg shadow-[#FF7200]/40">
                                        <ArrowRight size={18} />
                                    </div>
                                </div>
                            </button>
                        </TiltCard>
                    </Reveal>
                ))}
            </div>
        </div>
    </section>
);

/* ============================================================
   PHOTO MARQUEE — endless image band
   ============================================================ */
const PhotoMarquee = ({ onNavigate }) => (
    <section className="py-16 md:py-20 bg-[#071B3A] overflow-hidden marquee-pause">
        <div className="max-w-[1380px] mx-auto px-4 md:px-8 mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <Reveal>
                <div>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-[#FFB347] text-sm font-semibold mb-4 border border-white/15">
                        <Camera size={16} /> KASHMIR IN FRAMES
                    </div>
                    <h2 className={`${typography.heading} text-3xl md:text-4xl font-bold text-white`}>Moments We Live For</h2>
                </div>
            </Reveal>
            <Reveal delay={150}>
                <button onClick={() => onNavigate('gallery')} className="inline-flex items-center gap-2 text-white/70 hover:text-[#FFB347] text-sm font-semibold transition-colors">
                    View full gallery <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>
            </Reveal>
        </div>
        <div className="flex animate-marquee w-max">
            {[...MARQUEE_IMAGES, ...MARQUEE_IMAGES].map((item, i) => (
                <div key={i} className="relative w-56 h-36 md:w-72 md:h-44 mx-2.5 rounded-2xl overflow-hidden shrink-0 group cursor-pointer"
                     onClick={() => onNavigate('gallery')}>
                    <img src={item.img} alt={item.label} loading="lazy" className="w-full h-full object-cover grayscale-[35%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071B3A]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute bottom-3 left-4 text-white text-xs font-bold opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                        {item.label}
                    </div>
                </div>
            ))}
        </div>
    </section>
);

/* ============================================================
   PACKAGES PREVIEW
   ============================================================ */
const PackagesPreview = ({ onNavigate }) => {
    const pkgs = PACKAGES.slice(0, 6);
    return (
        <section className="py-20 md:py-28 bg-white">
            <div className="max-w-[1380px] mx-auto px-4 md:px-8">
                <Reveal>
                    <div className="text-center mb-12">
                        <SectionBadge icon={<Plane size={16} />}>PACKAGES</SectionBadge>
                        <h2 className={`${typography.heading} text-3xl md:text-5xl font-bold text-[#071B3A] mb-4`}>Discover Kashmir</h2>
                        <p className="text-[#687386] text-lg max-w-2xl mx-auto">Carefully curated tour packages designed to give you the ultimate Kashmir experience</p>
                    </div>
                </Reveal>

                <Reveal delay={100}>
                    <div className="flex flex-wrap items-center gap-3 justify-center mb-14">
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

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-14">
                    {pkgs.map((pkg, i) => (
                        <Reveal key={pkg.id} delay={(i % 3) * 100}>
                            <div className="bg-white rounded-3xl overflow-hidden shadow-sm card-lift border border-[#F2F4F7] group flex flex-col h-full">
                                <div className="relative h-56 overflow-hidden img-zoom">
                                    <FadeImg src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
                                    {pkg.tag && <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#FF7200] text-white text-[10px] font-bold uppercase animate-pulse-glow">{pkg.tag}</div>}
                                    <div className="absolute bottom-3 right-3 glass-dark px-3 py-1.5 rounded-xl text-white">
                                        <span className="text-[10px] text-gray-300 block">From</span>
                                        <span className="text-lg font-bold">{pkg.price}</span>
                                    </div>
                                </div>
                                <div className="p-5 flex flex-col flex-1">
                                    <span className="text-[#687386] text-xs mb-2 flex items-center gap-1"><Clock size={12} /> {pkg.duration}</span>
                                    <h3 className="font-bold text-[#071B3A] text-lg mb-3 group-hover:text-[#FF7200] transition-colors">{pkg.title}</h3>
                                    <p className="text-[#687386] text-sm leading-relaxed mb-4 flex-1">{pkg.desc}</p>
                                    <div className="mt-auto flex gap-3">
                                        <a href={`https://wa.me/917827743041?text=Hi! I'm interested in the ${pkg.title} package.`} target="_blank" rel="noopener noreferrer"
                                           className="btn-shine flex-1 inline-flex items-center justify-center px-4 py-2.5 rounded-lg font-semibold text-sm bg-[#25D366] text-white hover:bg-[#1ebe57] transition-all duration-300 hover:shadow-lg hover:shadow-[#25D366]/20">WhatsApp</a>
                                        <button onClick={() => onNavigate('contact')} className="btn-shine flex-1 inline-flex items-center justify-center px-4 py-2.5 rounded-lg font-semibold text-sm bg-[#FF7200] text-white hover:bg-[#E66600] transition-all duration-300 hover:shadow-lg hover:shadow-[#FF7200]/20">Enquire</button>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>

                <Reveal>
                    <div className="text-center">
                        <button onClick={() => onNavigate('packages')} className="btn-shine group inline-flex items-center justify-center px-8 py-4 rounded-[10px] font-semibold text-base bg-[#071B3A] text-white hover:bg-[#05132A] hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            View All Packages <ChevronRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </Reveal>
            </div>
        </section>
    );
};

/* ============================================================
   SEASONS OF KASHMIR
   ============================================================ */
const Seasons = () => (
    <section className="py-20 md:py-28 bg-[#F8F6F1] relative overflow-hidden">
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#FF7200]/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-[1380px] mx-auto px-4 md:px-8 relative">
            <Reveal>
                <div className="text-center mb-14">
                    <SectionBadge icon={<Sparkles size={16} />}>FOUR SEASONS</SectionBadge>
                    <h2 className={`${typography.heading} text-3xl md:text-5xl font-bold text-[#071B3A] mb-4`}>Kashmir in Every Season</h2>
                    <p className="text-[#687386] text-lg max-w-2xl mx-auto">Each season paints the valley differently — there's never a wrong time to visit</p>
                </div>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {SEASONS.map((season, i) => (
                    <Reveal key={season.name} delay={i * 120} direction="scale">
                        <div className="group bg-white rounded-3xl overflow-hidden shadow-sm card-lift border border-[#F2F4F7] h-full flex flex-col">
                            <div className="relative h-48 overflow-hidden img-zoom">
                                <FadeImg src={season.img} alt={season.name} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#071B3A]/60 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500"></div>
                                <div className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center text-lg group-hover:scale-110 transition-transform duration-500">
                                    {season.emoji}
                                </div>
                            </div>
                            <div className="p-5 flex flex-col flex-1">
                                <div className="flex items-baseline justify-between mb-2">
                                    <h3 className={`${typography.heading} text-2xl font-bold text-[#071B3A] group-hover:text-[#FF7200] transition-colors`}>{season.name}</h3>
                                    <span className="text-[11px] font-bold text-[#FF7200] bg-[#FF7200]/10 rounded-full px-2.5 py-1">{season.months}</span>
                                </div>
                                <p className="text-[#687386] text-sm leading-relaxed">{season.desc}</p>
                            </div>
                        </div>
                    </Reveal>
                ))}
            </div>
        </div>
    </section>
);

/* ============================================================
   WHY CHOOSE US
   ============================================================ */
const WhyChooseUs = () => {
    const reasons = [
        { title: 'Local Expertise', desc: 'Born and raised in Kashmir, we know every hidden gem and secret spot.', icon: <Compass size={28} /> },
        { title: 'Safe & Reliable', desc: 'Your safety is our priority with verified guides and secure transportation.', icon: <Shield size={28} /> },
        { title: 'Personalized Care', desc: 'Every trip is customized to match your preferences and dreams.', icon: <Heart size={28} /> },
        { title: 'Exclusive Access', desc: 'Visit places tourists rarely see with our insider connections.', icon: <MapPin size={28} /> },
        { title: '24/7 Support', desc: 'Round-the-clock assistance throughout your Kashmir journey.', icon: <Compass size={28} /> },
        { title: 'Best Value', desc: 'Premium experiences at competitive prices with no hidden costs.', icon: <CheckCircle2 size={28} /> },
    ];
    return (
        <section className="py-20 md:py-28 bg-[#071B3A] relative overflow-hidden">
            <div className="grain absolute inset-0 opacity-[0.05] pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-64 h-64 bg-[#FF7200]/10 rounded-full blur-3xl animate-drift"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#25D366]/5 rounded-full blur-3xl animate-drift" style={{ animationDelay: '-9s' }}></div>

            <div className="max-w-[1380px] mx-auto px-4 md:px-8 relative z-10">
                <Reveal>
                    <div className="text-center mb-16">
                        <SectionBadge icon={<Shield size={16} />} dark>WHY CHOOSE US</SectionBadge>
                        <h2 className={`${typography.heading} text-3xl md:text-5xl font-bold text-white mb-4`}>
                            Why Travelers Choose <span className="text-gradient">The Indian Wings</span>
                        </h2>
                    </div>
                </Reveal>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {reasons.map((item, i) => (
                        <Reveal key={i} delay={(i % 3) * 120}>
                            <div className="group bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:bg-white/10 hover:border-[#FF7200]/40 transition-all duration-500 hover:-translate-y-1.5 cursor-default relative overflow-hidden">
                                <div className="absolute -right-8 -top-8 w-28 h-28 bg-[#FF7200]/10 rounded-full blur-2xl group-hover:bg-[#FF7200]/20 transition-colors duration-500"></div>
                                <div className="w-14 h-14 bg-gradient-to-br from-[#FF7200]/30 to-[#FF7200]/10 text-[#FFB347] rounded-2xl flex items-center justify-center mb-6 group-hover:from-[#FF7200] group-hover:to-[#FFB347] group-hover:text-white group-hover:rotate-6 group-hover:scale-110 transition-all duration-500">
                                    {item.icon}
                                </div>
                                <h3 className="font-bold text-white text-lg mb-3 group-hover:text-[#FFB347] transition-colors">{item.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

/* ============================================================
   SPECIAL EXPERIENCES
   ============================================================ */
const SpecialExperiences = () => (
    <section className="py-20 md:py-28 bg-white">
        <div className="max-w-[1380px] mx-auto px-4 md:px-8">
            <Reveal>
                <div className="text-center mb-14">
                    <SectionBadge icon={<Gift size={16} />}>SPECIAL EXPERIENCES</SectionBadge>
                    <h2 className={`${typography.heading} text-3xl md:text-5xl font-bold text-[#071B3A] mb-4`}>Curated For You</h2>
                    <p className="text-[#687386] text-lg max-w-2xl mx-auto">Unique packages designed for special moments and unforgettable memories</p>
                </div>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {EXPERIENCES.map((exp, i) => (
                    <Reveal key={i} delay={i * 150} direction={i === 0 ? 'left' : 'right'}>
                        <div className="bg-white rounded-3xl overflow-hidden shadow-sm card-lift border border-[#F2F4F7] group h-full flex flex-col">
                            <div className="relative h-64 overflow-hidden img-zoom">
                                <FadeImg src={exp.img} alt={exp.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#071B3A]/80 to-transparent"></div>
                                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#FF7200] text-white text-xs font-bold animate-pulse-glow">{exp.tag}</div>
                            </div>
                            <div className="p-8 flex flex-col flex-1">
                                <h3 className={`${typography.heading} text-2xl font-bold text-[#071B3A] mb-3 group-hover:text-[#FF7200] transition-colors`}>{exp.title}</h3>
                                <p className="text-[#687386] text-sm mb-6 leading-relaxed">{exp.desc}</p>
                                <div className="grid grid-cols-2 gap-3 mb-6">
                                    {exp.features.map((f, j) => (
                                        <div key={j} className="flex items-center gap-2 text-xs text-[#071B3A]"><CheckCircle2 size={12} className="text-[#FF7200] shrink-0" /> {f}</div>
                                    ))}
                                </div>
                                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn-shine mt-auto inline-flex items-center justify-center px-6 py-3 rounded-[10px] font-semibold text-sm bg-gradient-to-r from-[#FF7200] to-[#FFB347] text-white hover:shadow-lg hover:shadow-[#FF7200]/30 transition-all duration-300 w-full">{exp.cta}</a>
                            </div>
                        </div>
                    </Reveal>
                ))}
            </div>
        </div>
    </section>
);

/* ============================================================
   TRAVEL TIP MARQUEE
   ============================================================ */
const TravelTip = () => (
    <section className="py-4 bg-gradient-to-r from-[#FF7200] via-[#FF8A2E] to-[#FF7200] overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex items-center">
            {Array(3).fill(null).map((_, i) => (
                <span key={i} className="inline-flex items-center gap-8 mx-8 text-white font-semibold text-sm">
                    <span>✈ Best time to visit Kashmir: March–October</span>
                    <span>•</span>
                    <span>Free airport pickup with all packages</span>
                    <span>•</span>
                    <span>Srinagar Airport (SXR) — direct flights from Delhi, Mumbai, Bangalore</span>
                    <span>•</span>
                    <span>Call: +91 91035 99174</span>
                    <span>•</span>
                </span>
            ))}
        </div>
    </section>
);

/* ============================================================
   THE GUESTBOOK — immersive traveler stories
   ============================================================ */
const Testimonials = () => {
    const reviews = [
        {
            name: 'Neha & Amit',
            initials: 'NA',
            trip: 'Kashmir Honeymoon',
            place: 'Dal Lake, Srinagar',
            text: 'Our Kashmir honeymoon felt like a dream from the very first day. Every detail was handled beautifully — the warm houseboat welcome, quiet Shikara ride at sunset, and little surprises along the way made the trip completely ours.',
            image: DESTINATIONS[0].img,
        },
        {
            name: 'Rajesh Sharma',
            initials: 'RS',
            trip: 'Family Kashmir Tour',
            place: 'Pahalgam Valley',
            text: 'Travelling with children can be stressful, but this was effortless. The pace was just right, our driver was incredibly patient, and every stay felt comfortable and thoughtfully chosen. The kids are still talking about Kashmir.',
            image: DESTINATIONS[2].img,
        },
        {
            name: 'Meera Iyer',
            initials: 'MI',
            trip: 'Gulmarg Adventure',
            place: 'Gulmarg, Kashmir',
            text: 'From the gondola ride to playing in the snow, the entire journey was beautifully organised. We never felt rushed and always had someone local to guide us. It was adventurous, easy, and absolutely unforgettable.',
            image: DESTINATIONS[1].img,
        },
        {
            name: 'Arjun Verma',
            initials: 'AV',
            trip: 'Vaishno Devi Yatra',
            place: 'Katra, Jammu',
            text: 'A seamless pilgrimage from beginning to end. Comfortable stays, dependable transfers, and a genuinely supportive team gave our family the space to focus on the experience instead of worrying about arrangements.',
            image: DESTINATIONS[3].img,
        },
    ];
    const [activeReview, setActiveReview] = useState(0);
    const review = reviews[activeReview];
    const changeReview = (direction) => {
        setActiveReview((current) => (current + direction + reviews.length) % reviews.length);
    };

    return (
        <section className="relative overflow-hidden bg-[#061830] py-20 md:py-28">
            <div className="absolute inset-0 opacity-[0.035] grain pointer-events-none"></div>
            <div className="absolute -top-48 -right-32 h-[32rem] w-[32rem] rounded-full border border-white/10 pointer-events-none"></div>
            <div className="absolute -top-24 -right-16 h-80 w-80 rounded-full border border-white/10 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 h-52 w-52 bg-[#FF7200]/10 blur-[100px] pointer-events-none"></div>

            <div className="relative max-w-[1380px] mx-auto px-4 md:px-8">
                <Reveal>
                    <div className="mb-10 flex flex-col gap-7 md:mb-14 md:flex-row md:items-end md:justify-between">
                        <div className="max-w-2xl">
                            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#FFB347]/30 bg-[#FF7200]/10 px-4 py-2 text-xs font-bold tracking-[0.18em] text-[#FFB347]">
                                <Star size={14} fill="currentColor" /> THE GUESTBOOK
                            </div>
                            <h2 className={`${typography.heading} text-4xl font-bold leading-[1.08] text-white md:text-6xl`}>
                                Journeys remembered.<br />
                                <span className="italic text-[#FF9B45]">Stories retold.</span>
                            </h2>
                        </div>
                        <div className="flex items-center gap-4 self-start rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-4 backdrop-blur-sm md:self-auto">
                            <strong className={`${typography.heading} text-4xl text-white`}>5.0</strong>
                            <div>
                                <div className="mb-1 flex gap-0.5 text-[#FF9B45]" aria-label="5 out of 5 stars">
                                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                                </div>
                                <p className="text-xs font-medium text-white/55">500+ happy families</p>
                            </div>
                        </div>
                    </div>
                </Reveal>

                <Reveal direction="blur">
                    <div className="overflow-hidden rounded-[28px] bg-[#F8F2E8] shadow-[0_32px_90px_rgba(0,0,0,0.28)] md:rounded-[38px]">
                        <div className="grid min-h-[570px] lg:grid-cols-[1.03fr_0.97fr]">
                            <div className="relative min-h-[330px] overflow-hidden lg:min-h-full">
                                <img
                                    key={`image-${activeReview}`}
                                    src={review.image}
                                    alt={review.place}
                                    loading="lazy"
                                    className="testimonial-image absolute inset-0 h-full w-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#061830]/80 via-transparent to-[#061830]/10"></div>
                                <div className="absolute left-5 right-5 top-5 flex items-center justify-between md:left-8 md:right-8 md:top-8">
                                    <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs font-bold text-[#071B3A] shadow-lg backdrop-blur-md">
                                        <MapPin size={14} className="text-[#FF7200]" /> {review.place}
                                    </span>
                                    <span className="font-mono text-xs font-bold tracking-[0.18em] text-white">
                                        0{activeReview + 1} <span className="text-white/45">/ 0{reviews.length}</span>
                                    </span>
                                </div>
                                <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8">
                                    <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.24em] text-white/60">A moment from</p>
                                    <p className={`${typography.heading} text-2xl font-bold text-white md:text-3xl`}>{review.trip}</p>
                                </div>
                            </div>

                            <div className="testimonial-paper relative flex flex-col justify-between p-7 sm:p-10 lg:p-12 xl:p-16" aria-live="polite">
                                <span className={`${typography.heading} absolute right-8 top-4 select-none text-[110px] leading-none text-[#FF7200]/10 md:right-12 md:top-7 md:text-[150px]`} aria-hidden="true">“</span>
                                <div key={`copy-${activeReview}`} className="testimonial-copy relative z-10">
                                    <div className="mb-7 flex gap-1 text-[#FF7200]">
                                        {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                                    </div>
                                    <blockquote className={`${typography.heading} text-[24px] font-medium italic leading-[1.45] text-[#071B3A] sm:text-3xl xl:text-[34px]`}>
                                        “{review.text}”
                                    </blockquote>
                                </div>

                                <div className="relative z-10 mt-10 border-t border-[#071B3A]/10 pt-7">
                                    <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className={`${typography.heading} flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#071B3A] font-bold text-white shadow-[0_0_0_5px_rgba(255,114,0,0.12)]`}>
                                                {review.initials}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-[#071B3A]">{review.name}</h3>
                                                <p className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-[#607087]">
                                                    <CheckCircle2 size={14} className="text-[#16A36A]" /> Verified traveller
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={() => changeReview(-1)} aria-label="Previous traveler story" className="flex h-12 w-12 items-center justify-center rounded-full border border-[#071B3A]/15 text-[#071B3A] transition-all duration-300 hover:border-[#FF7200] hover:bg-[#FF7200] hover:text-white">
                                                <ChevronLeft size={19} />
                                            </button>
                                            <button onClick={() => changeReview(1)} aria-label="Next traveler story" className="flex h-12 w-12 items-center justify-center rounded-full bg-[#071B3A] text-white transition-all duration-300 hover:bg-[#FF7200] hover:shadow-lg">
                                                <ChevronRight size={19} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Reveal>

                <div className="mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 hide-scrollbar md:mt-6 md:grid md:grid-cols-4">
                    {reviews.map((item, index) => (
                        <button
                            key={item.name}
                            onClick={() => setActiveReview(index)}
                            aria-pressed={index === activeReview}
                            className={`group flex min-w-[245px] snap-start items-center gap-3 rounded-2xl border p-2.5 text-left transition-all duration-300 md:min-w-0 ${index === activeReview ? 'border-[#FF7200] bg-[#FF7200]' : 'border-white/10 bg-white/[0.055] hover:border-white/25 hover:bg-white/10'}`}
                        >
                            <img src={item.image} alt="" loading="lazy" className="h-14 w-14 shrink-0 rounded-xl object-cover" />
                            <span className="min-w-0">
                                <span className={`block truncate text-sm font-bold ${index === activeReview ? 'text-white' : 'text-white/85'}`}>{item.name}</span>
                                <span className={`mt-1 block truncate text-[11px] font-medium ${index === activeReview ? 'text-white/75' : 'text-white/40'}`}>{item.trip}</span>
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
};

/* ============================================================
   CONTACT CTA — generated cinematic Kashmir banner
   ============================================================ */
const ContactCTA = ({ onNavigate }) => (
    <section className="bg-[#F8F6F1] px-4 py-16 md:px-8 md:py-24">
        <Reveal direction="blur" className="mx-auto max-w-[1380px]">
            <div className="relative min-h-[570px] overflow-hidden rounded-[30px] bg-[#071B3A] shadow-[0_30px_80px_-28px_rgba(7,27,58,0.5)] md:rounded-[42px] lg:min-h-[620px]">
                <img src="/cta-kashmir.jpg" alt="Shikara on a tranquil Kashmir lake beneath the Himalayas" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-[58%_center] transition-transform duration-[1800ms] hover:scale-[1.025]" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#041226]/95 via-[#071B3A]/76 to-[#071B3A]/10"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#041226]/75 via-transparent to-[#041226]/20"></div>
                <div className="grain absolute inset-0 opacity-[0.055] mix-blend-overlay pointer-events-none"></div>

                <div className="relative z-10 flex min-h-[570px] items-center px-6 py-16 sm:px-10 md:px-16 lg:min-h-[620px] lg:px-20 xl:px-24">
                    <div className="max-w-[680px]">
                        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold tracking-[0.16em] text-[#FFD2AC] backdrop-blur-md">
                            <Sparkles size={14} className="text-[#FF8A2E]" /> YOUR STORY STARTS HERE
                        </div>
                        <h2 className={`${typography.heading} mb-7 text-[42px] font-bold leading-[1.03] text-white sm:text-5xl md:text-6xl xl:text-[76px]`}>
                            Ready to Explore<br />
                            <span className="italic text-[#FF9B45]">Kashmir?</span>
                        </h2>
                        <p className="mb-9 max-w-xl text-base font-light leading-relaxed text-white/72 md:text-lg">
                            Tell us how you love to travel. Our local experts will shape a personal Kashmir journey around your dates, pace, and dreams.
                        </p>
                        <div className="flex flex-col gap-3 sm:flex-row">
                            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn-shine inline-flex items-center justify-center rounded-xl bg-[#25D366] px-7 py-4 text-sm font-bold text-white shadow-xl shadow-[#25D366]/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#1ebe57]">
                                <WhatsAppGlyph size={18} className="mr-2" /> Plan My Kashmir Trip
                            </a>
                            <button onClick={() => onNavigate('contact')} className="group inline-flex items-center justify-center rounded-xl border border-white/25 bg-white/10 px-7 py-4 text-sm font-bold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-[#071B3A]">
                                Talk to an Expert <ArrowRight size={17} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                            </button>
                        </div>

                        <div className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-3 text-xs font-semibold text-white/65">
                            <span className="flex items-center gap-2"><CheckCircle2 size={15} className="text-[#FF9B45]" /> 100% custom itinerary</span>
                            <span className="flex items-center gap-2"><CheckCircle2 size={15} className="text-[#FF9B45]" /> Local Kashmir experts</span>
                            <span className="flex items-center gap-2"><CheckCircle2 size={15} className="text-[#FF9B45]" /> 24/7 trip support</span>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-7 right-7 hidden items-center gap-3 rounded-2xl border border-white/20 bg-[#071B3A]/65 px-5 py-4 text-white shadow-xl backdrop-blur-xl lg:flex">
                    <span className={`${typography.heading} text-3xl font-bold text-[#FF9B45]`}>15+</span>
                    <span className="text-[10px] font-bold uppercase leading-relaxed tracking-[0.16em] text-white/65">Years of<br />local expertise</span>
                </div>
            </div>
        </Reveal>
    </section>
);

/* ============================================================
   APP
   ============================================================ */
export default function App() {
    const [currentPage, setCurrentPage] = useState('home');

    const handleNavigate = useCallback((page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'auto' });
    }, []);

    if (currentPage === 'about') return <div className="page-enter"><AboutPage onNavigate={handleNavigate} /></div>;
    if (currentPage === 'contact') return <div className="page-enter"><ContactPage onNavigate={handleNavigate} /></div>;
    if (currentPage === 'gallery') return <div className="page-enter"><GalleryPage onNavigate={handleNavigate} /></div>;
    if (currentPage === 'packages') return <div className="page-enter"><PackagesPage onNavigate={handleNavigate} /></div>;

    return (
        <div className="min-h-screen bg-[#F8F6F1] font-sans overflow-x-hidden selection:bg-[#FF7200] selection:text-white page-enter">
            <Header onNavigate={handleNavigate} active="home" />
            <main>
                <Hero />
                <Stats />
                <Destinations onNavigate={handleNavigate} />
                <PhotoMarquee onNavigate={handleNavigate} />
                <PackagesPreview onNavigate={handleNavigate} />
                <Seasons />
                <WhyChooseUs />
                <SpecialExperiences />
                <TravelTip />
                <Testimonials />
                <ContactCTA onNavigate={handleNavigate} />
            </main>
            <Footer onNavigate={handleNavigate} />
            <FloatingWhatsApp />
            <ScrollToTop />
        </div>
    );
}
