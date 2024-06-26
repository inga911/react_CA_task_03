import CustomFunctions from "../plugin/Functions";

function Toolbar() {
  const { handleNavigate } = CustomFunctions();
  return (
    <div className="toolbar d-flex justify-content-between align-items-center">
      <button onClick={() => handleNavigate("/")}>HOME</button>
      <div className="">
        <button onClick={() => handleNavigate("/getAllPosts")}>
          All Posts
        </button>
        <button onClick={() => handleNavigate("/favoritesPosts")}>
          Favorites
        </button>
        <button onClick={() => handleNavigate("/login")}>LOGIN</button>
        <button onClick={() => handleNavigate("/createAccount")}>
          REGISTER
        </button>
      </div>
    </div>
  );
}

export default Toolbar;
