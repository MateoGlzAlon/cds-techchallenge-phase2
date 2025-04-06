"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Map,
  Clock,
  Users,
  Star,
  Heart,
  Share2,
  MessageSquare,
  MapPin,
  Calendar,
  Info,
  Calculator,
} from "lucide-react";
import { DATA } from "@/app/data";
import { getHotelById } from "@/api/services";

export default function hotelDetails() {
  const params = useParams(); // Using Next.js useParams hook
  const [hotelId, setHotelId] = useState(null);
  const [hotel, setHotel] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const opinionsPerPage = 5;

  useEffect(() => {
    const fetchHotel = async () => {
      if (params?.id) {
        setHotelId(params.id);
        setCurrentPage(1);

        try {
          const hotelData = await getHotelById(params.id);
          setHotel(hotelData);
        } catch (err) {
          console.error("Error fetching hotel:", err);
        }
      }
    };

    fetchHotel();
  }, [params]);

  const [isJoined, setIsJoined] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  if (!hotel) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-6">
        <Link
          href="/hotels"
          className="text-green-600 hover:text-green-800 flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Volver a Hoteles
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="rounded-lg overflow-hidden mb-6">
            <img
              src={hotel.image || `/hotels/Hotel${hotel.id}.png`}
              alt={hotel.name}
              className="w-full h-[400px] object-cover"
            />
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{hotel.name}</h1>
              <div className="flex items-center mt-2">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 mr-1" />
                  <span className="font-medium">
                    {hotel.averageRating?.toFixed(1)}
                  </span>
                </div>
                <span className="mx-2 text-gray-300">•</span>
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-gray-400 mr-1" />
                  <span>{hotel.numberOfReviews} reseñas</span>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-2xl mb-8">Resumen</h2>

          <div className="prose max-w-none">
            <p className="text-gray-700">{hotel.description}</p>
            <p className="text-gray-700 whitespace-pre-line">
              {hotel.longDescription}
            </p>
          </div>

          {/* Opiniones / Comentarios */}
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-4">
              Opiniones de los huéspedes
            </h2>

            {hotel.opinions.length === 0 ? (
              <p className="text-gray-500">
                No hay reseñas disponibles para este hotel.
              </p>
            ) : (
              <>
                {hotel.opinions
                  .slice(
                    (currentPage - 1) * opinionsPerPage,
                    currentPage * opinionsPerPage
                  )
                  .map((opinion) => (
                    <Card key={opinion.id} className="mb-4">
                      <CardContent className="p-4">
                        <div className="flex items-center mb-2">
                          {Array.from({ length: 5 }, (_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < opinion.puntuacion
                                  ? "text-yellow-500"
                                  : "text-gray-300"
                              }`}
                              fill={i < opinion.puntuacion ? "#facc15" : "none"}
                            />
                          ))}
                        </div>
                        <p className="text-gray-700">{opinion.comentario}</p>
                      </CardContent>
                    </Card>
                  ))}

                {/* Paginación */}
                <div className="flex justify-center mt-6 space-x-2">
                  <Button
                    variant="outline"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                  >
                    Anterior
                  </Button>
                  <span className="px-3 py-1 text-gray-700">
                    Página {currentPage} de{" "}
                    {Math.ceil(hotel.opinions.length / opinionsPerPage)}
                  </span>
                  <Button
                    variant="outline"
                    disabled={
                      currentPage ===
                      Math.ceil(hotel.opinions.length / opinionsPerPage)
                    }
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                  >
                    Siguiente
                  </Button>
                </div>
              </>
            )}
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
