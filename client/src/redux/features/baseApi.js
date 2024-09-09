import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_API_URL,
  }),
  tagTypes: [
    "admission",
    "users",
    "courses",
    "websites",
    "videos",
    "orders",
    "categories",
    "subcategories",
  ],
  endpoints: () => ({}),
});

export default baseApi;
