import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {WishesContextProvider} from './context/WishContext'
import {AuthContextProvider} from './context/AuthContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <WishesContextProvider>
        <App />
      </WishesContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);