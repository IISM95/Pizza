import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  status:'loading'
};

export const fetchPizzas = createAsyncThunk(
  "pizza/fetch",
  async (params) => {
	const {order,sortBy,category,search,currentPage}=params
  
		const {data} = await axios.get(
			`https://63fa6b3d897af748dcced24c.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
		 );
      return data;
  }
);

const pizzaSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
	[fetchPizzas.fulfilled]: (state, action) => {
		state.items = action.payload;
		state.status = "success";
	},
	[fetchPizzas.pending]: (state) => {
		state.status="loading"
		state.items= []
	},
	[fetchPizzas.rejected]: (state, action) => {
		state.status = "error";
		state.items= []
	},
  }
});
export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
