export interface ResponseObj {
  ok: boolean;
  error: string | undefined;
  status: number;
  url: string | null;
  message?: string | null;
}

export interface Post {
  id: number;
  user: {
    username: string;
    id?: number;
  };
  content: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  userId: number;
  likes?: {
    tweetId: number;
    userId: number;
  }[];
  _count: {
    comments: number;
    likes: number;
  };
}

export interface ProfileBioInputs {
  bio: string;
  location: string;
  link: string;
}
