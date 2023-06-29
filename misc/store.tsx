import { useEffect } from "react";
import { useState, createContext } from "react";

import useStorage from "./useStorage";
export const AppContext = createContext(null);
import axios from "axios";
export const ContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [notifContent, setNotifContent] = useState("");
  const [firstLaunch, setFirstLaunch] = useState(false);
  const { getData, storeData, removeData } = useStorage();
  // removeData("user");
  async function showNotif(content: string) {
    setNotifContent(content);
    await new Promise((resolve) => {
      setTimeout(resolve, 5 * 1000);
    });
    setNotifContent("");
  }
  useEffect(() => {
    async function checkOnBoard() {
      const created = await getData("user");

      console.log("cr", created);

      if (!created) {
        console.log("creating new user");
        setFirstLaunch(true);
        const resp = await axios.post("https://regretfulapp.xyz/api/users").catch((err) => console.log(err));
        if (resp) {
          console.log(resp.data);
          storeData("user", JSON.stringify(resp.data));
          setUser(resp.data);
        }
      } else {
        setFirstLaunch(false);
        const parsed = JSON.parse(created).id;
        console.log("user already created", parsed);
        axios.defaults.headers.common.Authorization = parsed;
        axios.interceptors.request.use((config) => {
          config.headers.Authorization = parsed;
          return config;
        });
        axios
          .get("https://regretfulapp.xyz/api/users/" + parsed)
          .then((resp) => {
            console.log("user", resp.data);
            if (resp.data) {
              setUser(resp.data.user);
              storeData("user", JSON.stringify(resp.data.user));
            }
          })
          .catch((err) => {
            console.log("couldnt get user store", err);
          });
      }
    }
    checkOnBoard();
  }, []);
  return (
    <AppContext.Provider value={{ user, setUser, notifContent, showNotif, firstLaunch, setFirstLaunch, setNotifContent }}>
      {props.children}
    </AppContext.Provider>
  );
};

//stories, setStories, favorites, setFavorites
