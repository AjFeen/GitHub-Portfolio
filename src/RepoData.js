import React from 'react'
import { useParams } from 'react-router-dom'

const RepoData = ({username, repos}) => {

    const {reponame} = useParams()
    const repo = repos.find((repo)=> repo.name === reponame)
    console.log(repo);

  return (
    <div className='repo-data'>
      <p>Repository Name: {repo.name}</p>
      <p>Repository FullName: {repo.full_name}</p>
      <p> Repository visibility: {repo.visibility}</p>
      <p>Repository URL: <span><a href={repo.html_url} target={'_blank'}>{repo.html_url}</a></span></p>
    </div>
  )
}

export default RepoData
