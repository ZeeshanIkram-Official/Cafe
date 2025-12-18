export const addToCart = (item) => {
  return {
    type: "ADD_TO_CART",
    data: item,
  };
};

export const removeFromCart = (id) => {
  return {
    type: "REMOVE_FROM_CART",
    data: id,  // ✅ pass id
  };
};

export const increaseQty = (id) => ({
  type: "INCREASE_QTY",
  data: id,
});

export const decreaseQty = (id) => ({
  type: "DECREASE_QTY",
  data: id,
});

//
export const clearCart = () => ({
  type: "CLEAR_CART",
});
//