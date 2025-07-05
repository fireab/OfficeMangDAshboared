import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { makeGetRequest } from "../../config";
import { UserInterface } from "../../interfaces/user.interface";
import UsersTable from "./components/User.table";
import { t } from "i18next";
import { IpaginateResponse } from "../../interfaces/IPaginate.interface";

export default function UserPage(){
    const [users,setUsers]=useState<UserInterface[]>([])
    const [page,setpage]=useState<number>(1)
    const [count,setcount]=useState<number>(2)
    const [update,setUpdated]=useState<boolean>(false)
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        console.log(event.target);
        
        setpage(value);
      };
      const pageRefresh=()=>{
        setUpdated(!update);
      }
    useEffect(()=>{
        makeGetRequest(`/user?page=${page}&limit=10`)
        .then((result)=>{
            let data:IpaginateResponse=result.data;
            setUsers(data.data);
            setcount(data.metadata.pagination.numberOfPages)
        })
        .catch((error)=>{
            console.log("Error Happended",error)
        })
    },[page,update])
    return (
        <div  className='main-page'>
            <div className='main-directory'>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" fill="currentColor" className="bi bi-house-door" viewBox="0 0 16 16">
                    <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z"/>
                </svg>
                <div> - {t("users")}</div>
            </div>
            <div className='main-detail-page'>
                <div style={{marginTop:"10px"}}>
                    {UsersTable(users,pageRefresh)}
                    <div style={{
                        marginTop:"30px",
                        backgroundColor:"#FFFFFF",
                        display:"flex", 
                        justifyContent:"center"}}>
                        <Pagination  page={page} count={count} onChange={handleChange} color="primary" />
                    </div>
                </div>
            </div>
        </div>
    )
}