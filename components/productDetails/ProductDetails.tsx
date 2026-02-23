"use client";

import { useState } from "react";
import Image from "next/image";
import { ProductType } from "@/types/Products";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import { CartItem } from "@/types/Cart";
import { COLORS, SIZES } from "@/utils/presetdata";
import { useRouter } from "next/navigation";

function ProductDetails({ product }: { product: ProductType }) {
  const [selectedSize, setSelectedSize] = useState<number | null>(39);
  const [selectedColor, setSelectedColor] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const images = product.images;
  // Ensure we have at least 4 images for the grid by duplicating
  const gridImages =
    images.length >= 4
      ? images.slice(0, 4)
      : [...images, ...images, ...images, ...images].slice(0, 4);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        ...product,
        size: selectedSize ?? 0,
        color: COLORS[selectedColor].name,
      } as CartItem),
    );
    toast.success(
      `Added to cart! Size: ${selectedSize?.toString() || "Unknown"} Color: ${COLORS[selectedColor].name}`,
    );
  };

  const handleBuyItNow = () => {
    handleAddToCart();
    router.push("/cart");
  };
  return (
    <div className="max-w-7xl mx-auto py-6 md:py-10 px-4 md:px-10">
      {/* Main Product Section */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
        {/* Image Grid */}
        <div className="lg:w-[55%] w-full rounded-4xl overflow-hidden">
          <div className="grid grid-cols-2 gap-2">
            {gridImages.map((img, i) => (
              <div
                key={i}
                className="bg-[#F6F6F6] flex items-center justify-center aspect-square overflow-hidden"
              >
                <Image
                  src={img}
                  alt={`${product.title} ${i + 1}`}
                  width={300}
                  height={300}
                  unoptimized
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                  priority={i === 0}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="lg:w-[45%] w-full flex flex-col gap-4">
          {/* Badge */}
          <span className="inline-block w-fit bg-[#4A69E2] text-white text-[10px] md:text-xs font-bold px-3 py-1 rounded">
            New Release
          </span>

          {/* Title */}
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#232321] leading-tight uppercase">
            {product.title}
          </h1>

          {/* Price */}
          <p className="text-xl md:text-2xl font-bold text-[#232321]">
            ${product.price.toFixed(2)}
          </p>

          {/* Color Selector */}
          <div>
            <p className="text-xs font-bold text-[#232321] uppercase mb-2">
              Color
            </p>
            <div className="flex gap-2">
              {COLORS.map((color, i) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(i)}
                  className={`w-8 h-8 md:w-10 md:h-10 rounded-full border-2 transition-all cursor-pointer ${
                    i === selectedColor
                      ? "border-[#4A69E2] scale-110"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-bold text-[#232321] uppercase">Size</p>
              <button className="text-xs font-semibold text-[#4A69E2] hover:underline cursor-pointer">
                SIZE CHART
              </button>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {SIZES.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-2 rounded-lg text-xs md:text-sm font-semibold transition-all cursor-pointer ${
                    selectedSize === size
                      ? "bg-[#232321] text-white"
                      : "bg-[#F6F6F6] text-[#232321] hover:bg-gray-200"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mt-1">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-[#232321] hover:bg-[#3a3a38] text-white rounded-lg py-3 md:py-3.5 font-semibold text-xs md:text-sm transition-colors cursor-pointer uppercase"
            >
              Add to Cart
            </button>
            <button
              onClick={() => setWishlisted(!wishlisted)}
              className={`w-12 md:w-14 flex items-center justify-center rounded-lg border-2 transition-all cursor-pointer ${
                wishlisted
                  ? "bg-red-50 border-red-400 text-red-500"
                  : "border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-500"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={wishlisted ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth={2}
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            </button>
          </div>

          {/* Buy It Now */}
          <button
            onClick={handleBuyItNow}
            className="w-full bg-[#4A69E2] hover:bg-[#3B57C9] text-white rounded-lg py-3 md:py-3.5 font-semibold text-xs md:text-sm transition-colors cursor-pointer uppercase"
          >
            Buy it Now
          </button>

          {/* About the Product */}
          <div className="mt-2">
            <h3 className="text-sm md:text-base font-bold text-[#232321] uppercase">
              About the Product
            </h3>
            <p className="text-xs md:text-sm text-gray-500 mt-1">
              {COLORS[selectedColor].name}
            </p>
            <p className="text-xs md:text-sm text-gray-600 mt-2 leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
