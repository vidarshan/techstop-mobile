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
  loading: boolean;
  error: boolean;
}

const initialState: ProductState = {
  products: [
    {
      _id: {$oid: '61fa9d3c54d0d0a51edccdea'},
      user: {$oid: '61f550d52bf7a4e12af88ee9'},
      name: 'Macbook Pro 14" M2 Pro',
      image: '/images/dell9.jpeg',
      brand: 'Dell',
      category: 'Accessories',
      description:
        'Rechargeable lithium ion battery, Standard Keyboard and mouse',
      rating: {$numberInt: '0'},
      numReviews: {$numberInt: '0'},
      price: {$numberDouble: '199.99'},
      countInStock: {$numberInt: '100'},
      reviews: [],
      createdAt: {$date: {$numberLong: '1643814204114'}},
      updatedAt: {$date: {$numberLong: '1643814204114'}},
      __v: {$numberInt: '0'},
      altImage:
        'https://res.cloudinary.com/dury4s2jk/image/upload/v1680417980/63ce49ee1ebbe1674463726_idwotp.jpg',
    },
    {
      _id: {$oid: '61fa9e1554d0d0a51edcce08'},
      user: {$oid: '61f550d52bf7a4e12af88ee9'},
      name: 'HP Neverstop 1200a',
      image: '/images/hp1.jpeg',
      brand: 'HP',
      category: 'Accessories',
      description:
        'Copy, Scan, Unique Mess Free Reloading, Save upto 80% on Genuine toner, 5X Print yield',
      rating: {$numberInt: '5'},
      numReviews: {$numberInt: '1'},
      price: {$numberDouble: '499.99'},
      countInStock: {$numberInt: '100'},
      reviews: [
        {
          name: 'John Doe',
          rating: {$numberInt: '5'},
          comment: 'Great',
          user: {$oid: '61f550d52bf7a4e12af88ee9'},
          _id: {$oid: '620bbbb42dda61490288cd5f'},
          createdAt: {$date: {$numberLong: '1644936116691'}},
          updatedAt: {$date: {$numberLong: '1644936116691'}},
        },
      ],
      createdAt: {$date: {$numberLong: '1643814421916'}},
      updatedAt: {$date: {$numberLong: '1644936116692'}},
      __v: {$numberInt: '1'},
      altImage:
        'https://res.cloudinary.com/dury4s2jk/image/upload/v1680417980/63ce49ee1ebbe1674463726_idwotp.jpg',
    },
    {
      _id: {$oid: '61fabb3154d0d0a51edccee6'},
      user: {$oid: '61f550d52bf7a4e12af88ee9'},
      name: 'Apple iPhone XR Yellow 256GB',
      image: '/images/iphone3.jpeg',
      brand: 'Apple',
      category: 'Phones',
      description:
        '4K video recording at 24 fps, 12MP camera,Digital zoom up to 5x,ƒ/1.8, Dual SIM, iOS 12 Operating System, A12 Bionic chip, Wireless charging',
      rating: {$numberInt: '5'},
      numReviews: {$numberInt: '1'},
      price: {$numberDouble: '399.99'},
      countInStock: {$numberInt: '100'},
      reviews: [
        {
          name: 'John Doe',
          rating: {$numberInt: '5'},
          comment: 'sfsd',
          user: {$oid: '61f550d52bf7a4e12af88ee9'},
          _id: {$oid: '620bbaa23e8e467653881bfb'},
          createdAt: {$date: {$numberLong: '1644935842622'}},
          updatedAt: {$date: {$numberLong: '1644935842622'}},
        },
      ],
      createdAt: {$date: {$numberLong: '1643821873763'}},
      updatedAt: {$date: {$numberLong: '1644935842622'}},
      __v: {$numberInt: '1'},
      altImage:
        'https://res.cloudinary.com/dury4s2jk/image/upload/v1680417980/63ce49ee1ebbe1674463726_idwotp.jpg',
    },
    {
      _id: {$oid: '620a93b3b27510e69de787e2'},
      user: {$oid: '61f550d52bf7a4e12af88ee9'},
      name: 'efwefw',
      image: '/uploads/image-1644860061828.png',
      brand: 'fwefwefw',
      category: 'Laptops',
      description: 'ewfewfdfsdf',
      rating: {$numberInt: '0'},
      numReviews: {$numberInt: '0'},
      price: {$numberInt: '105'},
      countInStock: {$numberInt: '0'},
      reviews: [],
      createdAt: {$date: {$numberLong: '1644860339049'}},
      updatedAt: {$date: {$numberLong: '1644860339049'}},
      __v: {$numberInt: '0'},
      altImage:
        'https://res.cloudinary.com/dury4s2jk/image/upload/v1680417980/63ce49ee1ebbe1674463726_idwotp.jpg',
    },
    {
      _id: {$oid: '61fa9cf654d0d0a51edccdd5'},
      user: {$oid: '61f550d52bf7a4e12af88ee9'},
      name: 'Dell Laser Wired Mouse MS3220LSR',
      image: '/images/dell8.jpeg',
      brand: 'Dell',
      category: 'Accessories',
      description:
        'Dual mode wired, Rechargeable lithium ion battery, Seven programmable buttons',
      rating: {$numberInt: '0'},
      numReviews: {$numberInt: '0'},
      price: {$numberDouble: '199.99'},
      countInStock: {$numberInt: '100'},
      reviews: [],
      createdAt: {$date: {$numberLong: '1643814134029'}},
      updatedAt: {$date: {$numberLong: '1643814134029'}},
      __v: {$numberInt: '0'},
      altImage:
        'https://res.cloudinary.com/dury4s2jk/image/upload/v1680417980/63ce49ee1ebbe1674463726_idwotp.jpg',
    },
  ],
  loading: false,
  error: false,
};

export const getProducts = createAsyncThunk('products/get', async () => {
  const response = await axios.get(
    'https://tech-stop.onrender.com/api/v1/products',
  );
  console.log('response.data', response.data);
  return response.data;
});

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
  },
});

export default ProductSlice.reducer;
export const {addProduct} = ProductSlice.actions;
