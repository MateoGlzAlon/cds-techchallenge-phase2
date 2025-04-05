"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Hotel, MapPin, Star, Wifi, Coffee, Utensils, Search, Dumbbell, PocketIcon as Pool } from "lucide-react"
import { DATA } from '@/app/data'
import { useState, useEffect } from "react"
import { getAllHotels } from "@/api/services"

export default function Hotels() {

  const [priceFilter, setPriceFilter] = useState("0-20");
  const [ratingFilter, setRatingFilter] = useState("⭐");
  const [hotels, setHotels] = useState([]);

  const handleFilterChange = (setter, value) => {
    setter(value);
  };

  useEffect(() => {
    const fetchHotels = async () => {

      try {
        const hotelsData = await getAllHotels()
        setHotels(hotelsData)
        console.log(hotelsData)
        console.log("hotels", hotels)

      } catch (err) {
        console.error("Error fetching hotel:", err)
      }

    }

    fetchHotels()
  }, [])


  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Find Hotels</h1>
          <p className="mt-2 text-lg text-gray-600">Discover the perfect place to stay for your journey</p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="col-span-2">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input id="search" placeholder="Search hotels by name" className="pl-10" />
              </div>
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                Price Range
              </label>
              <select
                className="w-full p-3 bg-white border border-gray-300 rounded-md shadow-sm text-sm hover:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={priceFilter}
                onChange={(e) => handleFilterChange(setPriceFilter, e.target.value)}
              >
                <option value="0-20">0 - 20 € (Newest first)</option>
                <option value="20-40">20 - 40 €</option>
                <option value="40-60">40 - 60 €</option>
                <option value="60-80">60 - 80 €</option>
              </select>
            </div>
            <div>
              <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
                Rating
              </label>
              <select
                className="w-full p-3 bg-white border border-gray-300 rounded-md shadow-sm text-sm hover:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={ratingFilter}
                onChange={(e) => handleFilterChange(setRatingFilter, e.target.value)}
              >
                <option value="1">⭐</option>
                <option value="2">⭐⭐</option>
                <option value="3">⭐⭐⭐</option>
                <option value="4">⭐⭐⭐⭐</option>
                <option value="5">⭐⭐⭐⭐⭐</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((hotel) => (
          <Card key={hotel.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <img src={hotel.image || "/placeholder.svg"} alt={hotel.name} className="w-full h-48 object-cover" />
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-gray-900">{hotel.name}</h3>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="text-sm font-medium">{hotel.rating}</span>
                </div>
              </div>

              <div className="flex items-center mt-2 text-gray-500 text-sm">
                <MapPin className="h-4 w-4 mr-1" />
                {hotel.location}
              </div>

              <p className="mt-2 text-gray-600 text-sm line-clamp-2">{hotel.description}</p>

              <div className="mt-4 flex justify-between items-center">
                <div className="text-lg font-bold text-green-600">
                  {hotel.pricePerNight?.toFixed(2)} €
                  <span className="text-sm font-normal text-gray-500">/night</span>
                </div>
                <div className="text-sm text-gray-500">{hotel.numberOfReviews} reviews</div>
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50 px-6 py-4">
              <Link href={`/hotels/${hotel.id}`} className="w-full">
                <Button variant="outline" className="w-full py-2">
                  View Details
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

