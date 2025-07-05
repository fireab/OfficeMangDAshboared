import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { UserInterface } from '../../../interfaces/user.interface';
import { DeleteOutline, Edit, Person } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import AddEmployeeFormDialog, { UpdateEmployeeFormDialog } from '../../user/component/AddEmployee.component';
import AddIcon from '@mui/icons-material/Add';
import { makeDeleteRequest } from '../../../config';
import { useTranslation } from 'react-i18next';
import { toast, ToastContainer, ToastOptions } from "react-toastify";
export default function UsersTable(users:UserInterface[],pageRefresh:Function) {
  const [open,setOpen]=React.useState<boolean>(false);
  const [user,setUser]=React.useState<UserInterface|undefined>(undefined);
  const [edit,setEdit]=React.useState<boolean>(false);
  const [user_id,setUserId]=React.useState<number>(0);
  const handleClickEditOpen=(user_id:number)=>{
    setUserId(user_id);
    setUser(users.find((user:UserInterface)=>user.id==user_id));
    setEdit(true);
  }
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleDeleteUser = (id:number) => {
    makeDeleteRequest(`/user/${id}`)
    .then((result)=>{
      console.log("result ",result)
      pageRefresh();
      toast.success("User Deleted Successfully !");
      
    }).catch((error)=>{
      toast.error("Error Something went wrong !");
      console.log("error ",error)
    })
  };
  const {t}=useTranslation();
  const isSuperAdmin=localStorage.getItem("isSuperAdmin");
  console.log("IS SUPER ADMIN ",isSuperAdmin);
  return (
    <div>
      { isSuperAdmin == "true" &&<Button
       startIcon={<AddIcon sx={{color:'white'}} />} 
       variant='contained'
       sx={{color:"white",backgroundColor:"green",mb:2}}
       onClick={handleClickOpen}
      >
        {t("add_user")}
      </Button>}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
              <TableCell>{t("add_user")}</TableCell>
                <TableCell>{t("full_name")}</TableCell>
                <TableCell >{"Username"}</TableCell>
                <TableCell >SuperAdmin</TableCell>
               {isSuperAdmin == "true" && <TableCell >{t("action")} </TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow
                  key={user.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell >
                    {user.id}
                  </TableCell>
                  <TableCell > 
                  <a href={`/user/${user.id}`} className="unstyled-link">
                    {user.firstname + " "+ user.lastname}
                  </a>
                    </TableCell>
                  <TableCell >{user.username}</TableCell>
                  <TableCell >{user.isSuperAdmin ==null ?"FALSE":"TRUE"}</TableCell>
                  {(isSuperAdmin == "true" && !user.isSuperAdmin )&& <TableCell >
                    <IconButton
                      onClick={()=>handleClickEditOpen(user.id)}>
                      <Edit color='secondary' />
                    </IconButton>
                    <IconButton onClick={()=>{
                      handleDeleteUser(user.id)}
                    }>
                      <DeleteOutline color='error'/>
                    </IconButton>
                    

                  </TableCell>}
                
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <AddEmployeeFormDialog open={open} setOpen={setOpen} pageRefresh={pageRefresh}  />
        <UpdateEmployeeFormDialog open={edit} setOpen={setEdit} id={user_id} pageRefresh={pageRefresh} formData={user} />
    {/* {AddEmployeeFormDialog(open,setOpen,pageRefresh,undefined)} */}
    </div>
  );
}
