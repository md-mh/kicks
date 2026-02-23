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

  const handleRemove = (id: number, size: number, color: string) => {
    if (typeof id === "number") {
      dispatch(removeFromCart({ id: Number(id), size: size, color: color }));
    }
  };

  const handleSizeChange = (id: number, size: number, color: string) => {
    if (size > 0) {
      dispatch(updateSize({ id: Number(id), size: size, color: color }));
    }
  };

  const handleQuantityChange = (
    id: number,
    quantity: number,
    size: number,
    color: string,
  ) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity, size, color }));
    }
  };

  return (
    <div>
      <div
        className="bg-[#f8f8f6] border-0 rounded-3xl p-3 md:p-6"
        style={{ boxShadow: "0 1.5px 0 0 #e6e5e5" }}
      >
        <h2 className="text-[1.6rem] md:text-2xl font-bold text-[#232321] mb-0 leading-tight">
          Your Bag
        </h2>
        <p className="text-[.92rem] md:text-[1.01rem] text-[#757575] mb-4 mt-0.5 leading-snug font-medium">
          Items in your bag not reserved-{" "}
          <span className="lowercase">check out now to make them yours.</span>
        </p>
        {cartItems.length === 0 ? (
          <div className="text-gray-400 text-center my-10 text-sm">
            Your cart is empty.
          </div>
        ) : (
          <ul className="flex flex-col gap-6">
            {cartItems.map((item: CartItem, index: number) => (
              <li key={index} className="flex gap-4 md:gap-6 pb-0 border-b-0">
                {/* Product Image */}
                <div className="w-[110px] min-w-[110px] h-[110px] md:w-[135px] md:h-[135px] bg-[#eff0ed] rounded-xl overflow-hidden flex items-center justify-center shrink-0">
                  <Image
                    src={item.images?.[0] ?? "/logo_black.svg"}
                    alt={item.title}
                    width={135}
                    height={135}
                    unoptimized
                    className="object-contain w-[85%] h-[85%]"
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                  />
                </div>
                {/* Product Details */}
                <div className="flex flex-col justify-between flex-1 min-w-0">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-1 md:gap-2">
                    <div>
                      <h3 className="font-bold text-[#232321] text-base md:text-lg uppercase leading-tight tracking-wide mb-0.5 md:mt-1">
                        {item.title}
                      </h3>
                      <p className="text-[.99rem] text-[#333] font-medium mb-0.5">
                        {item.category?.name}
                      </p>
                      <p className="text-[.99rem] text-[#757575] font-normal mb-0">
                        {/* For demo only: show color text if available */}

                        <span className="opacity-80">
                          {item.color ?? "N/A"}
                        </span>
                      </p>
                    </div>
                    <div className="md:text-right mt-2 md:mt-0">
                      <span className="font-bold text-[#1966d2] text-lg md:text-[1.25rem] whitespace-nowrap tracking-tight">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-x-12 gap-y-2 mt-4 mb-3 md:mt-5 md:mb-3">
                    <div className="flex items-center gap-2">
                      <label
                        className="text-[.99rem] text-[#232321] font-medium mr-1"
                        htmlFor={`cart-size-${index}`}
                      >
                        Size
                      </label>
                      <select
                        id={`cart-size-${index}`}
                        value={item.size}
                        onChange={(e) =>
                          handleSizeChange(
                            Number(item.id),
                            Number(e.target.value),
                            item.color,
                          )
                        }
                        className="text-[1rem] border border-[#e6e5e5] rounded-md px-2.5 py-1 bg-white text-[#232321] focus:outline-none focus:ring-1 focus:ring-gray-300 cursor-pointer min-w-[50px]"
                        style={{ boxShadow: "none" }}
                      >
                        {SIZES.map((size) => (
                          <option key={size} value={size}>
                            {size}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex items-center gap-2">
                      <label
                        className="text-[.99rem] text-[#232321] font-medium mr-1"
                        htmlFor={`cart-qty-${index}`}
                      >
                        Quantity
                      </label>
                      <select
                        id={`cart-qty-${index}`}
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            Number(item.id),
                            Number(e.target.value),
                            item.size,
                            item.color,
                          )
                        }
                        className="text-[1rem] border border-[#e6e5e5] rounded-md px-2.5 py-1 bg-white text-[#232321] focus:outline-none focus:ring-1 focus:ring-gray-300 cursor-pointer min-w-[40px]"
                        style={{ boxShadow: "none" }}
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
                  <div className="flex items-center gap-6 mt-0 mb-1">
                    <button
                      type="button"
                      className="p-1.5 rounded-full text-[#a5a5a5] hover:text-[#232321] transition-colors cursor-pointer border border-[#ededed] bg-white"
                      title="Add to wishlist"
                      style={{
                        width: 38,
                        height: 38,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <FiHeart size={20} />
                    </button>
                    <button
                      type="button"
                      className="p-1.5 rounded-full text-[#a5a5a5] hover:text-[#d61c1c] transition-colors cursor-pointer border border-[#ededed] bg-white"
                      title="Remove from cart"
                      style={{
                        width: 38,
                        height: 38,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      onClick={() =>
                        handleRemove(Number(item.id), item.size, item.color)
                      }
                    >
                      <FiTrash2 size={20} />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Link href="/" className="inline-block mt-4">
        <span className="text-[.99rem] text-[#757575] hover:text-[#232321] underline transition-colors font-medium">
          Continue Shopping
        </span>
      </Link>
    </div>
  );
}

export default CartView;
