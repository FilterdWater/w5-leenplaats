import type { Advertisement } from "@/js/models/advertisement";
import type { User } from "@/js/models/user";

export const sampleUsers: User[] = [
  {
    id: 1,
    first_name: "Jan",
    last_name: "de Vries",
    address: "Hoofdstraat 123",
    zip_code: "1234 AB",
    city: "Amsterdam",
    email: "jan.devries@example.com",
    password: "hashed_password_here",
    profile_picture: "https://picsum.photos/id/375/500/500",
  },
  {
    id: 2,
    first_name: "Maria",
    last_name: "Janssen",
    address: "Kerkstraat 45",
    zip_code: "5678 CD",
    city: "Utrecht",
    email: "maria.janssen@example.com",
    password: "hashed_password_here",
    profile_picture: "https://picsum.photos/id/27/500/500",
  },
  {
    id: 3,
    first_name: "Pieter",
    last_name: "van den Berg",
    address: "Parklaan 67",
    zip_code: "9012 EF",
    city: "Rotterdam",
    email: "pieter.vandenberg@example.com",
    password: "hashed_password_here",
    profile_picture: "https://picsum.photos/id/338/500/500",
  },
];

export const sampleAdvertisements: Advertisement[] = [
  {
    id: 1,
    imageUrl: "https://picsum.photos/id/491/500/500",
    title: "Gereedschap",
    description:
      "Inclusief professionele boormachine perfect voor klussen in huis met verschillende boren.",
    categories: [
      { id: 1, name: "Gereedschap" },
      { id: 2, name: "Gebruikt" },
    ],
    price: 15,
    userId: 1,
    createdAt: new Date("2024-01-15T10:30:00Z"),
  },
  {
    id: 2,
    imageUrl: "https://picsum.photos/id/62/500/500",
    title: "Camping Tent",
    description: "Ruime 4-persoons tent, waterproof en makkelijk op te zetten.",
    categories: [
      { id: 3, name: "Camping" },
      { id: 4, name: "Outdoor" },
    ],
    price: 25,
    userId: 2,
    createdAt: new Date("2024-01-20T14:15:00Z"),
  },
  {
    id: 3,
    imageUrl: "https://picsum.photos/id/250/500/500",
    title: "Professionele Camera",
    description:
      "Canon EOS R5 met 24-70mm lens. Ideaal voor evenementen en fotoshoots.",
    categories: [
      { id: 5, name: "Fotografie" },
      { id: 6, name: "Professioneel" },
    ],
    price: 75,
    userId: 3,
    createdAt: new Date("2024-01-25T09:45:00Z"),
  },
  {
    id: 4,
    imageUrl: "https://picsum.photos/id/71/500/500",
    title: "Ladder 3 meter",
    description:
      "Stevige aluminium ladder, uitschuifbaar tot 3 meter. Veilig en stabiel.",
    categories: [
      { id: 1, name: "Gereedschap" },
      { id: 7, name: "Veiligheid" },
    ],
    price: 12,
    userId: 1,
    createdAt: new Date("2024-02-01T16:20:00Z"),
  },
  {
    id: 5,
    imageUrl: "https://picsum.photos/id/839/500/500",
    title: "Elektrische Fiets",
    description:
      "Moderne e-bike met lange actieradius. Perfect voor dagelijkse ritten door de stad.",
    categories: [
      { id: 8, name: "Transport" },
      { id: 9, name: "Elektrisch" },
    ],
    price: 30,
    userId: 2,
    createdAt: new Date("2024-02-05T11:10:00Z"),
  },
  {
    id: 6,
    imageUrl: "https://picsum.photos/id/355/500/500",
    title: "Projector",
    description:
      "HD projector voor presentaties of filmavonden. Inclusief scherm en kabels.",
    categories: [
      { id: 10, name: "Technologie" },
      { id: 11, name: "Entertainment" },
    ],
    price: 40,
    userId: 3,
    createdAt: new Date("2024-02-10T13:25:00Z"),
  },
];

// Sample availability status, might want to move this to a separate service or state management
export const sampleAvailabilityStatus: Record<number, boolean> = {
  1: true, // Elektrische Boormachine - available
  2: false, // Camping Tent - unavailable
  3: true, // Professionele Camera - available
  4: false, // Ladder 3 meter - unavailable
  5: true, // Elektrische Fiets - available
  6: false, // Projector - unavailable
};

// Helper functions to work with the sample data
export const getUserById = (id: number): User | undefined => {
  return sampleUsers.find((user) => user.id === id);
};

export const getAdvertisementById = (id: number): Advertisement | undefined => {
  return sampleAdvertisements.find((ad) => ad.id === id);
};

export const getAdvertisementWithUser = (
  id: number
): { advertisement: Advertisement; user: User } | null => {
  const advertisement = getAdvertisementById(id);
  if (!advertisement) return null;

  const user = getUserById(advertisement.userId);
  if (!user) return null;

  return { advertisement, user };
};
