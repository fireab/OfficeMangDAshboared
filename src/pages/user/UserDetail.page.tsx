import React from "react";
import { UserInterface } from "../../interfaces/user.interface";
import './UserDetail.css'
import { makeGetRequest } from "../../config";
import { useParams } from "react-router-dom";
export default function UserDetailPage(){
    const [user,setUser]=React.useState<UserInterface | null>();
    // const params= useParams()
    const {id }=useParams()
    React.useEffect(()=>{
        makeGetRequest(`/user/${id}`)
            .then((result)=>{
                console.log("result",result)
                let data=result.data;
                setUser(data)
                console.log("Employee ",user)
            })
            .catch((error)=>{
                console.log("Error",error)
            })
    },[])
    return (
        <div className='main-page'>
            <div className='main-directory'>
                <div className='main-general-directory'> General Setting </div>
                <div className='main-general-directory-divider'>|</div>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" fill="currentColor" className="bi bi-house-door" viewBox="0 0 16 16">
                    <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z"/>
                </svg>
                <div> - Employee Profile</div>
            </div>
            <div className='main-detail-page'>
                <div className="container1">
                    <h2 style={{textAlign:"center"}}>User Information</h2>
                    <div className="user-info">
                        <div><span className="label">Username:</span> <span className="value">{user?.username}</span></div>
                        <div><span className="label">First Name:</span> <span className="value">{user?.firstname}</span></div>
                        <div><span className="label">Last Name:</span> <span className="value">{user?.lastname}</span></div>
                        <div><span className="label">Email:</span> <span className="value">{user?.email}</span></div>
                    </div>
                </div>
               
            </div>
        </div>
    )
}
