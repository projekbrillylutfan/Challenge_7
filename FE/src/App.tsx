import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import CarCreate from './pages/CarCreate'
import UpdateCar from "./pages/CarUpdate";
import Dashboard from "./pages/DashBoardForm";

function App() {
  

  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/Home' element={<Home />} />
        <Route path="/create-car" element={<CarCreate />} />
        <Route path="/update-car/:id" element={<UpdateCar />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default App
