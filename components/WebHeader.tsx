import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IoIosArrowBack} from 'react-icons/io';
import {IWebHeader} from '../models/IWebHeader';
import {useNavigate} from 'react-router-dom';
// import Icon from 'react-native-vector-icons/FontAwesome';

const WebHeader: FC<IWebHeader> = ({back, leftPath = '/'}) => {
  const navigate = useNavigate();
  return (
    <>
      {back ? (
        <TouchableOpacity
          style={styles.webHeader}
          onPress={() => navigate(leftPath)}>
          <View style={styles.webHeaderIcon}>
            <IoIosArrowBack size={18} color="#fff" />
          </View>
          <Text style={styles.webHeaderText}>Products</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.webHeaderCenter}>
          <Text style={styles.webHeaderText}>Products</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  webHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DF2E38',
    padding: 20,
  },
  webHeaderCenter: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DF2E38',
    padding: 20,
  },
  webHeaderIcon: {},
  webHeaderText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default WebHeader;
