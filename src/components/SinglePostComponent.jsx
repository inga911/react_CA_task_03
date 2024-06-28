import { useEffect, useState } from "react";
import CustomFunctions from "../plugin/Functions";
import http from "../plugin/http";
import mainStore from "../store/mainStore";

function SinglePostComponent({ data, context }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const {
    handleNavigate,
    getPosts,
    convertToLithuanianDate,
    addFavorite,
    removeFavoriteById,
  } = CustomFunctions();

  const { logged, handleImageError } = mainStore((state) => ({
    logged: state.logged,
    handleImageError: state.handleImageError,
  }));

  useEffect(() => {
    const userKey = logged ? `favorites_${logged}` : "favorites";
    const favorites = JSON.parse(localStorage.getItem(userKey)) || [];
    const findItem = favorites.find((x) => x.id === data.id);
    if (findItem) {
      setIsFavorite(true);
    }
  }, [data.id, logged]);

  const handleFavoriteClick = () => {
    addFavorite(data);
    setIsFavorite((prev) => !prev);
  };

  const formattedDate = convertToLithuanianDate(data.timestamp);

  async function removePost() {
    const remPost = {
      id: data.id,
      secretKey: localStorage.getItem("secret"),
    };
    const res = await http.post("/deletepost", remPost);

    if (res.success) {
      removeFavoriteById(data.id);
      handleNavigate(`/getAllPosts/page/1`);
      getPosts();
    }
  }

  if (!data) {
    return <h1>Loading...</h1>;
  }

  return (
    <div
      className={`single-post-card ${
        context === "allPosts"
          ? "all-posts-style"
          : "single-post-style d-flex gap-5"
      }`}
    >
      {logged && (
        <div
          className={`fav-star ${isFavorite ? "checked" : ""}`}
          onClick={handleFavoriteClick}
        ></div>
      )}

      {context === "allPosts" ? (
        <img
          className="post-img-link"
          src={data.image}
          alt={data.id}
          onClick={() =>
            handleNavigate(`/getSinglePost/${data.username}/${data.id}`)
          }
          onError={handleImageError}
        />
      ) : (
        <img
          className="single-post-img"
          src={data.image}
          alt={data.id}
          onError={handleImageError}
          onClick={() =>
            handleNavigate(`/getSinglePost/${data.username}/${data.id}`)
          }
        />
      )}

      <div
        className={`${
          context === "singlePost" &&
          "about-post d-flex flex-column justify-content-between"
        }`}
      >
        <div>
          <b>Title:</b> {data.title}
        </div>

        {context === "singlePost" && (
          <>
            <div>
              <b>Description:</b>
              {data.description}
            </div>
          </>
        )}
        <div
          className="username"
          onClick={() => handleNavigate(`/getUserPosts/${data.username}`)}
        >
          <b>Username:</b> {data.username}
        </div>
        {context === "singlePost" ? (
          <>
            <div>
              <div className="date">
                <b>Created:</b> {formattedDate}
              </div>
            </div>
          </>
        ) : (
          ""
        )}
        {logged === data.username && (
          <div className="d-flex justify-content-between mt-4 ">
            <button
              className="user-post-action-btn update-btn"
              onClick={() =>
                handleNavigate(`/updatePost/${data.username}/${data.id}`, {
                  state: { data },
                })
              }
            >
              Update
            </button>
            <button className="user-post-action-btn " onClick={removePost}>
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SinglePostComponent;
