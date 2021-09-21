import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sortIt } from "./helpers/sort";
import { changeNull } from "./helpers/changeNull";

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
          searchField: "title",
        })
      );
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchFbi = createAsyncThunk(
  "table/getInit",
  async function (_, { rejectWithValue, dispatch }) {
    try {
      const response = await fetch(`https://api.fbi.gov/wanted/v1/list`);
      if (!response.ok) {
        throw new Error("Server Error");
      }
      const data = await response.json();
      console.log(data);
      const res = [];
      data.items.forEach((el) =>
        res.push({
          race: changeNull(el.race, "string"),
          hair: changeNull(el.hair, "string"),
          description: changeNull(el.description, "string"),
          details: changeNull(el.details, "string"),
        })
      );
      console.log(res);
      dispatch(
        getInitList({
          res: res,
          searchField: "description",
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
    prevField: "userId",
    searchField: "title",
    asc: true,
    errorMsg: null,
    loading: null,
  },
  reducers: {
    getInitList(state, action) {
      const { res, searchField } = action.payload;
      state.loading = false;
      state.searchField = searchField;
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
      } else {
        state.shownData = sortIt(shownData, true, field, fieldType);
        state.asc = true;
        state.prevField = field;
      }
    },
    getSearchField(state, action) {
      const { field } = action.payload;
      state.searchField = field;
    },
  },
  extraReducers: {
    [fetchTable.pending]: (state) => {
      state.loading = true;
      state.errorMsg = null;
    },
    [fetchTable.rejected]: (state, action) => {
      state.loading = false;
      state.errorMsg = action.payload;
    },
    [fetchFbi.pending]: (state) => {
      state.loading = true;
      state.errorMsg = null;
    },
    [fetchFbi.rejected]: (state, action) => {
      state.loading = false;
      state.errorMsg = action.payload;
    },
  },
});

const { getInitList } = tableSlice.actions;
export const { sortTable, getSearchField } = tableSlice.actions;
export default tableSlice.reducer;
