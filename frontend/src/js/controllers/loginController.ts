import type { LoginForm } from "@/js/schemas/loginSchema";
import type { UseFormReturn } from "react-hook-form";
import { API_BASE_URL } from "../config";

export async function handleLogin(
  values: LoginForm,
  form: UseFormReturn<LoginForm>,
  setIsLoading: (loading: boolean) => void,
  navigate: (path: string) => void,
  setUser: (user: any) => void
) {
  setIsLoading(true);

  try {
    const response = await fetch(`${API_BASE_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (response.ok) {
      const data = await response.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      setUser(data.user);
      navigate("/");
    } else {
      const errorData = await response.json();

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
    form.setValue("password", "");
  }
}
