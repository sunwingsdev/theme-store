import baseApi from "../../baseApi";

const websitesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // add website
    addWebsite: builder.mutation({
      query: (data) => ({
        url: "/websites",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["websites"],
    }),

    // get all websites
    getAllWebsites: builder.query({
      query: () => "/websites",
      providesTags: ["websites"],
    }),
    
  }),
});

export const { useAddWebsiteMutation, useGetAllWebsitesQuery } = websitesApi;
