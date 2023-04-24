import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {getPlatform} from '../utils/Platform';
import WebHeader from '../components/WebHeader';
import {
  BiPackage,
  BiHome,
  BiUserCircle,
  BiMoneyWithdraw,
  BiCar,
  BiCheck,
  BiCollection,
  BiX,
  BiCalendar,
} from 'react-icons/bi';
import {useAppDispatch, useAppSelector} from '../store/store';
import {getOrder} from '../store/slices/orderSlice';
import moment from 'moment';
import {useNavigate} from 'react-router-dom';

const OrderDetails = () => {
  let webNavigation;
  const dispatch = useAppDispatch();
  const {orderId, orderSummary, orderSummaryLoading} = useAppSelector(
    state => state.order,
  );

  if (getPlatform() === 'web') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    webNavigation = useNavigate();
  }

  useEffect(() => {
    console.log(orderId);
    dispatch(getOrder(orderId));
  }, [dispatch, orderId]);

  return (
    <ScrollView>
      {getPlatform() === 'web' && <WebHeader type="back" backHeader="Cart" />}
      <View>
        <Text style={styles.headerText}>Order Details</Text>
      </View>
      <View style={styles.placedContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.placedText}>Order Placed</Text>
        </View>
      </View>
      {orderSummaryLoading ? (
        <ActivityIndicator color="#000" />
      ) : (
        <>
          <View style={styles.detailContainer}>
            <View style={styles.infoRow}>
              {getPlatform() === 'web' && <BiPackage />}
              <Text style={styles.infoText}>Order Number</Text>
            </View>
            <Text style={styles.detailText}>Order ${orderId}</Text>
          </View>
          <View style={styles.detailContainer}>
            <View style={styles.infoRow}>
              {getPlatform() === 'web' && <BiHome />}
              <Text style={styles.infoText}>Delivery Address</Text>
            </View>
            <Text style={styles.detailText}>
              {`${orderSummary?.shippingAddress?.address}, ${orderSummary?.shippingAddress?.city}, ${orderSummary?.shippingAddress?.postalCode} ${orderSummary?.shippingAddress?.country}`}
            </Text>
          </View>
          <View style={styles.detailContainer}>
            <View style={styles.infoRow}>
              {getPlatform() === 'web' && <BiUserCircle />}
              <Text style={styles.infoText}>Customer Details</Text>
            </View>

            <Text style={styles.detailText}>{orderSummary?.user?.email}</Text>
            <Text style={styles.detailText}>{orderSummary?.user?.name}</Text>
          </View>
          <View style={styles.detailContainer}>
            <View style={styles.infoRow}>
              <BiCar />
              <Text style={styles.infoText}>Delivered</Text>{' '}
              {orderSummary?.isDelivered ? (
                <BiCheck color="green" />
              ) : (
                <BiX color="red" />
              )}
            </View>
          </View>
          <View style={styles.detailContainer}>
            <View style={styles.infoRow}>
              <BiMoneyWithdraw />
              <Text style={styles.infoText}>Paid</Text>
              {!orderSummary?.isPaid ? (
                <BiCheck color="green" />
              ) : (
                <BiX color="red" />
              )}
            </View>
          </View>
          <View style={styles.detailContainer}>
            <View style={styles.infoRow}>
              {getPlatform() === 'web' && <BiCollection />}
              <Text style={styles.infoText}>Items</Text>
            </View>
            {orderSummary?.orderItems.map(item => {
              return (
                <View style={styles.itemRow}>
                  <Image style={styles.img} source={item.image} />
                  <Text>
                    {item.name} x ${item.price}
                  </Text>
                </View>
              );
            })}
          </View>
          <View style={styles.detailContainer}>
            <Text>Price ${orderSummary?.taxPrice}</Text>
            <Text>Tax ${orderSummary?.taxPrice}</Text>
            <Text>Total ${orderSummary?.totalPrice}</Text>
          </View>
          <View style={styles.detailContainer}>
            <View style={styles.infoRow}>
              {getPlatform() === 'web' && <BiCalendar />}
              <Text style={styles.infoText}>Date</Text>
              <Text style={styles.infoText}>
                {moment(orderSummary?.createdAt).format('DD-MM-YYYY hh:mm')}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.homeBtn}
            onPress={() => webNavigation('/')}>
            <Text style={styles.homeText}>Return to Home</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  detailContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 8,
    marginLeft: 16,
    marginRight: 16,
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  placedContainer: {
    backgroundColor: 'rgba(0, 167, 53, 0.694)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 8,
    marginLeft: 16,
    marginRight: 16,
    padding: 8,
    borderRadius: 8,
  },
  placedText: {
    color: '#fff',
  },
  headerText: {
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 16,
    fontSize: 20,
  },
  infoRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  infoText: {
    marginLeft: 6,
  },
  homeBtn: {
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
  homeText: {
    textAlign: 'center',
    color: '#000',
    fontWeight: '600',
  },
  detailText: {
    marginTop: 8,
    color: '#828282',
  },
  img: {
    height: 20,
    width: 20,
    marginRight: 8,
  },
  itemRow: {display: 'flex', flexDirection: 'row', marginTop: 10},
});

export default OrderDetails;

let payload = {
  user: '61f550d52bf7a4e12af88ee9',
  orderItems: [
    {
      name: 'Apple MacBook Pro 13.3 inch',
      qty: 1,
      image: '/images/macbook.jpeg',
      price: 1299.99,
      product: '61f55a5762a68fe81c96d895',
      _id: '644535b95720b4a85fcc55d4',
    },
    {
      name: 'HP Neverstop 1200a',
      qty: 1,
      image: '/images/hp1.jpeg',
      price: 499.99,
      product: '61fa9e1554d0d0a51edcce08',
      _id: '644535b95720b4a85fcc55d5',
    },
  ],
  shippingAddress: {
    address: '17',
    city: 'Colmbo',
    postalCode: '10401',
    country: 'Sri Lanka',
  },
  paymentMethod: 'PayPal',
  taxPrice: 270,
  shippingPrice: 0,
  totalPrice: 2069.98,
  isPaid: false,
  isDelivered: false,
  _id: '644535b95720b4a85fcc55d3',
  createdAt: '2023-04-23T13:42:17.379Z',
  updatedAt: '2023-04-23T13:42:17.379Z',
  __v: 0,
};

console.log(payload);

let s = {
  user: '61f550d52bf7a4e12af88ee9',
  orderItems: [
    {
      name: 'Apple MacBook Pro 13.3 inch',
      qty: 1,
      image: '/images/macbook.jpeg',
      price: 1299.99,
      product: '61f55a5762a68fe81c96d895',
      _id: '6444dfd9e047c84ca0af94d3',
    },
    {
      name: 'HP Neverstop 1200a',
      qty: 1,
      image: '/images/hp1.jpeg',
      price: 499.99,
      product: '61fa9e1554d0d0a51edcce08',
      _id: '6444dfd9e047c84ca0af94d4',
    },
  ],
  shippingAddress: {
    address: '13',
    city: 'VB',
    postalCode: '23423',
    country: 'Sri Lanka',
  },
  paymentMethod: 'PayPal',
  taxPrice: 270,
  shippingPrice: 0,
  totalPrice: 2069.98,
  isPaid: false,
  isDelivered: false,
  _id: '6444dfd9e047c84ca0af94d2',
  createdAt: '2023-04-23T07:35:53.274Z',
  updatedAt: '2023-04-23T07:35:53.274Z',
  __v: 0,
};

let q = {
  shippingAddress: {
    address: '13',
    city: 'VB',
    postalCode: '23423',
    country: 'Sri Lanka',
  },
  _id: '6444dfd9e047c84ca0af94d2',
  user: {
    _id: '61f550d52bf7a4e12af88ee9',
    name: 'John Doe',
    email: 'john@gmail.com',
  },
  orderItems: [
    {
      name: 'Apple MacBook Pro 13.3 inch',
      qty: 1,
      image: '/images/macbook.jpeg',
      price: 1299.99,
      product: '61f55a5762a68fe81c96d895',
      _id: '6444dfd9e047c84ca0af94d3',
    },
    {
      name: 'HP Neverstop 1200a',
      qty: 1,
      image: '/images/hp1.jpeg',
      price: 499.99,
      product: '61fa9e1554d0d0a51edcce08',
      _id: '6444dfd9e047c84ca0af94d4',
    },
  ],
  paymentMethod: 'PayPal',
  taxPrice: 270,
  shippingPrice: 0,
  totalPrice: 2069.98,
  isPaid: false,
  isDelivered: false,
  createdAt: '2023-04-23T07:35:53.274Z',
  updatedAt: '2023-04-23T07:35:53.274Z',
  __v: 0,
};

console.log(s);
console.log(q);
