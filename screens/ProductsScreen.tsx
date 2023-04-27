import React, {FC, useEffect, useState} from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TextInput,
  Text,
  TouchableOpacity,
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
import {getProducts} from '../store/slices/productSlice';
import {getInfoFromStorage} from '../store/slices/orderSlice';
import {FaSearch} from 'react-icons/fa';

const ProductsScreen: FC<IProductsScreen> = ({navigation}) => {
  let webNavigation = {};
  let location = {};
  const [currentPage, setCurrentPage] = useState(1);
  if (getPlatform() === 'web') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    location = useLocation();
  }

  const dispatch = useAppDispatch();
  if (getPlatform() === 'web') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    webNavigation = useNavigate();
  }
  const {loading, products, pages, pagination} = useAppSelector(
    state => state.products,
  );
  const getPagination = () => {
    var elements: JSX.Element[] = [];
    for (let i = 1; i <= pages; i++) {
      elements.push(
        <TouchableOpacity
          onPress={() => setCurrentPage(i)}
          style={
            pagination.toString() === i.toString()
              ? styles.paginationItem
              : styles.selectedPaginationItem
          }>
          <Text
            style={
              pagination.toString() === i.toString()
                ? styles.paginationItemText
                : styles.selectedPaginationItemText
            }>
            {i.toString()}
          </Text>
        </TouchableOpacity>,
      );
    }

    return elements;
  };

  useEffect(() => {
    dispatch(getProducts(currentPage));
    dispatch(getInfoFromStorage());
    dispatch(resetErrors());
  }, [currentPage, dispatch]);
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
        <View style={{margin: 8}}>
          <View style={styles.searchInputRow}>
            {getPlatform() === 'web' && <FaSearch color="#828282" />}
            <TextInput
              style={styles.searchInput}
              placeholder="Search for a product"
            />
          </View>
        </View>
        <View style={styles.container}>
          {loading ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color="#000" />
            </View>
          ) : (
            <>
              {products.map((product, index) => {
                console.log(product);
                return (
                  <Card
                    key={index}
                    _id={product._id}
                    name={product.name}
                    altImage={product.altImage}
                    price={product.price}
                    brand={product.brand}
                    category={product.category}
                    description={product.description}
                    rating={product.rating}
                    numReviews={product.numReviews}
                    countInStock={product.numReviews}
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
        <View style={styles.paginationRow}>{getPagination()}</View>
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
  searchInputRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 8,
  },
  searchInput: {
    borderColor: '#e2e2e2',
    borderWidth: 1,
    borderRadius: 8,
    height: 36,
    width: '100%',
    marginLeft: 6,
    paddingLeft: 4,
  },
  paginationRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 8,
  },
  paginationItem: {
    backgroundColor: '#fbc405',
    padding: 8,
    margin: 4,
    borderRadius: 4,
  },
  paginationItemText: {
    color: '#000000',
  },
  selectedPaginationItem: {
    backgroundColor: '#000000',
    padding: 8,
    margin: 4,
    borderRadius: 4,
  },
  selectedPaginationItemText: {
    color: '#ffffff',
  },
});

export default ProductsScreen;
