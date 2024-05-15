const getInstance = (function () {
  var instance;

  return (fn: any) => {
    if (!instance) {
      if (typeof fn === "function") instance = fn();
      if (typeof fn === "object") instance = new fn();
    }
    return instance;
  };
})();
