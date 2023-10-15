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
import imagePost3 from '../static/imagePost3.png'
import profilePic from '../static/profile.png'
const Post3 = ({ username, caption, imageUrl, profileImageUrl }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop:'1rem', marginBottom:'5rem' }}>
    <Card style={{ maxWidth: 400 }}>
      <CardHeader
        avatar={
          <Avatar
            src={profilePic}
            alt={`Jessica's profile`}
          />
        }
        title='Jessica'
        subheader="5 hours ago" // You can customize the timestamp
      />
      <CardMedia
        component="img"
        height="auto"
        image={imagePost3}
        alt="Post Image"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          Bagel-mania!
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

export default Post3;
