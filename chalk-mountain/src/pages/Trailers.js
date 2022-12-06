import Navbar from "../components/Navbar"
import Switchbar from "../components/Switchbar"
import { AssetTable } from "../components/Table"
import Popup from '../pages/Popup';
import { useState } from 'react';

export default function Trailers(){
    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
      setIsOpen(!isOpen);
    }
    return (
    <div>
    <Navbar/>
    <h1>Trailers Only Table</h1>
    <Switchbar/>
    <div className="tableSection">
    <AssetTable
        assets={[
          { id: 1,
            type: 'Trailer',
            asset: 'ABC',
            status: 'IN-SERVICE',
            date: '02/12/2022',
            employee: 'J.F.',
            notes: '', 
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 4, 
            type: 'Trailer',
            asset: 'JKL', 
            status: 'IN-SERVICE', 
            date: '06/28/2022', 
            employee: 'Z.N.', 
            notes: '', 
            modify: <input type="button" value="update" onClick={togglePopup}
          />},
        ]}
      />
       {isOpen && <Popup handleClose={togglePopup}/>}
       </div>
    </div>
    )
}