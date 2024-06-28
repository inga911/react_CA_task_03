import { useNavigate } from "react-router-dom";
import mainStore from "../store/mainStore";
import http from "./http";
import { useState } from "react";

const CustomFunctions = () => {
  const nav = useNavigate();

  const [clickedStar, setClickedStar] = useState(false);
  const [fav, setFav] = useState([]);
  const [isFilterActive, setIsFilterActive] = useState(false);

  const {
    logged,
    setLogged,
    setData,
    setPages,
    favCount,
    setFavCount,
    setCurrentPage,
    items,
    setItems,
    setFoundPostCount,
  } = mainStore((state) => ({
    logged: state.logged,
    setLogged: state.setLogged,
    data: state.data,
    setData: state.setData,
    setPages: state.setPages,
    favCount: state.favCount,
    setFavCount: state.setFavCount,
    currentPage: state.currentPage,
    setCurrentPage: state.setCurrentPage,
    items: state.items,
    setItems: state.setItems,
    foundPostCount: state.foundPostCount,
    setFoundPostCount: state.setFoundPostCount,
  }));

  const userKey = logged ? `favorites_${logged}` : "favorites";

  //NAVIGATION
  function handleNavigate(path) {
    nav(path);
  }

  //LOGOUT
  function logout() {
    localStorage.removeItem("secret");
    localStorage.removeItem("user");
    setLogged(null);
    nav("/");
  }

  // RANDOM POSTS IN HOME PAGE
  function getRandomPostsHome() {
    http.get("/getAllPosts").then((res) => {
      if (Array.isArray(res.data)) {
        setData(res.data);
      } else {
        setData([]);
      }
    });
  }

  // GET ALL POSTS IN ALL POSTS PAGE
  function getPosts(page = 1, limit = 16) {
    http.get("/getAllPosts").then((res) => {
      if (Array.isArray(res.data)) {
        const allPosts = res.data.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );
        setPages(Math.ceil(allPosts.length / limit));
        const paginatedPosts = allPosts.slice((page - 1) * limit, page * limit);
        setData(paginatedPosts);
      } else {
        setData([]);
        setPages(0);
      }
    });
  }

  // TIMESTAMP CONVERTING IN  TO  LITHUANIA DATE
  const convertToLithuanianDate = (timestamp) => {
    try {
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
    } catch (error) {
      return "Invalid Date";
    }
  };

  // PAGINATION BUTTON FUNCTION TO GO TO A SPECIFIC PAGE
  function goToPage(page) {
    setCurrentPage(page);
    nav(`/getAllPosts/page/${page}`);
    getPosts(page);
    setIsFilterActive(false);
  }

  // ADD POSTS TO FAVORITE
  function addFavorite(item) {
    const favorites = JSON.parse(localStorage.getItem(userKey)) || [];
    const findItem = favorites.find((x) => x.id === item.id);

    if (!findItem) {
      favorites.push(item);
      localStorage.setItem(userKey, JSON.stringify(favorites));
      updateFavCount(favorites.length);
      setClickedStar(true);
    } else {
      removeFavorite(item);
    }
  }

  // REMOVE POST FROM FAVORTE
  function removeFavorite(post) {
    let favorites = JSON.parse(localStorage.getItem(userKey)) || [];
    favorites = favorites.filter((x) => x.id !== post.id);
    localStorage.setItem(userKey, JSON.stringify(favorites));
    setFav(favorites);
    setFavCount(favorites.length);
  }

  // REMOVE POST FROM FAVORITE BY ID WHEN POST WAS DELETED BY USER
  function removeFavoriteById(postId) {
    let favorites = JSON.parse(localStorage.getItem(userKey)) || [];
    favorites = favorites.filter((x) => x.id !== postId);
    localStorage.setItem(userKey, JSON.stringify(favorites));
    setFav(favorites);
    setFavCount(favorites.length);
  }

  // UPDATE FAVORITE POST NUMBER IN TOOLBAR
  function updateFavCount(count) {
    setFavCount(count);
  }

  // FILTER
  function handleFilter(filters) {
    let filtered = items;
    let filterApplied = false;

    if (filters.findUsername) {
      filtered = filtered.filter((item) =>
        item.username.toLowerCase().includes(filters.findUsername.toLowerCase())
      );
      filterApplied = true;
    }
    if (filters.findTitle) {
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(filters.findTitle.toLowerCase())
      );
      filterApplied = true;
    }
    if (filters.findDateFrom) {
      const dateFrom = new Date(filters.findDateFrom);
      filtered = filtered.filter(
        (item) => new Date(item.timestamp) >= dateFrom
      );
      filterApplied = true;
    }
    if (filters.findDateTo) {
      const dateTo = new Date(filters.findDateTo);
      filtered = filtered.filter((item) => new Date(item.timestamp) <= dateTo);
      filterApplied = true;
    }

    setData(filtered);
    setIsFilterActive(filterApplied);
    setFoundPostCount(filtered.length);
  }

  // GET ALL POSTS FOR LOGGED USER
  function fetchUserPosts(username) {
    http.get(`/getUserPosts/${username}`).then((res) => {
      if (Array.isArray(res.data)) {
        setData(res.data);
      } else {
        setData([]);
      }
    });
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
    removeFavoriteById,
    isFilterActive,
    setIsFilterActive,
    handleFilter,
    items,
    setItems,
    updateFavCount,
    fetchUserPosts,
  };
};

export default CustomFunctions;
