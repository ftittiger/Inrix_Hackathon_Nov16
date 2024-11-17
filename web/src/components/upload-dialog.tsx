"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import Dropzone from "react-dropzone";
import { toast } from "sonner";
import { File } from "lucide-react";

const UploadModal = () => {
  const handleFileUpload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("image", file); // Append the file with the key 'image'

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload the image");
      }

      const result = await response.json();
      toast.success("Image uploaded successfully!");
      console.log("Server Response:", result); // Handle server response
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Upload Picture</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload picture</DialogTitle>
          <DialogDescription>
            We will run this picture of your food through our AI to track your
            calories.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col w-full">
          <Dropzone
            accept={{
              "image/jpeg": [".jpg", ".jpeg"],
              "image/png": [".png"],
              "image/gif": [".gif"],
            }}
            onError={(error) => toast.error(error.message)}
            multiple={false}
            onDrop={(acceptedFiles) => {
              if (acceptedFiles.length === 0) {
                toast.error("Please upload a file.");
                return; // Exit the function early
              }
              console.log(acceptedFiles[0]);
              handleFileUpload(acceptedFiles[0]);
            }}
          >
            {({ getRootProps, getInputProps, acceptedFiles }) => (
              <section className="w-full h-[200px] border bg-gray-50 hover:bg-gray-100 border-dashed rounded-lg border-[#E4E4E7] cursor-pointer">
                <div
                  {...getRootProps()}
                  className="w-full h-full flex flex-col items-center justify-center gap-2"
                >
                  <input
                    accept="image/jpeg, image/png, image/gif"
                    type="file "
                    {...getInputProps()}
                    id="dropzone-file"
                    className="hidden"
                    {...getInputProps()}
                  />
                  <p className="mb-2 text-sm text-[#09090B]">
                    <span className="font-semibold">Click to Upload</span> or
                    drag and drop
                  </p>
                  {acceptedFiles && acceptedFiles[0] ? (
                    <div className="max-w-xs bg-white flex items-center rounded-md overflow-hidden outline outline-[1px] outline-zinc-200 divide-x divide-zinc-200 mx-2">
                      <div className="px-3 py-2 h-full grid place-items-center">
                        <File className="h-4 w-4 text-blue-500" />
                      </div>
                      <div className="px-3 py-2 h-full text-sm truncate">
                        {acceptedFiles[0].name}
                      </div>
                    </div>
                  ) : null}
                </div>
              </section>
            )}
          </Dropzone>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UploadModal;
