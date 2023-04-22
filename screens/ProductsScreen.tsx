import React, {FC, useEffect} from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '../store/store';
import Card from '../components/Card';
import {IProductsScreen} from '../models/IProductsScreen';
//import {getProducts} from '../store/slices/productSlice';
import {resetErrors} from '../store/slices/userSlice';
import {getPlatform} from '../utils/Platform';
import {useNavigate} from 'react-router-dom';
import WebHeader from '../components/WebHeader';
import {useLocation} from 'react-router-dom';

const ProductsScreen: FC<IProductsScreen> = ({navigation}) => {
  let webNavigation = {};
  let location = {};
  if (getPlatform() === 'web') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    location = useLocation();
  }

  const dispatch = useAppDispatch();
  if (getPlatform() === 'web') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    webNavigation = useNavigate();
  }

  const {loading, products} = useAppSelector(state => state.products);

  useEffect(() => {
    //dispatch(getProducts());
    dispatch(resetErrors());
  }, [dispatch]);
  return (
    <ScrollView style={styles.page}>
      <SafeAreaView>
        {getPlatform() === 'web' && (
          <View>
            <WebHeader
              type="dual"
              leftPath="/user"
              rightPath="/cart"
              backHeader="Products"
              header="Products"
              back
            />
          </View>
        )}
        <View style={styles.container}>
          {loading ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color="#fbc405" />
            </View>
          ) : (
            <>
              {products.map((product, index) => {
                return (
                  <Card
                    key={index}
                    _id={product._id}
                    name={product.name}
                    altImage={product.altImage}
                    price={product.price.$numberDouble}
                    brand={product.brand}
                    category={product.category}
                    description={product.description}
                    rating={product.rating.$numberInt}
                    numReviews={product.numReviews.$numberInt}
                    countInStock={product.numReviews.$numberInt}
                    reviews={product.reviews}
                    navigation={navigation}
                    webNavigation={webNavigation}
                    location={location}
                  />
                );
              })}
            </>
          )}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  item: {
    backgroundColor: '#7cb48f',
    width: 150,
    height: 100,
    margin: 4,
  },
  webHeader: {
    backgroundColor: '#fbc405',
    padding: 20,
  },
  webHeaderText: {
    color: '#fff',
    textAlign: 'center',
  },
  loaderContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: getPlatform() === 'web' ? '100vh' : 100,
  },
});

export default ProductsScreen;
