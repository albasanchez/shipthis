import conn from "../api-connector";
import jwt from "../../common/jwt.service";
const resource = "/comment-box";

export default {
  async getComments() {
    let response = await conn.get(`${resource}`, jwt.getAuthHeaderToken());
    return response;
  },
  async updateComment(commentData) {
    let response = await conn.patch(`${resource}`, commentData, jwt.getAuthHeaderToken());
    return response;
  },
};
