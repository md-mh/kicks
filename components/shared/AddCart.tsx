"use client";

import { ProductType } from "@/types/Products";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { toast } from "react-toastify";

// Add to Cart button component.
const AddCart = ({ product }: { product: ProductType }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success("Added to cart!");
  };

  return (
    <button
      className="bg-[#232321] hover:bg-[#3a3a38] text-white rounded-lg px-8 py-3 font-semibold transition-colors cursor-pointer text-sm"
      type="button"
      onClick={handleAddToCart}
    >
      ADD TO CART
    </button>
  );
};

export default AddCart;
