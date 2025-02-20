import React, { useState } from "react";

const AddComboForm = () => {
    const [formData, setFormData] = useState({ 
        title: "", 
        description: "", 
        username: "" 
    });
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setImage(file);
            setError(null);
        } else {
            setError('Please select a valid image file');
            e.target.value = '';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        
        try {
            if (!image) {
                throw new Error('Please select an image');
            }

            const formDataImage = new FormData();
            formDataImage.append("image", image);
            
            const uploadRes = await fetch("http://localhost:8002/food/upload", {
                method: 'POST',
                body: formDataImage
            });

            if (!uploadRes.ok) {
                throw new Error('Failed to upload image');
            }

            const uploadData = await uploadRes.json();

            const comboRes = await fetch("http://localhost:8002/food/weird-combos", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    image: uploadData.imageUrl
                })
            });

            if (!comboRes.ok) {
                throw new Error('Failed to create combo');
            }

            setFormData({ title: "", description: "", username: "" });
            setImage(null);
            e.target.reset();
            alert("Weird combo added successfully!");
        } catch (error) {
            setError(error.message || 'Failed to add combo');
            console.error("Error adding combo:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-6">Add New Weird Combo</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="username"
                        placeholder="Your Name"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                {error && (
                    <div className="text-red-500 text-sm">{error}</div>
                )}
                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed"
                >
                    {loading ? 'Adding...' : 'Add Combo'}
                </button>
            </form>
        </div>
    );
};

export default AddComboForm;