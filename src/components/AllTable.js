import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import SearchIcon from "@mui/icons-material/Search";
import {alpha, styled} from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import {fetchData} from './AllTable';
import AssetModal from './Modal';
import './Modal.css';
import { fontFamily } from '@mui/system';
import { isDisabled } from '@testing-library/user-event/dist/utils';
import { LegendToggleOutlined } from '@mui/icons-material';

const AssetTable = () => {
  const [assets, setAssets] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [sortColumn, setSortColumn] = useState('UNITNUMBER');
  const [sortOrder, setSortOrder] = useState('ASC');
  const [statusBit, setStatusBit] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [searchInputValue, setSearchInputValue] = useState('');

  useEffect(() => {
    const fetchData = async () => {
        try{
            let url = `http://localhost:8090/api/assets?pageSize=${pageSize}&pageNumber=${pageNumber}&sortColumn=${sortColumn}&sortOrder=${sortOrder}`;
            if (statusBit != null){
              url += `&statusBit=${statusBit}`;
            }
            if (searchText != ''){
              url += `&searchText=${searchText}`;
            }
            const response = await fetch(url);
            var data = await response.json();

            const response1 = await fetch(`http://localhost:8090/api/ldap/getGroups`);
            const data1 = await response1.json();

            data.forEach((obj) => {          
                let buttonEval = false;
          
                if(data1.includes('ShopAdmin')) {
                  console.log('Includes ShopAdmin');
                  buttonEval = false;
                } else if(data1.includes('YardCoordinator')) {
                  console.log('Includes YardCoordinator');
                  buttonEval = !obj.STATUS;
                } else if(data1.includes('Mechanic')) {
                  console.log('Includes Mechanic');
                  buttonEval = obj.STATUS;
                } else {
                  buttonEval = true;
                }
          
                // console.log("Button disabled? " + buttonEval);
              obj.modifiable = buttonEval;
            });

            console.log(data)
            setAssets(data);
        } catch (error) {
            console.error(error);
        }
    };
    fetchData();
  }, [pageSize, pageNumber, sortColumn, sortOrder, statusBit, searchText]);

  const handlePageSizeChange = (event) => {
    console.log("Page size changed to:", event.target.value);
    setPageSize(event.target.value);
    setPageNumber(1);
  };

  const handlePageNumberChange = (event, newPageNumber) => {
    setPageNumber(newPageNumber + 1);
  };

  const handleSortChange = (event, newSortColumn) => {
    const isAscending = sortColumn === newSortColumn && sortOrder === 'ASC';
    setSortColumn(newSortColumn);
    setSortOrder(isAscending ? 'DESC' : 'ASC');
  };

  const renderSortArrow = (columnName) => {
    if(columnName === sortColumn) {
      return sortOrder === 'DESC' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />;
    }
    return null;
  };

  const filterInFunction = (event) => {
    setStatusBit(event.target.value);
    setStatusBit(1);
  };

  const filterOutFunction = (event) => {
    setStatusBit(event.target.value);
    setStatusBit(0);
  };

  const filterAllFunction = (event) => {
    setStatusBit(event.target.value);
    setStatusBit(null);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = (asset) => {
    setSelectedAsset(asset);
    handleModalOpen();
  };

  const handleInService = async () => {
    try {
      var ldapUsername = ""
      const response1 = await fetch('http://localhost:8090/api/ldap/getName');
      const data1 = await response1.json()
      if(data1 ===  "Signed Out User") {
        ldapUsername = "NULL"
       } else {
        ldapUsername = data1
       }

      const response = await fetch(`http://localhost:8090/api/assets/sendInService?assetId=${selectedAsset.UNITNUMBER}&user=${ldapUsername}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedAsset),
      });
      const data = await response.json();
      console.log(data);
      setSelectedAsset(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOutOfService = async (note) => {
    try {
      var ldapUsername = ""
      const response1 = await fetch('http://localhost:8090/api/ldap/getName');
      const data1 = await response1.json()
      if(data1 ===  "Signed Out User") {
        ldapUsername = "NULL"
       } else {
        ldapUsername = data1
       }

      const response = await fetch(`http://localhost:8090/api/assets/sendOutOfService?assetId=${selectedAsset.UNITNUMBER}&user=${ldapUsername}&notes=${note}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedAsset),
      });
      const data = await response.json();
      console.log(data);
      setSelectedAsset(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = async (event) => {
    // event.preventDefault();
    // const response = await fetch(`http://localhost:8090/api/assets?pageSize=${pageSize}&pageNumber=${pageNumber}&sortColumn=${sortColumn}&sortOrder=${sortOrder}&searchText=${searchText}`);
    // const data = await response.json();
    // console.log('search text:', searchText);
    // setAssets(data);
    setSearchText(event.target.value);
  };

  const isButtonDisabled = async (assetStatus) => {
    try {
      const response = await fetch(`http://localhost:8090/api/ldap/getGroups`);
      const data = await response.json();
      console.log(data);

      let buttonEval = false;

      if(data.includes('ShopAdmin')) {
        console.log('Includes ShopAdmin');
        buttonEval = false;
      } else if(data.includes('YardCoordinator')) {
        console.log('Includes YardCoordinator');
        console.log(!assetStatus);
        buttonEval = !assetStatus;
      } else if(data.includes('Mechanic')) {
        console.log('Includes Mechanic');
        buttonEval = assetStatus;
      } else {
        buttonEval = true;
      }

      console.log("Button disabled? " + buttonEval)
      return buttonEval;
    } catch (error) {
      console.log(error);
    }
  }
    

  return (
    <>
     <div className="switchbar">
            <ButtonGroup variant="contained" color="error" className="switch" aria-label="First group">
                <Button onClick={filterAllFunction}>All</Button>
                <Button onClick={filterInFunction}>In-Service</Button>
                <Button onClick={filterOutFunction}>Out-of-Service</Button>
            </ButtonGroup>
            <form id="search-form" >
                <InputBase style={{ backgroundColor: 'white', fontFamily: 'fantasy'}} placeholder="Search..." onChange={handleSearch}/>
            </form>
        </div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='center' onClick={(event) => handleSortChange(event, 'TYPE')}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <span>Type</span>
                <IconButton size="small" style={{ marginLeft: '4px'}}>
                  {renderSortArrow('TYPE')}
                </IconButton>
                </div>
              </TableCell>
              <TableCell align='center' onClick={(event) => handleSortChange(event, 'UNITNUMBER')}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <span>Asset</span>
                <IconButton size="small" style={{ marginLeft: '4px'}}>
                  {renderSortArrow('UNITNUMBER')}
                </IconButton>
                </div>
              </TableCell>
              <TableCell align='center' onClick={(event) => handleSortChange(event, 'LOCATION')}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <span>Location</span>
                <IconButton size="small" style={{ marginLeft: '4px'}}>
                  {renderSortArrow('LOCATION')}
                </IconButton>
                </div>
              </TableCell>
              <TableCell align='center' onClick={(event) => handleSortChange(event, 'STATUS')}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <span>Status</span>
                <IconButton size="small" style={{ marginLeft: '4px'}}>
                  {renderSortArrow('STATUS')}
                </IconButton>
                </div>
              </TableCell>
              <TableCell align='center' onClick={(event) => handleSortChange(event, 'MOST_RECENT_UPDATE')}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <span>Date</span>
                <IconButton size="small" style={{ marginLeft: '4px'}}>
                  {renderSortArrow('MOST_RECENT_UPDATE')}
                </IconButton>
                </div>
              </TableCell>
              <TableCell align='center' onClick={(event) => handleSortChange(event, 'USER')}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <span>Employee</span>
                <IconButton size="small" style={{ marginLeft: '4px'}}>
                  {renderSortArrow('USER')}
                </IconButton>
                </div>
              </TableCell>
              <TableCell align='center' onClick={(event) => handleSortChange(event, 'NOTES')}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <span>Notes</span>
                <IconButton size="small" style={{ marginLeft: '4px'}}>
                  {renderSortArrow('NOTES')}
                </IconButton>
                </div>
              </TableCell>
              <TableCell align='center'>
                Modify
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assets.map((asset) => (
              <TableRow key={asset.UNITNUMBER}>
                <TableCell align='center'>
                  {asset.TYPE}
                </TableCell>
                <TableCell align='center'>
                  {asset.UNITNUMBER}
                </TableCell>
                <TableCell align='center'>
                  {asset.LOCATION}
                </TableCell>
                <TableCell align='center'>
                  {asset.STATUS ? "In Service" : "Out of Service"}
                </TableCell>
                <TableCell align='center'>
                  {asset.MOST_RECENT_UPDATE}
                </TableCell>
                <TableCell align='center'>
                  {asset.USER}
                </TableCell>
                <TableCell align='center'>
                  {asset.NOTES}
                </TableCell>
                <TableCell align='center'>
                  <button disabled={asset.modifiable} onClick={() => handleOpenModal(asset)}>
                    Modify
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {selectedAsset && (
        <AssetModal id="asset-modal"
          isOpen={isModalOpen}
          selectedAsset={selectedAsset}
          handleInService={handleInService}
          handleOutOfService={handleOutOfService}
          handleClose={() => setSelectedAsset(null)}
        />
      )}
      <TablePagination
        component="div"
        count={1000} 
        page={pageNumber - 1}
        rowsPerPage={pageSize}
        rowsPerPageOptions={[5,10, 25, 50, 100]}
        onPageChange={handlePageNumberChange}
        onRowsPerPageChange={handlePageSizeChange}
      />
    </>
  );
};

export default AssetTable;
