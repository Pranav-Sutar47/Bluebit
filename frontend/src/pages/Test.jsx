import React, { useState } from "react";
import { auth, googleProvider, signInWithPopup } from "../firebase";

function Test() {
  const [user, setUser] = useState(null);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();

      const response = await fetch("http://localhost:8000/api/auth/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      const data = await response.json();
      setUser(data.user);
      console.log("User authenticated:", data);
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div>
      <h1>Firebase OAuth with Django</h1>
      <button onClick={handleLogin}>Login with Google</button>
      {user && <p>Welcome, {user.name} ({user.email})</p>}
    </div>
  );
}

export default Test;
