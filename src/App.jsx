import { Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import {Toaster} from "react-hot-toast"
import SignIn from "./components/SignIn"
import SignUp from "./components/SignUp"
import "./App.css"
import Protected from "./components/Protected"
import Blog from "./components/Blog"
import ProtectAuth from "./components/ProtectAuth"

function App() {
  return (
    <>
  <Toaster />
    <Routes> 
     <Route path="/" element={<Home/>}/>
     <Route path="/blog" element={<Protected><Blog/></Protected>}/>
     <Route path="/sign-in" element={<ProtectAuth><SignIn/></ProtectAuth>}/>
     <Route path="/sign-up" element={<ProtectAuth><SignUp/></ProtectAuth>}/>
    </Routes>
    </>
  )
}

export default App
