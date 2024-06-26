import CustomFunctions from "../plugin/Functions";
import mainStore from "../store/mainStore";

function Toolbar() {
  const { logged } = mainStore((state) => ({
    logged: state.logged,
  }));

  const { handleNavigate, logout } = CustomFunctions();
  return (
    <div className="toolbar d-flex justify-content-between align-items-center">
      <button onClick={() => handleNavigate("/")}>HOME</button>
      <div className="d-flex">
        <button onClick={() => handleNavigate("/getAllPosts")}>
          All Posts
        </button>
        <button onClick={() => handleNavigate("/favoritesPosts")}>
          Favorites
        </button>
        <div>
          {logged && (
            <>
              Logged in as {logged}
              <a href="/" onClick={logout}>
                Loggout
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
