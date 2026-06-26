import React from 'react';
import { ShoppingBag, Sparkles, MessageCircle, ArrowUp, ArrowRight, Heart, Info, AlertTriangle } from 'lucide-react';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import Logo from './components/Logo';
import { CATALOG } from './data';
import { Product, CartItem } from './types';

export default function App() {
  // Primary Search and Filter States
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<'all' | 'buques' | 'cestas'>('all');
  const [showUnavailable, setShowUnavailable] = React.useState(false); // Default false = Page 1 of PDF (show available only, or label unavailable)
  const [sortBy, setSortBy] = React.useState<'recommended' | 'price-asc' | 'price-desc'>('recommended');
  
  // WhatsApp Configuration (Fixed phone: 5522999301051 as requested)
  const whatsAppNumber = '5522999301051';

  // Shopping Cart State
  const [cartItems, setCartItems] = React.useState<CartItem[]>(() => {
    const saved = localStorage.getItem('mi_amor_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Modal & Drawer State
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const [showBackToTop, setShowBackToTop] = React.useState(false);

  React.useEffect(() => {
    localStorage.setItem('mi_amor_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Handle Scroll to toggle Back-To-Top button
  React.useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cart operations
  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.product.id === product.id);
      if (existing) {
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { product, quantity }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    if (window.confirm('Deseja realmente esvaziar a sua sacola?')) {
      setCartItems([]);
    }
  };

  // Direct checkout single item (useful for Out of Stock or instant ordering)
  const handleDirectOrder = (product: Product, quantity: number = 1, selectedImage?: string) => {
    const totalVal = (product.price * quantity).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
    
    const availabilityBadge = product.available ? 'Pronta Entrega' : 'Sob Encomenda 🕒';
    
    let optionText = '';
    if (product.images && selectedImage) {
      const idx = product.images.indexOf(selectedImage);
      if (idx !== -1) {
        optionText = ` (Opção ${idx + 1} do catálogo)`;
      }
    }
    
    let text = `🌸 *CONTATO DE INTERESSE - MI AMOR FLORICULTURA* 🌸\n\n`;
    text += `Olá! Fiquei muito interessado(a) no seguinte produto do catálogo:\n\n`;
    text += `• *${quantity}x ${product.name}${optionText}*\n`;
    text += `  _Status: ${availabilityBadge}_\n`;
    text += `  _Valor Unitário: R$ ${product.price.toFixed(2).replace('.', ',')}_\n`;
    text += `  _Subtotal: ${totalVal}_\n\n`;
    if (selectedImage) {
      text += `  _Link da imagem escolhida:_ ${selectedImage}\n\n`;
    }
    text += `Poderia me informar a disponibilidade e prazo de entrega para meu endereço?\n\n`;
    text += `_Interesse enviado via Catálogo Mi Amor_ ✨`;

    const encoded = encodeURIComponent(text);
    window.open(`https://api.whatsapp.com/send?phone=${whatsAppNumber}&text=${encoded}`, '_blank', 'referrerPolicy=no-referrer');
  };

  // Filter Catalog logic based on Category, Search query and Stock Availability
  const filteredProducts = React.useMemo(() => {
    let result = [...CATALOG];

    // 1. Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // 2. Filter by availability (if showUnavailable is false, we filter out unavailable ones)
    if (!showUnavailable) {
      result = result.filter((p) => p.available);
    }

    // 3. Filter by search query (case-insensitive on name, description, details or tags)
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tag?.toLowerCase().includes(q) ||
          p.details?.some((d) => d.toLowerCase().includes(q))
      );
    }

    // 4. Sort by criteria
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [selectedCategory, showUnavailable, searchQuery, sortBy]);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-rose-50/15 font-sans text-rose-950 flex flex-col justify-between selection:bg-rose-200 selection:text-rose-900" id="app-root">
      
      {/* Top micro announcement bar */}
      <div className="bg-rose-600 text-white py-1.5 px-4 text-center text-[11px] md:text-xs font-semibold tracking-wider flex items-center justify-center gap-1.5 shadow-sm">
        <Sparkles className="w-3.5 h-3.5 animate-bounce" />
        <span>FAÇA SUA ENCOMENDA DIRETO PELO WHATSAPP 🌸</span>
      </div>

      {/* Header View */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        showUnavailable={showUnavailable}
        setShowUnavailable={setShowUnavailable}
        sortBy={sortBy}
        setSortBy={setSortBy}
        whatsAppNumber={whatsAppNumber}
        setWhatsAppNumber={() => {}}
      />

      {/* Main Catalog Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full" id="catalog-main">
        
        {/* Active Filters Display & Catalog Summary */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 bg-white p-4 rounded-xl border border-rose-100/50">
          <div className="text-sm">
            Mostrando <span className="font-bold text-rose-700">{filteredProducts.length}</span>{' '}
            {filteredProducts.length === 1 ? 'opção exclusiva' : 'opções exclusivas'}{' '}
            {selectedCategory === 'buques' ? 'de buquês' : selectedCategory === 'cestas' ? 'de cestas' : 'de presentes'}
          </div>

          {/* Quick toggle info block */}
          <div className="flex items-center gap-2 text-xs text-rose-800 bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-100/30">
            <Info className="w-3.5 h-3.5 text-rose-600" />
            <span>Preços informados em Reais (BRL). Aceitamos Pix e Cartões.</span>
          </div>
        </div>

        {/* Empty Catalog State */}
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-16 px-4 bg-white rounded-2xl border border-rose-100/80">
            <div className="text-rose-300 text-5xl mb-4">🔍</div>
            <h3 className="font-serif text-xl font-bold text-rose-950">Nenhum buquê ou cesta encontrado</h3>
            <p className="text-sm text-zinc-500 max-w-md mt-2 font-light leading-relaxed">
              Não encontramos resultados correspondentes a "{searchQuery}" com as opções de filtros selecionadas.
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-5">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setShowUnavailable(true);
                }}
                className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition shadow-md"
              >
                Limpar Todos os Filtros
              </button>
              <button
                onClick={() => setSearchQuery('Rosas')}
                className="bg-rose-50 hover:bg-rose-100 text-rose-800 text-xs font-semibold px-4 py-2.5 rounded-xl transition border border-rose-200"
              >
                Buscar "Rosas"
              </button>
              <button
                onClick={() => setSearchQuery('Cesta')}
                className="bg-rose-50 hover:bg-rose-100 text-rose-800 text-xs font-semibold px-4 py-2.5 rounded-xl transition border border-rose-200"
              >
                Buscar "Cesta"
              </button>
            </div>
          </div>
        ) : (
          /* Products Grid with nice entry layout */
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            id="products-grid"
          >
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={setSelectedProduct}
                onAddToCart={(prod) => handleAddToCart(prod, 1)}
                onDirectOrder={(prod) => handleDirectOrder(prod, 1)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Elegant, detailed Portuguese Footer */}
      <footer className="bg-rose-950 text-rose-100 py-12 border-t-4 border-rose-600 mt-16" id="shop-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Column 1: Brand & Bio */}
            <div className="flex flex-col items-start gap-4">
              <div className="flex items-center gap-3">
                <Logo size="sm" showText={false} className="shadow-md rounded-full bg-white/10 p-0.5 border border-white/20" />
                <h3 className="font-serif text-2xl font-bold text-white tracking-wide">
                  Mi Amor <span className="text-rose-300 italic font-normal">Floricultura</span>
                </h3>
              </div>
              <p className="text-xs text-rose-200/75 leading-relaxed font-light">
                Levando amor, alegria e sofisticação em forma de arranjos florais únicos e cestas premium de presentes ou datas comemorativas. Cada detalhe é feito com o coração.
              </p>
              <div className="flex items-center gap-3 mt-5 text-rose-300">
                <span className="text-xs font-bold uppercase tracking-wider text-white">Siga-nos:</span>
                <span className="text-xs font-light hover:text-white cursor-pointer transition">@miamor.floricultura</span>
              </div>
            </div>

            {/* Column 2: Policies & Info */}
            <div>
              <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-rose-300 mb-3.5">
                Como Encomendar?
              </h4>
              <ul className="space-y-2 text-xs text-rose-200/80 font-light">
                <li className="flex items-start gap-1.5">
                  <span className="text-rose-400">1.</span>
                  <span>Escolha os buquês e cestas desejadas no catálogo.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-rose-400">2.</span>
                  <span>Clique em adicionar à sacola e configure os nomes e dedicatória.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-rose-400">3.</span>
                  <span>Envie o pedido montado diretamente para o nosso WhatsApp.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-rose-400">4.</span>
                  <span>Nossa equipe responderá com a confirmação de horário, entrega e chave Pix.</span>
                </li>
              </ul>
            </div>

            {/* Column 3: Contact Details & Store Pickup */}
            <div>
              <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-rose-300 mb-3.5">
                Central de Atendimento
              </h4>
              <div className="space-y-3.5 text-xs text-rose-200/80 font-light">
                <div className="flex items-start gap-2">
                  <span className="text-base text-rose-400 shrink-0">📍</span>
                  <span>Sede Central Mi Amor Floricultura • Entregas rápidas em domicílio ou retirada agendada na floricultura.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-base text-rose-400 shrink-0">📞</span>
                  <span>Telefone Comercial: Fale direto via botões do WhatsApp</span>
                </div>
                <div className="flex items-center gap-2 bg-rose-900/30 p-2.5 rounded-lg border border-rose-800/50">
                  <span className="text-sm shrink-0">💡</span>
                  <span className="leading-snug">Todas as mensagens e encomendas são enviadas de forma segura diretamente para o nosso WhatsApp oficial!</span>
                </div>
              </div>
            </div>

          </div>

          <hr className="border-rose-900 my-8" />

          {/* Bottom Copyright and watermark */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-rose-300/70 font-light">
            <p>© 2026 Mi Amor Floricultura. Todos os direitos reservados. Feito com amor.</p>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Plataforma de Vendas Ativa via WhatsApp</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Bottom Shopping Cart Trigger (Active when cart has items) */}
      {totalCartCount > 0 && (
        <button
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-rose-600 hover:bg-rose-700 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition duration-300 flex items-center justify-center gap-2 border border-rose-400/40 group animate-bounce-slow"
          id="floating-cart-btn"
          title="Ver minha sacola"
        >
          <div className="relative">
            <ShoppingBag className="w-6 h-6" />
            <span className="absolute -top-2.5 -right-2.5 bg-white text-rose-700 text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border border-rose-600 shadow">
              {totalCartCount}
            </span>
          </div>
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 font-semibold text-sm whitespace-nowrap">
            Ver Sacola
          </span>
        </button>
      )}

      {/* Back to top button */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 left-6 z-40 bg-white hover:bg-rose-50 text-rose-800 p-3 rounded-full shadow-lg border border-rose-100 hover:scale-105 transition"
          title="Voltar ao Topo"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Product Detail Modal Popup */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onDirectOrder={handleDirectOrder}
      />

      {/* Shopping Bag slide-over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        whatsAppNumber={whatsAppNumber}
      />

    </div>
  );
}
