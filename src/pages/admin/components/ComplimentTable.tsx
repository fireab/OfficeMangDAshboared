import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
} from "@mui/material";
// import ComplmentTable from "./components/ComplimentTable";
import { ComplainInterface } from "../../../interfaces/complain.interface";
import { makeGetRequest, makePutRequest } from "../../../config";
import { IpaginateResponse } from "../../../interfaces/IPaginate.interface";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Switch,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Download } from "@mui/icons-material";
import { EmployeeInterface } from "../../../interfaces/employee.interface";

export default function ComplmentTable(
  complains: ComplainInterface[],
  employees: EmployeeInterface[],
  handleFilterChange: (type: string, value: string) => void,
  search: string,
  date: string,
  responded: string,
  targetedEmployee: string,
  exportExcel: () => void
) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = Number(event.target.name);
    const checked = event.target.checked;

    await makePutRequest(`/compliment/${id}`, { responded: checked });

    // use the valid options for the filter
    handleFilterChange("responded", checked ? "responded" : "notResponded");
  };

  return (
    <div className="p-4 bg-gray-50">
      {/* Search and Filters */}
      <div
        className="flex flex-wrap items-center gap-4 mb-4"
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "10px",
          marginBottom: "6px",
          justifyContent: "space-around",
        }}
      >
        <FormControl variant="standard">
          <InputLabel id="demo-customized-select-label">Employees</InputLabel>
          <Select
            labelId="demo-customized-select-label"
            id="demo-customized-select"
            value={targetedEmployee}
            sx={{ width: "180px" }}
            onChange={(event) =>
              handleFilterChange("targetedEmployee", event.target.value)
            }
            // input={<BootstrapInput />}
          >
            <MenuItem value={"All"}>All</MenuItem>
            {employees.map((employee: EmployeeInterface) => (
              <MenuItem key={employee.id} value={employee.oromic_name}>
                {employee.oromic_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="standard">
          <InputLabel id="demo-customized-select-label">Date</InputLabel>
          <Select
            labelId="demo-customized-select-label"
            id="demo-customized-select"
            value={date}
            sx={{ width: "180px" }}
            onChange={(event) => handleFilterChange("date", event.target.value)}
            // onChange={handleChange}
            // input={<BootstrapInput />}
          >
            <MenuItem value={"7"}>
              <em>{t("last_week")} </em>
            </MenuItem>
            <MenuItem value={"30"}>{t("last_month")} </MenuItem>
            <MenuItem value={"60"}>{t("last_2_month")} </MenuItem>
            <MenuItem value={"90"}>{t("last_3_month")} </MenuItem>
            <MenuItem value={"180"}>{t("last_6_month")} </MenuItem>
            <MenuItem value={"All"}>{t("all")} </MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="standard">
          <InputLabel id="demo-customized-select-label">
            Response Status
          </InputLabel>
          <Select
            labelId="demo-customized-select-label"
            id="demo-customized-select"
            value={responded}
            sx={{ width: "180px" }}
            onChange={(event) => {
              handleFilterChange("responded", event.target.value);
            }}
            // onChange={handleChange}
            // input={<BootstrapInput />}
          >
            <MenuItem value={"responded"}>Responded</MenuItem>
            <MenuItem value={"notResponded"}>Not Responded</MenuItem>
            <MenuItem value={"All"}>All</MenuItem>
          </Select>
        </FormControl>
        <Button
          onClick={exportExcel}
          variant="contained"
          startIcon={<Download />}
          aria-label="search"
        >
          Export
        </Button>
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => handleFilterChange("search", e.target.value)}
          style={{
            height: "40px",
            marginTop: "10px",
            marginBottom: "10px",
            width: "300px",
            borderRadius: "35px",
            border: "none",
            padding: "10px",
          }}
        />
      </div>
      {/* Table */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>{t("No")}</TableCell>
              <TableCell>{t("Complainer Name")}</TableCell>
              <TableCell>{t("Target Employee")}</TableCell>
              <TableCell>{t("Complain Date")}</TableCell>
              <TableCell>{t("Responded")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {complains.length > 0 &&
              complains.map((complain: ComplainInterface) => (
                <TableRow
                  key={complain.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{complain.id}</TableCell>
                  <TableCell
                    onClick={() => navigate(`/compliment/${complain.id}`)}
                    className="hover:text-blue-500 cursor-pointer"
                  >
                    {complain.fullName}
                  </TableCell>
                  <TableCell>{complain.employerName}</TableCell>
                  <TableCell>{complain.complimentDate}</TableCell>
                  <Switch
                    checked={complain.responded}
                    name={`${complain.id}`}
                    onChange={handleChange}
                  />
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
