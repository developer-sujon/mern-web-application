//External Lib import
import axios from "axios";
import { errorMessage } from "../Helper/ToastMessage/ToastMessage";

axios.defaults.baseURL = "/api/v1";
axios.defaults.headers.common["Authorization"] =
  "Bearer " + sessionStorage.getItem("accessToken");

axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

class RestClient {
  static GetRequest = (url) => {
    return axios
      .get(url)
      .then((response) => {
        if (response.status === 200) {
          return response;
        }
      })
      .catch((err) => {
        return null;
      });
  };

  static PostRequest = (url, postJson) => {
    return axios
      .post(url, postJson)
      .then((response) => {
        return response;
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
        return response;
      })
      .catch((err) => {
        return null;
      });
  };

  static PutRequest = (url, previousPassword, newPassword) => {
    return axios
      .put(url, { previousPassword, newPassword })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        console.log(err);
        errorMessage(err.response.data.message);
      });
  };
}

export default RestClient;
