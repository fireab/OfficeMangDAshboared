import axios, { AxiosError, AxiosResponse } from "axios";
export const BaseApi = {
  base_url: "http://localhost:2000",
};
interface ReturnType {
  status: number;
  message: string;
  data: any;
}
export const makePostRequest = async (
  url: string,
  body: any
): Promise<ReturnType> => {
  return new Promise((resolve, reject) => {
    axios
      .post(BaseApi.base_url + url, body)
      .then((response: AxiosResponse) => {
        resolve({
          status: 200,
          message: "success",
          data: response.data,
        });
      })
      .catch((error: AxiosError) => {
        console.log(error);
        reject({
          status: 400,
          message: "Failed",
          data: "",
        });
      });
  });
};
export const makeDeleteRequest = async (url: string): Promise<ReturnType> => {
  return new Promise((resolve, reject) => {
    axios
      .delete(BaseApi.base_url + url)
      .then((response: AxiosResponse) => {
        resolve({
          status: 200,
          message: "success",
          data: response.data,
        });
      })
      .catch((error: AxiosError) => {
        console.log(error);
        reject({
          status: 400,
          message: "Failed",
          data: "",
        });
      });
  });
};
export const makeGetRequest = (
  url: string,
  options?: any
): Promise<ReturnType> => {
  return new Promise((resolve, reject) => {
    axios
      .get(BaseApi.base_url + url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          mode: "cors",
        },
        ...options,
      })
      .then((response: AxiosResponse) => {
        resolve({
          status: 200,
          message: "success",
          data: response.data,
        });
      })
      .catch((error: AxiosError) => {
        reject({
          status: 400,
          message: "Failed",
          data: "",
          error: error,
        });
      });
  });
};
export const makePutRequest = (url: string, body: any): Promise<ReturnType> => {
  return new Promise((resolve, reject) => {
    console.log("gonna updateeee");

    axios
      .put(BaseApi.base_url + url, body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response: AxiosResponse) => {
        resolve({
          status: 200,
          message: "success",
          data: response.data,
        });
      })
      .catch((error: AxiosError) => {
        reject({
          status: 400,
          message: "Failed",
          data: "",
          error: error,
        });
      });
  });
};
