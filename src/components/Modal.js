import React, { useState } from 'react';
import { Modal, Button, TextField } from '@mui/material';
import './Modal.css';

const AssetModal = ({ isOpen, selectedAsset, handleInService, handleOutOfService, handleClose }) => {
  const [note, setNote] = useState('');

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!selectedAsset.STATUS) {
      handleInService();
    } else {
      handleOutOfService(note);
    }
    handleClose();
     setTimeout(function() {
      window.location.reload();
    }, 100);
  };

  return (
    <Modal open={Boolean(selectedAsset)} onClose={handleClose}>
      <div className="modal-container">
        <div className="modal-content">
          <div className="modal-header">
            <h2>{selectedAsset?.UNITNUMBER} - {selectedAsset?.TYPE}</h2>
            <button className="modal-close" onClick={handleClose}>X</button>
          </div>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="status">Set Status:</label>
              <select id="status" name="status" value={selectedAsset.STATUS ? "Out of Service" : "In Service"}>
                <option value="In Service" disabled={selectedAsset.STATUS}>In Service</option>
                <option value="Out of Service" disabled={!selectedAsset.STATUS}>Out of Service</option>
              </select>
            </div>
            {selectedAsset.STATUS && (
              <div className="modal-note">
                <label htmlFor="note">Note:</label>
                <textarea
                  id="note"
                  name="note"
                  value={note}
                  onChange={handleNoteChange}
                />
              </div>
            )}
            <div className="modal-button-group">
              <Button className="primary" variant="outlined" color="primary" type="submit">Save</Button>
              <Button className="secondary" variant="outlined" onClick={handleClose}>Cancel</Button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default AssetModal;