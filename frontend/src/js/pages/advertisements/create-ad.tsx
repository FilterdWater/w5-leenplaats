import { useDocumentTitle } from "@/js/hooks/use-document-title";
import { AppLayout } from "@/js/layouts/app-layout";
import { AdvertisementsLayout } from "@/js/layouts/advertisements/layout";
import { HeadingSmall } from "@/js/components/heading-small";
import { type BreadcrumbItem } from "@/js/types/app-layout";
import { useState } from "react";
import { ImageUpload } from "@/js/components/image-upload";
import { Input } from "@/js/components/ui/input";
import { Label } from "@/js/components/ui/label";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Create Ad",
    href: "/advertisements/create",
  },
];

export function CreateAd() {
  const [_selectedImage, setSelectedImage] = useState<File | null>(null);

  useDocumentTitle(
    "Create advertisement",
    "On this page you can create an advertisement"
  );

  const handleImageSelect = (file: File | null) => {
    setSelectedImage(file);
    console.log("Selected image:", file);
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <AdvertisementsLayout>
        <HeadingSmall
          title="Create advertisement"
          description="Show other people your product is available to borrow"
        />

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-3">
              Product Image
            </label>
            <ImageUpload onImageSelect={handleImageSelect} />
          </div>

          <Label>Product Title</Label>
          <Input />
          <Label>Product Description</Label>
          <Input />
          <Label>Product Price Per Day</Label>
          <Input />
          <Label>Lender name</Label>
          <Input />
          <Label>Product Location</Label>
          <Input />
        </div>
      </AdvertisementsLayout>
    </AppLayout>
  );
}
