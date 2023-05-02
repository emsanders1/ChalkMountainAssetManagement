import Table from "../components/AllTable"
import Navbar from "../components/Navbar"
export default function Tractors(){
    return(
        <div className="Tractors">
            <Navbar/>
            <Table assetType="tractors"/>
        </div>
    )
}