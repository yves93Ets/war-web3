interface IUser {
  getUsername: Function;
  get: Function;
  id: string;
}

export type MoralisUser = IUser | null;
