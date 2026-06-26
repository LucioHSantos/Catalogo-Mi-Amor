import React from 'react';
import { X, ShoppingBag, Phone, Check, Clock, Heart, Sparkles, MessageCircle, AlertCircle } from 'lucide-react';
import { Product } from '../types';

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

      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-4xl max-w-full">
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 hover:bg-white text-rose-900 border border-rose-100 hover:scale-105 transition-all shadow-sm"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Left: Beautiful Product Image */}
            <div className="relative aspect-square md:h-full bg-rose-50/50 flex flex-col justify-between">
              <div className="relative w-full flex-1 min-h-[300px]">
                <img
                  src={selectedImage || product.image}
                  alt={product.name}
                  className="w-full h-full object-cover select-none absolute inset-0"
                  referrerPolicy="no-referrer"
                />
                
                {/* Image Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.available ? (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500 text-white shadow-md">
                      Pronta Entrega
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500 text-white shadow-md">
                      Sob Encomenda (Encomende Já)
                    </span>
                  )}
                  {product.tag && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-rose-600 text-white shadow-md">
                      <Sparkles className="w-3.5 h-3.5" />
                      {product.tag}
                    </span>
                  )}
                </div>
              </div>

              {/* Selection Options overlay/bottom bar */}
              {product.images && product.images.length > 1 && (
                <div className="p-3 bg-rose-950 border-t border-rose-900/50 flex flex-col gap-2">
                  <span className="text-[10px] text-rose-200 uppercase font-extrabold tracking-wider text-center">
                    Escolha o modelo / opção de imagem desejada:
                  </span>
                  <div className="flex justify-center gap-3">
                    {product.images.map((imgUrl, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(imgUrl)}
                        className={`relative rounded-lg overflow-hidden border-2 transition-all shadow-md bg-white w-14 h-14 shrink-0 ${
                          selectedImage === imgUrl
                            ? 'border-rose-400 scale-105 ring-2 ring-rose-500/30'
                            : 'border-white/50 hover:border-white opacity-80 hover:opacity-100'
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

            {/* Right: Product Details & Purchase controls */}
            <div className="p-6 md:p-8 flex flex-col justify-between bg-white">
              <div>
                {/* Category & Save to Favorites button */}
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs uppercase font-extrabold text-rose-500 tracking-wider">
                    {product.category === 'buques' ? '🌹 Buquê de Flores' : '🎁 Cesta Especial'}
                  </span>
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className="flex items-center gap-1 text-xs text-rose-500 hover:text-rose-600 font-medium"
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500' : ''}`} />
                    {isLiked ? 'Salvo' : 'Favoritar'}
                  </button>
                </div>

                {/* Name */}
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-rose-950 mb-3 leading-tight">
                  {product.name}
                </h2>

                {/* Prices */}
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-3xl font-extrabold font-sans text-rose-700">
                    {formatBRL(product.price * quantity)}
                  </span>
                  {quantity > 1 && (
                    <span className="text-sm text-zinc-400">
                      ({formatBRL(product.price)} cada)
                    </span>
                  )}
                </div>

                <hr className="border-rose-100 mb-4" />

                {/* Description */}
                <p className="text-sm text-zinc-600 font-light leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* Package checklist detail section */}
                {product.details && product.details.length > 0 && (
                  <div className="mb-6">
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
                <div className="bg-rose-50/50 rounded-xl p-3 border border-rose-100/50 mb-6 flex items-start gap-2.5">
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div className="text-xs text-rose-950/80">
                    <p className="font-semibold">Informação de Entrega e Retirada</p>
                    <p className="font-light mt-0.5 leading-snug">
                      {product.available 
                        ? 'Este item está disponível para retirada rápida ou entrega no mesmo dia. Consulte taxas e agendamentos.'
                        : 'Este item é sob encomenda prévia. O prazo padrão é de 24 horas. Para urgências, fale conosco pelo WhatsApp.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Purchase Controller Footer */}
              <div>
                {/* Quantity Controller Selector */}
                <div className="flex items-center justify-between mb-4 bg-rose-50/30 p-2.5 rounded-xl border border-rose-100/30">
                  <span className="text-xs font-semibold text-rose-950">Quantidade:</span>
                  <div className="flex items-center gap-3 bg-white border border-rose-100 rounded-lg p-1">
                    <button
                      onClick={handleDecrement}
                      className="p-1 px-2 text-rose-700 hover:bg-rose-50 rounded transition font-bold"
                    >
                      -
                    </button>
                    <span className="font-mono text-sm font-bold text-rose-950 min-w-4 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={handleIncrement}
                      className="p-1 px-2 text-rose-700 hover:bg-rose-50 rounded transition font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Add to Bag */}
                  <button
                    onClick={handleAddToBag}
                    className="flex items-center justify-center gap-2 border-2 border-rose-600 text-rose-700 hover:bg-rose-50 px-4 py-3 rounded-xl text-sm font-semibold transition duration-200"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Adicionar à Sacola
                  </button>

                  {/* Direct Order via WhatsApp */}
                  <button
                    onClick={() => onDirectOrder(product, quantity, selectedImage)}
                    className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition duration-200"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Faça sua encomenda aqui
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
