import type { SignUpForm } from "@/js/schemas/signUpSchema";
import { createUser } from "@/js/services/userService";
import type { UserDTO } from "@/js/models/user";
import type { UseFormReturn } from "react-hook-form";

export async function handleSignUp(
  values: SignUpForm,
  form: UseFormReturn<SignUpForm>,
  setIsLoading: (b: boolean) => void,
  navigate: (path: string, options?: { state?: any }) => void
) {
  setIsLoading(true);

  const user: UserDTO = {
    first_name: values.first_name,
    last_name: values.last_name,
    email: values.email.toLowerCase(),
    zip_code: values.zip_code,
    address: `${values.address} ${values.house_number}`,
    city: values.city,
    password: values.password,
    created_at: new Date(),
  };

  const result = await createUser(user);

  if (result.success) {
    form.reset();
    navigate("/auth/login", {
      state: { email: values.email, fromSignup: true },
    });
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
}
