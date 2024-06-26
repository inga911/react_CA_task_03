import { useEffect } from "react";
import SinglePostComponent from "../components/SinglePostComponent.jsx";
import mainStore from "../store/mainStore.jsx";
import CustomFunctions from "../plugin/Functions.jsx";

function AllPostsPage() {
  const { data, setData } = mainStore((state) => ({
    data: state.data,
    setData: state.setData,
  }));

  const { getPosts } = CustomFunctions();

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="all-posts d-flex flex-wrap gap-5 mt-5 justify-content-center">
      {Array.isArray(data) && data.length === 0 ? (
        <h1>LOADING...</h1>
      ) : (
        Array.isArray(data) &&
        data.map((x) => (
          <SinglePostComponent getPosts={getPosts} data={x} key={x.id} />
        ))
      )}
    </div>
  );
}

export default AllPostsPage;
