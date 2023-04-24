import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {getPlatform} from '../utils/Platform';
import WebHeader from '../components/WebHeader';
import {useAppDispatch, useAppSelector} from '../store/store';
import {
  getInfoFromStorage,
  removeInfoFromStorage,
  setInfoToStorage,
  placeOrder,
} from '../store/slices/orderSlice';
import {getItemsFromStorage} from '../store/slices/cartSlice';
import {useNavigate} from 'react-router-dom';

const OrderScreen = () => {
  let webNavigation = useNavigate();
  const dispatch = useAppDispatch();
  const {orderDetails, orderLoading, orderSuccess} = useAppSelector(
    state => state.order,
  );
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [house, setHouse] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const {cart} = useAppSelector(state => state.cart);
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
    const sum = 100 + 10 + cart.reduce((acc: any, item) => acc + item.price, 0);
    const mutableCartItems: any = [];
    cart.map(item => {
      const tempObj = {
        countInStock: 100,
        image: item.image,
        name: item.name,
        product: item.product,
        price: item.price,
        qty: 1,
      };
      mutableCartItems.push(tempObj);
    });
    const orderContentObj = {
      orderItems: mutableCartItems,
      shippingAddress: {
        address: '17/2',
        city: 'Colombo',
        country: 'Canada',
        postalCode: '11220',
      },
      paymentMethod: 'Cash',
      itemsPrice: cart
        .reduce((acc: any, item) => acc + item.price, 0)
        .toString(),
      taxPrice: '100',
      shippingPrice: '10',
      totalPrice: sum.toString(),
    };
    dispatch(setInfoToStorage(orderDetailsObj));
    dispatch(placeOrder(orderContentObj));
  };

  useEffect(() => {
    dispatch(getItemsFromStorage());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getInfoFromStorage());
  }, [dispatch]);

  return (
    <ScrollView style={styles.orderView}>
      {getPlatform() === 'web' && <WebHeader backHeader="Orders" />}
      <View style={styles.orderSummaryCard}>
        <Text style={styles.orderPriceHeaderText}>Your Order</Text>
        <Text style={styles.orderTotalPriceText}>
          ${cart.reduce((acc: any, item) => acc + item.price, 0)}
        </Text>
      </View>
      <Text style={styles.headerText}>Order Items</Text>
      {cart.map(item => {
        return (
          <View key={item.product} style={styles.orderItemCard}>
            <View style={styles.orderItemImageTextContainer}>
              <Image
                style={styles.orderItemImage}
                source={{
                  uri: item.image,
                }}
              />
              <Text>{item.name}</Text>
            </View>
            <View style={styles.orderItemPriceTextContainer}>
              <Text style={styles.orderPriceText}>${item.price}</Text>
            </View>
          </View>
        );
      })}

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
      {!orderLoading && (
        <TouchableOpacity
          style={styles.removeInfoBtn}
          onPress={() => dispatch(removeInfoFromStorage())}>
          <Text style={styles.removeInfoText}>Clear Details</Text>
        </TouchableOpacity>
      )}

      {orderSuccess ? (
        <TouchableOpacity
          style={styles.placeOrderBtn}
          onPress={() => {
            getPlatform() === 'web' && webNavigation('/details');
          }}>
          <Text style={styles.placeOrderText}>View Order Summary</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.placeOrderBtn}
          onPress={() => saveOrderDetails()}>
          {orderLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.placeOrderText}>Place Order</Text>
          )}
        </TouchableOpacity>
      )}
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
    paddingTop: 6,
    paddingBottom: 6,
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
    width: 40,
    height: 40,
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
