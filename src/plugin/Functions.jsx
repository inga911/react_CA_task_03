import { useNavigate } from "react-router-dom";
import mainStore from "../store/mainStore";
import http from "./http";

const CustomFunctions = () => {
  const nav = useNavigate();
  const { setLogged, data, setData } = mainStore((state) => ({
    setLogged: state.setLogged,
    data: state.data,
    setData: state.setData,
  }));

  function handleNavigate(path) {
    nav(path);
  }

  function logout() {
    localStorage.removeItem("secret");
    localStorage.removeItem("user");
    setLogged(null);
    nav("/");
  }

  function getRandomPostsHome() {
    http.get("/getAllPosts").then((res) => {
      if (Array.isArray(res.data)) {
        setData(res.data);
      } else {
        setData([]);
      }
    });
  }

  return { handleNavigate, logout, getRandomPostsHome, nav };
};

export default CustomFunctions;
