import Section from "@/components/Section";
import H2 from "@/UI/H2";
import ProductGrid from "@/components/shop/ProductGrid";
import { getProducts } from "@/services/shopify/shopifyProducts";

export const metadata = {
  title: "Shop | Grass Roots",
};

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  let products = [];
  try {
    ({ products } = await getProducts(50));
  } catch (err) {
    console.error("Failed to load products:", err);
  }

  return (
    <main className="m-auto text-white overflow-x-clip">
      <Section classes="mt-32 mb-40 max-w-[90%] lg:w-3/4">
        <div className="w-full flex flex-col items-start">
          <H2>
            THE <span className="text-[#ffc000]">SHOP</span>
          </H2>
          <ProductGrid products={products} />
        </div>
      </Section>
    </main>
  );
}
