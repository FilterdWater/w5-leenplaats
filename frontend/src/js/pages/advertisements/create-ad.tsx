import { useDocumentTitle } from "@/js/hooks/use-document-title";
import { AppLayout } from "@/js/layouts/app-layout";
import { AdvertisementsLayout } from "@/js/layouts/advertisements/layout";
import { HeadingSmall } from "@/js/components/heading-small";
import { type BreadcrumbItem } from "@/js/types/app-layout";
import { useEffect, useState } from "react";
import { MultiImageUpload } from "@/js/components/image-upload";
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
import { HelpCircle, LoaderCircle } from "lucide-react";
import {
  createAdvertisementSchema,
  type CreateAdvertisementForm,
} from "@/js/schemas/createAdvertisementSchema";
import { handleCreateAdvertisement } from "@/js/controllers/createAdvertisementController";
import { useNavigate } from "react-router";
import { useUser } from "@/js/context/UserContext";
import { MultiCategoryDropdown } from "@/js/components/search-dropdown";
import { fetchCategories } from "@/js/services/categoryService";
import type { Category } from "@/js/models/category";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Create Ad",
    href: "/advertisements/create",
  },
];

export function CreateAd() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imageError, setImageError] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);
  const { user } = useUser();

  useEffect(() => {
    fetchCategories().then((data) => {
      setCategories(data.data);
    });
  }, []);

  useDocumentTitle(
    "Create advertisement",
    "On this page you can create an advertisement"
  );

  // Initialize the form
  const form = useForm<CreateAdvertisementForm>({
    resolver: zodResolver(createAdvertisementSchema),
    defaultValues: {
      title: "",
      description: "",
      categories: [],
      pricePerDay: 0,
    },
  });

  const handleImagesSelect = (files: File[]) => {
    setSelectedImages(files);
    // Clear image error when images are selected
    if (files.length > 0) {
      setImageError("");
    }
    console.log("Selected images:", files);
  };

  const handleReset = () => {
    form.reset();
    setSelectedImages([]);
    setImageError("");
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
            <form
              onSubmit={form.handleSubmit((values) => {
                console.log("Submitting form:", values);
                handleCreateAdvertisement(
                  values,
                  form,
                  setIsLoading,
                  navigate,
                  user,
                  selectedImages
                );
              })}
              className="space-y-6"
            >
              {/* Image Upload */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <label className="block text-sm font-medium text-muted-foreground">
                    Images *
                  </label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        Upload clear photos of your item to attract borrowers
                        (max 4 images)
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <MultiImageUpload onImagesSelect={handleImagesSelect} />
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

              {/* Add Categories Field */}
              <FormField
                control={form.control}
                name="categories"
                render={({ field }) => (
                  <MultiCategoryDropdown
                    selectedIds={field.value}
                    onChange={(newSelectedIds) =>
                      field.onChange(newSelectedIds)
                    }
                    categories={categories}
                  />
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
                          <p>Set your daily rental price</p>
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
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Global Form Error */}
              {form.formState.errors.root && (
                <div className="text-sm text-destructive">
                  {form.formState.errors.root.message}
                </div>
              )}

              {/* Submit Button */}
              <div className="flex gap-4 pt-4">
                <Button type="submit" disabled={isLoading}>
                  {isLoading && (
                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Create advertisement
                </Button>
                <Button type="button" variant="outline" onClick={handleReset}>
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
