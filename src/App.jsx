import React, { useState, useEffect, useRef, useCallback } from 'react';
import AboutPage from './About.jsx';
import ContactPage from './Contact.jsx';
import GalleryPage from './Gallery.jsx';
import PackagesPage from './Packages.jsx';

import {
    MapPin, Star, Phone, Mail, Clock, Heart, MessageCircle, Menu, X,
    ChevronDown, CheckCircle2, Shield, Headset, Plane, Compass, Mountain, Gift, Users, ChevronLeft, ChevronRight
} from 'lucide-react';

const typography = { heading: 'font-serif tracking-tight', body: 'font-sans' };
const WHATSAPP = 'https://wa.me/917827743041';
const CALL = 'tel:+919103599174';

/* ========== REVEAL WRAPPER ========== */
const Reveal = ({ children, className = '', delay = 0, direction = 'up' }) => {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
            { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    const dirClass = {
        up: 'opacity-0 translate-y-12',
        down: 'opacity-0 -translate-y-12',
        left: 'opacity-0 -translate-x-12',
        right: 'opacity-0 translate-x-12',
        scale: 'opacity-0 scale-95'
    }[direction];

    return (
        <div ref={ref} className={`${dirClass} ${visible ? '!opacity-100 !translate-x-0 !translate-y-0 !scale-100' : ''} transition-all duration-700 ease-out ${className}`}
             style={{ transitionDuration: '800ms', transitionDelay: `${delay}ms` }}>
            {children}
        </div>
    );
};

/* ========== ANIMATED COUNTER ========== */
const AnimCounter = ({ end, suffix = '', duration = 2000 }) => {
    const ref = useRef(null);
    const countRef = useRef(null);
    const animated = useRef(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting && !animated.current) {
                animated.current = true;
                const start = performance.now();
                const step = (now) => {
                    const progress = Math.min((now - start) / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    if (countRef.current) countRef.current.textContent = Math.floor(eased * end);
                    if (progress < 1) requestAnimationFrame(step);
                };
                requestAnimationFrame(step);
            }
        }, { threshold: 0.5 });
        obs.observe(el);
        return () => obs.disconnect();
    }, [end, duration]);

    return <span ref={ref}><span ref={countRef}>0</span>{suffix}</span>;
};

