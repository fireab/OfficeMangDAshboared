import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FeedBackInterface } from '../../../interfaces/FeedBack.interface';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { t } from 'i18next';
const label = { inputProps: { 'aria-label': 'Switch demo' } };
export const humanReadable =(isoDate:string)=>{
        return new Date(isoDate).toLocaleString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            
          });
}

export default function FeedBackTable(feedbacks:FeedBackInterface[],navigate:NavigateFunction) {
  const handleNavigate=(id:number)=>{
    navigate(`/feedbacks/${id}`)
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
                <TableRow>

                <TableCell>{t("no")}</TableCell>
                    <TableCell>{t("content")}</TableCell>
                    <TableCell >{t("name")}</TableCell>
                    <TableCell >{t("phone")}</TableCell>
                    <TableCell >{t("email")}</TableCell>
                    <TableCell >{t("date")}</TableCell>
                </TableRow>
        </TableHead>
        <TableBody>
          {feedbacks.map((feedback:FeedBackInterface) => (
            
            <TableRow
              key={feedback.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell >
                {feedback.id}
              </TableCell>
              
              <TableCell  
              onClick={(event:React.MouseEvent<HTMLTableCellElement>)=>handleNavigate(feedback.id)}
              sx={{
                      ":hover":{
                        color:"blue"
                      }
                    }} >

                {feedback.content?feedback.content.trim().length>20?feedback.content.trim().substring(0,20)+"...":feedback.content:""}
              </TableCell>
              
              
              <TableCell >{feedback.name}</TableCell>
              
              
              <TableCell >{feedback.phone}</TableCell>
              
              
              <TableCell >{feedback.email}</TableCell>
              
              <TableCell >{ humanReadable (feedback.created_date)}</TableCell>
            </TableRow>
            
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
