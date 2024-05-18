// src/CreateRepoModal.js
import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const CreateRepoModal = ({ isOpen, onRequestClose, onCreateRepo }) => {
  const [repoName, setRepoName] = useState('');
  const [description, setDescription] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    onCreateRepo({ name: repoName, description, private: isPrivate });
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Create Repository">
      <h2>Create a New GitHub Repository</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Repository Name</label>
          <input
            type="text"
            value={repoName}
            onChange={(e) => setRepoName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={isPrivate}
              onChange={(e) => setIsPrivate(e.target.checked)}
            />
            Private
          </label>
        </div>
        <button type="submit">Create</button>
        <button type="button" onClick={onRequestClose}>Cancel</button>
      </form>
    </Modal>
  );
};

export default CreateRepoModal;
