import { apiClient } from "@/services/apiClient";
import { transformProduct } from "./shopifyProducts";

const COLLECTIONS_QUERY = `
  query Collections($first: Int!) @inContext(country: EG, language: EN) {
    collections(first: $first) {
      edges {
        node {
          id
          title
          handle
          image { url altText }
        }
      }
    }
  }
`;

const COLLECTION_BY_HANDLE_QUERY = `
  query CollectionByHandle($handle: String!, $first: Int!, $after: String)
  @inContext(country: EG, language: EN) {
    collection(handle: $handle) {
      id
      title
      handle
      description
      image { url altText }
      products(first: $first, after: $after) {
        edges {
          cursor
          node {
            id
            title
            handle
            featuredImage { url altText }
            priceRange {
              minVariantPrice { amount currencyCode }
              maxVariantPrice { amount currencyCode }
            }
            options { name values }
            variants(first: 50) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  quantityAvailable
                  price { amount currencyCode }
                  compareAtPrice { amount currencyCode }
                  selectedOptions { name value }
                }
              }
            }
          }
        }
        pageInfo { hasNextPage endCursor }
      }
    }
  }
`;

export async function getCollections(first = 20) {
  const data = await apiClient.graphql(COLLECTIONS_QUERY, { first });
  const edges = data?.collections?.edges ?? [];

  return edges
    .map((e) => ({
      id: e.node.id,
      title: e.node.title,
      handle: e.node.handle,
      imageUrl: e.node.image?.url || null,
    }))
    .filter((c) => c.imageUrl);
}

export async function getCollectionProductsByHandle({ handle, first = 24, after = null }) {
  const data = await apiClient.graphql(COLLECTION_BY_HANDLE_QUERY, { handle, first, after });

  if (!data?.collection) {
    return { collection: null, products: [], pageInfo: { hasNextPage: false, endCursor: null } };
  }

  const edges = data.collection.products?.edges ?? [];
  const products = edges.map((e) => transformProduct(e.node));
  const pageInfo = data.collection.products?.pageInfo ?? { hasNextPage: false, endCursor: null };

  return { collection: data.collection, products, pageInfo };
}
