// component/redux/Header.js
import { View, Text } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';

const Header = () => {
  const cart = useSelector(state => state.reducer); // array

  if (!cart?.length) {
    return null;
  }
  return (
    <View>
      <View style={{backgroundColor: 'rgba(212, 175, 55, 1)',
          width: 17,
          height: 17,
          borderRadius: 12, 
          justifyContent: 'center',
          alignItems: 'center',}}>
      <Text style={{ fontSize: 10, textAlign: 'right' }}>
        {cart?.length || ''}
      </Text>
      </View>
    </View>
  );
};

export default Header;




