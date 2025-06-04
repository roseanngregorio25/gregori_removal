// Defines the shape of a user interface (UI) for authentication
export interface UserInterface {
  username: string;
  password: string;
  email: string;
  id: string;
  displayName?: string;
  profileImageUrl?: string;
  roles?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
