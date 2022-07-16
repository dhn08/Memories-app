import React, { useState } from "react";
import useStyles from "./styles";
import moment from "moment";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
  ButtonBase,
} from "@material-ui/core";
import { ThumbUpAltOutlined } from "@material-ui/icons";
import { DeleteOutline, MoreHorizOutlined } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";
import { useNavigate } from "react-router-dom";
function Post({ post, setcurrentId }) {
  const navigate = useNavigate();
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const [likes, setLikes] = useState(post?.likes);
  const userid = user?.result?.googleId || user?.result?._id;
  const haslikedPost = post.likes.find((like) => like === userid);

  const handlelike = () => {
    dispatch(likePost(post._id));
    if (haslikedPost) {
      setLikes(post.likes.filter((id) => id !== userid));
    } else {
      setLikes([...post.likes, userid]);
    }
  };
  const Likes = () => {
    if (post?.likes?.length > 0) {
      return likes.find((like) => like === userid) ? (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };
  const openPost = (e) => {
    // dispatch(getPost(post._id, history));

    navigate(`/posts/${post._id}`);
  };
  return (
    <Card className={classes.card}>
      <ButtonBase className={classes.cardAction} onClick={openPost}>
        <CardMedia
          className={classes.media}
          title={post.title}
          image={post.selectedFile}
        />
        <div className={classes.overlay}>
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography className={classes.title} variant="h5" gutterBottom>
          {post.title}
        </Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            {post.message.split(" ").splice(0, 20).join(" ")}...
          </Typography>
        </CardContent>
      </ButtonBase>

      {(user?.result?.googleId === post?.creator ||
        user?.result?._id === post?.creator) && (
        <div className={classes.overlay2}>
          <Button
            style={{ color: "white" }}
            size="small"
            onClick={() => setcurrentId(post._id)}
          >
            <MoreHorizOutlined fontSize="default" />
          </Button>
        </div>
      )}

      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          disabled={!user?.result}
          onClick={handlelike}
        >
          <Likes />
        </Button>
        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <Button
            size="small"
            color="primary"
            onClick={() => dispatch(deletePost(post._id))}
          >
            <DeleteOutline fontSize="small" />
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

export default Post;
