import HomeContent from "../components/HomeContent";
import { getProducts } from "../services/shopify/shopifyProducts";

export const dynamic = "force-dynamic";

export default async function Home() {
  let products = [];
  try {
    ({ products } = await getProducts(8));
  } catch (err) {
    console.error("Failed to load featured products:", err);
  }

  return <HomeContent products={products} />;
}
