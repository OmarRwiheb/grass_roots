"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";

const CartDrawer = ({ isOpen, onClose }) => {
  const { cart, loading, updateCartLine, removeFromCart, getCheckoutUrl } = useCart();
  const [checkingOut, setCheckingOut] = useState(false);

  const handleCheckout = async () => {
    setCheckingOut(true);
    const url = await getCheckoutUrl();
    setCheckingOut(false);
    if (url) window.location.href = url;
  };

  const items = cart?.items || [];

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/60 z-[9990] transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />
      <aside
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-[#1b1b1a] text-white z-[9999] flex flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <h2 className="uppercase font-bold text-xl">
            Your Bag <span className="text-[#ffc000]">({cart?.totalQuantity || 0})</span>
          </h2>
          <button onClick={onClose} className="text-2xl leading-none">
            &times;
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {loading && items.length === 0 && <p className="text-white/60">Loading...</p>}
          {!loading && items.length === 0 && <p className="text-white/60">Your bag is empty.</p>}

          {items.map((item) => (
            <div key={item.id} className="flex gap-4 py-4 border-b border-white/10">
              <div className="relative w-20 h-24 shrink-0 bg-white/5 overflow-hidden">
                {item.product.image && (
                  <Image src={item.product.image} alt={item.product.title} fill className="object-cover" />
                )}
              </div>
              <div className="flex-1">
                <p className="uppercase font-bold text-sm">{item.product.title}</p>
                {item.options.length > 0 && (
                  <p className="text-xs text-white/50 mt-0.5">
                    {item.options.map((o) => o.value).join(" / ")}
                  </p>
                )}
                <p className="text-sm text-[#ffc000] mt-1">{item.price}</p>

                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center gap-2 border border-white/30 rounded-full px-3 py-0.5">
                    <button onClick={() => updateCartLine(item.id, item.quantity - 1)}>−</button>
                    <span className="text-sm">{item.quantity}</span>
                    <button onClick={() => updateCartLine(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-xs text-white/50 hover:text-white underline">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-white/10">
            <div className="flex justify-between mb-4 uppercase font-bold">
              <span>Subtotal</span>
              <span className="text-[#ffc000]">{cart?.subtotal}</span>
            </div>
            <button
              onClick={handleCheckout}
              disabled={checkingOut}
              className="w-full py-3 rounded-full bg-[#ffc000] text-black uppercase font-bold hover:bg-white transition-colors disabled:opacity-60"
            >
              {checkingOut ? "Redirecting..." : "Checkout"}
            </button>
          </div>
        )}
      </aside>
    </>
  );
};

export default CartDrawer;
