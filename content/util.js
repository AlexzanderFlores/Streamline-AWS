/**
 * Returns a function as a string. This funciton will copy text to the user's clipboard.
 * Typically used as an "onclick" attribute of a button element.
 * @param {String} stringToCopy The string to copy
 */
const copyToClipboardString = (stringToCopy) => {
  return `const element = document.createElement('textarea')
      element.value = '${stringToCopy}'
      document.body.appendChild(element)
      element.select()
      document.execCommand('copy')
      document.body.removeChild(element)`
}
