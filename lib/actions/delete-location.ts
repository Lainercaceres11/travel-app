"use server";

import { auth } from "@/auth";
import { prisma } from "../prisma";

export const deleteLocation = async (locationId: string) => {
  const session = await auth();
  if (!session) {
    throw new Error("User not authenticated");
  }

  await prisma.location.delete({
    where: { id: locationId },
  });

  return locationId;
};
