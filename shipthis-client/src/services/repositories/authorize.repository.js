import conn from "../api-connector";
const resource = "/auth";

export default {
  async authorize(user) {
    let response = await conn.post(`${resource}/client-login`, user);
    return response;
  },
  async authorizeGoogle(user) {
    let response = await conn.post(`${resource}/google-login`, user);
    return response;
  },
  async recoverUser(userRecoveryData) {
    let response = await conn.post(`${resource}/user-recovery`, userRecoveryData);
    return response;
  },
  async registration(userData) {
    let response = await conn.post(`${resource}/client-registration`, userData);
    return response;
  }
};
