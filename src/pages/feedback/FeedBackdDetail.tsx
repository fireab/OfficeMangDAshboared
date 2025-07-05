import { Pagination } from "@mui/material";
import FeedBackTable from "./components/FeedBackTable";
import { useEffect, useState } from "react";
import { makeGetRequest } from "../../config";
import { IpaginateResponse } from "../../interfaces/IPaginate.interface";
import { FeedBackInterface } from "../../interfaces/FeedBack.interface";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
export default function FeedBackDetailPage(){
    const [feedback,setFeedbacks]=useState<FeedBackInterface>()
    const id=useParams().id;
    const {t}=useTranslation();
    useEffect(()=>{
        makeGetRequest(`/feedback/${id}`)
        .then((result)=>{
            setFeedbacks(result.data);
        })
        .catch((error)=>{
            console.log(error)
            console.log("Error Happended")
        })
    },[])
    return (
        <div  className='main-page'>
            <div className='main-directory'>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" fill="currentColor" className="bi bi-house-door" viewBox="0 0 16 16">
                    <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z"/>
                </svg>
                <div> - FeedBack</div>
            </div>
            <div className='main-detail-page'>
                <div  style={{
                        marginTop:"10px",
                    }}>

                    <div style={{
                        display:"flex",
                        marginTop:"40px",
                        width:"60%",
                        marginLeft:"10%",
                        padding:"20px",
                        backgroundColor:"white",
                        border:"1px solid black",
                        justifyContent:"space-between",
                        alignItems:"start",
                        flexDirection:"column"
                    }}>
                        <div> <b>{t("full_name")} - </b> {feedback?.name}</div>
                        <div> <b>{t("phone")} - </b> {feedback?.phone}</div>
                        <div> <b>{t("Email")} - </b> {feedback?.email}</div>
                        <div> <b>{t("type")} - </b> {feedback?.type}</div>
                        <div> <b>{t("content")} - </b> {feedback?.content}</div>
                        
                    </div>
                    
                </div>
                
            </div>
           
        </div>
    );
}