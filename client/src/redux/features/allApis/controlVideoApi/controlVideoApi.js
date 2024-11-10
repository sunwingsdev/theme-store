import baseApi from "../../baseApi";

const controlVideoApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addControlVideo: builder.mutation({
      query: (data) => ({
        url: "/control-videos",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["controlVideos"],
    }),
    getControlVideos: builder.query({
      query: () => "/control-videos",
      providesTags: ["controlVideos"],
    }),
  }),
});

export const { useAddControlVideoMutation, useGetControlVideosQuery } =
  controlVideoApi;
