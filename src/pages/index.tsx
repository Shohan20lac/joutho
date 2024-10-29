import "../app/globals.css"
import { useRouter } from "next/router";
import Welcome from "./welcome";


export default function App() {
  // const userInfo = localStorage.getItem("userInfo");
  const router = useRouter();

  return (
    <Welcome/>
  )
  // if (userInfo)
    router.push ('/welcome')
  // else
    // router.push ('/welcome')
}
