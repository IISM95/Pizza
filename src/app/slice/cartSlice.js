import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 totalPrice:0,
 items:[]
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
// добавляет если уже находит то добавляет на 1 если не находит то создает еще ключ сount
	addItem(state, action){
		const findItem = state.items.find(item => item.id === action.payload.id)
		if(findItem){
			findItem.count ++
		} else {
			state.items.push({
				...action.payload,
				count:1
			})
		}
			state.totalPrice = state.items.reduce((acc, item) => {
        return (item.price * item.count) + acc;
      }, 0);
	},

	minusItem(state, action){
		const findItem = state.items.find(item => item.id === action.payload)
		if(findItem){
			findItem.count --
		}
	},
	 removeItem(state, action){
		state.items = state.items.filter((obj)=>obj.id !== action.payload)
	 },
	 clearItems(state) {
		state.items = [];
		state.totalPrice = 0
	 },
  },
});


//cелектор 
export const selectCart =(state)=> state.cartSlice
export const selectCartItemById =(id)=> (state) =>state.cartSlice.items.find((item) => item.id === id)

export const {addItem, removeItem, clearItems,minusItem} = cartSlice.actions;

export default cartSlice.reducer;