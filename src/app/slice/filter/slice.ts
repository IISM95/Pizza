import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterSliceState, SortPropertyEnum } from "./types";




const initialState: FilterSliceState = {
  serchValue:'',
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: "популярности",
    sortProperty: SortPropertyEnum.RATING_DESC
  }
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoryId(state, action:PayloadAction<number>) {
      state.categoryId = action.payload;
    },
	 setSerchValue(state, action:PayloadAction<string>) {
      state.serchValue = action.payload;
    },
	
    setSort(state, action) {
      state.sort.name = action.payload.name;
      state.sort = action.payload;
    },
    setCurrentPage(state, action:PayloadAction<number>) {
      state.currentPage = action.payload;
    },
	
	 setFilters(state, action) {
		state.currentPage = Number(action.payload.currentPage);
		state.sort = action.payload.sort;
		state.categoryId = Number(action.payload.categoryId)
	 }
  },
});
export const { setCategoryId, setSort, setCurrentPage, setFilters, setSerchValue } = filterSlice.actions;

export default filterSlice.reducer;
