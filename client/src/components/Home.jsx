import React from 'react'
import Card from './Card'

const Home = () => {

  const bites=[
    {
      name: "Peanut Butter Pickle Sandwich",
      ingredients: ["Peanut Butter", "Pickles", "Bread"],
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJ08C0xNjhvASJPT_3D_up_pYwaFNIHOADZA&s",
    },
    {
      name: "French Fries in Ice Cream",
      ingredients: ["French Fries", "Vanilla Ice Cream"],
      image: "https://www.awesomecuisine.com/wp-content/uploads/2009/05/french-fries.jpg",
    },
  ]


  return (
    <div>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <h1 className="text-4xl font-bold text-blue-600">Weird Bites</h1>
          <p className="text-lg text-gray-700 mt-4">This project will let users log in and explore a crowd-sourced list of the weirdest food combinations people have tried. Users can add their own creations, rate others combinations, and comment on what they think about them. It’s a fun way to share and discover the odd culinary tastes of others!</p>
        </div>

        <div>
          {bites.map((bite,index) => (
            <Card key={index} {...bite}/>
          ))}
        </div>
    </div>


  )
}

export default Home
