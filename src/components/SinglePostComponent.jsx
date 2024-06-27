import { useEffect, useState } from "react";
import CustomFunctions from "../plugin/Functions";
import http from "../plugin/http";
import mainStore from "../store/mainStore";

function SinglePostComponent({ data, context }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const { handleNavigate, getPosts, convertToLithuanianDate, addFavorite } =
    CustomFunctions();

  const { logged } = mainStore((state) => ({
    logged: state.logged,
  }));

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const findItem = favorites.find((x) => x.id === data.id);
    if (findItem) {
      setIsFavorite(true);
    }
  }, [data.id]);

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
      <div
        className={`fav-star ${isFavorite ? "checked" : ""}`}
        onClick={handleFavoriteClick}
      ></div>
      {context === "allPosts" ? (
        <img
          className="post-img-link"
          src={data.image}
          alt={data.id}
          onClick={() =>
            handleNavigate(`/getSinglePost/${data.username}/${data.id}`)
          }
        />
      ) : (
        <img className="single-post-img" src={data.image} alt={data.id} />
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
        <div className={`${context === "singlePost" && "date"}`}>
          <b>Created:</b> {formattedDate}
        </div>
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
