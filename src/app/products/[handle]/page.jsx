import { notFound } from "next/navigation";
import ProductDetailClient from "@/components/shop/ProductDetailClient";
import { getProductByHandle } from "@/services/shopify/shopifyProducts";

export async function generateMetadata({ params }) {
  const { handle } = await params;
  try {
    const product = await getProductByHandle(handle);
    return {
      title: `${product.name} | Grass Roots`,
      description: product.description || `Shop ${product.name} at Grass Roots.`,
      openGraph: {
        title: product.name,
        images: product.imageUrl ? [{ url: product.imageUrl }] : [],
      },
    };
  } catch {
    return { title: "Product Not Found" };
  }
}

export default async function ProductPage({ params }) {
  const { handle } = await params;

  let product;
  try {
    product = await getProductByHandle(handle);
  } catch {
    notFound();
  }

  return (
    <main className="m-auto text-white overflow-x-clip">
      <ProductDetailClient product={product} />
    </main>
  );
}
