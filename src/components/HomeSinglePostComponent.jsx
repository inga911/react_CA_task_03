import CustomFunctions from "../plugin/Functions";

function HomeSinglePostComponent({ data }) {
  const { handleNavigate } = CustomFunctions();

  if (!data) {
    return <h1>Loading...</h1>;
  }

  const handleImageError = (event) => {
    event.target.src =
      "https://static.vecteezy.com/system/resources/thumbnails/022/014/063/small_2x/missing-picture-page-for-website-design-or-mobile-app-design-no-image-available-icon-vector.jpg";
  };

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
      <div className="title">TITLE: {data.title}</div>
      <div
        className="username"
        onClick={() => handleNavigate(`/getUserPosts/${data.username}`)}
      >
        <b>Username:</b> {data.username}
      </div>
    </div>
  );
}

export default HomeSinglePostComponent;
