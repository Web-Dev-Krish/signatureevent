import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Logo from './Logo';

interface Milestone {
  year: string;
  title: string;
  description: string;
}

const milestones: Milestone[] = [
  {
    year: '2005',
    title: 'The Beginning',
    description: 'Malhotra Events was founded on a single promise — every celebration deserves to feel extraordinary.',
  },
  {
    year: '2010',
    title: '100 Events Milestone',
    description: 'Crossed our first major milestone, building a reputation for flawless execution across the region.',
  },
  {
    year: '2015',
    title: 'Premium Venue Partnerships',
    description: "Partnered with the city's finest venues to offer curated, end-to-end celebration spaces.",
  },
  {
    year: '2018',
    title: 'Award Winning Recognition',
    description: 'Recognized as a leading luxury event organizer, honored for creativity and client satisfaction.',
  },
  {
    year: '2021',
    title: 'Signature Catering Launch',
    description: "Introduced Malhotra Catering, bringing bespoke culinary experiences to every event we host.",
  },
  {
    year: '2024',
    title: '1000+ Events Executed',
    description: 'Celebrated over a thousand weddings, corporate galas, and milestone occasions with the same passion as our first.',
  },
];

function MilestoneCard({ m }: { m: Milestone }) {
  return (
    <div className="glass-card w-full p-6 md:p-8">
      <span className="inline-block mb-3 rounded-full bg-[#D4AF37] px-3 py-1 text-xs font-bold uppercase tracking-widest text-black">
        {m.year}
      </span>
      <h3 className="mb-2 text-xl font-serif font-bold text-white md:text-2xl">{m.title}</h3>
      <p className="text-sm leading-relaxed text-gray-400 md:text-base">{m.description}</p>
    </div>
  );
}

export default function AchievementsTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 75%', 'end 55%'],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="mb-24">
      <div className="mx-auto mb-16 max-w-2xl text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-[#D4AF37]">Our Journey</p>
        <h2 className="font-serif text-3xl font-bold text-white md:text-5xl">Achievements Timeline</h2>
        <p className="mt-4 text-gray-400">Two decades of milestones, built one unforgettable event at a time.</p>
      </div>

      <div ref={containerRef} className="relative">
        {/* Static base line — mobile (left) and desktop (center) */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent md:left-1/2" />
        {/* Animated gold line that draws downward as you scroll */}
        <motion.div
          style={{ scaleY: lineScale }}
          className="absolute left-6 top-0 bottom-0 w-px origin-top bg-gradient-to-b from-[#D4AF37] to-[#F4D03F] md:left-1/2"
        />

        <div className="space-y-14 md:space-y-0">
          {milestones.map((m, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div
                key={m.year}
                className="relative md:grid md:grid-cols-2 md:items-center md:gap-16 md:py-10"
              >
                {/* Middle dot — carries the site's SVG logo */}
                <div className="absolute left-6 top-0 z-10 -translate-x-1/2 md:left-1/2 md:top-1/2 md:-translate-y-1/2">
                  <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border-2 border-[#D4AF37] bg-[#0B0B0B] p-1.5 shadow-lg shadow-black/50">
                    <Logo className="h-full w-full rounded-full" />
                  </div>
                </div>

                {isLeft ? (
                  <>
                    <motion.div
                      initial={{ opacity: 0, x: -40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                      className="pl-16 md:pl-0 md:pr-16 md:text-right"
                    >
                      <MilestoneCard m={m} />
                    </motion.div>
                    <div className="hidden md:block" />
                  </>
                ) : (
                  <>
                    <div className="hidden md:block" />
                    <motion.div
                      initial={{ opacity: 0, x: 40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                      className="pl-16 md:pl-16"
                    >
                      <MilestoneCard m={m} />
                    </motion.div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
