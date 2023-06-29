import axios, { AxiosInstance } from "axios";
import useAuth from "./useAuth";
import { useEffect, useMemo, useState } from "react";

const useAxios = () => {
  const { user } = useAuth();
  const original = useMemo(
    () =>
      axios.create({
        baseURL: __DEV__ ? "http://192.168.0.237:3080/api" : "https://regretfulapp.xyz/api",
        headers: { Authorization: user?.id },
      }),
    [user]
  );

  return original;
};

export default useAxios;
//http://localhost:3080/api
//http://192.168.0.238:3080/api
