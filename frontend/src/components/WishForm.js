import {useState} from 'react'
import { useWishesContext } from '../hooks/useWishesContext'

const WishForm=()=>{
    const {dispatch}=useWishesContext()
    const [title,setTitle]=useState('')
    const [load,setLoad]=useState('')
    const [reps,setReps]=useState('')
    const [error,setError]=useState(null)

    const handleSubmit=async (e)=>{
        e.preventDefault()

        const wish={title,load,reps}

        const response=await fetch('/api/wishes',{
            method:'POST',
            body:JSON.stringify(wish),
            headers:{
                'Content-Type':'application/json'
            }
        })
        const json=await response.json()

        if(!response.ok){
            setError(json.error)
        }
        if(response.ok){
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            console.log('New wish added',json)
            dispatch({type:'CREATE_WISH',payload:json})
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new Wish</h3>

            <label>Wishing Title:</label>
            <input
                type="text"
                onChange={(e)=>setTitle(e.target.value)}
                value={(title)}
            />
            <label>Your message:</label>
            <input
                type="text"
                onChange={(e)=>setLoad(e.target.value)}
                value={(load)}
            />
            <label>Date:</label>
            <input
                type="text"
                onChange={(e)=>setReps(e.target.value)}
                value={(reps)}
            />

            <button>Add Wish</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default WishForm