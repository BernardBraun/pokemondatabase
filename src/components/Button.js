import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/buttonComponentStyles.css';

const Button = ({ to, children }) => {
  return (
    <Link to={to} className="backButton">
      {children}
    </Link>
  );
};

export default Button;
