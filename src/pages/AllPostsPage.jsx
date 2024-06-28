import { useEffect } from "react";
import SinglePostComponent from "../components/SinglePostComponent";
import mainStore from "../store/mainStore";
import CustomFunctions from "../plugin/Functions";
import Pagination from "../components/Pagination";
import FilterComponent from "../components/FilterComponent";
import http from "../plugin/http";

function AllPostsPage() {
  const {
    data,
    pages,
    foundPostCount,
    currentPage,
    setCurrentPage,
    logged,
    setItems,
    items,
  } = mainStore((state) => ({
    data: state.data,
    pages: state.pages,
    foundPostCount: state.foundPostCount,
    currentPage: state.currentPage,
    setCurrentPage: state.setCurrentPage,
    logged: state.logged,
    setItems: state.setItems,
    items: state.items,
  }));

  const { getPosts, isFilterActive, handleFilter } = CustomFunctions();

  useEffect(() => {
    http.get("/getAllPosts").then((res) => {
      if (Array.isArray(res.data)) {
        const allPosts = res.data.reverse();
        setItems(allPosts);
      } else {
        setItems([]);
      }
    });
    getPosts(currentPage);
  }, [currentPage, setItems]);

  return (
    <div className="found-posts">
      {logged && (
        <div>
          <FilterComponent filter={handleFilter} />
        </div>
      )}
      {isFilterActive ? (
        foundPostCount > 0 ? (
          <>
            <div className="text-center mt-4">
              Was found {foundPostCount} post(s)
            </div>
          </>
        ) : (
          <>
            <div>Sorry, nothing was found.</div>
          </>
        )
      ) : (
        ""
      )}
      <div className="all-posts d-flex flex-wrap gap-5 justify-content-center">
        {Array.isArray(data) &&
          data.map((x) => (
            <SinglePostComponent
              getPosts={() => getPosts(currentPage)}
              data={x}
              key={x.id}
              context="allPosts"
            />
          ))}
      </div>

      {!isFilterActive && (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pages={pages}
        />
      )}
    </div>
  );
}

export default AllPostsPage;
