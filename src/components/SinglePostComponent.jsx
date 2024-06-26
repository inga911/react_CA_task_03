import CustomFunctions from "../plugin/Functions";
import mainStore from "../store/mainStore";

function SinglePostComponent({ data }) {
  const { handleNavigate } = CustomFunctions();
  const { logged } = mainStore((state) => ({
    logged: state.logged,
  }));

  if (!data) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="single-post-card">
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
      {logged === data.username && (
        <button
          onClick={() =>
            handleNavigate(`/updatePost/${data.username}/${data.id}`, {
              state: { data },
            })
          }
        >
          Update
        </button>
      )}
    </div>
  );
}

export default SinglePostComponent;
