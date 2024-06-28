import { useEffect } from "react";
import SinglePostComponent from "../components/SinglePostComponent";
import mainStore from "../store/mainStore";
import CustomFunctions from "../plugin/Functions";

function MyPostsPage() {
  const { logged, data } = mainStore((state) => ({
    logged: state.logged,
    data: state.data,
  }));

  const { fetchUserPosts } = CustomFunctions();

  useEffect(() => {
    if (logged) {
      fetchUserPosts(logged);
    }
  }, [logged, fetchUserPosts]);

  return (
    <div>
      My posts
      {data &&
        data.map((x, i) => (
          <SinglePostComponent key={i} data={x} context={"myPosts"} />
        ))}
    </div>
  );
}
export default MyPostsPage;
