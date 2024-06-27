import { useEffect, useState } from "react";
import SinglePostComponent from "../components/SinglePostComponent";
import mainStore from "../store/mainStore";
import CustomFunctions from "../plugin/Functions";
import Pagination from "../components/Pagination";

function AllPostsPage() {
  const { data, pages, setData } = mainStore((state) => ({
    data: state.data,
    setData: state.setData,
    pages: state.pages,
  }));

  const { getPosts } = CustomFunctions();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getPosts(currentPage);
  }, [currentPage]);

  return (
    <div className="">
      <div className="all-posts d-flex flex-wrap gap-5 mt-5 justify-content-center">
        {Array.isArray(data) && data.length === 0 ? (
          <h1>LOADING...</h1>
        ) : (
          Array.isArray(data) &&
          data.map((x) => (
            <SinglePostComponent
              getPosts={getPosts}
              data={x}
              key={x.id}
              context="allPosts"
            />
          ))
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pages={pages}
      />
    </div>
  );
}

export default AllPostsPage;
