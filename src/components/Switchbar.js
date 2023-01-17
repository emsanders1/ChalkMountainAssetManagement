import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';

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

    return(
        <div className="switchbar">
             <ButtonGroup className="switch" aria-label="First group">
                <Button variant="light" onClick={filterAllFunction}>All</Button>
                <Button onClick={filterInFunction}>In-Service</Button>
                <Button onClick={filterOutFunction}>Out-of-Service</Button>
            </ButtonGroup>
            <ButtonGroup className="search" aria-label="Second group">
            <Form className="d-flex">
                <Form.Control type="search" id="myInput" onKeyUp={searchFunction} placeholder="Search for Assets" aria-label="Search"/>
            </Form>
            </ButtonGroup>
        </div>
    )
}
