import React from 'react';
import { Search, Flower, Clock, MapPin, Sparkles, Filter, SlidersHorizontal, Eye, EyeOff } from 'lucide-react';
import Logo from './Logo';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: 'all' | 'buques' | 'cestas';
  setSelectedCategory: (category: 'all' | 'buques' | 'cestas') => void;
  showUnavailable: boolean;
  setShowUnavailable: (show: boolean) => void;
  sortBy: 'recommended' | 'price-asc' | 'price-desc';
  setSortBy: (sort: 'recommended' | 'price-asc' | 'price-desc') => void;
  whatsAppNumber: string;
  setWhatsAppNumber: (num: string) => void;
}

export default function Header({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  showUnavailable,
  setShowUnavailable,
  sortBy,
  setSortBy,
  whatsAppNumber,
  setWhatsAppNumber,
}: HeaderProps) {
  const [isEditingPhone, setIsEditingPhone] = React.useState(false);
  const [tempPhone, setTempPhone] = React.useState(whatsAppNumber);

  const handleSavePhone = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanNum = tempPhone.replace(/\D/g, '');
    if (cleanNum.length >= 10) {
      setWhatsAppNumber(cleanNum);
      setIsEditingPhone(false);
    } else {
      alert('Por favor, insira um número válido com DDD (ex: 11999999999)');
    }
  };

  const formatPhoneNumber = (num: string) => {
    if (!num) return '';
    const ddd = num.slice(0, 2);
    const firstPart = num.length === 11 ? num.slice(2, 7) : num.slice(2, 6);
    const secondPart = num.length === 11 ? num.slice(7) : num.slice(6);
    return `(${ddd}) ${firstPart}-${secondPart}`;
  };

  return (
    <header className="relative w-full bg-white border-b border-rose-100" id="shop-header">
      {/* Visual Ambient Background Hero */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden bg-rose-950" id="hero-banner">
        <img
          src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=1600&auto=format&fit=crop&q=80"
          alt="Mi Amor Floricultura Banner"
          className="absolute inset-0 w-full h-full object-cover opacity-50 select-none scale-105 filter blur-[0.5px]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-rose-950 via-rose-950/60 to-transparent" />
        
        {/* Header Branding Overlay */}
        <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-200 border border-rose-400/30 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-rose-300 animate-pulse" />
              Catálogo de Flores Premium
            </span>
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <Logo size="md" showText={false} className="shadow-lg rounded-full" />
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white font-semibold tracking-wide">
              Mi Amor <span className="text-rose-300 italic font-normal">Floricultura</span>
            </h1>
          </div>
          <p className="text-rose-100/90 font-sans text-sm md:text-base max-w-2xl mt-3 font-light">
            Especialistas em criar momentos inesquecíveis. Buquês exclusivos, cestas luxuosas de presentes e chocolates, e arranjos repletos de sentimento.
          </p>
        </div>
      </div>

      {/* Info Bar (Address, Hours, Custom WhatsApp Config) */}
      <div className="bg-rose-50/50 py-3 border-b border-rose-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap gap-y-3 justify-between items-center text-xs md:text-sm text-rose-950/80">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <div className="flex items-center gap-1.5 font-medium">
              <MapPin className="w-4 h-4 text-rose-600 shrink-0" />
              <span>Entregas em toda a Região</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <Clock className="w-4 h-4 text-rose-600 shrink-0" />
              <span>Seg a Sáb: 08h às 18h</span>
            </div>
          </div>

          {/* Direct WhatsApp link at the beginning of the page */}
          <div className="flex items-center gap-2">
            <a
              href="https://wa.me/5522999301051"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-1.5 rounded-full font-bold text-xs shadow-md hover:shadow-lg transition duration-200"
              id="header-whatsapp-btn"
            >
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span>Faça sua encomenda aqui</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Search and Advanced Filtering Panel */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Categories Tab selector */}
          <div className="flex bg-rose-50 p-1 rounded-xl self-start" id="category-selector">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition duration-200 ${
                selectedCategory === 'all'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-rose-800 hover:bg-rose-100/50'
              }`}
            >
              <Flower className="w-4 h-4" />
              Todos ({selectedCategory === 'all' ? 'Ver Todos' : 'Ver'})
            </button>
            <button
              onClick={() => setSelectedCategory('buques')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition duration-200 ${
                selectedCategory === 'buques'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-rose-800 hover:bg-rose-100/50'
              }`}
            >
              <span>🌹</span>
              Buquês
            </button>
            <button
              onClick={() => setSelectedCategory('cestas')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition duration-200 ${
                selectedCategory === 'cestas'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-rose-800 hover:bg-rose-100/50'
              }`}
            >
              <span>🎁</span>
              Cestas de Presente
            </button>
          </div>

          {/* Search Box */}
          <div className="relative flex-1 max-w-md w-full" id="search-box">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-400" />
            <input
              type="text"
              placeholder="Buscar buquê, rosa, girassol, chocolates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-rose-50/20 border border-rose-100 rounded-xl pl-9 pr-4 py-2.5 text-sm placeholder-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-rose-950 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-rose-400 hover:text-rose-600 bg-rose-100/50 px-1.5 py-0.5 rounded"
              >
                Limpar
              </button>
            )}
          </div>
        </div>

        {/* Sorting and Availability Toggles */}
        <div className="mt-4 pt-4 border-t border-rose-50 flex flex-wrap items-center justify-between gap-4 text-xs md:text-sm text-rose-950/80">
          <div className="flex flex-wrap items-center gap-4">
            {/* Toggle Availability Filter */}
            <button
              onClick={() => setShowUnavailable(!showUnavailable)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border transition duration-200 ${
                showUnavailable
                  ? 'bg-rose-50 text-rose-800 border-rose-200'
                  : 'bg-emerald-50 text-emerald-800 border-emerald-200 font-medium'
              }`}
            >
              {showUnavailable ? (
                <>
                  <Eye className="w-3.5 h-3.5 text-rose-600" />
                  Mostrando: Todos os itens
                </>
              ) : (
                <>
                  <EyeOff className="w-3.5 h-3.5 text-emerald-600" />
                  Mostrando: Apenas Disponíveis
                </>
              )}
            </button>

            {/* Explanatory Note */}
            <span className="text-rose-500/80 text-xs flex items-center gap-1">
              <span>💡</span>
              Os itens sob encomenda possuem selo de "Encomenda Prévia".
            </span>
          </div>

          {/* Sort By selector */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-rose-500" />
            <span className="font-medium text-rose-900">Ordenar por:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-rose-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-rose-500 text-rose-900 font-medium"
            >
              <option value="recommended">Recomendados</option>
              <option value="price-asc">Menor Preço</option>
              <option value="price-desc">Maior Preço</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
}
