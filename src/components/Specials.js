import React from 'react';
import './Specials.css';
import saladImage from '../assets/images/salad.jpg'
import breadImage from '../assets/images/bread.jpg'
import pastaImage from  '../assets/images/pasta.jpg'
function Specials() {
  const specials = [
    {
      title: 'Greek Salad',
      price: '$12.99',
      description: 'The famous Greek salad of crispy lettuce, peppers, olives, and Chicago-style feta cheese, garnished with garlic and croutons.',
      imgSrc: saladImage,
    },
    {
      title: 'Bruschetta',
      price: '$5.99',
      description: 'Our Bruschetta is made from grilled bread smeared with garlic and seasoned with olive oil.',
      imgSrc: breadImage,
    },
    {
      title: 'Pasta',
      price: '$5.00',
      description: 'This comes straight from grandma\'s recipe book, made with love and care.',
      imgSrc: pastaImage,
    },
  ];
  console.log(specials[0].imgSrc);
  return (
    <section className="specials">
      <h2>This week’s specials!</h2>
      <button className="menu-btn">Online Menu</button>
      <div className="special-cards">
        {specials.map((special, index) => (
          <div key={index} className="card">
            <img src={special.imgSrc} alt={special.title} />
            <h3>{special.title} <span>{special.price}</span></h3>
            <p>{special.description}</p>
            <button className="order-btn">Order a delivery</button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Specials;