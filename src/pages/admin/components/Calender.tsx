import React from "react";
import { LocalizationProvider,DateCalendar } from "@mui/x-date-pickers";
import { DemoItem,DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export let Calender:React.FC=()=>{
    return(
        <LocalizationProvider  dateAdapter={AdapterDayjs}>
            <DemoContainer sx={{ border:"1px solid black",borderRadius:"15px"}} components={['DateCalendar']}>
                <DemoItem  >
                    <DateCalendar  defaultValue={dayjs(new Date())} />
                </DemoItem>
            </DemoContainer>
        </LocalizationProvider>
    )
}