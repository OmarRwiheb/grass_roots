import { shopifyConfig } from "@/config/shopify";

// Direct Shopify Storefront API fetch for server-side use (e.g. generateMetadata).
// Bypasses the /api/shopify/graphql HTTP layer so it works during SSR.
export async function shopifyServerFetch(query, variables = {}) {
  if (!shopifyConfig.storeDomain || !shopifyConfig.storefrontPrivateToken) {
    throw new Error("Missing Shopify env vars");
  }

  const res = await fetch(shopifyConfig.storefrontApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Shopify-Storefront-Private-Token": shopifyConfig.storefrontPrivateToken,
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });

  const json = await res.json();
  if (json.errors?.length) throw new Error(json.errors[0].message);
  return json.data;
}
