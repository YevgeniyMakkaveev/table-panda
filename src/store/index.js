import { configureStore } from "@reduxjs/toolkit";
import tableSlice from "./TableSlice";

export default configureStore({
  reducer: { table: tableSlice },
});
