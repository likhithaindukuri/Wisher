import {useWishesContext} from '../hooks/useWishesContext'
import { useAuthContext } from '../hooks/useAuthContext'

import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WishDetails=({wish})=>{
    const {dispatch}=useWishesContext()
    const {user}=useAuthContext()

    const handleClick=async ()=>{

        if(!user){
            return
        }
        const response=await fetch('/api/wishes/'+wish._id,{
            method:'DELETE',
            headers:{
                'Authorization':`Bearer ${user.token}`
              }
        })
        const json=await response.json()

        if(response.ok){
            dispatch({type:'DELETE_WISH',payload:json})
        }
    }

    return (
        <div className="wish-details">
            <h4>{wish.title}</h4>
            <p><strong>Text: </strong>{wish.load}</p>
            <p><strong>Date: </strong>{wish.date}</p>
            <p>{formatDistanceToNow(new Date(wish.createdAt),{addSuffix:true})}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    )
}

export default WishDetails