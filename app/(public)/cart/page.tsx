import CartView from "@/components/cart/CartView";
import OrderSummary from "@/components/cart/OrderSummary";
import AlsoLiked from "@/components/shared/AlsoLiked";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cart - KICKS",
  description: "Your shopping cart on KICKS.",
};

export default async function CartPage() {
  return (
    <>
      {/* Promotional Banner */}
      <div className="px-4 md:px-10 py-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-[#232321]">
            Saving to celebrate
          </h2>
          <p className="text-sm text-[#232321] mt-1">
            Enjoy up to 60% off thousands of styles during the End of Year sale
            - while supplies last. No code needed.
          </p>
          <p className="text-sm mt-1">
            <Link href="#" className="underline font-medium text-[#232321]">
              Join us
            </Link>
            <span className="text-[#232321]"> or </span>
            <Link href="#" className="underline font-medium text-[#232321]">
              Sign-in
            </Link>
          </p>
        </div>
      </div>

      {/* Cart Content */}
      <div className="max-w-7xl mx-auto py-10 px-4 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
          <CartView />
          <OrderSummary />
        </div>
      </div>
      <AlsoLiked />
    </>
  );
}
