import Image from "next/image";
import { ProductType } from "@/types/Products";
import AddCart from "../shared/AddCart";
import Link from "next/link";
import Category from "../shared/Category";

// Product card component for grid view.
function ProductCardItem({ product }: { product: ProductType }) {
  return (
    <div className="flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-lg overflow-hidden">
      <div className="flex justify-center items-center bg-[#F6F6F6] p-4">
        <Link href={`/product-details/${product.id}`}>
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            className="rounded-lg object-contain h-[160px] w-full mx-auto cursor-pointer"
          />
        </Link>
      </div>
      <div className="flex flex-col flex-1 gap-3 px-4 pt-3 pb-4">
        <Link href={`/product-details/${product.id}`}>
          <h2
            className="text-sm font-bold text-[#232321] truncate"
            title={product.title}
          >
            {product.title}
          </h2>
        </Link>
        <Category category={product.category} />
        <div className="flex flex-row items-center justify-between gap-2">
          <span className="bg-[#4A69E2]/10 text-[#4A69E2] text-sm font-semibold px-3 py-1 rounded">
            ${product.price}
          </span>
          <AddCart product={product} />
        </div>
      </div>
    </div>
  );
}

export default ProductCardItem;
