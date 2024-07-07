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
      if (user) {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/wishes`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const json = await response.json();

        if (response.ok) {
          const sortedWishes = json.sort(
            (a, b) => new Date(a.date) - new Date(b.date)
          );
          dispatch({ type: "SET_WISHES", payload: sortedWishes });
        }
      }
    };

    if(user){
      fetchWishes()
    }

  }, [dispatch,user])

  const currentDate=new Date();
  return (
    <div className="home">
      <div className="wishes-container">
      {wishes && wishes.map(wish => {
          const wishDate = new Date(wish.date);

          if (wishDate >= currentDate) {
            return <WishDetails wish={wish} key={wish._id} />;
          }

          return null;
        })}
      </div>
      <WishForm/>
    </div>
  )
}

export default Home