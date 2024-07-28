import baseApi from "../../baseApi";

const admissionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addAdmission: builder.mutation({
      query: (data) => ({
        url: "/admission",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["admission"],
    }),

    // get all student list
    getStudents: builder.query({
      query: () => "/admission",
      providesTags: ["admission"],
    }),

    // delete single admission
    deleteSingleStudent: builder.mutation({
      query: (id) => ({
        url: `/admission/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["admission"],
    }),
  }),
});

export const {
  useAddAdmissionMutation,
  useGetStudentsQuery,
  useDeleteSingleStudentMutation,
} = admissionApi;
