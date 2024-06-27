import { useEffect } from "react";
import CustomFunctions from "../plugin/Functions";
import mainStore from "../store/mainStore";

function Pagination({ pages }) {
  const { currentPage, setCurrentPage } = mainStore((state) => ({
    currentPage: state.currentPage,
    setCurrentPage: state.setCurrentPage,
  }));

  const { goToPage } = CustomFunctions();

  const handlePageClick = (page) => {
    setCurrentPage(page);
    goToPage(page);
  };

  useEffect(() => {
    goToPage(currentPage);
  }, [currentPage]);

  return (
    <div className="pagination">
      {Array.from(Array(pages).keys()).map((x) => (
        <div
          className={`pagination-button ${
            currentPage === x + 1 ? "active" : ""
          }`}
          onClick={() => handlePageClick(x + 1)}
          key={x}
        >
          {x + 1}
        </div>
      ))}
    </div>
  );
}
export default Pagination;
