// src/ReposList.js
import React, { useState } from 'react';
import './App.css';
import { NavLink } from 'react-router-dom';
import UpdateRepoModal from './UpdateRepoModal';
import DeleteRepoModal from './DeleteRepoModal';

const ReposList = ({ username, repos, token }) => {
  
  const [repoName, setRepoName] = useState('');
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);

  //console.log(repos);

  
   const handleInputChange = (event) => {
     setRepoName(event.target.value);
   };

   const handleUpdateRepo = async (repoDetails) => {
    const payload = {
      name: repoDetails.name,
      description: repoDetails.description,
      private: repoDetails.private,
    };

    try {
      const response = await fetch(`https://api.github.com/repos/${username}/${selectedRepo.name}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `token ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const responseBody = await response.json();

      if (!response.ok) {
        console.log('Error response:', responseBody);
        throw new Error(`Failed to update repository: ${responseBody.message}`);
      }

      alert(`Repository updated: ${responseBody.full_name}`);
      setUpdateModalIsOpen(false);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDeleteRepo = async (repo) => {
    try {
      const response = await fetch(`https://api.github.com/repos/${username}/${repo.name}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `token ${token}`,
        },
      });

      if (response.status !== 204) {
        const responseBody = await response.json();
        console.log('Error response:', responseBody);
        throw new Error(`Failed to delete repository: ${responseBody.message}`);
      }

      alert(`Repository deleted: ${repo.name}`);
      setDeleteModalIsOpen(false);
    } catch (error) {
      alert(error.message);
    }
  };


  const handleRepoSelect = (repo, action) => {
    setSelectedRepo(repo);
    if (action === "update") {
      setUpdateModalIsOpen(true)
    } else {
      setDeleteModalIsOpen(true);
    }
  };

  return (
    <div>
      <h2>Repositories of {username}</h2>
      <input
          type="text"
          value={repoName}
          onChange={handleInputChange}
          placeholder="Search Repository"
        />
      <div>
        {repos.map(repo => (
          <div className='single-repo' key={repo.id}>
          <NavLink to={repo.name} key={repo.id}>
            <h4>{repo.name}</h4>
            <p>{repo.visibility}</p>
          </NavLink>
          <div className='buttons'>
            <button onClick={() => handleRepoSelect(repo, 'update')}>Update This Repo</button>
            <button onClick={() => handleRepoSelect(repo, 'delete')}>Delete This Repo</button>
          </div>
            <UpdateRepoModal
              isOpen={updateModalIsOpen}
              onRequestClose={() => setUpdateModalIsOpen(false)}
              onUpdateRepo={handleUpdateRepo}
              repo={selectedRepo}
            />
            <DeleteRepoModal
              isOpen={deleteModalIsOpen}
              onRequestClose={() => setDeleteModalIsOpen(false)}
              onDeleteRepo={handleDeleteRepo}
              repo={selectedRepo}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReposList;
