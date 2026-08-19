import { useState } from 'react';
import { MapPin, Phone, Mail, CheckCircle2, MessageCircle, Send, HelpCircle, ChevronDown, Clock } from 'lucide-react';

import { Header, Footer, FloatingWhatsApp, ScrollToTop, Reveal, FadeImg, PageHero, WhatsAppGlyph, WHATSAPP, CALL } from './shared.jsx';
import { PAGE_HEROES, wm } from './images.js';

const faqs = [
    { q: 'How can I book a trip with The Indian Wings?', a: 'Simply fill out our enquiry form, give us a call, or send us a WhatsApp message. Our travel experts will understand your preferences and create a personalized itinerary for you.' },
    { q: 'What is included in the packages?', a: 'All our packages include accommodation in handpicked hotels, daily meals, sightseeing with verified guides, and airport transfers. Some packages also include Shikara rides and houseboat stays.' },
    { q: 'Can I customize my Kashmir trip?', a: 'Absolutely! Every trip can be customized to match your preferences, budget, and travel dates. Just let us know what you need and we\'ll create the perfect itinerary.' },
    { q: 'Is Kashmir safe for tourists?', a: 'Yes, Kashmir is very safe for tourists. The local people are incredibly warm and hospitable. We also provide 24/7 support and verified guides to ensure your safety throughout the trip.' },
    { q: 'When is the best time to visit Kashmir?', a: 'March to October is the best time. Spring (March-May) for tulip gardens. Summer (June-August) for lush meadows. Autumn (September-October) for stunning fall colors.' },
    { q: 'Do you provide airport pickup?', a: 'Yes! We provide free airport pickup and drop for all our packages at Srinagar Airport (SXR). Our driver will meet you at the airport with a name board.' },
];

