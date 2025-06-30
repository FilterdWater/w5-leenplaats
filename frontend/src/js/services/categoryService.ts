import type { Category, CategoryDTO } from "@/js/models/category";
import type { ApiResponse } from "../types/api-response";

// GET: All Categories
export async function fetchCategories(): Promise<ApiResponse> {
  const response = await fetch(`http://localhost:80/api/categories`);

  const data = await response.json();

  console.log(data);
  return { success: true, data: data as Category[] };
}

// GET: Categories by Advertisement_Id
export async function fetchCategoriesByAdvertisementId(
  id: number
): Promise<ApiResponse> {
  const response = await fetch(`http://localhost:80/api/categories/${id}`);

  const data = await response.json();

  return { success: true, data: data as Category[] };
}

// POST: new Category
export async function createCategory(cat: CategoryDTO): Promise<ApiResponse> {
  try {
    const response = await fetch("http://localhost:80/api/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(cat),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, data };
    } else {
      return {
        success: false,
        errors: data.errors,
        message: data.message,
      };
    }
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Network error. Please try again.",
    };
  }
}

// Delete: new Category
export async function deleteAdvertisement(cat: Category): Promise<ApiResponse> {
  try {
    const response = await fetch("http://localhost:80/api/categories", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(cat),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, data };
    } else {
      return {
        success: false,
        errors: data.errors,
        message: data.message,
      };
    }
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Network error. Please try again.",
    };
  }
}
