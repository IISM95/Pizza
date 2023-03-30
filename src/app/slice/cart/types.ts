
export type CartItem = {
	id:string;
	title:string;
	price:number;
	count: number;
	type:string;
	imageUrl:string;
	size:number
}

export interface CartSliceState {
	totalPrice: number;
	items: CartItem[]
}