import type { Category } from "@/js/models/category";
import type { ApiResponse } from "../types/api-response";
import { API_BASE_URL } from "../config";

// GET: All Categories
export async function fetchCategories(): Promise<ApiResponse> {
  const response = await fetch(`${API_BASE_URL}/api/categories`);

  const data = await response.json();

  console.log(data);
  return { success: true, data: data as Category[] };
}
