import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const RotaPrivada = ({ children, redirectTo }) => {
  const isAutenticadoEAdmin = localStorage.getItem('token') !== null;

  return isAutenticadoEAdmin ? children : <Navigate to={redirectTo} />;
};

RotaPrivada.propTypes = {
  children: PropTypes.element,
  redirectTo: PropTypes.string.isRequired,
};

export default RotaPrivada;
