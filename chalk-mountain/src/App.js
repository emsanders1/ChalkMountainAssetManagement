import Navbar from "./components/Navbar"
import Switchbar from "./components/Switchbar"
import Home from "./pages/Home";
import Tractors from "./pages/Tractors"
import Trailers from "./pages/Trailers"
import Login from "./pages/Login"
import {Route, Routes} from "react-router-dom"
function App() {
  return (
    <div className="App">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/tractors" element={<Tractors />} />
      <Route path="/trailers" element={<Trailers />} />
      <Route path="/login" element={<Login />} />
    </Routes>
    </div>  
    )
}

export default App;
