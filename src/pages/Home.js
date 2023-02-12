import SortableTable from "../components/Table"
import Navbar from "../components/Navbar"
import Switchbar from "../components/Switchbar"
import App from "../components/App"
export default function Home(){
    return(
        <div className="Home">
        <Navbar/>
        <Switchbar/>
        <SortableTable/>
        </div>
    )
}