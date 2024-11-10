import baseApi from "../../baseApi";

const ordersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // add an order
    addOrder: builder.mutation({
      query: (data) => ({
        url: "/orders",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["orders"],
    }),

    // get all orders
    getOrders: builder.query({
      query: () => "/orders",
      providesTags: ["orders"],
    }),

    // update status
    updateStatus: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["orders"],
    }),

    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["orders"],
    }),
  }),
});

export const {
  useAddOrderMutation,
  useGetOrdersQuery,
  useUpdateStatusMutation,
  useDeleteOrderMutation,
} = ordersApi;
