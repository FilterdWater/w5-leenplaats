import type { Category } from "./category";
import type { Picture } from "./picture";

export interface Advertisement {
  id: number;
  title: string;
  description: string;
  price: number;
  user_id: number;
  created_at: string;
  updated_at: string;
  pictures?: Picture[]; // Related pictures
  categories?: Category[];
}

export interface AdvertisementDTO {
  title: string;
  description: string;
  price: number;
  rentedBy?: number;
  rentedAt?: Date;
  rentedUntil?: Date;
  categories?: number[];
  pictures?: string[];
}
