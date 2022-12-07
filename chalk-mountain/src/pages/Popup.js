import React from "react";
const Popup = props => {

  function outOfServiceFunction() {
    var assetTable;
    assetTable = document.getElementById("assetTable");
    console.log(assetTable);
    assetTable.innerHTML = "IN-SERVICE";
    console.log(assetTable);
  }

  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>x</span>
        <b>Updating Asset</b>
        <div className="popUpRadioButtons">
        <input type="radio" value="In-Service" name="updates" /> In-Service
        <input type="radio" value="Out-Of-Service" name="updates" /> Out-Of-Service
        </div>
        <div className="popUpSaveButtons">
        <button onClick={props.handleClose}>Cancel</button>
        <button onClick={outOfServiceFunction}>Continue</button>
        </div>
      </div>
    </div>
  );
};
 
export default Popup;