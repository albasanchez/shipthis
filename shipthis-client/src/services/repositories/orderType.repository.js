import conn from "../api-connector";
import jwt from "../../common/jwt.service";
const resource = "/order-type";

export default {
  async getOrderTypes() {
    let response = await conn.get(
      `${resource}/allactive`,
      jwt.getAuthHeaderToken()
    );
    return response;
  },
};
