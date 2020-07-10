import conn from "../api-connector";
import jwt from "../../common/jwt.service";
const resource = "/userdata/users";

export default {
  async updateProfile(user) {
    let response = await conn.patch(
      `${resource}/data`,
      user,
      jwt.getAuthHeaderToken()
    );
    return response;
  },
  async updatePassword(payload) {
    let response = await conn.patch(
      `${resource}/password`,
      payload,
      jwt.getAuthHeaderToken()
    );
    return response;
  },
  async deleteAccount(id) {
    let response = await conn.delete(
      `${resource}/${id}`,
      jwt.getAuthHeaderToken()
    );
    return response;
  },
};
