"use client";

import Image from "next/image";
import Link from "next/link";
import { useGetProductsQuery } from "@/redux/api/productsApi";
import ProductSkeleton from "../shared/ProductSkeleton";
import ErrorState from "../shared/ErrorState";
import EmptyState from "../shared/EmptyState";

// New Drops section - fetches latest products from the API.
export default function NewDrops() {
  const {
    data: products,
    isLoading,
    isError,
    refetch,
  } = useGetProductsQuery({ offset: 0, limit: 4 });

  return (
    <section className="">
      {/* Section Header */}
      <div className="flex items-end justify-between mb-6 md:mb-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase leading-tight text-[#232321]">
          DON&apos;T MISS OUT
          <br />
          NEW DROPS
        </h2>
        <button className="bg-[#4A69E2] hover:bg-[#3B57C9] text-white px-4 md:px-6 py-2.5 md:py-3 rounded-lg font-semibold text-[10px] sm:text-xs md:text-sm transition-colors whitespace-nowrap cursor-pointer">
          SHOP NEW DROPS
        </button>
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
        <EmptyState message="No new drops available right now." />
      )}

      {/* Product Grid */}
      {!isLoading && !isError && products && products.length > 0 && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 animate-stagger">
          {products.map((product, index) => (
            <Link
              key={product.id}
              href={`/product-details/${product.id}`}
              className="bg-[#f6f6f0] rounded-[16px] shadow-none overflow-hidden group cursor-pointer transition-shadow duration-200 hover:shadow-[0_2px_8px_rgba(74,105,226,0.10)] animate-fade-in-up flex flex-col"
            >
              {/* Product Image Area */}
              <div className="relative border-8 border-white rounded-[16px] overflow-hidden flex items-center justify-center aspect-square mt-1 mb-3">
                {/* New badge */}
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
                <Image
                  src={product.images[0]}
                  alt={product.title}
                  fill
                  unoptimized
                  className="object-contain w-full h-full transition-transform duration-300"
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
                className="w-full bg-[#232321] rounded-lg px-1 sm:px-2 py-2 sm:py-3 xs:py-3.5 mb-2 xs:mb-4 text-[14px] xs:text-[15px] font-semibold text-white transition-colors duration-300 tracking-wide flex flex-row items-stretch justify-start gap-2"
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
          ))}
        </div>
      )}
    </section>
  );
}
