import CustomFunctions from "../plugin/Functions";
import mainStore from "../store/mainStore";
import SinglePostComponent from "./SinglePostComponent";

function AllUserPostsComponent({ data }) {
  const { currentPage } = mainStore((state) => ({
    currentPage: state.currentPage,
  }));
  const { getPosts } = CustomFunctions();
  if (!data) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="user-posts d-flex flex-wrap justify-content-center  gap-5">
      {Array.isArray(data) &&
        data.map((x) => (
          <SinglePostComponent
            getPosts={() => getPosts(currentPage)}
            data={x}
            key={x.id}
            context="allPosts"
          />
        ))}
    </div>
  );
}

export default AllUserPostsComponent;