/* ========== HEADER ========== */
const Header = ({ onNavigate }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const h = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', h, { passive: true });
        return () => window.removeEventListener('scroll', h);
    }, []);

    return (
        <>
            <div className="bg-[#071B3A] text-white py-2 px-4 md:px-8 text-xs font-medium flex justify-between items-center hidden md:flex">
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
                        {['Home', 'Packages', 'Gallery', 'About Us'].map((link, i) => (
                            <a key={link} href="#"
                               onClick={(e) => { e.preventDefault(); if (link === 'Home') onNavigate('home'); else if (link === 'Packages') onNavigate('packages'); else if (link === 'Gallery') onNavigate('gallery'); else if (link === 'About Us') onNavigate('about'); }}
                               className={`text-sm font-medium hover:text-[#FF7200] transition-colors relative py-2 group ${link === 'Home' ? 'text-[#FF7200]' : 'text-[#071B3A]'}`}>
                                {link}
                                <span className={`absolute bottom-0 left-0 h-0.5 bg-[#FF7200] transition-all duration-500 group-hover:w-full ${link === 'Home' ? 'w-full' : 'w-0'}`}></span>
                            </a>
                        ))}
                    </nav>
                    <div className="hidden lg:flex items-center gap-4">
                        <a href={CALL} className="btn-shine inline-flex items-center justify-center px-4 py-2 rounded-[10px] font-semibold transition-all duration-300 text-sm bg-white text-[#071B3A] border border-[#071B3A] hover:bg-[#071B3A] hover:text-white">Call Us</a>
                        <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn-shine inline-flex items-center justify-center px-5 py-2 rounded-[10px] font-semibold transition-all duration-300 text-sm bg-[#25D366] text-white hover:bg-[#1ebe57] hover:shadow-lg hover:shadow-[#25D366]/30 hover:-translate-y-0.5">WhatsApp</a>
                    </div>
                    <button className="lg:hidden text-[#071B3A] z-50 p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X size={28} className="text-white" /> : <Menu size={28} />}
                    </button>
                </div>
                {/* Mobile Menu */}
                <div className={`fixed inset-0 bg-[#071B3A]/98 backdrop-blur-lg z-40 flex flex-col pt-24 px-8 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${mobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
                    <nav className="flex flex-col gap-8 overflow-y-auto pb-6">
                        {['Home', 'Packages', 'Gallery', 'About Us'].map((link, i) => (
                            <a key={link} href="#"
                               onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); if (link === 'Home') onNavigate('home'); else if (link === 'Packages') onNavigate('packages'); else if (link === 'Gallery') onNavigate('gallery'); else if (link === 'About Us') onNavigate('about'); }}
                               className={`text-3xl font-serif text-white hover:text-[#FF7200] transition-all duration-300 transform ${mobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}
                               style={{ transitionDelay: mobileMenuOpen ? `${200 + i * 80}ms` : '0ms' }}>
                                {link}
                            </a>
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

/* ========== HERO ========== */
const Hero = () => {
    const [loaded, setLoaded] = useState(false);
    useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

    return (
        <section className="relative bg-[#071B3A] overflow-hidden min-h-[90vh] md:min-h-[85vh] flex items-center">
            {/* Animated background particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-2 h-2 bg-[#FF7200]/30 rounded-full animate-float"></div>
                <div className="absolute top-40 right-20 w-3 h-3 bg-[#FF7200]/20 rounded-full animate-float" style={{animationDelay:'1s'}}></div>
                <div className="absolute bottom-40 left-1/4 w-2 h-2 bg-white/10 rounded-full animate-float" style={{animationDelay:'2s'}}></div>
                <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-[#FF7200]/40 rounded-full animate-float" style={{animationDelay:'1.5s'}}></div>
            </div>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#071B3A] via-[#0a2248] to-[#071B3A]"></div>

            {/* Subtle grid pattern */}
            <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px'}}></div>

            {/* Flight path SVG */}
            <svg className="absolute top-1/4 left-0 w-full h-48 pointer-events-none opacity-20" preserveAspectRatio="none">
                <path d="M-100,80 Q200,20 500,60 T1200,40" fill="none" stroke="#FF7200" strokeWidth="2" strokeDasharray="8,8" className="animate-[dash_20s_linear_infinite]" />
                <Plane className="text-[#FF7200] absolute" size={20} style={{top:'30px', left:'60%', animation:'float 4s ease-in-out infinite'}} />
            </svg>

            <div className="max-w-[1380px] mx-auto px-4 md:px-8 relative z-10 w-full py-20 md:py-0">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                    {/* Left Content */}
                    <div className="w-full lg:w-1/2 text-center lg:text-left">
                        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-[#FF7200] text-sm font-semibold mb-6 border border-white/10 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                            <Plane size={16} className="animate-float" /> KASHMIR TOURISM
                        </div>
                        <h1 className={`${typography.heading} text-4xl sm:text-5xl md:text-6xl lg:text-[72px] text-white leading-[1.08] mb-6 font-bold`}>
                            <span className={`block transition-all duration-700 delay-100 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>Discover</span>
                            <span className={`block transition-all duration-700 delay-200 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>Paradise in</span>
                            <span className={`block text-[#FF7200] relative italic transition-all duration-700 delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                                Kashmir
                                <svg className="absolute w-full h-3 -bottom-1 left-0 text-[#FF7200]" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <path d="M0,8 Q50,0 100,8" fill="none" stroke="currentColor" strokeWidth="3" className="animate-[dash_2s_ease_forwards]" strokeDasharray="200" strokeDashoffset="200" />
                                </svg>
                            </span>
                        </h1>
                        <p className={`text-gray-300 text-lg md:text-xl mb-10 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed transition-all duration-700 delay-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                            Your trusted local partner for unforgettable Kashmir experiences. We've been sharing the beauty of our homeland with travelers for over 15 years.
                        </p>
                        <div className={`flex flex-col sm:flex-row gap-4 justify-center lg:justify-start transition-all duration-700 delay-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn-shine inline-flex items-center justify-center px-8 py-4 rounded-[10px] font-semibold text-base bg-[#25D366] text-white hover:bg-[#1ebe57] hover:shadow-xl hover:shadow-[#25D366]/30 hover:-translate-y-1 transition-all duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="mr-2"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                                Plan Your Kashmir Trip
                            </a>
                            <a href={CALL} className="btn-shine inline-flex items-center justify-center px-8 py-4 rounded-[10px] font-semibold text-base bg-transparent text-white border-2 border-white/30 hover:border-white hover:bg-white/10 transition-all duration-300">
                                Call an Expert
                            </a>
                        </div>
                    </div>

                    {/* Right - Image Frame */}
                    <div className={`w-full lg:w-1/2 relative transition-all duration-1000 delay-300 ${loaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
                        <div className="relative w-full max-w-[480px] mx-auto aspect-[4/5]">
                            {/* Decorative ring */}
                            <div className="absolute -inset-4 rounded-[50px] border-2 border-dashed border-[#FF7200]/20 animate-spin-slow"></div>
                            {/* Main frame */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#FF7200]/20 to-[#071B3A] rounded-[44px] p-3">
                                <div className="w-full h-full rounded-[38px] overflow-hidden relative shadow-2xl">
                                    <img src="https://images.unsplash.com/photo-1597074866923-dc0589150e65?auto=format&fit=crop&q=80&w=800" alt="Kashmir Dal Lake" className="w-full h-full object-cover" loading="eager" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#071B3A]/40 to-transparent"></div>
                                    {/* Floating badge */}
                                    <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 animate-float">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-[#FF7200] rounded-full flex items-center justify-center"><MapPin size={18} className="text-white" /></div>
                                            <div>
                                                <p className="text-white font-bold text-sm">Dal Lake, Srinagar</p>
                                                <p className="text-white/60 text-xs">Heart of Kashmir</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Floating decorative elements */}
                            <div className="absolute -top-6 -right-6 w-16 h-16 bg-[#FF7200]/20 rounded-full blur-xl animate-float" style={{animationDelay:'1s'}}></div>
                            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-[#25D366]/20 rounded-full blur-lg animate-float" style={{animationDelay:'2s'}}></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

/* ========== STATS ========== */
const Stats = () => {
    const stats = [
        { num: 500, suffix: '+', label: 'Happy Families', icon: <Users size={24} /> },
        { num: 15, suffix: '+', label: 'Years Experience', icon: <Clock size={24} /> },
        { num: 24, suffix: '/7', label: 'Trip Support', icon: <Headset size={24} /> },
        { num: 50, suffix: '+', label: 'Destinations', icon: <MapPin size={24} /> }
    ];
    return (
        <section className="bg-white py-14 md:py-16 border-b border-[#F2F4F7]">
            <div className="max-w-[1380px] mx-auto px-4 md:px-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {stats.map((item, i) => (
                        <Reveal key={i} delay={i * 100}>
                            <div className="text-center group">
                                <div className="w-14 h-14 mx-auto bg-[#FF7200]/10 text-[#FF7200] rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#FF7200] group-hover:text-white group-hover:rotate-6 transition-all duration-500 group-hover:scale-110">
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

/* ========== DESTINATIONS ========== */
const Destinations = ({ onNavigate }) => {
    const destinations = [
        { name: 'Srinagar', desc: 'The Heart of Kashmir', img: 'https://images.unsplash.com/photo-1597074866923-dc0589150e65?auto=format&fit=crop&q=80&w=800' },
        { name: 'Pahalgam', desc: 'Valley of Shepherds', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=800' },
        { name: 'Gulmarg', desc: 'Meadow of Flowers', img: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&q=80&w=800' },
        { name: 'Sonmarg', desc: 'Meadow of Gold', img: 'https://images.unsplash.com/photo-1605649487212-4d4ce3e015ac?auto=format&fit=crop&q=80&w=800' }
    ];
    return (
        <section className="py-20 md:py-28 bg-[#F8F6F1]">
            <div className="max-w-[1380px] mx-auto px-4 md:px-8">
                <Reveal>
                    <div className="text-center mb-14">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#FF7200] text-sm font-semibold mb-4 border border-[#FF7200]/20 shadow-sm">
                            <MapPin size={16} /> DESTINATIONS
                        </div>
                        <h2 className={`${typography.heading} text-3xl md:text-5xl font-bold text-[#071B3A] mb-4`}>Explore Kashmir</h2>
                        <p className="text-[#687386] text-lg max-w-2xl mx-auto">From serene lakes to snow-capped peaks, discover the breathtaking beauty of Kashmir's most iconic destinations</p>
                    </div>
                </Reveal>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {destinations.map((dest, i) => (
                        <Reveal key={i} delay={i * 120}>
                            <div className="group cursor-pointer rounded-2xl overflow-hidden bg-white shadow-sm card-lift border border-[#F2F4F7]">
                                <div className="h-64 relative overflow-hidden img-zoom">
                                    <img src={dest.img} alt={dest.name} className="w-full h-full object-cover" loading="lazy" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#071B3A]/80 via-[#071B3A]/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                                    <div className="absolute bottom-4 left-4 text-white transform transition-all duration-500 group-hover:translate-y-0 translate-y-2">
                                        <h3 className={`${typography.heading} text-2xl font-bold mb-1`}>{dest.name}</h3>
                                        <p className="text-white/80 text-sm font-medium flex items-center gap-1"><MapPin size={12} /> {dest.desc}</p>
                                    </div>
                                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"><ChevronRight size={18} className="text-white" /></div>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

/* ========== PACKAGES PREVIEW ========== */
const PackagesPreview = ({ onNavigate }) => {
    const pkgs = [
        { id: 1, title: 'Kashmir Tour', duration: '3N / 4D', price: '₹ 8,800', img: 'https://images.unsplash.com/photo-1597074866923-dc0589150e65?auto=format&fit=crop&q=80&w=800' },
        { id: 2, title: 'Family Kashmir Package', duration: '4N / 5D', price: '₹ 10,300', img: 'https://images.unsplash.com/photo-1626507421379-37f07823b123?auto=format&fit=crop&q=80&w=800' },
        { id: 3, title: 'Kashmir Trip', duration: '5N / 6D', price: '₹ 12,800', img: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&q=80&w=800' },
        { id: 4, title: 'Summer Kashmir', duration: '6N / 7D', price: '₹ 14,200', tag: 'Peak Season', img: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&q=80&w=800' },
        { id: 5, title: 'Kashmir Holiday', duration: '6N / 7D', price: '₹ 14,200', img: 'https://images.unsplash.com/photo-1605649487212-4d4ce3e015ac?auto=format&fit=crop&q=80&w=800' },
        { id: 6, title: 'Trip to Kashmir', duration: '7N / 8D', price: '₹ 16,200', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=800' },
    ];

    return (
        <section className="py-20 md:py-28 bg-white">
            <div className="max-w-[1380px] mx-auto px-4 md:px-8">
                <Reveal>
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F8F6F1] text-[#FF7200] text-sm font-semibold mb-4 border border-[#FF7200]/20">
                            <Plane size={16} /> PACKAGES
                        </div>
                        <h2 className={`${typography.heading} text-3xl md:text-5xl font-bold text-[#071B3A] mb-4`}>Discover Kashmir</h2>
                        <p className="text-[#687386] text-lg max-w-2xl mx-auto">Carefully curated tour packages designed to give you the ultimate Kashmir experience</p>
                    </div>
                </Reveal>

                {/* Trust badges */}
                <Reveal delay={100}>
                    <div className="flex flex-wrap items-center gap-3 justify-center mb-14">
                        {[
                            { icon: <Shield size={16} />, text: 'No hidden charges' },
                            { icon: <Plane size={16} />, text: 'Free airport pickup' },
                            { icon: <MapPin size={16} />, text: 'Customizable itinerary' },
                            { icon: <CheckCircle2 size={16} />, text: 'Pay 30% to confirm' }
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-2 px-4 py-2.5 bg-[#F8F6F1] rounded-full text-sm font-medium text-[#071B3A] border border-transparent hover:border-[#FF7200]/30 hover:bg-[#FF7200]/5 transition-all duration-300">
                                <span className="text-[#FF7200]">{item.icon}</span> {item.text}
                            </div>
                        ))}
                    </div>
                </Reveal>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-14">
                    {pkgs.map((pkg, i) => (
                        <Reveal key={pkg.id} delay={i * 100}>
                            <div className="bg-white rounded-2xl overflow-hidden shadow-sm card-lift border border-[#F2F4F7] group flex flex-col h-full">
                                <div className="relative h-56 overflow-hidden img-zoom">
                                    <img src={pkg.img} alt={pkg.title} className="w-full h-full object-cover" loading="lazy" />
                                    {pkg.tag && <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#FF7200] text-white text-[10px] font-bold uppercase animate-pulse-glow">{pkg.tag}</div>}
                                    <div className="absolute bottom-3 right-3 bg-[#071B3A]/80 backdrop-blur-sm px-3 py-1.5 rounded-lg text-white">
                                        <span className="text-[10px] text-gray-300 block">From</span>
                                        <span className="text-lg font-bold">{pkg.price}</span>
                                    </div>
                                </div>
                                <div className="p-5 flex flex-col flex-1">
                                    <span className="text-[#687386] text-xs mb-2 flex items-center gap-1"><Clock size={12} /> {pkg.duration}</span>
                                    <h3 className="font-bold text-[#071B3A] text-lg mb-3 group-hover:text-[#FF7200] transition-colors">{pkg.title}</h3>
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
                        <button onClick={() => onNavigate('packages')} className="btn-shine inline-flex items-center justify-center px-8 py-4 rounded-[10px] font-semibold text-base bg-[#071B3A] text-white hover:bg-[#05132A] hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            View All Packages <ChevronRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </Reveal>
            </div>
        </section>
    );
};

/* ========== WHY CHOOSE US ========== */
const WhyChooseUs = () => {
    const reasons = [
        { title: 'Local Expertise', desc: 'Born and raised in Kashmir, we know every hidden gem and secret spot.', icon: <Compass size={28} /> },
        { title: 'Safe & Reliable', desc: 'Your safety is our priority with verified guides and secure transportation.', icon: <Shield size={28} /> },
        { title: 'Personalized Care', desc: 'Every trip is customized to match your preferences and dreams.', icon: <Heart size={28} /> },
        { title: 'Exclusive Access', desc: 'Visit places tourists rarely see with our insider connections.', icon: <MapPin size={28} /> },
        { title: '24/7 Support', desc: 'Round-the-clock assistance throughout your Kashmir journey.', icon: <Headset size={28} /> },
        { title: 'Best Value', desc: 'Premium experiences at competitive prices with no hidden costs.', icon: <CheckCircle2 size={28} /> }
    ];
    return (
        <section className="py-20 md:py-28 bg-[#071B3A] relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-[#FF7200]/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FF7200]/5 rounded-full blur-3xl"></div>

            <div className="max-w-[1380px] mx-auto px-4 md:px-8 relative z-10">
                <Reveal>
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-[#FF7200] text-sm font-semibold mb-4 border border-white/10">
                            <Shield size={16} /> WHY CHOOSE US
                        </div>
                        <h2 className={`${typography.heading} text-3xl md:text-5xl font-bold text-white mb-4`}>Why Travelers Choose The Indian Wings</h2>
                    </div>
                </Reveal>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {reasons.map((item, i) => (
                        <Reveal key={i} delay={i * 100}>
                            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 hover:border-[#FF7200]/30 transition-all duration-500 group cursor-default">
                                <div className="w-14 h-14 bg-[#FF7200]/20 text-[#FF7200] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#FF7200] group-hover:text-white group-hover:rotate-6 group-hover:scale-110 transition-all duration-500">
                                    {item.icon}
                                </div>
                                <h3 className="font-bold text-white text-lg mb-3 group-hover:text-[#FF7200] transition-colors">{item.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

/* ========== SPECIAL EXPERIENCES ========== */
const SpecialExperiences = ({ onNavigate }) => (
    <section className="py-20 md:py-28 bg-[#F8F6F1]">
        <div className="max-w-[1380px] mx-auto px-4 md:px-8">
            <Reveal>
                <div className="text-center mb-14">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#FF7200] text-sm font-semibold mb-4 border border-[#FF7200]/20 shadow-sm">
                        <Gift size={16} /> SPECIAL EXPERIENCES
                    </div>
                    <h2 className={`${typography.heading} text-3xl md:text-5xl font-bold text-[#071B3A] mb-4`}>Curated For You</h2>
                    <p className="text-[#687386] text-lg max-w-2xl mx-auto">Unique packages designed for special moments and unforgettable memories</p>
                </div>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                    {
                        title: 'Honeymoon Special', tag: '🌸 Spring Romance Edition',
                        img: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&q=80&w=800',
                        desc: 'Begin your journey of love amidst beautiful valleys, serene lakes, and cozy wooden cottages.',
                        features: ['Private Shikara Ride', 'Candlelight Dinner', 'Couple Spa Session', 'Premium Houseboat', 'Photography Session', 'Flower Decorated Room'],
                        cta: 'Plan Your Honeymoon'
                    },
                    {
                        title: 'Ladies Special Festival', tag: '🌸 Women-Only Adventure',
                        img: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=800',
                        desc: "An exclusive Kashmir experience designed for women. Explore Kashmir's beauty in a safe and empowering environment.",
                        features: ['Women-only Group', 'Female Tour Guides', 'Safe Accommodations', 'Flexible Itineraries', 'Wellness Activities', 'Group Bonding'],
                        cta: 'Join the Festival'
                    }
                ].map((exp, i) => (
                    <Reveal key={i} delay={i * 150}>
                        <div className="bg-white rounded-2xl overflow-hidden shadow-sm card-lift border border-[#F2F4F7] group">
                            <div className="relative h-64 overflow-hidden img-zoom">
                                <img src={exp.img} alt={exp.title} className="w-full h-full object-cover" loading="lazy" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#071B3A]/80 to-transparent"></div>
                                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#FF7200] text-white text-xs font-bold animate-pulse-glow">{exp.tag}</div>
                            </div>
                            <div className="p-8">
                                <h3 className={`${typography.heading} text-2xl font-bold text-[#071B3A] mb-3 group-hover:text-[#FF7200] transition-colors`}>{exp.title}</h3>
                                <p className="text-[#687386] text-sm mb-6 leading-relaxed">{exp.desc}</p>
                                <div className="grid grid-cols-2 gap-3 mb-6">
                                    {exp.features.map((f, j) => (
                                        <div key={j} className="flex items-center gap-2 text-xs text-[#071B3A]"><CheckCircle2 size={12} className="text-[#FF7200] shrink-0" /> {f}</div>
                                    ))}
                                </div>
                                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn-shine inline-flex items-center justify-center px-6 py-3 rounded-[10px] font-semibold text-sm bg-[#FF7200] text-white hover:bg-[#E66600] transition-all duration-300 w-full hover:shadow-lg hover:shadow-[#FF7200]/20">{exp.cta}</a>
                            </div>
                        </div>
                    </Reveal>
                ))}
            </div>
        </div>
    </section>
);

/* ========== TRAVEL TIP MARQUEE ========== */
const TravelTip = () => (
    <section className="py-4 bg-[#FF7200] overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex items-center">
            {Array(3).fill(null).map((_, i) => (
                <span key={i} className="inline-flex items-center gap-8 mx-8 text-white font-semibold text-sm">
                    <span>✈ Best time to visit Kashmir: March–October</span>
                    <span>•</span>
                    <span>Free airport pickup with all packages</span>
                    <span>•</span>
                    <span>Srinagar Airport (SXR) - Direct flights from Delhi, Mumbai, Bangalore</span>
                    <span>•</span>
                    <span>Call: +91 91035 99174</span>
                    <span>•</span>
                </span>
            ))}
        </div>
    </section>
);

/* ========== TESTIMONIALS ========== */
const Testimonials = () => {
    const reviews = [
        { name: 'Neha & Amit', trip: 'Kashmir Honeymoon', text: 'Our Kashmir honeymoon was absolutely magical. The team planned every detail perfectly — from the houseboat stay to the Shikara ride at sunset.', rating: 5 },
        { name: 'Rajesh Sharma', trip: 'Family Kashmir Tour', text: 'Best travel experience ever! Our kids loved every moment. The local guides were fantastic and the hotels were top-notch.', rating: 5 },
        { name: 'Meera Iyer', trip: 'Gulmarg Adventure', text: 'The gondola ride, the snow activities, the meadows — everything was perfectly organized. Highly recommend The Indian Wings!', rating: 5 }
    ];
    const scrollRef = useRef(null);
    const scroll = (dir) => {
        if (scrollRef.current) scrollRef.current.scrollBy({ left: dir * 350, behavior: 'smooth' });
    };
    return (
        <section className="py-20 md:py-28 bg-white overflow-hidden">
            <div className="max-w-[1380px] mx-auto px-4 md:px-8">
                <Reveal>
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F8F6F1] text-[#FF7200] text-sm font-semibold mb-4 border border-[#FF7200]/20">
                                <Star size={16} /> TESTIMONIALS
                            </div>
                            <h2 className={`${typography.heading} text-3xl md:text-5xl font-bold text-[#071B3A]`}>What Our Travelers Say</h2>
                        </div>
                        <div className="hidden md:flex gap-3">
                            <button onClick={() => scroll(-1)} className="w-12 h-12 rounded-full border border-[#DDE2E8] flex items-center justify-center text-[#071B3A] hover:bg-[#FF7200] hover:text-white hover:border-[#FF7200] transition-all duration-300 hover:scale-110"><ChevronLeft size={20} /></button>
                            <button onClick={() => scroll(1)} className="w-12 h-12 rounded-full border border-[#DDE2E8] flex items-center justify-center text-[#071B3A] hover:bg-[#FF7200] hover:text-white hover:border-[#FF7200] transition-all duration-300 hover:scale-110"><ChevronRight size={20} /></button>
                        </div>
                    </div>
                </Reveal>
                <div ref={scrollRef} className="flex overflow-x-auto gap-6 hide-scrollbar snap-x snap-mandatory pb-4">
                    {reviews.map((review, i) => (
                        <Reveal key={i} delay={i * 120}>
                            <div className="min-w-[320px] md:min-w-[380px] snap-start bg-[#F8F6F1] p-8 rounded-2xl border border-[#F2F4F7] card-lift">
                                <div className="flex text-[#FF7200] mb-4">
                                    {[...Array(review.rating)].map((_, j) => <Star key={j} size={16} fill="currentColor" className="animate-[scale-in_0.3s_ease_forwards]" style={{animationDelay:`${j*0.1}s`}} />)}
                                </div>
                                <p className="text-[#071B3A] text-sm md:text-base italic mb-8 font-serif leading-relaxed">"{review.text}"</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-[#071B3A] text-white flex items-center justify-center font-bold text-lg font-serif">{review.name.charAt(0)}</div>
                                    <div>
                                        <h4 className="font-bold text-[#071B3A] text-sm">{review.name}</h4>
                                        <p className="text-[#687386] text-xs">{review.trip}</p>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

/* ========== CTA ========== */
const ContactCTA = ({ onNavigate }) => (
    <section className="py-20 md:py-28 bg-gradient-to-br from-[#071B3A] via-[#0a2248] to-[#071B3A] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage:'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize:'30px 30px'}}></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#FF7200]/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-[#25D366]/10 rounded-full blur-3xl animate-float" style={{animationDelay:'2s'}}></div>
        <div className="max-w-[800px] mx-auto text-center px-4 relative z-10">
            <Reveal>
                <h2 className={`${typography.heading} text-3xl md:text-5xl font-bold text-white mb-6`}>Ready to Explore Kashmir?</h2>
                <p className="text-gray-300 text-lg mb-10 font-light">Contact us today and let us plan your perfect Kashmir trip.</p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn-shine inline-flex items-center justify-center px-8 py-4 rounded-[10px] font-semibold text-base bg-[#25D366] text-white hover:bg-[#1ebe57] hover:shadow-xl hover:shadow-[#25D366]/30 hover:-translate-y-1 transition-all duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="mr-2"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                        WhatsApp Us
                    </a>
                    <button onClick={() => onNavigate('contact')} className="btn-shine inline-flex items-center justify-center px-8 py-4 rounded-[10px] font-semibold text-base bg-transparent text-white border-2 border-white/30 hover:border-white hover:bg-white/10 transition-all duration-300">
                        Contact Us
                    </button>
                </div>
            </Reveal>
        </div>
    </section>
);

/* ========== FOOTER ========== */
const Footer = ({ onNavigate }) => (
    <footer className="bg-[#05132A] text-white pt-20 pb-10 border-t border-white/10">
        <div className="max-w-[1380px] mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                <div className="lg:col-span-2">
                    <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="flex items-center gap-2 mb-6 group">
                        <img src="/logo.webp" alt="The Indian Wings" className="h-12 w-auto transition-transform duration-300 group-hover:scale-105" />
                    </a>
                    <p className="text-gray-400 mb-6 max-w-sm font-light leading-relaxed">Your trusted local partner for unforgettable Kashmir experiences. We've been sharing the beauty of our homeland with travelers for over 15 years.</p>
                    <div className="space-y-3 text-sm">
                        <a href={CALL} className="flex items-center gap-3 text-gray-400 hover:text-[#FF7200] transition-colors group"><div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-[#FF7200]/20 transition-colors"><Phone size={14} className="text-[#FF7200]" /></div> +91 91035 99174</a>
                        <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-[#FF7200] transition-colors group"><div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-[#FF7200]/20 transition-colors"><MessageCircle size={14} className="text-[#FF7200]" /></div> +91 78277 43041</a>
                        <a href="mailto:Kashmirtravels517@gmail.com" className="flex items-center gap-3 text-gray-400 hover:text-[#FF7200] transition-colors group"><div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-[#FF7200]/20 transition-colors"><Mail size={14} className="text-[#FF7200]" /></div> Kashmirtravels517@gmail.com</a>
                        <p className="flex items-start gap-3 text-gray-400"><div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center shrink-0"><MapPin size={14} className="text-[#FF7200]" /></div> Sheikh Palace, 2nd Floor, Kanyar Chowk, Srinagar</p>
                    </div>
                </div>
                <div>
                    <h4 className="font-bold mb-6 text-lg tracking-wide">Destinations</h4>
                    <ul className="space-y-3 text-gray-400 text-sm">
                        {['Srinagar', 'Pahalgam', 'Gulmarg', 'Sonmarg'].map(item => (
                            <li key={item}><a href="#" className="hover:text-[#FF7200] transition-colors hover:translate-x-1 inline-block">{item}</a></li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold mb-6 text-lg tracking-wide">Quick Links</h4>
                    <ul className="space-y-3 text-gray-400 text-sm">
                        {['Home', 'Packages', 'Gallery', 'About Us', 'Contact Us'].map(item => (
                            <li key={item}><a href="#" onClick={(e) => { e.preventDefault(); if (item === 'Home') onNavigate('home'); else if (item === 'Packages') onNavigate('packages'); else if (item === 'Gallery') onNavigate('gallery'); else if (item === 'About Us') onNavigate('about'); else if (item === 'Contact Us') onNavigate('contact'); }} className="hover:text-[#FF7200] transition-colors hover:translate-x-1 inline-block">{item}</a></li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="border-t border-white/10 pt-8 text-center">
                <p className="text-gray-500 text-sm">© 2026 The Indian Wings. All Rights Reserved.</p>
            </div>
        </div>
    </footer>
);

/* ========== FLOATING WHATSAPP ========== */
const FloatingWhatsApp = () => (
    <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-50 group">
        <div className="w-14 h-14 md:w-16 md:h-16 bg-[#25D366] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all duration-300 animate-whatsapp-pulse">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        </div>
        <div className="absolute right-full bottom-1/2 translate-y-1/2 mr-4 bg-white text-[#071B3A] px-4 py-2 rounded-lg shadow-lg font-semibold text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none border border-[#F2F4F7] transform scale-95 group-hover:scale-100">
            Chat on WhatsApp
        </div>
    </a>
);

/* ========== SCROLL TO TOP ========== */
const ScrollToTop = () => {
    const [show, setShow] = useState(false);
    useEffect(() => {
        const h = () => setShow(window.scrollY > 400);
        window.addEventListener('scroll', h, { passive: true });
        return () => window.removeEventListener('scroll', h);
    }, []);
    return show ? (
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 left-6 z-50 w-12 h-12 bg-[#071B3A] text-white rounded-full shadow-xl flex items-center justify-center hover:bg-[#FF7200] transition-all duration-300 hover:scale-110 animate-fade-in">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
        </button>
    ) : null;
};

/* ========== APP ========== */
export default function App() {
    const [currentPage, setCurrentPage] = useState('home');

    const handleNavigate = useCallback((page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    if (currentPage === 'about') return <div className="page-enter"><AboutPage onNavigate={handleNavigate} /></div>;
    if (currentPage === 'contact') return <div className="page-enter"><ContactPage onNavigate={handleNavigate} /></div>;
    if (currentPage === 'gallery') return <div className="page-enter"><GalleryPage onNavigate={handleNavigate} /></div>;
    if (currentPage === 'packages') return <div className="page-enter"><PackagesPage onNavigate={handleNavigate} /></div>;

    return (
        <div className="min-h-screen bg-[#F8F6F1] font-sans overflow-x-hidden selection:bg-[#FF7200] selection:text-white page-enter">
            <Header onNavigate={handleNavigate} />
            <main>
                <Hero />
                <Stats />
                <Destinations onNavigate={handleNavigate} />
                <PackagesPreview onNavigate={handleNavigate} />
                <WhyChooseUs />
                <SpecialExperiences onNavigate={handleNavigate} />
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
