import { z } from "zod";

export const createAdvertisementSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  description: z
    .string()
    .min(10, {
      message: "Description must be at least 10 characters.",
    })
    .max(500, {
      message: "Description must be less than 500 characters.",
    }),
  categories: z
    .array(z.number())
    .min(1, { message: "Select at least one category." }),
  pricePerDay: z
    .number({
      required_error: "Price per day is required.",
      invalid_type_error: "Please enter a number.",
    })
    .min(0.01, {
      message: "Please enter a valid positive number.",
    }),
});

export type CreateAdvertisementForm = z.infer<typeof createAdvertisementSchema>;
