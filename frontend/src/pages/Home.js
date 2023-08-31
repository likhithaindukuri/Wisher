import { useEffect  } from "react"
import {useWishesContext} from "../hooks/useWishesContext"
import { useAuthContext } from "../hooks/useAuthContext"

// components
import WishDetails from "../components/WishDetails"
import WishForm from "../components/WishForm"

const Home = () => {
  const {wishes,dispatch}=useWishesContext()
  const {user}=useAuthContext()

  useEffect(() => {
    const fetchWishes = async () => {
      const response = await fetch('/api/wishes',{
        headers:{
          'Authorization':`Bearer ${user.token}`
        }
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type:'SET_WISHES',payload:json})
      }
    }

    if(user){
      fetchWishes()
    }

  }, [dispatch,user])

  return (
    <div className="home">
      <div className="wishes-container">
        {wishes && wishes.map(wish => (
          <WishDetails wish={wish} key={wish._id} />
        ))}
      </div>
      <WishForm/>
    </div>
  )
}

export default Home