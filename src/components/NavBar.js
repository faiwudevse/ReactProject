import React from "react";
import './NavBar.css'
import logoImage from '../assets/images/logo.jpg'
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet';

function NavBar() {
    return(
        <header>
            <Helmet>
                <title>Little Lemon - Specials of the Week</title>
                <meta property="og:title" content="Little Lemon's Specials of the Week" />
                <meta property="og:description" content="Discover our delicious weekly specials like Greek Salad, Bruschetta, and Pasta! Order now!" />
                <meta property="og:type" content="website" />
                
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Little Lemon's Specials" />
                <meta name="twitter:description" content="Check out the weekly specials at Little Lemon! From Greek Salad to Pasta, we've got something for everyone." />
            </Helmet>
            <nav className="navbar">
                <div className="logo"><img src ={logoImage}/></div>
                <ul className="nav-links">
                    <li> <Link to="/">Home</Link></li>
                    <li>About</li>
                    <li>Menu</li>
                    <li><Link to="/booking">Reservations</Link></li>
                    <li>Order Online</li>
                    <li>Login</li>
                </ul>
            </nav>
        </header>
    );
}

export default NavBar;