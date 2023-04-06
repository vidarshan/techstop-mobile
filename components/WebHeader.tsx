import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {IoIosArrowBack} from 'react-icons/io';
// import Icon from 'react-native-vector-icons/FontAwesome';

const WebHeader = () => {
  return (
    <View style={styles.webHeader}>
      <View style={styles.webHeaderIcon}>
        <IoIosArrowBack color="#fff" />
      </View>
      <Text style={styles.webHeaderText}>Products</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  webHeader: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#DF2E38',
    padding: 20,
  },
  webHeaderIcon: {},
  webHeaderText: {
    color: '#ffffff',
    textAlign: 'center',
  },
});

export default WebHeader;
