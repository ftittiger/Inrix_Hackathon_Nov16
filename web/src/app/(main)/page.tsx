"use client";
import UploadModal from "@/components/upload-dialog";

export default function Home() {
  return (
    <section className="flex h-full flex-col gap-6 items-center justify-between px-5 py-6 container mx-auto">
      <div className="flex w-full items-center justify-between">
        <h1 className="font-semibold text-3xl">Track your food</h1>
        <UploadModal />
      </div>
      <div className="w-full h-full flex flex-col border border-dashed rounded-md"></div>
    </section>
  );
}
