import React from "react";
import api from "../components/api/api_test";
import { useState } from "react";
import axios from "axios";

export default function RefreshDebugPage() {

  const handleTest = async () => {
    
    const res = await axios.get('/api/v1/users/me/profile',{
      headers:{
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    });

    console.log("Profile response:", res.data);
    console.log("Access Token:", res.data.accessToken);
  };

  return (
    <div className="p-4">
      <h2>🔍 Refresh Token Debug</h2>
      <button
        onClick={handleTest}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Test Refresh Token Flow
      </button>

     
    </div>
  );
}
