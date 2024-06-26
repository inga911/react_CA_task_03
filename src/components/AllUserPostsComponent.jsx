import SinglePostComponent from "./SinglePostComponent";

function AllUserPostsComponent({ data }) {
  if (!data) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="user-posts">
      {data.length === 0 ? (
        <h1>Loading...</h1>
      ) : (
        data.map((item) => (
          <SinglePostComponent data={item} key={item.id} context="singlePost" />
        ))
      )}
    </div>
  );
}

export default AllUserPostsComponent;
