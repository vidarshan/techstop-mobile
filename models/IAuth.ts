export type AuthContextData = {
  authData?: AuthData;
  loading: boolean;
  signIn(): Promise<void>;
  signOut(): void;
};

export type AuthData = {
  _id: string;
  token: string;
  email: string;
  name: string;
};
