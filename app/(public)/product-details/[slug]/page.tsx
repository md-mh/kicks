import { Metadata } from "next";
import { getServerData } from "@/utils/get";
import { ProductType } from "@/types/Products";
import ProductDetailsView from "@/components/productDetails/ProductDetails";
import Link from "next/link";
import NewDrops from "@/components/home/NewDrops";
import AlsoLiked from "@/components/shared/AlsoLiked";

// Get the product data from the API.
async function getProduct(id: string) {
  return getServerData<ProductType>(`/products/${id}`);
}

// Generate dynamic SEO metadata for the product page.
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  return {
    title: product ? `${product.title} - KICKS` : "Product Not Found - KICKS",
    description: product?.description || "View product details on KICKS.",
  };
}

// Product Details page - server component with error handling.
export default async function ProductDetailsPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const product = await getProduct(slug);

  // Not found state
  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-4">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <svg
            className="w-10 h-10 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-extrabold text-[#232321]">
          Product Not Found
        </h2>
        <p className="text-gray-500 mt-2 text-center">
          The product you&apos;re looking for doesn&apos;t exist or has been
          removed.
        </p>
        <Link
          href="/"
          className="mt-6 bg-[#4A69E2] hover:bg-[#3B57C9] text-white px-8 py-3 rounded-lg font-semibold text-sm transition-colors"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <>
      <ProductDetailsView product={product} />
      <AlsoLiked />
    </>
  );
}
