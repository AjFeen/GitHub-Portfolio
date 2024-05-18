// src/App.js
import React, { useEffect, useState } from 'react';
import './App.css';
import ReposList from './ReposList';
import { Route, Routes } from 'react-router-dom';
import RepoData from './RepoData';
import CreateRepoModal from './CreateRepoModal';

const App = () => {
  const username = "AjFeen"
  const token = "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"

  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);


  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setRepos(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleCreateRepo = async (repoDetails) => {
    console.log(repoDetails);
    const payload = {
      name: repoDetails.name,
      description: repoDetails.description,
      private: repoDetails.private,
    };
    try {
      const response = await fetch('https://api.github.com/user/repos', {
        method: 'POST',
        headers: {
          'Authorization': `token ${token}`,
          'Content-Type': 'application/json',
          'X-GitHub-Api-Version': '2022-11-28',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to create repository');
      }

      const data = await response.json();
      alert(`Repository created: ${data.full_name}`);
      setModalIsOpen(false);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>GitHub Portfolio</h1>
        <button onClick={() => setModalIsOpen(true)}>Create New Repo</button>
      </header>
      <Routes>
        {username && <Route exact path="/" element={<ReposList username={username} repos={repos} token={token}/>} />}
        {username && <Route exact path=":reponame" element={<RepoData username={username} repos={repos}/>} />}
      </Routes>
      <CreateRepoModal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          onCreateRepo={handleCreateRepo}
        />
    </div>
  );
};

export default App;