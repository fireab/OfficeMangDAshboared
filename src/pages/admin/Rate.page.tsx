import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import {  EmployeeInterface, RateInterface } from "../../interfaces/employee.interface";
import { makeGetRequest } from "../../config";
import { IpaginateResponse } from "../../interfaces/IPaginate.interface";
import FeedBackTable from "./components/Rate.table";
import { useTranslation } from "react-i18next";
import RateTable from "./components/Rate.table";

export default function RatePage(){
    const [feedbacks,setFeedbacks]=useState<RateInterface[]>([])
    const [page,setpage]=useState<number>(1)
    const [count,setcount]=useState<number>(2)
    const [employees,setemployees]=useState<EmployeeInterface[]>([]);
    const [date,setDate]=useState<string>("");
    const [employeeName,setEmployeeName]=useState<string>("");
    const handleFilterChange=(type:string,value:string)=>{
        switch(type){
            case "date":
                setDate(value);
                break;
            case "employeeName":
                setEmployeeName(value);
                break;
        }
    }
    const exportExcel=()=>{
        makeGetRequest(`/rate/?dateFilter=${date}&employeeName=${employeeName}`,{responseType:"blob"})
        .then((result)=>{
            const blob = new Blob([result.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    // Create a link element and trigger download
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'rates.xlsx'); // File name for download
    document.body.appendChild(link);
    link.click();

    // Cleanup the link element
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
        })
        .catch((error)=>{
            console.log("Error Happended",error)
        })
    }
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        console.log(event.currentTarget);
        setpage(value);
    };
    useEffect(()=>{
        makeGetRequest(`/rate/paginate?page=${page}&EmployeeId=${employeeName}&dateFilter=${date}`)
        .then((result)=>{
            let data:IpaginateResponse=result.data;
            setpage(data.metadata.pagination.page);
            setFeedbacks(data.data);
            setcount(data.metadata.pagination.numberOfResults)
        })
        .catch((error)=>{
            console.log("Error Happended",error)
        })
        
        .catch((error)=>{
            console.log("Error Happended",error)
        })
    },[page,date,employeeName])
    useEffect(()=>{
        makeGetRequest(`/employee`)
        .then((result)=>{
            let data=result.data;
            setemployees(data);
        })
    },[])
    const {t}=useTranslation();
    return (
        <div  className='main-page'>
            <div className='main-directory'>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" fill="currentColor" className="bi bi-house-door" viewBox="0 0 16 16">
                    <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z"/>
                </svg>
                <div> - {t("ratings")}</div>
            </div>
            <div className='main-detail-page'>
                <div style={{marginTop:"10px"}}>
                    {RateTable(feedbacks,employees,date,employeeName,handleFilterChange,exportExcel)}
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