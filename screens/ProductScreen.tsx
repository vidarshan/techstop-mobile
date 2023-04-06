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
import {useLocation} from 'react-router';
import WebHeader from '../components/WebHeader';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {useAppDispatch, useAppSelector} from '../store/store';
// import {getProduct} from '../store/slices/productSlice';
// import {getProduct} from '../store/slices/productSlice';
// import {ScrollView} from 'react-native-gesture-handler';
// import {getPlatform} from '../utils/Platform';
const ProductScreen: FC<IProductScreen> = ({route, navigation}: any) => {
  let name;
  let brand;
  let description;
  let rating;
  let numReviews;
  let price;
  let countInStock;
  let reviews;
  let image;
  const dispatch = useAppDispatch();
  const {product, loading} = useAppSelector(state => state.products);
  console.log(loading);
  console.log(product);
  console.log(dispatch);
  if (getPlatform() === 'web') {
    let params: any = {};
    // eslint-disable-next-line react-hooks/rules-of-hooks
    params = useLocation();
    console.log(params);
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
  } else {
    name = route.params.name;
    brand = route.params.brand;
    description = route.params.description;
    rating = route.params.rating;
    numReviews = route.params.numReviews;
    price = route.params.price;
    countInStock = route.params.countInStock;
    reviews = route.params.reviews;
    image = route.params.image;
    countInStock = route.params.countInStock;
  }

  useEffect(() => {
    if (getPlatform() === 'web') {
      // dispatch(getProduct('61f55a5762a68fe81c96d895'));
    }
    console.log(product);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  console.log(navigation);
  return (
    <>
      {getPlatform() === 'web' ? (
        <SafeAreaView>
          <WebHeader />
          <ScrollView
            contentContainerStyle={styles.contentContainer}
            style={styles.container}>
            {loading ? (
              <ActivityIndicator color="#DF2E38" size="large" />
            ) : (
              <>
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
                <Text style={styles.rating}>
                  {rating}⭐️⭐️⭐️⭐️⭐️{numReviews}
                </Text>
                {reviews && reviews.length ? (
                  reviews.map((review: any) => {
                    return (
                      <View style={styles.commentCard}>
                        <Text style={styles.commentName}>{review.name}</Text>
                        <Text style={styles.commentContent}>
                          {review.comment}
                        </Text>
                      </View>
                    );
                  })
                ) : (
                  <Text style={styles.commentContent}>No comments</Text>
                )}
                <Icon name="star" size={30} color="#900" />
                <Text>{numReviews}</Text>
                <Text>{price}</Text>
                <Text>{countInStock}</Text>
              </>
            )}
          </ScrollView>
        </SafeAreaView>
      ) : (
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
              <View style={styles.inStockContainer}>
                <Text style={styles.inStock}>
                  {countInStock === '0'
                    ? 'None Available'
                    : `${countInStock} Available`}
                </Text>
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
            <Text style={styles.rating}>
              {rating}⭐️⭐️⭐️⭐️⭐️{numReviews}
            </Text>
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
            <Icon name="star" size={30} color="#900" />
            <Text>{numReviews}</Text>
            <Text>{price}</Text>
            <Text>{countInStock}</Text>
          </ScrollView>
        </SafeAreaView>
      )}
    </>
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
    backgroundColor: '#DF2E38',
    padding: 12,
    borderRadius: 8,
  },
  addToCartText: {
    textAlign: 'center',
    color: '#ffffff',
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
});

export default ProductScreen;
