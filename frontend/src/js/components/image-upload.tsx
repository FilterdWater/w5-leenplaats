import { useState, useRef, useCallback } from "react";
import { Camera, Upload, X, RotateCcw, ImagePlus } from "lucide-react";
import { Button } from "@/js/components/ui/button";

interface ImageUploadProps {
  onImageSelect?: (file: File | null) => void;
}

export const ImageUpload = ({ onImageSelect }: ImageUploadProps) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<"user" | "environment">(
    "environment"
  );
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      processImageFile(file);
    }
  };

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

  const startCamera = useCallback(async () => {
    try {
      setError(null);
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facingMode,
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
      });

      setStream(mediaStream);
      setIsCameraOpen(true);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play();
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setError("Unable to access camera. Please check permissions.");
    }
  }, [facingMode]);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setIsCameraOpen(false);
    setError(null);
  }, [stream]);

  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (!context) return;

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert canvas to blob and create file
    canvas.toBlob(
      (blob) => {
        if (blob) {
          const file = new File([blob], `camera-capture-${Date.now()}.jpg`, {
            type: "image/jpeg",
          });

          processImageFile(file);
          stopCamera();
        }
      },
      "image/jpeg",
      0.9
    );
  }, [stopCamera]);

  const switchCamera = useCallback(() => {
    const newFacingMode = facingMode === "user" ? "environment" : "user";
    setFacingMode(newFacingMode);

    if (isCameraOpen) {
      stopCamera();
      // Small delay to ensure camera is stopped before starting new one
      setTimeout(() => {
        startCamera();
      }, 100);
    }
  }, [facingMode, isCameraOpen, stopCamera, startCamera]);

  const openFileSystem = () => {
    fileInputRef.current?.click();
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (onImageSelect) {
      onImageSelect(null);
    }
  };

  // Camera view
  if (isCameraOpen) {
    return (
      <div className="w-full">
        <div className="relative aspect-square w-full border-2 border-border rounded-lg overflow-hidden bg-black">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />

          {/* Camera controls overlay */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Top controls */}
            <div className="absolute top-4 left-4 right-4 flex justify-between pointer-events-auto">
              <button
                onClick={stopCamera}
                className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                aria-label="Close camera"
              >
                <X size={20} />
              </button>

              <button
                onClick={switchCamera}
                className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                aria-label="Switch camera"
              >
                <RotateCcw size={20} />
              </button>
            </div>

            {/* Bottom capture button */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 pointer-events-auto">
              <button
                onClick={capturePhoto}
                className="bg-white hover:bg-gray-100 w-16 h-16 rounded-full border-4 border-gray-300 transition-colors shadow-lg flex items-center justify-center"
                aria-label="Capture photo"
              >
                <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Hidden canvas for capturing */}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="relative aspect-square w-full border-2 border-dashed border-border rounded-lg overflow-hidden bg-muted">
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
                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors"
                aria-label="Remove image"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        ) : (
          // Upload State
          <div className="flex flex-col items-center justify-center h-full p-6 space-y-4">
            <ImagePlus className="text-muted-foreground size-10" />
            <p className="text-sm text-muted-foreground text-center">
              Upload a photo of your product
            </p>
            <div className="flex flex-row items-center justify-center gap-3 w-full">
              <Button onClick={openFileSystem} variant="default">
                <Upload size={20} />
                Choose File
              </Button>

              <Button onClick={startCamera} variant="default">
                <Camera size={20} />
                Camera
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        aria-hidden="true"
      />

      {selectedImage && (
        <div className="mt-4 p-3 bg-secondary/50 border border-border rounded-lg">
          <p className="text-sm text-foreground">
            <span className="font-medium">Selected:</span> {selectedImage.name}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Size: {(selectedImage.size / 1024 / 1024).toFixed(2)} MB
          </p>
        </div>
      )}

      {error && !isCameraOpen && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
    </div>
  );
};
