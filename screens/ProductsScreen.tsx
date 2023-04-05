import React, {FC, useEffect} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../store/store';
import Card from '../components/Card';
// import {Link} from 'react-router-dom';
import {IProductsScreen} from '../models/IProductsScreen';

const ProductsScreen: FC<IProductsScreen> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const {products, loading} = useAppSelector(state => state.products);

  useEffect(() => {}, [dispatch]);

  return (
    <>
      {Platform.OS === 'web' ? (
        <Text>DD</Text>
      ) : (
        <View>
          {loading ? (
            <View style={{backgroundColor: 'red', height: 300}}>
              <Text>Loading....</Text>
            </View>
          ) : (
            <View style={styles.container}>
              <View>
                {/* {Platform.OS === 'web' && <Link to="/product">Home</Link>} */}
              </View>

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
                  />
                );
              })}
            </View>
          )}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
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
});

export default ProductsScreen;
