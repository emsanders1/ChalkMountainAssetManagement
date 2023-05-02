import Table from "../components/AllTable"
import Navbar from "../components/Navbar"
export default function Home(){
    return(
        <div className="Home">
        <Navbar/>
        <Table assetType="all" />
        </div>
    )
}