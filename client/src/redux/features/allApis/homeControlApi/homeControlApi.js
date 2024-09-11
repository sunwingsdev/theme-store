import baseApi from "../../baseApi";

const homeControlApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // add control
    addHomeControl: builder.mutation({
      query: (data) => ({
        url: "/home-control",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["homeControls"],
    }),

    //    get all home controls
    getAllHomeControls: builder.query({
      query: () => "/home-control",
      providesTags: ["homeControls"],
    }),
  }),
});

export const { useAddHomeControlMutation, useGetAllHomeControlsQuery } =
  homeControlApi;
