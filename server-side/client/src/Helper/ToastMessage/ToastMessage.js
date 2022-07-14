//external import
import cogoToast from "cogo-toast";

class ToastMessage {
  successMessage(msg) {
    return cogoToast.success(msg, {
      position: "bottom-center",
    });
  }
  errorMessage(msg) {
    return cogoToast.error(msg, {
      position: "bottom-center",
    });
  }
}

export const { successMessage, errorMessage } = new ToastMessage();
