import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import SearchIcon from "@mui/icons-material/Search";
import * as React from "react";
import {alpha, styled} from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import {useState} from "react";
import {fetchData} from './AllTable';

export default function Switchbar(){
      function searchFunction() {
      }
      
      function filterInFunction(){
        
      }

      function filterOutFunction(){
       
      }

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



    return(
        <div className="switchbar">
            <ButtonGroup variant="contained" color="error" className="switch" aria-label="First group">
                <Button>All</Button>
                {/* onClick={filterAllFunction} */}
                {/* {showTable && <Table />} */}
                <Button onClick={filterInFunction}>In-Service</Button>
                <Button onClick={filterOutFunction}>Out-of-Service</Button>
            </ButtonGroup>
            <Search>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                />
            </Search>
        </div>
    )
}
