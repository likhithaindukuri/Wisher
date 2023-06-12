import { useEffect  } from "react"
import {useWishesContext} from "../hooks/useWishesContext"

// components
import WishDetails from "../components/WishDetails"
import WishForm from "../components/WishForm"

const Home = () => {
  const {wishes,dispatch}=useWishesContext()

  useEffect(() => {
    const fetchWishes = async () => {
      const response = await fetch('/api/wishes')
      const json = await response.json()

      if (response.ok) {
        dispatch({type:'SET_WISHES',payload:json})
      }
    }

    fetchWishes()
  }, [dispatch])

  return (
    <div className="home">
      <div className="wishes">
        {wishes && wishes.map(wish => (
          <WishDetails wish={wish} key={wish._id} />
        ))}
      </div>
      <WishForm/>
    </div>
  )
}

export default Home