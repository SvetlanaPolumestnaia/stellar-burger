export const order = {
  _id: '12345',
  status: 'done',
  name: 'Test Burger',
  createdAt: '2024-07-18T19:21:09.981Z',
  updatedAt: '2024-07-18T19:21:10.484Z',
  number: 1,
  ingredients: [
    '643d69a5c3f7b9001cfa093c', // bun
    '643d69a5c3f7b9001cfa0941', // main
    '643d69a5c3f7b9001cfa0942'  // sauce
  ]
};

export const orders = [order];

export const ordersData = {
  orders: orders,
  total: 100,
  totalToday: 5
};
