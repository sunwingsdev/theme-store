import baseApi from "../../baseApi";

const queriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addQuery: builder.mutation({
      query: (data) => ({
        url: "/query",
        method: "POST",
        body: data,
      }),
    }),
  }),
});
export const { useAddQueryMutation } = queriesApi;
