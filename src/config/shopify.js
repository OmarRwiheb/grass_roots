export const shopifyConfig = {
  storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "your-store.myshopify.com",
  // Private Storefront token: all Storefront API calls in this app happen server-side
  // (proxy route or shopifyServerFetch), so we use the private token to avoid the
  // public token's per-IP rate limiting instead of exposing it to the browser.
  storefrontPrivateToken: process.env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN || "",
  apiVersion: process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION || "2025-01",

  get storefrontApiUrl() {
    return `https://${this.storeDomain}/api/${this.apiVersion}/graphql.json`;
  },
};
