import React from "react";
 
const Popup = props => {
  return (
    <div className="popup-box">
      <div className="box">
        <b>Add Comment: </b>
        <textarea></textarea>
        <div className="popUpSaveButtons">
        <button onClick={props.handleClose}>Cancel</button>
        <button>Save</button>
        </div>
      </div>
    </div>
  );
};
 
export default Popup;