import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {  EmployeeInterface, RateInterface  } from '../../../interfaces/employee.interface';
import { useTranslation } from 'react-i18next';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';

export default function RateTable(
  rates:RateInterface[],
  employees: EmployeeInterface[], 
  date: string, 
  employeeName: string,
  handleFilterChange: (type: string, value: string) => void, 
  exportExcel: () => void
) {
  const {t}=useTranslation();
  return (
    <div className="p-4 bg-gray-50">
      {/* Search and Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-4" style={{
        display:"flex",
        flexDirection:"row",
        flexWrap:"wrap",gap:"10px",marginBottom:"6px",
        justifyContent:"space-around"
      }}>
      <FormControl  variant="standard">
          <InputLabel id="demo-customized-select-label" >Employees</InputLabel>
          <Select
            labelId="demo-customized-select-label"
            id="demo-customized-select"
            value={employeeName}
            sx={{width:"180px"}}
            onChange={(event) => handleFilterChange("employeeName", event.target.value)}
            // input={<BootstrapInput />}
          >
            <MenuItem value={"All"}>All</MenuItem>
            {employees.map((employee: EmployeeInterface) => (
              <MenuItem key={employee.id} value={employee.id}>
                {employee.oromic_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      <FormControl  variant="standard">
        <InputLabel id="demo-customized-select-label" >Date</InputLabel>
        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          value={date}
          sx={{width:"180px"}}
          onChange={(event) => handleFilterChange("date", event.target.value)}
          // onChange={handleChange}
          // input={<BootstrapInput />}
        >
          <MenuItem value={"7"}>
              <em>{t("last_week")} </em>
          </MenuItem>
          <MenuItem value={"30"}>{t("last_month")}  </MenuItem>
          <MenuItem value={"60"}>{t("last_2_month")} </MenuItem>
          <MenuItem value={"90"}>{t("last_3_month")} </MenuItem>
          <MenuItem value={"180"}>{t("last_6_month")} </MenuItem>
          <MenuItem value={"All"}>{t("all")} </MenuItem>
        </Select>
      </FormControl>
      <Button onClick={exportExcel} variant="contained" startIcon={<FileUploadIcon />} aria-label="search" >
            Export 
      </Button>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>{t("no")}</TableCell>
            <TableCell>{t("rate_giver")}</TableCell>
            <TableCell >{t("phone")}</TableCell>
            <TableCell >{t("employee_name")}</TableCell>
            <TableCell >{t("CustomerService")}</TableCell>
            <TableCell >{t("StandardService")}</TableCell>
            <TableCell >{t("FairService")}</TableCell>
            <TableCell >{t("ResponseForCompliment")}</TableCell>
            <TableCell >{t("ServiceRate")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rates.map((rate) => (
            <TableRow
              key={rate.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            <TableCell >
              {rate.id}
              </TableCell>
              
              <TableCell >
              {rate.name}
              </TableCell>
              <TableCell >
              {rate.phone}
              </TableCell>
              <TableCell >{rate.employee.english_name}</TableCell>
            <TableCell >{rate.CustomerService}</TableCell>
            <TableCell >{rate.StandardService}</TableCell>
            <TableCell >{rate.FairService}</TableCell>
            <TableCell >{rate.ResponseForCompliment}</TableCell>
            <TableCell >{rate.ServiceRate}</TableCell>
            
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    </div>
  );
}
