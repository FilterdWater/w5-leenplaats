import type {
  Advertisement,
  AdvertisementDTO,
} from "@/js/models/advertisement";
import type { ApiResponse } from "../types/api-response";

// GET: alle advertenties ophalen
export async function fetchAdvertisements(): Promise<Advertisement[]> {
  const res = await fetch("http://localhost:80/api/advertisements");

  return await res.json();
}

// POST: new Advertisement
export async function createAdvertisement(
  ad: AdvertisementDTO
): Promise<ApiResponse> {
  try {
    console.log("Advertisement:", ad);
    console.log(localStorage.getItem("token"));

    const response = await fetch("http://localhost:80/api/advertisements", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(ad),
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
