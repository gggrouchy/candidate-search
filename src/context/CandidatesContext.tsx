import { createContext, useContext, useState, ReactNode } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';

interface CandidatesContextType {
  savedCandidates: Candidate[];
  saveCandidate: (candidate: Candidate) => void;
}

const CandidatesContext = createContext<CandidatesContextType | undefined>(undefined);

export const useCandidates = () => {
  const context = useContext(CandidatesContext);
  if (!context) {
    throw new Error('useCandidates must be used within a CandidatesProvider');
  }
  return context;
};

export const CandidatesProvider = ({ children }: { children: ReactNode }) => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  const saveCandidate = (candidate: Candidate) => {
    setSavedCandidates((prev) => [...prev, candidate]);
  };

  return (
    <CandidatesContext.Provider value={{ savedCandidates, saveCandidate }}>
      {children}
    </CandidatesContext.Provider>
  );
};
