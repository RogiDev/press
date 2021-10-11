import swal from "sweetalert2";

export const SweetAlert = {
    methods: {
      alert(options) {
          new swal(options)
        },
        alertSuccess({
          title = "Success!", text = "That's all done!", timer = 2000, showConfirmationButton = false
        } = {}) {
          this.alert({
            title: title,
            text: text,
            timer: timer,
            showConfirmButton: showConfirmationButton,
            type: 'success'
          });
        },
        alertError({
          title = "Error!", text = "Oops...Something went wrong"
        } = {}) {
          this.alert({
            title: title,
            text: text,
            type: 'error'
          });
        },
    },
  }