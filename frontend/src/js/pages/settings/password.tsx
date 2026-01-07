import { useState } from "react";
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
import { type BreadcrumbItem } from "@/js/types/app-layout";
import { useDocumentTitle } from "@/js/hooks/use-document-title";
import { API_BASE_URL } from "@/js/config";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Password settings",
    href: "/settings/password",
  },
];

// Define the form schema using Zod
const passwordFormSchema = z
  .object({
    current_password: z.string().min(1, {
      message: "Current password is required.",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    password_confirmation: z.string().min(1, {
      message: "Password confirmation is required.",
    }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ["password_confirmation"],
  });

type PasswordFormValues = z.infer<typeof passwordFormSchema>;

export function Password() {
  const [isLoading, setIsLoading] = useState(false);
  const [recentlySuccessful, setRecentlySuccessful] = useState(false);

  // Initialize the form with react-hook-form and Zod validation
  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      current_password: "",
      password: "",
      password_confirmation: "",
    },
  });

  // Handle form submission
  async function onSubmit(values: PasswordFormValues) {
    setIsLoading(true);
    setRecentlySuccessful(false);

    try {
      const response = await fetch(`${API_BASE_URL}/api/password/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // Add authentication headers as needed
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          current_password: values.current_password,
          password: values.password,
          password_confirmation: values.password_confirmation,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();

        // Handle specific field errors
        if (errorData.errors) {
          Object.keys(errorData.errors).forEach((field) => {
            form.setError(field as keyof PasswordFormValues, {
              type: "manual",
              message: errorData.errors[field][0],
            });
          });
        } else {
          throw new Error(errorData.message || "Failed to update password");
        }
        return;
      }

      // Success - reset form and show success state
      form.reset();
      setRecentlySuccessful(true);

      // Show success toast
      toast.success("Password updated successfully!");

      // Hide success message after 3 seconds
      setTimeout(() => {
        setRecentlySuccessful(false);
      }, 3000);
    } catch (error) {
      console.error("Password update error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to update password"
      );
    } finally {
      setIsLoading(false);
    }
  }

  useDocumentTitle("Password Settings", "Update your current password");

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <SettingsLayout>
        <div className="space-y-6">
          <HeadingSmall
            title="Update password"
            description="Ensure your account is using a long, random password to stay secure"
          />

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="current_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Current password"
                        autoComplete="current-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="New password"
                        autoComplete="new-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password_confirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm password"
                        autoComplete="new-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center gap-4">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save password"}
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
      </SettingsLayout>
    </AppLayout>
  );
}
