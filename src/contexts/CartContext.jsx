"use client";

import { createContext, useContext, useReducer, useEffect, useCallback } from "react";
import { cartService } from "@/services/shopify/shopifyCart";

const cartReducer = (state, action) => {
  switch (action.type) {
    case "SET_CART":
      return { ...state, cart: action.payload, loading: false, error: null };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    case "CLEAR_ERROR":
      return { ...state, error: null };
    case "CLEAR_CART":
      return { ...state, cart: null, loading: false, error: null };
    default:
      return state;
  }
};

const initialState = { cart: null, loading: false, error: null };

const CartContext = createContext();

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const handleCartOperation = useCallback(async (operation, errorMessage) => {
    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "CLEAR_ERROR" });

    try {
      const result = await operation();
      if (result) {
        dispatch({ type: "SET_CART", payload: result });
        return { success: true, cart: result };
      }
      dispatch({ type: "CLEAR_CART" });
      return { success: true, cart: null };
    } catch (error) {
      console.error("Error in cart operation:", error);
      const message = error.message || errorMessage;
      dispatch({ type: "SET_ERROR", payload: message });
      return { success: false, error: message };
    }
  }, []);

  const loadCart = useCallback(async () => {
    if (!cartService.hasCart()) {
      dispatch({ type: "SET_LOADING", payload: false });
      return;
    }
    await handleCartOperation(() => cartService.getCart(), "Failed to load cart");
  }, [handleCartOperation]);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  const addToCart = useCallback(
    async (variantId, quantity = 1) => handleCartOperation(() => cartService.addToCart(variantId, quantity), "Failed to add item to cart"),
    [handleCartOperation]
  );

  const updateCartLine = useCallback(
    async (lineId, quantity) => handleCartOperation(() => cartService.updateCartLine(lineId, quantity), "Failed to update cart"),
    [handleCartOperation]
  );

  const removeFromCart = useCallback(
    async (lineId) => handleCartOperation(() => cartService.removeFromCart(lineId), "Failed to remove item from cart"),
    [handleCartOperation]
  );

  const clearError = useCallback(() => dispatch({ type: "CLEAR_ERROR" }), []);

  const getItemCount = useCallback(() => state.cart?.totalQuantity || 0, [state.cart]);
  const isCartEmpty = useCallback(() => !state.cart || state.cart.items.length === 0, [state.cart]);
  const isItemInCart = useCallback(
    (variantId) => (state.cart ? state.cart.items.some((item) => item.variantId === variantId) : false),
    [state.cart]
  );
  const getItemQuantity = useCallback(
    (variantId) => {
      if (!state.cart) return 0;
      const item = state.cart.items.find((item) => item.variantId === variantId);
      return item ? item.quantity : 0;
    },
    [state.cart]
  );
  const getCheckoutUrl = useCallback(async () => cartService.getCheckoutUrl(), []);

  const value = {
    cart: state.cart,
    loading: state.loading,
    error: state.error,
    addToCart,
    updateCartLine,
    removeFromCart,
    clearError,
    loadCart,
    getItemCount,
    isCartEmpty,
    isItemInCart,
    getItemQuantity,
    getCheckoutUrl,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}
