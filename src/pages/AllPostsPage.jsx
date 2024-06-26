import { useEffect } from "react";
import http from "../plugin/http";
import SinglePostComponent from "../components/SinglePostComponent.jsx";
import mainStore from "../store/mainStore.jsx";

function AllPostsPage() {
  const { data, setData } = mainStore((state) => ({
    data: state.data,
    setData: state.setData,
  }));

  function getPosts() {
    http.get("/getAllPosts").then((res) => {
      setData(res.data.reverse());
    });
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="all-posts d-flex flex-wrap gap-5 mt-5 justify-content-center">
      {data.length === 0 ? (
        <h1>LOADING...</h1>
      ) : (
        data.map((x) => (
          <SinglePostComponent getPosts={getPosts} data={x} key={x.id} />
        ))
      )}
    </div>
  );
}

export default AllPostsPage;
