"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Map, Clock, MapPin } from "lucide-react";
import { getRouteById } from "@/api/services";

export default function RouteDetails() {
  const params = useParams();
  const [route, setRoute] = useState(null);

  useEffect(() => {
    const fetchRoute = async () => {
      if (params?.id) {
        try {
          const routeData = await getRouteById(params.id);
          setRoute(routeData);
        } catch (err) {
          console.error("Error fetching route:", err);
        }
      }
    };

    fetchRoute();
  }, [params]);

  if (!route) {
    return (
      <div className="flex justify-center items-center py-24">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-500 border-solid"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Back Link */}
      <div className="mb-6">
        <Link
          href="/routes"
          className="text-green-600 hover:text-green-800 flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Volver a Rutas
        </Link>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Route Content */}
        <div className="lg:col-span-2">
          {/* Image */}
          <div className="rounded-lg overflow-hidden mb-6">
            <img
              src={route.image || `/routes/ruta${route.id}.jpg`}
              alt={route.routeName}
              className="w-full h-[400px] object-cover"
            />
          </div>

          {/* Title & Info */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {route.routeName}
              </h1>

              <div className="flex items-center mt-2 space-x-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 mr-1" />
                  <span>{(route.popularity / 10).toFixed(1)}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                  <span>Origen: {route.origin?.name}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Summary */}
          <h2 className="text-2xl font-semibold mb-4">Resumen</h2>

          <div className="text-gray-700 mb-6">{route.description}</div>

          <div className="flex items-center space-x-6 text-gray-600">
            <div className="flex items-center">
              <Map className="h-5 w-5 mr-2 text-gray-400" />
              <span>{route.distanceKm} km</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-gray-400" />
              <span>{route.durationHours} h</span>
            </div>
          </div>

          <div className="flex items-center space-x-6 text-gray-600 py-5">
            {route.description || "Sin descripción"}
          </div>
        </div>
      </div>
    </div>
  );
}

function ArrowLeft(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}
