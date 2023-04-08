import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IoIosArrowBack} from 'react-icons/io';
import {IWebHeader} from '../models/IWebHeader';
import {useNavigate} from 'react-router-dom';
import {IoBagHandle} from 'react-icons/io5';

const WebHeader: FC<IWebHeader> = ({
  header = '',
  backHeader = '',
  back,
  leftPath = '/',
  rightPath = '/',
}) => {
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
          <Text style={styles.webHeaderText}>{header}</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.webHeaderCenter}>
          {!leftPath ? (
            <IoBagHandle size={18} color="#fff" />
          ) : (
            <TouchableOpacity />
          )}

          <Text style={styles.webHeaderText}>{backHeader}</Text>
          <TouchableOpacity onPress={() => navigate(rightPath)}>
            <IoBagHandle size={18} color="#fff" />
          </TouchableOpacity>
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
    justifyContent: 'space-between',
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
