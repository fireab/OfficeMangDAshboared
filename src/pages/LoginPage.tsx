import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { makePostRequest } from "../config";
import { useNavigate } from "react-router-dom";
import AddisKetemaLogo from "../assets/icons/newLogo2.png";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const defaultTheme = createTheme();

export default function SignInSide() {
  const navigate = useNavigate();
  const [error_display, setErrorDisplay] = React.useState<string>("none");
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    makePostRequest("/login", {
      username: data.get("username"),
      password: data.get("password"),
    })
      .then((response) => {
        if (response.status == 200) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("isSuperAdmin", response.data.isSuperAdmin);
          navigate("/dashboard");
        } else {
          setErrorDisplay("block");
        }
      })
      .catch((error) => {
        console.log(error);

        setErrorDisplay("block");
      });
  };
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div>
      {ResetPasswordDialog(isOpen, setIsOpen)}
      <ThemeProvider theme={defaultTheme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundColor: "#0B4976",
              backgroundSize: "cover",
              backgroundPosition: "left",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "10%",
              }}
            >
              <img width={"200px"} height={"200px"} src={AddisKetemaLogo} />
              <div
                style={{
                  marginLeft: "10%",
                  marginRight: "10%",
                  textAlign: "center",
                  color: "white",
                }}
              >
                <h2> የአዲስ አበባ አካባቢ ጥበቃ ባለስልጣን</h2>
              </div>
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" color={"#0B4976"} variant="h4">
                Sign in
              </Typography>
              <Box
                component={"form"}
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Email Address"
                  name="username"
                  autoComplete="username"
                  onChange={(e) => {
                    setErrorDisplay("none");
                  }}
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  sx={{ height: "50px" }}
                  autoComplete="current-password"
                  onChange={(e) => {
                    setErrorDisplay("none");
                  }}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Box
                  component={"div"}
                  sx={{
                    display: error_display,
                    textAlign: "center",
                    color: "red",
                  }}
                >
                  Username Or Password Error !
                </Box>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, backgroundColor: "#0B4976" }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Button
                      onClick={(e) => setIsOpen(true)}
                      sx={{ color: "#0B4976" }}
                    >
                      Forgot password?
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
}

const ResetPasswordDialog = (
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Password Reset</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To reset your password, please contact the <strong>superadmin</strong>
          .
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
