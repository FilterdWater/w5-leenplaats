import * as z from "zod";

export const signUpSchema = z
  .object({
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
    email: z.string().email("Please enter a valid email address"),
    zip_code: z.string().min(1, "Please enter a valid zip code"),
    house_number: z.string().min(1, "Please enter a valid house number"),
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "Please enter a valid city"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    password_confirmation: z.string().min(6, "Please confirm your password"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  });

export type SignUpForm = z.infer<typeof signUpSchema>;
