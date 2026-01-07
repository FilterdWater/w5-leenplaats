import type { Category } from "./category";
import type { Picture } from "./picture";
import type { User } from "./user";

export interface Advertisement {
  id: number;
  title: string;
  description: string;
  price: number;
  user_id: number;
  user: User;
  rentedBy?: number;
  rentedAt?: Date;
  rentedUntil?: Date;
  created_at: string;
  updated_at: string;
  categories?: Category[];
  pictures?: Picture[];
  is_rented?: boolean;
}

export interface AdvertisementDTO {
  title: string;
  description: string;
  price: number;
  rentedBy?: number;
  rentedAt?: Date;
  rentedUntil?: Date;
  categories?: number[];
  pictures?: number[];
}
