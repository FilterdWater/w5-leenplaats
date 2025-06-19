import type { Category } from "@/js/models/category";
import type { ApiResponse } from "../types/api-response";

// GET: all Categories
export async function fetchCategories(): Promise<Category[]> {
  const res = await fetch("http://localhost:80/api/categories");

  return await res.json();
}

// POST: new Category
export async function createCategory(cat: Category): Promise<ApiResponse> {
  const res = await fetch("http://localhost:80/api/categories", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cat),
  });

  return await res.json();
}
