"use client";

import { ProductType, SortType } from "@/types/Products";
import { useState } from "react";
import ProductCardItem from "./ProductCardItem";
import ProductListItem from "./ProductListItem";
import { FaList, FaSearch } from "react-icons/fa";
import { IoGrid } from "react-icons/io5";

// Products View with search, sort, and grid/list toggle.
function ProductsView({ products }: { products: ProductType[] }) {
  const [view, setView] = useState<"grid" | "list">("grid");
  const perPage = 10;
  const [sort, setSort] = useState<SortType>("default");
  const [searchProducts, setSearchProducts] =
    useState<ProductType[]>(products);
  const [filterProducts, setFilterProducts] =
    useState<ProductType[]>(searchProducts);
  const [viewProducts, setViewProducts] = useState<ProductType[]>(
    [...searchProducts].slice(0, perPage)
  );

  const handleSortChange = (value: SortType) => {
    setSort(value);

    if (value === "price-low-to-high") {
      const sorted = [...searchProducts].sort((a, b) => a.price - b.price);
      setFilterProducts(sorted);
      setViewProducts([...sorted].slice(0, perPage));
    } else if (value === "price-high-to-low") {
      const sorted = [...searchProducts].sort((a, b) => b.price - a.price);
      setFilterProducts(sorted);
      setViewProducts([...sorted].slice(0, perPage));
    } else {
      setFilterProducts(searchProducts);
      setViewProducts([...searchProducts].slice(0, perPage));
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const searchData: ProductType[] = [...products].filter((product) =>
      product.title.toLowerCase().includes(value.toLowerCase())
    );
    setSearchProducts(searchData);
    setSort("default");
    setFilterProducts(searchData);
    setViewProducts([...searchData].slice(0, perPage));
  };

  const handleShowMore = () =>
    setViewProducts([
      ...viewProducts,
      ...[...filterProducts].slice(
        viewProducts.length,
        viewProducts.length + perPage
      ),
    ]);

  return (
    <div className="max-w-7xl mx-auto px-4 transition-colors duration-200">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center mt-6 md:mt-0">
        <div className="col-span-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products"
              className="w-full p-2 rounded-lg border font-medium bg-white text-[#232321] border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4A69E2]/30"
              onChange={handleSearch}
            />
            <FaSearch
              size={20}
              className="text-gray-400 absolute right-3 top-1/2 -translate-y-1/2"
            />
          </div>
        </div>
        <div className="col-span-1 flex justify-end mb-6 mt-8 space-x-3">
          <div className="flex items-center gap-2">
            <p className="text-[#232321]">Sort by:</p>
            <select
              className="p-2 rounded-lg border font-medium cursor-pointer bg-white text-[#232321] border-gray-200"
              onChange={(e) => handleSortChange(e.target.value as SortType)}
              value={sort}
            >
              <option value="default">Default</option>
              <option value="price-low-to-high">Price: Low to High</option>
              <option value="price-high-to-low">Price: High to Low</option>
            </select>
          </div>

          <button
            onClick={() => setView("grid")}
            className={`p-2 rounded-lg border font-medium cursor-pointer hidden md:block transition-colors ${
              view === "grid"
                ? "bg-[#4A69E2] text-white border-[#4A69E2]"
                : "bg-white border-gray-200 hover:bg-gray-50"
            }`}
          >
            <IoGrid size={20} />
          </button>
          <button
            onClick={() => setView("list")}
            className={`p-2 rounded-lg border font-medium cursor-pointer hidden md:block transition-colors ${
              view === "list"
                ? "bg-[#4A69E2] text-white border-[#4A69E2]"
                : "bg-white border-gray-200 hover:bg-gray-50"
            }`}
          >
            <FaList size={20} />
          </button>
        </div>
      </div>

      {view === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {viewProducts.map((item) => (
            <ProductCardItem key={item.id} product={item} />
          ))}
        </div>
      ) : (
        <div>
          {viewProducts.map((item) => (
            <ProductListItem key={item.id} product={item} />
          ))}
        </div>
      )}

      {viewProducts.length < filterProducts.length && (
        <button
          className="w-1/2 md:w-1/4 mx-auto my-8 flex justify-center py-2.5 bg-[#232321] hover:bg-[#4A69E2] text-white font-semibold rounded-lg transition-colors cursor-pointer"
          onClick={handleShowMore}
        >
          Show More
        </button>
      )}
    </div>
  );
}

export default ProductsView;
