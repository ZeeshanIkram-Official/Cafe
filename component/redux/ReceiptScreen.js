import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { clearCart } from './Action';

const ReceiptScreen = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { cart, subtotal, tax, delivery, total } = route.params;

  useEffect(() => {
    // Clear the cart when this screen is loaded
    dispatch(clearCart());
  }, []);

  const orderId = Math.floor(Math.random() * 1000000);

  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  const onlyDate = date + '   ' + time;

  const renderItem = ({ item }) => (
    <View style={styles.itemRow}>
      <Text style={styles.itemLeft}>
        {item.name} x{item.quantity}
      </Text>
      <Text style={styles.itemRight}>
        Rs {item.price * item.quantity}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Icon name="check-circle" size={60} color="#2ecc71" />
        <Text style={styles.title}>Order Successful</Text>
        <Text style={styles.subTitle}>Thank you for your order</Text>
      </View>

      {/* Receipt Card */}
      <View style={styles.card}>

        <View style={styles.row}>
          <Text style={styles.label}>Order ID</Text>
          <Text style={styles.value}>#{orderId}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Date</Text>
          <Text style={styles.value}>{onlyDate}</Text>
        </View>

        <View style={styles.divider} />

        <FlatList
          data={cart}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          scrollEnabled={false}
        />

        <View style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.label}>Sub total</Text>
          <Text style={styles.value}>Rs {subtotal}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>GST</Text>
          <Text style={styles.value}>Rs {tax}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Delivery</Text>
          <Text style={styles.value}>Rs {delivery}</Text>
        </View>

        <View style={styles.totalRow}>
          <Text style={styles.totalText}>Total Paid</Text>
          <Text style={styles.totalText}>Rs {total}</Text>
        </View>

      </View>

      {/* Go To Home Button */}
      <TouchableOpacity
        style={styles.homeBtn}
        onPress={() => navigation.replace('ProductWrapper')}
      >
        <Text style={styles.homeBtnText}>Go to Home</Text>
      </TouchableOpacity>

    </View>
  );
};

export default ReceiptScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  subTitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  label: {
    fontSize: 14,
    color: '#555',
  },
  value: {
    fontSize: 14,
    fontWeight: '500',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  itemLeft: {
    fontSize: 14,
    color: '#333',
  },
  itemRight: {
    fontSize: 14,
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 10,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  homeBtn: {
    marginTop: 20,
    backgroundColor: '#2ecc71',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  homeBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
