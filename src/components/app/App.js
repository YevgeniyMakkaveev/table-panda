import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchTable } from "../../store/TableSlice";
import TableMaker from "../tableMaker";
import Head from "../head";
import "./App.scss";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTable());
  }, [dispatch]);
  return (
    <div className="App">
      <Head />
      <TableMaker />
    </div>
  );
}

export default App;
