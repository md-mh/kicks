"use client";

import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import type { IRootState } from "@/redux/rootReducer";
import {
  removeFromCart,
  updateQuantity,
  updateSize,
} from "@/redux/features/cart/cartSlice";
import Link from "next/link";
import { FiHeart, FiTrash2 } from "react-icons/fi";
import { CartItem } from "@/types/Cart";
import { SIZES } from "@/utils/presetdata";

function CartView() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: IRootState) => state.cart.items);

  const handleRemove = (id: number) => {
    if (typeof id === "number") {
      dispatch(removeFromCart(id));
    }
  };

  const handleSizeChange = (id: number, size: number) => {
    if (size > 0) {
      dispatch(updateSize({ id: Number(id), size: Number(size) }));
    }
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  console.log(cartItems);

  return (
    <div>
      <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8">
        <h2 className="text-2xl font-bold text-[#232321] mb-1">Your Bag</h2>
        <p className="text-sm text-gray-500 mb-6">
          Items in your bag not reserved- check out now to make them yours.
        </p>

        {cartItems.length === 0 ? (
          <div className="text-gray-400 text-center my-10 text-sm">
            Your cart is empty.
          </div>
        ) : (
          <ul className="space-y-6">
            {cartItems.map((item: CartItem, index: number) => (
              <li
                key={index}
                className="flex gap-4 md:gap-6 pb-6 border-b border-gray-100 last:border-b-0 last:pb-0"
              >
                {/* Product Image */}
                <div className="w-[120px] h-[120px] bg-[#F6F6F6] rounded-xl overflow-hidden flex items-center justify-center shrink-0">
                  <Image
                    src={item.images[0]}
                    alt={item.title}
                    width={120}
                    height={120}
                    unoptimized
                    className="object-contain"
                  />
                </div>

                {/* Product Details */}
                <div className="flex flex-col justify-between flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h3 className="font-bold text-[#232321] text-sm md:text-base uppercase leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-0.5">
                        {item.category?.name}
                      </p>
                    </div>
                    <span className="font-bold text-[#F97316] text-base md:text-lg whitespace-nowrap">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>

                  {/* Size & Quantity Selectors */}
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm text-[#232321]">Size</span>
                      <select
                        value={item.size}
                        onChange={(e) =>
                          handleSizeChange(
                            Number(item.id),
                            Number(e.target.value),
                          )
                        }
                        className="text-sm border border-gray-200 rounded-md px-2 py-1 bg-white text-[#232321] focus:outline-none focus:ring-1 focus:ring-gray-300 cursor-pointer"
                      >
                        {SIZES.map((size) => (
                          <option key={size} value={size}>
                            {size}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm text-[#232321]">Quantity</span>
                      <select
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            Number(item.id),
                            Number(e.target.value),
                          )
                        }
                        className="text-sm border border-gray-200 rounded-md px-2 py-1 bg-white text-[#232321] focus:outline-none focus:ring-1 focus:ring-gray-300 cursor-pointer"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                          <option key={n} value={n}>
                            {n}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Action Icons */}
                  <div className="flex items-center gap-3 mt-3">
                    <button
                      type="button"
                      className="p-1.5 text-gray-500 hover:text-[#232321] transition-colors cursor-pointer"
                      title="Add to wishlist"
                    >
                      <FiHeart size={18} />
                    </button>
                    <button
                      type="button"
                      className="p-1.5 text-gray-500 hover:text-red-500 transition-colors cursor-pointer"
                      title="Remove from cart"
                      onClick={() => handleRemove(Number(item.id))}
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Link href="/" className="inline-block mt-4">
        <span className="text-sm text-gray-500 hover:text-[#232321] underline transition-colors">
          Continue Shopping
        </span>
      </Link>
    </div>
  );
}

export default CartView;
