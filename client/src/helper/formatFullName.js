const FormatFullName = (firstName, middleName, lastName) => {
  return (firstName || "") + " " + (middleName || "") + " " + (lastName || "");
};

export default FormatFullName;
