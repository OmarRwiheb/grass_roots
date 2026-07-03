import { notFound } from "next/navigation";
import Section from "@/components/Section";
import H2 from "@/UI/H2";
import ProductGrid from "@/components/shop/ProductGrid";
import { getCollectionProductsByHandle } from "@/services/shopify/shopifyCollection";

export async function generateMetadata({ params }) {
  const { handle } = await params;
  try {
    const { collection } = await getCollectionProductsByHandle({ handle });
    if (!collection) return { title: "Collection Not Found" };
    return {
      title: `${collection.title} | Grass Roots`,
      description: collection.description || undefined,
    };
  } catch {
    return { title: "Collection Not Found" };
  }
}

export default async function CollectionPage({ params }) {
  const { handle } = await params;

  let collection, products;
  try {
    ({ collection, products } = await getCollectionProductsByHandle({ handle }));
  } catch (err) {
    console.error("Failed to load collection:", err);
  }

  if (!collection) notFound();

  return (
    <main className="m-auto text-white overflow-x-clip">
      <Section classes="mt-32 mb-40 max-w-[90%] lg:w-3/4">
        <div className="w-full flex flex-col items-start">
          <H2>{collection.title}</H2>
          {collection.description && <p className="text-white/70 mb-10 -mt-6">{collection.description}</p>}
          <ProductGrid products={products} />
        </div>
      </Section>
    </main>
  );
}
