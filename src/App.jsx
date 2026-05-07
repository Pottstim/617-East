import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  Briefcase,
  ChevronDown,
  CreditCard,
  FileText,
  Landmark,
  Menu,
  ShieldCheck,
  TrendingUp,
  Users,
  X,
  CheckCircle2,
  Mail,
  Phone,
} from 'lucide-react';

const BUSINESS_SERVICES = [
  {
    id: 'digital-brand',
    title: 'Brand & Digital Dominance',
    description:
      'Custom web design, search visibility, and strategic brand positioning designed to turn attention into measurable growth.',
    icon: TrendingUp,
    href: '#business-services',
    bullets: ['Web design', 'SEO strategy', 'Brand positioning'],
  },
  {
    id: 'capital-credit',
    title: 'Capital & Credit',
    description:
      'Business credit development, funding readiness, and structured guidance for organizations preparing for responsible expansion.',
    icon: Landmark,
    href: '#business-services',
    bullets: ['Business credit', 'Funding readiness', 'SBA guidance'],
  },
  {
    id: 'foundation-strategy',
    title: 'Foundation & Strategy',
    description:
      'Entity formation support, operational structuring, and research-led strategic guidance for stronger business foundations.',
    icon: ShieldCheck,
    href: '#business-services',
    bullets: ['Compliance support', 'Entity setup', 'Strategic research'],
  },
];

const CONSUMER_SERVICES = [
  {
    id: 'credit-restoration',
    title: 'Credit Restoration',
    description:
      'Careful review of personal credit challenges with a process focused on accuracy, documentation, and long-term financial positioning.',
    icon: CreditCard,
    href: '#consumer-services',
  },
  {
    id: 'document-rendering',
    title: 'Document Rendering',
    description:
      'Professional drafting support for personal and financial documentation requiring precision, structure, and presentation quality.',
    icon: FileText,
    href: '#consumer-services',
  },
];

const TRUST_POINTS = [
  {
    title: 'Structured Guidance',
    description:
      'Services are presented with clear categories, practical next steps, and a disciplined advisory tone.',
    icon: Briefcase,
  },
  {
    title: 'Confidential Handling',
    description:
      'The brand language and layout emphasize confidentiality, discretion, and professional care throughout the experience.',
    icon: ShieldCheck,
  },
  {
    title: 'Dual-Service Model',
    description:
      'Distinct business and consumer pathways help visitors quickly identify the right service lane.',
    icon: Users,
  },
];

const NAV_ITEMS = [
  { label: 'Home', href: '#top' },
  { label: 'Why 617 East Trust', href: '#why-us' },
  { label: 'Business Services', href: '#business-services' },
  { label: 'Consumer Services', href: '#consumer-services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const BUSINESS_MENU = [
  { label: 'Brand & Digital Dominance', href: '#business-services' },
  { label: 'Capital & Credit', href: '#business-services' },
  { label: 'Foundation & Strategy', href: '#business-services' },
];

const CONSUMER_MENU = [
  { label: 'Credit Restoration', href: '#consumer-services' },
  { label: 'Document Rendering', href: '#consumer-services' },
];

const FOOTER_BUSINESS_LINKS = [
  'Web Design & SEO',
  'Branding & Marketing',
  'Business Credit & Funding',
  'SBA Readiness',
  'Compliance & Formation',
];

const FOOTER_CONSUMER_LINKS = [
  'Credit Restoration',
  'Document Rendering',
  'Client Portal',
  'Fiduciary Promise',
];

function BrandImage({ src, alt, className = '', fallbackText = '617 East Trust', decorative = false, width, height }) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div role={decorative ? undefined : 'img'} aria-label={decorative ? undefined : alt} className={`flex items-center justify-center overflow-hidden border border-[#B88A44]/40 bg-[#F9F7F1]/90 text-[#6B1D2A] ${className}`}>
        <span className="px-3 text-center font-serif text-[10px] font-bold uppercase tracking-[0.22em] sm:text-xs">{fallbackText}</span>
      </div>
    );
  }
  return <img src={src} alt={decorative ? '' : alt} aria-hidden={decorative ? 'true' : undefined} width={width} height={height} loading="lazy" decoding="async" onError={() => setError(true)} className={className} />;
}

