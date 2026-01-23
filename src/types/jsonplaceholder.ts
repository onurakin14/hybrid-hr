export type Post = { userId: number; id: number; title: string; body: string };

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone?: string;
  website?: string;
  address?: {
    street?: string;
    suite?: string;
    city?: string;
    zipcode?: string;
  };
  company?: {
    name?: string;
    catchPhrase?: string;
    bs?: string;
  };
};

export type CandidateStatus = "new" | "in_review" | "interview" | "rejected" | "offer_sent";

export type Candidate = {
  id: number | string;       
  name: string;              
  email: string;
  role: string;               
  status: CandidateStatus;    
  lastActivityAt?: string;    
  avatarUrl?: string;        
};


export type Comment = { postId: number; id: number; name: string; email: string; body: string };
export type Todo = { userId: number; id: number; title: string; completed: boolean };
