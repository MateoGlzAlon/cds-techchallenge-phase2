"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Hotel,
  MapPin,
  Star,
  Wifi,
  Coffee,
  Utensils,
  Search,
  Dumbbell,
  PocketIcon as Pool,
} from "lucide-react";
import { DATA } from "@/app/data";
import { useState, useEffect } from "react";
import { getAllHotels } from "@/api/services";

export default function Hotels() {
  const [priceFilter, setPriceFilter] = useState("All");
  const [ratingFilter, setRatingFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [hotels, setAllHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleFilterChange = (setter, value) => {
    setter(value);
  };

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setIsLoading(true);
        const hotelsData = await getAllHotels();
        setAllHotels(hotelsData);
        setFilteredHotels(hotelsData);
        console.log(hotelsData);
        console.log("hotels", hotels);
      } catch (err) {
        console.error("Error fetching hotel:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHotels();
  }, []);

  useEffect(() => {
    if (!hotels.length) return;

    const [minPrice, maxPrice] =
      priceFilter !== "All"
        ? priceFilter.split("-").map(Number)
        : [0, Infinity];

    const minRating = ratingFilter !== "All" ? Number(ratingFilter) : 0;

    const isDefault =
      priceFilter === "All" && ratingFilter === "All" && !searchQuery;

    if (isDefault) {
      setFilteredHotels(hotels);
      return;
    }
    const filtered = hotels.filter((hotel) => {
      const matchesPrice =
        hotel.pricePerNight >= minPrice && hotel.pricePerNight <= maxPrice;
      const matchesRating = hotel.averageRating >= minRating;
      const matchesSearch = hotel.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      return matchesPrice && matchesRating && matchesSearch;
    });

    setFilteredHotels(filtered);
  }, [priceFilter, ratingFilter, searchQuery, hotels]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Buscar Hoteles</h1>
          <p className="mt-2 text-lg text-gray-600">
          Descubre el lugar perfecto para alojarte durante tu viaje
          </p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="col-span-2">
              <label
                htmlFor="search"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Buscar
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="search"
                  placeholder="Buscar hoteles por nombre"
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Rango de precio
              </label>
              <select
                className="w-full p-3 bg-white border border-gray-300 rounded-md shadow-sm text-sm hover:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={priceFilter}
                onChange={(e) =>
                  handleFilterChange(setPriceFilter, e.target.value)
                }
              >
                <option value="All">Todos los precios</option>
                <option value="176 - 177">176 - 177 € </option>
                <option value="177 - 178">177 - 178 €</option>
                <option value="178 - 179">178 - 179 €</option>
                <option value="179 - 180">179 - 180 €</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="rating"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Valoración
              </label>
              <select
                className="w-full p-3 bg-white border border-gray-300 rounded-md shadow-sm text-sm hover:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={ratingFilter}
                onChange={(e) =>
                  handleFilterChange(setRatingFilter, e.target.value)
                }
              >
                <option value="All">Todas las valoraciones</option>
                <option value="3.8">⭐ 3.8+</option>
                <option value="4.0">⭐⭐ 4.0+</option>
                <option value="4.1">⭐⭐⭐ 4.1+</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {isLoading ? (
        <div className="flex justify-center items-center py-24">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-500 border-solid"></div>
        </div>
      ) : filteredHotels.length == 0 ? (
        <div className="text-center py-24 text-gray-600">
          <p className="text-lg">No se han encontrado hoteles</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHotels.map((hotel) => (
            <Card
              key={hotel.id}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={hotel.image || `/hotels/Hotel${hotel.id}.png`}
                alt={hotel.name}
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold text-gray-900">
                    {hotel.name}
                  </h3>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-sm font-medium">
                      {hotel.averageRating.toFixed(1)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center mt-2 text-gray-500 text-sm">
                  <MapPin className="h-4 w-4 mr-1" />
                  {hotel.location}
                </div>

                <p className="mt-2 text-gray-600 text-sm line-clamp-2">
                  {hotel.description}
                </p>

                <div className="mt-4 flex justify-between items-center">
                  <div className="text-lg font-bold text-green-600">
                    {hotel.pricePerNight?.toFixed(2)} €
                    <span className="text-sm font-normal text-gray-500">
                      /noche
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {hotel.numberOfReviews} reseñas
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-gray-50 px-6 py-4">
                <Link href={`/hotels/${hotel.id}`} className="w-full">
                  <Button variant="outline" className="w-full py-2">
                    Ver Detalles
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
