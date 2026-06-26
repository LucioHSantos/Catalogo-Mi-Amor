import React from 'react';
import { ShoppingBag, Eye, Heart, Phone, Sparkles, CheckCircle2, Clock } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  key?: string | number;
  product: Product;
  onViewDetails: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onDirectOrder: (product: Product) => void;
}

export default function ProductCard({
  product,
  onViewDetails,
  onAddToCart,
  onDirectOrder,
}: ProductCardProps) {
  const [isLiked, setIsLiked] = React.useState(false);

  // Format currency standard BRL
  const formatBRL = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  return (
    <article
      id={`product-card-${product.id}`}
      className={`group bg-white rounded-2xl overflow-hidden border border-rose-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between ${
        !product.available ? 'opacity-90 bg-rose-50/20' : ''
      }`}
    >
      {/* Product Image Area */}
      <div className="relative aspect-square overflow-hidden bg-rose-50/50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover select-none transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
          onClick={() => onViewDetails(product)}
        />
        
        {/* Availability Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.available ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] md:text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              Pronta Entrega
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] md:text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 shadow-sm">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              Sob Encomenda
            </span>
          )}

          {/* Special custom tags (e.g. Mais Vendido, Premium) */}
          {product.tag && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-600 text-white shadow-sm uppercase tracking-wider self-start">
              <Sparkles className="w-2.5 h-2.5" />
              {product.tag}
            </span>
          )}
        </div>

        {/* Favorite Button Overlay */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white text-rose-500 hover:text-rose-600 border border-rose-100/50 transition-all duration-200 shadow-sm"
          title="Salvar nos favoritos"
        >
          <Heart className={`w-4.5 h-4.5 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* Quick hover visual details overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-rose-950/45 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 pointer-events-none">
          <span className="text-white text-xs font-medium flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" /> Clique para ver detalhes e itens inclusos
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 md:p-5 flex flex-col flex-1 justify-between">
        <div className="mb-4">
          {/* Category Pill */}
          <span className="text-[10px] uppercase font-bold text-rose-400 tracking-wider">
            {product.category === 'buques' ? '🌹 Buquê de Flores' : '🎁 Cesta de Presentes'}
          </span>
          
          {/* Title */}
          <h3
            className="font-serif text-lg md:text-xl font-semibold text-rose-950 line-clamp-1 mt-1 group-hover:text-rose-700 transition cursor-pointer"
            onClick={() => onViewDetails(product)}
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Rich Description */}
          <p className="text-xs md:text-sm text-zinc-500 line-clamp-2 mt-2 font-light leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price & Actions Row */}
        <div>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-2xl font-bold font-sans text-rose-700">
              {formatBRL(product.price)}
            </span>
            {product.category === 'buques' && product.price > 180 && (
              <span className="text-[10px] text-zinc-400">ou 3x de {formatBRL(product.price / 3)}</span>
            )}
          </div>

          {/* Action buttons (Direct WhatsApp Link or Bag) */}
          <div className="flex flex-col gap-2" id={`actions-${product.id}`}>
            <a
              href={`https://wa.me/5522999301051?text=${encodeURIComponent(`Olá! Gostaria de fazer a encomenda do seguinte item do catálogo:\n🌹 *${product.name}*\nPreço: R$ ${product.price.toFixed(2).replace('.', ',')}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white w-full py-2.5 rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition duration-200"
            >
              <Phone className="w-3.5 h-3.5" />
              Faça sua encomenda aqui
            </a>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onViewDetails(product)}
                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border border-rose-100 text-rose-800 hover:bg-rose-50/50 hover:border-rose-200 transition duration-200"
              >
                <Eye className="w-3.5 h-3.5" />
                Detalhes
              </button>

              <button
                onClick={() => onAddToCart(product)}
                className="flex items-center justify-center gap-1.5 bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-100 px-3 py-2 rounded-xl text-xs font-medium transition duration-200"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                Adicionar
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
