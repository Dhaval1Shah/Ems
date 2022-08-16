import React, { useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import "./notification.css";

function notificationsLabel(count) {
  if (count === 0) {
    return "no notifications";
  }
  if (count > 99) {
    return "more than 99 notifications";
  }
  return `${count} notifications`;
}

const Notification = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  useEffect(() => {});

  return (
    <div>
      <IconButton
        aria-describedby={id}
        aria-label={notificationsLabel(100)}
        style={{
          position: "absolute",
          right: "53px",
          top: "8px",
          color: "white",
        }}
        onClick={handleClick}
      >
        <Badge badgeContent={4} color="info">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        PaperProps={{
          style: {
            padding: 2,
            borderRadius: 10,
          },
        }}
      >
        <Typography sx={{ p: 2 }} style={{ height: "400px", width: "400px" }}>
          <div>
            <h2 style={{ fontSize: "27px" }}>Get a first look at Joy UI 🚀</h2>
            The content of the Popover.Get a first look at Joy UI 🚀 Joy UI is
            MUI's new starting point for your design system. Check out the blog
            post to see what's in store for this new library.
          </div>{" "}
          <hr />{" "}
          <h2 style={{ fontSize: "27px" }}>Get a first look at Joy UI 🚀</h2>
          Premium passengers, please proceed to the boarding gate 🚀 Check out
          our blog post introducing the MUI X Premium plan, and the new
          licensing model.
          <hr />
          <h2 style={{ fontSize: "27px" }}>Get a first look at Joy UI 🚀</h2>
          Our docs just got a major upgrade! Each of MUI's products now has its
          own dedicated documentation.
        </Typography>
      </Popover>
    </div>
  );
};

export default Notification;
