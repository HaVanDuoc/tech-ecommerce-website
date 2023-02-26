// Format Capitalization first letter
export const formatCapitalization = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// Format Fullname
export const FormatFullName = (firstName, middleName, lastName) => {
  return (firstName || "") + " " + (middleName || "") + " " + (lastName || "");
};

// Format phone number
export const formatPhoneNumber = (phoneNumberString) => {
  var cleaned = ("" + phoneNumberString).replace(/\D/g, "");
  var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return match[1] + " " + match[2] + " " + match[3];
  }
  return null;
};

// Format currency
export const formatVND = (price) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};
