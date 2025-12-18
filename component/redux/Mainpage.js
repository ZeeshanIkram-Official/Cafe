import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "./Action";
import Header from "./Header";

const Mainpage = ({ navigation }) => {
  const [recipes, setRecipes] = useState([]);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.reducer);

  useEffect(() => {
    fetch('https://dummyjson.com/recipes')
      .then((res) => res.json())
      .then((data) => {
        const updatedRecipes = data.recipes.slice(0, 2).map((item, index) => {
          if (index === 0) {
            return { ...item, price: 2087 };
          } else if (index === 1) {
            return { ...item, price: 1124 };
          }
          return item;
        });
        setRecipes(updatedRecipes);
      })
      .catch((err) => console.error(err));
  }, []);

  const renderRecipe = ({ item }) => {
    const isAdded = cartItems.some((cartItem) => cartItem.id === item.id);

    return (
      <View style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.details}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.category}>{item.cuisine || "Uncategorized"}</Text>
          <View style={styles.row}>
            <Text style={styles.price}>Rs. {item.price || 19}</Text>
            {isAdded ? (
              <TouchableOpacity
                style={styles.removeBtn}
                onPress={() => dispatch(removeFromCart(item.id))}activeOpacity={0.85}
              >
                <Text style={styles.btnText}>Remove</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.addBtn}
                onPress={() => dispatch(addToCart(item))}activeOpacity={0.85}
              >
                <Text style={styles.btnText}>+ Add</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>
          Welcome To{'\n'}
          <Text style={styles.brand}>Cafe Janoshe</Text>
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("CartScreen")}>
          <View style={styles.iconBackground}>
            <View style={{ right: 8 }}>
              <Header />
            </View>
           <Text style={[styles.icon, { marginBottom: 10 }]}>🛒</Text>

          </View>
        </TouchableOpacity>
      </View>
      <View style={{ alignSelf: 'center', width: '90%' }}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={() => navigation.navigate('ProductWrapper')}activeOpacity={0.85}>
            <View style={styles.box}>
              <Text style={styles.icon}>🍳</Text>
              <Text style={styles.categoryText}>Breakfast</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ProductWrapper')}activeOpacity={0.85}>
            <View style={styles.box}>
              <Text style={styles.icon}>🍔</Text>
              <Text style={styles.categoryText}>Lunch</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ProductWrapper')}activeOpacity={0.85}>
            <View style={styles.box}>
              <Text style={styles.icon}>🍽️</Text>
              <Text style={styles.categoryText}>Dinner</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => navigation.navigate('ProductWrapper')}activeOpacity={0.85}>
            <View style={styles.box2}>
              <Text style={styles.icon}>🍰</Text>
              <Text style={styles.categoryText}>Dessert</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ProductWrapper')}activeOpacity={0.85}>
            <View style={styles.box1}>
              <Text style={styles.icon}>☕</Text>
              <Text style={styles.categoryText}>Beverages</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

        <Text style={[styles.sectionTitle, {marginLeft:15}]}>Featured Recipes</Text>

      <FlatList
        data={recipes}
        renderItem={renderRecipe}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      />

      <View style={styles.infoContainer}>
        <View style={styles.infoBox}>
          <Text style={styles.infoIcon}>⏰</Text>
          <Text style={styles.infoText}>Avg Delivery {'\n\t\t'} 30 min</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoIcon}>⭐</Text>
          <Text style={styles.infoText}>Rating {'\n'} 4.8/5</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black' },
  header: {
    backgroundColor: 'rgba(133, 0, 0, 1)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    height: 150,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  welcomeText: {
    marginTop: 40,
    marginLeft: 30,
    fontSize: 15,
    color: 'rgba(212, 175, 55, 1)',
  },
  brand: { fontWeight: 'bold', fontSize: 25, color: 'white' },
  iconBackground: {
    width: 45,
    height: 45,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    marginTop: 40,
    marginRight: 10,
  },
  icon: { fontSize: 25, color: '#fff', textAlign: 'center' },
  box: {
    backgroundColor: 'rgba(133, 0, 0, 1)',
    height: 85,
    width: 95,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box2: {
    backgroundColor: 'rgba(133, 0, 0, 1)',
    height: 85,
    width: 95,
    borderRadius: 10,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box1: {
    backgroundColor: 'rgba(133, 0, 0, 1)',
    height: 85,
    width: 95,
    borderRadius: 10,
    marginTop: 10,
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 5,
    textAlign: 'center',

  },
 
  sectionTitle: { color: '#fff', fontSize: 18, marginBottom: 10, },
  seeAll: { color: 'rgba(212, 175, 55, 1)' },
  card: {
    backgroundColor: '#2a0000',
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: { width: 70, height: 70, borderRadius: 8, marginRight: 10 },
  details: { flex: 1 },
  title: { color: '#fff', fontSize: 16, fontWeight: '600' },
  category: { color: '#ccc', fontSize: 12 },
  price: { color: 'rgba(212, 175, 55, 1)', fontWeight: 'bold' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  addBtn: {
    backgroundColor: '#ff4444',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  removeBtn: {
    backgroundColor: '#ff4444',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  btnText: { color: '#fff', fontSize: 12 },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    // marginTop: 10,
    marginBottom: 10
  },
  infoBox: {
    backgroundColor: 'rgba(133, 0, 0, 1)',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    width: '48%',
  },
  infoIcon: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 5,
  },
  infoText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default Mainpage;