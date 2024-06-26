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
  const randomPosts = Array.isArray(data) ? getRandomPosts(data, 4) : [];

  return (
    <div>
      <div className="hero">hero section</div>
      <div className="home-random-posts d-flex flex-wrap gap-4 justify-content-center">
        {data === null || (Array.isArray(data) && data.length === 0) ? (
          <h1>LOADING...</h1>
        ) : (
          randomPosts.map((x) => (
            <HomeSinglePostComponent data={x} key={x.id} />
          ))
        )}
      </div>
      <div>a little bit info about this project</div>
    </div>
  );
}

export default HomePage;
