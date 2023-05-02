import Table from "../components/AllTable"
import Navbar from "../components/Navbar"
export default function Trailers(){
    return(
        <div className="Trailers">
            <Navbar/>
            <Table assetType="trailers"/>
        </div>
    )
}