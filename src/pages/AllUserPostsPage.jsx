import { useEffect } from "react";
import AllUserPostsComponent from "../components/AllUserPostsComponent";
import http from "../plugin/http";
import { useParams } from "react-router-dom";
import mainStore from "../store/mainStore";

function AllUserPostsPage() {
  const { username } = useParams();
  const { data, setData } = mainStore((state) => ({
    data: state.data,
    setData: state.setData,
  }));

  useEffect(() => {
    http.get("/getUserPosts/" + username).then((res) => {
      setData(res.data);
    });
  }, [username, setData]);

  return (
    <div>
      {Array.isArray(data) ? (
        <AllUserPostsComponent data={data} />
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}

export default AllUserPostsPage;
