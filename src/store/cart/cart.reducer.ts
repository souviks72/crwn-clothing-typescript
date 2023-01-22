import { AnyAction } from "redux";

import { CART_ACTION_TYPES, CartItem } from "./cart.types";
import { setIsCartOpen } from "./cart.action";

export type CartState = {
  readonly isCartOpen: boolean;
  readonly cartItems: CartItem[];
};

export const CART_INITIAL_STATE: CartState = {
  isCartOpen: false,
  cartItems: [],
};

export const cartReducer = (
  state = CART_INITIAL_STATE,
  action = {} as AnyAction
): CartState => {
  if (setIsCartOpen.match(action)) {
    return {
      ...state,
      isCartOpen: action.payload,
    };
  }

  if (action.type === CART_ACTION_TYPES.SET_CART_ITEMS) {
    return {
      ...state,
      cartItems: action.payload,
    };
  }

  return state;
};

// switch (type) {
//   case CART_ACTION_TYPES.TOGGLE_CART_OPEN:
//     return {
//       ...state,
//       isCartOpen: payload,
//     };

//   case CART_ACTION_TYPES.SET_CART_ITEMS:
//     return {
//       ...state,
//       cartItems: payload,
//     };
//   default:
//     return state;
// }
