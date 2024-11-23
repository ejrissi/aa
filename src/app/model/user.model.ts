export class User {
  name!: string;
  password!: string;
  email!: string;
  roles?: string[];
  points: number = 0;
  cardCode?: string;
}
