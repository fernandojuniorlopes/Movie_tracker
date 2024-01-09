const Logout = () => {
  localStorage.removeItem('token');

  // Redirect the user to the login page or homepage
  window.location.href = '/login'; // Replace '/login' with your desired redirection path

  // Since this is a function component, it should return something
  return null;
};

export default Logout;
