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

  function getPosts() {
    http.get("/getAllPosts").then((res) => {
      if (Array.isArray(res.data)) {
        setData(res.data.reverse());
      } else {
        setData([]);
      }
    });
  }
  const convertToLithuanianDate = (timestamp) => {
    const date = new Date(timestamp);
    if (isNaN(date)) {
      throw new RangeError("Invalid time value");
    }

    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return new Intl.DateTimeFormat("lt-LT", options).format(date);
  };
  return {
    handleNavigate,
    logout,
    getRandomPostsHome,
    nav,
    getPosts,
    convertToLithuanianDate,
  };
};

export default CustomFunctions;
