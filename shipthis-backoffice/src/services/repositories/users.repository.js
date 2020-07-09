import conn from "../api-connector";
import jwt from "../../common/jwt.service";
const resource = "/userdata";

export default {
  async getUsers() {
    let response = await conn.get(
      `${resource}/users`,
      jwt.getAuthHeaderToken()
    );
    return response;
  },
  async updateStatus(userData) {
    let response = await conn.patch(
      `${resource}/users/status`, 
      userData,
      jwt.getAuthHeaderToken()
    );
    return response;
  },
};
