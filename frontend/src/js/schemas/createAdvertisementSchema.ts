import { z } from "zod";

export const createAdvertisementSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description must be less than 500 characters"),
  pricePerDay: z.number().min(0.01, "Price must be at least 0.01"),
});

export type CreateAdvertisementForm = z.infer<typeof createAdvertisementSchema>;
