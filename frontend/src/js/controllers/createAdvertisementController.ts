import type { UseFormReturn } from "react-hook-form";
import type { CreateAdvertisementForm } from "../schemas/createAdvertisementSchema";
import type { AdvertisementDTO } from "../models/advertisement";
import { createAdvertisement } from "../services/advertisementService";
import type { User } from "@/js/models/user";
import type { Picture } from "@/js/models/picture";
import { storePictures } from "../services/pictureService";

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function handleCreateAdvertisement(
  values: CreateAdvertisementForm,
  form: UseFormReturn<CreateAdvertisementForm>,
  setIsLoading: (b: boolean) => void,
  navigate: (path: string, options?: { state?: any }) => void,
  user: User | null,
  pictures?: File[] | null
) {
  setIsLoading(true);

  const token = localStorage.getItem("token");

  if (!token || !user) {
    setIsLoading(false);
    form.setError("root", { message: "User not login" });
    return;
  }

  const advertisement: AdvertisementDTO = {
    title: values.title,
    description: values.description,
    price: values.pricePerDay,
    categories: values.categories,
  };

  if (pictures != null) {
    const base64Images = await Promise.all(
      pictures.map((file) => fileToBase64(file))
    );

    const pictureDTOs = base64Images.map((base64) => ({
      picture_base_string: base64,
    }));

    const pictureResult = await storePictures(pictureDTOs);

    if (pictureResult.success) {
      const pictureIds = pictureResult.data.map((pic: Picture) => pic.id);
      advertisement.pictures = pictureIds;
    } else {
      form.setError("root", {
        message: pictureResult.message ?? "Failed to upload images",
      });
      setIsLoading(false);
      return;
    }
  }

  const result = await createAdvertisement(advertisement);

  if (result.success) {
    form.reset();
    navigate("/advertisements");
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
