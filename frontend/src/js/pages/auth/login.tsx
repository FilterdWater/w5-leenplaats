import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/js/components/ui/button";
import { Checkbox } from "@/js/components/ui/checkbox";
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

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
  remember: z.boolean(),
});

type LoginForm = z.infer<typeof loginSchema>;

interface LoginProps {
  status?: string;
  canResetPassword?: boolean;
}

export function Login({ status, canResetPassword = true }: LoginProps) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit = async (values: LoginForm) => {
    setIsLoading(true);

    try {
      // Replace this with your actual login API call
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
          remember: values.remember,
        }),
      });

      if (response.ok) {
        // Handle successful login
        const data = await response.json();

        // Store auth token if needed
        if (data.token) {
          localStorage.setItem("auth_token", data.token);
        }

        // Navigate to home or intended route
        navigate("/home");
      } else {
        // Handle login errors
        const errorData = await response.json();

        // Set form errors based on response
        if (errorData.errors) {
          Object.keys(errorData.errors).forEach((field) => {
            form.setError(field as keyof LoginForm, {
              message: errorData.errors[field][0],
            });
          });
        } else {
          form.setError("root", {
            message: errorData.message || "Login failed. Please try again.",
          });
        }
      }
    } catch (error) {
      form.setError("root", {
        message: "Network error. Please check your connection and try again.",
      });
    } finally {
      setIsLoading(false);
      // Clear password field on completion (success or failure)
      form.setValue("password", "");
    }
  };

  return (
    <AuthLayout
      title="Log in"
      description="Enter your information below to log in"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <div className="grid gap-6">
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center">
                    <FormLabel>Password</FormLabel>
                    {canResetPassword && (
                      <Link
                        to="/forgot-password"
                        className="ml-auto text-sm text-primary hover:underline"
                        tabIndex={5}
                      >
                        Forgot password?
                      </Link>
                    )}
                  </div>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Password"
                      autoComplete="current-password"
                      tabIndex={2}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="remember"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      tabIndex={3}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Remember me</FormLabel>
                  </div>
                </FormItem>
              )}
            />

            {form.formState.errors.root && (
              <div className="text-sm text-destructive">
                {form.formState.errors.root.message}
              </div>
            )}

            <Button type="submit" tabIndex={4} disabled={isLoading}>
              {isLoading && (
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              )}
              Log in
            </Button>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              to="/sign-up"
              className="text-primary hover:underline"
              tabIndex={5}
            >
              Sign up
            </Link>
          </div>
        </form>
      </Form>

      {status && (
        <div className="mb-4 text-center text-sm font-medium text-green-600">
          {status}
        </div>
      )}
    </AuthLayout>
  );
}
