"use client";

import { addLocation } from "@/lib/actions/add-location";

import { useTransition } from "react";
import { Button } from "./ui/button";

export const NewLocation = ({ tripId }: { tripId: string }) => {
  const [isPending, starTransition] = useTransition();
  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white p-8 shadow-lg rounded-lg">
          <h1 className="text-3xl font-bold text-center mb-6">
            Agregar nueva dirección
          </h1>

          <form
            action={(formData) => {
              starTransition(() => {
                addLocation(formData, tripId);
              });
            }}
            className="space-y-6"
          >
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-500 mb-2"
              >
                Dirección:
              </label>
              <input
                name="address"
                id="address"
                required
                type="text"
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <Button disabled={isPending}>
              {isPending ? "Creando" : "Crear ubicación"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
