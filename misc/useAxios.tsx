import axios from "axios";
import useAuth from "./useAuth";
import { useEffect, useMemo } from "react";

const useAxios = () => {
  const { user } = useAuth();
  console.log(user && "proof");

  const inst = useMemo(
    () =>
      axios.create({
        baseURL: __DEV__ ? "http://192.168.0.237:3080/api" : "https://regretfulapp.xyz/api",

        headers: {
          authorization: user ? user.id : "",
        },
      }),
    [user]
  );
  return inst;
};

export default useAxios;
//http://localhost:3080/api
//http://192.168.0.238:3080/api
