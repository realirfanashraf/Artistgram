import swal from 'sweetalert';

export const showSuccessMessage = (message) => {
  swal({
    title: "Success",
    text: message,
    icon: "success",
    button: "OK",
  });
};

export const showErrorMessage = (error) => {
  let errorMessage = "An error occurred.";
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
