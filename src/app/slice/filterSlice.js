import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  serchValue:'',
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: "популярности",
    sortProperty: "rating",
  }
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
	 setSerchValue(state, action) {
      state.serchValue = action.payload;
    },
    setSort(state, action) {
      state.sort.name = action.payload.name;
      state.sort = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
	 setFilters(state, action) {
		state.currentPage = Number(action.payload.currentPage);
		state.sort = action.payload.sortlist;
		state.categoryId = Number(action.payload.categoryId)
	 }
  },
});
export const { setCategoryId, setSort, setCurrentPage, setFilters, setSerchValue } = filterSlice.actions;

export default filterSlice.reducer;
