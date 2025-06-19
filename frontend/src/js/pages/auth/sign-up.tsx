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
import { getAdress } from "@/js/services/postalService";
import { createUser } from "@/js/services/userService";
import type { UserDTO } from "@/js/models/user";

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

  // Watch zip_code and house_number, then auto-fill address + city
  useEffect(() => {
    const subscription = form.watch(async (value, { name }) => {
      if (
        (name === "zip_code" || name === "house_number") &&
        value.zip_code?.trim() &&
        value.house_number?.trim()
      ) {
        const result = await getAdress(value.zip_code, value.house_number);
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

    const user: UserDTO = {
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email.toLowerCase(),
      zip_code: values.zip_code,
      address: values.address + " " + values.house_number,
      city: values.city,
      password: values.password,
      created_at: new Date(Date.now()),
    };

    const result = await createUser(user);

    if (result.success) {
      navigate("/login");
    } else {
      if (result.errors) {
        Object.keys(result.errors).forEach((field) => {
          form.setError(field as keyof SignUpForm, {
            message: result.errors?.[field][0],
          });
        });
      } else {
        form.setError("root", {
          message: result.message ?? "Something went wrong",
        });
      }
    }

    setIsLoading(false);
    form.setValue("password", "");
    form.setValue("password_confirmation", "");
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
                    <Input placeholder="Name" autoComplete="name" {...field} />
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
                    <Input
                      placeholder="Name"
                      autoComplete="family-name"
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
                      placeholder="Zip Code"
                      autoComplete="postal-code"
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
                    <Input placeholder="House Number" {...field} />
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
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Address" disabled {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="City" disabled {...field} />
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
                      placeholder="email@example.com"
                      autoComplete="email"
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
                      placeholder="Password"
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

            {form.formState.errors.root && (
              <div className="text-sm text-destructive">
                {form.formState.errors.root.message}
              </div>
            )}

            <Button type="submit" disabled={isLoading}>
              {isLoading && (
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              )}
              Create account
            </Button>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Log in
            </Link>
          </div>
        </form>
      </Form>
    </AuthLayout>
  );
}
