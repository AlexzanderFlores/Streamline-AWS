const cognitoSubCopyId = 'saws-cognito-sub-copy'

/**
 * Gets a "Click to copy" button
 * @param {String} sub The string to copy
 * @returns A HTML button that when clicked will copy the given sub
 */
const getHTML = (sub) => {
  return `<button id='${cognitoSubCopyId}' sub='${sub}' onClick="(() => {${copyToClipboardString(
    sub
  )}})()" class="saws-button"><i class="fa fa-clone" aria-hidden="true"></i></button>`
}

/**
 * Used whenever we are viewing all user accounts and not a single user account
 */
const copySubUsersPage = () => {
  // Wait until all account subs are loaded
  const elements = document.querySelectorAll('tr td a')
  if (!elements || elements.length === 0) {
    setTimeout(copySubUsersPage, 500)
    return
  }

  elements.forEach((element) => {
    // Get the sub and the "click to copy" button for that sub
    const sub = element.textContent
    const newHTML = getHTML(sub)

    // Get any existing button for this specific sub
    const existingElement = document.querySelector(
      `#${cognitoSubCopyId}[sub="${sub}"]`
    )

    // Does it exist? If so remove it
    if (existingElement) {
      existingElement.parentElement.removeChild(existingElement)
    }

    // Append the button to the start of the HTML
    element.parentElement.innerHTML = `${newHTML} ${element.parentElement.innerHTML}`
  })
}

/**
 * Used whenever we are viewing a single user and not all users
 * This is called first no matter where we are
 */
const copySubProfilePage = () => {
  const { href } = location

  // See if we are either viewing a full list of users or a specific user
  if (!href.includes('console.aws.amazon.com/cognito/users/')) {
    return
  }

  // A specific user will have a UUID in the URL so the string "href" will be longer
  // Here we check to see if we are on a specific user's profile info or viewing all users
  const usersIndex = href.lastIndexOf('/users')
  const lengthOfUUIDs = 36
  if (href.length < usersIndex + lengthOfUUIDs) {
    // We are viewing all users, so call the correct function instead
    return copySubUsersPage()
  }

  // At this point we know we are looking at a specific user's profile info

  const waitForSub = () => {
    // Give Cognito time to load the needed data
    const span = document.querySelectorAll('.cog-user-panel--header span')[1]
    if (!span) {
      // Keep trying until the needed data is loaded
      setTimeout(waitForSub, 500)
      return
    }

    // Get the sub and the "click to copy" button for that sub
    const sub = span.textContent
    const newHTML = getHTML(sub)

    // Get any existing button for this specific sub
    const existingElement = document.querySelector(
      `#${cognitoSubCopyId}[sub="${sub}"]`
    )

    // Does it exist? If so remove it
    if (existingElement) {
      existingElement.parentElement.removeChild(existingElement)
    }

    // Append the button to the end of the HTML
    span.parentElement.innerHTML += newHTML
  }

  waitForSub()
}
