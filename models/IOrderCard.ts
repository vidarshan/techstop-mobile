export interface IOrderCard {
  shippingAddress: any;
  _id: string;
  user?: string;
  orderItems: any[];
  paymentMethod: string;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  isDelivered: boolean;
  createdAt: string;
  updatedAt: string;
  deliveredAt: string;
}
