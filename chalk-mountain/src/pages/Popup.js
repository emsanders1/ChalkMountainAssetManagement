import React from "react";
 
const Popup = props => {
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
        <button>Continue</button>
        </div>
      </div>
    </div>
  );
};
 
export default Popup;