import React from 'react';

const Icon = ({ text, onClick }) => (
  <button type="button" onClick={onClick}>
    {text}
  </button>
);

export default Icon;
