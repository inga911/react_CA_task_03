import { useEffect } from "react";
import mainStore from "../store/mainStore";
import CustomFunctions from "../plugin/Functions";
import HomeSinglePostComponent from "../components/HomeSinglePostComponent";

function HomePage() {
  const { data, setData } = mainStore((state) => ({
    data: state.data,
    setData: state.setData,
  }));
  const { getRandomPostsHome } = CustomFunctions();

  useEffect(() => {
    getRandomPostsHome();
  }, []);

  function getRandomPosts(posts, count) {
    const shuffled = [...posts].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
  const randomPosts = Array.isArray(data) ? getRandomPosts(data, 6) : [];

  return (
    <div className="home-page">
      <div className="hero"></div>
      <div className="home-random-posts d-flex flex-wrap gap-5 justify-content-center">
        {data === null || (Array.isArray(data) && data.length === 0) ? (
          <h1>LOADING...</h1>
        ) : (
          randomPosts.map((x) => (
            <HomeSinglePostComponent data={x} key={x.id} />
          ))
        )}
      </div>
      <div className="home-page-about">
        This project is designed to assess my proficiency with React.js by
        interacting with an API to retrieve data. Users can register, log in,
        create, edit, and delete posts. Additionally, users can browse posts
        from other authors, add them to their favorites list, and view all liked
        posts. Each user can view all posts by a specific author or a single
        post, which includes the description, creation date, author's name, and
        photo. A filtering feature allows users to find posts by username, post
        title, or date. Users who are not logged in can access the home page and
        all posts page to see all posts or posts from a specific author.
      </div>
    </div>
  );
}

export default HomePage;
