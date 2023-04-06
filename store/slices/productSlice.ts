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
    _id: '61f55a5762a68fe81c96d895',
    user: '61f550d52bf7a4e12af88ee9',
    name: 'Apple MacBook Pro 13.3 inch',
    image: '/images/macbook.jpeg',
    brand: 'Apple',
    category: 'Laptops',
    description:
      'Apple M1 chip with 8-core CPU, 8-core GPU, 16-core Neural Engine, 8GB unified memory, 256GB SSD storage, 13-inch Retina display with True Tone, Magic Keyboard, Touch Bar and Touch ID, Force Touch trackpad, Two Thunderbolt / USB 4 ports',
    rating: 4,
    numReviews: 5,
    price: 1299.99,
    countInStock: 100,
    reviews: [
      {
        name: 'John Doe',
        rating: 4,
        comment: 'This one is a good one.',
        user: '61f550d52bf7a4e12af88ee9',
        _id: '61f6d08fa8bdd68c3b1e063a',
        createdAt: '2022-01-30T17:53:19.023Z',
        updatedAt: '2022-01-30T17:53:19.023Z',
      },
      {
        name: 'Jake Doe',
        rating: 4,
        comment: 'This one is a good one.',
        user: '61f7673c4b2dce12c541eb88',
        _id: '61f7674d4b2dce12c541eb8d',
        createdAt: '2022-01-31T04:36:29.283Z',
        updatedAt: '2022-01-31T04:36:29.283Z',
      },
      {
        name: 'Steve Smith',
        rating: 5,
        comment: 'Great and powerful laptop',
        user: '61f768334b2dce12c541eb96',
        _id: '61f7684c4b2dce12c541eb9c',
        createdAt: '2022-01-31T04:40:44.026Z',
        updatedAt: '2022-01-31T04:40:44.026Z',
      },
      {
        name: 'John Doe',
        rating: 2,
        comment: 'Not so great😏',
        user: '61f541ad28c60fb31a63c900',
        _id: '61f7947713b9100fafb74f60',
        createdAt: '2022-01-31T07:49:11.429Z',
        updatedAt: '2022-01-31T07:49:11.429Z',
      },
      {
        name: 'Rich Smith',
        rating: 5,
        comment: 'Good',
        user: '61f7dd8438831bef24804f18',
        _id: '61f7ddbc38831bef24804f35',
        createdAt: '2022-01-31T13:01:48.980Z',
        updatedAt: '2022-01-31T13:01:48.980Z',
      },
    ],
    createdAt: '2022-01-29T15:16:39.372Z',
    updatedAt: '2022-01-31T13:01:48.981Z',
    __v: 5,
    altImage:
      'https://res.cloudinary.com/dury4s2jk/image/upload/v1680417407/633c95ef27f191664914927_kyawha.jpg',
  },
  products: [
    {
      _id: {$oid: '61f55a5762a68fe81c96d895'},
      user: {$oid: '61f550d52bf7a4e12af88ee9'},
      name: 'Apple MacBook Pro 13.3 inch',
      image: '/images/macbook.jpeg',
      brand: 'Apple',
      category: 'Laptops',
      description:
        'Apple M1 chip with 8-core CPU, 8-core GPU, 16-core Neural Engine, 8GB unified memory, 256GB SSD storage, 13-inch Retina display with True Tone, Magic Keyboard, Touch Bar and Touch ID, Force Touch trackpad, Two Thunderbolt / USB 4 ports',
      rating: {$numberInt: '4'},
      numReviews: {$numberInt: '5'},
      price: {$numberDouble: '1299.99'},
      countInStock: {$numberInt: '100'},
      reviews: [
        {
          name: 'John Doe',
          rating: {$numberInt: '4'},
          comment: 'This one is a good one.',
          user: {$oid: '61f550d52bf7a4e12af88ee9'},
          _id: {$oid: '61f6d08fa8bdd68c3b1e063a'},
          createdAt: {$date: {$numberLong: '1643565199023'}},
          updatedAt: {$date: {$numberLong: '1643565199023'}},
        },
        {
          name: 'Jake Doe',
          rating: {$numberInt: '4'},
          comment: 'This one is a good one.',
          user: {$oid: '61f7673c4b2dce12c541eb88'},
          _id: {$oid: '61f7674d4b2dce12c541eb8d'},
          createdAt: {$date: {$numberLong: '1643603789283'}},
          updatedAt: {$date: {$numberLong: '1643603789283'}},
        },
        {
          name: 'Steve Smith',
          rating: {$numberInt: '5'},
          comment: 'Great and powerful laptop',
          user: {$oid: '61f768334b2dce12c541eb96'},
          _id: {$oid: '61f7684c4b2dce12c541eb9c'},
          createdAt: {$date: {$numberLong: '1643604044026'}},
          updatedAt: {$date: {$numberLong: '1643604044026'}},
        },
        {
          name: 'John Doe',
          rating: {$numberInt: '2'},
          comment: 'Not so great😏',
          user: {$oid: '61f541ad28c60fb31a63c900'},
          _id: {$oid: '61f7947713b9100fafb74f60'},
          createdAt: {$date: {$numberLong: '1643615351429'}},
          updatedAt: {$date: {$numberLong: '1643615351429'}},
        },
        {
          name: 'Rich Smith',
          rating: {$numberInt: '5'},
          comment: 'Good',
          user: {$oid: '61f7dd8438831bef24804f18'},
          _id: {$oid: '61f7ddbc38831bef24804f35'},
          createdAt: {$date: {$numberLong: '1643634108980'}},
          updatedAt: {$date: {$numberLong: '1643634108980'}},
        },
      ],
      createdAt: {$date: {$numberLong: '1643469399372'}},
      updatedAt: {$date: {$numberLong: '1643634108981'}},
      __v: {$numberInt: '5'},
      altImage:
        'https://res.cloudinary.com/dury4s2jk/image/upload/v1680417407/633c95ef27f191664914927_kyawha.jpg',
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
  return response.data;
});

export const getProduct = createAsyncThunk(
  'product/get',
  async (id: string) => {
    const response = await axios.get(
      `https://tech-stop.onrender.com/api/v1/products/${id}`,
    );
    console.log(response.data);
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
      console.log(action);
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
