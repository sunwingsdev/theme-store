import baseApi from "../../baseApi";

const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // add user to db
    addUser: builder.mutation({
      query: (data) => ({
        url: "/users",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),

    // get all users
    getAllUsers: builder.query({
      query: () => "/users",
      providesTags: ["users"],
    }),

    // get a single user
    getUserByUid: builder.query({
      query: (uid) => `/users/${uid}`,
      providesTags: ["users"],
    }),

    // update role
    updateRole: builder.mutation({
      query: ({ id, role }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: { role },
      }),
    }),
  }),
});

export const {
  useAddUserMutation,
  useGetAllUsersQuery,
  useGetUserByUidQuery,
  useUpdateRoleMutation,
} = usersApi;
