import { useDocumentTitle } from "@/js/hooks/use-document-title";
import { AppLayout } from "@/js/layouts/app-layout";
import { AdvertisementsLayout } from "@/js/layouts/advertisements/layout";
import { HeadingSmall } from "@/js/components/heading-small";
import { type BreadcrumbItem } from "@/js/types/app-layout";
import { useState } from "react";
import { ImageUpload } from "@/js/components/image-upload";
import { Input } from "@/js/components/ui/input";
import { Button } from "@/js/components/ui/button";
import { Textarea } from "@/js/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/js/components/ui/form";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/js/components/ui/tooltip";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { HelpCircle } from "lucide-react";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Create Ad",
    href: "/advertisements/create",
  },
];

// Define the form schema
const formSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: "Title is required.",
    })
    .max(100, {
      message: "Title must be less than 100 characters.",
    }),
  description: z
    .string()
    .min(10, {
      message: "Description must be at least 10 characters.",
    })
    .max(500, {
      message: "Description must be less than 500 characters.",
    }),
  pricePerDay: z
    .string()
    .min(1, {
      message: "Price per day is required.",
    })
    .refine(
      (val) => {
        const num = parseFloat(val);
        return !isNaN(num) && num > 0;
      },
      {
        message: "Please enter a valid positive number.",
      }
    ),
  lenderName: z
    .string()
    .min(1, {
      message: "Lender name is required.",
    })
    .max(50, {
      message: "Lender name must be less than 50 characters.",
    }),
  location: z
    .string()
    .min(1, {
      message: "Location is required.",
    })
    .max(100, {
      message: "Location must be less than 100 characters.",
    }),
});

type FormData = z.infer<typeof formSchema>;

export function CreateAd() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageError, setImageError] = useState<string>("");

  useDocumentTitle(
    "Create advertisement",
    "On this page you can create an advertisement"
  );

  // Initialize the form
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      pricePerDay: "",
      lenderName: "",
      location: "",
    },
  });

  const handleImageSelect = (file: File | null) => {
    setSelectedImage(file);
    // Clear image error when an image is selected
    if (file) {
      setImageError("");
    }
    console.log("Selected image:", file);
  };

  // Submit handler
  const onSubmit = (values: FormData) => {
    // Validate image is selected
    if (!selectedImage) {
      setImageError("Please select an image for your advertisement");
      return;
    }

    console.log("Form submitted with values:", values);
    console.log("Selected image:", selectedImage);

    // Here you would typically send the data to your API
    // Example:
    // const formData = new FormData();
    // Object.entries(values).forEach(([key, value]) => {
    //   formData.append(key, value);
    // });
    // if (selectedImage) {
    //   formData.append('image', selectedImage);
    // }
    // await submitAdvertisement(formData);

    // For now, just show an alert
    alert("Advertisement created successfully!");
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <AdvertisementsLayout>
        <HeadingSmall
          title="Create advertisement"
          description="Show other people your product is available to borrow"
        />

        <TooltipProvider>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Image Upload */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <label className="block text-sm font-medium text-muted-foreground">
                    Image
                  </label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        Upload a clear photo of your item to attract borrowers
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <ImageUpload onImageSelect={handleImageSelect} />
                {imageError && (
                  <p className="text-sm text-destructive mt-2">{imageError}</p>
                )}
              </div>

              {/* Title Field */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-2">
                      <FormLabel>Title</FormLabel>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Give your item a clear, descriptive title</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <FormControl>
                      <Input
                        placeholder="Enter advertisement title"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description Field */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-2">
                      <FormLabel>Description</FormLabel>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            Provide details about the item's condition,
                            features, and usage
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your item in detail..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Price Per Day Field */}
              <FormField
                control={form.control}
                name="pricePerDay"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-2">
                      <FormLabel>Price Per Day</FormLabel>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            Set your daily rental price in your local currency
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="0.00"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Lender Name Field */}
              {/* <FormField
                control={form.control}
                name="lenderName"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-2">
                      <FormLabel>Lender Name</FormLabel>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>This is how borrowers will know who to contact</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <FormControl>
                      <Input
                        placeholder="Your name or business name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

              {/* Location Field */}
              {/* <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-2">
                      <FormLabel>Location</FormLabel>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Help borrowers find items near them</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <FormControl>
                      <Input
                        placeholder="City, State or general area"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

              {/* Submit Button */}
              <div className="flex gap-4 pt-4">
                <Button type="submit" className="flex-1">
                  Create Advertisement
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => form.reset()}
                >
                  Reset Form
                </Button>
              </div>
            </form>
          </Form>
        </TooltipProvider>
      </AdvertisementsLayout>
    </AppLayout>
  );
}
