"use client";
import React, { useRef } from "react";
import { ImageKitProvider, IKUpload } from "imagekitio-next";
import { Loader2 } from "lucide-react";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import { set } from "mongoose";

interface FileUploadProps {
  onSuccess: (res: IKUploadResponse) => void;
  onProgress?: (progress: number) => void;
  fileType?: "image" | "video";
}

const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

export default function FileUpload({
  onSuccess,
  onProgress,
  fileType = "image",
}: FileUploadProps) {
  const [uploading, setUploading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const ikUploadRefTest = useRef(null);

  const onError = (err: { message: string }) => {
    console.log("Error", err);
    setError(err.message);
    setUploading(false);
  };

  const handleSuccess = (response: IKUploadResponse) => {
    console.log("Success", response);
    setUploading(false);
    setError(null);
    onSuccess(response);
  };

  const handleProgress = (evt: ProgressEvent) => {
    if (evt.lengthComputable && onProgress) {
      const percentComplete = (evt.loaded / evt.total) * 100;
      onProgress(percentComplete);
    }
  };

  const handleStartUpload = () => {
    setUploading(true);
    setError(null);
  };

  const validateFile = (file: File) => {
    if (fileType === "video") {
      if (!file.type.startsWith("/video")) {
        setError("Please upload a valid video file");

        return false;
      }
    } else {
      const validTyes = [
        "/image/jpeg",
        "/image/png",
        "/image/gif",
        "/image/webp",
      ];

      if (!validTyes.includes(file.type)) {
        setError("Please upload a valid image file  (jpeg, png, gif, webp)");
        return false;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError("File size should not exceed 5MB");
        return false;
      }
    }

    return false;
  };

  return (
    <div className="space-y-4">
      <IKUpload
        fileName={fileType === "video" ? "video" : "image"}
        useUniqueFileName={true}
        validateFile={validateFile}
        accept={fileType === "video" ? "video/*" : "image/*"}
        className="file_input  file-input-bordered w-full"
        onError={onError}
        onSuccess={handleSuccess}
        onUploadProgress={handleProgress}
        onUploadStart={handleStartUpload}
        folder={fileType === "video" ? "/videos" : "/images"}
      />
      {
        uploading && (
            <div className="flex items-center gap-2 text-sm text-primary">
                <Loader2 className="animate-spin" />
                <span>Loading...</span>
            </div>
        )
      }
      {
        error && (
            <div className="text-sm text-error">
                {error}

            </div>
        )
      }
    </div>
  );
}
