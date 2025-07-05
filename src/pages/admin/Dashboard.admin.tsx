import {
  Grid,
  Box,
  Container,
  Stack,
  Typography,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

import "./css/Dashboard.admin.css";
import { MouseEventHandler, useEffect, useState } from "react";
import PieColor from "./components/PieChart";
import LineChartDisplay from "./components/LineChart";
import { makeGetRequest, makePostRequest } from "../../config";

import GroupIcon from "@mui/icons-material/Group";

import ThumbsUpDownIcon from "@mui/icons-material/ThumbsUpDown";
import SpeakerNotesIcon from "@mui/icons-material/SpeakerNotes";
import ReviewsIcon from "@mui/icons-material/Reviews";
import { TopRatedEmployeeType } from "../../interfaces/TopRated.interface";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import { FileUpload } from "@mui/icons-material";

export interface Rates {
  Excellent: number | undefined;
  VeryGood: number | undefined;
  Intermediate: number | undefined;
  Good: number | undefined;
  Bad: number | undefined;
}
export interface RateMakers {
  CustomerService: Rates;
  StandardService: Rates;
  FairService: Rates;
  ResponseForCompliment: Rates;
  ServiceRate: Rates;
}
export default function AdminDashboardPage() {
  const { t } = useTranslation();
  const [year, setYear] = useState<number>();

  const [totalEmployee, settotalEmployee] = useState<number | null>(null);
  const [totalFeedBack, settotalFeedBack] = useState<number | null>(null);
  const [totalComplain, settotalComplain] = useState<number | null>(null);
  const [totalRespondedCompliment, settotalRespondedCompliment] = useState<
    number | null
  >(null);

  const [years, setYears] = useState<number[]>([]);
  const [values, setvalues] = useState<number[]>([]);

  const [rates, setRates] = useState<RateMakers>();
  const [rows, setRows] = useState<TopRatedEmployeeType[]>([]);
  const [date, setDate] = useState<string>("");
  useEffect(() => {
    setYear(new Date().getFullYear());
    makePostRequest("/stat/total", {
      year: year,
    })
      .then((result) => {
        let data = result.data;
        settotalEmployee(data.totalEmployee);
        settotalFeedBack(data.totalFeedback);
        settotalComplain(data.complaint);
        settotalRespondedCompliment(data.totalRespondedComplain);
      })
      .catch((error: any) => {
        console.log("Some Thing Went Wrong");
        console.log(error);
      });

    makePostRequest("/stat", {
      year: year,
    })
      .then((result) => {
        let data = result.data;
        console.log("Data", data);
        setRates(data);
      })
      .catch((error: any) => {
        console.log("Some Thing Went Wrong", error);
      });

    makeGetRequest("/stat/average")
      .then((result) => {
        let data = result.data;
        console.log("Data", data);
        setYears(data.years);
        setvalues(data.averages);
      })
      .catch((error: any) => {
        console.log(error);
        console.log("Some Thing Went Wrong");
      });
  }, [year]);
  useEffect(() => {
    makeGetRequest("/stat/find_top_10?dateFilter=" + date)
      .then((result) => {
        setRows(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [date]);
  const exportExcel = () => {
    makeGetRequest("/stat/find_top/extract?dateFilter=" + date, {
      responseType: "blob",
    })
      .then((result) => {
        const blob = new Blob([result.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        // Create a link element and trigger download
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "Rates.xlsx"); // File name for download
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
  return (
    <div style={{ padding: "10px", backgroundColor: "#FFFFFF" }}>
      <div style={{ overflowY: "auto", overflowX: "hidden" }}>
        <Container style={{ marginTop: "10px" }}>
          <Grid container spacing={1}>
            <Grid item xs={16} sm={6} md={3}>
              <Box p={2} className="home-total-stats home-total-students">
                <div style={{ marginBottom: "6px" }}>
                  {t("total_employees")}
                </div>
                <Box className="flex space-between">
                  <Box textAlign="center" mr={2}>
                    <GroupIcon
                      sx={{
                        width: "40px",
                        height: "40px",
                      }}
                    />
                  </Box>
                  <Box textAlign="center" height={40} fontSize={30}>
                    {totalEmployee}
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={16} sm={6} md={3}>
              <Box p={2} className="home-total-stats home-total-students">
                <div style={{ marginBottom: "6px" }}> {t("total_rates")} </div>
                <Box className="flex space-between">
                  <Box textAlign="center" mr={2}>
                    <ThumbsUpDownIcon
                      sx={{
                        width: "40px",
                        height: "40px",
                      }}
                    />
                  </Box>
                  <Box textAlign="center" height={40} fontSize={30}>
                    {totalFeedBack}
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={16} sm={6} md={3}>
              <Box p={2} className="home-total-stats home-total-students">
                <div style={{ marginBottom: "6px" }}>
                  {t("total_complains")}
                </div>
                <Box className="flex space-between">
                  <Box textAlign="center" mr={2}>
                    <SpeakerNotesIcon
                      sx={{
                        width: "40px",
                        height: "40px",
                      }}
                    />
                  </Box>
                  <Box textAlign="center" height={40} fontSize={30}>
                    {totalComplain}
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={16} sm={6} md={3}>
              <Box p={2} className="home-total-stats home-total-students">
                <div style={{ marginBottom: "6px" }}>
                  {t("answered_complains")}
                </div>
                <Box className="flex space-between">
                  <Box textAlign="center" mr={2}>
                    <ReviewsIcon sx={{ height: 40, width: 40 }} />
                  </Box>
                  <Box textAlign="center" height={40} fontSize={30}>
                    {totalRespondedCompliment}
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
        {/* <div style={{display:"flex",marginTop:"40px", marginLeft:"10px",flexDirection:"row",flexFlow:"wrap",gap:"20px"}}> */}
        {PieColor(
          rates != undefined || rates != null
            ? rates
            : {
                CustomerService: {
                  Excellent: undefined,
                  VeryGood: undefined,
                  Intermediate: undefined,
                  Good: undefined,
                  Bad: undefined,
                },
                StandardService: {
                  Excellent: undefined,
                  VeryGood: undefined,
                  Intermediate: undefined,
                  Good: undefined,
                  Bad: undefined,
                },
                FairService: {
                  Excellent: undefined,
                  VeryGood: undefined,
                  Intermediate: undefined,
                  Good: undefined,
                  Bad: undefined,
                },
                ResponseForCompliment: {
                  Excellent: undefined,
                  VeryGood: undefined,
                  Intermediate: undefined,
                  Good: undefined,
                  Bad: undefined,
                },
                ServiceRate: {
                  Excellent: undefined,
                  VeryGood: undefined,
                  Intermediate: undefined,
                  Good: undefined,
                  Bad: undefined,
                },
              }
        )}
        <div
          style={{
            display: "flex",
            marginTop: "30px",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <Stack
            direction={"row"}
            gap={1}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <div
              style={{
                width: "30px",
                height: "20px",
                backgroundColor: "#76C7C0",
              }}
            >
              {" "}
            </div>
            <Typography> {t("Excellent")}</Typography>
          </Stack>
          <Stack
            direction={"row"}
            gap={1}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <div
              style={{
                width: "30px",
                height: "20px",
                backgroundColor: "#A0D9B5",
              }}
            >
              {" "}
            </div>
            <Typography> {t("VeryGood")}</Typography>
          </Stack>
          <Stack
            direction={"row"}
            gap={1}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <div
              style={{
                width: "30px",
                height: "20px",
                backgroundColor: "#80C4E9",
              }}
            >
              {" "}
            </div>
            <Typography> {t("Intermediate")}</Typography>
          </Stack>
          <Stack
            direction={"row"}
            gap={1}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <div
              style={{
                width: "30px",
                height: "20px",
                backgroundColor: "#F9E79F",
              }}
            >
              {" "}
            </div>
            <Typography> {t("Good")}</Typography>
          </Stack>
          <Stack
            direction={"row"}
            gap={1}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <div
              style={{
                width: "30px",
                height: "20px",
                backgroundColor: "#F1948A",
              }}
            >
              {" "}
            </div>
            <Typography> {t("Bad")}</Typography>
          </Stack>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "40px",
            marginLeft: "10px",
            flexDirection: "row",
            flexFlow: "wrap",
            gap: "20px",
          }}
        >
          {LineChartDisplay({
            years: years,
            values: values,
          })}
        </div>

        {DisplayTopRatedEmployees(rows, date, setDate, exportExcel)}
        <div style={{ height: "70px" }}></div>
        <div style={{ height: "100px" }}></div>
      </div>
    </div>
  );
}
const DisplayTopRatedEmployees = (
  rows: TopRatedEmployeeType[],
  date: string,
  setDate: Function,
  exportExcel: () => void
) => {
  const { t } = useTranslation();
  return (
    <div
      style={{
        marginTop: "40px",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h4>{t("top_rated_employees")}</h4>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "end",
          gap: "30px",
        }}
      >
        <FormControl variant="standard">
          <InputLabel id="demo-customized-select-label">Date</InputLabel>
          <Select
            labelId="demo-customized-select-label"
            id="demo-customized-select"
            value={date}
            sx={{ width: "180px" }}
            onChange={(event) => setDate(event.target.value)}
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
        <Button
          onClick={exportExcel}
          variant="contained"
          startIcon={<FileUpload />}
          aria-label="search"
        >
          Export
        </Button>
      </div>
      <TableContainer component={Paper} sx={{ maxWidth: 900 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>{t("rank")}</TableCell>
              <TableCell>{t("full_name")}</TableCell>
              <TableCell>{t("position")}</TableCell>
              <TableCell align="right">{t("average_point")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.employee.english_name}
                </TableCell>
                <TableCell>{row.employee.english_position}</TableCell>
                <TableCell align="right">{row.averageScore}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
