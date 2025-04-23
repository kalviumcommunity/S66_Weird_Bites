import React from 'react'

const Card = ({name, ingredients, image}) => {
  return (
    <div className="border p-4 rounded-lg shadow-lg w-64 bg-white">
      <img src={image} alt={name} className="w-full h-40 object-cover rounded-md" />
      <h2 className="text-lg font-bold mt-2">{name}</h2>
      <p className="text-gray-600 text-sm mt-1">Ingredients: {ingredients.join(", ")}</p>
    </div>
  )
}

export default Card

