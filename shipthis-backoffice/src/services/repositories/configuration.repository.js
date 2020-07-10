import conn from "../api-connector";
import jwt from "../../common/jwt.service";
const resource = "/item-type";
const resource2 = "/simulation";

export default {
  async getPrices() {
    let response = await conn.get(
      `${resource}/current-price`,
      jwt.getAuthHeaderToken()
    );
    return response;
  },
  async getConfigTime() {
    let response = await conn.get(
      `${resource2}/current-config-time`,
      jwt.getAuthHeaderToken()
    );
    return response;
  },
  async updatePrices(currentPrices) {
    let response = await conn.post(
      `${resource}/updateItemHistory`,
      currentPrices,
      jwt.getAuthHeaderToken()
    );
    return response;
  },
  async updateTime(configTime) {
    let response = await conn.post(
      `${resource2}/update-config-time`,
      configTime,
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
  async updateCharacteristic(characteristic) {
    let response = await conn.post(
      `${resource}/updateCharHistory`,
      characteristic,
      jwt.getAuthHeaderToken()
    );
    return response;
  },
};
