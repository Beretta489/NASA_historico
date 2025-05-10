import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Login'); 
    }, 2000); 
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>NASA</Text>
      <Text style={styles.subtitle}>SpaceX App</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0b3d91', 
  },
  title: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 24,
    color: '#ffffff', 
    marginTop: 10,
  },
});

export default SplashScreen;
