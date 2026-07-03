"use client";

import { useMemo, useState } from "react";
import ProductGrid from "./ProductGrid";

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

const ShopCollection = ({ products }) => {
  const [sort, setSort] = useState("featured");

  const sorted = useMemo(() => {
    if (sort === "price-asc") return [...products].sort((a, b) => a.priceValue - b.priceValue);
    if (sort === "price-desc") return [...products].sort((a, b) => b.priceValue - a.priceValue);
    return products;
  }, [products, sort]);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between flex-wrap gap-4 py-4 border-y border-[#8a6a2e]/40 mb-10">
        <p className="text-xs uppercase tracking-[0.2em] text-white/50">
          {products.length} {products.length === 1 ? "piece" : "pieces"}
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
