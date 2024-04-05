import swal from 'sweetalert';
import Swal from 'sweetalert2';

export const showSuccessMessage = (message) => {
  swal({
    title: "Success",
    text: message,
    icon: "success",
    button: "OK",
  });
};

export const showErrorMessage = (error) => {
  let errorMessage = error.message
  if (error.response && error.response.data && error.response.data.error) {
    errorMessage = error.response.data.error;
  }
  swal({
    title: "Error",
    text: errorMessage,
    icon: "error",
    button: "OK",
  });
};


const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-danger"
  },
  buttonsStyling: false
});

export const showConfirmationDialog = (title, text, confirmButtonText, cancelButtonText) => {
  return swalWithBootstrapButtons.fire({
    title: title,
    text: text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: confirmButtonText,
    cancelButtonText: cancelButtonText,
    reverseButtons: true
  });
};

export const showSuccessDialog = (title, text) => {
  return swalWithBootstrapButtons.fire({
    title: title,
    text: text,
    icon: "success"
  });
};

export const showErrorDialog = (title, text) => {
  return swalWithBootstrapButtons.fire({
    title: title,
    text: text,
    icon: "error"
  });
};
