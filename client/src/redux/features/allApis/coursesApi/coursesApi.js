import baseApi from "../../baseApi";

const coursesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addCourse: builder.mutation({
      query: (data) => ({
        url: "/courses",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["courses"],
    }),

    // get all course
    getAllCourse: builder.query({
      query: () => "/courses",
      providesTags: ["courses"],
    }),
  }),
});
export const { useAddCourseMutation, useGetAllCourseQuery } = coursesApi;
