import conn from "../api-connector";
import jwt from "../../common/jwt.service";
const resource = "/userdata";

export default {
  async getReceivers(userId) {
    let response = await conn.get(
      `${resource}/receivers/${userId}`,
      jwt.getAuthHeaderToken()
    );
    return response;
  },
  async createReceiver(receiver) {
    let response = await conn.post(
      `${resource}/create-receiver`,
      receiver,
      jwt.getAuthHeaderToken()
    );
    return response;
  },
  async updateReceiver(receiverId, receiver) {
    let response = await conn.patch(
      `${resource}/update-receiver/${receiverId}`,
      receiver,
      jwt.getAuthHeaderToken()
    );
    return response;
  },
  async deleteReceiver(receiverId) {
    let response = await conn.delete(
      `${resource}/delete-receiver/${receiverId}`,
      jwt.getAuthHeaderToken()
    );
    return response;
  },
};
