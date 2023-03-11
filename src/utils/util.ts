export const isEmpty = (value: string | number | object): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== 'number' && value === '') {
    return true;
  } else if (typeof value === 'undefined' || value === undefined) {
    return true;
  } else if (
    value !== null &&
    typeof value === 'object' &&
    !Object.keys(value).length
  ) {
    return true;
  } else {
    return false;
  }
};
export const isEmailOrPhone = (input) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(input)) {
    return 'email';
  }
  const phoneRegex = /^(03|05|07|08|09)\d{8}$/;
  if (phoneRegex.test(input)) {
    return 'phone';
  }
  return 'username';
};

export const isString = (data) =>
  typeof data === 'string' || data instanceof String;

export const isArray = (data) => Array.isArray(data);

export const isObject = (data) => !isArray(data) && data === Object(data);

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
export default {
  capitalizeFirstLetter,
  isObject,
  isArray,
  isString,
  isEmailOrPhone,
  isEmpty,
};
