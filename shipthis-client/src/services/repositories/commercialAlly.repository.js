import conn from "../api-connector";
const resource = "/commercial-ally";
export default {
  async searchPickupDetail(orderId) {
    let response = await conn.post(
      `${resource}/consult-pickup
`,
      orderId
    );
    return response;
  },
};
