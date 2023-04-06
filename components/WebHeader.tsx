import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const WebHeader = () => {
  return (
    <View style={styles.webHeader}>
      <Icon name="long-arrow-left" size={30} color="#f5f5f5" />
      <Text style={styles.webHeaderText}>Products</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  webHeader: {
    display: 'flex',
    backgroundColor: '#DF2E38',
    padding: 20,
  },
  webHeaderText: {
    color: '#ffffff',
    textAlign: 'center',
  },
});

export default WebHeader;
