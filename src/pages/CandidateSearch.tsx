import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';
import { useCandidates } from '../context/CandidatesContext';

const CandidateSearch = () => {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const { saveCandidate } = useCandidates();

  useEffect(() => {
    fetchCandidate();
  }, []);

  const fetchCandidate = async () => {
    try {
      const data: Candidate[] = await searchGithub();
      if (data.length > 0) {
        const randomUser = data[Math.floor(Math.random() * data.length)];
        const detailedUser: Candidate = await searchGithubUser(randomUser.login);
        setCandidate(detailedUser); // Set only if the candidate matches the Candidate type
      } else {
        setCandidate(null);
      }
    } catch (err) {
      console.error('Error fetching candidate:', err);
      setCandidate(null); // Set to null in case of error
    }
  };
  const handleSaveCandidate = () => {
    if (candidate) {
      saveCandidate(candidate);
    }
    fetchCandidate();
  };

  const handleSkipCandidate = () => {
    fetchCandidate();
  };

  return (
    <div>
      <h1>Candidate Search</h1>
      {candidate ? (
        <div className="candidate-card">
          <img src={candidate.avatar_url} alt={`${candidate.login} avatar`} />
          <h2>{candidate.name || candidate.login}</h2>
          <p>Username: {candidate.login}</p>
          <p>Location: {candidate.location || 'Not available'}</p>
          <p>Email: {candidate.email || 'Not available'}</p>
          <p>Company: {candidate.company || 'Not available'}</p>
          <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
            View Profile
          </a>
          <div className="buttons">
            <button onClick={handleSaveCandidate}>Save</button>
            <button onClick={handleSkipCandidate}>Skip</button>
          </div>
        </div>
      ) : (
        <p>No more candidates available.</p>
      )}
    </div>
  );
};

export default CandidateSearch;
