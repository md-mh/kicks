"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { IRootState } from "@/redux/rootReducer";
import { removeFromCart, clearCart } from "@/redux/features/cart/cartSlice";
import { useRouter } from "next/navigation";
import { CartItem } from "@/types/Cart";

// Cart dropdown component in the header.
export default function Cart() {
  const divRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: IRootState) => state.cart.items);

  const total = cartItems.reduce(
    (acc: number, item: CartItem) => acc + item.price * item.quantity,
    0,
  );

  const handleRemove = (id: number, size: number, color: string) => {
    if (typeof id === "number") {
      dispatch(removeFromCart({ id: id, size: size, color: color }));
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    setOpen(false);
  };

  const handleCheckout = () => {
    router.push("/cart");
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        divRef.current &&
        !divRef.current.contains(event.target as Node & EventTarget)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className="relative">
      <button
        className="relative p-0 w-[32px] h-[32px] flex items-center justify-center rounded-full bg-[#FFA833] hover:opacity-90 transition border-none shadow-none cursor-pointer"
        onClick={() => setOpen(!open)}
        aria-label="View cart"
      >
        <span className="flex items-center justify-center w-full h-full font-bold text-sm text-[#2B2A29] select-none">
          {cartItems.length}
        </span>
      </button>

      {/* Cart Dropdown */}
      {open && (
        <div
          ref={divRef}
          className="absolute right-0 z-50 w-[340px] sm:w-[370px] top-full rounded-2xl shadow-2xl mt-2 bg-white border border-gray-100 overflow-hidden"
        >
          <div className="flex flex-col">
            <div className="flex-1 p-4 overflow-y-auto max-h-[60vh]">
              {cartItems.length === 0 ? (
                <div className="text-gray-400 text-center py-8 text-sm">
                  Your cart is empty.
                </div>
              ) : (
                <ul className="space-y-4">
                  {cartItems.map((item: CartItem, index: number) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#F6F6F6] rounded-lg overflow-hidden flex items-center justify-center shrink-0">
                        <Image
                          src={item.images[0]}
                          alt={item.title}
                          width={48}
                          height={48}
                          unoptimized
                          className="object-contain"
                        />
                      </div>
                      <div className="flex flex-col gap-1 w-full min-w-0">
                        <div className="font-semibold text-[#232321] text-sm truncate">
                          {item.title}
                        </div>
                        <div className="flex justify-between items-center gap-2">
                          <span className="text-xs text-gray-500">
                            ${item.price.toFixed(2)} x {item.quantity}
                          </span>
                          <span className="font-bold text-[#232321] text-sm">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                          <button
                            type="button"
                            className="text-red-500 hover:text-red-700 text-xs cursor-pointer"
                            onClick={() =>
                              handleRemove(item.id, item.size, item.color)
                            }
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="border-t border-gray-100 p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[#232321] font-semibold">Total</span>
                <span className="text-[#232321] font-bold text-lg">
                  ${total.toFixed(2)}
                </span>
              </div>
              <button
                className="w-full py-2.5 bg-[#232321] hover:bg-[#4A69E2] text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-sm"
                disabled={cartItems.length === 0}
                onClick={handleCheckout}
              >
                Checkout
              </button>
              {cartItems.length > 0 && (
                <button
                  className="w-full mt-2 py-2 bg-gray-100 text-[#232321] font-semibold rounded-lg hover:bg-gray-200 transition-colors text-xs cursor-pointer"
                  onClick={handleClearCart}
                >
                  Clear Cart
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
