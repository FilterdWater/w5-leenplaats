import { useState, useRef } from "react";
import { Camera, Upload, X, ImagePlus } from "lucide-react";

interface MultiImageUploadProps {
  onImagesSelect?: (files: File[]) => void;
  maxImages?: number;
}

export const MultiImageUpload = ({
  onImagesSelect,
  maxImages = 4,
}: MultiImageUploadProps) => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const processImageFiles = (files: File[]) => {
    const validFiles = files.filter((file) => file.type.startsWith("image/"));
    const newFiles = [...selectedImages, ...validFiles].slice(0, maxImages);

    setSelectedImages(newFiles);

    // Create preview URLs for all images
    const previews: string[] = [];
    newFiles.forEach((file, index) => {
      if (index < selectedImages.length) {
        // Keep existing previews
        previews.push(imagePreviews[index]);
      } else {
        // Create new preview
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result && typeof e.target.result === "string") {
            setImagePreviews((prev) => {
              const updated = [...prev];
              updated[index] = e.target!.result as string;
              return updated;
            });
          }
        };
        reader.readAsDataURL(file);
        previews.push(""); // Placeholder until loaded
      }
    });

    setImagePreviews(previews);

    // Call parent callback
    if (onImagesSelect) {
      onImagesSelect(newFiles);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      processImageFiles(Array.from(files));
    }
  };

  const openFileSystem = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (fileInputRef.current) {
      fileInputRef.current.multiple = selectedImages.length < maxImages;
      fileInputRef.current.click();
    }
  };

  const openCamera = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    cameraInputRef.current?.click();
  };

  const removeImage = (indexToRemove: number, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    const newImages = selectedImages.filter(
      (_, index) => index !== indexToRemove
    );
    const newPreviews = imagePreviews.filter(
      (_, index) => index !== indexToRemove
    );

    setSelectedImages(newImages);
    setImagePreviews(newPreviews);

    // Adjust current index if needed
    if (currentImageIndex >= newImages.length && newImages.length > 0) {
      setCurrentImageIndex(newImages.length - 1);
    }

    // Clear file inputs
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (cameraInputRef.current) cameraInputRef.current.value = "";

    if (onImagesSelect) {
      onImagesSelect(newImages);
    }
  };

  const addMoreImages = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openFileSystem(e);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % selectedImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + selectedImages.length) % selectedImages.length
    );
  };

  const canAddMore = selectedImages.length < maxImages;

  return (
    <div className="w-full space-y-4">
      <div className="relative border-2 border-dashed border-border rounded-lg overflow-hidden bg-card">
        {selectedImages.length > 0 ? (
          // Image Display with Custom Carousel
          <div className="relative w-full h-80 bg-muted">
            <div className="relative w-full h-full">
              <img
                src={
                  imagePreviews[currentImageIndex] ||
                  URL.createObjectURL(selectedImages[currentImageIndex])
                }
                alt={`Selected product ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />

              {/* Overlay with controls */}
              <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all duration-200 group">
                {/* Remove button */}
                <button
                  type="button"
                  onClick={(e) => removeImage(currentImageIndex, e)}
                  className="absolute top-4 left-4 bg-destructive hover:bg-destructive/90 text-destructive-foreground p-2 rounded-full shadow-lg opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                  aria-label={`Remove image ${currentImageIndex + 1}`}
                >
                  <X size={16} />
                </button>

                {/* Action buttons */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                  {canAddMore && (
                    <button
                      type="button"
                      onClick={openCamera}
                      className="bg-background/95 block md:hidden hover:bg-background text-foreground p-2 rounded-full shadow-lg border border-border"
                      aria-label="Take new photo"
                    >
                      <Camera size={16} />
                    </button>
                  )}

                  {canAddMore && (
                    <button
                      type="button"
                      onClick={addMoreImages}
                      className="bg-background/95 hover:bg-background text-foreground p-2 rounded-full shadow-lg border border-border"
                      aria-label="Add more photos"
                    >
                      <ImagePlus size={16} />
                    </button>
                  )}
                </div>

                {/* Navigation arrows */}
                {selectedImages.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/95 hover:bg-background text-foreground p-2 rounded-full shadow-lg border border-border opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Previous image"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="m15 18-6-6 6-6" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/95 hover:bg-background text-foreground p-2 rounded-full shadow-lg border border-border opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Next image"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </button>
                  </>
                )}
              </div>

              {/* Image counter */}
              <div className="absolute bottom-4 left-4 bg-background/95 text-foreground px-3 py-1 rounded-full text-sm font-medium border border-border shadow-sm">
                {currentImageIndex + 1} / {selectedImages.length}
              </div>
            </div>

            {/* Thumbnail strip */}
            {selectedImages.length > 1 && (
              <div className="absolute bottom-4 right-4 flex gap-2 bg-background/95 p-2 rounded-lg border border-border shadow-sm">
                {selectedImages.map((file, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-12 h-12 rounded-md overflow-hidden border-2 transition-all ${
                      index === currentImageIndex
                        ? "border-primary ring-2 ring-primary/20"
                        : "border-border hover:border-muted-foreground"
                    }`}
                  >
                    <img
                      src={imagePreviews[index] || URL.createObjectURL(file)}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          // Upload State
          <div className="flex flex-col items-center justify-center h-80 p-8 space-y-6">
            <ImagePlus className="text-muted-foreground size-10" />

            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold text-foreground">
                Add photos of your product
              </h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                Upload high-quality images to showcase your product. You can add
                up to {maxImages} photos.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-sm">
              <button
                type="button"
                onClick={openCamera}
                className="inline-flex md:hidden items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors w-full sm:w-auto font-medium text-sm"
              >
                <Camera size={16} />
                Take Photo
              </button>

              <div className="text-muted-foreground text-sm block sm:hidden">
                or
              </div>

              <button
                type="button"
                onClick={openFileSystem}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors w-full sm:w-auto font-medium text-sm"
              >
                <Upload size={16} />
                Choose Files
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Hidden file inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileSelect}
        className="hidden"
        aria-hidden="true"
      />

      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileSelect}
        className="hidden"
        aria-hidden="true"
      />

      {/* Status Display */}
      {selectedImages.length > 0 && (
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-card-foreground">
                {selectedImages.length === 1
                  ? "Photo ready!"
                  : `${selectedImages.length} photos ready!`}
              </p>
              <div className="text-sm text-muted-foreground mt-2 space-y-1">
                {selectedImages.map((file, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-1"
                  >
                    <span className="truncate pr-2">{file.name}</span>
                    <span className="text-xs font-mono bg-muted px-2 py-1 rounded">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                  </div>
                ))}
                {canAddMore && (
                  <p className="text-xs text-muted-foreground pt-2 border-t border-border">
                    You can add {maxImages - selectedImages.length} more image
                    {maxImages - selectedImages.length !== 1 ? "s" : ""}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
