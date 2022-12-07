import React from "react";
const Popup = props => {

  function outOfServiceFunction() {
    var assetStatus;
    var assetNotes;
    var assetDate;
    assetStatus = document.getElementById("assetStatus");
    assetNotes = document.getElementById("assetNotes");
    assetDate = document.getElementById("assetDate");
    console.log(assetStatus);
    assetNotes.innerHTML = "";
    assetStatus.innerHTML = "IN-SERVICE";
    assetDate.innerHTML = "12/07/2022";
    console.log(assetStatus);
  }
  function run(){
    outOfServiceFunction();
    props.handleClose();
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
        <button onClick={run}>Continue</button>
        </div>
      </div>
    </div>
  );
};
 
export default Popup;