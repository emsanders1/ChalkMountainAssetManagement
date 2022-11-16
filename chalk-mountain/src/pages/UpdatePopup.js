// import CommentPopup from '../pages/CommentPopup';
import React from 'react';
 
export default function UpdatePopup(props) {
  
  return (
    <div className="popup-box">
      <div className="box">
        <b>Updating Asset</b>
        <div className="popUpRadioButtons" id="hello">
        <input type="radio" value="In-Service" name="updates" /> In-Service
        <input type="radio" value="Out-Of-Service" name="updates" /> Out-Of-Service
        </div>
        <div className="popUpSaveButtons">
        <button onClick={props.handleClose}>Cancel</button>
        <button onClick={props.handleNext}>Continue</button>
        </div>
      </div>
    </div>
  );
};
 
