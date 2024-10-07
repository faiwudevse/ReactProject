import React from "react";
import './HeroSection.css'
import bannerImage from '../assets/images/banner.jpg'
function HeroSection() {
    return (
        <section>
            <div className="container">
                <div className="left-div">
                <h1>Little Lemon <span>Chicago</span></h1>
                <p>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</p>
                <button className="reserve-btn">Reserve a Table</button>
                </div>
                <div  className="right-div">
                    <img src={bannerImage}/>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;