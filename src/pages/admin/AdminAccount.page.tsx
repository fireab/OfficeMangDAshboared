
import {  Button, TextField } from '@mui/material';

import "./css/Dashboard.admin.css"
import {  Password, UpdateOutlined} from '@mui/icons-material';
import React, { useEffect, useRef } from 'react';
import { UserInterface } from '../../interfaces/user.interface';
import { makeGetRequest, makePutRequest } from '../../config';
// import './css/AdminAccount.css'
import { useNavigate } from 'react-router-dom';
export default function AdminAccountPage (){
    const [user,setUser]=React.useState<UserInterface | null>();
    const token= localStorage.getItem("token");
    const [updated,setUpdated]=React.useState(false);
    const nav=useNavigate();
    const handleSubmit=async (event:React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        const data=new FormData(event.currentTarget);
        makePutRequest(`/user/profile`,data).then((result)=>{
            console.log("result",result);
            setUpdated(!updated);
            nav("/profile")
        }).catch((error)=>{
            console.log("error",error);
        })
    }
    const handleChangePassword=(event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        const data=new FormData(event.currentTarget);
        let new_password=data.get('new-password');
        let confirm_password=data.get('confirm-password');
        if (new_password!=confirm_password){
            alert("Password not match");
            return;
        }else{
        makePutRequest(`/user/password`,{
            "password":new_password
        }).then((result)=>{
            alert("Password Changed Successfully");
            localStorage.removeItem("token");
            nav("/");
        }).catch((error)=>{
            console.log("error",error);
        })
    }

    }
    useEffect(()=>{
        makeGetRequest(`/user/profile`)
    .then((result)=>{
        console.log("pRofile",result);
        setUser(result.data);
    })
    .catch((error)=>{
        console.log("Error",error)
    });
    },[updated])
    return (
        <div className='main-page'>
        <div className='main-directory'>
            <div className='main-general-directory'> General Setting </div>
            <div className='main-general-directory-divider'>|</div>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" fill="currentColor" className="bi bi-house-door" viewBox="0 0 16 16">
                <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z"/>
            </svg>
            <div> - Account Setting</div>
        </div>
        <div className='main-detail-page'>
            <div style={{
                display:"flex",
                flexDirection:"column",
                marginTop:"20px",
                paddingTop:"60px",
                padding:"60px",
                marginLeft:"10%",
                gap:"5px",
                width:"80%",
                backgroundColor:"white",
                border:"1px solid lightblue",
                borderRadius:"20px",
            }}>
                <form   style={{display:"flex",gap:"5px",flexDirection:"column"}} onSubmit={handleSubmit}>
                    <div style={{display:"flex",gap:"15px"}}>
                        <label className="ad-label" htmlFor="first_name"  >First Name :</label>
                        <input className="ad_input" defaultValue={user?.firstname} type="text" id="first_name" name="firstname" placeholder={user?.firstname}></input>
                        <label className="ad-label" htmlFor="last_name">Last Name :</label>
                        <input className="ad_input" defaultValue={user?.lastname} type="text" id="last_name" name="lastname" placeholder={user?.lastname}></input>
                    </div>
                    <label className="ad-label" htmlFor="username">Username :</label>
                    <input className="ad_input" defaultValue={user?.username} type="text" id="username" name="username" placeholder={user?.username}></input>
                    <label className="ad-label" htmlFor="email">Email :</label>
                    <input className="ad_input" defaultValue ={user?.email}type="text" id="email" name="email" placeholder={user?.email}></input>
                <Button type='submit' sx={{  marginLeft:"25%",marginTop:"20px" ,backgroundColor:"green", width:"300px"}} variant="contained" startIcon={<UpdateOutlined />}>
                    Update
                </Button>
                </form>
                <div >
                    <h4>Change Password</h4>
                    <form style={{display:"flex",gap:"5px",flexDirection:"column"}} onSubmit={handleChangePassword}> 
                        <label className="ad-label" htmlFor="new-password">New Password:</label>
                        <input className="ad_input" type="password" id="new-password" name="new-password" placeholder="Enter your new password"></input>
                        <label className="ad-label" htmlFor="confirm-password">Confirm Password:</label>
                        <input className="ad_input" type="password" id="confirm-password" name="confirm-password" placeholder="Confirm your new password"></input>
                        <Button type='submit' variant='outlined' sx={{  marginLeft:"25%",marginTop:"20px" ,color:"green", width:"300px"}}> Change Password </Button>
                    </form>
                </div>
                

            </div>
        
        </div>
    </div>
    )
}