import { type ReactNode, useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeader({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <Reveal className="mx-auto mb-14 max-w-3xl text-center">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-[#F5C518]">{eyebrow}</p>
      <h2 className="font-display text-4xl leading-tight text-[#E8F4FD] md:text-6xl">{title}</h2>
      {text && <p className="mt-5 text-base leading-8 text-[#6A9AB8] md:text-lg">{text}</p>}
    </Reveal>
  );
}

export function GoldButton({ children, className = '', variant = 'solid' }: { children: ReactNode; className?: string; variant?: 'solid' | 'outline' }) {
  const styles = variant === 'solid'
    ? 'bg-gradient-to-r from-[#F5C518] to-[#FFE066] text-[#0B1929] shadow-lg shadow-[#F5C518]/20'
    : 'border border-[#F5C518]/40 bg-transparent text-[#F5C518] hover:bg-[#F5C518]/10';
  return <span className={`inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-bold uppercase tracking-[0.18em] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_25px_rgba(245,197,24,0.25)] ${styles} ${className}`}>{children}</span>;
}

export function GlassCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-white/[0.06] bg-[#0B1929]/[0.03] shadow-2xl shadow-black/40 backdrop-blur-xl ${className}`}>{children}</div>;
}

export function StatCounter({ value, suffix = '', label }: { value: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <div ref={ref} className="rounded-2xl border border-[#F5C518]/20 bg-[#0F2440] p-6 text-center">
      <div className="font-display text-4xl text-[#F5C518] md:text-5xl">{count}{suffix}</div>
      <p className="mt-2 text-sm uppercase tracking-[0.18em] text-[#6A9AB8]">{label}</p>
    </div>
  );
}

export function FAQAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={item.q} className="overflow-hidden rounded-xl border border-white/[0.06] bg-[#0F2440]">
          <button onClick={() => setOpen(open === index ? -1 : index)} className="flex w-full items-center justify-between gap-4 p-5 text-left text-[#E8F4FD] hover:bg-[#0B1929]/[0.02] transition-colors">
            <span className="font-semibold">{item.q}</span>
            <ChevronDown className={`h-5 w-5 text-[#F5C518] transition-transform duration-300 ${open === index ? 'rotate-180' : ''}`} />
          </button>
          {open === index && <div className="px-5 pb-5 leading-7 text-[#6A9AB8]">{item.a}</div>}
        </div>
      ))}
    </div>
  );
}

export const faqs = [
  { q: 'Can I customize decor and catering?', a: 'Yes. Every booking includes a consultation where we tailor decor, menus, seating, lighting, and guest flow to your event vision.' },
  { q: 'Do you support same-day venue visits?', a: 'Our concierge can arrange priority walkthroughs based on venue availability. Contact us and we will coordinate a private tour.' },
  { q: 'Are vendors included in packages?', a: 'We offer trusted vendor packages for decor, photography, entertainment, valet, makeup rooms, and premium hospitality teams.' }
];
