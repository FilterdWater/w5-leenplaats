import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/js/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/js/components/ui/form";
import { Input } from "@/js/components/ui/input";
import { AppLayout } from "@/js/layouts/app-layout";
import { SettingsLayout } from "@/js/layouts/settings/layout";
import { HeadingSmall } from "@/js/components/heading-small";
import { DeleteUser } from "@/js/components/delete-user";
import { type BreadcrumbItem } from "@/js/types/app-layout";
import { useDocumentTitle } from "@/js/hooks/use-document-title";
import { useUser } from "@/js/context/UserContext";
import { API_BASE_URL } from "@/js/config";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Profile settings",
    href: "/settings/profile",
  },
];

// Define the form schema using Zod
const profileFormSchema = z.object({
  first_name: z.string().min(1, {
    message: "First name is required.",
  }),
  last_name: z.string().min(1, {
    message: "Last name is required.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function Profile() {
  const [isLoading, setIsLoading] = useState(false);
  const [recentlySuccessful, setRecentlySuccessful] = useState(false);

  // Use the UserContext
  const { user, setUser, isLoading: userLoading, refreshUser } = useUser();

  // Initialize the form with react-hook-form and Zod validation
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
    },
  });

  // Update form values when user data is loaded
  useEffect(() => {
    if (user) {
      form.reset({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
      });
    }
  }, [user, form]);

  // Handle form submission
  async function onSubmit(values: ProfileFormValues) {
    setIsLoading(true);
    setRecentlySuccessful(false);

    try {
      const response = await fetch(`${API_BASE_URL}/api/profile/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // Add authentication headers as needed
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          first_name: values.first_name,
          last_name: values.last_name,
          email: values.email,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();

        // Handle specific field errors
        if (errorData.errors) {
          Object.keys(errorData.errors).forEach((field) => {
            form.setError(field as keyof ProfileFormValues, {
              type: "manual",
              message: errorData.errors[field][0],
            });
          });
        } else {
          throw new Error(errorData.message || "Failed to update profile");
        }
        return;
      }

      const updatedUser = await response.json();

      // Update the user context with the new data
      setUser(updatedUser);
      setRecentlySuccessful(true);

      await refreshUser();
      // Show success toast
      toast.success("Profile updated successfully!");

      // Hide success message after 3 seconds
      setTimeout(() => {
        setRecentlySuccessful(false);
      }, 3000);
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to update profile"
      );
    } finally {
      setIsLoading(false);
    }
  }

  useDocumentTitle("Profile Settings", "Update your name and email address");

  // Show loading state while user data is being fetched
  if (userLoading) {
    return (
      <AppLayout breadcrumbs={breadcrumbs}>
        <SettingsLayout>
          <div className="space-y-6">
            <HeadingSmall
              title="Profile information"
              description="Update your name and email address"
            />
            <div className="flex items-center justify-center py-8">
              <div className="text-sm text-gray-500">Loading...</div>
            </div>
          </div>
        </SettingsLayout>
      </AppLayout>
    );
  }

  // Show message if no user is logged in
  if (!user) {
    return (
      <AppLayout breadcrumbs={breadcrumbs}>
        <SettingsLayout>
          <div className="space-y-6">
            <HeadingSmall
              title="Profile information"
              description="Update your name and email address"
            />
            <div className="flex items-center justify-center py-8">
              <div className="text-sm text-gray-500">
                Please log in to view your profile.
              </div>
            </div>
          </div>
        </SettingsLayout>
      </AppLayout>
    );
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <SettingsLayout>
        <div className="space-y-6">
          <HeadingSmall
            title="Profile information"
            description="Update your name and email address"
          />

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="First name"
                        autoComplete="given-name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Last name"
                        autoComplete="family-name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email address</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Email address"
                        autoComplete="username"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center gap-4">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save"}
                </Button>

                {recentlySuccessful && (
                  <p className="text-sm text-green-600 transition-opacity duration-300">
                    Saved
                  </p>
                )}
              </div>
            </form>
          </Form>
        </div>

        <DeleteUser />
      </SettingsLayout>
    </AppLayout>
  );
}
