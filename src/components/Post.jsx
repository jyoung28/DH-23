import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Avatar,
  IconButton,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import imagePost from '../static/imagePost.png'
import profilePic from '../static/profile.png'
const Post = ({ username, caption, imageUrl, profileImageUrl }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
    <Card style={{ maxWidth: 400 }}>
      <CardHeader
        avatar={
          <Avatar
            src={profilePic}
            alt={`Jimmy's profile`}
          />
        }
        title='Jimmy'
        subheader="2 hours ago" // You can customize the timestamp
      />
      <CardMedia
        component="img"
        height="auto"
        image={imagePost}
        alt="Post Image"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          I AM ABSOLUTELY BANANAS FOR BANANA
        </Typography>
      </CardContent>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton>
          <FavoriteIcon color="primary" />
        </IconButton>
        <IconButton>
          <CommentIcon color="primary" />
        </IconButton>
        <IconButton>
          <ShareIcon color="primary" />
        </IconButton>
      </div>
    </Card>
    </div>
  );
};

export default Post;
