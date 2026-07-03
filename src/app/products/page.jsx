import Image from "next/image";
import Section from "@/components/Section";
import ShopCollection from "@/components/shop/ShopCollection";
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
      <div className="relative">
        <Image
          src="/egyptianMuesum3.webp"
          alt=""
          width={1024}
          height={1024}
          className="opacity-25 grayscale absolute left-0 top-0 -z-10 h-full w-full object-cover lg:w-auto lg:h-auto"
        />

        <Section classes="mt-32 mb-16 max-w-[90%] lg:w-3/4">
          <div className="w-full flex flex-col items-center text-center">
            <p className="font-[Phenomena] text-lg lg:text-xl tracking-[0.3em] uppercase text-[#ffc000]">
              The Collection
            </p>
            <div>
              <h1 className="text-[15vw] leading-[0.95] lg:text-8xl text-center font-bold uppercase mb-4 text-transparent stroke-text z-10 absolute">
                The Shop
              </h1>
              <h1 className="text-[15vw] leading-[0.95] lg:text-8xl text-center font-bold uppercase mb-4 z-0">
                The Shop
              </h1>
            </div>
            <div className="h-0.5 w-[90%] lg:w-1/2 bg-[#ffc000] mt-6"></div>
            <p className="mt-6 max-w-2xl text-lg lg:text-xl font-[Phenomena] text-white/80">
              Pieces carried out of the sands of Egypt, made for everyday wear.
            </p>
          </div>
        </Section>
      </div>

      <Section classes="mb-40 max-w-[90%] lg:w-3/4">
        <ShopCollection products={products} />
      </Section>
    </main>
  );
}
