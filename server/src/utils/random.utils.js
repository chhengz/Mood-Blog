/**
 * Generate a random username
 * Username will be in the format: baseUsername + randomString
 * Use to create unique usernames for user registration
 */
export function generateRandomUsername(baseUsername, length = 6) {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let randomStr = '';
  for (let i = 0; i < length; i++) {
    randomStr += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `${baseUsername}${randomStr}`;
}

/**
 * Generate a random ID
 * ID will be a hexadecimal string of the specified length
 * Use to create unique identifiers for various resources
 */
export function generateRandomId(length = 24) {
  const chars = 'abcdef0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

// test generateRandomId function
// const id = generateRandomId();
// console.log(id);



/**
 * GENERTAE SLUG FROM TITLE
 * Use to create URL-friendly slugs for projects or articles
 */

export function generateSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with hyphens
    .replace(/^-+|-+$/g, '');    // Remove leading and trailing hyphens
}

/**
 * Generate a random digit code
 * @returns A random code as a string
 */

export const generateDigitCode = (length = 6) => {
  const chars = '0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
};
