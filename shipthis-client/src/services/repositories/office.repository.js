import conn from "../api-connector";
import jwt from "../../common/jwt.service";
const resource = "/office";

export default {
  async getOffices() {
    let response = await conn.get(
      `${resource}/allactive`,
      jwt.getAuthHeaderToken()
    );
    return response;
  },
};
