"use client";

import { createTrip } from "@/lib/actions";
import { UploadButton } from "@/lib/upload-thing";

import { cn } from "@/lib/utils";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardHeader } from "@/src/components/ui/card";
import Image from "next/image";
import { useState, useTransition } from "react";

export default function Newtrip() {
  const [isPending, startTransition] = useTransition();
  const [imgUrl, setImgUrl] = useState<string | null>(null);

  return (
    <div className="max-w-lg mx-auto mt-10">
      <Card>
        <CardHeader className="text-2xl">Mis viajes</CardHeader>
        <CardContent>
          <form
            className="space-y-6"
            action={async (formData) => {
              startTransition(async () => {
                if (imgUrl) {
                  formData.append("imageUrl", imgUrl);
                }
                await createTrip(formData);
              });
            }}
          >
            <div>
              <label
                htmlFor="title"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Titulo
              </label>
              <input
                placeholder="Japan trip..."
                className={cn(
                  "w-full border-2 border-gray-300 px-3 py-2",
                  "rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                )}
                type="text"
                name="title"
                id="title"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Descripción
              </label>
              <textarea
                placeholder="Description trip..."
                className={cn(
                  "w-full border-2 border-gray-300 px-3 py-2",
                  "rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                )}
                name="description"
                id="description"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="startDate"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Fecha inicio
                </label>
                <input
                  type="date"
                  className={cn(
                    "w-full border-2 border-gray-300 px-3 py-2",
                    "rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  )}
                  name="startDate"
                  id="startDate"
                />
              </div>

              <div>
                <label
                  htmlFor="endDate"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Fecha final
                </label>
                <input
                  type="date"
                  className={cn(
                    "w-full border-2 border-gray-300 px-3 py-2",
                    "rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  )}
                  name="endDate"
                  id="endDate"
                />
              </div>
            </div>

            <div>
              <label>Imagen</label>
              {imgUrl && (
                <Image
                  alt="Viaje vista"
                  width={300}
                  height={100}
                  src={imgUrl}
                  className="w-full mb-4 roundd-md max-h-48 object-cover"
                />
              )}
              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  if (res && res[0].ufsUrl) {
                    setImgUrl(res[0].ufsUrl);
                  }
                }}
                onUploadError={(error: Error) => {
                  console.error("Upload error: ", error);
                }}
              />
            </div>

            <Button disabled={isPending} className="w-full" type="submit">
              {isPending ? "Creando" : "Crear viaje"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
