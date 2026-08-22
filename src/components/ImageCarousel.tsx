import React from 'react';
import { ChevronLeft, ChevronRight, Pause, Play, Layers } from 'lucide-react';

interface ImageCarouselProps {
  images: string[];
  alt: string;
  className?: string;
  aspectClassName?: string;
  onImageClick?: () => void;
  onSelectImage?: (imgUrl: string, index: number) => void;
  selectedIndex?: number;
  autoPlayInterval?: number;
  size?: 'card' | 'modal';
}

export default function ImageCarousel({
  images,
  alt,
  className = '',
  aspectClassName = 'aspect-square',
  onImageClick,
  onSelectImage,
  selectedIndex,
  autoPlayInterval = 3500,
  size = 'card',
}: ImageCarouselProps) {
  const normalizedImages = images && images.length > 0 ? images : [];
  const hasMultiple = normalizedImages.length > 1;

  const [internalIndex, setInternalIndex] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);

  const currentIndex = selectedIndex !== undefined ? selectedIndex : internalIndex;

  const goToNext = React.useCallback(
    (e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      if (!hasMultiple) return;
      const nextIdx = (currentIndex + 1) % normalizedImages.length;
      setInternalIndex(nextIdx);
      onSelectImage?.(normalizedImages[nextIdx], nextIdx);
    },
    [currentIndex, hasMultiple, normalizedImages, onSelectImage]
  );

  const goToPrev = React.useCallback(
    (e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      if (!hasMultiple) return;
      const prevIdx = (currentIndex - 1 + normalizedImages.length) % normalizedImages.length;
      setInternalIndex(prevIdx);
      onSelectImage?.(normalizedImages[prevIdx], prevIdx);
    },
    [currentIndex, hasMultiple, normalizedImages, onSelectImage]
  );

  const togglePause = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPaused((prev) => !prev);
  };

  // Auto-play timer
  React.useEffect(() => {
    if (!hasMultiple || isPaused || isHovered) return;

    const timer = setInterval(() => {
      const nextIdx = (currentIndex + 1) % normalizedImages.length;
      setInternalIndex(nextIdx);
      onSelectImage?.(normalizedImages[nextIdx], nextIdx);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [hasMultiple, isPaused, isHovered, currentIndex, normalizedImages, autoPlayInterval, onSelectImage]);

  if (normalizedImages.length === 0) {
    return (
      <div className={`w-full bg-rose-50 flex items-center justify-center ${aspectClassName} ${className}`}>
        <span className="text-xs text-rose-300">Sem imagem</span>
      </div>
    );
  }

  const currentImg = normalizedImages[currentIndex] || normalizedImages[0];

  return (
    <div
      className={`relative w-full overflow-hidden select-none group/carousel ${aspectClassName} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onImageClick}
    >
      {/* Images container with smooth fade transition */}
      {normalizedImages.map((img, idx) => (
        <img
          key={img + idx}
          src={img}
          alt={`${alt} - Opção ${idx + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
            idx === currentIndex ? 'opacity-100 z-0 scale-100' : 'opacity-0 z-[-1] pointer-events-none scale-95'
          } ${size === 'card' ? 'group-hover:scale-105 transition-transform duration-500' : ''}`}
          referrerPolicy="no-referrer"
        />
      ))}

      {/* Multiple Photos Controls (Only rendered if > 1 image) */}
      {hasMultiple && (
        <>
          {/* Top Indicator Badge (e.g. "Foto 1 de 2") */}
          <div className="absolute bottom-3 left-3 z-20 pointer-events-none flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-rose-950/70 text-white backdrop-blur-md shadow-sm border border-white/20">
              <Layers className="w-3 h-3 text-rose-200" />
              {currentIndex + 1} / {normalizedImages.length}
            </span>
          </div>

          {/* Navigation Controls: Prev, Pause/Play, Next */}
          <div
            className={`absolute bottom-3 right-3 z-20 flex items-center gap-1 bg-rose-950/75 backdrop-blur-md p-1 rounded-full border border-white/20 shadow-md transition-opacity duration-200 ${
              size === 'modal' ? 'opacity-100' : 'opacity-90 group-hover/carousel:opacity-100'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Retroceder (Previous) */}
            <button
              type="button"
              onClick={goToPrev}
              className="p-1.5 rounded-full text-white/90 hover:text-white hover:bg-white/20 transition-all active:scale-95"
              title="Foto anterior"
              aria-label="Foto anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Pause / Play */}
            <button
              type="button"
              onClick={togglePause}
              className={`p-1.5 rounded-full transition-all active:scale-95 ${
                isPaused
                  ? 'text-amber-300 hover:text-amber-200 bg-amber-500/20'
                  : 'text-white/90 hover:text-white hover:bg-white/20'
              }`}
              title={isPaused ? 'Iniciar rotação automática' : 'Pausar rotação automática'}
              aria-label={isPaused ? 'Play' : 'Pause'}
            >
              {isPaused ? <Play className="w-3.5 h-3.5 fill-current" /> : <Pause className="w-3.5 h-3.5 fill-current" />}
            </button>

            {/* Avançar (Next) */}
            <button
              type="button"
              onClick={goToNext}
              className="p-1.5 rounded-full text-white/90 hover:text-white hover:bg-white/20 transition-all active:scale-95"
              title="Próxima foto"
              aria-label="Próxima foto"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
