import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IoIosArrowBack} from 'react-icons/io';
import {RiUser3Fill, RiShoppingBagFill} from 'react-icons/ri';
import {IWebHeader} from '../models/IWebHeader';
import {useNavigate} from 'react-router-dom';

const WebHeader: FC<IWebHeader> = ({
  header = '',
  //backHeader = '',
  leftPath = '/',
  //rightPath = '/',
  type = 'normal',
}) => {
  const navigate = useNavigate();
  return (
    <>
      {type === 'normal' ? (
        <>
          <TouchableOpacity
            style={styles.webHeader}
            onPress={() => navigate(leftPath)}>
            <View style={styles.webHeaderIcon}>
              <IoIosArrowBack size={18} color="#000" />
            </View>
            <Text style={styles.webHeaderText}>{header}</Text>
          </TouchableOpacity>
        </>
      ) : type === 'back' ? (
        <>
          <TouchableOpacity
            style={styles.webHeader}
            onPress={() => navigate(leftPath)}>
            <View style={styles.webHeaderIcon}>
              <IoIosArrowBack size={18} color="#000" />
            </View>
            <Text style={styles.webHeaderText}>{header}</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          {' '}
          <TouchableOpacity style={styles.dualWebHeader}>
            <View style={styles.webHeaderIcon}>
              <RiUser3Fill size={18} color="#000" />
            </View>
            <Text style={styles.webHeaderText}>{header}</Text>
            <View style={styles.webHeaderIcon}>
              <RiShoppingBagFill size={18} color="#000" />
            </View>
          </TouchableOpacity>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  dualWebHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fbc405',
    padding: 20,
  },
  dualHeaderText: {
    fontSize: 14,
    fontWeight: '600',
  },
  webHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fbc405',
    padding: 20,
  },
  webHeaderCenter: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fbc405',
    padding: 20,
  },
  webHeaderIcon: {},
  webHeaderText: {
    color: '#000000',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default WebHeader;
