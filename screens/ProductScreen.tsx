import React, {FC} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableHighlight,
  SafeAreaView,
} from 'react-native';
import {IProductScreen} from '../models/IProductScreen';
import {ScrollView} from 'react-native-gesture-handler';

const ProductScreen: FC<IProductScreen> = ({route, navigation}) => {
  const {
    name,
    brand,
    description,
    rating,
    numReviews,
    price,
    countInStock,
    reviews,
    image,
  } = route.params;
  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        style={styles.container}>
        <View style={styles.imgContainer}>
          <Image style={styles.img} source={{uri: image}} />
          <Text style={styles.brand}>{brand}</Text>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${price}</Text>
          </View>
        </View>
        {description?.split(', ').map((item: string) => {
          return (
            <View style={styles.descriptionContainer}>
              <Text style={styles.description}>{item}</Text>
            </View>
          );
        })}
        <TouchableHighlight style={styles.addToCart}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableHighlight>
        <Text>Ratings and Reviews</Text>
        <Text style={styles.rating}>⭐️⭐️⭐️⭐️⭐️{rating}</Text>
        {/* <Icon name="star" size={30} color="#900" /> */}
        {/* <Text>{numReviews}</Text>
      <Text>{price}</Text>
      <Text>{countInStock}</Text>
      <Text>{reviews}</Text> */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: '#fff',
  },
  container: {
    padding: 10,
    backgroundColor: '#fff',
  },
  imgContainer: {
    marginBottom: 10,
    alignItems: 'center',
  },
  img: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
  brand: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '500',
    color: '#7d7d7d',
  },
  name: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '500',
  },
  descriptionContainer: {
    marginTop: 8,
  },
  description: {
    fontSize: 14,
    color: '#787878',
  },
  rating: {
    marginTop: 8,
  },
  priceContainer: {
    alignItems: 'center',
  },
  price: {
    marginTop: 14,
    fontSize: 20,
    fontWeight: '600',
    color: '#3d7100',
  },
  addToCart: {
    marginTop: 10,
    backgroundColor: 'red',
    padding: 12,
    borderRadius: 8,
  },
  addToCartText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '500',
  },
});

export default ProductScreen;
