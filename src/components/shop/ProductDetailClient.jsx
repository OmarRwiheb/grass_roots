"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";
import Section from "@/components/Section";

const findVariant = (variants, color, size) =>
  variants.find(
    (v) => v.color.toUpperCase() === color.toUpperCase() && v.size.toUpperCase() === size.toUpperCase()
  ) || variants[0];

const ProductDetailClient = ({ product }) => {
  const { addToCart } = useCart();

  const showColors = product.colors.length > 1 || (product.colors[0] && product.colors[0] !== "MULTI");
  const showSizes = product.sizes.length > 1 || (product.sizes[0] && product.sizes[0] !== "ONE_SIZE");

  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState("");

  const selectedVariant = useMemo(
    () => findVariant(product.variants, selectedColor, selectedSize),
    [product.variants, selectedColor, selectedSize]
  );

  const images = product.images.length ? product.images : [product.imageUrl].filter(Boolean);

  const handleAddToCart = async () => {
    if (!selectedVariant?.availableForSale) return;
    setStatus("Adding...");
    const result = await addToCart(selectedVariant.id, quantity);
    setStatus(result.success ? "Added to cart" : result.error || "Error");
    setTimeout(() => setStatus(""), 2000);
  };

  return (
    <Section classes="mt-32 mb-40">
      <div className="w-full flex flex-wrap items-start gap-10 lg:gap-16">
      <div className="w-full lg:w-1/2">
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-white/5">
          {images[activeImage] && (
            <Image src={images[activeImage]} alt={product.name} fill className="object-cover" priority />
          )}
        </div>
        {images.length > 1 && (
          <div className="flex gap-3 mt-4 overflow-x-auto">
            {images.map((img, i) => (
              <button
                key={img}
                onClick={() => setActiveImage(i)}
                className={`relative w-16 h-20 shrink-0 overflow-hidden border ${
                  i === activeImage ? "border-[#ffc000]" : "border-white/20"
                }`}
              >
                <Image src={img} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="w-full lg:w-1/3 text-white">
        <h1 className="uppercase font-bold text-3xl lg:text-4xl mb-3">{product.name}</h1>

        <div className="flex items-center gap-3 mb-6">
          {product.originalPrice && (
            <span className="text-white/50 line-through">{product.originalPrice}</span>
          )}
          <span className="text-xl font-bold text-[#ffc000]">{product.price}</span>
        </div>

        {showColors && (
          <div className="mb-6">
            <p className="uppercase text-sm font-bold mb-2">Color</p>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 text-sm uppercase border rounded-full transition-colors ${
                    selectedColor === color
                      ? "border-[#ffc000] text-[#ffc000]"
                      : "border-white/30 text-white/70 hover:border-white"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
        )}

        {showSizes && (
          <div className="mb-6">
            <p className="uppercase text-sm font-bold mb-2">Size</p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 text-sm uppercase border rounded-full transition-colors ${
                    selectedSize === size
                      ? "border-[#ffc000] text-[#ffc000]"
                      : "border-white/30 text-white/70 hover:border-white"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mb-6">
          <p className="uppercase text-sm font-bold mb-2">Quantity</p>
          <div className="flex items-center gap-4 border border-white/30 rounded-full w-fit px-4 py-1.5">
            <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="text-lg">
              −
            </button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity((q) => q + 1)} className="text-lg">
              +
            </button>
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={!selectedVariant?.availableForSale}
          className={`w-full lg:w-auto px-10 py-3 uppercase font-bold rounded-full transition-colors ${
            selectedVariant?.availableForSale
              ? "bg-[#ffc000] text-black hover:bg-white"
              : "bg-white/20 text-white/50 cursor-not-allowed"
          }`}
        >
          {selectedVariant?.availableForSale ? status || "Add to cart" : "Sold out"}
        </button>

        {product.description && (
          <p className="mt-8 text-white/70 leading-relaxed whitespace-pre-line">{product.description}</p>
        )}
      </div>
      </div>
    </Section>
  );
};

export default ProductDetailClient;
