import React from 'react';

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

const AssetTable = (props) => {
  const { assets, requestSort, sortConfig } = useSortableData(props.assets);
  const getClassNamesFor = (asset) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === asset ? sortConfig.direction : undefined;
  };
  return (
    <table>
      <thead>
        <tr>
          <th>
            <button type="button" onClick={() => requestSort('asset')} className={getClassNamesFor('asset')} id='assetButton'> ASSET ▼▲ </button>
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
    return (
    <div className="tableSection">
    <AssetTable
        assets={[
          { id: 1, asset: 'ABC', status: 'IN-SERVICE', date: '02/12/2022', employee: 'J.F.', notes: '', modify: <button>Update</button> },
          { id: 2, asset: 'DEF', status: 'OUT-OF-SERVICE', date: '08/19/2022', employee: 'M.B.', notes: 'Punctured tire', modify: <button>Update</button>  },
          { id: 3, asset: 'GHI', status: 'OUT-OF-SERVICE', date: '07/03/2022', employee: 'E.S.', notes: 'Needs New Shocks', modify: <button>Update</button>  },
          { id: 4, asset: 'JKL', status: 'IN-SERVICE', date: '06/28/2022', employee: 'Z.N.', notes: '', modify: <button>Update</button>  },
        ]}
      />
    </div>
    )
}


