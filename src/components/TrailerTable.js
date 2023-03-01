import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material';

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
            const response = await fetch(`http://localhost:8090/api/assets/trailers?pageSize=${pageSize}&pageNumber=${pageNumber}`)
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

  const handleStatusBitChange = (event) => {
    setStatusBit(event.target.value);
  };

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='center'>
                Type
              </TableCell>
              <TableCell align='center'>
                Asset
              </TableCell>
              <TableCell align='center'>
                Location
              </TableCell>
              <TableCell align='center'>
                Status
              </TableCell>
              <TableCell align='center'>
                Date
              </TableCell>
              <TableCell align='center'>
                Employee
              </TableCell>
              <TableCell align='center'>
                Notes
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
        count={1000} // set a large enough number so that the pagination shows up
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
