export enum CART_ACTION_TYPES {
  TOGGLE_CART_OPEN = "cart/TOGGLE_CART_OPEN",
  SET_CART_ITEMS = "cart/SET_CART_ITEMS",
}

export type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
};
