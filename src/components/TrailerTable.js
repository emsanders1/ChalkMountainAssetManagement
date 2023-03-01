import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const AssetTable = () => {
  const [assets, setAssets] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [sortColumn, setSortColumn] = useState('UNITNUMBER');
  const [sortOrder, setSortOrder] = useState('ASC');
  const [statusBit, setStatusBit] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
        try{
            let url = `http://localhost:8090/api/assets/trailers?pageSize=${pageSize}&pageNumber=${pageNumber}&sortColumn=${sortColumn}&sortOrder=${sortOrder}`;
            if (statusBit != null){
              url += `&statusBit=${statusBit}`;
            }
            const response = await fetch(url);
            const data = await response.json();
            setAssets(data);
        } catch (error) {
            console.error(error);
        }
    };
    fetchData();
  }, [pageSize, pageNumber, sortColumn, sortOrder, statusBit]);

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

  const handleStatusBitChange = (event) => {
    setStatusBit(event.target.value);
  };

  return (
    <>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
