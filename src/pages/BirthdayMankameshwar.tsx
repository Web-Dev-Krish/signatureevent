import { Link } from 'react-router-dom';
import { Cake, Camera, Crown, Music, Sparkles, Utensils } from 'lucide-react';
import { GlassCard, GoldButton, Reveal, SectionHeader, StatCounter } from '../components/UI';

const services = [
  ['Theme Decor', 'Royal entry gate, balloon styling, floral cake table, backdrop, kids zone, and golden lounge corners.'],
  ['Food & Catering', 'Veg banquet, live chaat, snacks, mocktails, dessert counter, cake service, and custom kids menu.'],
  ['Entertainment', 'DJ, anchor, games, magic show option, family performances, and premium sound setup.'],
  ['Photography', 'Photo booth, candid coverage, reels-friendly moments, cake cutting highlights, and family portraits.']
];

export default function BirthdayMankameshwar() {
  return (
    <section className="min-h-screen bg-obsidian pt-28">
      <div className="relative overflow-hidden px-5 py-24 lg:px-8">
        <img src="/images/signature-birthday.jpg" alt="Birthday at Mankameshwar Palace" className="absolute inset-0 h-full w-full object-cover opacity-55" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/70 to-obsidian" />
        <Reveal className="relative z-10 mx-auto max-w-5xl text-center">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.45em] text-gold">Signature Birthday Experience</p>
          <h1 className="font-display text-5xl leading-tight md:text-7xl">Birthday's at Mankameshwar Palace</h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/72">A luxury birthday package for families who want a royal venue, premium decoration, delicious catering, entertainment, and smooth event management.</p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row"><GoldButton>Starting ₹85,000</GoldButton><Link to="/contact"><GoldButton variant="outline">Book Birthday</GoldButton></Link></div>
        </Reveal>
      </div>

      <section className="section-padding bg-obsidian">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <Reveal><div><p className="mb-3 text-sm font-bold uppercase tracking-[0.35em] text-gold">Experience</p><h2 className="font-display text-4xl md:text-6xl">Royal Birthday Memories With Premium Hospitality</h2><p className="mt-5 leading-9 text-white/65">Mankameshwar Palace gives your birthday a grand indoor setting with elegant seating, stage styling, cake ceremony setup, family-friendly entertainment, and curated food counters. Our team manages guest flow, decor, vendor coordination, and timing so your celebration feels effortless.</p><div className="mt-8 grid gap-5 sm:grid-cols-3"><StatCounter value={150} suffix="+" label="Birthdays Hosted" /><StatCounter value={650} suffix="" label="Guest Capacity" /><StatCounter value={4} suffix=" hrs" label="Standard Slot" /></div></div></Reveal>
          <Reveal><video src="/videos/birthday-party.mp4" controls muted loop className="h-full min-h-96 w-full rounded-[2.5rem] border border-gold/20 object-cover shadow-gold" /></Reveal>
        </div>
      </section>

      <section className="section-padding bg-charcoal">
        <SectionHeader eyebrow="Images & Clips" title="A Look Inside the Celebration" />
        <div className="mx-auto grid max-w-7xl gap-5 px-5 md:grid-cols-3 lg:px-8">
          {['/images/signature-birthday.jpg', '/images/event-birthday.jpg', '/images/venue-palace.jpg'].map(img => <img key={img} src={img} alt="Birthday celebration gallery" className="h-72 w-full rounded-[2rem] object-cover" />)}
        </div>
        <div className="mx-auto mt-6 grid max-w-7xl gap-5 px-5 md:grid-cols-2 lg:px-8"><video src="/videos/birthday-party.mp4" controls muted loop className="h-72 w-full rounded-[2rem] object-cover" /><video src="/videos/luxury-event.mp4" controls muted loop className="h-72 w-full rounded-[2rem] object-cover" /></div>
      </section>

      <section className="section-padding bg-obsidian">
        <SectionHeader eyebrow="Price & Services" title="Birthday Package Details" text="Final pricing depends on guest count, theme, menu selection, entertainment, photography, and decor scale." />
        <div className="mx-auto grid max-w-7xl gap-6 px-5 md:grid-cols-2 lg:grid-cols-4 lg:px-8">{services.map(([title, text], index) => { const Icon = [Sparkles, Utensils, Music, Camera][index]; return <Reveal key={title} delay={index * 0.05}><GlassCard className="h-full p-7"><Icon className="mb-5 h-10 w-10 text-gold" /><h3 className="font-display text-3xl">{title}</h3><p className="mt-3 leading-7 text-white/62">{text}</p></GlassCard></Reveal>; })}</div>
        <Reveal><GlassCard className="mx-auto mt-10 max-w-4xl p-7 text-center"><Cake className="mx-auto mb-4 text-gold" /><h3 className="font-display text-3xl">Recommended Budget: ₹85,000 – ₹3,50,000</h3><p className="mt-3 text-white/62">Includes base venue setup and can be upgraded with premium decor, larger catering menu, celebrity anchor, live counters, and enhanced photography.</p></GlassCard></Reveal>
      </section>

      <section className="section-padding bg-charcoal px-5"><Reveal><div className="mx-auto max-w-6xl rounded-[2.5rem] border border-gold/25 bg-gold/10 p-8 text-center md:p-14"><Crown className="mx-auto mb-5 h-12 w-12 text-gold" /><h2 className="font-display text-4xl md:text-6xl">Make Your Birthday Feel Royal</h2><p className="mx-auto mt-5 max-w-2xl text-white/65">Share the date, guest count, theme preference, and menu choice. We will send a custom birthday proposal.</p><Link to="/contact" className="mt-8 inline-block"><GoldButton>Get Birthday Quote</GoldButton></Link></div></Reveal></section>
    </section>
  );
}
