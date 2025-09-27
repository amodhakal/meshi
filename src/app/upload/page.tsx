"use client";

import Container from "@/components/Container";
import { RedirectToSignIn, useAuth } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { api } from "../../../convex/_generated/api";

export default function UploadPage() {
  const generateUploadUrl = useMutation(api.upload.generateUploadUrl);
  const uploadFiles = useMutation(api.upload.uploadFiles);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [glbFile, setGlbFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

  const user = useAuth();
  if (!user.isSignedIn) {
    return <RedirectToSignIn />;
  }

  return (
    <Container className="py-4 flex justify-center">
      <div className="shadow p-8 w-md md:w-lg rounded-lg bg-gray-50 flex flex-col gap-4">
        <h1 className="font-bold text-3xl flex justify-center">
          Upload Your Meshi
        </h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="title">Title: </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              name="title"
              placeholder="Enter title here"
              className="border rounded-lg p-4 flex items-center"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="description">Description: </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              name="description"
              placeholder="Enter description here"
              className="border rounded-lg p-4 h-20"
            ></textarea>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="designFile">Upload .glb File</label>
            <label
              htmlFor="designFile"
              className="border border-dashed border-gray-400 rounded-lg px-4 py-6 text-center cursor-pointer hover:bg-gray-100"
            >
              <span className="text-gray-600">
                {glbFile ? glbFile.name : "Click to upload .glb file"}
              </span>
              <input
                onChange={(e) => setGlbFile(e.target.files![0])}
                type="file"
                id="designFile"
                className="hidden"
                accept=".glb,model/gltf-binary"
              />
            </label>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="thumbnail">Upload Thumbnail</label>
              <label
                htmlFor="thumbnail"
                className="border border-dashed border-gray-400 rounded-lg px-4 py-6 text-center cursor-pointer hover:bg-gray-100"
              >
                <span className="text-gray-600">
                  {thumbnailFile
                    ? thumbnailFile.name
                    : "Click to upload thumbnail"}
                </span>
                <input
                  onChange={(e) => setThumbnailFile(e.target.files![0])}
                  type="file"
                  id="thumbnail"
                  className="hidden"
                  accept="image/*"
                />
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="bg-rose-600 active:bg-rose-800 active:scale-95 text-white font-medium text-lg rounded-xl px-4 py-4 cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>
    </Container>
  );

  async function handleSubmit(ev: FormEvent) {
    ev.preventDefault();

    if (!title) {
      return toast("Missing title", {
        style: { backgroundColor: "red", color: "white" },
      });
    }

    if (!glbFile) {
      return toast("Missing .glb file", {
        style: { backgroundColor: "red", color: "white" },
      });
    }

    const glbUrl = await generateUploadUrl();
    const thumbnailUrl = await generateUploadUrl();

    const { userId } = user;
    const creatorId = userId!;

    const data = await Promise.all([
      handleUpload(glbUrl, glbFile),
      handleUpload(thumbnailUrl, thumbnailFile),
    ]);

    const [glbId, thumbnailId] = data;
    if (!glbId) {
      toast("Unsuccesful handleUpload");
      return;
    }

    uploadFiles({ thumbnailId, glbId, title, description, creatorId });

    setTitle("");
    setDescription("");
    setGlbFile(null);
    setThumbnailFile(null);
    toast("Meshi submitted");

    async function handleUpload(url: string, file: File | null) {
      if (!file) {
        return undefined;
      }

      const result = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });

      const { storageId } = await result.json();
      return storageId as string;
    }
  }
}
