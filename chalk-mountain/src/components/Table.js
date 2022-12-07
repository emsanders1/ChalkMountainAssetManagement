import Popup from '../pages/Popup';
import React, { useState } from 'react';

//SORT FUNCTION 
const useSortableData = (assets, config = null) => {
  const [sortConfig, setSortConfig] = React.useState(config);

  const sortedAssets = React.useMemo(() => {
    let sortableAssets = [...assets];
    if (sortConfig !== null) {
      sortableAssets.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableAssets;
  }, [assets, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return { assets: sortedAssets, requestSort, sortConfig };
};


export const AssetTable = (props) => {
  const { assets, requestSort, sortConfig } = useSortableData(props.assets);
  const getClassNamesFor = (asset) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === asset ? sortConfig.direction : undefined;
  };
  return (
    <table id="myTable">
      <thead>
        <tr id="tableHeader">
          <th> TYPE </th>
          <th>
            <button type="button" onClick={() => requestSort('asset')} className={getClassNamesFor('asset')} id='assetButton'> ASSET ▼▲</button>
          </th>
          <th> LOCATION</th>
          <th>
            <button type="button" onClick={() => requestSort('status')} className={getClassNamesFor('status')} id="statusButton"> STATUS ▼▲</button>
          </th>
          <th> DATE LAST MODIFIED </th>
          <th> Employee</th>
          <th> Notes </th>
          <th> Modify </th>
        </tr>
      </thead>
      <tbody>
        {assets.map((asset) => (
          <tr key={asset.id}>
            <td>{asset.type}</td>
            <td>{asset.asset}</td>
            <td>{asset.location}</td>
            <td id="assetTable">{asset.status}</td>
            <td>{asset.date}</td>
            <td>{asset.employee}</td>
            <td>{asset.notes}</td>
            <td>{asset.modify}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default function Table(){
    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
      setIsOpen(!isOpen);
    }

    
    return (
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
            asset: 'S215',
            location: 'Pleasanton',
            status: 'OUT-OF-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 5,
            type: 'Trailer',
            asset: 'S216',
            location: 'Pleasanton',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 6,
            type: 'Trailer',
            asset: 'S217',
            location: 'Pleasanton',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 7,
            type: 'Trailer',
            asset: 'S218',
            location: 'Pleasanton',
            status: 'OUT-OF-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 8,
            type: 'Trailer',
            asset: 'G3272',
            location: 'ZT',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 9,
            type: 'Trailer',
            asset: 'G3273',
            location: 'ZT',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 10,
            type: 'Trailer',
            asset: 'G3274',
            location: 'ZT',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 11,
            type: 'Trailer',
            asset: 'G3275',
            location: 'ZT',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 12,
            type: 'Trailer',
            asset: 'G3276',
            location: 'ZT',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 13,
            type: 'Trailer',
            asset: 'G3277',
            location: 'ZT',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 14,
            type: 'Trailer',
            asset: 'G3278',
            location: 'ZT',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 15,
            type: 'Trailer',
            asset: 'G3279',
            location: 'ZT',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 16,
            type: 'Trailer',
            asset: 'G3280',
            location: 'ZT',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 17,
            type: 'Trailer',
            asset: 'G3281',
            location: 'ZT',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 18,
            type: 'Tractor',
            asset: '1627',
            location: 'Pleasanton',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
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
          { id: 22,
            type: 'Trailer',
            asset: 'S519',
            location: 'ZT',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 23,
            type: 'Trailer',
            asset: 'S520',
            location: 'Kermit',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 24,
            type: 'Trailer',
            asset: 'S521',
            location: 'Kermit',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 25,
            type: 'Trailer',
            asset: 'S522',
            location: 'Kermit',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 26,
            type: 'Trailer',
            asset: 'S523',
            location: 'Kermit',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 27,
            type: 'Trailer',
            asset: 'S524',
            location: 'Kermit',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 28,
            type: 'Trailer',
            asset: 'S525',
            location: 'Kermit',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 29,
            type: 'Trailer',
            asset: 'S526',
            location: 'ZT',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 30,
            type: 'Trailer',
            asset: 'S527',
            location: 'Kermit',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 31,
            type: 'Trailer',
            asset: 'S528',
            location: 'Kermit',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 32,
            type: 'Trailer',
            asset: 'S529',
            location: 'ZT',
            status: 'IN-SERVICE',
            date: '',
            employee: '',
            notes: '',
            modify: <input type="button" value="update" onClick={togglePopup}
          /> },
          { id: 33,
            type: 'Trailer',
            asset: 'S530',
            location: 'Kermit',
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
        ]}
      />
    {isOpen && <Popup handleClose={togglePopup}/>}
  </div>
    )
}

