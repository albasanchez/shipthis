import conn from "../api-connector";
import jwt from "../../common/jwt.service";
const resource = "/item-type";

export default {
  async getItemTypes() {
    let response = await conn.get(
      `${resource}/allactive`,
      jwt.getAuthHeaderToken()
    );
    return response;
  },
  async getCharacteristics() {
    let response = await conn.get(
      `${resource}/characteristics`,
      jwt.getAuthHeaderToken()
    );
    return response;
  },
};
