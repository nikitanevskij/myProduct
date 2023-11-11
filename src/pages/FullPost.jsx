import React from "react";
import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { useSelector } from "react-redux";
import { isAuthSelect } from "../redux/authSlice";
import { useParams } from "react-router-dom";
import { useGetCommentsQuery, useGetOneCardsQuery } from "../redux/cardsApi";

export const FullPost = () => {
  const { id } = useParams();
  const isAuth = useSelector(isAuthSelect);
  const { data, isLoading, refetch } = useGetOneCardsQuery(id);
  const { data: comments, isLoading: isLoadingComments } = useGetCommentsQuery(id);
  console.log(comments);
  console.log("isLoadingComments", isLoadingComments);
  React.useEffect(() => {
    refetch();
  }, []);

  if (isLoading) {
    return <Post isFullPost isLoading />;
  }
  return (
    <>
      <Post
        id={data._id}
        imageUrl={data.imageUrl}
        commentsCount={3}
        viewsCount={data.viewsCount}
        isFullPost
      ></Post>
      <CommentsBlock items={comments} isLoading={isLoadingComments}>
        {isAuth && <Index imageId={data._id} />}
      </CommentsBlock>
    </>
  );
};
