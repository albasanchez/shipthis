import conn from "../api-connector";
const resource = "/auth";

export default {
  async authorize(user) {
    let response = await conn.post(`${resource}/regularlogin`, user);
    return response;
  },
  async recoverUser(userRecoveryData) {
    let response = await conn.post(`${resource}/recoveruser`, userRecoveryData);
    return response;
  },
  async registration(userData) {
    let response = await conn.post(`${resource}/registration`, userData);
    return response;
  },
  async admin_registration(adminData) {
    let response = await conn.post(`${resource}/admin-registration`, adminData);
    return response;
  }
};
