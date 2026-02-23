"use client";

import { useRef } from "react";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight, FiArrowUpRight } from "react-icons/fi";
import { useGetCategoriesQuery } from "@/redux/api/productsApi";
import ErrorState from "../shared/ErrorState";

// Category skeleton loader.
function CategorySkeleton() {
  return (
    <div className="min-w-[260px] sm:min-w-[300px] md:min-w-[45%] lg:min-w-[48%] bg-white rounded-3xl overflow-hidden animate-pulse flex-shrink-0">
      <div className="bg-gray-200 aspect-[4/3]" />
      <div className="p-4 md:p-5 flex items-end justify-between">
        <div className="h-6 bg-gray-200 rounded w-1/2" />
        <div className="w-10 h-10 bg-gray-200 rounded-full" />
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
  const mainCategories =
    categories?.filter((cat) => cat.id <= 5) || [];

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = scrollRef.current.offsetWidth * 0.55;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="px-4 md:px-10 mt-14 md:mt-20">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6 md:mb-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#232321]">
          CATEGORIES
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#232321] text-white flex items-center justify-center hover:bg-[#4A69E2] transition-colors cursor-pointer"
          >
            <FiChevronLeft size={18} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#232321] text-white flex items-center justify-center hover:bg-[#4A69E2] transition-colors cursor-pointer"
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
          className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory"
        >
          {mainCategories.map((category) => (
            <div
              key={category.id}
              className="min-w-[260px] sm:min-w-[300px] md:min-w-[45%] lg:min-w-[48%] bg-white rounded-3xl overflow-hidden group cursor-pointer flex-shrink-0 snap-start hover:shadow-lg transition-shadow duration-300"
            >
              {/* Category Image */}
              <div className="bg-[#F6F6F6] aspect-[4/3] relative overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Category Info */}
              <div className="p-4 md:p-5 flex items-end justify-between">
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#232321] leading-tight uppercase">
                  {category.name}
                </h3>
                <button className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#232321] text-white flex items-center justify-center group-hover:bg-[#4A69E2] transition-colors flex-shrink-0 cursor-pointer">
                  <FiArrowUpRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
