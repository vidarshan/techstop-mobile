import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
//import axios from 'axios';

export interface Product {
  _id: any;
  name: string;
  brand?: string;
  category?: string;
  image?: string;
  description?: string;
  rating?: any;
  numReviews?: any;
  price?: any;
  countInStock?: any;
  reviews?: any[];
  altImage: string;
  user?: any;
  createdAt?: any;
  updatedAt?: any;
  __v?: any;
}

interface ProductState {
  products: Product[];
  product: Product;
  loading: boolean;
  error: boolean;
}

const initialState: ProductState = {
  product: {
    _id: '',
    user: '',
    name: '',
    image: '',
    brand: '',
    category: '',
    description: '',
    rating: 4,
    numReviews: 5,
    price: 1299.99,
    countInStock: 100,
    reviews: [],
    createdAt: '',
    updatedAt: '',
    __v: 5,
    altImage: '',
  },
  products: [],
  loading: false,
  error: false,
};

export const getProducts = createAsyncThunk('products/get', async () => {
  const response = await axios.get(
    'https://tech-stop.onrender.com/api/v1/products',
  );
  return response.data;
});

export const getProduct = createAsyncThunk(
  'product/get',
  async (id: string) => {
    const response = await axios.get(
      `https://tech-stop.onrender.com/api/v1/products/${id}`,
    );
    return response.data;
  },
);

export const ProductSlice = createSlice({
  name: 'Product',
  initialState,
  reducers: {
    addProduct: (
      state: ProductState,
      action: PayloadAction<{name: string; id: string; altImage: string}>,
    ) => {
      state.products.push({
        _id: action.payload.id,
        name: action.payload.name,
        altImage: action.payload.altImage,
      });
    },
  },
  extraReducers: builder => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = action.payload.products;
      state.loading = false;
      state.error = false;
    });
    builder.addCase(getProducts.pending, state => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getProducts.rejected, state => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(getProduct.fulfilled, (state, action) => {
      state.product = action.payload;
      state.loading = false;
      state.error = false;
    });
    builder.addCase(getProduct.pending, state => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getProduct.rejected, state => {
      state.loading = false;
      state.error = true;
    });
  },
});

export default ProductSlice.reducer;
export const {addProduct} = ProductSlice.actions;
