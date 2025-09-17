import React from "react";
import { Card, CardContent, CardHeader } from "./ui/card";

export const GlobeSkeleton = () => {
  return (
    <Card className="sticky top-8">
      <CardHeader>
        <div className="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
        </div>

        <div className="space-y-2 mt-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-2 p-3 rounded-lg border border-gray-100"
            >
              <div className="h-4 w-4 bg-gray-300 rounded-full animate-pulse"></div>
              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
