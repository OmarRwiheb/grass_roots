"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import ProductGrid from "./ProductGrid";

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

const ShopCollection = ({ products, collections = [] }) => {
  const [sort, setSort] = useState("featured");
  const [activeCollection, setActiveCollection] = useState(null);

  const filtered = useMemo(() => {
    if (!activeCollection) return products;
    return products.filter((p) => p.collectionHandles?.includes(activeCollection));
  }, [products, activeCollection]);

  const sorted = useMemo(() => {
    if (sort === "price-asc") return [...filtered].sort((a, b) => a.priceValue - b.priceValue);
    if (sort === "price-desc") return [...filtered].sort((a, b) => b.priceValue - a.priceValue);
    return filtered;
  }, [filtered, sort]);

  return (
    <div className="w-full">
      {collections.length > 0 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2 mb-6">
          <button
            onClick={() => setActiveCollection(null)}
            className={`shrink-0 px-4 py-2 text-xs uppercase tracking-wide rounded-full border transition-colors ${
              !activeCollection
                ? "border-[#ffc000] text-[#ffc000]"
                : "border-white/30 text-white/70 hover:border-white"
            }`}
          >
            All
          </button>
          {collections.map((collection) => (
            <button
              key={collection.id}
              onClick={() => setActiveCollection(collection.handle)}
              className={`shrink-0 flex items-center gap-2 pl-1.5 pr-4 py-1.5 text-xs uppercase tracking-wide rounded-full border transition-colors ${
                activeCollection === collection.handle
                  ? "border-[#ffc000] text-[#ffc000]"
                  : "border-white/30 text-white/70 hover:border-white"
              }`}
            >
              <span className="relative w-6 h-6 rounded-full overflow-hidden shrink-0 bg-[#141311]">
                <Image src={collection.imageUrl} alt="" fill className="object-cover" sizes="24px" />
              </span>
              {collection.title}
            </button>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between flex-wrap gap-4 py-4 border-y border-[#8a6a2e]/40 mb-10">
        <p className="text-xs uppercase tracking-[0.2em] text-white/50">
          {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
        </p>
        <div className="flex items-center gap-3">
          <label htmlFor="shop-sort" className="text-xs uppercase tracking-[0.2em] text-white/50">
            Sort by
          </label>
          <select
            id="shop-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-transparent border border-white/30 text-xs uppercase tracking-wide px-3 py-2 focus:outline-none focus:border-[#ffc000] text-white cursor-pointer"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-[#1b1b1a] text-white">
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <ProductGrid products={sorted} />
    </div>
  );
};

export default ShopCollection;
