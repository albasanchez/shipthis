import conn from "../api-connector";
import jwt from "../../common/jwt.service";
const resource = "/commercial-ally";

export default {
  async createCommercialAlly(commercialAlly) {
    let response = await conn.post(
      `${resource}/create-commercial-ally`,
      commercialAlly,
      jwt.getAuthHeaderToken()
    );
    return response;
  },
  async getCommercialAllies() {
    let response = await conn.get(
      `${resource}/commercial-allies`,
      jwt.getAuthHeaderToken()
    );
    return response;
  },
  async updateCommercialAlly(commercialAlly) {
    let response = await conn.post(
      `${resource}/update-commercial-ally`,
      commercialAlly,
      jwt.getAuthHeaderToken()
    );
    return response;
  },
  async deleteCommercialAlly(commercialAlly) {
    let response = await conn.post(
      `${resource}/delete-commercial-ally`,
      commercialAlly,
      jwt.getAuthHeaderToken()
    );
    return response;
  },
  async getCommercialAllysWarehouses(commercialAlly) {
    let response = await conn.post(
      `${resource}/commercial-ally-warehouses`,
      commercialAlly,
      jwt.getAuthHeaderToken()
    );
    return response;
  },
  async addWarehouseToCommercialAlly(warehouse) {
    let response = await conn.post(
      `${resource}/create-warehouse`,
      warehouse,
      jwt.getAuthHeaderToken()
    );
    return response;
  },
  async updateWarehouse(warehouseId, warehouse) {
    let response = await conn.patch(
      `${resource}/update-warehouse/${warehouseId}`,
      warehouse,
      jwt.getAuthHeaderToken()
    );
    return response;
  },
  async deleteWarehouse(warehouseId) {
    let response = await conn.delete(
      `${resource}/delete-warehouse/${warehouseId}`,
      jwt.getAuthHeaderToken()
    );
    return response;
  },
  async getCommercialAllysPickups(commercialAlly) {
    let response = await conn.post(
      `${resource}/commercial-ally-pickups`,
      commercialAlly,
      jwt.getAuthHeaderToken()
    );
    return response;
  },
  async validateAddress(address) {
    let response = await conn.post(
      `ordersheet/address-validation`,
      address,
      jwt.getAuthHeaderToken()
    );
    return response;
  },
  async searchPickupDetail(orderId) {
    let response = await conn.post(
      `${resource}/consult-pickup`,
      orderId
    );
    return response;
  },
};