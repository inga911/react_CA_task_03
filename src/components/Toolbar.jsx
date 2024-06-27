import CustomFunctions from "../plugin/Functions";
import mainStore from "../store/mainStore";

function Toolbar() {
  const { logged, favCount, currentPage, setCurrentPage } = mainStore(
    (state) => ({
      logged: state.logged,
      favCount: state.favCount,
      currentPage: state.currentPage,
      setCurrentPage: state.setCurrentPage,
    })
  );

  const { handleNavigate, logout, goToPage } = CustomFunctions();

  const handleAllPostsClick = () => {
    setCurrentPage(1);
    goToPage(1);
  };

  return (
    <div className="toolbar d-flex justify-content-between align-items-center">
      <button onClick={() => handleNavigate("/")}>HOME</button>
      <div className="d-flex">
        <button onClick={handleAllPostsClick}>All Posts</button>
        <button onClick={() => handleNavigate("/favoritesPosts")}>
          Favorites ({favCount})
        </button>
        <div>
          {logged && (
            <>
              Logged in as {logged}
              <a href="/" onClick={logout}>
                Logout
              </a>
              <button onClick={() => handleNavigate("/createPost")}>
                Create post
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
