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

// POST: new Advertisement with file upload support
export async function createAdvertisement(
  ad: Omit<AdvertisementDTO, "pictures">,
  pictures: File[]
): Promise<ApiResponse> {
  try {
    console.log("Advertisement:", ad);
    console.log("Pictures:", pictures);

    const token = localStorage.getItem("token");
    console.log("Token:", token);

    // Create FormData for file upload
    const formData = new FormData();

    // Add text fields
    formData.append("title", ad.title);
    formData.append("description", ad.description);
    formData.append("price", ad.price.toString());

    // Add image files
    pictures.forEach((file, index) => {
      formData.append(`pictures[${index}]`, file);
    });

    // Debug: Log FormData contents
    console.log("FormData contents:");
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    const response = await fetch("http://localhost:80/api/advertisements", {
      method: "POST",
      headers: {
        // Remove Content-Type header - let browser set it for FormData
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, data };
    } else {
      console.error("Server error response:", data);
      return {
        success: false,
        errors: data.errors,
        message: data.message,
      };
    }
  } catch (error) {
    console.error("Network error:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Network error. Please try again.",
    };
  }
}
