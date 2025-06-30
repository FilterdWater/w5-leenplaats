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
  pictures: string[]; // Array of base64 image data
  price: number;
  rentedBy?: number;
  rentedAt?: Date;
  rentedUntil?: Date;
  categories?: number[];
  pictures?: string[];
}
