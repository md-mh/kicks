import { ProductType } from "./Products";

// The Cart Item interface that defines the cart item.
export interface CartItem extends ProductType {
  quantity: number;
  size: string;
  color: string;
}

// The Cart State interface that defines the cart state.
export interface CartState {
  items: CartItem[];
}
