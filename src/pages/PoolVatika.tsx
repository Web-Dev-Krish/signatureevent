import { Link } from 'react-router-dom';
import { Camera, GlassWater, LifeBuoy, Music2, Sparkles, Waves } from 'lucide-react';
import { GlassCard, GoldButton, Reveal, SectionHeader, StatCounter } from '../components/UI';

const services = [
  ['Poolside Setup', 'Cabana seating, pool floats, welcome signage, towel station, changing-room coordination, and lounge decor.'],
  ['Food & Beverages', 'Mocktail bar, live snacks, grills, fruit platters, desserts, and customized resort-style menus.'],
  ['Music & Vibe', 'DJ console, poolside sound, evening lights, dance area, games, and party host option.'],
  ['Safety & Comfort', 'Pool rules briefing, lifeguard coordination, first-aid readiness, guest supervision, and clean service flow.']
];

export default function PoolVatika() {
  return (
    <section className="min-h-screen bg-obsidian pt-24">
      <div className="relative overflow-hidden px-5 py-24 lg:px-8">
        <img src="/images/signature-pool.jpg" alt="Pool party at Vatika Resort" className="absolute inset-0 h-full w-full object-cover opacity-55" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/70 to-obsidian" />
        <Reveal className="relative z-10 mx-auto max-w-5xl text-center">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.45em] text-gold">Signature Pool Experience</p>
          <h1 className="font-display text-4xl leading-tight sm:text-5xl md:text-7xl">Pool Parties at Vatika Resort</h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/72">A stylish resort pool party experience with music, cabanas, mocktails, snacks, lighting, decor, and managed guest comfort for birthdays, friend groups, and private celebrations.</p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row"><GoldButton>Starting ₹1,10,000</GoldButton><Link to="/contact"><GoldButton variant="outline">Book Pool Party</GoldButton></Link></div>
        </Reveal>
      </div>

      <section className="section-padding bg-obsidian">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <Reveal><video src="/videos/pool-party.mp4" controls muted loop className="h-full min-h-96 w-full rounded-[2.5rem] border border-gold/20 object-cover shadow-gold" /></Reveal>
          <Reveal><div><p className="mb-3 text-sm font-bold uppercase tracking-[0.35em] text-gold">Experience</p><h2 className="font-display text-4xl md:text-6xl">Resort Vibes With Premium Event Control</h2><p className="mt-5 leading-9 text-white/65">Vatika Resort is ideal for poolside celebrations where guests want a fresh, fun, and photogenic party environment. We arrange cabana styling, beverage counters, poolside snacks, DJ setup, games, and safety-managed service so the event feels energetic yet organized.</p><div className="mt-8 grid gap-5 sm:grid-cols-3"><StatCounter value={100} suffix="+" label="Pool Parties" /><StatCounter value={250} suffix="" label="Guest Capacity" /><StatCounter value={5} suffix=" hrs" label="Standard Slot" /></div></div></Reveal>
        </div>
      </section>

      <section className="section-padding bg-charcoal">
        <SectionHeader eyebrow="Images & Clips" title="Poolside Energy, Premium Comfort" />
        <div className="mx-auto grid max-w-7xl gap-5 px-5 md:grid-cols-3 lg:px-8">
          {['/images/signature-pool.jpg', '/images/venue-garden.jpg', '/images/venue-royal.jpg'].map(img => <img key={img} src={img} alt="Pool party gallery" className="h-72 w-full rounded-[2rem] object-cover" />)}
        </div>
        <div className="mx-auto mt-6 grid max-w-7xl gap-5 px-5 md:grid-cols-2 lg:px-8"><video src="/videos/pool-party.mp4" controls muted loop className="h-72 w-full rounded-[2rem] object-cover" /><video src="/videos/luxury-event.mp4" controls muted loop className="h-72 w-full rounded-[2rem] object-cover" /></div>
      </section>

      <section className="section-padding bg-obsidian">
        <SectionHeader eyebrow="Price & Services" title="Pool Party Package Details" text="Final pricing depends on guest count, food menu, DJ requirements, poolside decor, beverage counters, timing, and safety staffing." />
        <div className="mx-auto grid max-w-7xl gap-6 px-5 md:grid-cols-2 lg:grid-cols-4 lg:px-8">{services.map(([title, text], index) => { const Icon = [Waves, GlassWater, Music2, LifeBuoy][index]; return <Reveal key={title} delay={index * 0.05}><GlassCard className="h-full p-7"><Icon className="mb-5 h-10 w-10 text-gold" /><h3 className="font-display text-3xl">{title}</h3><p className="mt-3 leading-7 text-white/62">{text}</p></GlassCard></Reveal>; })}</div>
        <Reveal><GlassCard className="mx-auto mt-10 max-w-4xl p-7 text-center"><Camera className="mx-auto mb-4 text-gold" /><h3 className="font-display text-3xl">Recommended Budget: ₹1,10,000 – ₹4,25,000</h3><p className="mt-3 text-white/62">Includes base poolside setup and can be upgraded with premium DJ, enhanced lighting, live counters, mocktail specialists, and photography reels.</p></GlassCard></Reveal>
      </section>

      <section className="section-padding bg-charcoal px-5"><Reveal><div className="mx-auto max-w-6xl rounded-[2.5rem] border border-gold/25 bg-gold/10 p-8 text-center md:p-14"><Sparkles className="mx-auto mb-5 h-12 w-12 text-gold" /><h2 className="font-display text-4xl md:text-6xl">Plan Your Luxury Pool Party</h2><p className="mx-auto mt-5 max-w-2xl text-white/65">Tell us your preferred date, guest count, food style, and vibe. We will prepare a premium Vatika Resort pool party proposal.</p><Link to="/contact" className="mt-8 inline-block"><GoldButton>Get Pool Party Quote</GoldButton></Link></div></Reveal></section>
    </section>
  );
}
