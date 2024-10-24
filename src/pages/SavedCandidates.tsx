import { useCandidates } from '../context/CandidatesContext';

const SavedCandidates = () => {
  const { savedCandidates } = useCandidates();

  return (
    <div>
      <h1>Potential Candidates</h1>
      {savedCandidates.length > 0 ? (
        savedCandidates.map((candidate, index) => (
          <div key={index}>
            <p>Name: {candidate.name || candidate.login}</p>
            <p>Username: {candidate.login}</p>
            <p>Location: {candidate.location || 'Not available'}</p>
            <p>Email: {candidate.email || 'Not available'}</p>
            <p>Company: {candidate.company || 'Not available'}</p>
            <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
              GitHub Profile
            </a>
          </div>
        ))
      ) : (
        <p>No saved candidates available.</p>
      )}
    </div>
  );
};

export default SavedCandidates;
