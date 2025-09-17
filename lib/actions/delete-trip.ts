"use server";

import { auth } from "@/auth";
import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";

export const deleteTrip = async (tripId: string) => {
  const session = await auth();
  if (!session) {
    throw new Error("User no authenticated");
  }

  await prisma.location.deleteMany({
    where: { tripId },
  });

  await prisma.trip.delete({
    where: { id: tripId },
  });

  revalidatePath("/trips");
};
