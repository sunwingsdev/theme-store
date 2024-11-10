import baseApi from "../../baseApi";

const controlLogoApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addControlLogo: builder.mutation({
      query: (data) => ({
        url: "/control-logos",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["controlLogos"],
    }),
    getControlLogos: builder.query({
      query: () => "/control-logos",
      providesTags: ["controlLogos"],
    }),
  }),
});

export const { useAddControlLogoMutation, useGetControlLogosQuery } =
  controlLogoApi;

export default controlLogoApi;
