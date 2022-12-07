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
            <td>{asset.status}</td>
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
    )
}

