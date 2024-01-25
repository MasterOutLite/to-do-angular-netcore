export type CreateUser = {
  name: string;
  email: string;
  password: string;
}

export type User = {
  id: number;
  email: string;
  unique_name: string;
}
