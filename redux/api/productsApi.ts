import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductType, CategoryType } from "@/types/Products";

// RTK Query API service for products and categories.
export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.escuelajs.co/api/v1/",
  }),
  endpoints: (builder) => ({
    // Fetch products with pagination and optional category filter.
    getProducts: builder.query<
      ProductType[],
      { offset?: number; limit?: number; categoryId?: number }
    >({
      query: ({ offset = 0, limit = 10, categoryId }) => {
        const params = new URLSearchParams();
        params.set("offset", String(offset));
        params.set("limit", String(limit));
        if (categoryId) params.set("categoryId", String(categoryId));
        return `products?${params.toString()}`;
      },
    }),

    // Fetch a single product by ID.
    getProductById: builder.query<ProductType, number>({
      query: (id) => `products/${id}`,
    }),

    // Fetch all categories.
    getCategories: builder.query<CategoryType[], void>({
      query: () => "categories",
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetCategoriesQuery,
} = productsApi;
