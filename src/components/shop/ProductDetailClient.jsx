"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { HiOutlineGlobeAlt, HiOutlineShieldCheck, HiOutlineSparkles } from "react-icons/hi";
import { useCart } from "@/contexts/CartContext";
import Section from "@/components/Section";
import ProductGrid from "@/components/shop/ProductGrid";
import ProductGallery from "@/components/shop/ProductGallery";

const findVariant = (variants, color, size) =>
  variants.find(
    (v) => v.color.toUpperCase() === color.toUpperCase() && v.size.toUpperCase() === size.toUpperCase()
  ) || variants[0];

const TRUST_ITEMS = [
  { icon: HiOutlineGlobeAlt, label: "100% Egyptian-made" },
  { icon: HiOutlineSparkles, label: "Heritage-inspired design" },
  { icon: HiOutlineShieldCheck, label: "Secure checkout" },
];

const ProductDetailClient = ({ product, relatedProducts = [] }) => {
  const { addToCart } = useCart();

  const showColors = product.colors.length > 1 || (product.colors[0] && product.colors[0] !== "MULTI");
  const showSizes = product.sizes.length > 1 || (product.sizes[0] && product.sizes[0] !== "ONE_SIZE");

  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState("");
  const [showStickyBar, setShowStickyBar] = useState(false);

  const addToCartRef = useRef(null);

  const selectedVariant = useMemo(
    () => findVariant(product.variants, selectedColor, selectedSize),
    [product.variants, selectedColor, selectedSize]
  );

  const isColorAvailable = (color) =>
    product.variants.some(
      (v) =>
        v.color.toUpperCase() === color.toUpperCase() &&
        v.size.toUpperCase() === selectedSize.toUpperCase() &&
        v.availableForSale
    );

  const isSizeAvailable = (size) =>
    product.variants.some(
      (v) =>
        v.size.toUpperCase() === size.toUpperCase() &&
        v.color.toUpperCase() === selectedColor.toUpperCase() &&
        v.availableForSale
    );

  const isLowStock =
    selectedVariant?.availableForSale &&
    typeof selectedVariant?.quantityAvailable === "number" &&
    selectedVariant.quantityAvailable > 0 &&
    selectedVariant.quantityAvailable <= 5;

  const images = product.images.length ? product.images : [product.imageUrl].filter(Boolean);

  useEffect(() => {
    const node = addToCartRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => setShowStickyBar(!entry.isIntersecting), {
      threshold: 0,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const handleAddToCart = async () => {
    if (!selectedVariant?.availableForSale) return;
    setStatus("Adding...");
    const result = await addToCart(selectedVariant.id, quantity);
    setStatus(result.success ? "Added to cart" : result.error || "Error");
    setTimeout(() => setStatus(""), 2000);
  };

  return (
    <>
      <Section classes="mt-32 mb-24 max-w-[90%] lg:w-3/4">
        <div className="w-full">
          <nav className="text-xs uppercase tracking-[0.2em] text-white/50 mb-8">
            <Link href="/products" className="hover:text-[#ffc000] transition-colors">
              Shop
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white/70">{product.name}</span>
          </nav>

          <div className="w-full flex flex-wrap items-start gap-10 lg:gap-16">
            <div className="w-full lg:w-1/2 lg:sticky lg:top-32">
              <ProductGallery
                images={images}
                alt={product.name}
                isSale={product.isSale}
                discountPercentage={product.discountPercentage}
                hasAnyAvailable={product.hasAnyAvailable}
              />
            </div>

            <div className="w-full lg:flex-1 text-white">
              <h1 className="uppercase font-bold text-3xl lg:text-4xl mb-3">{product.name}</h1>

              <div className="flex items-center gap-3 mb-1">
                {product.originalPrice && (
                  <span className="text-white/50 line-through">{product.originalPrice}</span>
                )}
                <span className="text-xl font-bold text-[#ffc000]">{product.price}</span>
                {product.isSale && (
                  <span className="bg-[#ffc000]/15 text-[#ffc000] text-xs font-bold uppercase tracking-wide px-2 py-1">
                    Save {product.discountPercentage}%
                  </span>
                )}
              </div>

              <div className="min-h-5 mb-6">
                {isLowStock && (
                  <p className="text-xs uppercase tracking-wide text-[#5fb8af]">
                    Only {selectedVariant.quantityAvailable} left in stock
                  </p>
                )}
              </div>

              {showColors && (
                <div className="mb-6">
                  <p className="uppercase text-xs tracking-[0.2em] text-white/50 mb-2">Color</p>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => {
                      const available = isColorAvailable(color);
                      return (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`px-4 py-2 text-sm uppercase border transition-colors ${
                            selectedColor === color
                              ? "border-[#ffc000] text-[#ffc000]"
                              : available
                              ? "border-white/30 text-white/70 hover:border-white"
                              : "border-white/10 text-white/30 line-through"
                          }`}
                        >
                          {color}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {showSizes && (
                <div className="mb-6">
                  <p className="uppercase text-xs tracking-[0.2em] text-white/50 mb-2">Size</p>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => {
                      const available = isSizeAvailable(size);
                      return (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-4 py-2 text-sm uppercase border transition-colors ${
                            selectedSize === size
                              ? "border-[#ffc000] text-[#ffc000]"
                              : available
                              ? "border-white/30 text-white/70 hover:border-white"
                              : "border-white/10 text-white/30 line-through"
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="mb-8">
                <p className="uppercase text-xs tracking-[0.2em] text-white/50 mb-2">Quantity</p>
                <div className="flex items-center gap-4 border border-white/30 rounded-full w-fit px-4 py-1.5">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="text-lg"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span>{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="text-lg"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                ref={addToCartRef}
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
                <>
                  <div className="h-px w-full bg-[#8a6a2e]/40 mt-10 mb-6" />
                  <p className="uppercase text-xs tracking-[0.2em] text-white/50 mb-3">About this piece</p>
                  <p className="text-white/70 leading-relaxed whitespace-pre-line">{product.description}</p>
                </>
              )}

              <ul className="mt-8 flex flex-col gap-3">
                {TRUST_ITEMS.map(({ icon: Icon, label }) => (
                  <li key={label} className="flex items-center gap-3 text-sm text-white/60">
                    <Icon size={18} className="text-[#ffc000] shrink-0" />
                    {label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {relatedProducts.length > 0 && (
        <Section classes="mb-40 max-w-[90%] lg:w-3/4">
          <div className="w-full flex flex-col items-center text-center">
            <h2 className="font-bold text-white my-4 uppercase text-3xl lg:text-5xl">
              More from the <span className="text-[#ffc000]">Collection</span>
            </h2>
            <ProductGrid products={relatedProducts} />
          </div>
        </Section>
      )}

      <div
        className={`fixed bottom-0 left-0 right-0 z-40 bg-[#141311] border-t border-[#8a6a2e]/40 px-5 py-3 flex items-center justify-between gap-4 lg:hidden transition-transform duration-300 ${
          showStickyBar ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="min-w-0">
          <p className="uppercase font-bold text-sm truncate text-white">{product.name}</p>
          <p className="text-[#ffc000] font-bold text-sm">{product.price}</p>
        </div>
        <button
          onClick={handleAddToCart}
          disabled={!selectedVariant?.availableForSale}
          className={`shrink-0 px-6 py-2.5 uppercase text-sm font-bold rounded-full transition-colors ${
            selectedVariant?.availableForSale
              ? "bg-[#ffc000] text-black hover:bg-white"
              : "bg-white/20 text-white/50 cursor-not-allowed"
          }`}
        >
          {selectedVariant?.availableForSale ? status || "Add to cart" : "Sold out"}
        </button>
      </div>
    </>
  );
};

export default ProductDetailClient;
