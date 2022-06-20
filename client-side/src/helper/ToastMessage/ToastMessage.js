import cogoToast from "cogo-toast";

class ToastMessage {
  Error(message) {
    cogoToast.error(message);
  }
  Success(message) {
    cogoToast.success(message);
  }
}

export const { Error, Success } = new ToastMessage();
