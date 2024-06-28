import { useState } from "react";
import CustomFunctions from "../plugin/Functions";
import mainStore from "../store/mainStore";

function Toolbar() {
  const [toggleMenu, setToggleMenu] = useState(false);
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

  const handleMenuToggle = () => {
    setToggleMenu((prevToggleMenu) => !prevToggleMenu);
  };

  return (
    <div className="toolbar d-flex justify-content-between align-items-center">
      <button onClick={() => handleNavigate("/")} className="toolbar-btn-main">
        HOME
      </button>
      <div className="d-flex">
        <button
          onClick={handleAllPostsClick}
          className="all-post-btn toolbar-btn-main"
        >
          All Posts
        </button>

        <div className="d-flex gap-4">
          {logged && (
            <>
              <div
                className="logged-user d-flex align-content-center gap-1 action"
                onClick={handleMenuToggle}
              >
                <div className="profile d-flex gap-1">
                  <span className="material-symbols-outlined">
                    account_circle
                  </span>
                  {logged}
                  <span class="material-symbols-outlined">arrow_drop_down</span>
                </div>
                <div className={`menu ${toggleMenu ? "active" : ""}`}>
                  <ul>
                    <li>
                      <button
                        className="action-btn"
                        onClick={() => handleNavigate("/favoritesPosts")}
                      >
                        ⭐️ Favorites ({favCount})
                      </button>
                    </li>
                    <li>
                      <button
                        className="action-btn"
                        onClick={() =>
                          handleNavigate(`/getUserPosts/${logged}`)
                        }
                      >
                        My posts
                      </button>
                    </li>
                    <li>
                      <button
                        className="action-btn"
                        onClick={() => handleNavigate("/createPost")}
                      >
                        Create post
                      </button>
                    </li>

                    <li>
                      <a
                        className="action-btn d-flex align-content-center"
                        href="/"
                        onClick={logout}
                      >
                        <span class="material-symbols-outlined">logout</span>
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          )}
        </div>

        {!logged && (
          <>
            <button
              className="toolbar-btn-main"
              onClick={() => handleNavigate("/login")}
            >
              LOGIN
            </button>
            <button
              className="toolbar-btn-main"
              onClick={() => handleNavigate("/createAccount")}
            >
              REGISTER
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Toolbar;
