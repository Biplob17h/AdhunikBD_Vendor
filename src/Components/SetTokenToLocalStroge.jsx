const setTokenToLocalStorage = (token) => {
  const oldToken = localStorage.getItem("AdhunikVendorToken");

  if (oldToken) {
    localStorage.removeItem("AdhunikVendorToken");
    localStorage.setItem("AdhunikVendorToken", token);
  } else {
    localStorage.setItem("AdhunikVendorToken", token);
  }
};

export default setTokenToLocalStorage;
