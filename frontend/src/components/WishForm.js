import {useState} from 'react'
import { useWishesContext } from '../hooks/useWishesContext'
import {useAuthContext} from '../hooks/useAuthContext'

const WishForm=()=>{
    const {dispatch}=useWishesContext()
    const {user}=useAuthContext()

    const [title,setTitle]=useState('')
    const [load,setLoad]=useState('')
    const [reps,setReps]=useState('')
    const [error,setError]=useState(null)
    const [emptyFields,setEmptyFields]=useState([])

    const handleSubmit=async (e)=>{
        e.preventDefault()

        if(!user){
            setError('You must be looged in!')
            return
        }

        const wish={title,load,reps}

        const response=await fetch('/api/wishes',{
            method:'POST',
            body:JSON.stringify(wish),
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${user.token}`
            }
        })
        const json=await response.json()

        if(!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if(response.ok){
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            setEmptyFields([])
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
                className={emptyFields.includes('title')?'error':''}
            />
            <label>Your message:</label>
            <input
                type="text"
                onChange={(e)=>setLoad(e.target.value)}
                value={(load)}
                className={emptyFields.includes('load')?'error':''}
            />
            <label>Date:</label>
            <input
                type="text"
                onChange={(e)=>setReps(e.target.value)}
                value={(reps)}
                className={emptyFields.includes('reps')?'error':''}
            />

            <button>Add Wish</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default WishForm