"use client";
import { useGetProductsQuery } from "@/redux/api/productsApi";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function HeroSection() {
  const { data: products } = useGetProductsQuery({ offset: 0, limit: 1 });
  const product = products?.[0];
  const [currentImage, setCurrentImage] = useState<string>(
    product?.images[0] || "",
  );
  useEffect(() => {
    setCurrentImage(product?.images[0] || "");
  }, [product?.images]);

  return (
    <section className="max-w-full">
      {/* Heading Over Banner for large screens */}
      <h1 className="text-[14.8vw] xl:text-[14.5vw] 2xl:text-[11vw] font-bold uppercase leading-none text-black my-[24px] px-0 mx-0">
        DO IT <span className="text-[#4A69E2]">RIGHT</span>
      </h1>
      {/* Main Banner Section */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-7 items-stretch relative">
        {/* Main Image Area */}
        <div className="relative flex-1 min-w-0 rounded-2xl md:rounded-3xl overflow-hidden h-[270px] xs:h-[320px] sm:h-[370px] md:h-[440px] lg:h-[520px] shadow-md">
          {/* Hero Shoe Image - You must dynamically set src/top image after this code */}
          <img
            src={currentImage || "/logo_black.svg"}
            alt={product?.title || "Product Image"}
            className="object-cover w-full h-full"
          />
          {/* Golden fabric overlay */}
          <div className="absolute inset-0 from-[#c49a1a]/70 via-[#8b6d14]/60 to-[#5c480e]/85 pointer-events-none" />
          {/* Top-left vertical text (md+ screens) */}
          <div className="hidden md:block absolute left-0 top-1/3 -translate-y-1/2">
            <div className="bg-[#232321] rounded-md px-2 py-1 ml-1 shadow-sm">
              <span
                className="text-white text-[11px] font-medium tracking-[0.25em] uppercase whitespace-nowrap"
                style={{
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  letterSpacing: "0.22em",
                }}
              >
                {product?.category?.name} of the year
              </span>
            </div>
          </div>
          {/* Bottom overlay containing heading & CTA */}
          <div className="absolute left-[16px] bottom-[16px] sm:left-[24px] sm:bottom-[24px] md:left-[32px] md:bottom-[32px] lg:left-[40px] lg:bottom-[40px] xl:left-[48px] xl:bottom-[48px] right-0 flex flex-col z-10 from-black/60 to-transparent">
            <h2 className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-extrabold drop-shadow">
              {product?.title}
            </h2>
            <p className="text-gray-200 mt-1 max-w-[50vw] text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl drop-shadow  ">
              {product?.description?.slice(0, 75) ?? ""}
              {product?.description && product.description.length > 75 ? "..." : ""}
            </p>
            <Link
              href={product?.id != null ? `/product-details/${product.id}` : "#"}
              className="mt-3 w-max bg-[#2046B3] hover:bg-[#123189] transition-colors shadow-md px-4 py-2.5 sm:px-6 sm:py-3 rounded-lg text-white font-semibold text-xs sm:text-sm tracking-wide"
            >
              SHOP NOW
            </Link>
          </div>
          {/* Right Side Thumbnails */}
          <div className="flex flex-col gap-3 md:gap-4 justify-center items-center md:items-stretch mt-2 md:mt-0 w-[60px] md:w-[110px] lg:w-[140px] z-10 absolute bottom-[16px] right-[16px] md:bottom-[24px] md:right-[24px] lg:bottom-[32px] lg:right-[32px]">
            {/* Thumbnail */}
            {product?.images.map((image, index) => (
              <div
                key={index}
                className="relative group rounded-xl lg:rounded-2xl overflow-hidden flex-1 aspect-square min-h-[60px] max-h-[110px] border-2 border-white cursor-pointer"
                onClick={() => setCurrentImage(image)}
              >
                <img
                  src={image}
                  alt={product?.title}
                  className="object-cover w-full h-full transition-transform group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
