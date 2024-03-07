// import VueSweetalert2 from "vue-sweetalert2";
import Swal from "sweetalert2/dist/sweetalert2.js";
export const Alert = {
  confirmMsg(): Promise<any> {
    return new Promise((resolve, reject) => {
      Swal.fire({
        title: "êtes-vous sûr ?",
        text: "Voulez-vous vraiment supprimer !",
        icon: "warning",
        showDenyButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Continuer !",
        denyButtonText: `Annuler`,
      }).then((result) => {
        if (result.isConfirmed) {
          resolve(result.isConfirmed);
        } else if (result.isDenied) {
          reject(result.isDenied);
        }
      });
    });
  },
};
