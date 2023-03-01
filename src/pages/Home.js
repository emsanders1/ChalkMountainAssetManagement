import Table from "../components/AllTable"
import Navbar from "../components/Navbar"
import Switchbar from "../components/Switchbar"
// import {useState} from "react";
export default function Home(){

    // const [showTable, setShowTable] = useState(false);
    // const filterAllFunction = () => {
    //     setShowTable(!showTable);
    // }
    return(
        <div className="Home">
        <Navbar/>
        {/* <Switchbar onButtonClick={filterAllFunction}/> */}
        <Switchbar/>
        {/* {showTable && <Table />} */}
        <Table/>
        </div>
    )
}