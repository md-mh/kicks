"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import type { IRootState } from "@/redux/rootReducer";
import { FiChevronRight } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { clearCart } from "@/redux/features/cart/cartSlice";
import { useRouter } from "next/navigation";

function OrderSummary() {
  const [promoOpen, setPromoOpen] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const cartItems = useSelector((state: IRootState) => state.cart.items);
  const dispatch = useDispatch();
  const router = useRouter();
  const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const delivery = cartItems.length > 0 ? 6.99 : 0;
  const salesTax: number = 0;
  const total = subtotal + delivery + salesTax;

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#232321] mb-6">Order Summary</h2>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-[#232321]">
            {itemCount} {itemCount === 1 ? "ITEM" : "ITEMS"}
          </span>
          <span className="text-[#232321]">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[#232321]">Delivery</span>
          <span className="text-[#232321]">${delivery.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[#232321]">Sales Tax</span>
          <span className="text-[#232321]">
            {salesTax > 0 ? `$${salesTax.toFixed(2)}` : "-"}
          </span>
        </div>
        <div className="flex justify-between items-center pt-3 border-t border-gray-200">
          <span className="font-bold text-[#232321] text-lg">Total</span>
          <span className="font-bold text-[#232321] text-lg">
            ${total.toFixed(2)}
          </span>
        </div>
      </div>

      <button
        onClick={() => {
          dispatch(clearCart());
          router.push("/checkout");
        }}
        type="button"
        className="w-full py-3.5 bg-[#232321] hover:bg-[#3a3a37] text-white font-semibold rounded-lg transition-colors cursor-pointer text-sm uppercase tracking-wide"
      >
        Checkout
      </button>

      {/* Promo Code */}
      <div className="mt-4">
        <button
          type="button"
          onClick={() => setPromoOpen(!promoOpen)}
          className="flex items-center gap-1 text-sm text-[#232321] hover:underline cursor-pointer"
        >
          Use a promo code
          <FiChevronRight
            size={14}
            className={`transition-transform ${promoOpen ? "rotate-90" : ""}`}
          />
        </button>
        {promoOpen && (
          <div className="flex gap-2 mt-2">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Enter promo code"
              className="flex-1 text-sm border border-gray-200 rounded-md px-3 py-2 bg-white text-[#232321] focus:outline-none focus:ring-1 focus:ring-gray-300"
            />
            <button
              type="button"
              className="px-4 py-2 bg-[#232321] text-white text-sm rounded-md hover:bg-[#3a3a37] transition-colors cursor-pointer"
            >
              Apply
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderSummary;
