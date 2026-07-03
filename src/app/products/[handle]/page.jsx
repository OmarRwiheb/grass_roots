import { notFound } from "next/navigation";
import ProductDetailClient from "@/components/shop/ProductDetailClient";
import { getProductByHandle, getProducts } from "@/services/shopify/shopifyProducts";

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

  let relatedProducts = [];
  try {
    const { products } = await getProducts(9);
    relatedProducts = products.filter((p) => p.handle !== handle).slice(0, 4);
  } catch (err) {
    console.error("Failed to load related products:", err);
  }

  return (
    <main className="m-auto text-white overflow-x-clip">
      <ProductDetailClient product={product} relatedProducts={relatedProducts} />
    </main>
  );
}
