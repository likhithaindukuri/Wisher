import {useWishesContext} from '../hooks/useWishesContext'

const WishDetails=({wish})=>{
    const {dispatch}=useWishesContext()

    const handleClick=async ()=>{
        const response=await fetch('/api/wishes/'+wish._id,{
            method:'DELETE'
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
            <p><strong>Date: </strong>{wish.reps}</p>
            <p>{wish.createdAt}</p>
            <span onClick={handleClick}>delete</span>
        </div>
    )
}

export default WishDetails