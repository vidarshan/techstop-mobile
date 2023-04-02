import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../store/store';
import Card from '../components/Card';
//import {getProducts} from '../store/slices/productSlice';
//import Card from '../components/Card';

const ProductsScreen = () => {
  const dispatch = useAppDispatch();
  const {products, loading} = useAppSelector(state => state.products);
  console.log('allStates', products);

  useEffect(() => {
    //dispatch(getProducts());
  }, [dispatch]);

  return (
    <View>
      {loading ? (
        <View>
          <Text>Loading....</Text>
        </View>
      ) : (
        <View style={styles.container}>
          {products.map(product => {
            console.log(product);
            return (
              <Card
                key={product._id}
                _id={product._id}
                name={product.name}
                altImage={product.altImage}
                price={product.price.$numberDouble}
                brand={product.brand}
                category={product.category}
              />
            );
          })}
        </View>
      )}
    </View>
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
