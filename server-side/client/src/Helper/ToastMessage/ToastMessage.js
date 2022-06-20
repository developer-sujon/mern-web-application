import cogoToast from "cogo-toast";

class ToastMessage {
  successMessage(message) {
    cogoToast.success(message);
  }

  errorMessage(message) {
    cogoToast.error(message);
  }
}

export const { successMessage, errorMessage } = new ToastMessage();
