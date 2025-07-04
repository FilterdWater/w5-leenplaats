import type { Picture, PictureDTO } from "../models/picture";
import type { ApiResponse } from "../types/api-response";
import { API_BASE_URL } from "../config";

// GET: Pictures by Advertisement_Id
export async function fetchPicturesByAdvertisementId(
  id: number
): Promise<ApiResponse> {
  const response = await fetch(`${API_BASE_URL}/api/pictures/${id}`);

  const data = await response.json();

  return { success: true, data: data as Picture[] };
}

// POST: new Picture
export async function storePictures(pics: PictureDTO[]): Promise<ApiResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/pictures`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ pictures: pics }),
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
