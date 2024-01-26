// // EmailContext.js

// import { createContext, useContext, useReducer } from 'react';


// export const EmailContext = createContext();

// export const emailReducer = (state, action) => {
//   switch (action.type) {
//     case 'ADD_EMAIL':
//       return {
//         ...state,
//         emails: [...state.emails, action.payload],
//       };
//     default:
//       return state;
//   }
// };

// export const EmailContextProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(emailReducer, { emails: [] });

//   const addEmail = (email) => {
//     dispatch({ type: 'ADD_EMAIL', payload: email });
//   };

//   return (
//     <EmailContext.Provider value={{ ...state, addEmail }}>
//       {children}
//     </EmailContext.Provider>
//   );
// };

// export const useEmailContext = () => {
//   const context = useContext(EmailContext);

//   if (!context) {
//     throw Error('useEmailContext must be used inside an EmailContextProvider');
//   }

//   return context;
// };
