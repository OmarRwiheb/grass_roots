import { apiClient } from "@/services/apiClient";

const CART_FIELDS = `
  id
  checkoutUrl
  totalQuantity
  cost {
    subtotalAmount { amount currencyCode }
    totalAmount { amount currencyCode }
  }
  lines(first: 250) {
    edges {
      node {
        id
        quantity
        cost { subtotalAmount { amount currencyCode } }
        merchandise {
          ... on ProductVariant {
            id
            title
            price { amount currencyCode }
            product {
              id
              title
              handle
              featuredImage { url altText }
            }
            selectedOptions { name value }
          }
        }
      }
    }
  }
`;

const CREATE_CART_MUTATION = `
  mutation CreateCart($input: CartInput!) {
    cartCreate(input: $input) {
      cart { ${CART_FIELDS} }
      userErrors { field message }
    }
  }
`;

const ADD_TO_CART_MUTATION = `
  mutation AddToCart($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart { ${CART_FIELDS} }
      userErrors { field message }
    }
  }
`;

const UPDATE_CART_LINE_MUTATION = `
  mutation UpdateCartLine($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart { ${CART_FIELDS} }
      userErrors { field message }
    }
  }
`;

const REMOVE_FROM_CART_MUTATION = `
  mutation RemoveFromCart($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart { ${CART_FIELDS} }
      userErrors { field message }
    }
  }
`;

const GET_CART_QUERY = `
  query GetCart($cartId: ID!) {
    cart(id: $cartId) { ${CART_FIELDS} }
  }
`;

function toVariantGID(id) {
  if (!id) throw new Error("Invalid variant ID");
  const s = String(id);
  if (s.startsWith("gid://shopify/ProductVariant/")) return s;
  if (/^\d+$/.test(s)) return `gid://shopify/ProductVariant/${s}`;
  throw new Error("Invalid variant ID format. Expected numeric ID or GID format");
}

function formatPrice(amount, currencyCode, locale = "en-EG") {
  if (amount == null || !currencyCode) return "";
  const n = Number(amount);
  if (Number.isNaN(n)) return "";
  return new Intl.NumberFormat(locale, { style: "currency", currency: currencyCode }).format(n);
}

function transformCart(cartData) {
  if (!cartData) return null;

  return {
    id: cartData.id,
    checkoutUrl: cartData.checkoutUrl,
    totalQuantity: cartData.totalQuantity || 0,
    subtotal: formatPrice(cartData.cost?.subtotalAmount?.amount, cartData.cost?.subtotalAmount?.currencyCode),
    total: formatPrice(cartData.cost?.totalAmount?.amount, cartData.cost?.totalAmount?.currencyCode),
    items:
      cartData.lines?.edges?.map((edge) => {
        const line = edge.node;
        const variant = line.merchandise;

        return {
          id: line.id,
          quantity: line.quantity,
          variantId: variant.id,
          title: variant.title,
          price: formatPrice(variant.price?.amount, variant.price?.currencyCode),
          rawPrice: variant.price?.amount,
          rawCurrency: variant.price?.currencyCode,
          subtotal: formatPrice(line.cost?.subtotalAmount?.amount, line.cost?.subtotalAmount?.currencyCode),
          product: {
            id: variant.product.id,
            title: variant.product.title,
            handle: variant.product.handle,
            image: variant.product.featuredImage?.url,
            imageAlt: variant.product.featuredImage?.altText,
          },
          options: variant.selectedOptions?.map((opt) => ({ name: opt.name, value: opt.value })) || [],
        };
      }) || [],
  };
}

class CartService {
  constructor() {
    this.cartId = this.getCartIdFromStorage();
    this._createInFlight = null;
  }

  getCartIdFromStorage() {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("shopify_cart_id");
  }

  saveCartIdToStorage(cartId) {
    if (typeof window === "undefined") return;
    if (cartId) localStorage.setItem("shopify_cart_id", cartId);
    else localStorage.removeItem("shopify_cart_id");
  }

  async ensureCart() {
    if (this.cartId) return this.cartId;
    if (!this._createInFlight) {
      this._createInFlight = this.createCart()
        .then(() => this.cartId)
        .finally(() => {
          this._createInFlight = null;
        });
    }
    const id = await this._createInFlight;
    if (!id) throw new Error("Failed to ensure cart");
    return id;
  }

  async createCart() {
    const res = await apiClient.graphql(CREATE_CART_MUTATION, { input: {} });

    const errs = res?.cartCreate?.userErrors || [];
    if (errs.length) throw new Error(errs.map((e) => e.message).join(" | "));

    const cart = res?.cartCreate?.cart;
    if (!cart) throw new Error("Failed to create cart");

    this.cartId = cart.id;
    this.saveCartIdToStorage(cart.id);
    return transformCart(cart);
  }

  async getCart() {
    if (!this.cartId) return null;

    try {
      const res = await apiClient.graphql(GET_CART_QUERY, { cartId: this.cartId });
      const cart = res?.cart;

      if (!cart) {
        this.cartId = null;
        this.saveCartIdToStorage(null);
        return null;
      }

      return transformCart(cart);
    } catch (e) {
      console.error("Error in getCart:", e);
      this.cartId = null;
      this.saveCartIdToStorage(null);
      return null;
    }
  }

  async addToCart(variantId, quantity = 1) {
    const merchandiseId = toVariantGID(variantId);
    await this.ensureCart();

    const lines = [{ merchandiseId, quantity: Math.max(1, parseInt(quantity, 10) || 1) }];

    const res = await apiClient.graphql(ADD_TO_CART_MUTATION, { cartId: this.cartId, lines });

    const errs = res?.cartLinesAdd?.userErrors || [];
    if (errs.length) throw new Error(errs.map((e) => e.message).join(" | "));

    const cart = res?.cartLinesAdd?.cart;
    if (!cart) throw new Error("Failed to add item to cart");
    return transformCart(cart);
  }

  async updateCartLine(lineId, quantity) {
    if (!this.cartId) throw new Error("No cart found");
    if (!lineId) throw new Error("Invalid line id");

    if (quantity <= 0) return this.removeFromCart(lineId);

    const res = await apiClient.graphql(UPDATE_CART_LINE_MUTATION, {
      cartId: this.cartId,
      lines: [{ id: lineId, quantity }],
    });

    const errs = res?.cartLinesUpdate?.userErrors || [];
    if (errs.length) throw new Error(errs.map((e) => e.message).join(" | "));

    const cart = res?.cartLinesUpdate?.cart;
    if (!cart) throw new Error("Failed to update cart line");
    return transformCart(cart);
  }

  async removeFromCart(lineId) {
    if (!this.cartId) throw new Error("No cart found");
    const res = await apiClient.graphql(REMOVE_FROM_CART_MUTATION, { cartId: this.cartId, lineIds: [lineId] });
    const errs = res?.cartLinesRemove?.userErrors || [];
    if (errs.length) throw new Error(errs.map((e) => e.message).join(" | "));

    const cart = res?.cartLinesRemove?.cart;
    if (!cart) throw new Error("Failed to remove item from cart");

    const transformedCart = transformCart(cart);

    if (transformedCart && transformedCart.items.length === 0) {
      this.cartId = null;
      this.saveCartIdToStorage(null);
      return null;
    }

    return transformedCart;
  }

  getCartId() {
    return this.cartId;
  }

  hasCart() {
    return !!this.cartId;
  }

  async getCheckoutUrl() {
    if (!this.cartId) return null;
    const cart = await this.getCart();
    return cart?.checkoutUrl || null;
  }
}

export const cartService = new CartService();
export default cartService;
