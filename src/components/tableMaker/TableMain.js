import { useState } from "react";
import { useSelector } from "react-redux";
import Pagination from "./pagination";
import SearchSelector from "./searchSelector";
import MakeTable from "./table";
import Loader from "../design/loader";
import "./TableMain.scss";

const TableMain = () => {
  const table = useSelector((state) => state.table.shownData);
  const { searchField, errorMsg } = useSelector((state) => state.table);
  const [search, getSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  if (errorMsg) return <p>{errorMsg}</p>;
  else if (!table)
    return (
      <div className="load__wrapper">
        <Loader />
      </div>
    );

  const getFilter = (e) => {
    getSearch(e.target.value);
    setCurrentPage(1);
  };

  const filtered = table
    ? table.filter((items) => {
        return items[searchField].indexOf(search) > -1;
      })
    : null;

  const lastPost = currentPage * itemsPerPage;
  const firstPost = lastPost - itemsPerPage;
  const currentPosts = filtered.slice(firstPost, lastPost);

  return (
    <div className="table__wrapper">
      <div className="selector__group">
        <label htmlFor="selector__search" className="selector__label">
          Select field and search!
        </label>
        <input
          placeholder="Type to search"
          className="selector__input input__gray__color"
          name="elector__search"
          value={search}
          onChange={getFilter}
        />
        <SearchSelector data={table} head={Object.keys(table[0])} />
      </div>

      <MakeTable data={currentPosts} />
      <Pagination
        perPage={itemsPerPage}
        totalItems={filtered.length}
        changePage={setCurrentPage}
        changePagValue={setItemsPerPage}
        currentPage={currentPage}
      />
    </div>
  );
};
export default TableMain;
