import React from 'react';

export const SectionHeading = ({
  subtitle,
  title,
  description,
  alignment = 'center',
  className = '',
  light = false,
}) => {
  const alignClasses = {
    center: 'text-center items-center',
    left: 'text-left items-start',
    right: 'text-right items-end',
  };

  return (
    <div className={`flex flex-col ${alignClasses[alignment]} mb-12 sm:mb-16 ${className}`}>
      {subtitle && (
        <span
          className={`text-xs md:text-sm font-medium tracking-[0.25em] uppercase mb-3 ${
            light ? 'text-beige' : 'text-olive'
          }`}
        >
          {subtitle}
        </span>
      )}
      <h2
        className={`text-3xl sm:text-4xl md:text-5xl font-serif font-normal tracking-wide leading-tight ${
          light ? 'text-cream' : 'text-dark'
        }`}
      >
        {title}
      </h2>
      <div
        className={`w-12 h-[1px] my-4 ${
          light ? 'bg-beige/40' : 'bg-olive/40'
        }`}
      />
      {description && (
        <p
          className={`max-w-2xl text-sm sm:text-base font-light leading-relaxed ${
            light ? 'text-cream/80' : 'text-muted'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
};
