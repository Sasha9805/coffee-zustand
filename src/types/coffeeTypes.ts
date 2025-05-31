export type CoffeeType = {
  id: number;
  name: string;
  subTitle: string;
  type: string;
  price: number;
  image: string;
  rating: number;
};

export type GetCoffeeListRequestParams = {
  text?: string;
};

export type OrderItem = {
  id: number;
  name: string;
  size: "L";
  quantity: number;
};

export type OrderCoffeeRequest = {
  address: string;
  orderItems: OrderItem[];
};

export type OrderCoffeeResponse = {
  message: string;
  success: boolean;
};
