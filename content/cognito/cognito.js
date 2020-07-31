/**
 * Handles the Cognito improvements
 */
const cognito = () => {
  // AWS doesn't reload pages, typically they will just change the URL.
  // This code will detect changes to the URL and will re-run our
  // Congito code when it does change.
  let oldLength = -1
  const listen = (currentLength) => {
    if (currentLength != oldLength) {
      copySubProfilePage()
    }

    oldLength = window.history.length
    setTimeout(() => {
      listen(window.history.length)
    }, 1000)
  }

  listen(window.history.length)
}
