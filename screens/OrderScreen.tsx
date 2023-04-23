import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import {getPlatform} from '../utils/Platform';
import WebHeader from '../components/WebHeader';
import {useAppDispatch, useAppSelector} from '../store/store';
import {
  getInfoFromStorage,
  removeInfoFromStorage,
  setInfoToStorage,
} from '../store/slices/orderSlice';

const OrderScreen = () => {
  const dispatch = useAppDispatch();
  const {orderDetails} = useAppSelector(state => state.order);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [house, setHouse] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  console.log(
    '🚀 ~ file: OrderScreen.tsx:19 ~ OrderScreen ~ orderDetails:',
    orderDetails,
  );

  const saveOrderDetails = () => {
    const orderDetailsObj = {
      phone,
      email,
      house,
      line: address,
      city,
      country,
      code: postalCode,
      payment: 'Cash',
    };
    console.log(orderDetailsObj);
    dispatch(setInfoToStorage(orderDetailsObj));
  };

  useEffect(() => {
    dispatch(getInfoFromStorage());
  }, [dispatch]);

  return (
    <ScrollView style={styles.orderView}>
      {getPlatform() === 'web' && <WebHeader backHeader="Orders" />}
      <View style={styles.orderSummaryCard}>
        <Text style={styles.orderPriceHeaderText}>Your Order</Text>
        <Text style={styles.orderTotalPriceText}>$1288.99</Text>
      </View>
      <Text style={styles.headerText}>Order Items</Text>
      <View style={styles.orderItemCard}>
        <View style={styles.orderItemImageTextContainer}>
          <Image
            style={styles.orderItemImage}
            source={{
              uri: 'https://res.cloudinary.com/dury4s2jk/image/upload/v1680417980/63ce49ee1ebbe1674463726_idwotp.jpg',
            }}
          />
          <Text>MacBook Pro 14" 256GB</Text>
        </View>
        <View style={styles.orderItemPriceTextContainer}>
          <Text style={styles.orderPriceText}>$1299.99</Text>
        </View>
      </View>
      <Text style={styles.headerText}>Shipping details</Text>
      <View>
        <TextInput
          value={phone}
          onChangeText={text => setPhone(text.replace(/[^0-9]/g, ''))}
          style={styles.inputField}
          placeholder="Phone number"
          keyboardType="numeric"
          maxLength={12}
        />
        <TextInput
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.inputField}
          placeholder="Email Address"
        />
        <View style={styles.inputFieldRow}>
          <TextInput
            value={house}
            onChangeText={text => setHouse(text.replace(/[^0-9]/g, ''))}
            style={styles.halfInputField}
            placeholder="House Number"
            maxLength={5}
          />
          <TextInput
            value={address}
            onChangeText={text => setAddress(text)}
            style={styles.halfInputField}
            placeholder="Address Line"
          />
        </View>
        <TextInput
          value={postalCode}
          onChangeText={text => setPostalCode(text)}
          style={styles.inputField}
          placeholder="Postal code"
          maxLength={6}
        />
        <TextInput
          value={city}
          onChangeText={text => setCity(text)}
          style={styles.inputField}
          placeholder="City"
        />
        <TextInput
          value={country}
          onChangeText={text => setCountry(text)}
          style={styles.inputField}
          placeholder="Country"
        />
      </View>

      <TouchableOpacity
        style={styles.removeInfoBtn}
        onPress={() => dispatch(removeInfoFromStorage())}>
        <Text style={styles.removeInfoText}>Clear Details</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.placeOrderBtn}
        onPress={() => saveOrderDetails()}>
        <Text style={styles.placeOrderText}>Place Order</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  orderView: {
    backgroundColor: 'white',
  },
  placeOrderBtn: {
    backgroundColor: '#fbc405',
    borderRadius: 8,
    marginTop: 16,
    marginLeft: 16,
    marginRight: 16,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 15,
    paddingBottom: 15,
  },
  inputField: {
    borderRadius: 8,
    marginTop: 16,
    marginLeft: 16,
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingLeft: 2,
    paddingRight: 2,
    height: 40,
  },
  inputFieldRow: {
    flexDirection: 'row',
    marginTop: 16,
  },
  halfInputField: {
    borderRadius: 8,
    marginLeft: 16,
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingLeft: 2,
    paddingRight: 2,
    height: 40,
    flex: 1,
  },
  placeOrderText: {
    textAlign: 'center',
    color: '#000',
    fontWeight: '600',
  },
  headerText: {
    marginLeft: 16,
  },
  orderItemCard: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 8,
    margin: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingLeft: 2,
    paddingRight: 2,
  },
  orderItemPriceTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 8,
  },
  orderPriceText: {
    fontWeight: '500',
  },
  orderItemImage: {
    width: 50,
    height: 50,
    marginRight: 4,
  },
  orderItemImageTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderTotalPriceText: {
    fontSize: 30,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 10,
  },
  orderPriceHeaderText: {
    fontSize: 18,
    textAlign: 'center',
  },
  orderSummaryCard: {
    padding: 16,
    margin: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: 'white',
  },
  removeInfoBtn: {
    backgroundColor: '#e2e2e2',
    borderRadius: 8,
    marginTop: 16,
    marginLeft: 16,
    marginRight: 16,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 15,
    paddingBottom: 15,
  },
  removeInfoText: {
    textAlign: 'center',
    color: '#000',
    fontWeight: '600',
  },
});

export default OrderScreen;
