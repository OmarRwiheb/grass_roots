"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";

const ProductCard = ({ product }) => {
  const {
    name,
    imageUrl,
    price,
    originalPrice,
    variants,
    isSale,
    discountPercentage,
    hasAnyAvailable,
    totalAvailableQuantity,
  } = product;
  const [isAdding, setIsAdding] = useState(false);
  const [message, setMessage] = useState("");
  const { addToCart, isItemInCart } = useCart();

  const firstVariant =
    variants?.find((v) => v.availableForSale) || variants?.[0] || null;
  const isInCart = firstVariant ? isItemInCart(firstVariant.id) : false;
  const isLowStock =
    hasAnyAvailable && typeof totalAvailableQuantity === "number" && totalAvailableQuantity > 0 && totalAvailableQuantity <= 5;

  const handleQuickAdd = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!firstVariant || !firstVariant.availableForSale || isAdding) return;

    setIsAdding(true);
    const result = await addToCart(firstVariant.id, 1);
    setMessage(result.success ? "Added!" : "Error");
    setTimeout(() => setMessage(""), 1500);
    setIsAdding(false);
  };

  return (
    <Link
      href={`/products/${product.handle}`}
      className="group block relative"
      data-aos="fade-up"
    >
      <div className="relative aspect-[3/4] artifact-frame">
        <div className="relative w-full h-full overflow-hidden bg-[#141311]">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={name}
              fill
              className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
                !hasAnyAvailable ? "grayscale opacity-60" : ""
              }`}
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
          )}

          {isSale && hasAnyAvailable && (
            <span className="absolute top-3 left-3 bg-[#ffc000] text-black text-[11px] font-bold uppercase tracking-wide px-2.5 py-1">
              −{discountPercentage}%
            </span>
          )}

          {!hasAnyAvailable && (
            <span className="absolute top-3 left-3 bg-[#141311] border border-white/30 text-white/80 text-[11px] font-bold uppercase tracking-wide px-2.5 py-1">
              Sold out
            </span>
          )}
        </div>
      </div>

      <div className="pt-3">
        <h3 className="uppercase font-bold text-sm lg:text-base text-white truncate">{name}</h3>
        <div className="flex items-center gap-2 mt-1">
          {originalPrice && (
            <span className="text-xs lg:text-sm text-white/50 line-through">{originalPrice}</span>
          )}
          <span className="text-sm lg:text-base font-bold text-[#ffc000]">{price}</span>
        </div>
        {isLowStock && (
          <p className="mt-1 text-[11px] uppercase tracking-wide text-[#5fb8af]">
            Only {totalAvailableQuantity} left
          </p>
        )}

        <button
          onClick={handleQuickAdd}
          disabled={isAdding || !firstVariant?.availableForSale}
          className={`mt-3 w-full py-2 text-xs uppercase tracking-wide font-bold rounded-full transition-colors ${
            !firstVariant?.availableForSale
              ? "bg-white/20 text-white/50 cursor-not-allowed"
              : isInCart
              ? "bg-[#ffc000] text-black"
              : "bg-[#ffc000] text-black hover:bg-white disabled:opacity-70 disabled:hover:bg-[#ffc000]"
          }`}
        >
          {!firstVariant?.availableForSale
            ? "Sold out"
            : isAdding
            ? "Adding..."
            : message || (isInCart ? "In cart" : "Add to cart")}
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
