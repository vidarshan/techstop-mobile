export interface IProduct {
  _id: string;
  user: string;
  name: string;
  image: string;
  brand: string;
  category: string;
  description: string;
  rating: number;
  numReviews: number;
  price: number;
  countInStock: number;
  reviews: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  altImage: string;
}
