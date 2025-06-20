import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { signUpSchema } from "@/js/schemas/signUpSchema";
import type { SignUpForm } from "@/js/schemas/signUpSchema";
import { handleSignUp } from "@/js/controllers/signUpController";

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

  // Auto-fill address and city from zip + house number
  useEffect(() => {
    const subscription = form.watch(async (value, { name }) => {
      if (
        (name === "zip_code" || name === "house_number") &&
        value.zip_code?.trim() &&
        value.house_number?.trim()
      ) {
        const result = await getAdress(value.zip_code, value.house_number);
        if (result) {
          form.setValue("address", `${result.street} ${result.house_number}`, {
            shouldValidate: true,
          });
          form.setValue("city", result.city, { shouldValidate: true });
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [form]);

  return (
    <AuthLayout
      title="Create an account"
      description="Enter your details below to create your account"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((values) =>
            handleSignUp(values, form, setIsLoading, navigate)
          )}
          className="flex flex-col gap-6"
        >
          {" "}
          <div className="grid gap-6">
            {/* First Name */}
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Name"
                      autoComplete="given-name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Last Name */}
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
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

            {/* Zip Code */}
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

            {/* House Number */}
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

            {/* Address (auto-filled) */}
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

            {/* City (auto-filled) */}
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

            {/* Email */}
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

            {/* Password */}
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

            {/* Password Confirmation */}
            <FormField
              control={form.control}
              name="password_confirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
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

            {/* Global Form Error */}
            {form.formState.errors.root && (
              <div className="text-sm text-destructive">
                {form.formState.errors.root.message}
              </div>
            )}

            {/* Submit */}
            <Button type="submit" disabled={isLoading}>
              {isLoading && (
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              )}
              Create account
            </Button>
          </div>
          {/* Footer */}
          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-primary hover:underline">
              Log in
            </Link>
          </div>
        </form>
      </Form>
    </AuthLayout>
  );
}
