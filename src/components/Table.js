import * as React from 'react';
import { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import {alpha, styled} from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import {useState} from "react";
import SearchIcon from "@mui/icons-material/Search";

function createData(type, asset, location, status, date, employee, notes, modify) {
    return {
        type,
        asset,
        location,
        status,
        date,
        employee,
        notes,
        modify
    };
}

// const rows = [
//     createData('Trailer', 'S211', 'Pleasanton', 'OUT-OF-SERVICE', '12/05/22', "M.F.", 'Tire Burst', <button>Update</button>),
//     createData('Trailer', 'S212', 'Pleasanton', 'OUT-OF-SERVICE', '12/05/22', "M.F.", 'Radiator Broken', <button>Update</button>),
//     createData('Tractor', 'S214', 'ZT', 'IN-SERVICE', '12/05/22', "M.F.", '', <button>Update</button>),
//     createData('Trailer', 'S215', 'Pleasanton', 'OUT-OF-SERVICE', '12/05/22', "M.F.", '', <button>Update</button>),
//     createData('Trailer', 'S216', 'ZT', 'IN-SERVICE', '12/05/22', "M.F.", '', <button>Update</button>),
//     createData('Trailer', 'S217', 'ZT', 'IN-SERVICE', '12/05/22', "M.F.", '', <button>Update</button>),
//     createData('Tractor', 'S218', 'Pleasanton', 'OUT-OF-SERVICE', '12/05/22', "M.F.", '', <button>Update</button>),
//     createData('Trailer', 'S220', 'ZT', 'IN-SERVICE', '12/05/22', "M.F.", '', <button>Update</button>),
//     createData('Trailer', 'S223', 'Pleasanton', 'OUT-OF-SERVICE', '12/05/22', "M.F.", '', <button>Update</button>),
//     createData('Tractor', 'S234', 'ZT', 'OUT-OF-SERVICE', '12/05/22', "M.F.", '', <button>Update</button>),
//     createData('Trailer', 'S245', 'Pleasanton', 'OUT-OF-SERVICE', '12/05/22', "M.F.", '', <button>Update</button>),
//     createData('Trailer', 'S256', 'ZT', 'OUT-OF-SERVICE', '12/05/22', "M.F.", '', <button>Update</button>),
//     createData('Trailer', 'S258', 'Pleasanton', 'OUT-OF-SERVICE', '12/05/22', "M.F.", '', <button>Update</button>),
// ];

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
});

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'type',
        disablePadding: true,
        label: 'Type',
    },
    {
        id: 'asset',
        disablePadding: false,
        label: 'Asset',
    },
    {
        id: 'location',
        disablePadding: false,
        label: 'Location',
    },
    {
        id: 'status',
        disablePadding: false,
        label: 'Status',
    },
    {
        id: 'date',
        disablePadding: false,
        label: 'Date Last Modified',
    },
    {
        id: 'employee',
        disablePadding: false,
        label: 'Employee',
    },
    {
        id: 'notes',
        disablePadding: false,
        label: 'Notes',
    },
    {
        id: 'modify',
        disablePadding: false,
        label: 'Modify',
    },
];

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.55),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.75),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={"center"}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
};

export default function EnhancedTable() {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('asset');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const classes = useStyles();
    const [data, setData] = useState([]);

    useEffect(() => {
            // fetch('https://localhost:8090/api/assets')
            fetch('https://jsonplaceholder.typicode.com/posts')
              .then(response => response.json())
              .then(data => setData(data));
          }, []);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <TableContainer id={"myTable"}>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                    >
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={data.length}
                        />
                        <TableBody>
                            {stableSort(data, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        data.map(row => (
                                            <TableRow key={row.id}>
                                                <TableCell component="th" scope="row">{row.LOCATION}</TableCell>
                                                <TableCell align="right">{row.title}</TableCell>
                                                <TableCell align="right">{row.body}</TableCell>
                                            </TableRow>
                                            // change to unitnumber, location, status, most_recent_update, user, notes
                                            ))
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    // count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

        </Box>
    );
}

// import React, { useState, useEffect } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';

// const useStyles = makeStyles({
//   root: {
//     width: '100%',
//     overflowX: 'auto',
//   },
//   table: {
//     minWidth: 650,
//   },
// });


// function descendingComparator(a, b, orderBy) {
//         if (b[orderBy] < a[orderBy]) {
//             return -1;
//         }
//         if (b[orderBy] > a[orderBy]) {
//             return 1;
//         }
//         return 0;
// }
    
// function getComparator(order, orderBy) {
//     return order === 'desc'
//         ? (a, b) => descendingComparator(a, b, orderBy)
//         : (a, b) => -descendingComparator(a, b, orderBy);
// }
// function stableSort(array, comparator) {
//     const stabilizedThis = array.map((el, index) => [el, index]);
//     stabilizedThis.sort((a, b) => {
//         const order = comparator(a[0], b[0]);
//         if (order !== 0) {
//             return order;
//         }
//         return a[1] - b[1];
//     });
//     return stabilizedThis.map((el) => el[0]);
// }

// export default function DenseTable() {
//   const classes = useStyles();
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     fetch('https://localhost:8090/api/assets')
//       .then(response => response.json())
//       .then(data => setData(data));
//   }, []);

//   return (
//     <Paper className={classes.root}>
//       <Table className={classes.table} size="small">
//         <TableHead>
//           <TableRow>
//             <TableCell>Type</TableCell>
//             <TableCell align="right">Asset</TableCell>
//             <TableCell align="right">Location</TableCell>
//             <TableCell align="right">Status</TableCell>
//             <TableCell align="right">Date Last Modified</TableCell>
//             <TableCell align="right">Employee</TableCell>
//             <TableCell align="right">Notes</TableCell>
//             <TableCell align="right">Modify</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {data.map(row => (
//             <TableRow key={row.id}>
//               <TableCell component="th" scope="row">{row.LOCATION}</TableCell>
//               <TableCell align="right">{row.title}</TableCell>
//               <TableCell align="right">{row.body}</TableCell>
//             </TableRow>
//             // change to unitnumber, location, status, most_recent_update, user, notes
//           ))}
//         </TableBody>
//       </Table>
//     </Paper>
//   );
// }
