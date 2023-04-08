import React, {FC} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {ICartItem} from '../models/ICartItem';

const CartItem: FC<ICartItem> = ({item}) => {
  console.log(item);
  return (
    <TouchableOpacity style={styles.itemContainer}>
      <View style={styles.cartItemImageContainer}>
        <Image
          style={styles.cartItemImage}
          source={{
            uri: 'https://res.cloudinary.com/dury4s2jk/image/upload/v1680417407/633c95ef27f191664914927_kyawha.jpg',
          }}
        />
      </View>
      <View style={styles.cartItemTextContainer}>
        <View>
          <Text style={styles.brandName}>CartItem</Text>
          <Text style={styles.itemName}>CartItem</Text>
          <Text>1 Nos.</Text>
        </View>
        <Icon name="trash" size={20} color="#DF2E38" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 4,
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    marginTop: 10,
    padding: 10,
    backgroundColor: '#fff',
  },
  cartItemImageContainer: {
    marginRight: 10,
  },
  cartItemTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  cartItemImage: {
    width: 60,
    height: 60,
    borderRadius: 4,
  },
  brandName: {
    fontSize: 14,
    fontWeight: '400',
    color: '#7d7d7d',
  },
  itemName: {
    fontSize: 18,
    fontWeight: '400',
  },
});

export default CartItem;