function DisclosureMenu({ label, items, isScrolled, openKey, setOpenKey, menuKey }) {
  const open = openKey === menuKey;
  return (
    <div className="relative">
      <button type="button" aria-expanded={open} aria-controls={`${menuKey}-menu`} onClick={() => setOpenKey(open ? null : menuKey)} className={`inline-flex min-h-[44px] items-center gap-1 rounded-md px-2 py-2 font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B88A44] focus-visible:ring-offset-2 ${isScrolled ? 'text-[#6B1D2A]' : 'text-white'} hover:text-[#B88A44]`}>
        {label}
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>
      <div id={`${menuKey}-menu`} className={`absolute left-0 top-full z-50 mt-2 w-72 overflow-hidden rounded-xl border border-[#B88A44]/20 bg-white shadow-xl transition-all duration-200 ${open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0'}`}>
        <ul className="py-2">{items.map((item, index) => <li key={item.label}><a href={item.href} className={`block px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-[#F9F7F1] hover:text-[#6B1D2A] focus:bg-[#F9F7F1] focus:text-[#6B1D2A] focus:outline-none ${index !== items.length - 1 ? 'border-b border-gray-100' : ''}`} onClick={() => setOpenKey(null)}>{item.label}</a></li>)}</ul>
      </div>
    </div>
  );
}

function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  return <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>{eyebrow ? <span className="mb-3 block text-sm font-bold uppercase tracking-[0.24em] text-[#B88A44]">{eyebrow}</span> : null}<h2 className="font-serif text-3xl font-bold leading-tight text-[#6B1D2A] md:text-5xl">{title}</h2>{description ? <p className="mt-4 text-base leading-7 text-gray-600 md:text-lg">{description}</p> : null}</div>;
}

