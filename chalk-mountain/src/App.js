import Navbar from "./Navbar"
import Table from "./Table"
import Switchbar from "./Switchbar";
import Home from "./pages/Home";
import Tractors from "./pages/Tractors";
import Trailers from "./pages/Trailers";
import {Route, Routes} from "react-router-dom"
function App() {
  return (
    <div className="App">
    <Navbar/>
    <Switchbar/>
    {/* <Table/> */}
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/tractors" element={<Tractors />} />
      <Route path="/trailers" element={<Trailers />} />
    </Routes>
    </div>  
    )
}

export default App;
