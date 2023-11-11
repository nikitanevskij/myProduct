import React from "react";
import { Post } from "../components/Post";
import Grid from "@mui/material/Unstable_Grid2";
import { Link } from "react-router-dom";
import { useGetCardsQuery } from "../redux/cardsApi";

export const Home = () => {
  const { data, isLoading, refetch } = useGetCardsQuery();
  React.useEffect(() => {
    refetch();
  }, []);

  return (
    <Grid container spacing={2}>
      {(isLoading ? [...Array(6)] : data).map((obj, index) => (
        <Grid sm={6} md={4} key={index}>
          {isLoading ? (
            <Post key={index} id={index} isLoading={true} />
          ) : (
            <Link to={`/post/${obj._id}`}>
              <Post
                key={obj._id}
                id={obj._id}
                imageUrl={obj.imageUrl}
                viewsCount={obj.viewsCount}
              />
            </Link>
          )}
        </Grid>
      ))}
    </Grid>
  );
};
