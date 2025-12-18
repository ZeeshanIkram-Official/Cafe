import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator, Text, TouchableOpacity } from "react-native";
import Product from "./Product";
import axios from "axios";
import Icon from "react-native-vector-icons/Ionicons";

const ProductWrapper = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/recipes");

        const updatedProducts = response.data.recipes.map((item, index) => {
          const prices = [
            2087, 1124, 810, 500, 900, 150, 300, 1720, 980, 4100, 700,
            6000, 1000, 500, 600, 500, 400, 800, 300, 4000, 2000,
            200, 400, 2500, 250, 200, 400, 250, 700, 200,
          ];
          return { ...item, price: prices[index] || 300 };
        });

        setProducts(updatedProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="orange" />
        <Text>Loading Products...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={styles.iconBackground}>
              <Icon name="arrow-back" size={22} color="#fff" />
            </View>
          </TouchableOpacity>
          <Text style={{ fontSize: 22, fontWeight: '600', color: 'white', marginTop: 35, marginLeft: 70 }}>Our Menu</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10 }}>
          <View style={styles.categoryButton}>
            <Text style={styles.categoryText}>All</Text>
          </View>
          <View style={styles.categoryButton}>
            <Text style={styles.categoryText}>Breakfast</Text>
          </View>
          <View style={styles.categoryButton}>
            <Text style={styles.categoryText}>Lunch</Text>
          </View>
          <View style={styles.categoryButton}>
            <Text style={styles.categoryText}>Dinner</Text>
          </View>
        </View>

      </View>
      <FlatList
        data={products}
        renderItem={({ item }) => <Product item={item} navigation={navigation} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default ProductWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "black",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    backgroundColor: 'rgba(133, 0, 0, 1)',
    marginBottom: 10,
    height: 200,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  iconBackground: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    marginTop: 30,
  },
  categoryButton: {
    width: 70,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30
  },
  categoryText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});
