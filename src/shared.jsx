import { useState, useEffect, useRef } from 'react';
import { Phone, Headset, Menu, X, MapPin, Mail, MessageCircle } from 'lucide-react';
import { MARQUEE_IMAGES } from './images.js';

/* link label → route key */
const toKey = (link) => ({ Home: 'home', Packages: 'packages', Gallery: 'gallery', 'About Us': 'about' }[link]);

export const WHATSAPP = 'https://wa.me/917827743041';
export const CALL = 'tel:+919103599174';
export const EMAIL = 'mailto:Kashmirtravels517@gmail.com';
export const OFFICIAL_LOGO = 'https://goahotelpackages.in/landing/assets/logo-ijORuPj_.png';

export const Logo = ({ className, ...props }) => (
    <img src={OFFICIAL_LOGO} onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = '/logo.webp'; }} alt="The Indian Wings" className={className} {...props} />
);

/* ============ WhatsApp glyph ============ */
export const WhatsAppGlyph = ({ size = 18, className = '' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
);

/* ============ Scroll reveal wrapper ============ */
export const Reveal = ({ children, className = '', delay = 0, direction = 'up' }) => {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
            { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    const dirClass = {
        up: 'opacity-0 translate-y-12',
        down: 'opacity-0 -translate-y-12',
        left: 'opacity-0 -translate-x-14',
        right: 'opacity-0 translate-x-14',
        scale: 'opacity-0 scale-95',
        blur: 'opacity-0 blur-sm translate-y-8',
    }[direction];

    return (
        <div
            ref={ref}
            className={`${dirClass} ${visible ? '!opacity-100 !translate-x-0 !translate-y-0 !scale-100 !blur-none' : ''} transition-all ease-[cubic-bezier(0.16,1,0.3,1)] ${className}`}
            style={{ transitionDuration: '800ms', transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

/* ============ Animated counter ============ */
export const AnimCounter = ({ end, suffix = '', duration = 2000 }) => {
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

/* ============ Image with fade-in on load ============ */
export const FadeImg = ({ src, alt, className = '', ...rest }) => {
    const [loaded, setLoaded] = useState(false);
    return (
        <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            onLoad={() => setLoaded(true)}
            className={`transition-all duration-700 ease-out ${loaded ? 'opacity-100 blur-none scale-100' : 'opacity-0 blur-md scale-105'} ${className}`}
            {...rest}
        />
    );
};

/* ============ Section badge pill ============ */
export const SectionBadge = ({ icon, children, dark = false }) => (
    <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-4 border ${dark ? 'bg-white/10 text-[#FF7200] border-white/15' : 'bg-white text-[#FF7200] border-[#FF7200]/20 shadow-sm'}`}>
        {icon} {children}
    </div>
);

/* ============ Header ============ */
const NAV_LINKS = ['Home', 'Packages', 'Gallery', 'About Us'];

export const Header = ({ onNavigate, active = '' }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const h = () => setIsScrolled(window.scrollY > 24);
        window.addEventListener('scroll', h, { passive: true });
        return () => window.removeEventListener('scroll', h);
    }, []);

    useEffect(() => {
        document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [mobileMenuOpen]);

    const go = (link) => {
        setMobileMenuOpen(false);
        if (link === 'Home') onNavigate('home');
        else if (link === 'Packages') onNavigate('packages');
        else if (link === 'Gallery') onNavigate('gallery');
        else if (link === 'About Us') onNavigate('about');
    };

    return (
        <>
            {/* Top bar */}
            <div className="bg-[#071B3A] text-white py-2 px-4 md:px-8 text-xs font-medium flex justify-between items-center hidden md:flex">
                <div className="flex items-center gap-2">
                    <span className="text-[#FF7200] animate-float inline-block">✈</span>
                    Your trusted local partner for unforgettable Kashmir experiences
                </div>
                <div className="flex items-center gap-6">
                    <a href={CALL} className="flex items-center gap-2 hover:text-[#FF7200] transition-colors">
                        <Phone size={14} className="text-[#FF7200]" /> +91 91035 99174
                    </a>
                    <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#FF7200] transition-colors">
                        <Headset size={14} className="text-[#FF7200]" /> WhatsApp Us
                    </a>
                </div>
            </div>

            {/* Main header */}
            <header className={`sticky top-0 z-50 w-full transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-[#071B3A]/5 py-2' : 'bg-white py-3.5 md:py-5 border-b border-gray-100'}`}>
                <div className="max-w-[1380px] mx-auto px-4 md:px-8 flex justify-between items-center">
                    <a href="#" onClick={(e) => { e.preventDefault(); go('Home'); }} className="flex items-center gap-2.5 cursor-pointer z-50 group">
                        <Logo className={`h-11 md:h-13 w-auto transition-all duration-500 group-hover:scale-105 ${isScrolled ? 'md:h-10' : ''}`} />
                    </a>
                    <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
                        {NAV_LINKS.map((link) => (
                            <a key={link} href="#" onClick={(e) => { e.preventDefault(); go(link); }}
                               className={`text-sm font-medium hover:text-[#FF7200] transition-colors relative py-2 group ${active === toKey(link) ? 'text-[#FF7200]' : 'text-[#071B3A]'}`}>
                                {link}
                                <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#FF7200] to-[#FFB347] transition-all duration-500 group-hover:w-full ${active === toKey(link) ? 'w-full' : 'w-0'}`}></span>
                            </a>
                        ))}
                    </nav>
                    <div className="hidden lg:flex items-center gap-4">
                        <a href={CALL} className="btn-shine inline-flex items-center justify-center px-4 py-2 rounded-[10px] font-semibold transition-all duration-300 text-sm bg-white text-[#071B3A] border border-[#071B3A]/15 hover:border-[#071B3A] hover:bg-[#071B3A] hover:text-white">
                            <Phone size={15} className="mr-1.5" /> Call Us
                        </a>
                        <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
                           className="btn-shine inline-flex items-center justify-center px-5 py-2 rounded-[10px] font-semibold transition-all duration-300 text-sm bg-[#25D366] text-white hover:bg-[#1ebe57] hover:shadow-lg hover:shadow-[#25D366]/30 hover:-translate-y-0.5">
                            <WhatsAppGlyph size={15} className="mr-1.5" /> WhatsApp
                        </a>
                    </div>
                    <button className="lg:hidden text-[#071B3A] z-50 p-2" aria-label="Menu" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X size={28} className="text-white" /> : <Menu size={28} />}
                    </button>
                </div>

                {/* Mobile menu */}
                <div className={`fixed inset-0 bg-[#071B3A]/[0.98] backdrop-blur-lg z-40 flex flex-col pt-24 px-8 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${mobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
                    <nav className="flex flex-col gap-7 overflow-y-auto pb-6">
                        {NAV_LINKS.map((link, i) => (
                            <a key={link} href="#" onClick={(e) => { e.preventDefault(); go(link); }}
                               className={`text-3xl font-serif text-white hover:text-[#FF7200] transition-all duration-500 transform flex items-center gap-4 ${mobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}
                               style={{ transitionDelay: mobileMenuOpen ? `${150 + i * 80}ms` : '0ms' }}>
                                <span className="text-[#FF7200] text-sm font-sans">0{i + 1}</span> {link}
                            </a>
                        ))}
                    </nav>
                    <div className="mt-auto pb-12 pt-6 flex flex-col gap-4 border-t border-white/10">
                        <a href={CALL} className="w-full inline-flex items-center justify-center px-6 py-4 rounded-[10px] font-semibold text-sm bg-transparent text-white border border-white/25 hover:bg-white/10 transition-all">Call Us</a>
                        <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="w-full inline-flex items-center justify-center px-6 py-4 rounded-[10px] font-semibold text-sm bg-[#25D366] text-white hover:bg-[#1ebe57] transition-all">WhatsApp</a>
                    </div>
                </div>
            </header>
        </>
    );
};

/* ============ Page hero (sub-pages) ============ */
export const PageHero = ({ badge, icon, title, subtitle, image }) => (
    <section className="relative h-[380px] md:h-[460px] overflow-hidden bg-[#071B3A]">
        <FadeImg src={image} alt={title} loading="eager" className="absolute inset-0 w-full h-full object-cover animate-hero-zoom" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071B3A]/95 via-[#071B3A]/65 to-[#071B3A]/25"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#071B3A]/60 via-transparent to-[#071B3A]/30"></div>
        <div className="grain absolute inset-0 opacity-[0.07] mix-blend-overlay pointer-events-none"></div>
        <div className="absolute inset-0 flex items-center">
            <div className="max-w-[1380px] mx-auto px-4 md:px-8 w-full">
                <Reveal direction="blur">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-[#FF7200] text-sm font-semibold mb-5 border border-white/15 backdrop-blur-sm">
                        {icon} {badge}
                    </div>
                </Reveal>
                <Reveal direction="blur" delay={120}>
                    <h1 className="font-serif tracking-tight text-4xl md:text-6xl text-white font-bold mb-4 leading-[1.1]">{title}</h1>
                </Reveal>
                <Reveal direction="blur" delay={240}>
                    <p className="text-gray-300 text-lg max-w-xl font-light">{subtitle}</p>
                </Reveal>
            </div>
        </div>
    </section>
);

/* ============ Footer ============ */
export const Footer = ({ onNavigate }) => (
    <footer className="bg-[#05132A] text-white pt-20 pb-10 border-t border-white/10 relative overflow-hidden">
        <div className="absolute -top-32 right-0 w-96 h-96 bg-[#FF7200]/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-[1380px] mx-auto px-4 md:px-8 relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">
                <div className="lg:col-span-2">
                    <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="flex items-center gap-2 mb-6 group">
                        <Logo className="h-12 w-auto transition-transform duration-300 group-hover:scale-105" />
                    </a>
                    <p className="text-gray-400 mb-6 max-w-sm font-light leading-relaxed">Your trusted local partner for unforgettable Kashmir experiences. We've been sharing the beauty of our homeland with travelers for over 15 years.</p>
                    <div className="space-y-3 text-sm">
                        <a href={CALL} className="flex items-center gap-3 text-gray-400 hover:text-[#FF7200] transition-colors group"><div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-[#FF7200]/20 transition-colors"><Phone size={14} className="text-[#FF7200]" /></div> +91 91035 99174</a>
                        <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-[#FF7200] transition-colors group"><div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-[#FF7200]/20 transition-colors"><MessageCircle size={14} className="text-[#FF7200]" /></div> +91 78277 43041</a>
                        <a href={EMAIL} className="flex items-center gap-3 text-gray-400 hover:text-[#FF7200] transition-colors group"><div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-[#FF7200]/20 transition-colors"><Mail size={14} className="text-[#FF7200]" /></div> Kashmirtravels517@gmail.com</a>
                        <p className="flex items-start gap-3 text-gray-400"><div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center shrink-0"><MapPin size={14} className="text-[#FF7200]" /></div> Sheikh Palace, 2nd Floor, Kanyar Chowk, Srinagar</p>
                        <a href="/download" className="inline-flex items-center gap-2 text-[#FFB347] hover:text-[#FF7200] transition-colors text-xs font-semibold mt-2">Download project ZIP <span aria-hidden="true">↓</span></a>
                    </div>
                </div>
                <div>
                    <h4 className="font-bold mb-6 text-lg tracking-wide">Destinations</h4>
                    <ul className="space-y-3 text-gray-400 text-sm">
                        {['Srinagar', 'Pahalgam', 'Gulmarg', 'Sonmarg', 'Doodhpathri', 'Aru Valley'].map(item => (
                            <li key={item}><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('gallery'); }} className="hover:text-[#FF7200] transition-colors hover:translate-x-1 inline-block duration-300">{item}</a></li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold mb-6 text-lg tracking-wide">Quick Links</h4>
                    <ul className="space-y-3 text-gray-400 text-sm">
                        {['Home', 'Packages', 'Gallery', 'About Us', 'Contact Us'].map(item => (
                            <li key={item}><a href="#" onClick={(e) => { e.preventDefault(); if (item === 'Home') onNavigate('home'); else if (item === 'Packages') onNavigate('packages'); else if (item === 'Gallery') onNavigate('gallery'); else if (item === 'About Us') onNavigate('about'); else if (item === 'Contact Us') onNavigate('contact'); }} className="hover:text-[#FF7200] transition-colors hover:translate-x-1 inline-block duration-300">{item}</a></li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Mini photo strip */}
            <div className="flex gap-3 overflow-hidden mb-10">
                {[...MARQUEE_IMAGES.slice(0, 6), ...MARQUEE_IMAGES.slice(0, 6)].map((item, i) => (
                    <a key={i} href="#" onClick={(e) => { e.preventDefault(); onNavigate('gallery'); }} className="shrink-0 group">
                        <div className="w-24 h-16 md:w-32 md:h-20 rounded-xl overflow-hidden img-zoom opacity-70 group-hover:opacity-100 transition-opacity">
                            <img src={item.img} alt={item.label} loading="lazy" className="w-full h-full object-cover" />
                        </div>
                    </a>
                ))}
            </div>

            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center">
                <p className="text-gray-500 text-sm">© 2026 The Indian Wings. All Rights Reserved.</p>
                <p className="text-gray-600 text-xs">Photos courtesy of Unsplash &amp; Wikimedia Commons (CC).</p>
            </div>
        </div>
    </footer>
);

/* ============ Floating WhatsApp ============ */
export const FloatingWhatsApp = () => {
    const [isPreview, setIsPreview] = useState(false);
    useEffect(() => setIsPreview(window.location.hostname.endsWith('.e2b.app')), []);
    return (<>
    {isPreview && <a href="/download" className="fixed bottom-6 left-1/2 -translate-x-1/2 bottom-5 z-50 rounded-full bg-[#FF7200] text-white px-5 py-2.5 text-xs sm:text-sm font-bold shadow-xl hover:bg-[#e76500] hover:-translate-y-0.5 transition-all" aria-label="Download project ZIP">Download project (zip)</a>}
    <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-50 group" aria-label="Chat on WhatsApp">
        <div className="w-14 h-14 md:w-16 md:h-16 bg-[#25D366] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all duration-300 animate-whatsapp-pulse">
            <WhatsAppGlyph size={28} />
        </div>
        <div className="absolute right-full bottom-1/2 translate-y-1/2 mr-4 bg-white text-[#071B3A] px-4 py-2 rounded-lg shadow-lg font-semibold text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none border border-[#F2F4F7] transform scale-95 group-hover:scale-100">
            Chat on WhatsApp
        </div>
    </a>
    </>);
};

/* ============ Scroll to top ============ */
export const ScrollToTop = () => {
    const [show, setShow] = useState(false);
    useEffect(() => {
        const h = () => setShow(window.scrollY > 500);
        window.addEventListener('scroll', h, { passive: true });
        return () => window.removeEventListener('scroll', h);
    }, []);
    return (
        <div className={`fixed bottom-6 left-6 z-50 transition-all duration-500 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top"
                className="w-12 h-12 bg-[#071B3A] text-white rounded-full shadow-xl flex items-center justify-center hover:bg-[#FF7200] transition-all duration-300 hover:scale-110 hover:shadow-[#FF7200]/30">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
            </button>
        </div>
    );
};
