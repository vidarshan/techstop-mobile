import React from 'react';
import {Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {ICard} from '../models/ICard';
import {getPlatform} from '../utils/Platform';
const Card: React.FC<ICard> = ({
  _id,
  name,
  brand,
  description,
  rating,
  numReviews,
  price,
  countInStock,
  reviews,
  altImage,
  navigation,
  webNavigation,
}) => {
  console.log(navigation.navigate);
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        getPlatform() === 'web'
          ? webNavigation(`product/${_id.$oid}`)
          : navigation.navigate('Product', {
              image: altImage,
              name,
              brand,
              description,
              rating,
              numReviews,
              price,
              countInStock,
              reviews,
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
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Add to Cart</Text>
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
    backgroundColor: '#DF2E38',
    padding: 8,
    borderRadius: 8,
    width: '100%',
    marginTop: 10,
    marginLeft: 6,
    marginRight: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default Card;
