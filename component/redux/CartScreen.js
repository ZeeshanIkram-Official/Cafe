import React from "react";
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, increaseQty, decreaseQty } from "./Action";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const CartScreen = ({ navigation }) => {
  const cart = useSelector((state) => state.reducer);
  const dispatch = useDispatch();

  const gstRate = 0.04;

  const subtotal = cart.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);
  const tax = Math.round(subtotal * gstRate);
  const delivery = Math.round(50);
  const total = subtotal + tax + delivery;

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image style={styles.image} source={{ uri: item.image }} />
      <View style={styles.info}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={styles.text}>{item.name}</Text>
          <TouchableOpacity
            style={styles.removeBtn}
            onPress={() => dispatch(removeFromCart(item.id))}
          >
            <Icon name="trash-can-outline" size={22} color="#ff4444" />
          </TouchableOpacity>
        </View>
        <Text style={styles.priceText}>Rs {(item.price * item.quantity)}</Text>
        <View style={styles.counterRow}>
          <TouchableOpacity
            style={styles.counterBtn}
            onPress={() => dispatch(decreaseQty(item.id))}
          >
            <Text style={styles.counterText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.qtyText}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.counterBtn}
            onPress={() => dispatch(increaseQty(item.id))}
          >
            <Text style={styles.counterText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={20} color="#fff" style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>My Cart</Text>
      </View>
      {cart.length === 0 ? (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIcon}>
            <Icon name="cart-outline" size={50} color="#ccc" />
          </View>
          <Text style={styles.emptyText}>Your cart is empty</Text>
          <Text style={styles.emptySubText}>Add some delicious items to get started</Text>
          <TouchableOpacity style={styles.browseButton} onPress={() => navigation.replace('ProductWrapper')}>
            <Text style={styles.browseText}>Browse Menu</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 250 }}
          />
          <View style={styles.footer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>Sub total</Text>
              <Text style={styles.summaryValue}>Rs {subtotal}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>GST ({(gstRate * 100)}%)</Text>
              <Text style={styles.summaryValue}>Rs {tax}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>Delivery</Text>
              <Text style={styles.summaryValue}>Rs {delivery}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalText}>Total</Text>
              <Text style={styles.totalValue}>Rs {total}</Text>
            </View>
            <TouchableOpacity
              style={styles.checkoutBtn}
              onPress={() =>
                navigation.replace('ReceiptScreen', {
                  cart,
                  subtotal,
                  tax,
                  delivery,
                  total,
                })
              }
            >
              <Text style={styles.checkoutText}>Proceed to Checkout</Text>
            </TouchableOpacity>

          </View>
        </>
      )}
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1a1a1a" },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#a4161a',
    padding: 15,
    elevation: 5,
  },
  backIcon: { marginRight: 10 },
  headerText: { fontSize: 20, color: '#fff', fontWeight: 'bold' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyIcon: {
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  emptyText: { fontSize: 20, color: "#ccc", textAlign: "center", marginBottom: 10 },
  emptySubText: { fontSize: 16, color: "#ccc", textAlign: "center", marginBottom: 20 },
  browseButton: {
    backgroundColor: '#a4161a',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  browseText: { fontSize: 16, color: '#fff', fontWeight: 'bold' },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2d2d2d",
    borderRadius: 15,
    padding: 12,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 10,
  },
  image: { height: 80, width: 80, borderRadius: 10, borderWidth: 1, borderColor: "#FFD700" },
  info: { flex: 1, marginLeft: 12 },
  text: { fontSize: 18, color: "#fff", fontWeight: "600" },
  priceText: { fontSize: 18, color: "#FFD700", fontWeight: "700", marginVertical: 5 },
  counterRow: { flexDirection: "row", alignItems: 'center', marginTop: 8 },
  counterBtn: {
    backgroundColor: "#a4161a",
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  counterText: { fontSize: 20, color: "#fff", fontWeight: "bold" },
  qtyText: { fontSize: 18, color: "#fff", fontWeight: "600", marginHorizontal: 10 },
  removeBtn: { padding: 6 },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: "#2d2d2d",
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    top: 10,
  },
  summaryText: { fontSize: 16, color: "#ccc" },
  summaryValue: { fontSize: 16, color: "#ccc" },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    borderTopWidth: 1,
    borderColor: "#ccc",
    paddingTop: 10,
  },
  totalText: { fontSize: 18, color: "#fff", fontWeight: "700" },
  totalValue: { fontSize: 18, color: "#FFD700", fontWeight: "700" },
  checkoutBtn: {
    backgroundColor: '#a4161a',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  checkoutText: { fontSize: 18, color: '#fff', fontWeight: 'bold' },
});
