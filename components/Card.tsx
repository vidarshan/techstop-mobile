import React, {useRef} from 'react';
import {Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {ICard} from '../models/ICard';
import {getPlatform} from '../utils/Platform';
import {setItemsToStorage} from '../store/slices/cartSlice';
import {useAppDispatch} from '../store/store';
const Card: React.FC<ICard> = ({
  _id,
  name,
  brand,
  price,
  altImage,
  navigation,
  webNavigation,
}) => {
  const cartString = useRef('Add to Cart');
  const dispatch = useAppDispatch();
  const addItemToCart = (
    productId: any,
    productImage: string,
    productName: string,
    productPrice: number,
  ) => {
    const cartItemObj = {
      product: productId,
      image: productImage,
      name: productName,
      price: productPrice,
    };
    console.log(productPrice);
    console.log(cartItemObj);
    dispatch(setItemsToStorage(cartItemObj));
    cartString.current = 'Added';
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        getPlatform() === 'web'
          ? webNavigation(`product/${_id}`)
          : navigation.navigate('Product', {
              id: _id,
            });
      }}>
      <Image
        resizeMode="contain"
        style={{height: 100, width: 100}}
        source={{
          uri: altImage,
        }}
      />
      <Text ellipsizeMode="tail" style={styles.brand}>
        {brand}
      </Text>
      <Text ellipsizeMode="tail" style={styles.title}>
        {name}
      </Text>
      <Text style={styles.price}>${price}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => addItemToCart(_id, altImage, name, price)}>
        <Text style={styles.buttonText}>{cartString.current}</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#cbcbcb',
    shadowRadius: 10,
    shadowOpacity: 1,
    padding: 4,
    width: 170,
    minHeight: 220,
    margin: 8,
  },
  title: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 8,
  },
  brand: {
    fontSize: 12,
    color: '#737373',
    marginBottom: 6,
  },
  price: {
    fontWeight: '500',
    fontSize: 18,
  },
  button: {
    backgroundColor: '#fbc405',
    padding: 8,
    borderRadius: 8,
    width: '100%',
    marginTop: 10,
    marginLeft: 6,
    marginRight: 6,
  },
  buttonText: {
    color: '#000000',
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default Card;
