import React, {FC} from 'react';
import {
  FlatList,
  Image,
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

const CartScreen: FC<ICartScreen> = ({navigation}) => {
  let webNavigate: any = {};
  if (getPlatform() === 'web') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    webNavigate = useNavigate();
  }

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];

  return (
    <SafeAreaView>
      {getPlatform() === 'web' && <WebHeader backHeader="Cart" />}
      <FlatList
        data={DATA}
        renderItem={() => <CartItem />}
        ListEmptyComponent={
          <ScrollView contentContainerStyle={styles.emptyContentContainer}>
            <View style={styles.emptyContainer}>
              <Image
                style={styles.emptyImage}
                source={{
                  uri: 'https://res.cloudinary.com/dury4s2jk/image/upload/v1680938626/smirk_sx0swu.png',
                }}
              />
              <Text style={styles.emptyText}>
                You are too picky. Add some to the cart.
              </Text>
            </View>
          </ScrollView>
        }
        ListFooterComponent={
          <TouchableOpacity
            disabled={!DATA.length}
            style={!DATA.length ? styles.disabled : styles.footerContainer}
            onPress={() => {
              getPlatform() === 'web'
                ? webNavigate('/orders')
                : navigation.navigate('Order', {});
            }}>
            <Text
              style={
                !DATA.length ? styles.disabledText : styles.footerContainerText
              }>
              Proceed to Checkout
            </Text>
            <Text
              style={
                !DATA.length ? styles.disabledText : styles.footerContainerText
              }>
              $1200.99
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
