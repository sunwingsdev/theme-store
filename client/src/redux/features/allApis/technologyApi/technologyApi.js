import baseApi from "../../baseApi";

const technologyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // add subcategory
    addTechnology: builder.mutation({
      query: (data) => ({
        url: "/technology",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["technologies"],
    }),

    // get all subcategories
    getTechnologies: builder.query({
      query: () => "/technology",
      providesTags: ["technologies"],
    }),

    // delete a technology
    deleteTechnology: builder.mutation({
      query: (id) => ({
        url: `/technology/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["technologies"],
    }),
  }),
});

export const {
  useAddTechnologyMutation,
  useGetTechnologiesQuery,
  useDeleteTechnologyMutation,
} = technologyApi;
