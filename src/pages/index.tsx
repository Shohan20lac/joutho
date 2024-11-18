import "../app/globals.css"
import { useRouter } from "next/router";
import Welcome from "./welcome";
import { useEffect } from "react";


export default function App() {
  const router = useRouter();

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) 
      router.push("/dashboard");
    else
      router.push("/welcome")
  }, [router]);

  return (
    <div>
      <p>Loading...</p>
    </div>
  );
}
