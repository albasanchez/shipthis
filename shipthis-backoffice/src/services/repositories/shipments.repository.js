import conn from "../api-connector";
import jwt from "../../common/jwt.service";
const resource = "/ordersheet";

export default {
  async getShipmentsbyStatus() {
    let response = await conn.get(
      `${resource}/orders-total`,
      jwt.getAuthHeaderToken()
    );
    return response;
  },
  async getShipments() {
    let response = await conn.get(
      `${resource}/orders`,
      jwt.getAuthHeaderToken()
    );
    return response;
  }
};
