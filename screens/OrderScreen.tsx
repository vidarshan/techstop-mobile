import React from 'react';
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

const OrderScreen = () => {
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
          style={styles.inputField}
          onChangeText={e => console.log(e)}
          placeholder="Phone number"
        />
        <TextInput
          style={styles.inputField}
          onChangeText={e => console.log(e)}
          placeholder="Email Address"
        />
        <View style={styles.inputFieldRow}>
          <TextInput
            style={styles.halfInputField}
            onChangeText={e => console.log(e)}
            placeholder="House Number"
          />
          <TextInput
            style={styles.halfInputField}
            onChangeText={e => console.log(e)}
            placeholder="Address Line"
          />
        </View>
        <TextInput
          style={styles.inputField}
          onChangeText={e => console.log(e)}
          placeholder="Phone number"
        />
        <TextInput
          style={styles.inputField}
          onChangeText={e => console.log(e)}
          placeholder="City"
        />
        <TextInput
          style={styles.inputField}
          onChangeText={e => console.log(e)}
          placeholder="Country"
        />
      </View>

      <TouchableOpacity style={styles.placeOrderBtn}>
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
    backgroundColor: '#DF2E38',
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
    color: 'white',
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
});

export default OrderScreen;
