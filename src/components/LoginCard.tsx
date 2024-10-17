
import { useState } from "react";

export default function LoginCard() {
  const [visitorName, setVisitorName] = useState("");

  const handleLogin = () => {
    if (visitorName === "00119922") {
      window.location.href = "/stall";
    } else {
      alert("Incorrect visitor name!");
    }
  };

  return (
    <div className="loginCard">
      <h1>Welcome to Joutho! s</h1>
      <p>Who are you?</p>
      <input
        type="text"
        value={visitorName}
        onChange={(e) => setVisitorName(e.target.value)}
        placeholder="Enter Visitor Name"
      />
      <button onClick={handleLogin}>Proceed</button>
      <button onClick={() => alert("Sign Up coming soon!")}>Sign Up</button>
    </div>
  );
}
