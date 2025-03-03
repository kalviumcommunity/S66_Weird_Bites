import React, { useEffect, useState } from "react";
import AddComboForm from "./AddComboForm"
import { useNavigate } from "react-router-dom";



const WeirdCombosList = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const navigate=useNavigate()

    useEffect(() => {
        fetch("http://localhost:8002/food/weird-combos")
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch combos');
                }
                return response.json();
            })
            .then(data => {
                console.log('Fetched data:', data);
                setData(data);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                setError(error.message);
            });
    }, []);

    const handleNewCombo=(newCombo)=>{
        setData((prev) => [newCombo,...prev])
    }


    const handleDelete=async(id)=>{
        try {
            const response=await fetch(`http://localhost:8002/food/weird-combos/${id}`,{
                method:"DELETE"
            })

            if(!response.ok){
                throw new Error("Failed to delete combo")
            }
            setData ((prev)=>prev.filter((item)=> item._id !== id))
            
        } catch (error) {
            console.error("Error deleting combo:", error);
        }
    }

    const getImageUrl = (imagePath) => {
        if (!imagePath) return null;
        const filename = imagePath.replace(/^\/uploads\//, '').split('/').pop();
        const url = `http://localhost:8002/uploads/${filename}`;
        console.log('Image URL:', url);
        return url;
    };

    return (
        <div className="max-w-4xl mx-auto p-4 space-y-6">
            <AddComboForm onComboAdded={handleNewCombo}/>
            {data.length === 0 ? (
                <p className="text-center text-gray-500">No weird combos found</p>
            ) : (
                data.map(item => (
                    <div key={item._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="p-6">
                            <h2 className="text-2xl font-bold mb-4">{item.title}</h2>
                            {item.image && (
                                <div className="relative w-full h-64 mb-4 bg-gray-100 rounded-lg overflow-hidden">
                                    <img 
                                        src={getImageUrl(item.image)}
                                        alt={item.title}
                                        className="object-contain w-full h-full"
                                        onError={(e) => {
                                            console.log('Failed to load image:', item.image);
                                            e.target.onerror = null;
                                            e.target.style.display = 'none';
                                        }}
                                    />
                                </div>
                            )}
                            <p className="text-gray-700 mb-4">{item.description}</p>
                            <p className="text-sm text-gray-600">
                                <span className="font-semibold">Posted by:</span> {item.username}
                            </p>

                            <div className="flex space-x-4 mt-4">
                                <button 
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                                    onClick={()=>navigate(`/edit/${item._id}`)}
                                >
                                    Edit
                                </button>

                                <button 
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                                    onClick={()=>handleDelete(item._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default WeirdCombosList;