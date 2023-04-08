import React from 'react';
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

const CartScreen = () => {
  const DATA = [
    // {
    //   id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    //   title: 'First Item',
    // },
    // {
    //   id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    //   title: 'Second Item',
    // },
    // {
    //   id: '58694a0f-3da1-471f-bd96-145571e29d72',
    //   title: 'Third Item',
    // },
  ];

  return (
    <SafeAreaView>
      <FlatList
        data={DATA}
        renderItem={() => <CartItem />}
        ListEmptyComponent={
          <ScrollView contentContainerStyle={styles.emptyContentContainer}>
            <View style={styles.emptyContainer}>
              <Image
                style={{width: 50, height: 50}}
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
            style={!DATA.length ? styles.disabled : styles.footerContainer}>
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
    margin: 8,
    padding: 10,
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
});

export default CartScreen;
