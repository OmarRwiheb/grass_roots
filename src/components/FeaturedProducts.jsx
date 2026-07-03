import Link from "next/link";
import Section from "./Section";
import H2 from "../UI/H2";
import ProductGrid from "./shop/ProductGrid";

const FeaturedProducts = ({ products }) => {
  if (!products || products.length === 0) return null;

  return (
    <Section classes="mb-40 max-w-[90%] lg:w-3/4">
      <div className="w-full flex flex-col items-center text-center">
        <H2>
          SHOP THE <span className="text-[#ffc000]">COLLECTION</span>
        </H2>
        <ProductGrid products={products} />
        <Link
          href="/products"
          className="mt-10 px-10 py-3 border border-white/40 rounded-full uppercase font-bold hover:border-[#ffc000] hover:text-[#ffc000] transition-colors"
        >
          View all products
        </Link>
      </div>
    </Section>
  );
};

export default FeaturedProducts;
