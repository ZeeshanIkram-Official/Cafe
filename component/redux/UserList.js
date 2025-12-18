// component/redux/UserList.js
import React, { useEffect } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, addToCart } from './Action';

const UserList = ({ navigation }) => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users); // array

  useEffect(() => {
    dispatch(getUsers()); // saga triggers API
  }, [dispatch]);

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={users}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1, borderColor: "#ccc" }}>
            <Text style={{ fontSize: 18 }}>{item.name}</Text>
            <Button
              title="Add To Cart & Go Cart"
              onPress={() => {
                // add whole user object in cart just as demo
                dispatch(addToCart({ name: item.name, price: '0', color: 'N/A', image: '' }));
                navigation.navigate("CartScreen");
              }}
            />
          </View>
        )}
      />
    </View>
  );
};

export default UserList;
