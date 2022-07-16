import React from "react";
import Post from "./post/Post";
import { useSelector } from "react-redux";
import useStyles from "./style";
import { Grid, CircularProgress } from "@material-ui/core";
function Posts({ setcurrentId }) {
  const classes = useStyles();
  const { posts, isLoading } = useSelector((state) => state.posts);
  if (!posts.length && !isLoading) {
    return "No posts";
  }
  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.mainContainer}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
          <Post post={post} setcurrentId={setcurrentId} />
        </Grid>
      ))}
    </Grid>
  );
}

export default Posts;
