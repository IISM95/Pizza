import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

type Pizza = {
	id:string;
	title:string;
	price:number;
	count: number;
	types:number[];
	imageUrl:string;
	sizes:number[]
};

export enum Status {    
	LOADING = "loading",
	SUCCES = "succes",
	ERROR = "error"
};

interface PizzaSliceState {
	items:Pizza[],
	status: Status
}

const initialState:PizzaSliceState = {
  items: [],
  status: Status.LOADING
};

export type SearchPizzaParams = {
	order:string,sortBy:string,category:string,search:string,currentPage:string
}

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  "pizza/fetch",
  async (params) => {
	const {order,sortBy,category,search,currentPage}=params
  
		const {data} = await axios.get<Pizza[]>(
			`https://63fa6b3d897af748dcced24c.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
		 );
      return data;
  },

);

const pizzaSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setItems(state, action:PayloadAction<Pizza[]>) {
      state.items = action.payload;
    }
  },
  extraReducers: (builder) =>{
	builder.addCase(fetchPizzas.pending, (state) =>{
	state.status=Status.LOADING
	state.items= []
	})
	builder.addCase(fetchPizzas.fulfilled, (state,action) =>{
	state.items = action.payload;
	state.status = Status.SUCCES;
	})
	builder.addCase(fetchPizzas.rejected, (state,action) =>{
	state.status = Status.ERROR;
	state.items= []
	})
 } 
});
export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
