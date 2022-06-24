//External Lib import
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000/api/v1";
axios.defaults.headers.common["Authorization"] =
  "Bearer " + sessionStorage.getItem("token");

axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

class RestClient {
  static GetRequest = (url) => {
    return axios
      .get(url)
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        }
      })
      .catch((err) => {
        console.log(err);

        if (err.response.status === 401) {
          // window.location.href = "/login";
        }
        return null;
      });
  };

  static PostRequest = (url, postJson) => {
    return axios
      .post(url, postJson)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return null;
      });
  };

  static DeleteRequest = (url) => {
    return axios
      .delete(url)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return null;
      });
  };

  static PatchRequest = (url, postJson) => {
    return axios
      .patch(url, postJson)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return null;
      });
  };
}

export default RestClient;
