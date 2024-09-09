import baseApi from "../../baseApi";

const subcategoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // add subcategory
    addSubcategory: builder.mutation({
      query: (data) => ({
        url: "/subcategory",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["subcategories"],
    }),

    // get all subcategories
    getSubcategories: builder.query({
      query: () => "/subcategory",
      providesTags: ["subcategories"],
    }),
  }),
});

export const { useAddSubcategoryMutation, useGetSubcategoriesQuery } =
  subcategoryApi;
