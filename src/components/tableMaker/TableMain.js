import { useState } from "react";
import { useSelector } from "react-redux";
import Pagination from "./pagination";
import MakeTable from "./table";

const TableMain = () => {
  const table = useSelector((state) => state.table.shownData);
  const [search, getSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  if (!table) return <></>;

  const getFilter = (e) => {
    getSearch(e.target.value);
    console.log(search);
    setCurrentPage(1);
  };

  const filtered = table
    ? table.filter((items) => {
        return items.body.indexOf(search) > -1;
      })
    : null;

  const lastPost = currentPage * itemsPerPage;
  const firstPost = lastPost - itemsPerPage;
  const currentPosts = filtered.slice(firstPost, lastPost);

  return (
    <div>
      <input value={search} onChange={getFilter} />
      <MakeTable data={currentPosts} />
      <Pagination
        perPage={itemsPerPage}
        totalItems={filtered.length}
        changePage={setCurrentPage}
        changeValue={setItemsPerPage}
      />
    </div>
  );
};
export default TableMain;
