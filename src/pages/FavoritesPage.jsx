import { useEffect } from "react";
import SinglePostComponent from "../components/SinglePostComponent";
import CustomFunctions from "../plugin/Functions";
import mainStore from "../store/mainStore";

function FavoritesPage() {
  const { logged } = mainStore((state) => ({
    logged: state.logged,
  }));

  const { fav, setFav, updateFavCount } = CustomFunctions();

  useEffect(() => {
    const userKey = logged ? `favorites_${logged}` : "favorites";
    const favorites = JSON.parse(localStorage.getItem(userKey)) || [];

    if (favorites) {
      setFav(favorites);
      updateFavCount(favorites.length);
    }
  }, [logged, setFav]);

  return (
    <div className="favorites-page d-flex flex-wrap gap-5 justify-content-center ">
      {fav.length === 0 ? (
        <>You do not have favorite posts yet.</>
      ) : (
        fav.map((x, i) => (
          <SinglePostComponent key={i} data={x} context={"allPosts"} />
        ))
      )}
    </div>
  );
}

export default FavoritesPage;
