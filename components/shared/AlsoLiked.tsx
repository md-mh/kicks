"use client";

import React, { useRef } from "react";
import { FiChevronLeft } from "react-icons/fi";
import { FiChevronRight } from "react-icons/fi";
import { useGetProductsQuery } from "@/redux/api/productsApi";
import Link from "next/link";
import EmptyState from "./EmptyState";
import ErrorState from "./ErrorState";
import ProductSkeleton from "./ProductSkeleton";

const AlsoLiked = () => {
  const {
    data: products,
    isLoading,
    isError,
    refetch,
  } = useGetProductsQuery({ offset: 0, limit: 10 });
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const step = scrollRef.current.offsetWidth;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -step : step,
      behavior: "smooth",
    });
  };

  return (
    <>
      <section className="py-10 lg:py-14">
        <div className="">
          {/* Header: title + scroll arrows */}
          <div className="flex items-start justify-between gap-4 mb-6 lg:mb-8">
            <h2 className="text-[#2E2E2E] font-bold uppercase tracking-tight text-2xl sm:text-3xl lg:text-4xl">
              You may also like
            </h2>
            <div className="flex gap-2 shrink-0">
              <button
                type="button"
                onClick={() => scroll("left")}
                className="w-11 h-11 rounded-lg bg-[#858582] text-gray-300 flex items-center justify-center hover:bg-[#1a1a1a] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#2E2E2E] focus:ring-offset-2 focus:ring-offset-white"
                aria-label="Scroll left"
              >
                <FiChevronLeft />
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                className="w-11 h-11 rounded-lg bg-[#858582] text-gray-300 flex items-center justify-center hover:bg-[#1a1a1a] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#2E2E2E] focus:ring-offset-2 focus:ring-offset-white"
                aria-label="Scroll right"
              >
                <FiChevronRight />
              </button>
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
              {[...Array(4)].map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          )}

          {/* Error State */}
          {isError && (
            <ErrorState message="Failed to load products." onRetry={refetch} />
          )}

          {/* Empty State */}
          {!isLoading && !isError && (!products || products.length === 0) && (
            <EmptyState message="No products available right now." />
          )}

          {/* Horizontal scroll: 2 cards on mobile, 4 on desktop; scroll by viewport */}
          <div
            ref={scrollRef}
            className="flex gap-4 sm:gap-5 overflow-x-auto overflow-y-hidden pb-2 scroll-smooth [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {products?.length === 0 ? (
              <p className="text-center text-[#2E2E2E] py-8 w-full">
                There is no data
              </p>
            ) : (
              products?.map((product, index) => (
                <Link
                  key={product.id}
                  href={`/product-details/${product.id}`}
                  className="bg-[#f6f6f0] rounded-[16px] shadow-none overflow-hidden group cursor-pointer transition-shadow duration-200 hover:shadow-[0_2px_8px_rgba(74,105,226,0.10)] animate-fade-in-up flex flex-col shrink-0 w-[calc(50%-0.5rem)] sm:w-[calc(25%-0.9375rem)]"
                >
                  {/* Product Image Area */}
                  <div className="relative border-8 border-white rounded-[16px] overflow-hidden flex items-center justify-center aspect-square mt-1 mb-3">
                    {/* Category badge */}
                    {index < 3 && (
                      <span
                        className="absolute top-0 left-0 bg-[#4A69E2] text-white font-semibold text-[13px] px-[14px] py-[4px] rounded-br-[18px] rounded-tl-[11px] rounded-tr-none rounded-bl-none z-10"
                        style={{
                          lineHeight: "normal",
                          letterSpacing: "0.02em",
                        }}
                      >
                        New
                      </span>
                    )}
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      width={300}
                      height={300}
                      className="object-cover w-full h-full transition-transform duration-300"
                    />
                  </div>

                  {/* Product Info/Title */}
                  <h3
                    className="text-[1.15rem] font-bold tracking-tight leading-[1.17] uppercase text-[#232321] mb-3 mt-auto px-1"
                    style={{
                      fontFamily: "inherit",
                      lineHeight: "1.18",
                      letterSpacing: "-0.01em",
                      wordBreak: "break-word",
                    }}
                  >
                    {product.title}
                  </h3>

                  {/* CTA Button */}
                  <div
                    className="w-full bg-[#232321] rounded-lg px-1 sm:px-2 py-2 sm:py-3 xs:py-3.5 mb-2 xs:mb-4 text-[14px] xs:text-[15px] font-semibold text-white transition-colors duration-300 tracking-wide flex flex-row items-stretch justify-center gap-2"
                    style={{ letterSpacing: "0.03em" }}
                  >
                    <span className="uppercase tracking-wide text-xs sm:text-sm md:text-base">
                      View Product
                    </span>
                    <span className="text-white">–</span>
                    <span className="text-[#ffa52f] font-bold text-xs sm:text-sm md:text-base">
                      ${product.price}
                    </span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default AlsoLiked;
