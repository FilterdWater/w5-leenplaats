import { useState, useRef } from "react";
import { Camera, Upload, X, ImagePlus } from "lucide-react";

interface ImageUploadProps {
  onImageSelect?: (file: File | null) => void;
}

export const ImageUpload = ({ onImageSelect }: ImageUploadProps) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const processImageFile = (file: File) => {
    setSelectedImage(file);

    // Create preview URL
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result && typeof e.target.result === "string") {
        setImagePreview(e.target.result);
      }
    };
    reader.readAsDataURL(file);

    // Call parent callback
    if (onImageSelect) {
      onImageSelect(file);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      processImageFile(file);
    }
  };

  const openFileSystem = () => {
    fileInputRef.current?.click();
  };

  const openCamera = () => {
    cameraInputRef.current?.click();
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (cameraInputRef.current) cameraInputRef.current.value = "";
    if (onImageSelect) {
      onImageSelect(null);
    }
  };

  return (
    <div className="w-full">
      <div className="relative aspect-square w-full border-2 border-dashed border-border rounded-[var(--radius)] overflow-hidden bg-muted/20">
        {imagePreview ? (
          // Image Preview State
          <div className="relative w-full h-full">
            <img
              src={imagePreview}
              alt="Selected product"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all duration-200 flex items-center justify-center opacity-0 hover:opacity-100">
              <button
                onClick={removeImage}
                className="bg-destructive hover:bg-destructive/90 text-destructive-foreground p-3 rounded-full transition-colors shadow-lg"
                aria-label="Remove image"
              >
                <X size={24} />
              </button>
            </div>

            {/* Replace button in corner */}
            <div className="absolute top-4 right-4">
              <button
                onClick={openCamera}
                className="bg-background/90 hover:bg-background text-foreground p-2 rounded-full transition-colors shadow-lg border border-border"
                aria-label="Take new photo"
              >
                <Camera size={20} />
              </button>
            </div>
          </div>
        ) : (
          // Upload State
          <div className="flex flex-col items-center justify-center h-full p-6 space-y-6">
            <ImagePlus className="text-muted-foreground w-16 h-16" />
            <div className="text-center space-y-2">
              <p className="text-lg font-medium text-foreground">
                Add a photo of your product
              </p>
              <p className="text-sm text-muted-foreground">
                Take a photo or choose from your gallery
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-sm">
              <button
                onClick={openCamera}
                className="flex items-center justify-center gap-3 px-6 py-3 bg-primary text-primary-foreground rounded-[var(--radius)] hover:bg-primary/90 transition-colors w-full sm:w-auto font-medium"
              >
                <Camera size={20} />
                Take Photo
              </button>

              <div className="text-muted-foreground text-sm">or</div>

              <button
                onClick={openFileSystem}
                className="flex items-center justify-center gap-3 px-6 py-3 bg-secondary text-secondary-foreground rounded-[var(--radius)] hover:bg-secondary/80 transition-colors w-full sm:w-auto font-medium"
              >
                <Upload size={20} />
                Choose File
              </button>
            </div>
          </div>
        )}
      </div>

      {/* File input for gallery */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        aria-hidden="true"
      />

      {/* Camera input - this will open the camera app on mobile */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileSelect}
        className="hidden"
        aria-hidden="true"
      />

      {selectedImage && (
        <div className="mt-4 p-4 bg-muted/30 border border-border rounded-[var(--radius)]">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">
                Photo ready!
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {selectedImage.name} •{" "}
                {(selectedImage.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
