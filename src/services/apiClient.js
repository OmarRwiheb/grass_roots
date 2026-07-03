import { shopifyServerFetch } from "./shopify/shopifyServerFetch";

export const apiClient = {
  graphql: async (query, variables = {}) => {
    // On the server, talk to Shopify directly instead of round-tripping through our own API route.
    if (typeof window === "undefined") {
      return shopifyServerFetch(query, variables);
    }

    const res = await fetch("/api/shopify/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables }),
    });
    const data = await res.json();

    if (data?.error) {
      const error = new Error(`[Shopify GraphQL] ${data.error}`);
      error.name = "ShopifyGraphQLError";
      error.details = data.details;
      throw error;
    }
    return data.data;
  },
};
