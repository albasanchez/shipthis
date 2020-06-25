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
  }
};
