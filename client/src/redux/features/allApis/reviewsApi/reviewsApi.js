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
  }),
});

export const { useAddReviewMutation, useGetReviewsQuery } = reviewsApi;
