"use client";

import { useRef } from "react";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight, FiArrowUpRight } from "react-icons/fi";
import { useGetCategoriesQuery } from "@/redux/api/productsApi";
import ErrorState from "../shared/ErrorState";

// Category skeleton loader.
function CategorySkeleton() {
  return (
    <div className="min-w-[260px] sm:min-w-[300px] md:min-w-[45%] lg:min-w-[48%] bg-[#E7E7E3] rounded-3xl overflow-hidden animate-pulse flex-shrink-0">
      <div className="bg-gray-300 aspect-[4/3]" />
      <div className="p-5 md:p-6 flex items-end justify-between">
        <div className="h-7 bg-gray-300 rounded w-1/2" />
        <div className="w-11 h-11 bg-gray-300 rounded-xl" />
      </div>
    </div>
  );
}

// Categories section - fetches categories from the API with horizontal scroll.
export default function Categories() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const {
    data: categories,
    isLoading,
    isError,
    refetch,
  } = useGetCategoriesQuery();

  // Filter to main categories (seed data, id <= 5)
  const mainCategories = categories?.filter((cat) => cat.id <= 5) || [];

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = scrollRef.current.offsetWidth * 0.55;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-[#232321] rounded-3xl mx-2 md:mx-6 mt-14 md:mt-20 px-4 md:px-10 py-8 md:py-12">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6 md:mb-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
          CATEGORIES
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-[#3A3A37] text-white flex items-center justify-center hover:bg-[#4A69E2] transition-colors cursor-pointer"
          >
            <FiChevronLeft size={18} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-white text-[#232321] flex items-center justify-center hover:bg-[#4A69E2] hover:text-white transition-colors cursor-pointer"
          >
            <FiChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex gap-4 md:gap-6">
          <CategorySkeleton />
          <CategorySkeleton />
        </div>
      )}

      {/* Error State */}
      {isError && (
        <ErrorState message="Failed to load categories." onRetry={refetch} />
      )}

      {/* Category Cards */}
      {!isLoading && !isError && mainCategories.length > 0 && (
        <div
          ref={scrollRef}
          className="flex gap-4 md:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory"
        >
          {mainCategories.map((category) => (
            <div
              key={category.id}
              className="min-w-[260px] sm:min-w-[300px] md:min-w-[45%] lg:min-w-[48%] bg-[#E7E7E3] rounded-3xl overflow-hidden group cursor-pointer flex-shrink-0 snap-start hover:shadow-lg transition-shadow duration-300"
            >
              {/* Category Image */}
              <div className="bg-[#E7E7E3] aspect-[4/3] relative overflow-hidden flex items-center justify-center">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  unoptimized
                  className="object-contain p-6 group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Category Info */}
              <div className="px-5 pb-5 md:px-6 md:pb-6 flex items-end justify-between">
                <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold text-[#232321] leading-tight uppercase">
                  {category.name}
                </h3>
                <button className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#232321] text-white flex items-center justify-center group-hover:bg-[#4A69E2] transition-colors flex-shrink-0 cursor-pointer">
                  <FiArrowUpRight size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
