import { useEffect } from "react";
import http from "../plugin/http";
import mainStore from "../store/mainStore";
import { useParams } from "react-router-dom";
import SinglePostComponent from "../components/SinglePostComponent";

function SinglePostPage() {
  const { username, id } = useParams();
  const { data, setData } = mainStore((state) => ({
    data: state.data,
    setData: state.setData,
  }));

  useEffect(() => {
    setData(null);
    http.get(`/getSinglePost/${username}/${id}`).then((res) => {
      setData(res.data);
    });
  }, [username, id, setData]);

  return <div>{data && <SinglePostComponent data={data} />}</div>;
}

export default SinglePostPage;
