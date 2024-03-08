import { showError } from "./ToastNotification";
import verifyToken, { getUserData } from "./verifyToken";


/**
 *
 * @param id
 * @param file
 * @returns headers options
 * I use this mnumber
 */


type fieldType=Array<{ fieldName: string; fieldValue: string }>

export function postWithFormDataType<T extends fieldType>(
  fields: T,
  file: string | Blob
) {
  if (!Array.isArray(fields) || fields.length === 0) {
    return showError('Invalid fields !!');
  }
  const userData=getUserData()
  const myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${userData?.token}`);

  const formdata = new FormData();
  formdata.append('image', file);

  for ( const field of fields) {
    formdata.append(field['fieldName'], field['fieldValue']);
  }
  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow',
  };

  return requestOptions;
}



/**
 *
 * @param e
 * @param element
 * @returns file and this the selected file in <img> tag
 */
export function selectImage(e: any, element: string) {
  const selectedFile = e.target.files[0];
  const output = document.getElementById(element) as HTMLImageElement;
  output.src = URL.createObjectURL(e.target.files[0]);
  output.onload = function () {
    URL.revokeObjectURL(output.src); // free memory
  };
  return selectedFile;
}
