import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/js/components/ui/button";
import { Input } from "@/js/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/js/components/ui/form";
import { AuthLayout } from "@/js/layouts/auth-layout";

const signUpSchema = z
  .object({
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
    email: z.string().email("Please enter a valid email address"),
    zip_code: z.string().min(1, "Please enter a valid zip code"),
    house_number: z.string().min(1, "Please enter a valid house number"),
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "Please enter a valid city"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    password_confirmation: z.string().min(6, "Please confirm your password"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  });

type SignUpForm = z.infer<typeof signUpSchema>;

export function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      address: "",
      zip_code: "",
      house_number: "",
      city: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  const getThing = async (postal: string, number: string) => {
    try {
      const response = await fetch(
        `http://localhost:80/api/postal-lookup?postal=${postal}&number=${number}`
      );
      if (!response.ok) throw new Error("Failed to fetch address");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch postal code data:", error);
      return null;
    }
  };

  // Watch zip_code and house_number, then auto-fill address + city
  useEffect(() => {
    const subscription = form.watch(async (value, { name }) => {
      if (
        (name === "zip_code" || name === "house_number") &&
        value.zip_code?.trim() &&
        value.house_number?.trim()
      ) {
        const result = await getThing(value.zip_code, value.house_number);
        if (result) {
          // Auto-fill address and city fields
          form.setValue("address", `${result.street} ${result.house_number}`, {
            shouldValidate: true,
          });
          form.setValue("city", result.city, { shouldValidate: true });
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [form]);

  const onSubmit = async (values: SignUpForm) => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:80/api/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();

        // Optional: Store token or session here
        if (data.token) {
          localStorage.setItem("auth_token", data.token);
        }

        navigate("/login");
      } else {
        const errorData = await response.json();
        if (errorData.errors) {
          Object.keys(errorData.errors).forEach((field) => {
            form.setError(field as keyof SignUpForm, {
              message: errorData.errors[field][0],
            });
          });
        } else {
          form.setError("root", {
            message: errorData.message || "Registration failed.",
          });
        }
      }
    } catch (error) {
      form.setError("root", {
        message: "Network error. Please check your connection and try again.",
      });
    } finally {
      setIsLoading(false);
      form.setValue("password", "");
      form.setValue("password_confirmation", "");
    }
  };

  return (
    <AuthLayout
      title="Create an account"
      description="Enter your details below to create your account"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <div className="grid gap-6">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your first name"
                      autoComplete="given-name"
                      autoFocus
                      tabIndex={1}
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
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" autoComplete="family-name" {...field} />
                    <Input
                      placeholder="Enter your last name"
                      autoComplete="family-name"
                      tabIndex={2}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Zip code */}
            <FormField
              control={form.control}
              name="zip_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zip Code</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="123 Main Street"
                      autoComplete="street-address"
                      tabIndex={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="house_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>House Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="12345"
                      autoComplete="postal-code"
                      tabIndex={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your city"
                      autoComplete="address-level2"
                      tabIndex={5}
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
                      placeholder="you@example.com"
                      autoComplete="email"
                      tabIndex={6}
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Create a secure password"
                      autoComplete="new-password"
                      tabIndex={7}
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
                      placeholder="Re-enter your password"
                      autoComplete="new-password"
                      tabIndex={8}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.formState.errors.root && (
              <div className="text-sm text-destructive">
                {form.formState.errors.root.message}
              </div>
            )}
            <Button type="submit" disabled={isLoading} tabIndex={9}>
              {isLoading && (
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              )}
              Create account
            </Button>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary hover:underline"
              tabIndex={10}
            >
              Log in
            </Link>
          </div>
        </form>
      </Form>
    </AuthLayout>
  );
}
