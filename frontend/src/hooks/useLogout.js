import { useAuthContext } from "./useAuthContext";
import {useWishesContext} from './useWishesContext'

export const useLogout=()=>{
    
    const {dispatch}=useAuthContext()
    const {dispatch:wishesDispatch}=useWishesContext()

    const logout=()=>{

        localStorage.removeItem('user')

        dispatch({type:'LOGOUT'})
        wishesDispatch({type:'SET_WISHES',payload:null})
    }

    return {logout}
}