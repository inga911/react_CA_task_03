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
      {data.length === 0 ? (
        <>You do not have created posts yet.</>
      ) : (
        <AllUserPostsComponent data={data} />
      )}
    </div>
  );
}

export default AllUserPostsPage;
