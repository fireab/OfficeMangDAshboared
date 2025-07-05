import { Pagination } from "@mui/material";
import FeedBackTable from "./components/FeedBackTable";
import { ComplainInterface } from "../../interfaces/complain.interface";
import { useEffect, useState } from "react";
import { makeGetRequest } from "../../config";
import { IpaginateResponse } from "../../interfaces/IPaginate.interface";
import { FeedBackInterface } from "../../interfaces/FeedBack.interface";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
export default function FeedBackPage(){
    const [feedbacks,setFeedbacks]=useState<FeedBackInterface[]>([])
    const [page,setpage]=useState<number>(1)
    const [count,setcount]=useState<number>(2)
    const navigate=useNavigate();

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        console.log(event.currentTarget)
        setpage(value);
      };
    useEffect(()=>{
        makeGetRequest(`/feedback/paginate?page=${page}`)
        .then((result)=>{
            let data:IpaginateResponse=result.data;
            setpage(data.metadata.pagination.page);
            setFeedbacks(data.data);
            console.log("Feed Back ",feedbacks)
            setcount(data.metadata.pagination.numberOfPages)
        })
        .catch((error)=>{
            console.log(error)
            console.log("Error Happended")
        })
    },[page])
    const {t}=useTranslation();
    return (
        <div  className='main-page'>
            <div className='main-directory'>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" fill="currentColor" className="bi bi-house-door" viewBox="0 0 16 16">
                    <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z"/>
                </svg>
                <div> - {t("feedbacks")}</div>
            </div>
            <div className='main-detail-page'>
                <div  style={{
                        marginTop:"10px",
                    }}>

                    {
                        feedbacks.length>0 && FeedBackTable(feedbacks,navigate)
                        }    
                 
                    
                    <div style={{
                           marginTop:"30px",
                           backgroundColor:"white",
                           display:"flex", 
                           justifyContent:"center"}}>
                            <Pagination page={page} onChange={handleChange} count={count} color="primary" />
                            
                        </div>
                </div>
                
            </div>
           
        </div>
    );
}