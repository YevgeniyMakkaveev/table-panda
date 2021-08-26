import "./App.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchTable } from "../../store/TableSlice";
import TableMaker from "../tableMaker";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTable());
  }, [dispatch]);
  return (
    <div className="App">
      <TableMaker />
    </div>
  );
}

export default App;
