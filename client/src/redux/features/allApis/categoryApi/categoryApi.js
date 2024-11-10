import baseApi from "../../baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // add category
    addCategory: builder.mutation({
      query: (data) => ({
        url: "/category",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["categories"],
    }),

    // get all categories
    getCategories: builder.query({
      query: () => "/category",
    }),
  }),
});

export const { useAddCategoryMutation, useGetCategoriesQuery } = categoryApi;
