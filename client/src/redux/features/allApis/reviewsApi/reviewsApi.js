import baseApi from "../../baseApi";

const reviewsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addReview: builder.mutation({
      query: (data) => ({
        url: "/reviews",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["reviews"],
    }),
    getReviews: builder.query({
      query: () => "/reviews",
      providesTags: ["reviews"],
    }),

    // delete review
    deleteReview: builder.mutation({
      query: (id) => ({
        url: `/reviews/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["reviews"],
    }),
  }),
});

export const {
  useAddReviewMutation,
  useGetReviewsQuery,
  useDeleteReviewMutation,
} = reviewsApi;