export default function ContactPage({ onNavigate }) {
    const [openFaq, setOpenFaq] = useState(null);
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', destination: '', travelers: '', date: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); setTimeout(() => setSubmitted(false), 5000); };

    const inputCls = 'w-full bg-white border border-[#DDE2E8] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#FF7200] focus:ring-2 focus:ring-[#FF7200]/20 transition-all duration-300 hover:border-[#C6CCD6]';

    return (
        <div className="min-h-screen bg-[#F8F6F1] font-sans overflow-x-hidden selection:bg-[#FF7200] selection:text-white page-enter">
            <Header onNavigate={onNavigate} active="home" />
            <main>
                <PageHero
                    badge="CONTACT US"
                    icon={<Phone size={16} />}
                    title="Get in Touch"
                    subtitle="We're here to help you plan your perfect Kashmir trip. Reach out to us anytime."
                    image={PAGE_HEROES.contact}
                />

                {/* Contact info + form */}
                <section className="py-16 md:py-24 bg-white">
                    <div className="max-w-[1380px] mx-auto px-4 md:px-8">
                        <div className="flex flex-col lg:flex-row gap-16">
                            <Reveal className="w-full lg:w-1/3" direction="left">
                                <h2 className="font-serif tracking-tight text-2xl md:text-3xl font-bold text-[#071B3A] mb-8">Contact Information</h2>
                                <div className="space-y-6 mb-10">
                                    {[
                                        { icon: <Phone size={20} />, title: 'Call Us', value: '+91 91035 99174', sub: 'Call anytime', href: CALL },
                                        { icon: <MessageCircle size={20} />, title: 'WhatsApp', value: '+91 78277 43041', sub: 'Quick response', href: WHATSAPP },
                                        { icon: <Mail size={20} />, title: 'Email', value: 'Kashmirtravels517@gmail.com', sub: 'We reply within 24 hours', href: 'mailto:Kashmirtravels517@gmail.com' },
                                        { icon: <MapPin size={20} />, title: 'Visit Us', value: 'The Indian Wings Travels', sub: 'Sheikh Palace, 2nd Floor, Kanyar Chowk, Srinagar', href: null },
                                    ].map((item, i) => {
                                        const inner = (
                                            <>
                                                <div className="w-12 h-12 rounded-full bg-[#FF7200]/10 flex items-center justify-center shrink-0 text-[#FF7200] group-hover:bg-gradient-to-br group-hover:from-[#FF7200] group-hover:to-[#FFB347] group-hover:text-white transition-all duration-300 group-hover:scale-110">{item.icon}</div>
                                                <div>
                                                    <h4 className="font-bold text-[#071B3A] text-sm mb-1">{item.title}</h4>
                                                    <p className="text-[#071B3A] font-semibold text-sm">{item.value}</p>
                                                    <p className="text-[#687386] text-xs">{item.sub}</p>
                                                </div>
                                            </>
                                        );
                                        return item.href
                                            ? <a key={i} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="flex items-start gap-4 group">{inner}</a>
                                            : <div key={i} className="flex items-start gap-4 group">{inner}</div>;
                                    })}
                                </div>
                                <div className="bg-[#F8F6F1] rounded-3xl overflow-hidden border border-[#F2F4F7]">
                                    <div className="h-36 overflow-hidden img-zoom">
                                        <FadeImg src={wm('Houseboat at Dal Lake, Srinagar.jpg', 800)} alt="Our Srinagar office neighbourhood" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="p-6">
                                        <h4 className="font-bold text-[#071B3A] text-sm mb-3 flex items-center gap-2"><Clock size={15} className="text-[#FF7200]" /> Office Hours</h4>
                                        <div className="space-y-2 text-sm text-[#687386]">
                                            <p className="flex justify-between"><span>Monday – Saturday</span><span className="font-medium text-[#071B3A]">9:00 AM – 7:00 PM</span></p>
                                            <p className="flex justify-between"><span>Sunday</span><span className="font-medium text-[#071B3A]">10:00 AM – 5:00 PM</span></p>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>

                            <Reveal className="w-full lg:w-2/3" delay={100} direction="right">
                                <div className="bg-[#F8F6F1] rounded-3xl p-8 md:p-10 border border-[#F2F4F7] shadow-sm">
                                    <h2 className="font-serif tracking-tight text-2xl md:text-3xl font-bold text-[#071B3A] mb-2">Enquire Now</h2>
                                    <p className="text-[#687386] text-sm mb-8">Fill out the form below and we'll get back to you shortly.</p>
                                    {submitted ? (
                                        <div className="text-center py-14 animate-scale-in">
                                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5 animate-ring-pulse"><CheckCircle2 size={40} className="text-green-600" /></div>
                                            <h3 className="font-bold text-[#071B3A] text-2xl mb-2">Thank You!</h3>
                                            <p className="text-[#687386]">We've received your enquiry. Our team will contact you shortly.</p>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleSubmit} className="space-y-5">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                <div><label className="block text-sm font-semibold mb-2 text-[#071B3A]">Full Name *</label><input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={inputCls} placeholder="Your full name" /></div>
                                                <div><label className="block text-sm font-semibold mb-2 text-[#071B3A]">Email Address *</label><input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={inputCls} placeholder="your@email.com" /></div>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                <div><label className="block text-sm font-semibold mb-2 text-[#071B3A]">Phone Number *</label><input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className={inputCls} placeholder="+91" /></div>
                                                <div><label className="block text-sm font-semibold mb-2 text-[#071B3A]">Destination</label><select value={formData.destination} onChange={(e) => setFormData({ ...formData, destination: e.target.value })} className={inputCls}><option value="">Select destination</option><option>Srinagar</option><option>Gulmarg</option><option>Pahalgam</option><option>Sonmarg</option><option>Doodhpathri</option><option>Aru Valley</option><option>All Kashmir</option></select></div>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                <div><label className="block text-sm font-semibold mb-2 text-[#071B3A]">Number of Travelers</label><input type="number" value={formData.travelers} onChange={(e) => setFormData({ ...formData, travelers: e.target.value })} className={inputCls} placeholder="e.g. 4" /></div>
                                                <div><label className="block text-sm font-semibold mb-2 text-[#071B3A]">Preferred Date</label><input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className={inputCls} /></div>
                                            </div>
                                            <div><label className="block text-sm font-semibold mb-2 text-[#071B3A]">Your Message</label><textarea rows="4" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className={`${inputCls} resize-none`} placeholder="Tell us about your preferences, budget, special requirements..."></textarea></div>
                                            <div className="flex flex-col sm:flex-row gap-4">
                                                <button type="submit" className="btn-shine inline-flex items-center justify-center px-8 py-3.5 rounded-[10px] font-semibold text-sm bg-gradient-to-r from-[#FF7200] to-[#FFB347] text-white hover:shadow-lg hover:shadow-[#FF7200]/30 hover:-translate-y-0.5 transition-all duration-300 flex-1">
                                                    <Send size={16} className="mr-2" /> Send Enquiry
                                                </button>
                                                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn-shine inline-flex items-center justify-center px-8 py-3.5 rounded-[10px] font-semibold text-sm bg-[#25D366] text-white hover:bg-[#1ebe57] hover:shadow-lg hover:shadow-[#25D366]/30 hover:-translate-y-0.5 transition-all duration-300">
                                                    <WhatsAppGlyph size={15} className="mr-2" /> WhatsApp Instead
                                                </a>
                                            </div>
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
                        <Reveal>
                            <div className="text-center mb-12">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#FF7200] text-sm font-semibold mb-4 border border-[#FF7200]/20 shadow-sm"><HelpCircle size={16} /> FAQ</div>
                                <h2 className="font-serif tracking-tight text-3xl md:text-4xl font-bold text-[#071B3A]">Frequently Asked Questions</h2>
                            </div>
                        </Reveal>
                        <div className="space-y-3">
                            {faqs.map((faq, i) => (
                                <Reveal key={i} delay={i * 60}>
                                    <div className={`bg-white rounded-2xl border overflow-hidden card-lift transition-colors duration-300 ${openFaq === i ? 'border-[#FF7200]/40 shadow-md' : 'border-[#F2F4F7]'}`}>
                                        <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left group">
                                            <span className={`font-semibold text-sm pr-4 transition-colors ${openFaq === i ? 'text-[#FF7200]' : 'text-[#071B3A] group-hover:text-[#FF7200]'}`}>{faq.q}</span>
                                            <span className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${openFaq === i ? 'bg-[#FF7200] text-white rotate-180' : 'bg-[#F8F6F1] text-[#687386] group-hover:bg-[#FF7200]/10 group-hover:text-[#FF7200]'}`}>
                                                <ChevronDown size={16} />
                                            </span>
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

            <Footer onNavigate={onNavigate} />
            <FloatingWhatsApp />
            <ScrollToTop />
        </div>
    );
}
