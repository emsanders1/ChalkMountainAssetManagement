import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import SearchIcon from "@mui/icons-material/Search";
import * as React from "react";
import {alpha, styled} from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import {useState} from "react";

export default function Switchbar(){
    function searchFunction() {
        var input, filter, table, tr, td, i;
        input = document.getElementById("myInput");
        filter = input.value;
        filter = filter.toUpperCase();
        table = document.getElementById("myTable");
        tr = table.getElementsByTagName("tr");
      
        for(i=0; i < tr.length; i++) {
          var tds = tr[i].getElementsByTagName("td");
          var flag = false;
          for(var j=0; j < tds.length; j++){
            var td = tds[j];
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1){
              flag = true;
            }
          }
          if(flag) {
              tr[i].style.display = "";
              flag = false;
          }else {
            if(tr[i].id != 'tableHeader'){
                tr[i].style.display = "none";
            }
          }
        }
      }
      function filterAllFunction(){
        var filter, table, tr, td, i;
        filter = "SERVICE";
        table = document.getElementById("myTable");
        tr = table.getElementsByTagName("tr");
      
        for(i=0; i < tr.length; i++) {
          var tds = tr[i].getElementsByTagName("td");
          var flag = false;
          for(var j=0; j < tds.length; j++){
            var td = tds[j];
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1){
              flag = true;
            }
          }
          if(flag) {
              tr[i].style.display = "";
              flag = false;
          }else {
            if(tr[i].id != 'tableHeader'){
                tr[i].style.display = "none";
            }
          }
        }
      }
      function filterInFunction(){
        var filter, table, tr, td, i;
        filter = "IN-SERVICE";
        table = document.getElementById("myTable");
        tr = table.getElementsByTagName("tr");
      
        for(i=0; i < tr.length; i++) {
          var tds = tr[i].getElementsByTagName("td");
          var flag = false;
          for(var j=0; j < tds.length; j++){
            var td = tds[j];
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1){
              flag = true;
            }
          }
          if(flag) {
              tr[i].style.display = "";
              flag = false;
          }else {
            if(tr[i].id != 'tableHeader'){
                tr[i].style.display = "none";
            }
          }
        }
      }
      function filterOutFunction(){
        var filter, table, tr, td, i;
        filter = "OUT-OF-SERVICE";
        table = document.getElementById("myTable");
        tr = table.getElementsByTagName("tr");
      
        for(i=0; i < tr.length; i++) {
          var tds = tr[i].getElementsByTagName("td");
          var flag = false;
          for(var j=0; j < tds.length; j++){
            var td = tds[j];
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1){
              flag = true;
            }
          }
          if(flag) {
              tr[i].style.display = "";
              flag = false;
          }else {
            if(tr[i].id != 'tableHeader'){
                tr[i].style.display = "none";
            }
          }
        }
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
                <Button onClick={filterAllFunction}>All</Button>
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
