import { User } from "~/types/User";

const users: User[] = [];

export function login(username: string, password: string) {
  const user = users.find(
    (u) => u.username === username && u.password === password,
  );
  return user ? user : null;
}

export function register(user: User) {
  users.push(user);
}
