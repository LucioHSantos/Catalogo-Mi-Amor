import React from 'react';
import { X, ShoppingBag, Phone, Check, Clock, Heart, Sparkles, MessageCircle, AlertCircle } from 'lucide-react';
import { Product } from '../types';
import ImageCarousel from './ImageCarousel';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onDirectOrder: (product: Product, quantity: number, selectedImage?: string) => void;
}

export default function ProductModal({
  product,
  onClose,
  onAddToCart,
  onDirectOrder,
}: ProductModalProps) {
  const [quantity, setQuantity] = React.useState(1);
  const [isLiked, setIsLiked] = React.useState(false);
  const [showAddedToast, setShowAddedToast] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState<string>('');

  React.useEffect(() => {
    if (product) {
      setQuantity(1);
      setIsLiked(false);
      setShowAddedToast(false);
      setSelectedImage(product.image);
    }
  }, [product]);

  if (!product) return null;

  const productImages = product.images && product.images.length > 0 
    ? product.images 
    : [product.image];

  const selectedIndex = productImages.indexOf(selectedImage) >= 0 
    ? productImages.indexOf(selectedImage) 
    : 0;

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const formatBRL = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const handleAddToBag = () => {
    onAddToCart(product, quantity);
    setShowAddedToast(true);
    setTimeout(() => {
      setShowAddedToast(false);
      onClose();
    }, 1200);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      id="product-detail-modal"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-rose-950/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-3 sm:p-6 text-center">
        <div className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all my-4 sm:my-8 w-full max-w-4xl max-h-[92vh] flex flex-col">
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-40 p-2.5 rounded-full bg-white/90 hover:bg-white text-rose-900 border border-rose-200 hover:scale-105 transition-all shadow-md"
            title="Fechar"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Main Modal Body: 2 independent columns on desktop */}
          <div className="flex flex-col md:flex-row flex-1 min-h-0 overflow-y-auto md:overflow-hidden">
            
            {/* Left Column: Product Image & Multiple Image Switcher */}
            <div className="w-full md:w-1/2 bg-rose-50/40 flex flex-col justify-between border-b md:border-b-0 md:border-r border-rose-100 shrink-0 md:h-full md:overflow-hidden">
              <div className="relative w-full aspect-square md:aspect-auto md:flex-1 min-h-[280px] sm:min-h-[360px] md:min-h-0 bg-rose-50/60 overflow-hidden flex items-center justify-center">
                <ImageCarousel
                  images={productImages}
                  alt={product.name}
                  selectedIndex={selectedIndex}
                  onSelectImage={(imgUrl) => setSelectedImage(imgUrl)}
                  aspectClassName="w-full h-full min-h-[280px] sm:min-h-[360px] md:min-h-0"
                  size="modal"
                />
                
                {/* Image Badges */}
                <div className="absolute top-4 left-4 z-20 flex flex-col gap-2 max-w-[80%] pointer-events-none">
                  {product.available ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500 text-white shadow-md">
                      Entrega em até duas horas em Macaé
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-zinc-900/90 text-rose-200 border border-rose-900/50 shadow-md backdrop-blur">
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                      Indisponível no Momento
                    </span>
                  )}
                  {product.tag && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-rose-600 text-white shadow-md self-start">
                      <Sparkles className="w-3.5 h-3.5" />
                      {product.tag}
                    </span>
                  )}
                </div>
              </div>

              {/* Selection Options overlay/bottom bar */}
              {productImages.length > 1 && (
                <div className="p-3.5 bg-rose-950/95 backdrop-blur border-t border-rose-900/50 flex flex-col gap-2 shrink-0 z-20">
                  <span className="text-[10px] text-rose-200 uppercase font-extrabold tracking-wider text-center">
                    Modelos disponíveis ({productImages.length} fotos):
                  </span>
                  <div className="flex justify-center gap-3 overflow-x-auto py-1">
                    {productImages.map((imgUrl, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedImage(imgUrl)}
                        className={`relative rounded-lg overflow-hidden border-2 transition-all shadow-md bg-white w-14 h-14 shrink-0 ${
                          selectedImage === imgUrl
                            ? 'border-rose-400 scale-105 ring-2 ring-rose-500/30'
                            : 'border-white/50 hover:border-white opacity-75 hover:opacity-100'
                        }`}
                        title={`Opção de Imagem ${idx + 1}`}
                      >
                        <img
                          src={imgUrl}
                          alt={`Opção ${idx + 1}`}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-black/65 text-white text-[9px] font-bold py-0.5 text-center">
                          Opção {idx + 1}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Product Details & Purchase controls */}
            <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between bg-white overflow-y-auto max-h-[65vh] md:max-h-full">
              <div className="space-y-4">
                {/* Category & Save to Favorites button */}
                <div className="flex justify-between items-center">
                  <span className="text-xs uppercase font-extrabold text-rose-500 tracking-wider">
                    {product.category === 'buques' ? '🌹 Buquê de Flores' : '🎁 Cesta Especial'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsLiked(!isLiked)}
                    className="flex items-center gap-1 text-xs text-rose-500 hover:text-rose-600 font-medium"
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500' : ''}`} />
                    {isLiked ? 'Salvo' : 'Favoritar'}
                  </button>
                </div>

                {/* Name */}
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-rose-950 leading-tight">
                  {product.name}
                </h2>

                {/* Prices */}
                <div className="flex flex-wrap items-baseline gap-3">
                  {product.originalPrice && (
                    <span className="text-lg font-sans line-through text-zinc-400">
                      {formatBRL(product.originalPrice * quantity)}
                    </span>
                  )}
                  <span className="text-3xl font-extrabold font-sans text-rose-700">
                    {formatBRL(product.price * quantity)}
                  </span>
                  {quantity > 1 && (
                    <span className="text-sm text-zinc-400">
                      ({formatBRL(product.price)} cada)
                    </span>
                  )}
                  {product.originalPrice && (
                    <span className="inline-flex items-center px-2 py-1 rounded bg-rose-100 text-rose-700 font-bold text-xs animate-pulse">
                      Economize {formatBRL((product.originalPrice - product.price) * quantity)}!
                    </span>
                  )}
                </div>

                <hr className="border-rose-100" />

                {/* Description */}
                <div>
                  <h3 className="text-xs font-bold uppercase text-rose-950 tracking-wider mb-1.5">
                    Descrição:
                  </h3>
                  <p className="text-sm md:text-base text-zinc-600 font-light leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Package checklist detail section */}
                {product.details && product.details.length > 0 && (
                  <div className="pt-2">
                    <h3 className="text-xs font-bold uppercase text-rose-950 tracking-wider mb-2.5 flex items-center gap-1.5">
                      <span>✓</span> O que está incluído nesta opção:
                    </h3>
                    <ul className="space-y-2">
                      {product.details.map((detail, index) => (
                        <li key={index} className="flex items-start gap-2 text-xs md:text-sm text-zinc-600">
                          <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="font-light">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Delivery details message */}
                <div className={`rounded-xl p-3.5 border flex items-start gap-2.5 ${
                  product.available
                    ? 'bg-rose-50/60 border-rose-100/60'
                    : 'bg-zinc-50 border-zinc-200'
                }`}>
                  <AlertCircle className={`w-5 h-5 shrink-0 mt-0.5 ${product.available ? 'text-rose-600' : 'text-zinc-500'}`} />
                  <div className="text-xs text-rose-950/80">
                    <p className="font-semibold">{product.available ? 'Informação de Pronta-Entrega' : 'Status de Disponibilidade'}</p>
                    <p className="font-light mt-0.5 leading-snug">
                      {product.available 
                        ? 'Este item está disponível para pronta-entrega ou retirada rápida em até duas horas em Macaé. Consulte taxas e agendamentos.'
                        : 'Este item encontra-se indisponível para pronta-entrega no momento. Fale conosco pelo WhatsApp para consultar prazos de reposição ou fazer uma encomenda futura.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Purchase Controller Footer */}
              <div className="pt-6 mt-4 border-t border-rose-100/60">
                {/* Quantity Controller Selector */}
                <div className="flex items-center justify-between mb-4 bg-rose-50/40 p-2.5 rounded-xl border border-rose-100/40">
                  <span className="text-xs font-semibold text-rose-950">Quantidade:</span>
                  <div className="flex items-center gap-3 bg-white border border-rose-200 rounded-lg p-1">
                    <button
                      type="button"
                      onClick={handleDecrement}
                      className="p-1 px-2.5 text-rose-700 hover:bg-rose-50 rounded transition font-bold text-sm"
                    >
                      -
                    </button>
                    <span className="font-mono text-sm font-bold text-rose-950 min-w-4 text-center">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={handleIncrement}
                      className="p-1 px-2.5 text-rose-700 hover:bg-rose-50 rounded transition font-bold text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Add to Bag */}
                  <button
                    type="button"
                    onClick={handleAddToBag}
                    className="flex items-center justify-center gap-2 border-2 border-rose-600 text-rose-700 hover:bg-rose-50 px-4 py-3 rounded-xl text-sm font-semibold transition duration-200 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Adicionar à Sacola
                  </button>

                  {/* Direct Order via WhatsApp */}
                  <button
                    type="button"
                    onClick={() => onDirectOrder(product, quantity, selectedImage)}
                    className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition duration-200 cursor-pointer text-white ${
                      product.available
                        ? 'bg-emerald-600 hover:bg-emerald-700'
                        : 'bg-zinc-800 hover:bg-zinc-900'
                    }`}
                  >
                    <MessageCircle className="w-4 h-4" />
                    {product.available ? 'Faça sua encomenda aqui' : 'Consultar no WhatsApp'}
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Added to Bag Toast confirmation overlay */}
          {showAddedToast && (
            <div className="absolute inset-0 z-30 bg-white/95 flex flex-col items-center justify-center text-center animate-fade-in">
              <div className="p-3 bg-emerald-500 rounded-full text-white mb-2 shadow-lg scale-110">
                <Check className="w-8 h-8" />
              </div>
              <p className="font-serif text-xl font-bold text-rose-950">Adicionado à Sacola!</p>
              <p className="text-sm text-zinc-500 mt-1">Sua sacola foi atualizada.</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
