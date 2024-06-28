import CustomFunctions from "../plugin/Functions";
import mainStore from "../store/mainStore";

function Toolbar() {
  const { logged, favCount, setCurrentPage } = mainStore((state) => ({
    logged: state.logged,
    favCount: state.favCount,
    setCurrentPage: state.setCurrentPage,
  }));

  const { handleNavigate, goToPage, logout } = CustomFunctions();

  const handleAllPostsClick = () => {
    setCurrentPage(1);
    goToPage(1);
  };

  return (
    <div className="toolbar d-flex justify-content-between align-items-center">
      <button onClick={() => handleNavigate("/")}>HOME</button>
      <div className="d-flex">
        <button onClick={handleAllPostsClick}>All Posts</button>

        <div>
          {logged && (
            <>
              <button onClick={() => handleNavigate("/favoritesPosts")}>
                Favorites ({favCount})
              </button>
              Logged in as {logged}
              <a href="/" onClick={logout}>
                Logout
              </a>
              <button onClick={() => handleNavigate("/createPost")}>
                Create post
              </button>
              <button onClick={() => handleNavigate(`/getUserPosts/${logged}`)}>
                My posts
              </button>
            </>
          )}
        </div>

        {!logged && (
          <>
            <button onClick={() => handleNavigate("/login")}>LOGIN</button>
            <button onClick={() => handleNavigate("/createAccount")}>
              REGISTER
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Toolbar;
