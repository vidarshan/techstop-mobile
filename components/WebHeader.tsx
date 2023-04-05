import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const WebHeader = () => {
  return (
    <View style={styles.webHeader}>
      <Text style={styles.webHeaderText}>Products</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  webHeader: {
    backgroundColor: '#DF2E38',
    padding: 20,
  },
  webHeaderText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default WebHeader;
