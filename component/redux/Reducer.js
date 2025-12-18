// component/redux/Reducer.js
import { ADD_TO_CART, REMOVE_FROM_CART } from "./Constants";

const initialState = []; // cart = array

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const exists = state.find(item => item.id === action.data.id);

      if (exists) {
        // agar item already cart me hai → quantity +1
        return state.map(item =>
          item.id === action.data.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // naya item → quantity = 1 se add
        return [...state, { ...action.data, quantity: 1 }];
      }
    }

    case REMOVE_FROM_CART:
      return state.filter(item => item.id !== action.data);

    case "INCREASE_QTY":
      return state.map(item =>
        item.id === action.data
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

    case "DECREASE_QTY":
      return state.map(item =>
        item.id === action.data && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );

    //
    case "CLEAR_CART":
      return [];
    //

    default:
      return state;
  }
};
