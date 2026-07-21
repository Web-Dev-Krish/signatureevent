import { Link } from 'react-router-dom';
import { Cake, Crown, PartyPopper, Waves } from 'lucide-react';
import { GlassCard, GoldButton, Reveal, SectionHeader } from '../components/UI';

const signatureEvents = [
  {
    title: "Birthday's at Mankameshwar Palace",
    path: '/signature-events/birthday-mankameshwar',
    image: 'https://xaaqlitnmzuihgjwaqwt.supabase.co/storage/v1/object/public/media/birthday.jpeg',
    icon: Cake,
    price: 'Starting ₹85,000',
    text: 'Royal birthday celebrations with luxury cake styling, themed decor, DJ, catering, photo booth, and premium guest service.'
  },
  {
    title: 'Pool Parties at Vatika Resort',
    path: '/signature-events/pool-vatika',
    image: 'https://xaaqlitnmzuihgjwaqwt.supabase.co/storage/v1/object/public/media/birthday.jpeg',
    icon: Waves,
    price: 'Starting ₹1,10,000',
    text: 'Resort-style pool parties with cabana setup, mocktail bar, live snacks, music, lighting, and safety-managed poolside service.'
  }
];

export default function SignatureEvents() {
  return (
    <section className="min-h-screen bg-obsidian pt-28">
      <div className="relative overflow-hidden px-5 py-24 lg:px-8">
        <img src="https://xaaqlitnmzuihgjwaqwt.supabase.co/storage/v1/object/public/media/homehero.jpeg" alt="Signature luxury events" className="absolute inset-0 h-full w-full object-cover opacity-45" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.24),rgba(0,0,0,0.88)_64%)]" />
        <Reveal className="relative z-10 mx-auto max-w-5xl text-center">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.45em] text-gold">Signature Events</p>
          <h1 className="font-display text-5xl leading-tight md:text-7xl">Exclusive Celebrations Designed by MalhotraEvents</h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/72">Explore our two most popular ready-to-book experiences: premium birthday parties at Mankameshwar Palace and luxury pool parties at Vatika Resort.</p>
        </Reveal>
      </div>

      <section className="section-padding bg-obsidian">
        <SectionHeader eyebrow="Choose Your Experience" title="Two Signature Event Packages" text="Each package includes venue coordination, decor direction, catering support, entertainment planning, and guest experience management." />
        <div className="mx-auto grid max-w-6xl gap-8 px-5 lg:grid-cols-2 lg:px-8">
          {signatureEvents.map((event, index) => {
            const Icon = event.icon;
            return (
              <Reveal key={event.path} delay={index * 0.08}>
                <Link to={event.path} className="group block overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.045] shadow-2xl transition hover:-translate-y-3 hover:border-gold/40 hover:shadow-gold">
                  <div className="relative h-80 overflow-hidden">
                    <img src={event.image} alt={event.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                    <span className="absolute left-6 top-6 grid h-14 w-14 place-items-center rounded-full bg-black/70 text-gold backdrop-blur"><Icon /></span>
                    <span className="absolute bottom-6 right-6 rounded-full bg-gold px-5 py-3 text-sm font-black text-black">{event.price}</span>
                  </div>
                  <div className="p-7">
                    <h2 className="font-display text-4xl">{event.title}</h2>
                    <p className="mt-4 leading-8 text-white/65">{event.text}</p>
                    <GoldButton className="mt-7 w-full">View Details</GoldButton>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="section-padding bg-charcoal px-5">
        <Reveal>
          <GlassCard className="mx-auto max-w-6xl p-8 text-center md:p-14">
            <Crown className="mx-auto mb-5 h-12 w-12 text-gold" />
            <h2 className="font-display text-4xl md:text-6xl">Want a Fully Custom Signature Event?</h2>
            <p className="mx-auto mt-5 max-w-2xl leading-8 text-white/65">Our team can combine catering, decor, entertainment, and venue styling into a custom birthday, pool party, anniversary, or private celebration.</p>
            <Link to="/contact" className="mt-8 inline-block"><GoldButton>Book Consultation</GoldButton></Link>
          </GlassCard>
        </Reveal>
      </section>
    </section>
  );
}
