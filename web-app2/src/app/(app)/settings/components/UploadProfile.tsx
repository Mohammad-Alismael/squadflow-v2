"use client";
import React, { ChangeEvent, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { UploadIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { saveProfileImg } from "@/utils/actions/settings-actions";

function UploadProfile({
  username,
  photoURL,
}: {
  username: string;
  photoURL: string;
}) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { toast } = useToast();
  const [isLaoding, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = event.target.files?.[0];

    if (file) {
      // Check file size (4.5 MB = 4.5 * 1024 * 1024 bytes)
      const maxSize = 4.5 * 1024 * 1024;
      if (file.size > maxSize) {
        setError("File size should not exceed 4.5 MB");
        return;
      }

      try {
        setIsLoading(true);
        const formData = new FormData();
        formData.append("file", file);
        const url = await saveProfileImg(formData);

        const reader = new FileReader();
        reader.onloadend = () => {
          setSelectedImage(url as string);
        };
        reader.readAsDataURL(file);
        toast({ title: "Successfully uploaded avatar image" });
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
  };
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex items-center gap-4">
      {error && <span className="text-red-500">{error}</span>}
      {isLaoding && <Skeleton className="h-12 w-12 rounded-full" />}
      {!isLaoding && (
        <Avatar className="h-12 w-12 border">
          <AvatarImage
            alt="User profile image"
            src={selectedImage || photoURL}
          />
          <AvatarFallback>
            {username ? username.substring(0, 2) : "PD"}
          </AvatarFallback>
        </Avatar>
      )}
      <div>
        <Button variant="outline" onClick={triggerFileInput}>
          <UploadIcon className="mr-2 h-4 w-4" />
          Upload new photo
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileUpload}
          accept="image/*"
        />
      </div>
    </div>
  );
}

export default UploadProfile;
