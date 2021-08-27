import { useDispatch, useSelector } from "react-redux";
import { sortTable } from "../../../store/TableSlice";

const MakeTable = ({ data }) => {
  const dispatch = useDispatch();
  const { initialData } = useSelector((state) => state.table);
  const labels = Object.keys(initialData[0]);
  const fieldMap = labels.filter((el) => {
    return el !== "id";
  });

  let labelId = 1;
  let innerId = 1;

  const sortMe = (field, fieldType) => {
    dispatch(sortTable({ field: field, fieldType: fieldType }));
  };
  const makeRow = (head, body) => {
    return head.map((label) => (
      <td key={`${innerId++}+rowInner`}>{body[label]}</td>
    ));
  };

  const content = data[0] ? (
    data.map((el) => <tr key={`${el.id}+rowOuter`}>{makeRow(fieldMap, el)}</tr>)
  ) : (
    <tr className="table__nothing">Nothing is found</tr>
  );

  const head = labels
    .filter((item) => item !== "id")
    .map((el) => (
      <th
        onClick={() => {
          sortMe(el, typeof initialData[1][el]);
        }}
        key={`${labelId++}+tableHead`}
      >
        {el}
      </th>
    ));

  return (
    <table className="main__table table__color">
      <thead>
        <tr>{head}</tr>
      </thead>
      <tbody>{content}</tbody>
    </table>
  );
};
export default MakeTable;
