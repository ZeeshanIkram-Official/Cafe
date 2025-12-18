import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const firstLaunch = await AsyncStorage.getItem('isFirstLaunch');
        const token = await AsyncStorage.getItem('authToken');
        const user = await AsyncStorage.getItem('userData');

        if (!firstLaunch) {
          
          await AsyncStorage.setItem('isFirstLaunch', 'true');
          navigation.replace('Mainpage');
        } else if (token && user) {
          navigation.replace('Mainpage');
        } else {
          navigation.replace('Mainpage');
        }
      } catch (error) {
        console.log('❌ Splash Error:', error.message);
        navigation.replace('Mainpage');
      }
    };

    const timer = setTimeout(checkLoginStatus, 2500); 
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/Janoshi.png')}
        style={styles.logo}
        // resizeMode="contain"
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: 'black',
  },
  logo: {
    height: 350,
    width: 350,
  },
});