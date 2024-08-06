import { createSlice } from '@reduxjs/toolkit'

const initialState = JSON.parse(localStorage.getItem('cart')) ?? [];
console.log(initialState);

export const Cartslice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            state.push(action.payload)
        },
        deleteFromCart(state, action) {
            return state.filter(item => item.id != action.payload.id);
        }
       
       
    },
})

// Action creators are generated for each case reducer function
export const { addToCart, deleteFromCart } = Cartslice.actions

export default Cartslice.reducer