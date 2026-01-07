import type { Advertisement } from "../models/advertisement";
import type { ApiResponse } from "../types/api-response";
import { API_BASE_URL } from "../config";

// GET: All Advertisements in bookmark
export async function fetchBookmarks(): Promise<ApiResponse> {
  const response = await fetch(`${API_BASE_URL}/api/bookmark`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const data = await response.json();

  return { success: true, data: data as Advertisement[] };
}

// POST: Add Advertisements to bookmark
export async function addToBookmark(id: number): Promise<ApiResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/bookmark`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ advertisement_id: id }),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, data: data, message: data.message };
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

// DELETE: Remove Advertisement from bookmark
export async function removeFromBookmark(id: number): Promise<ApiResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/bookmark`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ advertisement_id: id }),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, message: data.message };
    } else {
      const data = await response.json();
      return {
        success: false,
        message: data.message,
        errors: data.errors,
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
