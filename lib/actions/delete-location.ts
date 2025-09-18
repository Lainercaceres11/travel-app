"use server";

import { auth } from "@/auth";
import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";

export const deleteLocation = async (locationId: string) => {
  const session = await auth();
  if (!session) {
    throw new Error("User not authenticated");
  }

  await prisma.location.delete({
    where: { id: locationId },
  });

  revalidatePath(`/trips/${locationId}`);
  return locationId;
};
