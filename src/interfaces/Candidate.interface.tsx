// TODO: Create an interface for the Candidate objects returned by the API

export interface Candidate {
  login: string;
  avatar_url: string;
  name: string | null;
  location: string | null;
  email: string | null;
  company: string | null;
  html_url: string;
}



