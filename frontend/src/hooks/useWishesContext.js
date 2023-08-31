import { WishesContext } from "../context/WishContext";
import { useContext } from "react";

export const useWishesContext=()=>{
    const context=useContext(WishesContext)

    if(!context){
        throw Error('useWishesContext must be used inside an WishesContextProvider')
    }

    return context
}

