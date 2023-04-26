import React, {FC, useEffect} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native';
import CartItem from '../components/CartItem';
import {getPlatform} from '../utils/Platform';
import WebHeader from '../components/WebHeader';
import {ICartScreen} from '../models/ICartScreen';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../store/store';
import {getItemsFromStorage} from '../store/slices/cartSlice';
import {ICartItem} from '../models/ICartItem';
import {getTotal} from '../utils/Calculations';
import {FaPiggyBank} from 'react-icons/fa';

const CartScreen: FC<ICartScreen> = ({navigation}) => {
  let webNavigate: any = {};
  const dispatch = useAppDispatch();
  const {cart} = useAppSelector(state => state.cart);
  if (getPlatform() === 'web') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    webNavigate = useNavigate();
  }

  useEffect(() => {
    dispatch(getItemsFromStorage());
  }, [dispatch]);

  return (
    <SafeAreaView>
      {getPlatform() === 'web' && (
        <WebHeader header="Products" type="back" backHeader="Cart" />
      )}
      <FlatList
        data={cart}
        renderItem={(item: ICartItem) => <CartItem item={item} />}
        ListEmptyComponent={
          <ScrollView contentContainerStyle={styles.emptyContentContainer}>
            <View style={styles.emptyContainer}>
              {getPlatform() === 'web' && <FaPiggyBank size={50} />}
              <Text style={styles.emptyText}>
                You are too picky. Add some to the cart.
              </Text>
            </View>
          </ScrollView>
        }
        ListFooterComponent={
          <TouchableOpacity
            disabled={!cart.length}
            style={!cart.length ? styles.disabled : styles.footerContainer}
            onPress={() => {
              getPlatform() === 'web'
                ? webNavigate('/orders')
                : navigation.navigate('Order', {});
            }}>
            <Text
              style={
                !cart.length ? styles.disabledText : styles.footerContainerText
              }>
              Proceed to Checkout
            </Text>
            <Text
              style={
                !cart.length ? styles.disabledText : styles.footerContainerText
              }>
              ${getTotal(cart)}
            </Text>
          </TouchableOpacity>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 10,
  },
  emptyContentContainer: {
    alignItems: 'center',
    height: '100%',
  },
  emptyImage: {
    width: 50,
    height: 50,
  },
  emptyText: {
    fontSize: 16,
    marginTop: 8,
  },
  footerOuterContainer: {},
  footerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#DF2E38',
    borderRadius: 8,
    margin: 6,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 15,
    paddingBottom: 15,
  },
  disabled: {
    backgroundColor: 'transparent',
  },
  disabledText: {
    color: 'transparent',
  },
  footerContainerText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  emptyImg: {
    width: 50,
    height: 50,
  },
});

export default CartScreen;
