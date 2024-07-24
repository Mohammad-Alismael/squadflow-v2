export interface IUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  photoURL: string;
  communityId: string;
}

export interface PopulatedUser {
  _id: string;
  username: string;
  email: string;
  photoURL: string;
}
