import React from 'react';
import { SectionHeading } from '../common/SectionHeading';
import { NewsletterForm } from '../common/NewsletterForm';

export const Newsletter = () => {
  return (
    <section className="py-20 sm:py-24 bg-olive text-cream relative overflow-hidden">
      {/* Subtle background ambient glow */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-olive-light/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-burgundy/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <SectionHeading
          subtitle="Exclusive Privileges"
          title="The Private Salon Circle"
          description="Enter your email to receive confidential invitations to rare small-batch distillations, private nose appointments, and a 15% inaugural grant."
          light
        />

        <div className="max-w-xl mx-auto mt-6">
          <NewsletterForm light />
        </div>
      </div>
    </section>
  );
};
