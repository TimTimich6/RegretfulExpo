import axios from "axios";
import useAuth from "./useAuth";
import { useEffect } from "react";

const useAxios = () => {
  const auth = useAuth();
  useEffect(() => {}, [auth]);

  return axios.create({
    baseURL: __DEV__ ? "http://192.168.0.237:3080/api" : "https://regretfulapp.xyz/api",

    ...(auth?.user && {
      headers: {
        authorization: auth?.user.id,
      },
    }),
  });
};

export default useAxios;
//http://localhost:3080/api
//http://192.168.0.238:3080/api
