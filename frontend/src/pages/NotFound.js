// src/pages/NotFound.js

import React from 'react';

const NotFound = () => {
  return (
    <div className="not-found">
      <img
        src="/404.svg" 
        alt="404 Not Found"
        style={{ width: '30%', marginTop: '50px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
      />
      <h3 style={{ textAlign: 'center', fontWeight: '800', color: '#e33faa' }}>
        &spades; The Page You're Searching for is Not Available &spades;
      </h3>
    </div>
  );
};

export default NotFound;
