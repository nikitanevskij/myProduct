import React from "react";
import { SideBlock } from "./SideBlock";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Skeleton from "@mui/material/Skeleton";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useDeleteCommentMutation } from "../redux/cardsApi";

export const CommentsBlock = ({ items, children, isLoading = true }) => {
  const { data } = useSelector((state) => state.user);
  const [deleteComment] = useDeleteCommentMutation();

  return (
    <SideBlock title="Комментарии">
      <List>
        {(isLoading ? [...Array(5)] : items).map((obj, index) => (
          <React.Fragment key={index}>
            <ListItem alignItems="center">
              <ListItemAvatar>
                <Skeleton variant="circular" width={40} height={40} />
              </ListItemAvatar>
              {isLoading ? (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Skeleton variant="text" height={25} width={120} />
                  <Skeleton variant="text" height={18} width={230} />
                </div>
              ) : (
                <ListItemText primary={obj.userId.fullName} secondary={obj.text} />
              )}
              {isLoading === false && data?._id === obj.userId._id ? (
                <Button onClick={() => deleteComment(obj._id)} variant="text">
                  Удалить
                </Button>
              ) : (
                ""
              )}
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
      {children}
    </SideBlock>
  );
};
