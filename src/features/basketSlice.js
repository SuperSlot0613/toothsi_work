import { createSlice } from "@reduxjs/toolkit";

export const basketSlice = createSlice({
  name: "basket",
  initialState: {
    basket: [],
  },

  reducers: {
    ADD_TO_BASKET: (state, action) => {
      let zIndex = state.basket.findIndex(
        (basketItem) => basketItem.id == action.payload.id
      );
      let updatedCartList = [...state.basket];
      if (zIndex >= 0) {
        console.log(zIndex);
        updatedCartList[zIndex].quantity += 1;
      } else {
        updatedCartList = updatedCartList.concat(action.payload);
        return {
          ...state,
          basket: updatedCartList,
        };
      }
    },
    EMPTY_BASKET: (state) => {
      return {
        ...state,
        basket: [],
      };
    },
    REMOVE_FROM_BASKET: (state, action) => {
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.payload
      );
      let newBasket = [...state.basket];

      if (index >= 0) {
        newBasket.splice(index, 1); //Cut the same index to the newBasket by one
      } else {
        console.warn(
          `Cant remove product (id: ${action.payload}) as its not in
              basket`
        );
      }
      return {
        ...state,
        basket: newBasket,
      };
    },
    INCREASE_ITEM_QUANTITY: (state, action) => {
      let updatedCartList = [...state.basket];
      let index = updatedCartList.findIndex(
        (object) => object.id === action.payload
      );
      updatedCartList[index].quantity =
        Number(updatedCartList[index].quantity) + Number(1);
    },
    DECREASE_ITEM_QUANTITY: (state, action) => {
      let updatedCartList = [...state.basket];
      let index = updatedCartList.findIndex(
        (object) => object.id === action.payload
      );
      let quantity = updatedCartList[index].quantity;
      if (quantity > 1) {
        updatedCartList[index].quantity -= 1;
      } else {
        return {
          ...state,
          basket: updatedCartList,
        };
      }
    },
  },
});

export const {
  ADD_TO_BASKET,
  EMPTY_BASKET,
  REMOVE_FROM_BASKET,
  INCREASE_ITEM_QUANTITY,
  DECREASE_ITEM_QUANTITY,
} = basketSlice.actions;

export const selectBasket = (state) => state.basket.basket;

export const getBasketTotal = (basket) => {
  let total = 0;
  for (let index = 0; index < basket.length; index++) {
    let productPrice = basket[index].price;
    let quantity = basket[index].quantity;
    total = total + productPrice * quantity;
  }
  return total;
};

export default basketSlice.reducer;
