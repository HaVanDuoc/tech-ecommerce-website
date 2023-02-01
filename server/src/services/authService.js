// authService.js

const register = () =>
  new Promise((resolve, reject) => {
    try {
      resolve({
        err: 0,
        mess: "register service",
      });
    } catch (error) {
      reject(error);
    }
  });

module.exports = { register };
