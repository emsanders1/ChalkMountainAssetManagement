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
    <Switchbar/>
    <div className="tableSection">
    <AssetTable
        assets={[
          { id: 18,
            type: 'Tractor',
            asset: '1627',
            location: 'Pleasanton',
            status: 'OUT-OF-SERVICE',
            date: '12/05/2022',
            employee: '',
            notes: 'Tire leaking air',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 19,
            type: 'Tractor',
            asset: '1634',
            location: 'Pleasanton',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 20,
            type: 'Tractor',
            asset: '1641',
            location: 'ZT',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 21,
            type: 'Tractor',
            asset: '1645',
            location: 'ZT',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 34,
            type: 'Tractor',
            asset: '1725',
            location: 'ZT',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 35,
            type: 'Tractor',
            asset: '1726',
            location: 'Pleasanton',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 36,
            type: 'Tractor',
            asset: '1737',
            location: 'ZT',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 37,
            type: 'Tractor',
            asset: '1939',
            location: 'ZT',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 38,
            type: 'Tractor',
            asset: '1940',
            location: 'Kermit',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 39,
            type: 'Tractor',
            asset: '1941',
            location: 'Kermit',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 40,
            type: 'Tractor',
            asset: '1941',
            location: 'Kermit',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 41,
            type: 'Tractor',
            asset: '1942',
            location: 'Kermit',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 42,
            type: 'Tractor',
            asset: '1943',
            location: 'Kermit',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 43,
            type: 'Tractor',
            asset: '1936',
            location: 'Kermit',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 44,
            type: 'Tractor',
            asset: '1944',
            location: 'Pleasanton',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 45,
            type: 'Tractor',
            asset: '1945',
            location: 'Kermit',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 46,
            type: 'Tractor',
            asset: '1946',
            location: 'ZT',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 57,
            type: 'Tractor',
            asset: '1947',
            location: 'Kermit',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 58,
            type: 'Tractor',
            asset: '1949',
            location: 'Kermit',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 59,
            type: 'Tractor',
            asset: '1950',
            location: 'ZT',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 70,
            type: 'Tractor',
            asset: '1952',
            location: 'Pleasanton',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 71,
            type: 'Tractor',
            asset: '1953',
            location: 'Kermit',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 72,
            type: 'Tractor',
            asset: '1954',
            location: 'ZT',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 73,
            type: 'Tractor',
            asset: '1955',
            location: 'Pleasanton',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 74,
            type: 'Tractor',
            asset: '1957',
            location: 'Pleasanton',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 75,
            type: 'Tractor',
            asset: '1958',
            location: 'ZT',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 76,
            type: 'Tractor',
            asset: '1960',
            location: 'Kermit',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 77,
            type: 'Tractor',
            asset: '2001',
            location: 'ZT',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 78,
            type: 'Tractor',
            asset: '2002',
            location: 'ZT',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 79,
            type: 'Tractor',
            asset: '2003',
            location: 'ZT',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 80,
            type: 'Tractor',
            asset: '2004',
            location: 'ZT',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 81,
            type: 'Tractor',
            asset: '2005',
            location: 'ZT',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 82,
            type: 'Tractor',
            asset: '2007',
            location: 'Kermit',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 83,
            type: 'Tractor',
            asset: '2008',
            location: 'ZT',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 84,
            type: 'Tractor',
            asset: '2009',
            location: 'ZT',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 85,
            type: 'Tractor',
            asset: '2010',
            location: 'Kermit',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 86,
            type: 'Tractor',
            asset: '2011',
            location: 'Kermit',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 87,
            type: 'Tractor',
            asset: '2012',
            location: 'ZT',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 88,
            type: 'Tractor',
            asset: '2014',
            location: 'ZT',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 89,
            type: 'Tractor',
            asset: '2015',
            location: 'Kermit',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 90,
            type: 'Tractor',
            asset: '2016',
            location: 'Kermit',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 91,
            type: 'Tractor',
            asset: '2017',
            location: 'Kermit',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 92,
            type: 'Tractor',
            asset: '2018',
            location: 'ZT',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 93,
            type: 'Tractor',
            asset: '2019',
            location: 'ZT',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 94,
            type: 'Tractor',
            asset: '2020',
            location: 'Kermit',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 95,
            type: 'Tractor',
            asset: '2021',
            location: 'Kermit',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 111,
            type: 'Tractor',
            asset: '2022',
            location: 'Kermit',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 112,
            type: 'Tractor',
            asset: '2023',
            location: 'Kermit',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 113,
            type: 'Tractor',
            asset: '2024',
            location: 'Kermit',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 114,
            type: 'Tractor',
            asset: '2025',
            location: 'Kermit',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 115,
            type: 'Tractor',
            asset: '2026',
            location: 'Kermit',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 116,
            type: 'Tractor',
            asset: '2027',
            location: 'Kermit',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 117,
            type: 'Tractor',
            asset: '2028',
            location: 'Kermit',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 118,
            type: 'Tractor',
            asset: '2029',
            location: 'Kermit',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 119,
            type: 'Tractor',
            asset: '2030',
            location: 'Kermit',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 120,
            type: 'Tractor',
            asset: '2031',
            location: 'Kermit',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 121,
            type: 'Tractor',
            asset: '2032',
            location: 'Kermit',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 122,
            type: 'Tractor',
            asset: '2033',
            location: 'Kermit',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 123,
            type: 'Tractor',
            asset: '2034',
            location: 'Kermit',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 124,
            type: 'Tractor',
            asset: '2035',
            location: 'Kermit',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 125,
            type: 'Tractor',
            asset: '2036',
            location: 'Kermit',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 126,
            type: 'Tractor',
            asset: '2037',
            location: 'Kermit',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 127,
            type: 'Tractor',
            asset: '2038',
            location: 'Kermit',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 128,
            type: 'Tractor',
            asset: '2039',
            location: 'Kermit',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
        ]}
      />
       {isOpen && <Popup handleClose={togglePopup}/>}
       </div>
    </div>
    )
}