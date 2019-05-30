export interface AppUser {
  name: string;
  email: string;
  IsAdming: boolean;
}

export interface User {
  uid: string;
  email: string;
  IsAdming?: boolean;
}
