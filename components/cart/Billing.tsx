"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BillingFormValues, billingSchema } from "@/types/Billing";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { clearCart } from "@/redux/features/cart/cartSlice";
import { useDispatch } from "react-redux";

// The Billing component that displays the billing information form.
function Billing() {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BillingFormValues>({
    resolver: zodResolver(billingSchema),
  });

  const onSubmit = (data: BillingFormValues) => {
    console.log("Billing Info Submitted:", data);
    dispatch(clearCart());
    toast.success("Billing information submitted successfully");
    router.push("/");
  };

  return (
    <>
      {/* Billing Information Column */}
      <div className="bg-(--card) rounded-lg shadow p-6 ">
        <h2 className="text-2xl font-bold mb-4 text-(--foreground)">
          Billing Information
        </h2>
        <form
          className="space-y-4"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div>
            <label className="block text-sm font-medium text-(--foreground)">
              Name
            </label>
            <input
              type="text"
              className={`mt-1 block w-full rounded-md border border-(--border) bg-(--background) py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-(--primary)/30 ${
                errors.name ? "border-(--destructive)" : ""
              }`}
              placeholder="Full Name"
              autoComplete="name"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-(--destructive) text-xs mt-1">
                {errors.name.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-(--foreground)">
              Email
            </label>
            <input
              type="email"
              className={`mt-1 block w-full rounded-md border border-(--border) bg-(--background) py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-(--primary)/30 ${
                errors.email ? "border-(--destructive)" : ""
              }`}
              placeholder="Email Address"
              autoComplete="email"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-(--destructive) text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-(--foreground)">
              Phone
            </label>
            <input
              type="number"
              className={`mt-1 block w-full rounded-md border border-(--border) bg-(--background) py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-(--primary)/30 ${
                errors.phone ? "border-(--destructive)" : ""
              }`}
              placeholder="Phone Number"
              autoComplete="number"
              {...register("phone")}
            />
            {errors.phone && (
              <p className="text-(--destructive) text-xs mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-(--foreground)">
              Address
            </label>
            <textarea
              className={`mt-1 block w-full rounded-md border border-(--border) bg-(--background) py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-(--primary)/30 ${
                errors.address ? "border-(--destructive)" : ""
              }`}
              placeholder="Street Address"
              autoComplete="street-address"
              {...register("address")}
            />
            {errors.address && (
              <p className="text-(--destructive) text-xs mt-1">
                {errors.address.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-(--primary) text-(--primary-foreground) font-semibold rounded hover:bg-(--primary)/90 transition cursor-pointer"
          >
            Proceed to Payment
          </button>
        </form>
      </div>
    </>
  );
}
export default Billing;
