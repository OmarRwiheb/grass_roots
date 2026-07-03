import { apiClient } from "@/services/apiClient";

const DEFAULT_SIZE = "ONE_SIZE";
const DEFAULT_COLOR = "MULTI";
const DEFAULT_CURRENCY = "USD";

const PRODUCT_FIELDS = `
  id
  title
  handle
  description
  featuredImage { url altText }
  images(first: 10) { nodes { url altText } }
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
        image { url altText }
      }
    }
  }
`;

const PRODUCTS_QUERY = `
  query Products($first: Int!, $after: String) @inContext(country: EG, language: EN) {
    products(first: $first, after: $after, query: "available_for_sale:true") {
      edges {
        cursor
        node { ${PRODUCT_FIELDS} }
      }
      pageInfo { hasNextPage endCursor }
    }
  }
`;

const PRODUCT_BY_HANDLE_QUERY = `
  query ProductByHandle($handle: String!) @inContext(country: EG, language: EN) {
    product(handle: $handle) { ${PRODUCT_FIELDS} }
  }
`;

const lc = (s) => (s || "").toLowerCase();

const getOptionValues = (options, names) => {
  if (!Array.isArray(options)) return [];
  const namesLc = names.map(lc);
  const opt = options.find(
    (o) => o?.name && (namesLc.includes(lc(o.name)) || namesLc.some((n) => lc(o.name).includes(n)))
  );
  return Array.isArray(opt?.values) ? opt.values.filter(Boolean) : [];
};

const extractColorsFromVariants = (variantNodes) => {
  const colorByOption = variantNodes
    .map((v) => v.selectedOptions?.find((o) => lc(o.name) === "color")?.value)
    .filter(Boolean);
  if (colorByOption.length) return Array.from(new Set(colorByOption));

  return Array.from(
    new Set(
      variantNodes
        .map((v) => v.title)
        .filter((t) => t && t !== "Default Title")
        .map((t) => {
          const parts = t.split(" / ");
          return parts[parts.length - 1] || t;
        })
        .filter(Boolean)
    )
  );
};

const normalizePrices = (variantNodes) => {
  return variantNodes.map((v) => {
    const price = v.price?.amount ? Number(v.price.amount) : null;
    const currency = v.price?.currencyCode || DEFAULT_CURRENCY;
    const compareAt = v.compareAtPrice?.amount ? Number(v.compareAtPrice.amount) : null;
    const onSale = compareAt && price ? compareAt > price : false;
    const discountPct = onSale && compareAt ? Math.round(((compareAt - price) / compareAt) * 100) : 0;
    return { id: v.id, available: !!v.availableForSale, price, compareAt, currency, onSale, discountPct };
  });
};

export const transformProduct = (p) => {
  const variants = (p.variants?.edges || []).map((e) => e.node);
  const images = p.images?.nodes || [];
  const normalized = normalizePrices(variants);

  const availablePrices = normalized.filter((n) => n.available && n.price != null);
  const allPrices = normalized.filter((n) => n.price != null);
  const pool = availablePrices.length ? availablePrices : allPrices;
  const minEntry = pool.length ? pool.reduce((acc, cur) => (cur.price < acc.price ? cur : acc)) : null;

  const currency = minEntry?.currency || p.priceRange?.minVariantPrice?.currencyCode || DEFAULT_CURRENCY;

  const sizes = getOptionValues(p.options, ["size", "sizes"]).length
    ? getOptionValues(p.options, ["size", "sizes"])
    : [DEFAULT_SIZE];

  let colors = getOptionValues(p.options, ["color", "colors"]);
  if (!colors.length) colors = extractColorsFromVariants(variants);
  if (!colors.length) colors = [DEFAULT_COLOR];
  const primaryColor = colors[0];

  const maxDiscount = normalized.reduce((m, n) => (n.discountPct > m ? n.discountPct : m), 0);

  const availableQuantities = variants
    .filter((v) => v.availableForSale)
    .map((v) => v.quantityAvailable);
  const totalAvailableQuantity = availableQuantities.every((q) => typeof q === "number")
    ? availableQuantities.reduce((sum, q) => sum + q, 0)
    : null;

  const originalPrice =
    minEntry?.onSale && minEntry.compareAt ? `${currency} ${minEntry.compareAt.toFixed(2)}` : null;

  const priceValue =
    minEntry?.price != null ? minEntry.price : Number(p.priceRange?.minVariantPrice?.amount) || 0;

  const price = `${currency} ${priceValue.toFixed(2)}`;

  const fullVariants = variants.map((variant) => {
    const selectedOptions = variant.selectedOptions || [];
    const colorOption = selectedOptions.find(
      (opt) => opt.name.toLowerCase().includes("color") || opt.name.toLowerCase().includes("colour")
    );
    const sizeOption = selectedOptions.find((opt) => opt.name.toLowerCase().includes("size"));

    return {
      id: variant.id,
      title: variant.title,
      availableForSale: variant.availableForSale,
      quantityAvailable: variant.quantityAvailable,
      price: variant.price,
      compareAtPrice: variant.compareAtPrice,
      color: colorOption?.value || primaryColor,
      size: sizeOption?.value || DEFAULT_SIZE,
      selectedOptions,
    };
  });

  return {
    id: p.id,
    handle: p.handle,
    name: p.title,
    imageUrl: p.featuredImage?.url || images[0]?.url || null,
    images: images.map((img) => img.url).filter(Boolean),
    price,
    priceValue,
    originalPrice,
    isSale: maxDiscount > 0,
    discountPercentage: maxDiscount,
    description: p.description,
    color: primaryColor.toString().toUpperCase(),
    colors: colors.map((c) => c.toString().toUpperCase()),
    sizes,
    variants: fullVariants,
    hasAnyAvailable: variants.some((v) => v.availableForSale),
    totalAvailableQuantity,
  };
};

export async function getProducts(first = 50, after = null) {
  const data = await apiClient.graphql(PRODUCTS_QUERY, { first, after });
  const connection = data?.products;
  if (!connection?.edges) throw new Error("Invalid response from Shopify");

  const products = connection.edges.map((e) => transformProduct(e.node));
  const pageInfo = connection.pageInfo || { hasNextPage: false, endCursor: null };

  return { products, pageInfo };
}

export async function getProductByHandle(handle) {
  const data = await apiClient.graphql(PRODUCT_BY_HANDLE_QUERY, { handle });
  if (!data?.product) throw new Error("Product not found");
  return transformProduct(data.product);
}
