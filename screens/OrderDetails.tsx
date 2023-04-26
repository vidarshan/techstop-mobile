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
import {clearCartFromStorage} from '../store/slices/cartSlice';

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
    dispatch(getOrder(orderId));
    dispatch(clearCartFromStorage());
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
