import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sortIt } from "./helpers/sort";

export const fetchTable = createAsyncThunk(
  "table/getInit",
  async function (_, { rejectWithValue, dispatch }) {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts`
      );
      if (!response.ok) {
        throw new Error("Server Error");
      }
      const data = await response.json();

      dispatch(
        getInitList({
          res: data,
        })
      );
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const tableSlice = createSlice({
  name: "table",
  initialState: {
    initialData: null,
    shownData: null,
    prevField: null,
    asc: true,
    error: null,
    loading: null,
  },
  reducers: {
    getInitList(state, action) {
      const { res } = action.payload;
      state.loading = false;
      state.initialData = res;
      state.shownData = res;
    },
    sortTable(state, action) {
      const { field, fieldType } = action.payload;
      const { shownData, asc, prevField } = state;
      if (field === prevField) {
        const order = !asc;
        state.shownData = sortIt(shownData, order, field, fieldType);
        state.asc = order;
        console.log(state.shownData);
      } else {
        state.shownData = sortIt(shownData, true, field, fieldType);
        state.asc = true;
        state.prevField = field;
        console.log(state.shownData);
      }
    },
  },
  extraReducers: {
    [fetchTable.pending]: (state) => {
      state.loading = true;
      state.errorMsg = null;
    },
  },
});

const { getInitList } = tableSlice.actions;
export const { sortTable } = tableSlice.actions;
export default tableSlice.reducer;
