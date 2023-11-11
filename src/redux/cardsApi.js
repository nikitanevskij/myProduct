import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const getTokenFromLocalStorage = () => {
  return localStorage.getItem("token");
};

export const cardsApi = createApi({
  reducerPath: "cardsApi",
  tagTypes: ["Comments"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4444",
  }),
  endpoints: (build) => ({
    getCards: build.query({
      query: () => "/cards",
    }),
    getOneCards: build.query({
      query: (id) => `/cards/${id}`,
    }),
    getComments: build.query({
      query: (id) => `/comment/${id}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Comments", id })),
              { type: "Comments", id: "LIST" },
            ]
          : [{ type: "Comments", id: "LIST" }],
    }),
    addComment: build.mutation({
      query: (body) => ({
        url: `/comment`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
        body,
      }),
      invalidatesTags: [{ type: "Comments", id: "LIST" }],
    }),
    deleteComment: build.mutation({
      query: (id) => ({
        url: `/comment/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      }),
      invalidatesTags: [{ type: "Comments", id: "LIST" }],
    }),
  }),
});

export const {
  useGetCardsQuery,
  useGetOneCardsQuery,
  useGetCommentsQuery,
  useAddCommentMutation,
  useDeleteCommentMutation,
} = cardsApi;
