import type { UseFormReturn } from "react-hook-form";
import type { CreateAdvertisementForm } from "../schemas/createAdvertisementSchema";
import type { AdvertisementDTO } from "../models/advertisement";
import { createAdvertisement } from "../services/advertisementService";
import type { User } from "../models/user";

export async function handleCreateAdvertisement(
  values: CreateAdvertisementForm,
  form: UseFormReturn<CreateAdvertisementForm>,
  setIsLoading: (b: boolean) => void,
  navigate: (path: string, options?: { state?: any }) => void,
  user: User | null
) {
  setIsLoading(true);

  const token = localStorage.getItem("token");

  if (!token || !user) {
    setIsLoading(true);
    return {
      success: false,
      message: "User not authenticated.",
    };
  }

  const advertisement: AdvertisementDTO = {
    title: values.title,
    description: values.description,
    price: values.pricePerDay,
    userId: user?.id,
  };

  const result = await createAdvertisement(advertisement);

  if (result.success) {
    form.reset();
    navigate("/");
  } else {
    if (result.errors) {
      Object.keys(result.errors).forEach((field) => {
        form.setError(field as keyof CreateAdvertisementForm, {
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
}
