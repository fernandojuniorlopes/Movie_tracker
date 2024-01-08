import { AuthContext } from '../contexts/AuthContext';

const Logout = () => {
  const { logout } = useContext(AuthContext); // Use the logout function from AuthContext

  // Call the logout function to update authentication state
  logout();

  window.location.href = '/login'; // Replace '/login' with your desired redirection path

  // Since this is a function component, it should return something
  return null;
};

export default Logout;
