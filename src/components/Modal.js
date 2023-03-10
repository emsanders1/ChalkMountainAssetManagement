import React, { useState } from 'react';
import { Modal, Button, TextField } from '@mui/material';
import './Modal.css';

const AssetModal = ({ isOpen, selectedAsset, handleInService, handleOutOfService, handleClose }) => {
  const [isInService, setIsInService] = useState(selectedAsset.STATUS === 'In Service');
  const [note, setNote] = useState('');

  const handleChange = (event) => {
    setIsInService(event.target.value === 'In Service');
  };

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isInService) {
      handleInService();
    } else {
      handleOutOfService(note);
    }
    handleClose();
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
              <select id="status" name="status" value={isInService ? 'In Service' : 'Out of Service'} onChange={handleChange}>
                <option value="In Service">In Service</option>
                <option value="Out of Service">Out of Service</option>
              </select>
            </div>
            {!isInService && (
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