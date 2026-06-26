import React from 'react';
import { X, Trash2, ShoppingBag, Send, AlertTriangle, Gift, User, MessageSquare, MapPin, Truck, Store } from 'lucide-react';
import { CartItem, Product } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  whatsAppNumber: string;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  whatsAppNumber,
}: CartDrawerProps) {
  // Checkout Form Details state
  const [customerName, setCustomerName] = React.useState('');
  const [recipientName, setRecipientName] = React.useState('');
  const [cardMessage, setCardMessage] = React.useState('');
  const [deliveryType, setDeliveryType] = React.useState<'pickup' | 'delivery'>('delivery');
  const [deliveryAddress, setDeliveryAddress] = React.useState('');

  if (!isOpen) return null;

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const formatBRL = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const handleSendOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (cartItems.length === 0) return;

    // Formatting items list
    let itemsText = '';
    cartItems.forEach((item) => {
      const itemTotal = item.product.price * item.quantity;
      itemsText += `• *${item.quantity}x ${item.product.name}*\n  _Preço: ${formatBRL(item.product.price)} cada_\n  _Subtotal: ${formatBRL(itemTotal)}_\n\n`;
    });

    // Formatting recipient & delivery info
    const deliveryEmoji = deliveryType === 'delivery' ? '🚗 Entrega a Domicílio' : '🏪 Retirada na Floricultura';
    
    let messageText = `🌸 *NOVO PEDIDO - MI AMOR FLORICULTURA* 🌸\n\n`;
    messageText += `👤 *Cliente:* ${customerName || 'Não informado'}\n`;
    messageText += `📍 *Opção:* ${deliveryEmoji}\n`;
    
    if (deliveryType === 'delivery') {
      messageText += `🏠 *Endereço de Entrega:* ${deliveryAddress || 'Falar com atendente'}\n`;
    }
    
    if (recipientName) {
      messageText += `🎁 *Para:* ${recipientName}\n`;
    }
    if (cardMessage) {
      messageText += `💌 *Mensagem no Cartão:* "${cardMessage}"\n`;
    }
    
    messageText += `\n🛒 *ITENS SELECIONADOS:*\n`;
    messageText += `--------------------------------------------\n`;
    messageText += itemsText;
    messageText += `--------------------------------------------\n`;
    messageText += `💵 *VALOR TOTAL:* *${formatBRL(subtotal)}*\n\n`;
    messageText += `_Por favor, informe a chave Pix ou forma de pagamento de preferência. Obrigado!_ ✨`;

    // Encode URL
    const encodedMessage = encodeURIComponent(messageText);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsAppNumber}&text=${encodedMessage}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank', 'referrerPolicy=no-referrer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" id="cart-drawer-container">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-rose-950/45 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="pointer-events-auto w-screen max-w-md">
          <div className="flex h-full flex-col bg-white shadow-2xl border-l border-rose-100">
            
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-rose-100 bg-rose-50/20">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-rose-600" />
                <h2 className="font-serif text-lg font-bold text-rose-950">Minha Sacola</h2>
                <span className="bg-rose-100 text-rose-800 text-xs font-bold px-2 py-0.5 rounded-full">
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-1.5 text-rose-800 hover:bg-rose-100/50 hover:text-rose-950 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cartItems.length === 0 ? (
                /* Empty Cart State */
                <div className="flex flex-col items-center justify-center text-center h-64 space-y-3">
                  <div className="p-4 bg-rose-50 rounded-full text-rose-300">
                    <ShoppingBag className="w-12 h-12" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-rose-950">Sua sacola está vazia</h3>
                  <p className="text-xs text-zinc-500 max-w-xs leading-relaxed font-light">
                    Navegue pelas nossas opções de buquês e cestas especiais e adicione-os aqui para montar seu pedido.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition"
                  >
                    Ver Catálogo
                  </button>
                </div>
              ) : (
                /* Active Cart State */
                <>
                  {/* Cart Items List */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-xs font-bold uppercase text-rose-900 tracking-wider">
                      <span>Flores & Presentes</span>
                      <button
                        onClick={onClearCart}
                        className="text-rose-600 hover:text-rose-800 flex items-center gap-1 font-medium lowercase"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Esvaziar
                      </button>
                    </div>

                    <div className="divide-y divide-rose-50">
                      {cartItems.map((item) => (
                        <div key={item.product.id} className="flex items-center py-3.5 gap-3.5 first:pt-0 last:pb-0">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-16 h-16 object-cover rounded-xl border border-rose-100/50 select-none shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-serif text-sm font-semibold text-rose-950 truncate">
                              {item.product.name}
                            </h4>
                            <p className="text-xs text-rose-700 font-bold mt-0.5">
                              {formatBRL(item.product.price)}
                            </p>
                            
                            {/* Quantity Counters */}
                            <div className="flex items-center gap-2 mt-2">
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                                className="w-5 h-5 flex items-center justify-center border border-rose-200 text-rose-700 rounded hover:bg-rose-50 font-bold text-xs"
                              >
                                -
                              </button>
                              <span className="font-mono text-xs font-bold text-rose-950 min-w-4 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                                className="w-5 h-5 flex items-center justify-center border border-rose-200 text-rose-700 rounded hover:bg-rose-50 font-bold text-xs"
                              >
                                +
                              </button>
                            </div>
                          </div>

                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="p-1.5 text-zinc-400 hover:text-rose-600 rounded transition shrink-0"
                            title="Remover item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <hr className="border-rose-100" />

                  {/* Order Details Customizer Form */}
                  <form onSubmit={handleSendOrder} className="space-y-4">
                    <h3 className="text-xs font-bold uppercase text-rose-900 tracking-wider flex items-center gap-1.5">
                      <Gift className="w-4 h-4 text-rose-600" /> Informações de Entrega & Dedicada
                    </h3>

                    <div className="space-y-3.5">
                      {/* Customer Name */}
                      <div>
                        <label className="block text-xs font-semibold text-rose-950 mb-1 flex items-center gap-1">
                          <User className="w-3.5 h-3.5 text-rose-500" /> Seu Nome (Quem compra)
                        </label>
                        <input
                          type="text"
                          required
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder="Ex: João Silva"
                          className="w-full bg-rose-50/10 border border-rose-100 rounded-lg px-3 py-2 text-xs text-rose-950 placeholder-rose-300 focus:outline-none focus:ring-1 focus:ring-rose-500"
                        />
                      </div>

                      {/* Recipient Name */}
                      <div>
                        <label className="block text-xs font-semibold text-rose-950 mb-1 flex items-center gap-1">
                          <Gift className="w-3.5 h-3.5 text-rose-500" /> Nome do Destinatário (Quem ganha)
                        </label>
                        <input
                          type="text"
                          value={recipientName}
                          onChange={(e) => setRecipientName(e.target.value)}
                          placeholder="Ex: Maria Souza (Opcional)"
                          className="w-full bg-rose-50/10 border border-rose-100 rounded-lg px-3 py-2 text-xs text-rose-950 placeholder-rose-300 focus:outline-none focus:ring-1 focus:ring-rose-500"
                        />
                      </div>

                      {/* Card message text */}
                      <div>
                        <label className="block text-xs font-semibold text-rose-950 mb-1 flex items-center gap-1">
                          <MessageSquare className="w-3.5 h-3.5 text-rose-500" /> Mensagem para o Cartão
                        </label>
                        <textarea
                          value={cardMessage}
                          onChange={(e) => setCardMessage(e.target.value)}
                          placeholder="Ex: Te amo hoje e sempre! Com carinho, João. (Opcional)"
                          rows={2}
                          className="w-full bg-rose-50/10 border border-rose-100 rounded-lg px-3 py-2 text-xs text-rose-950 placeholder-rose-300 focus:outline-none focus:ring-1 focus:ring-rose-500 resize-none"
                        />
                      </div>

                      {/* Delivery Options tab */}
                      <div>
                        <label className="block text-xs font-semibold text-rose-950 mb-1.5 flex items-center gap-1">
                          <Truck className="w-3.5 h-3.5 text-rose-500" /> Método de Retirada/Entrega
                        </label>
                        <div className="grid grid-cols-2 gap-2 bg-rose-50/50 p-1 rounded-lg">
                          <button
                            type="button"
                            onClick={() => setDeliveryType('delivery')}
                            className={`flex items-center justify-center gap-1 py-1.5 rounded-md text-xs font-semibold transition ${
                              deliveryType === 'delivery'
                                ? 'bg-rose-600 text-white shadow-sm'
                                : 'text-rose-900 hover:bg-rose-100/35'
                            }`}
                          >
                            <Truck className="w-3.5 h-3.5" /> Entrega
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeliveryType('pickup')}
                            className={`flex items-center justify-center gap-1 py-1.5 rounded-md text-xs font-semibold transition ${
                              deliveryType === 'pickup'
                                ? 'bg-rose-600 text-white shadow-sm'
                                : 'text-rose-900 hover:bg-rose-100/35'
                            }`}
                          >
                            <Store className="w-3.5 h-3.5" /> Retirar na Loja
                          </button>
                        </div>
                      </div>

                      {/* Delivery Address input */}
                      {deliveryType === 'delivery' && (
                        <div className="animate-fade-in">
                          <label className="block text-xs font-semibold text-rose-950 mb-1 flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-rose-500" /> Endereço Completo de Entrega
                          </label>
                          <input
                            type="text"
                            required
                            value={deliveryAddress}
                            onChange={(e) => setDeliveryAddress(e.target.value)}
                            placeholder="Rua, Número, Bairro, Cidade (Fácil de achar)"
                            className="w-full bg-rose-50/10 border border-rose-100 rounded-lg px-3 py-2 text-xs text-rose-950 placeholder-rose-300 focus:outline-none focus:ring-1 focus:ring-rose-500"
                          />
                        </div>
                      )}
                    </div>

                    <hr className="border-rose-100" />

                    {/* Submit Invoice details summary */}
                    <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                      <div className="flex justify-between text-sm text-emerald-950 font-medium mb-1">
                        <span>Produtos:</span>
                        <span className="font-mono">{formatBRL(subtotal)}</span>
                      </div>
                      <div className="flex justify-between text-xs text-emerald-800 mb-3">
                        <span>Taxa de Entrega:</span>
                        <span className="italic">{deliveryType === 'delivery' ? 'A combinar' : 'Grátis (Retirada)'}</span>
                      </div>
                      <div className="flex justify-between text-base text-emerald-950 font-bold pt-2 border-t border-emerald-200/50">
                        <span>Total Geral:</span>
                        <span className="font-sans text-lg text-emerald-800 font-extrabold">{formatBRL(subtotal)}</span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition duration-200"
                    >
                      <Send className="w-4 h-4" />
                      Enviar Pedido para o WhatsApp
                    </button>
                  </form>
                </>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
