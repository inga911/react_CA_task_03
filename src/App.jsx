import { Route, Routes } from "react-router-dom";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Toolbar from "./components/Toolbar";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import FavoritesPage from "./pages/FavoritesPage";
import AllPostsPage from "./pages/AllPostsPage";
import AllUserPostsPage from "./pages/AllUserPostsPage";
import SinglePostPage from "./pages/SinglePostPage";
import CreatePostPage from "./pages/CreatePostPage";
import UpdatePostPage from "./pages/UpdatePostPage";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Toolbar />
      <Routes>
        <Route element={<HomePage />} path="/" />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<RegisterPage />} path="/createAccount" />
        <Route element={<FavoritesPage />} path="/favoritesPosts" />
        <Route element={<AllPostsPage />} path="/getAllPosts" />
        <Route element={<AllUserPostsPage />} path="/getUserPosts/:username" />
        <Route
          element={<SinglePostPage />}
          path="/getSinglePost/:username/:id"
        />

        <Route element={<CreatePostPage />} path="/createPost" />
        <Route element={<UpdatePostPage />} path="/updatePost" />
        <Route element={<UpdatePostPage />} path="/deletePost" />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
