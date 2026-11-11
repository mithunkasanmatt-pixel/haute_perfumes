import React, { useEffect } from 'react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { SectionHeading } from '../components/common/SectionHeading';
import { Sparkles, Compass, ShieldCheck, Clock, Award } from 'lucide-react';

export const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const timeline = [
    {
      year: '1894',
      title: 'Foundation in Grasse',
      desc: 'Master botanical distiller Henri de Valois establishes the private atelier nestled among the jasmine and rose fields of Grasse, Provence.',
    },
    {
      year: '1925',
      title: 'The Paris Place Vendôme Salon',
      desc: 'Commissioned by royalty and European diplomats, the private salon opens its doors at 18 Place Vendôme, catering to high society.',
    },
    {
      year: '1978',
      title: 'The Agarwood Expedition',
      desc: 'The house initiates sustainable cultivation partnerships in Southeast Asia, acquiring rare vintage 30-year distilled Cambodian oud.',
    },
    {
      year: 'Today',
      title: 'Contemporary Haute Parfumerie',
      desc: 'Continuing an uncompromised lineage of cold-cellar maturation, handcrafted crystal flacons, and limited-run artistic extracts.',
    },
  ];

  return (
    <div className="min-h-screen bg-cream py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: 'The Maison Heritage' }]} />

        {/* Hero Editorial Header */}
        <div className="relative h-[480px] sm:h-[560px] overflow-hidden border border-beige/40 mb-16 shadow-soft">
          <img
            src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1800&q=80"
            alt="Maison Craftsmanship"
            className="w-full h-full object-cover object-center filter brightness-75 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/95 via-dark/40 to-transparent" />

          <div className="absolute bottom-8 sm:bottom-14 left-6 sm:left-14 right-6 sm:right-14 text-cream max-w-3xl">
            <span className="text-xs uppercase tracking-[0.3em] text-beige font-medium block mb-3">
              Founded 1894 • Grasse & Paris
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal leading-tight mb-4">
              The Alchemy of Rare Botanicals
            </h1>
            <p className="text-xs sm:text-base text-cream/80 font-light leading-relaxed">
              We do not mass-produce perfume. We bottle liquid memory, aristocratic elegance,
              and centuries of French olfactory mastery.
            </p>
          </div>
        </div>

        {/* Brand Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 bg-white border border-beige/40 p-8 sm:p-14 mb-16 shadow-soft">
          <div className="lg:col-span-5 flex flex-col justify-center">
            <span className="text-xs uppercase tracking-[0.25em] text-olive font-medium block mb-2">
              Our Guiding Philosophy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-dark font-normal leading-snug mb-6">
              "A scent must arrive before you, and linger after you have departed."
            </h2>
            <div className="w-12 h-[1px] bg-olive mb-6" />
            <p className="text-xs sm:text-sm text-muted font-light leading-relaxed mb-4">
              At L'Élixir Royal, fragrance is elevated beyond an accessory. It is an aura. We exclusively
              distill top-tier natural botanical absolutes, cold-pressed citrus rinds, and aged resins.
            </p>
            <p className="text-xs sm:text-sm text-muted font-light leading-relaxed">
              Where the modern commercial industry relies upon synthetic shortcuts and swift industrial
              cycles, our master noses demand a mandatory minimum of six months in temperature-controlled
              subterranean oak caves.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="aspect-[4/5] bg-sand/30 border border-beige/40 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80"
                alt="Flacon Craft"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="aspect-[4/5] bg-sand/30 border border-beige/40 overflow-hidden sm:mt-8">
              <img
                src="https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80"
                alt="Rose Harvest"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>

        {/* Four Pillars of Haute Parfumerie */}
        <div className="mb-16">
          <SectionHeading
            subtitle="Pillars of Excellence"
            title="The Unrivaled Standard"
            description="Our uncompromising protocol ensures each flacon is an irreplaceable work of art."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-white border border-beige/40 luxury-card space-y-4">
              <div className="w-12 h-12 bg-olive/10 border border-olive/30 text-olive flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl text-dark font-normal">Grasse Flora Sourcing</h3>
              <p className="text-xs sm:text-sm text-muted font-light leading-relaxed">
                Hand-harvested at dawn before the Mediterranean sun evaporates delicate dew from Centifolia
                rose and jasmine grandiflorum blossoms.
              </p>
            </div>

            <div className="p-8 bg-white border border-beige/40 luxury-card space-y-4">
              <div className="w-12 h-12 bg-olive/10 border border-olive/30 text-olive flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl text-dark font-normal">Slow Cellar Maceration</h3>
              <p className="text-xs sm:text-sm text-muted font-light leading-relaxed">
                No chemical stabilizers. We allow raw resins, ambergris, and oud woods to marry naturally
                in dark cellars until reaching full sillage maturity.
              </p>
            </div>

            <div className="p-8 bg-white border border-beige/40 luxury-card space-y-4">
              <div className="w-12 h-12 bg-olive/10 border border-olive/30 text-olive flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl text-dark font-normal">Wax-Sealed Flaconnage</h3>
              <p className="text-xs sm:text-sm text-muted font-light leading-relaxed">
                Custom hand-blown crystal bottles with heavyweight brass caps, hand-engraved batch numbers,
                and hot-wax stamps of authenticity.
              </p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white border border-beige/40 p-8 sm:p-14 mb-16 shadow-soft">
          <SectionHeading
            subtitle="Chronicles of Scent"
            title="Our Fragrance Journey"
            description="Over a century of aromatic devotion across generations of master noses."
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {timeline.map((step, idx) => (
              <div key={idx} className="space-y-3 relative">
                <span className="font-serif text-3xl font-bold text-olive block">
                  {step.year}
                </span>
                <div className="w-full h-[2px] bg-beige/60" />
                <h4 className="font-serif text-lg text-dark font-medium">{step.title}</h4>
                <p className="text-xs text-muted font-light leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
