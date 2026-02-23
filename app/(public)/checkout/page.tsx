import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Checkout - KICKS",
  description: "Complete your order on KICKS.",
};

export default function CheckoutPage() {
  return (
    <div className="max-w-lg mx-auto py-20 px-6 flex flex-col items-center bg-white rounded-3xl shadow-lg my-20">
      <h1 className="text-3xl font-extrabold text-[#232321] mb-3 tracking-tight">
        Order placed successfully
      </h1>
      <p className="text-base text-[#757575] mb-8 max-w-[80%] text-center">
        Thank you for your order. We will process it as soon as possible.
      </p>
      <div className="flex flex-col md:flex-row gap-3 w-full justify-center">
        <Link
          href="/"
          className="inline-block bg-[#232321] hover:bg-[#44443C] text-white px-6 py-3 rounded-lg font-semibold text-sm transition-colors shadow"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
