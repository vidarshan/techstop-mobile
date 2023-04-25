import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {IOrderCard} from '../models/IOrderCard';
import moment from 'moment';

const OrderCard: FC<IOrderCard> = ({
  shippingAddress,
  _id,
  orderItems,
  totalPrice,
  isPaid,
  isDelivered,
  createdAt,
}) => {
  return (
    <View style={styles.orderCardContainer}>
      <Text style={styles.text}>Order ID {_id}</Text>
      <Text style={styles.addressContainer}>
        {shippingAddress.address}, {shippingAddress.city},{' '}
        {shippingAddress.postalCode}, {shippingAddress.country}
      </Text>
      <View style={styles.divider} />
      <View>
        {orderItems.map(item => {
          return (
            <View>
              <Text>
                {item.name} x {item.qty.toString()} {item.price} each
              </Text>
            </View>
          );
        })}
      </View>
      <View style={styles.divider} />
      <Text style={styles.text}>Total {totalPrice}</Text>
      <View style={styles.divider} />
      <Text style={styles.text}>
        Placed On {moment(createdAt).format('DD-MM-YYYY')}
      </Text>
      <View style={styles.divider} />
      <View style={styles.chipRow}>
        <View style={styles.paidChip}>
          <Text style={styles.chipText}>{isPaid ? 'Paid' : 'Not Paid'}</Text>
        </View>
        <View style={styles.deliveredChip}>
          <Text style={styles.chipText}>
            {isDelivered ? 'Delivered' : 'Not Delivered'}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  orderCardContainer: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
  },
  divider: {
    height: 1,
    marginTop: 19,
    marginBottom: 10,
    backgroundColor: '#b0b0b0',
  },
  deliveredChip: {
    backgroundColor: '#45ac00',
    borderRadius: 50,
    paddingTop: 4,
    paddingBottom: 4,
    paddingRight: 8,
    paddingLeft: 8,
    margin: 4,
  },
  paidChip: {
    backgroundColor: '#c2000a',
    borderRadius: 50,
    paddingTop: 4,
    paddingBottom: 4,
    paddingRight: 8,
    paddingLeft: 8,
    margin: 4,
  },
  chipText: {
    color: '#fff',
    fontWeight: '600',
  },
  chipRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  text: {
    fontSize: 16,
  },
  addressContainer: {marginTop: 10, fontSize: 12},
});

export default OrderCard;
