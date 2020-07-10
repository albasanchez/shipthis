import conn from "../api-connector";
import jwt from "../../common/jwt.service";
const resource = "/discount";

export default {
  async getDiscounts() {
    let response = await conn.get(
      `${resource}/discounts`,
      jwt.getAuthHeaderToken()
    );
    return response;
  },
  async assignDiscount(discount) {
    let response = await conn.post(
      `${resource}/assign-discount`,
      discount,
      jwt.getAuthHeaderToken()
    );
    return response;
  },
  async updateDiscount(discount_id,discount) {
    let response = await conn.patch(
      `${resource}/update-discount/${discount_id}`,
      discount,
      jwt.getAuthHeaderToken()
    );
    return response;
  },
  async deleteDiscount(discount_id) {
    let response = await conn.delete(
      `${resource}/delete-discount/${discount_id}`,
      jwt.getAuthHeaderToken()
    );
    return response;
  },
  async createDiscount(discount) {
    let response = await conn.post(
      `${resource}/create-discount`,
      discount,
      jwt.getAuthHeaderToken()
    );
    return response;
  },
  async assignmultipleDiscounts(discount) {
    let response = await conn.post(
      `${resource}/assign-multiple-discounts`,
      discount,
      jwt.getAuthHeaderToken()
    );
    return response;
  },

}