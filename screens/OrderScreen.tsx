import React from 'react';
import {ScrollView, Text, TouchableOpacity} from 'react-native';
import {getPlatform} from '../utils/Platform';
import WebHeader from '../components/WebHeader';

const OrderScreen = () => {
  return (
    <ScrollView>
      {getPlatform() === 'web' && <WebHeader backHeader="Orders" />}
      <Text>Your Order</Text>
      <Text>$1288.99</Text>
      <Text>Phone number</Text>
      <Text>Email</Text>
      <Text>House No</Text>
      <Text>Address Line</Text>
      <Text>City</Text>
      <Text>Country</Text>
      <TouchableOpacity>Place Order</TouchableOpacity>
    </ScrollView>
  );
};

export default OrderScreen;
