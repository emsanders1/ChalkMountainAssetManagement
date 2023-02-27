import SortableTable from "../components/Table"
import Navbar from "../components/Navbar"
import Switchbar from "../components/Switchbar"
export default function Tractors(){
    return(
        <div className="Tractors">
            <Navbar/>
            <Switchbar/>
            <SortableTable/>
        </div>
    )
}