import React from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {getPlatform} from '../utils/Platform';
import WebHeader from '../components/WebHeader';
import OrderCard from '../components/OrderCard';
import {useAppDispatch} from '../store/store';
import {removeUserFromAsyncStorage} from '../store/slices/userSlice';

const UserScreen = () => {
  const dispatch = useAppDispatch();
  const DATA = [
    {
      shippingAddress: {
        address: 'Colombo',
        city: 'Moratuwa',
        postalCode: '10400',
        country: 'Sri Lanka',
      },
      paymentResult: {
        id: '81E22672G1437362X',
        status: 'COMPLETED',
        update_time: '2022-02-13T17:05:56Z',
        email_address: 'vidaaadi99-buyer@gmail.com',
      },
      _id: '62093a57b95f867fb3c6f1f6',
      user: '61f550d52bf7a4e12af88ee9',
      orderItems: [
        {
          name: 'Dell Inspiron 7501 – i7',
          qty: 1,
          image: '/images/inspiron.jpeg',
          price: 1149.99,
          product: '61fa901954d0d0a51edccc2b',
          _id: '62093a57b95f867fb3c6f1f7',
        },
        {
          name: 'Apple MacBook Pro 13.3 inch',
          qty: 1,
          image: '/images/macbook.jpeg',
          price: 1299.99,
          product: '61f55a5762a68fe81c96d895',
          _id: '62093a57b95f867fb3c6f1f8',
        },
      ],
      paymentMethod: 'PayPal',
      taxPrice: 367.5,
      shippingPrice: 0,
      totalPrice: 2817.48,
      isPaid: true,
      isDelivered: true,
      createdAt: '2022-02-13T17:05:27.403Z',
      updatedAt: '2022-02-14T13:09:00.951Z',
      __v: 0,
      paidAt: '2022-02-13T17:05:57.899Z',
      deliveredAt: '2022-02-14T13:09:00.950Z',
    },
    {
      shippingAddress: {
        address: '17/2, kaldemulla road',
        city: 'Moratuwa',
        postalCode: '10400',
        country: 'Sri Lanka',
      },
      paymentResult: {
        id: '6NC87316RW621005E',
        status: 'COMPLETED',
        update_time: '2022-02-16T07:24:22Z',
        email_address: 'vidaaadi99-buyer@gmail.com',
      },
      _id: '620ca2c96329f80bccfaf725',
      user: '61f550d52bf7a4e12af88ee9',
      orderItems: [
        {
          name: 'Dell Inspiron 7501 – i7',
          qty: 1,
          image: '/images/inspiron.jpeg',
          price: 1149.99,
          product: '61fa901954d0d0a51edccc2b',
          _id: '620ca2c96329f80bccfaf726',
        },
        {
          name: 'Apple MacBook Pro 13.3 inch',
          qty: 1,
          image: '/images/macbook.jpeg',
          price: 1299.99,
          product: '61f55a5762a68fe81c96d895',
          _id: '620ca2c96329f80bccfaf727',
        },
        {
          name: 'Apple Mac Pro Rack',
          qty: 1,
          image: '/images/macpro2.jpeg',
          price: 1999.99,
          product: '61fa962254d0d0a51edccd0c',
          _id: '620ca2c96329f80bccfaf728',
        },
      ],
      paymentMethod: 'PayPal',
      taxPrice: 667.5,
      shippingPrice: 0,
      totalPrice: 5117.47,
      isPaid: true,
      isDelivered: true,
      createdAt: '2022-02-16T07:07:53.852Z',
      updatedAt: '2022-02-16T07:25:28.945Z',
      __v: 0,
      paidAt: '2022-02-16T07:24:23.401Z',
      deliveredAt: '2022-02-16T07:25:28.943Z',
    },
    {
      shippingAddress: {
        address: '17/2, kaldemulla road',
        city: 'Moratuwa',
        postalCode: '10400',
        country: 'Sri Lanka',
      },
      paymentResult: {
        id: '9HJ08400P8898445M',
        status: 'COMPLETED',
        update_time: '2022-02-16T17:54:22Z',
        email_address: 'vidaaadi99-buyer@gmail.com',
      },
      _id: '620d3a34fb42a1de7795f1ff',
      user: '61f550d52bf7a4e12af88ee9',
      orderItems: [
        {
          name: 'Dell Inspiron 7501 – i7',
          qty: 1,
          image: '/images/inspiron.jpeg',
          price: 1149.99,
          product: '61fa901954d0d0a51edccc2b',
          _id: '620d3a34fb42a1de7795f200',
        },
        {
          name: 'Apple MacBook Pro 13.3 inch',
          qty: 1,
          image: '/images/macbook.jpeg',
          price: 1299.99,
          product: '61f55a5762a68fe81c96d895',
          _id: '620d3a34fb42a1de7795f201',
        },
        {
          name: 'Apple Mac Pro Rack',
          qty: 1,
          image: '/images/macpro2.jpeg',
          price: 1999.99,
          product: '61fa962254d0d0a51edccd0c',
          _id: '620d3a34fb42a1de7795f202',
        },
      ],
      paymentMethod: 'PayPal',
      taxPrice: 667.5,
      shippingPrice: 0,
      totalPrice: 5117.47,
      isPaid: true,
      isDelivered: true,
      createdAt: '2022-02-16T17:53:56.024Z',
      updatedAt: '2022-03-29T14:56:21.982Z',
      __v: 0,
      paidAt: '2022-02-16T17:54:21.441Z',
      deliveredAt: '2022-03-29T14:56:21.979Z',
    },
    {
      shippingAddress: {
        address: '17/2, kaldemulla road',
        city: 'Moratuwa',
        postalCode: '10400',
        country: 'Sri Lanka',
      },
      paymentResult: {
        id: '3C328799RK643282V',
        status: 'COMPLETED',
        update_time: '2022-02-17T12:54:43Z',
        email_address: 'vidaaadi99-buyer@gmail.com',
      },
      _id: '620e44ea675be940cb6dbe86',
      user: '61f550d52bf7a4e12af88ee9',
      orderItems: [
        {
          name: 'Dell Inspiron 7501 – i7',
          qty: 2,
          image: '/images/inspiron.jpeg',
          price: 1149.99,
          product: '61fa901954d0d0a51edccc2b',
          _id: '620e44ea675be940cb6dbe87',
        },
        {
          name: 'Apple MacBook Pro 13.3 inch',
          qty: 1,
          image: '/images/macbook.jpeg',
          price: 1299.99,
          product: '61f55a5762a68fe81c96d895',
          _id: '620e44ea675be940cb6dbe88',
        },
        {
          name: 'Apple Mac Pro Rack',
          qty: 1,
          image: '/images/macpro2.jpeg',
          price: 1999.99,
          product: '61fa962254d0d0a51edccd0c',
          _id: '620e44ea675be940cb6dbe89',
        },
      ],
      paymentMethod: 'PayPal',
      taxPrice: 839.99,
      shippingPrice: 0,
      totalPrice: 6439.95,
      isPaid: true,
      isDelivered: true,
      createdAt: '2022-02-17T12:51:54.549Z',
      updatedAt: '2022-03-29T14:56:24.036Z',
      __v: 0,
      paidAt: '2022-02-17T12:54:44.897Z',
      deliveredAt: '2022-03-29T14:56:24.034Z',
    },
    {
      shippingAddress: {
        address: '17/2, kaldemulla road',
        city: 'Moratuwa',
        postalCode: '10400',
        country: 'Sri Lanka',
      },
      _id: '620e55be675be940cb6dc599',
      user: '61f550d52bf7a4e12af88ee9',
      orderItems: [
        {
          name: 'Microsoft Surface Laptop 13.5 inch',
          qty: 1,
          image: '/images/surface.jpeg',
          price: 1599.99,
          product: '61f65428e1273b6867abb86c',
          _id: '620e55be675be940cb6dc59a',
        },
      ],
      paymentMethod: 'PayPal',
      taxPrice: 240,
      shippingPrice: 0,
      totalPrice: 1839.99,
      isPaid: false,
      isDelivered: true,
      createdAt: '2022-02-17T14:03:42.474Z',
      updatedAt: '2022-07-13T10:53:28.872Z',
      __v: 0,
      deliveredAt: '2022-07-13T10:53:28.871Z',
    },
  ];
  return (
    <SafeAreaView style={styles.userScreen}>
      {getPlatform() === 'web' && <WebHeader />}
      <View style={styles.avatarContainer}>
        <View style={styles.avatarInnerContainer}>
          <TouchableOpacity style={styles.avatar} />
          <Text style={styles.username}>John Doe</Text>
        </View>
        <TouchableOpacity
          style={styles.logout}
          onPress={() => dispatch(removeUserFromAsyncStorage())}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={DATA}
        renderItem={({item}) => (
          <OrderCard
            shippingAddress={item.shippingAddress}
            _id={item._id}
            user={item.user}
            orderItems={item.orderItems}
            paymentMethod={item.paymentMethod}
            taxPrice={item.taxPrice}
            shippingPrice={item.shippingPrice}
            totalPrice={item.totalPrice}
            isPaid={item.isPaid}
            isDelivered={item.isDelivered}
            createdAt={item.createdAt}
            updatedAt={item.updatedAt}
            deliveredAt={item.deliveredAt}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.noOrdersText}>
            You have not ordered anything.
          </Text>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  userScreen: {
    backgroundColor: '#fff',
  },
  avatarInnerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 8,
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  avatar: {
    backgroundColor: 'red',
    height: 40,
    width: 40,
    borderRadius: 50,
    marginRight: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: '500',
  },
  noOrdersText: {
    textAlign: 'center',
  },
  logout: {
    padding: 8,
    borderRadius: 4,
    backgroundColor: '#DF2E38',
  },
  logoutText: {
    color: '#fff',
  },
});

export default UserScreen;
