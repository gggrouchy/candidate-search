import { Candidate } from "../interfaces/Candidate.interface";


// Fetch multiple GitHub users
const searchGithub = async (): Promise<Candidate[]> => {
  try {
    const start = Math.floor(Math.random() * 100000000) + 1;
    const response = await fetch(
      `https://api.github.com/users?since=${start}`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Invalid API response, check the network tab');
    }

    const data: Candidate[] = await response.json();
    return data;
  } catch (err) {
    console.error('An error occurred:', err);
    return [];
  }
};

// Fetch a specific GitHub user by username
const searchGithubUser = async (username: string): Promise<Candidate | {}> => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error('Invalid API response, check the network tab');
    }

    const data: Candidate = await response.json();
    return data;
  } catch (err) {
    console.error('An error occurred:', err);
    return {};
  }
};

export { searchGithub, searchGithubUser };
