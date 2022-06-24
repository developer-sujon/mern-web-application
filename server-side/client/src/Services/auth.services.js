import axios from "axios";

class User {
  static BaseUrl = "http://localhost:5000/api/v1";

  static Login(PostJson) {
    const URL = this.BaseUrl + "/user/LoginProfile";
    let config = {};
    return axios
      .post(URL, PostJson, config)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return null;
      });
  }
  static Registration() {}
}

export default User;
