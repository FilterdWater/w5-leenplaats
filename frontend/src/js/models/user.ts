export interface User {
  id: number;
  first_name: string;
  last_name: string;
  address: string;
  zip_code: string;
  city: string;
  profile_picture: string;
  email: string;
  email_verified_at?: boolean;
  password: string;
  remember_token?: string;
  created_at?: Date;
  updated_at?: Date;
  [key: string]: unknown; // This allows for additional properties...
}

export interface UserDTO {
  first_name: string;
  last_name: string;
  address: string;
  zip_code: string;
  city: string;
  profile_picture?: string;
  email: string;
  email_verified_at?: string | null;
  password: string;
  remember_token?: string;
  created_at?: Date;
  updated_at?: Date;
}
