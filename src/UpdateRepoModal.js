// src/UpdateRepoModal.js
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const UpdateRepoModal = ({ isOpen, onRequestClose, onUpdateRepo, repo }) => {
  const [repoName, setRepoName] = useState('');
  const [description, setDescription] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  useEffect(() => {
    if (repo) {
      setRepoName(repo.name);
      setDescription(repo.description);
      setIsPrivate(repo.private);
    }
  }, [repo]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdateRepo({ name: repoName, description, private: isPrivate });
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Update Repository">
      <h2>Update GitHub Repository</h2>
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
        <button type="submit">Update</button>
        <button type="button" onClick={onRequestClose}>Cancel</button>
      </form>
    </Modal>
  );
};

export default UpdateRepoModal;
