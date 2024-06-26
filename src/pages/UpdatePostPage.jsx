import mainStore from "../store/mainStore";
import UpdatePostComponent from "../components/UpdatePostComponent";
import { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import http from "../plugin/http";

function UpdatePostPage() {
  const { username, id } = useParams();
  const location = useLocation();
  const { data, setData } = mainStore((state) => ({
    data: state.data,
    setData: state.setData,
  }));

  useEffect(() => {
    if (location.state && location.state.data) {
      setData(location.state.data);
    } else {
      http.get(`/getSinglePost/${username}/${id}`).then((res) => {
        if (res.data) {
          setData(res.data);
        } else {
          setData(null);
        }
      });
    }
  }, [username, id, location.state, setData]);

  return (
    <div>
      {data ? <UpdatePostComponent data={data} /> : <h1>Loading...</h1>}
    </div>
  );
}

export default UpdatePostPage;
