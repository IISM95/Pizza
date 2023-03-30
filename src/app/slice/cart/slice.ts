import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { calcTotalPrice } from "../../../utils/calcTotalPrice";
import { getCartFromLS } from "../../../utils/getCartFromLS";
import { CartItem, CartSliceState } from "./types";




//26 видео
const cartData = getCartFromLS();

const initialState: CartSliceState = {
 totalPrice:cartData.totalPrice,
 items:cartData.items
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
// добавляет если уже находит то добавляет на 1 если не находит то создает еще ключ сount
	addItem(state, action: PayloadAction<CartItem>){
		const findItem = state.items.find(item => item.id === action.payload.id)
		if(findItem){
			findItem.count ++
		} else {
			state.items.push({
				...action.payload,
				count:1
			})
		}
			state.totalPrice = calcTotalPrice(state.items)
	},

	minusItem(state, action:PayloadAction<string>){
		const findItem = state.items.find(item => item.id === action.payload)
		if(findItem){
			findItem.count --
		}
	},
	 removeItem(state, action:PayloadAction<string>){
		state.items = state.items.filter((obj)=>obj.id !== action.payload)
	 },
	 clearItems(state) {
		state.items = [];
		state.totalPrice = 0
	 },
  },
});




export const {addItem, removeItem, clearItems,minusItem} = cartSlice.actions;

export default cartSlice.reducer;