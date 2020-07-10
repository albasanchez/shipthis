import conn from "../api-connector";
const resource = "/comment-box";

export default {
  async registerComment(comment) {
    await conn.post(`${resource}/savecomment`, comment);
  },
};
