export const isEmpty = (value: string | number | object): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== "number" && value === "") {
    return true;
  } else if (typeof value === "undefined" || value === undefined) {
    return true;
  } else if (
    value !== null &&
    typeof value === "object" &&
    !Object.keys(value).length
  ) {
    return true;
  } else {
    return false;
  }
};
export const isEmailOrPhone = (input) => {
  // Kiểm tra xem input có khớp với định dạng email hay không
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(input)) {
    return "email";
  }
  // Kiểm tra xem input có khớp với định dạng số điện thoại hay không
  const phoneRegex = /^[0-9]{10,}$/;
  if (phoneRegex.test(input)) {
    return "phone";
  }
  // Nếu input không khớp với định dạng nào cả, trả về false
  return "username";
};
