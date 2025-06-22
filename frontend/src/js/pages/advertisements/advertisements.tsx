import { useDocumentTitle } from "@/js/hooks/use-document-title";
import { AppLayout } from "@/js/layouts/app-layout";
import type { BreadcrumbItem } from "@/js/types/app-layout";
import { AdvertisementCard } from "@/js/widgets/advertisement-card";
import type { Advertisement } from "@/js/models/advertisement";
import type { User } from "@/js/models/user";
import { Heading } from "@/js/components/heading";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Advertisements",
    href: "/",
  },
];

// Sample data - replace this with your actual data source
const sampleAdvertisements: Advertisement[] = [
  {
    id: 1,
    imageUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    title: "Elektrische Boormachine",
    description:
      "Professionele boormachine perfect voor klussen in huis. Inclusief verschillende boren.",
    categories: [
      { id: 1, name: "Gereedschap" },
      { id: 2, name: "Nieuw" },
    ],
    price: 15,
    userId: 1,
    createdAt: new Date("2024-01-15T10:30:00Z"),
  },
  {
    id: 2,
    imageUrl:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
    title: "Camping Tent",
    description:
      "Ruime 4-persoons tent, waterproof en makkelijk op te zetten. Perfect voor festivals.",
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
    imageUrl:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
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
    imageUrl:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
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
    imageUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
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
    imageUrl:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
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

const sampleUsers: User[] = [
  {
    id: 1,
    first_name: "Jan",
    last_name: "de Vries",
    address: "Hoofdstraat 123",
    zip_code: "1234 AB",
    city: "Amsterdam",
    email: "jan.devries@example.com",
    password: "hashed_password_here",
    profile_picture:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
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
    profile_picture: "https://picsum.photos/id/27/150/150",
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
    profile_picture:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
];

export function Advertisements() {
  useDocumentTitle(
    "Advertisements",
    "On this page you can view everything people have made available to lend"
  );

  const handleBookmark = (advertisementId: number) => {
    console.log(`Bookmarked advertisement ${advertisementId}`);
    // Add your bookmark logic here
  };

  return (
    <>
      <AppLayout breadcrumbs={breadcrumbs}>
        <div className="container mx-auto px-4 py-6">
          <div className="mb-8">
            <Heading
              title="Beschikbare Advertenties"
              description="Ontdek wat anderen beschikbaar hebben gesteld om te lenen"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sampleAdvertisements.map((advertisement) => {
              const user = sampleUsers.find(
                (u) => u.id === advertisement.userId
              );
              if (!user) return null;

              return (
                <AdvertisementCard
                  key={advertisement.id}
                  advertisement={advertisement}
                  user={user}
                  onBookmark={() => handleBookmark(advertisement.id)}
                />
              );
            })}
          </div>
        </div>
      </AppLayout>
    </>
  );
}
