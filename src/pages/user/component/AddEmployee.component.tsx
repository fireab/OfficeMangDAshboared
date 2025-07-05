import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { makePostRequest, makePutRequest } from '../../../config';
import { toast } from 'react-toastify';
import { UserInterface } from '../../../interfaces/user.interface';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';


interface EmployeeFormDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  pageRefresh:Function;
  formData?: {
    firstname: string;
    lastname: string;
    email: string;
    username: string;
    password: string;
  }; // Optional: for pre-filling when updating
}

const AddEmployeeFormDialog: React.FC<EmployeeFormDialogProps> = ({
  open,
  setOpen,
  pageRefresh,
  formData,
}) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());

            const { firstname, lastname, email, username, password } = formJson;

            if (!firstname || !lastname || !username || !password) {
              toast.error("Please fill in all required fields.");
              return;
            }

            const endpoint =  "/user/create"; // Create if formData is not passed

            const payload = {
              firstname,
              lastname,
              email,
              username,
              password,
            };

            makePostRequest(endpoint, payload)
              .then((result) => {
                toast.success(
                  formData
                    ? "Employee Updated Successfully!"
                    : "Employee Added Successfully!",
                  { position: "top-right" }
                );
                pageRefresh();
                handleClose();
              })
              .catch((error) => {
                toast.error("Something Went Wrong!");
                console.error("Error:", error);
              });
          },
        }}
      >
        <DialogTitle>
          {formData ? "Update Employee" : "Add Employee"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {formData
              ? "Update the employee details below:"
              : "To add a new employee, please fill in the details below:"}
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="firstname"
            name="firstname"
            label="First Name"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={formData?.firstname || ""}
          />
          <TextField
            required
            margin="dense"
            id="lastname"
            name="lastname"
            label="Last Name"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={formData?.lastname || ""}
          />
          <TextField
            margin="dense"
            id="email"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            defaultValue={formData?.email || ""}
          />
          <TextField
            required
            margin="dense"
            id="username"
            name="username"
            label="Username"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={formData?.username || ""}
          />
          <TextField
            required
            margin="dense"
            id="password"
            name="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            defaultValue={formData?.password || ""}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">{formData ? "Update" : "Register"}</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default AddEmployeeFormDialog;
interface UpdateFormDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  pageRefresh:Function;
  id:number;
  formData: UserInterface|undefined; // Optional: for pre-filling when updating
}

export const UpdateEmployeeFormDialog: React.FC<UpdateFormDialogProps> = ({
  open,
  setOpen,
  pageRefresh,
  id,
  formData,
}) => {
  const handleClose = () => {
    setOpen(false);
  };
  const [showPassword, setShowPassword] = React.useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());

            const { firstname, lastname, email, username, password } = formJson;

            if (!firstname || !lastname || !username || !password) {
              toast.error("Please fill in all required fields.");
              return;
            }

            const endpoint = "/user/"+id // Update if formData is passed
              
            const payload = {
              firstname,
              lastname,
              email,
              username,
              password,
            };

            makePutRequest(endpoint, payload)
              .then((result) => {
                toast.success(
                  formData
                    ? "Employee Updated Successfully!"
                    : "Employee Added Successfully!",
                  { position: "top-right" }
                );
                pageRefresh();
                handleClose();
              })
              .catch((error) => {
                toast.error("Something Went Wrong!");
                console.error("Error:", error);
              });
          },
        }}
      >
        <DialogTitle>
          {formData ? "Update Employee" : "Add Employee"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {formData
              ? "Update the employee details below:"
              : "To add a new employee, please fill in the details below:"}
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="firstname"
            name="firstname"
            label="First Name"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={formData?.firstname || ""}
          />
          <TextField
            required
            margin="dense"
            id="lastname"
            name="lastname"
            label="Last Name"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={formData?.lastname || ""}
          />
          <TextField
            margin="dense"
            id="email"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            defaultValue={formData?.email || ""}
          />
          <TextField
            required
            margin="dense"
            id="username"
            name="username"
            label="Username"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={formData?.username || ""}
          />
          <TextField
            required
            margin="dense"
            id="password"
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"} // Toggle type
            fullWidth
            variant="standard"
            defaultValue={formData?.password || ""}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={togglePasswordVisibility}
                    onMouseDown={(event) => event.preventDefault()} // Prevent focus loss
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">{formData ? "Update" : "Register"}</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
