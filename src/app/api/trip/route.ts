import { auth } from "@/auth";
import { getCountryFromCoordinates } from "@/lib/actions/geocode";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();

    if (!session) {
      return new NextResponse("No authenticated", { status: 401 });
    }

    const locations = prisma.location.findMany({
      where: {
        trip: {
          userId: session.user?.id,
        },
      },
      select: {
        locationTitle: true,
        lat: true,
        lng: true,
        trip: {
          select: {
            title: true,
          },
        },
      },
    });


    const transformedLocations = await Promise.all(
      (
        await locations
      ).map(async (loc) => {
        const geocodeResult = await getCountryFromCoordinates(loc.lat, loc.lng);
      
        return {
          name: `${loc.trip.title} - ${geocodeResult.formattedAddress}`,
          lat: loc.lat,
          lng: loc.lng,
          country: geocodeResult.country,
        };
      })
    );

    return NextResponse.json(transformedLocations);
  } catch (error) {
    console.log(error);
    return new NextResponse("Error getting location", { status: 404 });
  }
}
