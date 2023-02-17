exports.IdentityId = () => {
  var id = 0;
  return function () {
    if (arguments[0] === 0) id = 0;
    return id++;
  };

};
console.log(IdentityId())
