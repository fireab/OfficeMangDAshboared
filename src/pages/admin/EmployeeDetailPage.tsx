import {
  Box,
  Button,
  styled,
  Stack,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Collections, UpdateOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { EmployeeInterface } from "../../interfaces/employee.interface";
import { useParams } from "react-router-dom";
import { BaseApi, makeGetRequest, makePutRequest } from "../../config";
import { Rates } from "./Dashboard.admin";
import axios from "axios";
import { useTranslation } from "react-i18next";
// import "./css/school.css"
function removeUploadsPrefix(filePath: string) {
  const prefix = "uploads\\";
  if (filePath.startsWith(prefix)) {
    return filePath.slice(prefix.length);
  }
  return filePath;
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
export interface RateMakers {
  CustomerService: Rates | null;
  StandardService: Rates | null;
  FairService: Rates | null;
  ResponseForCompliment: Rates | null;
  ServiceRate: Rates | null;
}
export function EmployeeDetailPage() {
  const [employee, setEmployee] = useState<EmployeeInterface>();
  const { id } = useParams();

  const [profileImage, setProfileImage] = useState<string | ArrayBuffer>("");
  console.log("Profile Image = ======= === ", profileImage);

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const file = event.target.files?.[0];
    const formData = new FormData();
    if (file) formData.append("image", file);
    const response = await axios.post(
      BaseApi.base_url + "/employee/changProfile/" + id,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("Response ", response);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target != null && e.target.result != null) {
          setProfileImage(e.target!.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  const [amharic_name, setAmharicname] = useState<string>();
  const [office, setOffice] = useState<string>();
  const [position, setPosition] = useState<string>();

  const handleEditEmployee = () => {
    makePutRequest(`/employee/${id}`, {
      oromic_name: amharic_name,
      office: office,
      position: position,
    })
      .then((data) => {
        console.log(data);

        window.alert(" Update successful !");
      })
      .catch((error) => {
        console.log("Update error ");
        console.log(error);
      });
  };
  const [rate, setRate] = useState<RateMakers>();
  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);
  const [image_path, setImagePath] = useState<string | null>(null);
  const [date, setDate] = useState<string>("");
  const [totalRaters, setTotalRaters] = useState<number>(0);
  // const encodedFileName = encodeURIComponent(fileName);
  useEffect(() => {
    makeGetRequest(`/employee/${id}`)
      .then((result) => {
        console.log("result", result);
        let data = result.data;
        setEmployee(data);

        console.log("Employee ", employee);
        let imageUrl = `${BaseApi.base_url}/public/${data?.path}`;

        setImagePath(imageUrl);
        console.log("Image Path ", image_path);
        setProfileImage(""); // Clear profileImage when loading a new employee
      })
      .catch((error) => {
        console.log("Error", error);
      });

    // Create a temporary URL for the image blob
  }, []);
  useEffect(() => {
    makeGetRequest(`/stat/employee/${id}?dateFilter=${date}`)
      .then((result) => {
        // console.log("result",result.data)
        let data = result.data;
        setRate(data.result);
        setTotalRaters(data.total);
        console.log("Rate ", rate);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }, [date]);
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
        <div> - {t("employees")}</div>
      </div>{" "}
      <div className="main-detail-page">
        <Box className="profile">
          <div
            style={{ fontSize: "17px", fontWeight: "bolder", color: "#17153d" }}
          >
            {t("employee_profile")}
          </div>
          <div className="flex-row">
            <Box className="change-profile">
              <div
                style={{ display: "flex", alignItems: "center", gap: "20px" }}
              >
                <img
                  src={
                    profileImage
                      ? (profileImage as string)
                      : employee?.path
                      ? BaseApi.base_url + "/public/" + employee?.path
                      : "/icons/profile_holder.jpg"
                  }
                  // src={BaseApi.base_url+"/uploads/"+employee?.path}  crossOrigin='anonymous' alt="Uploaded File"
                  style={{
                    verticalAlign: "middle",
                    width: "300px",
                    height: "300px",
                  }}
                />
                {/* <img 
                                // crossOrigin='anonymous'
                                src={`${employee?.path}`}
                              alt="Avatar"  /> */}
              </div>
              <Button
                component="label"
                variant="contained"
                startIcon={<Collections />}
                sx={{
                  display: "flex",
                  marginTop: "10px",
                  backgroundColor: "#17153d",
                  gap: "1px",
                  fontSize: "13px",
                }}
              >
                <VisuallyHiddenInput type="file" onChange={handleImageChange} />
                Change Image
              </Button>
            </Box>
            <Box className="form-profile">
              <Stack
                direction="row"
                gap={2}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <b>{t("full_name")} : </b>
                <input
                  name="Name"
                  disabled
                  onChange={(e) => {
                    setAmharicname(e.target.value);
                  }}
                  defaultValue={employee?.english_name}
                  id="Name"
                  className="profile-input"
                  placeholder={employee?.amharic_name}
                ></input>
              </Stack>
              <Stack
                direction="row"
                gap={2}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <b>{t("office")} : </b>
                <input
                  name="Office"
                  disabled
                  onChange={(e) => {
                    setOffice(e.target.value);
                  }}
                  defaultValue={employee?.office}
                  id="Office"
                  className="profile-input"
                  placeholder={employee?.office}
                ></input>
              </Stack>
              <Stack
                direction="row"
                gap={1}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <b>{t("position")} </b>
                <input
                  name="Position"
                  disabled
                  onChange={(e) => {
                    setPosition(e.target.value);
                  }}
                  defaultValue={employee?.english_position}
                  id="Position"
                  className="profile-input"
                  placeholder={employee?.position}
                ></input>
              </Stack>

              <Button
                startIcon={<UpdateOutlined />}
                onClick={handleEditEmployee}
                variant="contained"
                sx={{
                  width: "140px",
                  marginTop: "10px",
                  backgroundColor: "#17153d",
                }}
              >
                {t("submit")}
              </Button>
            </Box>
          </div>
        </Box>

        <TableContainer
          sx={{
            marginTop: "30px",
            marginLeft: "25px",
            maxWidth: "960px",
            border: "1px solide black",
            backgroundColor: "white",
          }}
        >
          <h3 style={{ marginLeft: "25%" }}>
            {" "}
            Customer Ratings for the Employee{" "}
          </h3>
          <div
            style={{
              display: "flex",
              gap: "30px",
              alignItems: "end",
              justifyContent: "center",
              flexDirection: "row",
              marginBottom: "20px",
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
            <div>
              {" "}
              <b>
                {" "}
                {t("total_raters")} : {totalRaters}{" "}
              </b>
            </div>
          </div>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow style={{ backgroundColor: "", color: "white" }}>
                <TableCell> Measures </TableCell>
                <TableCell> {t("CustomerService")} </TableCell>
                <TableCell>{t("StandardService")}</TableCell>
                <TableCell>{t("FairService")}</TableCell>
                <TableCell>{t("ResponseForCompliment")}</TableCell>
                <TableCell>{t("ServiceRate")}</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{t("Excellent")} </TableCell>
                <TableCell>
                  {" "}
                  {rate?.CustomerService != null
                    ? rate?.CustomerService.Excellent
                    : null}{" "}
                </TableCell>
                <TableCell>
                  {rate?.StandardService != null
                    ? rate?.StandardService.Excellent
                    : null}
                </TableCell>
                <TableCell>
                  {rate?.FairService != null
                    ? rate?.FairService.Excellent
                    : null}
                </TableCell>
                <TableCell>
                  {rate?.ResponseForCompliment != null
                    ? rate?.ResponseForCompliment.Excellent
                    : null}
                </TableCell>
                <TableCell>
                  {rate?.ServiceRate != null
                    ? rate?.ServiceRate.Excellent
                    : null}
                </TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell> {t("VeryGood")} </TableCell>
                <TableCell>
                  {" "}
                  {rate?.CustomerService != null
                    ? rate?.CustomerService.VeryGood
                    : null}{" "}
                </TableCell>
                <TableCell>
                  {rate?.StandardService != null
                    ? rate?.StandardService.VeryGood
                    : null}
                </TableCell>
                <TableCell>
                  {rate?.FairService != null
                    ? rate?.FairService.VeryGood
                    : null}
                </TableCell>
                <TableCell>
                  {rate?.ResponseForCompliment != null
                    ? rate?.ResponseForCompliment.VeryGood
                    : null}
                </TableCell>
                <TableCell>
                  {rate?.ServiceRate != null
                    ? rate?.ServiceRate.VeryGood
                    : null}
                </TableCell>
              </TableRow>

              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell> {t("Intermediate")} </TableCell>
                <TableCell>
                  {" "}
                  {rate?.CustomerService != null
                    ? rate?.CustomerService.Intermediate
                    : null}{" "}
                </TableCell>
                <TableCell>
                  {rate?.StandardService != null
                    ? rate?.StandardService.Intermediate
                    : null}
                </TableCell>
                <TableCell>
                  {rate?.FairService != null
                    ? rate?.FairService.Intermediate
                    : null}
                </TableCell>
                <TableCell>
                  {rate?.ResponseForCompliment != null
                    ? rate?.ResponseForCompliment.Intermediate
                    : null}
                </TableCell>
                <TableCell>
                  {rate?.ServiceRate != null
                    ? rate?.ServiceRate.Intermediate
                    : null}
                </TableCell>
              </TableRow>

              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell> {t("Good")} </TableCell>
                <TableCell>
                  {" "}
                  {rate?.CustomerService != null
                    ? rate?.CustomerService.Good
                    : null}{" "}
                </TableCell>
                <TableCell>
                  {rate?.StandardService != null
                    ? rate?.StandardService.Good
                    : null}
                </TableCell>
                <TableCell>
                  {rate?.FairService != null ? rate?.FairService.Good : null}
                </TableCell>
                <TableCell>
                  {rate?.ResponseForCompliment != null
                    ? rate?.ResponseForCompliment.Good
                    : null}
                </TableCell>
                <TableCell>
                  {rate?.ServiceRate != null ? rate?.ServiceRate.Good : null}
                </TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell> {t("Bad")} </TableCell>
                <TableCell>
                  {" "}
                  {rate?.CustomerService != null
                    ? rate?.CustomerService.Bad
                    : null}{" "}
                </TableCell>
                <TableCell>
                  {rate?.StandardService != null
                    ? rate?.StandardService.Bad
                    : null}
                </TableCell>
                <TableCell>
                  {rate?.FairService != null ? rate?.FairService.Bad : null}
                </TableCell>
                <TableCell>
                  {rate?.ResponseForCompliment != null
                    ? rate?.ResponseForCompliment.Bad
                    : null}
                </TableCell>
                <TableCell>
                  {rate?.ServiceRate != null ? rate?.ServiceRate.Bad : null}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
