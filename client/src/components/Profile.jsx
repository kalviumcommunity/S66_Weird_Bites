import React, { useEffect, useState } from "react";
import LogoutButton from "./LogoutButton";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get user info from localStorage or fetch from backend if needed
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    // Decode token (simple, not secure for production)
    const payload = JSON.parse(atob(token.split(".")[1]));
    setUser({ username: payload.username, id: payload.userId });
  }, [navigate]);

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 mt-8">
      <h2 className="text-xl font-bold mb-6">User Profile</h2>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>User ID:</strong> {user.id}</p>
      {/* Add more user info or actions here */}
      <LogoutButton />
    </div>
  );
};

export default Profile;
