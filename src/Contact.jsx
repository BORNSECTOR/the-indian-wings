import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Phone, Mail, Clock, Menu, X, Headset, CheckCircle2, MessageCircle, Send, HelpCircle, ChevronDown, Plane } from 'lucide-react';

const typography = { heading: 'font-serif tracking-tight' };
const WHATSAPP = 'https://wa.me/917827743041';
const CALL = 'tel:+919103599174';

const Reveal = ({ children, className = '', delay = 0 }) => {
    const ref = useRef(null); const [v, setV] = useState(false);
    useEffect(() => { const el = ref.current; if (!el) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); o.disconnect(); } }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }); o.observe(el); return () => o.disconnect(); }, []);
    return <div ref={ref} className={`opacity-0 translate-y-12 ${v ? '!opacity-100 !translate-y-0' : ''} transition-all duration-700 ease-out ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
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
                               className="text-sm font-medium hover:text-[#FF7200] transition-colors relative py-2 group text-[#071B3A]">{link}<span className="absolute bottom-0 left-0 h-0.5 bg-[#FF7200] transition-all duration-500 group-hover:w-full w-0"></span></a>
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
                               className="text-3xl font-serif text-white hover:text-[#FF7200] transition-all duration-300" style={{ transitionDelay: mobileMenuOpen ? `${200 + i * 80}ms` : '0ms' }}>{link}</a>
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

const faqs = [
    { q: 'How can I book a trip with The Indian Wings?', a: 'Simply fill out our enquiry form, give us a call, or send us a WhatsApp message. Our travel experts will understand your preferences and create a personalized itinerary for you.' },
    { q: 'What is included in the packages?', a: 'All our packages include accommodation in handpicked hotels, daily meals, sightseeing with verified guides, and airport transfers. Some packages also include Shikara rides and houseboat stays.' },
    { q: 'Can I customize my Kashmir trip?', a: 'Absolutely! Every trip can be customized to match your preferences, budget, and travel dates. Just let us know what you need and we\'ll create the perfect itinerary.' },
    { q: 'Is Kashmir safe for tourists?', a: 'Yes, Kashmir is very safe for tourists. The local people are incredibly warm and hospitable. We also provide 24/7 support and verified guides to ensure your safety throughout the trip.' },
    { q: 'When is the best time to visit Kashmir?', a: 'March to October is the best time. Spring (March-May) for tulip gardens. Summer (June-August) for lush meadows. Autumn (September-October) for stunning fall colors.' },
    { q: 'Do you provide airport pickup?', a: 'Yes! We provide free airport pickup and drop for all our packages at Srinagar Airport (SXR). Our driver will meet you at the airport with a name board.' }
];

export default function ContactPage({ onNavigate }) {
    const [openFaq, setOpenFaq] = useState(null);
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', destination: '', travelers: '', date: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); setTimeout(() => setSubmitted(false), 4000); };

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
                            <Reveal><div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-[#FF7200] text-sm font-semibold mb-4 border border-white/10"><Phone size={16} /> CONTACT US</div></Reveal>
                            <Reveal delay={100}><h1 className={`${typography.heading} text-4xl md:text-6xl text-white font-bold mb-4`}>Get in Touch</h1></Reveal>
                            <Reveal delay={200}><p className="text-gray-300 text-lg max-w-xl font-light">We're here to help you plan your perfect Kashmir trip. Reach out to us anytime.</p></Reveal>
                        </div>
                    </div>
                </section>

                {/* Contact Info + Form */}
                <section className="py-16 md:py-24 bg-white">
                    <div className="max-w-[1380px] mx-auto px-4 md:px-8">
                        <div className="flex flex-col lg:flex-row gap-16">
                            <Reveal className="w-full lg:w-1/3">
                                <h2 className={`${typography.heading} text-2xl md:text-3xl font-bold text-[#071B3A] mb-8`}>Contact Information</h2>
                                <div className="space-y-6 mb-10">
                                    {[{ icon: <Phone size={20} />, title: 'Call Us', value: '+91 91035 99174', sub: 'Call anytime' }, { icon: <MessageCircle size={20} />, title: 'WhatsApp', value: '+91 78277 43041', sub: 'Quick response' }, { icon: <Mail size={20} />, title: 'Email', value: 'Kashmirtravels517@gmail.com', sub: 'We reply within 24 hours' }, { icon: <MapPin size={20} />, title: 'Visit Us', value: 'The Indian Wings Travels', sub: 'Sheikh Palace, 2nd Floor, Kanyar Chowk, Srinagar' }].map((item, i) => (
                                        <div key={i} className="flex items-start gap-4 group"><div className="w-12 h-12 rounded-full bg-[#FF7200]/10 flex items-center justify-center shrink-0 text-[#FF7200] group-hover:bg-[#FF7200] group-hover:text-white transition-all duration-300 group-hover:scale-110">{item.icon}</div><div><h4 className="font-bold text-[#071B3A] text-sm mb-1">{item.title}</h4><p className="text-[#071B3A] font-semibold text-sm">{item.value}</p><p className="text-[#687386] text-xs">{item.sub}</p></div></div>
                                    ))}
                                </div>
                                <div className="bg-[#F8F6F1] rounded-2xl p-6 border border-[#F2F4F7]">
                                    <h4 className="font-bold text-[#071B3A] text-sm mb-3">Office Hours</h4>
                                    <div className="space-y-2 text-sm text-[#687386]">
                                        <p className="flex justify-between"><span>Monday - Saturday</span><span className="font-medium text-[#071B3A]">9:00 AM - 7:00 PM</span></p>
                                        <p className="flex justify-between"><span>Sunday</span><span className="font-medium text-[#071B3A]">10:00 AM - 5:00 PM</span></p>
                                    </div>
                                </div>
                            </Reveal>

                            <Reveal className="w-full lg:w-2/3" delay={100}>
                                <div className="bg-[#F8F6F1] rounded-2xl p-8 md:p-10 border border-[#F2F4F7]">
                                    <h2 className={`${typography.heading} text-2xl md:text-3xl font-bold text-[#071B3A] mb-2`}>Enquire Now</h2>
                                    <p className="text-[#687386] text-sm mb-8">Fill out the form below and we'll get back to you shortly.</p>
                                    {submitted ? (
                                        <div className="text-center py-12 animate-scale-in">
                                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-[scale-in_0.5s_ease_forwards]"><CheckCircle2 size={32} className="text-green-600" /></div>
                                            <h3 className="font-bold text-[#071B3A] text-xl mb-2">Thank You!</h3>
                                            <p className="text-[#687386]">We've received your enquiry. Our team will contact you shortly.</p>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleSubmit} className="space-y-5">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                <div><label className="block text-sm font-semibold mb-2 text-[#071B3A]">Full Name *</label><input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-white border border-[#DDE2E8] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#FF7200] focus:ring-2 focus:ring-[#FF7200]/20 transition-all duration-300" placeholder="Your full name" /></div>
                                                <div><label className="block text-sm font-semibold mb-2 text-[#071B3A]">Email Address *</label><input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-white border border-[#DDE2E8] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#FF7200] focus:ring-2 focus:ring-[#FF7200]/20 transition-all duration-300" placeholder="your@email.com" /></div>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                <div><label className="block text-sm font-semibold mb-2 text-[#071B3A]">Phone Number *</label><input type="tel" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full bg-white border border-[#DDE2E8] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#FF7200] focus:ring-2 focus:ring-[#FF7200]/20 transition-all duration-300" placeholder="+91" /></div>
                                                <div><label className="block text-sm font-semibold mb-2 text-[#071B3A]">Destination</label><select value={formData.destination} onChange={(e) => setFormData({...formData, destination: e.target.value})} className="w-full bg-white border border-[#DDE2E8] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#FF7200] focus:ring-2 focus:ring-[#FF7200]/20 transition-all duration-300"><option value="">Select destination</option><option>Srinagar</option><option>Gulmarg</option><option>Pahalgam</option><option>Sonmarg</option><option>All Kashmir</option></select></div>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                <div><label className="block text-sm font-semibold mb-2 text-[#071B3A]">Number of Travelers</label><input type="number" value={formData.travelers} onChange={(e) => setFormData({...formData, travelers: e.target.value})} className="w-full bg-white border border-[#DDE2E8] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#FF7200] focus:ring-2 focus:ring-[#FF7200]/20 transition-all duration-300" placeholder="e.g. 4" /></div>
                                                <div><label className="block text-sm font-semibold mb-2 text-[#071B3A]">Preferred Date</label><input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="w-full bg-white border border-[#DDE2E8] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#FF7200] focus:ring-2 focus:ring-[#FF7200]/20 transition-all duration-300" /></div>
                                            </div>
                                            <div><label className="block text-sm font-semibold mb-2 text-[#071B3A]">Your Message</label><textarea rows="4" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full bg-white border border-[#DDE2E8] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#FF7200] focus:ring-2 focus:ring-[#FF7200]/20 transition-all duration-300 resize-none" placeholder="Tell us about your preferences, budget, special requirements..."></textarea></div>
                                            <button type="submit" className="btn-shine inline-flex items-center justify-center px-8 py-3.5 rounded-[10px] font-semibold text-sm bg-[#FF7200] text-white hover:bg-[#E66600] hover:shadow-lg hover:shadow-[#FF7200]/20 hover:-translate-y-0.5 transition-all duration-300 w-full md:w-auto"><Send size={16} className="mr-2" /> Send Enquiry</button>
                                        </form>
                                    )}
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </section>

                {/* FAQs */}
                <section className="py-16 md:py-24 bg-[#F8F6F1]">
                    <div className="max-w-[800px] mx-auto px-4 md:px-8">
                        <Reveal><div className="text-center mb-12">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#FF7200] text-sm font-semibold mb-4 border border-[#FF7200]/20 shadow-sm"><HelpCircle size={16} /> FAQ</div>
                            <h2 className={`${typography.heading} text-3xl md:text-4xl font-bold text-[#071B3A]`}>Frequently Asked Questions</h2>
                        </div></Reveal>
                        <div className="space-y-3">
                            {faqs.map((faq, i) => (
                                <Reveal key={i} delay={i * 60}>
                                    <div className="bg-white rounded-xl border border-[#F2F4F7] overflow-hidden card-lift">
                                        <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left group">
                                            <span className="font-semibold text-[#071B3A] text-sm pr-4 group-hover:text-[#FF7200] transition-colors">{faq.q}</span>
                                            <ChevronDown size={18} className={`text-[#687386] shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180 text-[#FF7200]' : ''}`} />
                                        </button>
                                        <div className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${openFaq === i ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                            <div className="px-5 pb-5 text-[#687386] text-sm leading-relaxed border-t border-[#F2F4F7] pt-4">{faq.a}</div>
                                        </div>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <footer className="bg-[#05132A] text-white pt-16 pb-8"><div className="max-w-[1380px] mx-auto px-4 md:px-8"><div className="flex flex-col md:flex-row justify-between items-center gap-6 border-t border-white/10 pt-8"><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="group"><img src="/logo.webp" alt="The Indian Wings" className="h-10 w-auto transition-transform duration-300 group-hover:scale-105" /></a><p className="text-gray-500 text-sm">© 2026 The Indian Wings. All Rights Reserved.</p></div></div></footer>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-50 group"><div className="w-14 h-14 md:w-16 md:h-16 bg-[#25D366] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all duration-300 animate-whatsapp-pulse"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg></div></a>
        </div>
    );
}
