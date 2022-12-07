import Navbar from "../components/Navbar"
import Switchbar from "../components/Switchbar"
import { AssetTable } from "../components/Table"
import Popup from '../pages/Popup';
import { useState } from 'react';

export default function Tractors(){
    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
      setIsOpen(!isOpen);
    }
    return (
    <div>
    <Navbar/>
    <h1>Tractors Only Table</h1>
    <Switchbar/>
    <div className="tableSection">
    <AssetTable
        assets={[
          { id: 2,
            type: 'Tractor',
            asset: 'DEF',
            status: 'OUT-OF-SERVICE',
            date: '08/19/2022',
            employee: 'M.B.',
            notes: 'Punctured tire',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 3,
            type: 'Tractor',
            asset: 'GHI',
            status: 'OUT-OF-SERVICE',
            date: '07/03/2022',
            employee: 'E.S.',
            notes: 'Needs New Shocks', 
            modify: <input type="button" value="update" onClick={togglePopup}
          />},
        ]}
      />
       {isOpen && <Popup handleClose={togglePopup}/>}
       </div>
    </div>
    )
}