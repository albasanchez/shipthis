import conn from "../api-connector";
// import firebase from "firebase";
const resource = "/userdata/users";

export default {
  async updateProfile(user) {
    let response = await conn.patch(`${resource}/data`, user);
    return response;
  },
  async updatePassword(payload) {
    let response = await conn.patch(`${resource}/password`, payload);
    return response;
  },
  async deleteAccount(id) {
    let response = await conn.delete(`${resource}/${id}`);
    return response;
  },
};
