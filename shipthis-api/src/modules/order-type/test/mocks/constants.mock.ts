export const updateOrderType = {
  id: 1,
  time_tax: 0.1,
  holidays_tax: 0.5,
  specific_destination_tax: 0.2,
};

export const orderType = {
  order_type_id: 1,
  name: 'Silver',
  days_to_deliver: 3,
  status: 'ACTIVE',
  prices: [],
};

export const orderPriceHist = {
  order_price_hist_id: 1,
  starting_date: new Date(),
  ending_date: new Date(),
  time_tax: 0.1,
  holidays_tax: 0.5,
  specific_destination_tax: 0.2,
  order_type: {},
  ordersheets: [],
};
