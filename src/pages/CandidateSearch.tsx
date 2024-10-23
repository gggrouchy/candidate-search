import { useState, useEffect } from 'react';
import { searchGithub } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentCandidateIndex, setCurrentCandidateIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await searchGithub();
        setCandidates(response);
        setLoading(false);
      } catch (err) {
        setError('Error fetching candidates.');
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  const handleSaveCandidate = () => {
    // Add logic to save the candidate (to state or local storage)
    setCurrentCandidateIndex((prevIndex) => prevIndex + 1);
  };

  const handleSkipCandidate = () => {
    // Logic to skip the current candidate
    setCurrentCandidateIndex((prevIndex) => prevIndex + 1);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const currentCandidate = candidates[currentCandidateIndex];

  return (
    <div>
      <h1>Candidate Search</h1>
      {currentCandidate ? (
        <div>
          <img src={currentCandidate.avatar_url} alt="Candidate Avatar" />
          <p>Name: {currentCandidate.name}</p>
          <p>Username: {currentCandidate.login}</p>
          <p>Location: {currentCandidate.location}</p>
          <p>Email: {currentCandidate.email}</p>
          <p>Company: {currentCandidate.company}</p>
          <a href={currentCandidate.html_url} target="_blank" rel="noopener noreferrer">
            GitHub Profile
          </a>
          <div>
            <button onClick={handleSaveCandidate}>+</button>
            <button onClick={handleSkipCandidate}>-</button>
          </div>
        </div>
      ) : (
        <p>No more candidates available to review.</p>
      )}
    </div>
  );
};

export default CandidateSearch;

