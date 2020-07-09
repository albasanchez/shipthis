import conn from "../api-connector";
import firebase from "firebase";
import jwt from "../../common/jwt.service";
const resource = "/auth";

export default {
  async authorize(user) {
    let response = await conn.post(`${resource}/client-login`, user);
    return response;
  },
  async authorizeGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider);
  },
  async authorizeGoogleBackend(payload) {
    return conn.post(`${resource}/google-login`, payload);
  },
  async authorizeFacebook() {
    var provider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(provider);
  },
  async authorizeFacebookBackend(payload) {
    return conn.post(`${resource}/facebook-login`, payload);
  },
  async recoverUser(userRecoveryData) {
    let response = await conn.post(
      `${resource}/recovery-request`,
      userRecoveryData
    );
    return response;
  },
  async setPassword(payload) {
    let token = payload.token;
    let passwordData = {
      useremail: jwt.decodeToken(payload.token).email,
      password: payload.password,
    };

    let response = await conn.post(
      `${resource}/user-recovery`,
      passwordData,
      jwt.setAuthHeaderToken(token)
    );
    return response;
  },
  async registration(userData) {
    let response = await conn.post(`${resource}/client-registration`, userData);
    return response;
  },
};
