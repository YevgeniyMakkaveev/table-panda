const Pagination = ({
  perPage,
  totalItems,
  changePage,
  changePagValue,
  currentPage,
}) => {
  const pageNumbers = [];
  const values = [5, 10, 20, 30, 50];
  for (let i = 1; i <= Math.ceil(totalItems / perPage); i++) {
    pageNumbers.push(i);
  }

  const isActive = (value) => {
    if (value === currentPage) {
      return "active__pagination";
    } else return "idle__pagination";
  };
  return (
    <nav className="paginator__wrapper">
      <select
        name="paginationStep"
        className="pagination__select pagination__color"
      >
        {values.map((value) => (
          <option
            key={`${value}+pageSelector`}
            value={value}
            onClick={() => changePagValue(value)}
          >
            {value}
          </option>
        ))}
      </select>
      {pageNumbers.map((number) => (
        <button
          className={`pagination__button pagination__color ${isActive(number)}`}
          key={number}
          onClick={() => changePage(number)}
        >
          {number}
        </button>
      ))}
    </nav>
  );
};
export default Pagination;
