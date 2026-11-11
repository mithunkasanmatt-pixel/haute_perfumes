import React, { useState, useEffect } from 'react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { SectionHeading } from '../components/common/SectionHeading';
import { useToast } from '../context/ToastContext';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  ChevronDown,
  Sparkles,
} from 'lucide-react';

export const Contact = () => {
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Bespoke Scent Consultation',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      addToast('Please complete all message fields.', 'error');
      return;
    }
    setIsSubmitted(true);
    addToast('Your inquiry has reached our VIP Private Concierge. An olfactory advisor will reply within 4 hours.', 'success');
    setFormData({ name: '', email: '', subject: 'Bespoke Scent Consultation', message: '' });
  };

  const faqs = [
    {
      q: 'Can I test the fragrance before opening the full bottle?',
      a: 'Yes. Every full-size flacon arrives alongside a complimentary 5ml discovery atomizer containing the identical batch extract. You may test the discovery vial first. If unsatisfied, the sealed full-size flacon can be returned within 30 days for a full refund.',
    },
    {
      q: 'What is the concentration difference in your Extrait de Parfum?',
      a: 'Our Extraits de Parfum feature a 30% to 38% pure perfume oil concentration, compared to 15-20% found in standard commercial eau de parfum. This ensures richer projection, deeper scent evolution, and over 14 hours of persistent longevity.',
    },
    {
      q: 'Do you offer private nose consultations for wedding or bespoke occasions?',
      a: 'Indeed. Our Master Nose offers private appointments at our Paris Place Vendôme atelier, Mayfair salon, or remotely via encrypted video. Please submit an inquiry selecting "Bespoke Scent Consultation".',
    },
    {
      q: 'How are international shipments handled?',
      a: 'All international orders are insured, temperature-guarded, and dispatched with DHL Express White-Glove courier. Orders exceeding $150 receive complimentary courier delivery with all duties pre-cleared.',
    },
  ];

  return (
    <div className="min-h-screen bg-cream py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: 'VIP Concierge & Salons' }]} />

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.25em] text-olive font-medium block mb-2">
            Haute Parfumerie Concierge
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-dark font-normal leading-tight">
            Connect With Our Olfactory Advisors
          </h1>
          <p className="text-xs sm:text-sm text-muted font-light mt-3 leading-relaxed">
            Whether inquiring about bespoke bridal formulations, custom flacon engraving, or private salon
            tastings, our dedicated curators remain at your service.
          </p>
        </div>

        {/* Grid: Contact Form + Salons & Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 mb-16">
          {/* Left: Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-beige/40 p-8 sm:p-12 shadow-soft">
            <h3 className="font-serif text-2xl sm:text-3xl text-dark font-normal mb-2">
              Send a Private Message
            </h3>
            <p className="text-xs text-muted font-light mb-8">
              Inquiries are treated with utmost confidentiality.
            </p>

            {isSubmitted ? (
              <div className="p-8 bg-olive/10 border border-olive/30 text-center space-y-4">
                <CheckCircle2 className="w-10 h-10 text-olive mx-auto" />
                <h4 className="font-serif text-2xl text-dark">Inquiry Dispatched</h4>
                <p className="text-xs text-muted leading-relaxed font-light max-w-md mx-auto">
                  Thank you for contacting L'Élixir Royal. Your inquiry has been routed to our Paris
                  Private Concierge salon. An olfactory advisor will connect with you shortly.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 px-6 py-2.5 bg-olive text-cream text-xs uppercase tracking-wider font-medium"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-dark font-medium block mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Baroness Camille Dupont"
                      required
                      className="w-full px-3 py-2.5 text-xs bg-white border border-beige/60 outline-none focus:border-olive text-dark"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-dark font-medium block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. camille.dupont@domain.com"
                      required
                      className="w-full px-3 py-2.5 text-xs bg-white border border-beige/60 outline-none focus:border-olive text-dark"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-dark font-medium block mb-1">
                    Nature of Inquiry
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3 py-2.5 text-xs bg-white border border-beige/60 outline-none focus:border-olive text-dark cursor-pointer"
                  >
                    <option value="Bespoke Scent Consultation">Bespoke Scent Consultation</option>
                    <option value="Flacon Monogramming & Engraving">Flacon Monogramming & Engraving</option>
                    <option value="Order Tracking & Logistics">Order Tracking & Logistics</option>
                    <option value="Private Salon Tasting Reservation">Private Salon Tasting Reservation</option>
                    <option value="Wholesale & Luxury Hospitality">Wholesale & Luxury Hospitality</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-dark font-medium block mb-1">
                    Your Message / Scent Preference *
                  </label>
                  <textarea
                    rows="5"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about the scent profiles you cherish, or details of your requested consultation..."
                    required
                    className="w-full px-3 py-2.5 text-xs bg-white border border-beige/60 outline-none focus:border-olive text-dark"
                  />
                </div>

                <button
                  type="submit"
                  className="px-8 py-4 bg-olive text-cream hover:bg-olive-dark text-xs uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-2 transition-colors shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit to Concierge</span>
                </button>
              </form>
            )}
          </div>

          {/* Right: Salons & VIP Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Salons Box */}
            <div className="bg-white border border-beige/40 p-8 shadow-soft space-y-6">
              <h3 className="font-serif text-2xl text-dark font-normal pb-3 border-b border-sand">
                Flagship Boutiques
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-olive shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-dark font-medium block">Paris Place Vendôme</strong>
                    <span className="text-muted font-light">18 Place Vendôme, 75001 Paris, France</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-olive shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-dark font-medium block">London Mayfair</strong>
                    <span className="text-muted font-light">44 New Bond Street, London W1S 2RR, UK</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-olive shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-dark font-medium block">New York Madison Avenue</strong>
                    <span className="text-muted font-light">720 Madison Avenue, New York, NY 10065</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-sand space-y-3 text-xs">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-olive shrink-0" />
                  <span className="text-dark font-medium">+33 (0)1 42 68 00 90 (International VIP)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-olive shrink-0" />
                  <span className="text-dark font-medium">concierge@lelixirroyal.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-olive shrink-0" />
                  <span className="text-muted font-light">Salon Hours: Mon–Sat, 10:00 – 19:30 CET</span>
                </div>
              </div>
            </div>

            {/* Private Consultations Banner */}
            <div className="bg-olive text-cream p-8 border border-olive-light/40 space-y-3">
              <div className="flex items-center gap-2 text-beige text-xs uppercase tracking-widest font-semibold">
                <Sparkles className="w-4 h-4" />
                <span>Private Tasting Protocol</span>
              </div>
              <h4 className="font-serif text-2xl font-normal text-cream">
                Bespoke Atelier Appointments
              </h4>
              <p className="text-xs text-cream/80 font-light leading-relaxed">
                Enjoy a private 90-minute olfactory discovery flight curated with champagne and rare botanical
                soliflores in our private mezzanine salon.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="bg-white border border-beige/40 p-8 sm:p-12 shadow-soft mb-16">
          <SectionHeading
            subtitle="Guidance & Protocol"
            title="Frequently Asked Questions"
            description="Clear answers regarding our rare distillations, sample guarantees, and deliveries."
          />

          <div className="space-y-4 max-w-3xl mx-auto">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-sand">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-sand/15 transition-colors"
                >
                  <span className="font-serif text-base sm:text-lg text-dark font-medium">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-olive transition-transform duration-200 ${
                      openFaq === idx ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-muted leading-relaxed font-light border-t border-sand/40">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
