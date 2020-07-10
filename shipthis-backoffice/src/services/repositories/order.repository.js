import conn from "../api-connector";
import jwt from "../../common/jwt.service";
const resource = "/ordersheet";

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
      `${resource}/history-order`,
      userEmail,
      jwt.getAuthHeaderToken()
    );
    return response;
  }
};
