import React, {FC} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {ICartItem} from '../models/ICartItem';
import {IoTrash} from 'react-icons/io5';
import {getPlatform} from '../utils/Platform';
import {useAppDispatch} from '../store/store';
import {removeItemFromStorage} from '../store/slices/cartSlice';

const CartItem: FC<ICartItem> = ({item}) => {
  const dispatch = useAppDispatch();

  const removeItem = (id: string) => {
    dispatch(removeItemFromStorage(id));
  };
  return (
    <TouchableOpacity style={styles.itemContainer}>
      <View style={styles.cartItemImageContainer}>
        <Image
          style={styles.cartItemImage}
          source={{
            uri: item.item.image,
          }}
        />
      </View>
      <View style={styles.cartItemTextContainer}>
        <View>
          <Text style={styles.brandName}>{item.item.name}</Text>
          <Text style={styles.itemName}>${item.item.price}</Text>
        </View>
        <TouchableOpacity onPress={() => removeItem(item.item.product)}>
          {getPlatform() === 'web' ? (
            <IoTrash size={20} color="#DF2E38" />
          ) : (
            <Icon name="trash" size={20} color="#DF2E38" />
          )}
        </TouchableOpacity>
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
