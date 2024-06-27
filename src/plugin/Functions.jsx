import { useNavigate } from "react-router-dom";
import mainStore from "../store/mainStore";
import http from "./http";
import { useState } from "react";

const CustomFunctions = () => {
  const nav = useNavigate();

  const [clickedStar, setClickedStar] = useState(false);
  const [fav, setFav] = useState([]);

  const {
    setLogged,
    data,
    setData,
    setPages,
    favCount,
    setFavCount,
    currentPage,
    setCurrentPage,
  } = mainStore((state) => ({
    setLogged: state.setLogged,
    data: state.data,
    setData: state.setData,
    setPages: state.setPages,
    favCount: state.favCount,
    setFavCount: state.setFavCount,
    currentPage: state.currentPage,
    setCurrentPage: state.setCurrentPage,
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

  function getPosts(page = 1, limit = 16) {
    http.get("/getAllPosts").then((res) => {
      if (Array.isArray(res.data)) {
        const allPosts = res.data.reverse();
        setPages(Math.ceil(allPosts.length / limit));
        const paginatedPosts = allPosts.slice((page - 1) * limit, page * limit);
        setData(paginatedPosts);
      } else {
        setData([]);
        setPages(0);
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

  function goToPage(page) {
    setCurrentPage(page);
    nav(`/getAllPosts/page/${page}`);
    getPosts(page);
  }

  function removeFavorite(post) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites = favorites.filter((x) => x.id !== post.id);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    setFav(favorites);
    setFavCount(favorites.length);
  }

  function addFavorite(item) {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const findItem = favorites.find((x) => x.id === item.id);

    if (!findItem) {
      favorites.push(item);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setFavCount(favorites.length);
      setClickedStar(true);
    } else {
      removeFavorite(item);
    }
  }

  return {
    handleNavigate,
    logout,
    getRandomPostsHome,
    nav,
    getPosts,
    convertToLithuanianDate,
    goToPage,
    favCount,
    setFavCount,
    clickedStar,
    setClickedStar,
    addFavorite,
    fav,
    setFav,
    removeFavorite,
  };
};

export default CustomFunctions;
