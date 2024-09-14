import Swal from "sweetalert2";
import saveFile from "./saveFile";
import { extension } from "./constants";
const saveWithconfirm = async (language, value) => {
  const extensionOfFile = extension[language];
  const { value: fileName } = await Swal.fire({
    title: "Enter Your file Name",
    input: "text",
    inputLabel: "Enter your file name without extension",
    showCancelButton: true,
    inputValidator: (value) => {
      if (!value) {
        return "You need to write something!";
      }
    },
  });
  const fullFileName = fileName + extensionOfFile;
  saveFile(fullFileName, value);
};

export const toastMsgSweetAlert = (icon, msg) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
  Toast.fire({
    icon: icon,
    title: msg,
  });
};

export default saveWithconfirm;
