import conn from "../api-connector";
import jwt from "../../common/jwt.service";
const resource = "/ordersheet";
const resource2 = "/discount";

export default {
  async searchOrderDetail(orderId) {
    let response = await conn.post(`${resource}/detail`, orderId);
    return response;
  },
  async createOrder(orderData) {
    await conn.post(`${resource}/create`, orderData, jwt.getAuthHeaderToken());
  },
  async getOrdersByUser(userEmail) {
    let response = await conn.post(
      `${resource}/history-bill`,
      userEmail,
      jwt.getAuthHeaderToken()
    );
    return response;
  },
  async validateDirection(address) {
    let response = await conn.post(
      `${resource}/address-validation`,
      address,
      jwt.getAuthHeaderToken()
    );
    return response;
  },
  async calculatePrices(order) {
    let response = await conn.post(
      `${resource}/calculate-order`,
      order,
      jwt.getAuthHeaderToken()
    );
    return response;
  },
  async registerOrder(order) {
    let response = await conn.post(
      `${resource}/register-order`,
      order,
      jwt.getAuthHeaderToken()
    );
    return response;
  },
  async UserDiscounts(email) {
    let response = await conn.post(
      `${resource2}/avaliable-discounts`,
      email,
      jwt.getAuthHeaderToken()
    );
    return response;
  },
};
