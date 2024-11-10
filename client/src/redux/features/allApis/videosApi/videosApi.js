import baseApi from "../../baseApi";

const videosApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // add videos
    addVideo: builder.mutation({
      query: (data) => ({
        url: "/videos",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["videos"],
    }),

    getVideos: builder.query({
      query: () => "/videos",
      providesTags: ["videos"],
    }),

    // modify select video
    updateVideoSelection: builder.mutation({
      query: ({ id, isSelected }) => ({
        url: `/videos/${id}`,
        method: "PATCH",
        body: { isSelected },
      }),
      invalidatesTags: ["videos"],
    }),

    // delete a video
    deleteVideo: builder.mutation({
      query: (id) => ({
        url: `/videos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["videos"],
    }),
  }),
});

export const {
  useAddVideoMutation,
  useGetVideosQuery,
  useUpdateVideoSelectionMutation,
  useDeleteVideoMutation,
} = videosApi;
