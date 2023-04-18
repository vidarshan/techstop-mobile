import React from 'react';
import {ActivityIndicator, SafeAreaView, StyleSheet} from 'react-native';
const SplashScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator color="#000000" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#fbc405',
  },
});

export default SplashScreen;
