import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  textColorClass?: string;
  subColorClass?: string;
  className?: string;
}

export default function Logo({
  size = 'md',
  showText = true,
  textColorClass = 'text-white',
  subColorClass = 'text-rose-300',
  className = '',
}: LogoProps) {
  // Responsive sizing configurations
  const dimensions = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32',
  }[size];

  return (
    <div className={`flex flex-col items-center justify-center text-center select-none ${className}`} id={`logo-container-${size}`}>
      <img
        src="https://res.cloudinary.com/dvbadeh7n/image/upload/v1782492314/sem_fundobranco_hzs1gf.png"
        alt="Mi Amor Floricultura Logo"
        className={`${dimensions} object-contain rounded-full`}
        referrerPolicy="no-referrer"
        id={`logo-img-${size}`}
      />
    </div>
  );
}
