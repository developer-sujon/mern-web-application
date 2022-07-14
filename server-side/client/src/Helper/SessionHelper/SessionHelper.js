class SessionHelper {
  static setToken(token) {
    sessionStorage.setItem("token", token);
  }
  static getToken() {
    return sessionStorage.getItem("token");
  }
  static removeToken(key) {
    return sessionStorage.getItem(key);
  }
  static setUserDetails(user) {
    sessionStorage.setItem("user", JSON.stringify(user));
  }
  static getUserDetails() {
    return JSON.parse(sessionStorage.getItem("user"));
  }
}

export default SessionHelper;
