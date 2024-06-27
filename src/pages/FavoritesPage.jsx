import { useEffect } from "react";
import SinglePostComponent from "../components/SinglePostComponent";
import CustomFunctions from "../plugin/Functions";

function FavoritesPage() {
  const { fav, setFav } = CustomFunctions();

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (favorites) {
      setFav(favorites);
    }
  }, []);

  return (
    <div className="favorites-page d-flex flex-wrap gap-5 justify-content-center ">
      {fav.map((x, i) => (
        <SinglePostComponent key={i} data={x} context={"allPosts"} />
      ))}
    </div>
  );
}

export default FavoritesPage;
