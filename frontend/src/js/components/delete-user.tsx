import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/js/components/ui/form";
import { Input } from "@/js/components/ui/input";
import { Button } from "@/js/components/ui/button";
import { Label } from "@/js/components/ui/label";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/js/components/ui/dialog";
import { API_BASE_URL } from "../config";

import { HeadingSmall } from "@/js/components/heading-small";
import { toast } from "sonner";

const formSchema = z.object({
  password: z.string().min(1, "Password is required"),
});

type FormValues = z.infer<typeof formSchema>;

export function DeleteUser() {
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  });

  useEffect(() => {
    if (form.formState.errors.password) {
      passwordInputRef.current?.focus();
    }
  }, [form.formState.errors.password]);

  const onSubmit = async (values: FormValues) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/profile/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const result = await response.json();
        if (result?.error?.field === "password") {
          form.setError("password", { message: result.error.message });
        } else {
          form.setError("password", {
            message: "Something went wrong. Please try again later.",
          });
        }
        return;
      }

      toast.success("Your account has been deleted.");
      form.reset();
      localStorage.removeItem("token"); // or however you handle auth
      navigate("/");
    } catch (error) {
      console.error("Account deletion failed:", error);
      form.setError("password", {
        message: "Something went wrong. Please try again later.",
      });
    }
  };

  return (
    <div className="space-y-6">
      <HeadingSmall
        title="Delete account"
        description="Delete your account and all of its resources"
      />

      <div className="space-y-4 rounded-lg border border-red-100 bg-red-50 p-4 dark:border-red-200/10 dark:bg-red-700/10">
        <div className="space-y-0.5 text-red-600 dark:text-red-100">
          <p className="font-medium">Warning</p>
          <p className="text-sm">
            Please proceed with caution, this cannot be undone.
          </p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="destructive">Delete account</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              Enter your password to confirm account deletion. This action
              cannot be undone.
            </DialogDescription>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="password" className="sr-only">
                        Password
                      </Label>
                      <FormControl>
                        <Input
                          id="password"
                          type="password"
                          placeholder="Password"
                          autoComplete="current-password"
                          {...field}
                          ref={(el) => {
                            field.ref(el);
                            passwordInputRef.current = el;
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter className="gap-2">
                  <DialogClose asChild>
                    <Button variant="secondary" onClick={() => form.reset()}>
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button variant="destructive" type="submit">
                    Delete account
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
