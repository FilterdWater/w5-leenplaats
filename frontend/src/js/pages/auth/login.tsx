import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginForm } from "@/js/schemas/loginSchema";
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
import { useUser } from "@/js/context/UserContext";
import { handleLogin } from "@/js/controllers/loginController";

export function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useUser();
  const location = useLocation();

  const prefillEmail = location.state?.email ?? "";
  const statusMessage = location.state?.status ?? "";

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: prefillEmail,
      password: "",
      remember: false,
    },
  });

  return (
    <AuthLayout
      title="Log in"
      description="Enter your information below to log in"
    >
      {statusMessage && (
        <div className="mb-4 text-center text-sm font-medium text-green-600">
          {statusMessage}
        </div>
      )}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((values) =>
            handleLogin(values, form, setIsLoading, navigate, setUser)
          )}
          className="flex flex-col gap-6"
        >
          <div className="grid gap-6">
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
                      placeholder="you@example.com"
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
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      tabIndex={2}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Remember Me */}
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

            {/* Global Error */}
            {form.formState.errors.root && (
              <div className="text-sm text-destructive">
                {form.formState.errors.root.message}
              </div>
            )}

            {/* Submit */}
            <Button type="submit" tabIndex={4} disabled={isLoading}>
              {isLoading && (
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              )}
              Log in
            </Button>
          </div>

          {/* Footer */}
          <div className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              to="/auth/sign-up"
              className="text-primary hover:underline"
              tabIndex={6}
            >
              Sign up
            </Link>
          </div>
        </form>
      </Form>
    </AuthLayout>
  );
}
