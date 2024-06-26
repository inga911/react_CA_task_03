import CustomFunctions from "../plugin/Functions";

function SinglePostComponent({ data }) {
  const { handleNavigate } = CustomFunctions();

  return (
    <div className="single-post-card">
      {!data ? (
        <h1>Loading... </h1>
      ) : (
        <>
          <img
            src={data.image}
            alt={data.id}
            onClick={() =>
              handleNavigate(`/getSinglePost/${data.username}/${data.id}`)
            }
          />
          <div className="title">TITLE: {data.title}</div>
          <div
            className="username"
            onClick={() => handleNavigate(`/getUserPosts/${data.username}`)}
          >
            <b>Username:</b> {data.username}
          </div>
        </>
      )}
    </div>
  );
}

export default SinglePostComponent;
