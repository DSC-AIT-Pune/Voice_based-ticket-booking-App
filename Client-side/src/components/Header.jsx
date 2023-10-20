import React from 'react'
import { Link } from "react-router-dom";
import '../styles/components/Header.css'
function Header() {
    return (
        <nav>
            <ul>
                <li><Link to="/">UdChalein</Link></li>
                {/* <li><Link to="/">Home</Link></li> */}
                {/* <li><Link to="/hotels">Hotels</Link></li> */}
            </ul>
        </nav>
    )
}
export default Header