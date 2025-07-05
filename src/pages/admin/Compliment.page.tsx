import { Pagination } from "@mui/material";
import ComplmentTable from "./components/ComplimentTable";
import { ComplainInterface } from "../../interfaces/complain.interface";
import { useEffect, useState } from "react";
import { makeGetRequest } from "../../config";
import { IpaginateResponse } from "../../interfaces/IPaginate.interface";
import { useTranslation } from "react-i18next";
import { EmployeeInterface } from "../../interfaces/employee.interface";
export default function ComplimentPage() {
  const [complains, setComplains] = useState<ComplainInterface[]>([]);
  const [employees, setemployees] = useState<EmployeeInterface[]>([]);
  const [page, setpage] = useState<number>(1);
  const [count, setcount] = useState<number>(2);

  const [search, setSearch] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [responded, setResponded] = useState<string>("");
  const [targetedEmployee, setTargetedEmployee] = useState<string>("");

  const handleFilterChange = (type: string, value: string) => {
    console.log("nigga ty", { type, value });

    switch (type) {
      case "search":
        setSearch(value);
        break;
      case "date":
        setDate(value);
        break;
      case "responded":
        setResponded(value);
        break;
      case "targetedEmployee":
        setTargetedEmployee(value);
        break;
    }
  };
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    console.log(event.currentTarget);
    setpage(value);
  };
  const exportExcel = () => {
    makeGetRequest(
      `/compliment/?dateFilter=${date}&responded=${responded}&targetEmployee=${targetedEmployee}`,
      { responseType: "blob" }
    )
      .then((result) => {
        const blob = new Blob([result.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        // Create a link element and trigger download
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "compliments.xlsx"); // File name for download
        document.body.appendChild(link);
        link.click();

        // Cleanup the link element
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.log("Error Happended", error);
      });
  };
  useEffect(() => {
    makeGetRequest(
      `/compliment/paginate?page=${page}&search=${search}&dateFilter=${date}&responded=${responded}&targetEmployee=${targetedEmployee}`
    )
      .then((result) => {
        let data: IpaginateResponse = result.data;
        setpage(data.metadata.pagination.page);
        setComplains(data.data);
        setcount(data.metadata.pagination.numberOfPages);
      })
      .catch((error) => {
        console.log(error);
        console.log("Error Happended");
      });
    makeGetRequest(`/employee`)
      .then((result) => {
        let data = result.data;
        setemployees(data);
      })
      .catch((error) => {
        console.log("Error Happended", error);
      });
  }, [page, search, date, responded, targetedEmployee]);
  const { t } = useTranslation();
  return (
    <div className="main-page">
      <div className="main-directory">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="20"
          fill="currentColor"
          className="bi bi-house-door"
          viewBox="0 0 16 16"
        >
          <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z" />
        </svg>
        <div> - {t("complains")}</div>
      </div>
      <div className="main-detail-page">
        <div
          style={{
            marginTop: "10px",
          }}
        >
          {ComplmentTable(
            complains,
            employees,
            handleFilterChange,
            search,
            date,
            responded,
            targetedEmployee,
            exportExcel
          )}

          <div
            style={{
              marginTop: "30px",
              backgroundColor: "white",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Pagination
              page={page}
              onChange={handleChange}
              count={count}
              color="primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
