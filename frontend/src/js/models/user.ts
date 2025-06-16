export interface User {
  id: number;
  firstName: string;
  lastName: string;
  address: string;
  zipCode: string;
  city: string;
  profilePicture: string;
  email: string;
  emailVerfied: boolean;
  createAt: Date;
  updateAt: Date;
}
