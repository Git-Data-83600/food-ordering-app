import { createSlice } from '@reduxjs/toolkit'

let items = []

if (sessionStorage.getItem('cart')) {
  items = JSON.parse(sessionStorage.getItem('cart'))
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items,
  },
  reducers: {
    addToCartAction: (state, { payload }) => {
      // check if the product is already present in the cart
      if (state.items.findIndex((item) => item.id == payload.id) == -1) {
        // the item does not exist in the cart
        // push the item to the items list
        state.items.push({ ...payload, quantity: 1 })
      }

      // update the session storage
      sessionStorage.setItem('cart', JSON.stringify(state.items))
    },
    removeFromCartAction: (state, { payload }) => {
      const { id } = payload

      // find the product which matches with the id
      const index = state.items.findIndex((item) => item.id == id)
      if (index > -1) {
        state.items.splice(index, 1)
      }

      // update the session storage
      sessionStorage.setItem('cart', JSON.stringify(state.items))
    },
    updateQuantityAction: (state, { payload }) => {
      const { id, quantity } = payload

      // find the product which matches with the id
      const index = state.items.findIndex((item) => item.id == id)
      state.items[index].quantity += quantity

      // update the session storage
      sessionStorage.setItem('cart', JSON.stringify(state.items))
    },
    clearAction: (state) => {
      // clear the cart
      state.items = []

      // update the session storage
      sessionStorage.setItem('cart', JSON.stringify(state.items))
    },
  },
})

export const {
  addToCartAction,
  removeFromCartAction,
  updateQuantityAction,
  clearAction,
} = cartSlice.actions
export default cartSlice.reducer
