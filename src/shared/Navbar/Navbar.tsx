import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";

import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Logo from "../../assets/icons/newLogo2.png";
import { Link, useNavigate } from "react-router-dom";
import {
  ListItemIcon,
  ListItemText,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Logout, Person } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setLocale } from "../../redux/actions";
import i18n from "../../i18n";
const LanguageSelect = () => {
  const dispatch: AppDispatch = useDispatch();
  const currentLocale = useSelector((state: RootState) => state.locale);
  const handleLanguageChange = (
    event: SelectChangeEvent<string>,
    child: React.ReactNode
  ) => {
    i18n.changeLanguage(event.target.value);
    const newLocale = event.target.value as "en" | "am" | "or";
    dispatch(setLocale(newLocale));
  };
  React.useEffect(() => {
    dispatch(setLocale(i18n.language as "en" | "am" | "or"));
  });

  return (
    <Select
      value={"" + currentLocale}
      onChange={handleLanguageChange}
      variant="standard"
      sx={{ color: "rgb(0,77,221)" }}
    >
      {/* <MenuItem value='or'>Afaan Oromo</MenuItem> */}
      {/* <MenuItem value="am">አማርኛ</MenuItem> */}
      <MenuItem value="en">English</MenuItem>
      {/* Add more languages as needed */}
    </Select>
  );
};
export default function NavBar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor:
            "rgba(255, 255, 255, 0.1)" /* 0.5 for 50% transparency */,
          //  padding: "20px",
          border: "1px solid #ccc",
        }}
      >
        <Toolbar>
          {/* <img width={"80px"} height={"80px"} src={Logo} /> */}
          <img
            src={Logo}
            alt="Logo"
            style={{
              width: "80px",
              height: "80px",
              objectFit: "contain", // keep aspect ratio without cropping
              display: "block", // removes inline gap issues
            }}
          />

          {/* <Typography  component="div" sx={{ 
            fontSize:24,
            fontWeight:200,
            flexGrow: 1,color:"#0B4976" ,marginLeft:"20px"
            }}>
              {t("welcome")}
          </Typography> */}
          <Typography
            component="div"
            sx={{
              fontSize: 36,
              fontWeight: 200,
              flexGrow: 1,
              color: "#0B4976",
              display: "flex",
              marginLeft: "50px",
            }}
          >
            {t("welcome")}
          </Typography>

          <div style={{ display: "flex", flexDirection: "row" }}>
            {LanguageSelect()}
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <Link
                to={"/profile"}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <Person fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Profile</ListItemText>
                  Profile
                </MenuItem>
              </Link>
              <MenuItem onClick={handleLogOut}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                <ListItemText>Log Out</ListItemText>
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
