// src/DeleteRepoModal.js
import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const DeleteRepoModal = ({ isOpen, onRequestClose, onDeleteRepo, repo }) => {
  const handleDelete = (event) => {
    event.preventDefault();
    onDeleteRepo(repo);
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Delete Repository">
      <h2>Delete GitHub Repository</h2>
      <p>Are you sure you want to delete this repository?</p>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={onRequestClose}>Cancel</button>
    </Modal>
  );
};

export default DeleteRepoModal;
