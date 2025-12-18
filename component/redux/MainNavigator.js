import React, { useState } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Mainpage from './Mainpage'
import ProductWrapper from './ProductWrapper' ;
import CartScreen from './CartScreen';
import UserList from './UserList'
import SplashScreen from './SplashScreen';
import ReceiptScreen from './ReceiptScreen'

const Stack = createNativeStackNavigator();

function MainNavigator() {

return (
<NavigationContainer>
<Stack.Navigator screenOptions={{ headerShown: false }}>
    
<Stack.Screen name="SplashScreen" component={SplashScreen} />
<Stack.Screen name="Mainpage" component={Mainpage} />
<Stack.Screen name="ProductWrapper" component={ProductWrapper} />
<Stack.Screen name="UserList" component={UserList} /> 
<Stack.Screen name="CartScreen" component={CartScreen} />
<Stack.Screen name="ReceiptScreen" component={ReceiptScreen} />



</Stack.Navigator>
</NavigationContainer>
);
}
export default MainNavigator;