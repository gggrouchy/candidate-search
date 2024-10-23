import { useState, useEffect } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  // Fetch saved candidates from localStorage or state
  useEffect(() => {
    const candidates = localStorage.getItem('savedCandidates');
    if (candidates) {
      setSavedCandidates(JSON.parse(candidates));
    }
  }, []);

  return (
    <>
      <h1>Potential Candidates</h1>
      {savedCandidates.length > 0 ? (
        savedCandidates.map((candidate, index) => (
          <div key={index}>
            <img src={candidate.avatar_url} alt="Candidate Avatar" />
            <p>Name: {candidate.name}</p>
            <p>Username: {candidate.login}</p>
            <p>Location: {candidate.location}</p>
            <p>Email: {candidate.email}</p>
            <p>Company: {candidate.company}</p>
            <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
              GitHub Profile
            </a>
          </div>
        ))
      ) : (
        <p>No saved candidates available.</p>
      )}
    </>
  );
};

export default SavedCandidates;
