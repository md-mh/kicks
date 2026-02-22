import Image from "next/image";
import { ProductType } from "@/types/Products";
import AddCart from "../shared/AddCart";
import Link from "next/link";
import Category from "../shared/Category";
import { getProductImage } from "@/utils/getProductImage";

// Product list item component for list view.
function ProductListItem({ product }: { product: ProductType }) {
  return (
    <div className="flex items-center bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-4 max-w-3xl mx-auto w-full transition-all duration-300 hover:shadow-lg">
      <Link href={`/product-details/${product.id}`}>
        <Image
          src={getProductImage(product.images)}
          alt={product.title}
          width={100}
          height={100}
          unoptimized
          className="rounded-lg object-contain p-3 max-w-[100px] max-h-[100px] cursor-pointer"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-2 ml-4">
        <Link href={`/product-details/${product.id}`}>
          <h2 className="text-lg md:text-xl font-bold text-[#232321]">
            {product.title}
          </h2>
        </Link>
        <Category category={product.category} />
      </div>
      <div className="ml-auto flex flex-col items-end gap-2">
        <span className="bg-[#4A69E2]/10 px-3 py-1 rounded text-[#4A69E2] font-semibold text-sm">
          ${product.price}
        </span>
        <AddCart product={product} />
      </div>
    </div>
  );
}

export default ProductListItem;
