"use client";

import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useId, useState, useTransition } from "react";
import { Location } from "../generated/prisma";
import { deleteLocation, reorderItinerary } from "@/lib/actions";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";

type SortableItineraryProps = {
  location: Location[];
  tripId: string;
};

export const SortableItinerary = ({
  location,
  tripId,
}: SortableItineraryProps) => {
  const [localLocation, setLocalLocations] = useState(location);
  const dndId = useId();

  const [isPending, startTransition] = useTransition();

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = localLocation.findIndex((item) => item.id === active.id);
      const newIndex = localLocation.findIndex((item) => item.id === over!.id);

      const newLocationsOrder = arrayMove(
        localLocation,
        oldIndex,
        newIndex
      ).map((item, index) => ({ ...item, order: index }));

      setLocalLocations(newLocationsOrder);

      await reorderItinerary(
        tripId,
        newLocationsOrder.map((item) => item.id)
      );
    }
  };

  const handleDeleteLocation = async (locationId: string) => {
    startTransition(async () => {
      await deleteLocation(locationId);
    });

    setLocalLocations((prevState) =>
      prevState.filter((loc) => loc.id !== locationId)
    );
  };

  return (
    <DndContext
      id={dndId}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={localLocation.map((loc) => loc.id)}
        strategy={verticalListSortingStrategy}
      >
        {localLocation.map((item, key) => (
          <SortableItem
            key={key}
            item={item}
            handleClick={() => handleDeleteLocation(item.id)}
          />
        ))}
      </SortableContext>
    </DndContext>
  );
};

function SortableItem({
  item,
  handleClick,
}: {
  item: Location;

  handleClick: (id: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  return (
    <div className="space-y-2">
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={{ transform: CSS.Transform.toString(transform), transition }}
        className="p-4 border rounded-md flex justify-between items-center hover:shadow transition-shadow"
      >
        <div>
          <h4 className="font-medium text-gray-800"> {item.locationTitle}</h4>
          <p className="text-sm text-gray-500 truncate max-w-xs">
            {" "}
            {`Latitude: ${item.lat}, Longitude: ${item.lng}`}
          </p>
        </div>
        <div className="text-sm text-gray-600"> Día {item.order}</div>
      </div>

      <Button
        aria-label="Eliminar itinerario"
        onClick={() => handleClick(item.id)}
      >
        <span className="text-sm">Eliminar</span>
        <Trash2 />
      </Button>
    </div>
  );
}
