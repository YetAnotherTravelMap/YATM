import { Route, Routes } from "react-router-dom"
import { Map } from "./pages/Map/Map.jsx"
import { Login } from "./pages/Login/LogIn.jsx"
import { Register } from "./pages/Register/Register.jsx"
import { Profile } from "./pages/Profile/Profile.jsx"

function App() {

  return (
    <Routes>
      <Route path="/" element={<Map />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  )
}

export default App
