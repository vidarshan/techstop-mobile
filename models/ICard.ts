export interface ICard {
  _id: string;
  name: string;
  brand?: string;
  category?: string;
  description?: string;
  rating?: number;
  numReviews?: number;
  price?: number;
  countInStock?: number;
  reviews?: any[];
  altImage: string;
  navigation?: any;
  webNavigation?: any;
}
