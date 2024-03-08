export function timeoutPromise(message: string, ms: number = 5000) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(message))
    }, ms)
  })
}

export function _debounce(fn: any, delay: number) {
  let debounceTimer: number | undefined
  return function (...args: any) {
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => fn(...args), delay)
  }
}

export function closeModal(element: string) {
  // Close the Bootstrap modal
  var modal = document.getElementById(element) as HTMLElement
  var modalBackdrop = document.querySelector('.modal-backdrop')

  if (modal) {
    // Remove added classes
    modal.classList.remove('in', 'show', 'fade')
    modal.style.display = ''

    document.body.classList.remove('modal-open')

    // Remove the modal backdrop element
    if (modalBackdrop) {
      document.body.removeChild(modalBackdrop)
    }
  }
}

export function openModal(postId: number, element: string) {
  return new Promise((resolve, reject) => {
    // Open the Bootstrap modal using its API
    var modal = document.getElementById(element) as HTMLElement

    if (modal) {
      // Add classes to initiate the modal show animation

      // Wait for the next repaint and then add the 'in' class for the fade effect
      setTimeout(function () {
        modal.classList.add('fade', 'show')
        modal.style.display = 'block'
        modal.classList.add('in')
      }, 500)

      // Add class to the body for the modal backdrop
      document.body.classList.add('modal-open')

      // Add the modal backdrop element for the shadow effect
      var modalBackdrop = document.createElement('div')
      modalBackdrop.className = 'modal-backdrop fade show'
      document.body.appendChild(modalBackdrop)
    }

    resolve(postId)
  })
}
