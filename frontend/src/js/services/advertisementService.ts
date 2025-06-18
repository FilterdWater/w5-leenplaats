import type { Advertisement } from "@/js/models/advertisement";

// GET: alle advertenties ophalen
export async function fetchAdvertisements(): Promise<Advertisement[]> {
  const res = await fetch("http://localhost:80/api/advertisements");

  return await res.json();
}

// POST: nieuwe advertentie maken
export async function createAdvertisement(
  ad: Advertisement
): Promise<Advertisement> {
  const res = await fetch("http://localhost:80/api/advertisements", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ad),
  });

  return await res.json();
}
