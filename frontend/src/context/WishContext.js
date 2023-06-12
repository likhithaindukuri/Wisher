import { createContext, useReducer } from "react";

export const WishesContext=createContext()

export const wishesReducer=(state,action)=>{
    switch(action.type){
        case 'SET_WISHES':
            return{
                wishes: action.payload
            }
        case 'CREATE_WISH':
            return{
                wishes: [action.payload, ...state.wishes]
            }
        case 'DELETE_WISH':
            return{
                wishes: state.wishes.filter((w)=>w._id!==action.payload._id)
            }
        default:
            return state
    }
}

export const WishesContextProvider=({children})=>{
    const [state,dispatch]=useReducer(wishesReducer,{
        wishes:null 
    })

    return (
        <WishesContext.Provider value={{...state,dispatch}}>
            {children}
        </WishesContext.Provider>
    )
}