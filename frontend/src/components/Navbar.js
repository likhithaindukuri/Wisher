import {Link} from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar=()=>{

    const {logout}=useLogout()
    const {user}=useAuthContext()

    const handleClick=()=>{
        logout()
    }
    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Wisher</h1>
                    <p>Make their day more Happier!</p>
                </Link>
                <nav>
                    {user && (
                        <div>
                        <span>{user.email}</span>
                        <button onClick={handleClick}>Log out</button>
                    </div>
                    )}
                    {!user && (
                        <div>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Signup</Link>
                    </div>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Navbar

