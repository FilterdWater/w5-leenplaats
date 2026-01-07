import { API_BASE_URL } from "../config";

export async function getAdress(postal: string, number: string) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/postal-lookup?postal=${postal}&number=${number}`
    );
    if (!response.ok) throw new Error("Failed to fetch address");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch postal code data:", error);
    return null;
  }
}
