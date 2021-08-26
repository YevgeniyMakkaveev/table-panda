import { useDispatch } from "react-redux";
import { getSearchField } from "../../../store/TableSlice";

const SearchSelector = ({ data, head }) => {
  const dispath = useDispatch();
  const fields = [];
  head.forEach((el) => {
    if (typeof data[0][el] === "string") {
      fields.push(el);
    }
  });
  const getParam = (value) => {
    dispath(getSearchField({ field: value }));
  };

  return (
    <select className="selector__search__control input__gray__color">
      {fields.map((value) => (
        <option
          key={`${value}+searchSelect`}
          value={value}
          onClick={() => getParam(value)}
        >
          {value}
        </option>
      ))}
    </select>
  );
};
export default SearchSelector;
