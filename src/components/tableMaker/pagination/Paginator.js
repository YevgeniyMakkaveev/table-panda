const Pagination = ({ perPage, totalItems, changePage, changeValue }) => {
  const pageNumbers = [];
  const values = [5, 10, 20, 30, 50];
  for (let i = 1; i <= Math.ceil(totalItems / perPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav style={{ display: "inline" }}>
      <select name="pets" id="pet-select">
        {values.map((value) => (
          <option
            key={`${value}+page`}
            value={value}
            onClick={() => changeValue(value)}
          >
            {value}
          </option>
        ))}
      </select>
      {pageNumbers.map((number) => (
        <button key={number} onClick={() => changePage(number)}>
          {number}
        </button>
      ))}
    </nav>
  );
};
export default Pagination;
