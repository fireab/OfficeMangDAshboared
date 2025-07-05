import { Pagination } from "@mui/material";
import EmployeesTable from "./components/Employee.table";
import { useEffect, useState } from "react";
import { EmployeeInterface } from "../../interfaces/employee.interface";
import { makeGetRequest } from "../../config";
import { IpaginateResponse } from "../../interfaces/IPaginate.interface";
import { useTranslation } from "react-i18next";

export default function EmployeePage(){
    const [employees,setEmployees]=useState<EmployeeInterface[]>([])
    const [page,setpage]=useState<number>(1)
    const [search,setSearch]=useState<string>("")
    const [count,setcount]=useState<number>(2)
    const {t}=useTranslation();
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        console.log(event.currentTarget);
        
        setpage(value);
      };
    useEffect(()=>{
        makeGetRequest(`/employee/paginate?page=${page}&search=${search}`)
        .then((result)=>{
            let data:IpaginateResponse=result.data;
            setpage(data.metadata.pagination.page);
            setEmployees(data.data);
            setcount(data.metadata.pagination.numberOfPages)
        })
        .catch((error)=>{
            console.log("Error Happended",error)
        })
    },[page,search])
    return (
        <div  className='main-page'>
            <div className='main-directory'>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" fill="currentColor" className="bi bi-house-door" viewBox="0 0 16 16">
                    <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z"/>
                </svg>
                <div> - {t("employees")}</div>
            </div>
            <div className='main-detail-page'>
            <div className="container mx-auto  bg-gray-50 rounded shadow-lg p-10">
      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
            style={{
                height:"40px",
                marginTop:"10px",
                marginBottom:"10px",
                width:"300px",
                borderRadius:"35px",
                border:"none",
                padding:"10px",
            }}
        />
       
    </div>

      {/* Table Section */}
      <div className="bg-white shadow rounded">
        <EmployeesTable employees={employees}/>

        {/* Pagination */}
        <div className="flex justify-center mt-6">
          <Pagination
            page={page}
            count={count}
            onChange={handleChange}
            color="primary"
          />
        </div>
      </div>
        </div>
            </div>
        </div>
    )
}