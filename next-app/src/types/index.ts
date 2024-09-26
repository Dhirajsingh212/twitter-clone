export interface ResponseObj {
  ok: boolean;
  error: string | undefined;
  status: number;
  url: string | null;
  message?: string | null;
}

export interface Bookmark {
  id: number;
  user: {
    username: string;
    id?: number;
  };
  content: string;
  media?: {
    url: string;
  }[];
  createdAt: string | Date;
  updatedAt: string | Date;
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
  media?: {
    url: string;
  }[];
  bookmarks?: {
    userId: number;
    tweetId: number;
  }[];
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
