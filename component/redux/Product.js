import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "./Action";
import Icon from "react-native-vector-icons/Ionicons";

const Product = ({ item, navigation }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.reducer);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    dispatch(addToCart(item));
  };

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(item.id));
  };

  useEffect(() => {
    const found = cartItems.some((cartItem) => cartItem.id === item.id);
    setIsAdded(found);
  }, [cartItems, item.id]);

  return (
    <View style={styles.card}>
      <ImageBackground source={{ uri: item.image || item.thumbnail }} style={styles.image}>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>⭐ {item.rating}</Text>
        </View>
      </ImageBackground>
      <View style={styles.details}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.category}>{item.cuisine || "Uncategorized"}</Text>
        <View style={styles.row}>
          <Text style={styles.price}>Rs.{item.price || '19'}</Text>
          {isAdded ? (
            <TouchableOpacity style={styles.removeBtn} onPress={handleRemoveFromCart}>
              <Text style={styles.btnText}>Remove</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.addBtn} onPress={handleAddToCart}>
              <Text style={styles.btnText}>+ Add to Cart</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default Product;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#2a0000",
    borderRadius: 15,
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    paddingHorizontal:10
  },
  image: {
    width: "100%",
    height: 200,
    borderWidth: 1,
    bottom:8
  },
  ratingContainer: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 5,
    borderRadius: 5,
  },
  rating: {
    color: "#FFD700",
    fontSize: 14,
    fontWeight: "500",
  },
  details: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ecece7ff",
    marginBottom: 5,
  },
  category: {
    fontSize: 14,
    color: "#ecece7ff",
    fontStyle: "italic",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFD700",
  },
  addBtn: {
    backgroundColor: "#a4161a",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
  },
  removeBtn: {
    backgroundColor: "#a4161a",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FFD700",
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});