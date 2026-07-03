"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";

const ProductCard = ({ product }) => {
  const { id, name, imageUrl, price, originalPrice, variants } = product;
  const [isAdding, setIsAdding] = useState(false);
  const [message, setMessage] = useState("");
  const { addToCart, isItemInCart } = useCart();

  const firstVariant =
    variants?.find((v) => v.availableForSale) || variants?.[0] || null;
  const isInCart = firstVariant ? isItemInCart(firstVariant.id) : false;

  const handleQuickAdd = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!firstVariant || !firstVariant.availableForSale) return;

    setIsAdding(true);
    const result = await addToCart(firstVariant.id, 1);
    setMessage(result.success ? "Added!" : "Error");
    setTimeout(() => setMessage(""), 1500);
    setIsAdding(false);
  };

  return (
    <Link href={`/products/${product.handle}`} className="group block relative" data-aos="fade-up">
      <div className="relative aspect-[3/4] overflow-hidden bg-white/5">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
        )}

        <button
          onClick={handleQuickAdd}
          disabled={isAdding || !firstVariant?.availableForSale}
          className={`absolute bottom-3 right-3 px-3 py-1.5 text-xs uppercase tracking-wide font-bold rounded-full transition-colors ${
            !firstVariant?.availableForSale
              ? "bg-white/20 text-white/50 cursor-not-allowed"
              : isInCart
              ? "bg-[#ffc000] text-black"
              : "bg-black/70 text-white hover:bg-[#ffc000] hover:text-black"
          }`}
        >
          {!firstVariant?.availableForSale
            ? "Sold out"
            : message || (isInCart ? "In cart" : "Quick add")}
        </button>
      </div>

      <div className="pt-3">
        <h3 className="uppercase font-bold text-sm lg:text-base text-white">{name}</h3>
        <div className="flex items-center gap-2 mt-1">
          {originalPrice && (
            <span className="text-xs lg:text-sm text-white/50 line-through">{originalPrice}</span>
          )}
          <span className="text-sm lg:text-base font-bold text-[#ffc000]">{price}</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
