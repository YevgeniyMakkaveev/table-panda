import { useDispatch, useSelector } from "react-redux";
import { sortTable } from "../../../store/TableSlice";

const MakeTable = ({ data }) => {
  const dispatch = useDispatch();
  const { initialData } = useSelector((state) => state.table);
  const labels = Object.keys(initialData[0]);
  let labelId = 1000;

  const sortMe = (field, fieldType) => {
    dispatch(sortTable({ field: field, fieldType: fieldType }));
  };

  const content = data[0] ? (
    data.map((el) => (
      <tr key={el.id}>
        <td>{el.userId} </td>
        <td>{el.title}</td>
        <td>{el.body}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td>Nothing is found</td>
    </tr>
  );
  const head = labels
    .filter((item) => item !== "id")
    .map((el) => (
      <th
        onClick={() => {
          sortMe(el, typeof data[1][el]);
        }}
        key={labelId++}
      >
        {el}
      </th>
    ));

  return (
    <table>
      <thead>
        <tr>{head}</tr>
      </thead>
      <tbody>{content}</tbody>
    </table>
  );
};
export default MakeTable;
