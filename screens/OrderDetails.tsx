import React from 'react';
import {
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

const OrderDetails = () => {
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
      <View style={styles.detailContainer}>
        <View style={styles.infoRow}>
          {getPlatform() === 'web' && <BiPackage />}
          <Text style={styles.infoText}>Order Number</Text>
        </View>
        <Text style={styles.detailText}>Order 323432523432rwqdwf3</Text>
      </View>
      <View style={styles.detailContainer}>
        <View style={styles.infoRow}>
          {getPlatform() === 'web' && <BiHome />}
          <Text style={styles.infoText}>Delivery Address</Text>
        </View>
        <Text style={styles.detailText}>13, VB 23423, Sri Lanka</Text>
      </View>
      <View style={styles.detailContainer}>
        <View style={styles.infoRow}>
          {getPlatform() === 'web' && <BiUserCircle />}
          <Text style={styles.infoText}>Customer Details</Text>
        </View>

        <Text style={styles.detailText}>john@gmail.com</Text>
        <Text style={styles.detailText}>John Doe</Text>
      </View>
      <View style={styles.detailContainer}>
        <View style={styles.infoRow}>
          <BiCar />
          <Text style={styles.infoText}>Delivered</Text>
          <BiCheck /> <BiX />
        </View>
      </View>
      <View style={styles.detailContainer}>
        <View style={styles.infoRow}>
          <BiMoneyWithdraw />
          <Text style={styles.infoText}>Paid</Text>
          <BiCheck /> <BiX />
        </View>
      </View>
      <View style={styles.detailContainer}>
        <View style={styles.infoRow}>
          {getPlatform() === 'web' && <BiCollection />}
          <Text style={styles.infoText}>Items</Text>
        </View>
      </View>
      <View style={styles.detailContainer}>
        <Text>Price</Text>
        <Text>Tax</Text>
        <Text>Discount</Text>
        <Text>Total</Text>
      </View>
      <View style={styles.detailContainer}>
        <View style={styles.infoRow}>
          {getPlatform() === 'web' && <BiCalendar />}
          <Text style={styles.infoText}>Date</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.homeBtn}>
        <Text style={styles.homeText}>Return to Home</Text>
      </TouchableOpacity>
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
});

export default OrderDetails;
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
