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
import imagePost2 from '../static/imagePost2.png'
import profilePic from '../static/profile.png'
const Post2 = ({ username, caption, imageUrl, profileImageUrl }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop:'1rem' }}>
    <Card style={{ maxWidth: 400 }}>
      <CardHeader
        avatar={
          <Avatar
            src={profilePic}
            alt={`Keon's profile`}
          />
        }
        title='Keon'
        subheader="4 hours ago" // You can customize the timestamp
      />
      <CardMedia
        component="img"
        height="auto"
        image={imagePost2}
        alt="Post Image"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          Wow these ORANGES from DubHacks 23' Are Great and Healthy!
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

export default Post2;
