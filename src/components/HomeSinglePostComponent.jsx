import CustomFunctions from "../plugin/Functions";
import mainStore from "../store/mainStore";

function HomeSinglePostComponent({ data }) {
  const { handleNavigate } = CustomFunctions();
  const { handleImageError } = mainStore();

  if (!data) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="home-single-post-card">
      <img
        src={data.image}
        alt={data.id}
        onClick={() =>
          handleNavigate(`/getSinglePost/${data.username}/${data.id}`)
        }
        onError={handleImageError}
      />
      <div
        className="username"
        onClick={() => handleNavigate(`/getUserPosts/${data.username}`)}
      >
        User: <b>{data.username}</b>
      </div>
    </div>
  );
}

export default HomeSinglePostComponent;
