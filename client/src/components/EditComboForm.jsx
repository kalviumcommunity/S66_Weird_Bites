import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditComboForm = () => {
    const {id}=useParams()
    const navigate=useNavigate()
    const [formData,setFormData]=useState({ title: "", description: "", image: "" })

    useEffect(()=>{
        fetch(`http://localhost:8002/food/weird-combos/${id}`)
            .then(response=>response.json())
            .then(data=>setFormData(data))
            .catch(error => console.error("Error fetching combo:", error));
    },[id])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) =>{
        e.preventDefault()
        try {
            const response = await fetch(`http://localhost:8002/food/weird-combos/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if(!response.ok){
                throw new Error("Failed to update combo");
            }
            navigate("/post")
        } catch (error) {
            console.error("Error updating combo:", error);  
        }
    }


    if (!formData.title) {
        return <p>Loading..</p>;
    }


  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
    <h1 className="text-2xl font-bold mb-4">Edit Combo</h1>
    <form onSubmit={handleSubmit}>
        <label className="block mb-2">Title:</label>
        <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-4"
        />
        
        <label className="block mb-2">Description:</label>
        <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-4"
        ></textarea>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Save Changes
        </button>
    </form>
</div>
  )
}

export default EditComboForm
