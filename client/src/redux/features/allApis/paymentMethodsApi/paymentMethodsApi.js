import baseApi from "../../baseApi";

const paymentMethodsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // add a payment method
    addPaymentMethod: builder.mutation({
      query: (data) => ({
        url: "/payment-methods",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["paymentMethods"],
    }),

    // get all payment methods
    getPaymentMethods: builder.query({
      query: () => "/payment-methods",
      providesTags: ["paymentMethods"],
    }),

    // update payment method status
    updatePaymentMethodStatus: builder.mutation({
      query: ({ id, isActive }) => ({
        url: `/payment-methods/${id}`,
        method: "PATCH",
        body: { isActive },
      }),
    }),
  }),
});
export const {
  useAddPaymentMethodMutation,
  useGetPaymentMethodsQuery,
  useUpdatePaymentMethodStatusMutation,
} = paymentMethodsApi;
