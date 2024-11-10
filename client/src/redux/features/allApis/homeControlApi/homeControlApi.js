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

    // update home control
    updateHomeControl: builder.mutation({
      query: ({ id, data }) => ({
        url: `/home-control/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["homeControls"],
    }),
  }),
});

export const {
  useAddHomeControlMutation,
  useGetAllHomeControlsQuery,
  useUpdateHomeControlMutation,
} = homeControlApi;
