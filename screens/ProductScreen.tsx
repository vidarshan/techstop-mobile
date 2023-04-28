import React, {FC, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import {IProductScreen} from '../models/IProductScreen';
import {getPlatform} from '../utils/Platform';
import WebHeader from '../components/WebHeader';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {useAppDispatch, useAppSelector} from '../store/store';
import {IoIosStar} from 'react-icons/io';
import {getProduct} from '../store/slices/productSlice';
import {setItemsToStorage} from '../store/slices/cartSlice';
const ProductScreen: FC<IProductScreen> = ({route}) => {
  let name;
  let brand;
  let description;
  let rating;
  let numReviews;
  let price;
  let countInStock;
  let reviews;
  let image;
  let id;
  const dispatch = useAppDispatch();
  const {product, loading} = useAppSelector(state => state.products);
  name = product.name;
  brand = product.brand;
  description = product.description;
  rating = product.rating;
  numReviews = product.numReviews;
  price = product.price;
  countInStock = product.countInStock;
  reviews = product.reviews;
  image = product.altImage;
  countInStock = product.countInStock;

  if (getPlatform() === 'web') {
    id = location.pathname.split('/product/')[1];
  } else {
    id = route.params.id;
  }

  const addToCart = (
    productImage: string,
    productName: string,
    productPrice: number,
    productId: string,
  ) => {
    const cartItemObj = {
      product: productId,
      image: productImage,
      name: productName,
      price: productPrice,
    };
    dispatch(setItemsToStorage(cartItemObj));
  };

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  return (
    <SafeAreaView>
      {getPlatform() === 'web' && (
        <WebHeader header="Products" rightPath="/cart" back type="back" />
      )}
      {loading ? (
        <ActivityIndicator color="#000" size="large" />
      ) : (
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
            <View style={styles.inStockContainer}>
              <Text style={styles.inStock}>
                {countInStock === '0'
                  ? 'None Available'
                  : `${countInStock} Available`}
              </Text>
            </View>
          </View>
          {description?.split(', ').map((item: string, index: number) => {
            return (
              <View key={index} style={styles.descriptionContainer}>
                <Text style={styles.description}>{item}</Text>
              </View>
            );
          })}
          <TouchableHighlight
            style={styles.addToCart}
            onPress={() => addToCart(image, name, price, id)}>
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableHighlight>
          <Text>Ratings and Reviews</Text>
          <View style={styles.reviewContainer}>
            {getPlatform() === 'web' ? (
              <IoIosStar color="orange" size={20} />
            ) : (
              <Icon name="star" size={30} color="#f37900" />
            )}
            <View style={styles.reviewRow}>
              <Text style={styles.ratingText}>
                {parseInt(rating, 10).toFixed(1)}
              </Text>
              <Text>{numReviews} reviews</Text>
            </View>
          </View>
          {reviews && reviews.length ? (
            reviews.map((review: any) => {
              return (
                <View style={styles.commentCard}>
                  <Text style={styles.commentName}>{review.name}</Text>
                  <Text style={styles.commentContent}>{review.comment}</Text>
                </View>
              );
            })
          ) : (
            <Text style={styles.commentContent}>No comments</Text>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: '#fff',
    marginTop: 8,
    marginLeft: 8,
    marginRight: 8,
  },
  container: {
    padding: 10,
    backgroundColor: '#fff',
  },
  imgContainer: {
    marginBottom: 20,
    alignItems: 'center',
    position: 'relative',
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
    position: 'absolute',
    justifyContent: 'center',
    right: 10,
    top: 0,
    alignItems: 'center',
    backgroundColor: '#5D9C59',
    padding: 10,
    borderRadius: 8,
    zIndex: 1000,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  addToCart: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: '#fbc405',
    padding: 12,
    borderRadius: 8,
  },
  addToCartText: {
    textAlign: 'center',
    color: '#000000',
    fontWeight: '500',
    fontSize: 16,
  },
  inStockContainer: {
    marginTop: 8,
    backgroundColor: '#5D9C59',
    padding: 6,
    borderRadius: 8,
  },
  inStock: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
  commentCard: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 10,
    padding: 10,
  },
  commentName: {
    fontSize: 14,
    fontWeight: '600',
  },
  commentContent: {
    fontSize: 14,
    fontStyle: 'italic',
    marginTop: 10,
  },
  reviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  reviewRow: {
    marginLeft: 10,
  },
  ratingText: {
    fontSize: 24,
  },
});

export default ProductScreen;
