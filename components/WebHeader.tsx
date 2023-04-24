import React, {FC, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IoIosArrowBack} from 'react-icons/io';
import {IWebHeader} from '../models/IWebHeader';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../store/store';
import {getItemsFromStorage} from '../store/slices/cartSlice';
import {FaUserCircle, FaShoppingBag} from 'react-icons/fa';

const WebHeader: FC<IWebHeader> = ({
  header = '',
  //backHeader = '',
  leftPath = '/',
  rightPath = '/',
  type = 'normal',
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {cart = []} = useAppSelector(state => state.cart);

  useEffect(() => {
    dispatch(getItemsFromStorage());
  }, [dispatch]);
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
          <View style={styles.dualWebHeader}>
            <TouchableOpacity
              style={styles.webHeaderIcon}
              onPress={() => navigate(leftPath)}>
              <FaUserCircle size={20} color="#000" />
            </TouchableOpacity>
            <Text style={styles.webHeaderText}>{header}</Text>
            <TouchableOpacity
              style={styles.webHeaderIcon}
              onPress={() => navigate(rightPath)}>
              <FaShoppingBag size={18} color="#000" />
              {cart && cart.length > 0 && (
                <View style={styles.badgeContainer}>
                  <Text style={styles.badgeText}>{cart.length}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
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
  badgeContainer: {
    position: 'absolute',
    top: -5,
    left: 10,
    width: 16,
    height: 16,
    borderRadius: 50,
    backgroundColor: '#c90000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {fontSize: 12, color: '#fff', fontWeight: '600'},
});

export default WebHeader;
