import React, {useEffect} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {getPlatform} from '../utils/Platform';
import WebHeader from '../components/WebHeader';
import OrderCard from '../components/OrderCard';
import {useAppDispatch, useAppSelector} from '../store/store';
import {removeUserFromAsyncStorage} from '../store/slices/userSlice';
import {useNavigate} from 'react-router-dom';
import {getMyOrders} from '../store/slices/orderSlice';
import {FaUserCircle} from 'react-icons/fa';

const UserScreen = () => {
  const {user} = useAppSelector(state => state.user);
  const {myOrders, myOrdersLoading} = useAppSelector(state => state.order);
  const dispatch = useAppDispatch();
  const webNavigation = useNavigate();

  if (getPlatform() === 'web') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
  }

  const logoutUser = () => {
    dispatch(removeUserFromAsyncStorage());
    if (user.token !== null) {
      webNavigation('/');
    }
  };

  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.userScreen}>
      {getPlatform() === 'web' && <WebHeader type="back" header="Products" />}
      <View style={styles.avatarContainer}>
        <View style={styles.avatarInnerContainer}>
          <TouchableOpacity style={styles.avatar}>
            {getPlatform() === 'web' && <FaUserCircle />}
          </TouchableOpacity>
          <Text style={styles.username}>John Doe</Text>
        </View>
        <TouchableOpacity style={styles.logout} onPress={() => logoutUser()}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.yourOrdersContainer}>
        <Text style={styles.yourOrdersText}>Your Orders</Text>
      </View>
      {myOrdersLoading ? (
        <ActivityIndicator color="#000" />
      ) : (
        <FlatList
          data={myOrders}
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
      )}
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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffd965',
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
  yourOrdersContainer: {
    margin: 8,
  },
  yourOrdersText: {
    fontSize: 16,
  },
});

export default UserScreen;
