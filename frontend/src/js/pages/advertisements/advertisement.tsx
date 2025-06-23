import { useParams, useNavigate, Link } from "react-router";
import { useDocumentTitle } from "@/js/hooks/use-document-title";
import { AppLayout } from "@/js/layouts/app-layout";
import type { BreadcrumbItem } from "@/js/types/app-layout";
import type { Advertisement as AdvertisementType } from "@/js/models/advertisement";
import type { User } from "@/js/models/user";
import { Heading } from "@/js/components/heading";
import { Button } from "@/js/components/ui/button";
import { ArrowLeft, Calendar, MapPin, Tag } from "lucide-react";
import { Badge } from "@/js/components/ui/badge";

// Sample data - replace with your actual data source
const sampleAdvertisements: AdvertisementType[] = [
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

export function Advertisement() {
  const { id } = useParams<{ id: string }>();
  const isAvailable = false;

  // Convert string ID to number and find the advertisement
  const advertisementId = id ? parseInt(id, 10) : null;
  const advertisement = advertisementId
    ? sampleAdvertisements.find((ad) => ad.id === advertisementId)
    : null;

  // Find the user who owns this advertisement
  const user = advertisement
    ? sampleUsers.find((u) => u.id === advertisement.userId)
    : null;

  // If advertisement not found, show error
  if (!advertisement || !user) {
    return (
      <AppLayout breadcrumbs={[]}>
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Advertentie niet gevonden
            </h1>
            <p className="text-gray-600 mb-6">
              De advertentie die je zoekt bestaat niet of is niet meer
              beschikbaar.
            </p>
            <Button asChild>
              <Link to="/advertisements">Terug naar advertenties</Link>
            </Button>
          </div>
        </div>
      </AppLayout>
    );
  }

  // Set page title
  useDocumentTitle(
    advertisement.title,
    `${advertisement.title} - Te leen van ${user.first_name} ${user.last_name}`
  );

  // Create breadcrumbs
  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: "Advertisements",
      href: "/advertisements",
    },
    {
      title: advertisement.title,
      href: `/advertisements/${advertisement.id}`,
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="container mx-auto px-4 py-6">
        {/* Back button */}
        <div className="mb-6">
          <Button variant="outline" className="mb-4" asChild>
            <Link to="/advertisements">
              <ArrowLeft />
            </Link>
          </Button>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image */}
          <div className="aspect-square overflow-hidden rounded-lg relative">
            <img
              src={advertisement.imageUrl}
              alt={advertisement.title}
              className={`w-full h-full object-cover ${
                !isAvailable ? "grayscale opacity-60" : ""
              }`}
            />
            {/* Availability Badge */}
            <div className="absolute top-3 left-3">
              {isAvailable ? (
                <div className="bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                  Beschikbaar
                </div>
              ) : (
                <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                  Niet beschikbaar
                </div>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <Heading
                title={advertisement.title}
                description={advertisement.description}
              />
            </div>

            {/* Price */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-700">
                €{advertisement.price} per dag
              </div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {advertisement.categories.map((category) => (
                <Badge key={category.id} variant="secondary">
                  <Tag className="w-3 h-3 mr-1" />
                  {category.name}
                </Badge>
              ))}
            </div>

            {/* Owner info */}
            <div className="border rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <img
                  src={user.profile_picture}
                  alt={`${user.first_name} ${user.last_name}`}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium">
                    {user.first_name} {user.last_name}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center">
                    <MapPin className="w-3 h-3 mr-1" />
                    {user.city}
                  </p>
                </div>
              </div>
            </div>

            {/* Created date */}
            <div className="text-sm text-gray-500 flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Geplaatst op {advertisement.createdAt.toLocaleDateString("nl-NL")}
            </div>

            {/* Action buttons */}
            <div className="space-y-3">
              <Button className="w-full" size="lg">
                Huren
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
