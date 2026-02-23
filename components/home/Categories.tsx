"use client";

import { useMemo, useState } from "react";
import { FiChevronLeft, FiChevronRight, FiArrowUpRight } from "react-icons/fi";
import { useGetCategoriesQuery } from "@/redux/api/productsApi";
import Link from "next/link";

// Categories section - fetches categories from the API with horizontal scroll.
export default function Categories() {
  const { data: categories } = useGetCategoriesQuery();

  // Chunk into pairs so we show 2 cards per slide
  const slides = useMemo(() => {
    const pairs = [];
    for (let i = 0; i < (categories?.length ?? 0); i += 2) {
      pairs.push(categories?.slice(i, i + 2) || []);
    }
    return pairs;
  }, [categories]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const maxIndex = slides.length - 1;

  const goPrev = () => {
    setCurrentIndex((i) => Math.max(0, i - 1));
  };
  const goNext = () => {
    setCurrentIndex((i) => Math.min(maxIndex, i + 1));
  };

  return (
    <div className="-mx-4 md:-mx-10">
      <section className="bg-[#292929] pl-7 sm:pl-12 mt-10 sm:mt-30">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6 md:mb-10 pt-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
            CATEGORIES
          </h2>
          <div className="flex gap-2 pr-5">
            <button
              onClick={goPrev}
              className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-[#3A3A37] text-white flex items-center justify-center hover:bg-[#4A69E2] transition-colors cursor-pointer"
            >
              <FiChevronLeft size={18} />
            </button>
            <button
              onClick={goNext}
              className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-white text-[#232321] flex items-center justify-center hover:bg-[#4A69E2] hover:text-white transition-colors cursor-pointer"
            >
              <FiChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Content area with rounded top - carousel shows 2 cards at a time */}
        <div className="bg-[#F8F8F8] rounded-tl-2xl sm:rounded-tl-3xl overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {slides.map((pair, slideIndex) => (
              <div
                key={slideIndex}
                className="w-full grid grid-cols-1 sm:grid-cols-2 divide-x-0 sm:divide-x divide-gray-200/80 shrink-0"
              >
                {pair.map((category, cardIndex) => (
                  <div
                    key={`${slideIndex}-${cardIndex}`}
                    className={`relative min-h-70 sm:min-h-80 flex flex-col ${cardIndex === 0 ? "bg-[#ECEEF0]" : ""}`}
                  >
                    {/* Product image - blends with card background */}
                    <div className="flex-1 flex items-center justify-center py-6 px-4 overflow-hidden">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="max-h-45 sm:max-h-55 w-auto object-contain object-center"
                      />
                    </div>

                    {/* Bottom row: title + CTA button */}
                    <div className="flex items-end justify-between px-5 pb-5 pt-2">
                      <h3 className="text-black font-bold text-sm sm:text-base lg:text-lg uppercase tracking-tight leading-tight max-w-[60%]">
                        {category.name}
                      </h3>
                      <Link
                        href="/"
                        aria-label={`View ${category.name}`}
                        className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors shrink-0 cursor-pointer"
                      >
                        <FiArrowUpRight size={18} />{" "}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
