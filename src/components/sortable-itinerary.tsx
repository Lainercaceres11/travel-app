"use client";

import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useId, useState } from "react";
import { Location } from "../generated/prisma";
import { reorderItinerary } from "@/lib/actions";

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
          <SortableItem key={key} item={item} />
        ))}
      </SortableContext>
    </DndContext>
  );
};

function SortableItem({ item }: { item: Location }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  return (
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
  );
}
