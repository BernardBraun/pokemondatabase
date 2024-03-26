import React from 'react';
import PokemonLogo from '../assets/Pokemon_logo.png';
import '../styles/headerComponentStyles.css'

const Header = () => {
  return (
    <header>
      <img src={PokemonLogo} alt="Logo" className="logo-image" />
    </header>
  );
};

export default Header;