import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {useAppSelector} from '../store/store';
import {ICard} from '../models/ICard';
const Card: React.FC<ICard> = ({
  name,
  brand,
  // description,
  // rating,
  // numReviews,
  price,
  // countInStock,
  // reviews,
  altImage,
}) => {
  console.log(price);
  const products = useAppSelector(state => state.products);
  console.log('products', products);
  return (
    <View style={styles.container}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#cbcbcb',
    shadowRadius: 10,
    shadowOpacity: 1,
    padding: 4,
    width: 150,
    height: 200,
    margin: 4,
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
});

export default Card;
