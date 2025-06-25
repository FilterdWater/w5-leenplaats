import type { Category } from "./category";

export interface Advertisement {
  id: number;
  title: string;
  description: string;
  price: number;
  user_id: number;
  rentedBy?: number;
  rentedAt?: Date;
  rentedUntil?: Date;
  createdAt: Date;
  updatedAt?: Date;

  imageUrl?: string;
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
}
