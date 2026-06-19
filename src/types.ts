// Shared types for the app
export type UserRole = 'student' | 'teacher' | 'admin';

export interface AppUser {
  id: string;
  name: string;
  role: UserRole;
  avatar: string;
}
