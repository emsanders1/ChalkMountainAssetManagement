import Table from "../components/AllTable"
import Navbar from "../components/Navbar"
import Switchbar from "../components/Switchbar"
export default function Home(){
    return(
        <div className="Home">
        <Navbar/>
        {/* <Switchbar/> */}
        <Table/>
        </div>
    )
}