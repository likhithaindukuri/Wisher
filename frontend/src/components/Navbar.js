import {Link} from 'react-router-dom'

const Navbar=()=>{
    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Wisher</h1>
                    <p>Make their day more Happier!</p>
                </Link>
            </div>
        </header>
    )
}

export default Navbar