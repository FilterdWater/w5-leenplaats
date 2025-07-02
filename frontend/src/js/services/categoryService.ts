import type { Category } from "@/js/models/category";
import type { ApiResponse } from "../types/api-response";

// GET: All Categories
export async function fetchCategories(): Promise<ApiResponse> {
  const response = await fetch(`http://localhost:80/api/categories`);

  const data = await response.json();

  console.log(data);
  return { success: true, data: data as Category[] };
}
