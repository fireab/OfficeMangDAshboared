import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ThumbsUpDownIcon from "@mui/icons-material/ThumbsUpDown";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Sidebar.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SpeakerNotesIcon from "@mui/icons-material/SpeakerNotes";
import GroupIcon from "@mui/icons-material/Group";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { Feedback } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import AudioFileIcon from "@mui/icons-material/AudioFile";
const primaryTypographyProps = {
  fontSize: "14px",
  fontWeight: "400",
};

const Sidebar = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const OpenedBar = {
    Main: t("dashboard"),
    Compliment: t("complains"),
    Employees: t("employees"),
    Profile: t("profile"),
    Users: t("users"),
    Ratings: t("ratings"),
    FeedBacks: t("feed_backs"),
    AudioFeedBacks: t("audio_feedbacks"),
  };
  const paths: string[] = location.pathname.split("/");
  const openBarActive = (url: string): {} => {
    console.log("Paths", paths[1]);
    console.log("active", url);
    return paths[1] === url
      ? {
          backgroundColor: "whitesmoke",
          color: "black",
          border: "4px white solid",
          borderRadius: "100px",
          ":hover": {
            backgroundColor: "whitesmoke",
            color: "black",
          },
        }
      : {};
  };

  // setLowerLink(paths[1]);
  useEffect(() => {
    console.log("paths", paths);
  }, []);
  return (
    <List className="side-bar" title="Menu">
      <a href="/dashboard" className="side-bar-a">
        <ListItemButton
          className="side-bar-content"
          sx={openBarActive("dashboard")}
        >
          <ListItemIcon sx={{ minWidth: "40px" }}>
            <DashboardIcon sx={{ color: "gray" }} />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={primaryTypographyProps}
            primary={OpenedBar.Main}
          />
        </ListItemButton>
      </a>
      <a href="/compliment" className="side-bar-a">
        <ListItemButton
          className="side-bar-content"
          sx={openBarActive("compliment")}
        >
          <ListItemIcon
            className="side-bar-active-link"
            sx={{ minWidth: "40px", color: "blue" }}
          >
            <SpeakerNotesIcon sx={{ color: "gray" }} />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={primaryTypographyProps}
            primary={OpenedBar.Compliment}
          />
        </ListItemButton>
      </a>
      <a href="/employee" className="side-bar-a">
        <ListItemButton
          className="side-bar-content"
          sx={openBarActive("employee")}
        >
          <ListItemIcon
            className="side-bar-active-link"
            sx={{ minWidth: "40px", color: "blue" }}
          >
            <GroupIcon sx={{ color: "gray" }} />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={primaryTypographyProps}
            primary={OpenedBar.Employees}
          />
        </ListItemButton>
      </a>
      <a href="/profile" className="side-bar-a">
        <ListItemButton
          className="side-bar-content"
          sx={openBarActive("profile")}
        >
          <ListItemIcon
            className="side-bar-active-link"
            sx={{ minWidth: "40px", color: "blue" }}
          >
            <AccountCircleIcon sx={{ color: "gray" }} />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={primaryTypographyProps}
            primary={OpenedBar.Profile}
          />
        </ListItemButton>
      </a>
      <a href="/user" className="side-bar-a">
        <ListItemButton className="side-bar-content" sx={openBarActive("user")}>
          <ListItemIcon
            className="side-bar-active-link"
            sx={{ minWidth: "40px", color: "blue" }}
          >
            <AccountBoxIcon sx={{ color: "gray" }} />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={primaryTypographyProps}
            primary={OpenedBar.Users}
          />
        </ListItemButton>
      </a>
      <a href="/rates" className="side-bar-a">
        <ListItemButton
          className="side-bar-content"
          sx={openBarActive("rates")}
        >
          <ListItemIcon
            className="side-bar-active-link"
            sx={{ minWidth: "40px", color: "blue" }}
          >
            <ThumbsUpDownIcon sx={{ color: "gray" }} />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={primaryTypographyProps}
            primary={OpenedBar.Ratings}
          />
        </ListItemButton>
      </a>
      <a href="/feedbacks" className="side-bar-a">
        <ListItemButton
          className="side-bar-content"
          sx={openBarActive("feedbacks")}
        >
          <ListItemIcon
            className="side-bar-active-link"
            sx={{ minWidth: "40px", color: "blue" }}
          >
            <Feedback sx={{ color: "gray" }} />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={primaryTypographyProps}
            primary={OpenedBar.FeedBacks}
          />
        </ListItemButton>
      </a>
      <a href="/audios" className="side-bar-a">
        <ListItemButton
          className="side-bar-content"
          sx={openBarActive("audio_feedbacks")}
        >
          <ListItemIcon
            className="side-bar-active-link"
            sx={{ minWidth: "40px", color: "blue" }}
          >
            <AudioFileIcon sx={{ color: "gray" }} />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={primaryTypographyProps}
            primary={OpenedBar.AudioFeedBacks}
          />
        </ListItemButton>
      </a>
    </List>
  );
};

export default Sidebar;