function ServiceCard({ service, dark = false }) {
  const Icon = service.icon;
  if (dark) {
    return <article className="flex h-full flex-col rounded-2xl border border-[#B88A44]/30 bg-[#6B1D2A]/45 p-8 shadow-2xl backdrop-blur-md transition duration-300 hover:bg-[#6B1D2A]/60 md:p-10"><div className="mb-6 flex items-center gap-4"><div className="rounded-xl border border-white/10 bg-white/10 p-4"><Icon className="h-8 w-8 text-[#B88A44]" aria-hidden="true" /></div><h3 className="font-serif text-2xl font-bold text-white">{service.title}</h3></div><p className="mb-8 flex-grow leading-7 text-gray-300">{service.description}</p><a href={service.href} className="inline-flex min-h-[44px] items-center gap-2 font-semibold text-[#B88A44] transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B88A44] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a070a]">Request information <ArrowRight className="h-5 w-5" aria-hidden="true" /></a></article>;
  }
  return <article className="group flex h-full flex-col rounded-xl border border-[#B88A44]/10 bg-[#F9F7F1] p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl md:p-10"><Icon className="mb-6 h-12 w-12 text-[#B88A44] transition-transform group-hover:scale-110" aria-hidden="true" /><h3 className="mb-4 font-serif text-2xl font-bold text-[#6B1D2A]">{service.title}</h3><p className="mb-6 flex-grow leading-7 text-gray-600">{service.description}</p>{service.bullets ? <ul className="mb-8 space-y-2 text-sm font-medium text-gray-500">{service.bullets.map((bullet) => <li key={bullet} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#B88A44]" aria-hidden="true" /><span>{bullet}</span></li>)}</ul> : null}<a href={service.href} className="inline-flex min-h-[44px] items-center gap-2 font-semibold text-[#6B1D2A] transition-colors hover:text-[#B88A44] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B88A44] focus-visible:ring-offset-2">Learn more <ArrowRight className="h-4 w-4" aria-hidden="true" /></a></article>;
}

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDesktopMenu, setOpenDesktopMenu] = useState(null);
  const navRef = useRef(null);
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    const onKeyDown = (event) => { if (event.key === 'Escape') { setMobileMenuOpen(false); setOpenDesktopMenu(null); } };
    const onClickOutside = (event) => { if (navRef.current && !navRef.current.contains(event.target)) setOpenDesktopMenu(null); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onClickOutside);
    return () => { window.removeEventListener('scroll', onScroll); document.removeEventListener('keydown', onKeyDown); document.removeEventListener('mousedown', onClickOutside); };
  }, []);
  useEffect(() => { document.body.style.overflow = mobileMenuOpen ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [mobileMenuOpen]);
  const year = useMemo(() => new Date().getFullYear(), []);
  return <div id="top" className="min-h-screen bg-[#F9F7F1] font-sans text-gray-800 selection:bg-[#B88A44] selection:text-white"><a href="#main-content" className="sr-only z-[100] rounded-md bg-white px-4 py-3 text-sm font-semibold text-[#6B1D2A] shadow focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to content</a><header ref={navRef}><nav aria-label="Primary" className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${isScrolled ? 'border-b border-[#B88A44]/10 bg-white/95 py-2 shadow-md backdrop-blur' : 'bg-transparent py-4'}`}><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="flex items-center justify-between gap-4"><a href="#top" className="inline-flex items-center rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B88A44] focus-visible:ring-offset-2" aria-label="617 East Trust home"><BrandImage src="./259355.jpg" alt="617 East Trust horizontal logo" fallbackText="617 East Trust" className="h-12 w-auto rounded-sm object-contain sm:h-14 md:h-16" width={320} height={96} /></a><div className="hidden items-center gap-3 md:flex"><a href="#top" className={`rounded-md px-2 py-2 font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B88A44] focus-visible:ring-offset-2 ${isScrolled ? 'text-[#6B1D2A]' : 'text-white'} hover:text-[#B88A44]`}>Home</a><DisclosureMenu label="Business Solutions" items={BUSINESS_MENU} isScrolled={isScrolled} openKey={openDesktopMenu} setOpenKey={setOpenDesktopMenu} menuKey="business" /><DisclosureMenu label="Consumer Services" items={CONSUMER_MENU} isScrolled={isScrolled} openKey={openDesktopMenu} setOpenKey={setOpenDesktopMenu} menuKey="consumer" /><a href="#about" className={`rounded-md px-2 py-2 font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B88A44] focus-visible:ring-offset-2 ${isScrolled ? 'text-[#6B1D2A]' : 'text-white'} hover:text-[#B88A44]`}>About</a><a href="#contact" className="inline-flex min-h-[44px] items-center rounded-md bg-[#B88A44] px-5 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-[#9a7338] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B88A44] focus-visible:ring-offset-2">Schedule Consultation</a><a href="/client-portal" className={`inline-flex min-h-[44px] items-center rounded-md border px-4 py-3 font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B88A44] focus-visible:ring-offset-2 ${isScrolled ? 'border-[#6B1D2A]/20 text-[#6B1D2A] hover:border-[#B88A44] hover:text-[#B88A44]' : 'border-white/40 text-white hover:border-[#B88A44] hover:text-[#B88A44]'}`}>Client Portal</a></div><button type="button" aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileMenuOpen} aria-controls="mobile-menu" onClick={() => setMobileMenuOpen((prev) => !prev)} className={`inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B88A44] focus-visible:ring-offset-2 md:hidden ${isScrolled ? 'text-[#6B1D2A]' : 'text-[#F9F7F1]'}`}>{mobileMenuOpen ? <X className="h-8 w-8" aria-hidden="true" /> : <Menu className="h-8 w-8" aria-hidden="true" />}</button></div></div>{mobileMenuOpen ? <div id="mobile-menu" className="md:hidden border-t border-gray-100 bg-white shadow-xl"><div className="mx-auto max-w-7xl px-4 pb-6 pt-3"><div className="space-y-1">{NAV_ITEMS.map((item) => <a key={item.label} href={item.href} onClick={() => setMobileMenuOpen(false)} className="block rounded-md border-b border-gray-100 px-3 py-3 font-semibold text-[#6B1D2A] transition-colors hover:text-[#B88A44] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B88A44]">{item.label}</a>)}</div><div className="mt-4 grid gap-3"><a href="#contact" onClick={() => setMobileMenuOpen(false)} className="inline-flex min-h-[48px] items-center justify-center rounded-md bg-[#B88A44] px-4 py-3 font-semibold text-white transition-colors hover:bg-[#9a7338]">Schedule Consultation</a><a href="/client-portal" onClick={() => setMobileMenuOpen(false)} className="inline-flex min-h-[48px] items-center justify-center rounded-md border border-[#6B1D2A]/15 px-4 py-3 font-semibold text-[#6B1D2A] transition-colors hover:border-[#B88A44] hover:text-[#B88A44]">Client Portal</a></div></div></div> : null}</nav></header><main id="main-content"><section className="relative overflow-hidden bg-[#6B1D2A] pb-24 pt-32 md:pb-32 md:pt-44"><div className="absolute right-[-10%] top-[10%] hidden opacity-20 mix-blend-screen lg:block"><BrandImage src="./259351.jpg" alt="Detailed crest background" fallbackText="Crest" className="h-[800px] w-[800px] rounded-full object-contain" decorative width={800} height={800} /></div><div className="absolute inset-0 bg-gradient-to-t from-[#4a121c] to-transparent opacity-90" /><div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8"><div className="z-10 max-w-3xl text-center lg:text-left"><span className="mb-5 inline-flex rounded-full border border-[#B88A44]/30 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-[#F3DEC2]">Consulting and Fiduciary Care</span><h1 className="font-serif text-4xl font-bold leading-tight text-[#F9F7F1] md:text-6xl">Expert consulting for businesses and individuals who value structure, discretion, and growth.</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-gray-200 md:text-xl">617 East Trust delivers strategic business support, credit-focused guidance, and disciplined advisory services designed to help clients strengthen their foundation before they scale.</p><div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start"><a href="#business-services" className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-md bg-[#B88A44] px-8 py-4 font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[#9a7338] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F9F7F1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#6B1D2A]"><Briefcase className="h-5 w-5" aria-hidden="true" />Explore Business Services</a><a href="#consumer-services" className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-md border-2 border-[#F9F7F1] px-8 py-4 font-bold text-[#F9F7F1] shadow-lg transition-all hover:-translate-y-0.5 hover:bg-white hover:text-[#6B1D2A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F9F7F1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#6B1D2A]"><Users className="h-5 w-5" aria-hidden="true" />Explore Consumer Services</a></div><div className="mt-10 grid gap-4 sm:grid-cols-3">{['Business strategy support', 'Credit-focused guidance', 'Confidential client care'].map((item) => <div key={item} className="rounded-xl border border-white/10 bg-white/10 px-4 py-4 text-sm font-semibold text-[#F9F7F1]/95 backdrop-blur-sm">{item}</div>)}</div></div><div className="relative z-10 flex items-center justify-center lg:justify-end"><div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-md"><div className="mb-5 flex items-center gap-3"><div className="rounded-full bg-[#B88A44]/20 p-3"><ShieldCheck className="h-6 w-6 text-[#F3DEC2]" aria-hidden="true" /></div><div><p className="text-sm font-bold uppercase tracking-[0.2em] text-[#DAB987]">Fiduciary-first positioning</p><p className="text-sm text-gray-200">Built for trust-sensitive engagements</p></div></div><div className="space-y-4">{['Advisory framing for business and personal service lanes', 'Brand language built around trust, discretion, and structure', 'Premium visual identity using your crest, seal, and horizontal logo system'].map((point) => <div key={point} className="flex items-start gap-3 rounded-2xl bg-[#4f1722]/50 p-4"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#B88A44]" aria-hidden="true" /><p className="text-sm leading-6 text-gray-100">{point}</p></div>)}</div><a href="#contact" className="mt-6 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-md bg-white px-5 py-3 font-semibold text-[#6B1D2A] transition-colors hover:bg-[#F3E8D7] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#6B1D2A]">Start a confidential inquiry<ArrowRight className="h-4 w-4" aria-hidden="true" /></a></div></div></div></section><section id="why-us" className="bg-[#F9F7F1] py-24"><div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8"><div className="flex justify-center lg:justify-start"><div className="rounded-[28px] border border-[#B88A44]/10 bg-white p-4 shadow-xl"><BrandImage src="./259354.jpg" alt="617 East Trust pinecone and skyline mark" fallbackText="Pinecone mark" className="h-56 w-44 rounded-2xl object-contain" width={352} height={448} /></div></div><div><SectionHeading eyebrow="Why 617 East Trust" title="A brand built around protection first, then expansion." description="The pinecone metaphor works because it reinforces readiness, stewardship, and deliberate growth. That positioning is one of the strongest parts of the identity and should stay central to the messaging." /><div className="mt-10 grid gap-6 md:grid-cols-3">{TRUST_POINTS.map((point) => { const Icon = point.icon; return <article key={point.title} className="rounded-2xl border border-[#B88A44]/10 bg-white p-6 shadow-sm"><Icon className="mb-4 h-10 w-10 text-[#B88A44]" aria-hidden="true" /><h3 className="font-serif text-xl font-bold text-[#6B1D2A]">{point.title}</h3><p className="mt-3 text-sm leading-7 text-gray-600">{point.description}</p></article>; })}</div></div></div></section><section id="business-services" className="border-t border-gray-100 bg-white py-24"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"><SectionHeading eyebrow="Corporate & B2B" title="Business Solutions" description="Strategic support for organizations seeking stronger digital visibility, sounder financial positioning, and more deliberate operational foundations." /><a href="#contact" className="inline-flex min-h-[44px] items-center gap-2 font-semibold text-[#B88A44] transition-colors hover:text-[#6B1D2A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B88A44] focus-visible:ring-offset-2">Discuss business needs<ArrowRight className="h-5 w-5" aria-hidden="true" /></a></div><div className="grid grid-cols-1 gap-8 md:grid-cols-3">{BUSINESS_SERVICES.map((service) => <ServiceCard key={service.id} service={service} />)}</div></div></section><section id="consumer-services" className="relative overflow-hidden bg-[#1a070a] py-24 text-[#F9F7F1]"><div className="pointer-events-none absolute left-1/2 top-1/2 flex w-[120%] -translate-x-1/2 -translate-y-1/2 justify-center opacity-5 mix-blend-screen sm:w-[80%]"><BrandImage src="./259356.jpg" alt="Consumer services background watermark" fallbackText="Consumer mark" className="h-auto w-full max-w-[800px] rounded-full object-contain" decorative width={800} height={800} /></div><div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><SectionHeading eyebrow="Individual & B2C" title="Consumer Services" description="A more personal service lane for clients seeking help with credit-related challenges and high-clarity documentation support." align="center" /><div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">{CONSUMER_SERVICES.map((service) => <ServiceCard key={service.id} service={service} dark />)}</div></div></section><section id="about" className="bg-[#F9F7F1] py-24"><div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8"><div><SectionHeading eyebrow="About the Firm" title="Positioned as a high-trust advisory brand." description="617 East Trust works best when presented as a disciplined advisory practice rather than a generic marketing company. The strongest message in the current concept is that clients receive strategic support under a confidentiality-first, fiduciary-minded framework." /><div className="mt-8 space-y-4 text-base leading-8 text-gray-600"><p>For production use, you should replace broad claims with specifics such as service process, founder background, response times, industries served, and clear limitations or disclaimers where needed.</p><p>That extra specificity will make the site feel more credible, more compliant, and far more conversion-ready.</p></div></div><aside className="rounded-3xl border border-[#B88A44]/10 bg-white p-8 shadow-sm"><h3 className="font-serif text-2xl font-bold text-[#6B1D2A]">Recommended trust additions</h3><ul className="mt-6 space-y-4">{['A founder or leadership profile with credentials', 'A concise explanation of the client intake process', 'Service disclaimers for legal, credit, or financial boundaries', 'Testimonials, case studies, or client outcomes', 'A real contact workflow tied to one primary CTA'].map((item) => <li key={item} className="flex items-start gap-3 text-sm leading-7 text-gray-600"><CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#B88A44]" aria-hidden="true" /><span>{item}</span></li>)}</ul></aside></div></section><section id="contact" className="bg-white py-24"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="grid gap-10 lg:grid-cols-[1fr_1fr]"><div><SectionHeading eyebrow="Contact" title="Start a confidential conversation." description="Use this section as the single primary conversion point for the page. In production, connect this to your form handler, CRM, scheduling system, or secure intake process." /><div className="mt-8 space-y-4"><a href="mailto:contact@617east.com" className="flex items-center gap-3 rounded-2xl border border-[#B88A44]/10 bg-[#F9F7F1] p-4 text-gray-700 transition-colors hover:border-[#B88A44]/40"><Mail className="h-5 w-5 text-[#B88A44]" aria-hidden="true" /><span>contact@617east.com</span></a><a href="tel:18006173278" className="flex items-center gap-3 rounded-2xl border border-[#B88A44]/10 bg-[#F9F7F1] p-4 text-gray-700 transition-colors hover:border-[#B88A44]/40"><Phone className="h-5 w-5 text-[#B88A44]" aria-hidden="true" /><span>1-800-617-EAST</span></a></div><div className="mt-8 inline-flex rounded-md border border-[#B88A44]/20 bg-[#F9F7F1] px-4 py-3 text-sm font-bold text-[#B88A44]">Strict confidentiality maintained.</div></div><div className="rounded-3xl border border-[#B88A44]/10 bg-[#F9F7F1] p-8 shadow-sm"><form className="grid gap-5"><div><label htmlFor="name" className="mb-2 block text-sm font-semibold text-[#6B1D2A]">Full name</label><input id="name" name="name" type="text" autoComplete="name" className="min-h-[48px] w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-gray-800 outline-none transition focus:border-[#B88A44] focus:ring-2 focus:ring-[#B88A44]/20" placeholder="Your name" /></div><div><label htmlFor="email" className="mb-2 block text-sm font-semibold text-[#6B1D2A]">Email</label><input id="email" name="email" type="email" autoComplete="email" className="min-h-[48px] w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-gray-800 outline-none transition focus:border-[#B88A44] focus:ring-2 focus:ring-[#B88A44]/20" placeholder="name@example.com" /></div><div><label htmlFor="serviceType" className="mb-2 block text-sm font-semibold text-[#6B1D2A]">Service interest</label><select id="serviceType" name="serviceType" className="min-h-[48px] w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-gray-800 outline-none transition focus:border-[#B88A44] focus:ring-2 focus:ring-[#B88A44]/20" defaultValue=""><option value="" disabled>Select a service area</option><option value="business">Business solutions</option><option value="consumer">Consumer services</option><option value="general">General inquiry</option></select></div><div><label htmlFor="message" className="mb-2 block text-sm font-semibold text-[#6B1D2A]">Inquiry</label><textarea id="message" name="message" rows={5} className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-gray-800 outline-none transition focus:border-[#B88A44] focus:ring-2 focus:ring-[#B88A44]/20" placeholder="Briefly describe what you need help with." /></div><button type="submit" className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-md bg-[#6B1D2A] px-6 py-4 font-semibold text-white transition-colors hover:bg-[#511520] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B88A44] focus-visible:ring-offset-2">Submit inquiry<ArrowRight className="h-4 w-4" aria-hidden="true" /></button><p className="text-xs leading-6 text-gray-500">Replace this form action with your live submission handler, secure intake workflow, or CRM integration before launch.</p></form></div></div></div></section></main><footer className="border-t-[8px] border-[#6B1D2A] bg-white py-16"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="mb-12 grid grid-cols-1 gap-12 border-b border-gray-200 pb-12 md:grid-cols-4"><div className="flex flex-col items-start"><div className="mb-6"><BrandImage src="./259357.jpg" alt="617 East Trust seal" fallbackText="Seal" className="h-32 w-32 rounded-full object-contain shadow-md" width={128} height={128} /></div><p className="mb-6 max-w-xs text-sm font-medium leading-7 text-gray-600">Your fiduciary partner in business and life. Rooted in trust, built for enduring growth.</p><div className="flex gap-4"><a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="Visit LinkedIn" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#B88A44] bg-[#F9F7F1] font-bold text-[#6B1D2A] transition-colors hover:bg-[#6B1D2A] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B88A44] focus-visible:ring-offset-2">in</a><a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="Visit X" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#B88A44] bg-[#F9F7F1] font-bold text-[#6B1D2A] transition-colors hover:bg-[#6B1D2A] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B88A44] focus-visible:ring-offset-2">𝕏</a></div></div><div><h2 className="mb-6 font-serif text-lg font-bold text-[#6B1D2A]">Business Solutions</h2><ul className="space-y-3 text-sm font-medium text-gray-600">{FOOTER_BUSINESS_LINKS.map((item) => <li key={item}><a href="#business-services" className="transition-colors hover:text-[#B88A44]">{item}</a></li>)}</ul></div><div><h2 className="mb-6 font-serif text-lg font-bold text-[#6B1D2A]">Consumer Services</h2><ul className="space-y-3 text-sm font-medium text-gray-600">{FOOTER_CONSUMER_LINKS.map((item) => <li key={item}><a href="#consumer-services" className="transition-colors hover:text-[#B88A44]">{item}</a></li>)}</ul></div><div><h2 className="mb-6 font-serif text-lg font-bold text-[#6B1D2A]">Contact Us</h2><ul className="space-y-3 text-sm font-medium text-gray-600"><li><a href="mailto:contact@617east.com" className="transition-colors hover:text-[#B88A44]">contact@617east.com</a></li><li><a href="tel:18006173278" className="transition-colors hover:text-[#B88A44]">1-800-617-EAST</a></li><li className="pt-3"><span className="inline-block rounded-md border border-[#B88A44]/30 bg-[#F9F7F1] p-3 font-bold text-[#B88A44]">Strict Confidentiality Maintained.</span></li></ul></div></div><div className="flex flex-col items-start justify-between gap-4 text-xs font-semibold text-gray-500 md:flex-row md:items-center"><p>© {year} 617 East Trust Consulting. All rights reserved.</p><div className="flex flex-wrap gap-6"><a href="/privacy-policy" className="transition-colors hover:text-[#6B1D2A]">Privacy Policy</a><a href="/terms-of-service" className="transition-colors hover:text-[#6B1D2A]">Terms of Service</a><a href="/fiduciary-disclaimer" className="transition-colors hover:text-[#6B1D2A]">Fiduciary Disclaimer</a></div></div></div></footer></div>;
}
