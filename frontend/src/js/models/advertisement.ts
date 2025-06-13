import type { Category } from "./category";

export interface Advertisement {
  id: number;
  title: string;
  description?: string;
  price: number;
  userId: number;
  rentedBy?: number;
  rentedAt?: Date;
  rentedUntil?: Date;
  createdAt: Date;
  updatedAt?: Date;

  imageUrl?: string;
  categories?: Category[];
}

export function advertisementToJSON(ad: Advertisement) {
  return {
    id: ad.id,
    title: ad.title,
    description: ad.description,
    price: ad.price,
    user_id: ad.userId,
    rented_by: ad.rentedBy ?? null,
    rented_at: ad.rentedAt ? ad.rentedAt.toISOString() : null,
    rented_until: ad.rentedUntil ? ad.rentedUntil.toISOString() : null,
    created_at: ad.createdAt.toISOString(),
    updated_at: ad.updatedAt ? ad.updatedAt.toISOString() : null,
    image_url: ad.imageUrl ?? null,
    categories:
      ad.categories?.map((cat) => ({ id: cat.id, name: cat.name })) ?? [],
  };
}
