import { useState } from "react";
import CustomFunctions from "../plugin/Functions";

function FilterComponent({ filter }) {
  const { setIsFilterActive } = CustomFunctions();

  const [findUsername, setFindUsername] = useState("");
  const [findTitle, setFindTitle] = useState("");
  const [findDateFrom, setFindDateFrom] = useState("");
  const [findDateTo, setFindDateTo] = useState("");

  function handleFilter() {
    filter({
      findUsername,
      findTitle,
      findDateFrom,
      findDateTo,
    });
  }

  function handleClearFilter() {
    setFindUsername("");
    setFindTitle("");
    setFindDateFrom("");
    setFindDateTo("");
    filter({});
    setIsFilterActive(false);
  }

  return (
    <div className="filter-box d-flex flex-column gap-5">
      <div className="search-inputs  d-flex justify-content-around">
        <div className="filter-input-box text-center">
          <div>Find by username:</div>
          <input
            type="text"
            value={findUsername}
            onChange={(e) => setFindUsername(e.target.value)}
          />
        </div>
        <div className="filter-input-box text-center">
          <div>Find by title:</div>
          <input
            type="text"
            value={findTitle}
            onChange={(e) => setFindTitle(e.target.value)}
          />
        </div>
        <div className="filter-input-box text-center ">
          <div>Find by date:</div>
          <div className="dates-inputs d-flex gap-3">
            <input
              type="date"
              placeholder="from"
              value={findDateFrom}
              onChange={(e) => setFindDateFrom(e.target.value)}
            />
            <input
              type="date"
              placeholder="to"
              value={findDateTo}
              onChange={(e) => setFindDateTo(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="filter-buttons d-flex justify-content-center gap-5">
        <button className="filter-btn" onClick={handleFilter}>
          search
        </button>
        <button className="filter-btn" onClick={handleClearFilter}>
          Clear filter
        </button>
      </div>
    </div>
  );
}

export default FilterComponent;
