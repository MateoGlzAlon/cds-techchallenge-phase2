"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Map, Clock, Users, Star, MapPinned } from "lucide-react"
import { getAllRoutes } from "@/api/services"
import { useState, useEffect } from "react"


export default function Routes() {

  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    const fetchRoutes = async () => {

      try {
        const routesData = await getAllRoutes()
        setRoutes(routesData)
        console.log(routesData)
        console.log("routes", routes)

      } catch (err) {
        console.error("Error fetching route:", err)
      }

    }

    fetchRoutes()
  }, [])


  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Explore Routes</h1>
          <p className="mt-2 text-lg text-gray-600">Discover amazing travel routes shared by our community</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link href="/routes/create">
            <Button className="flex items-center">
              <Map className="mr-2 h-4 w-4" />
              Create New Route
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {routes.map((route) => (
          <Card key={route.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <img src={route.image || "/placeholder.svg"} alt={route.routeName} className="w-full h-48 object-cover" />
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-gray-900">{route.routeName}</h3>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="text-sm font-medium">{(route.popularity / 10).toFixed(1)}</span>
                </div>
              </div>
              <p className="mt-2 text-gray-600 text-sm line-clamp-2">{route.description}</p>


              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="flex items-center text-sm text-gray-500">
                  <Map className="h-4 w-4 mr-1 text-gray-400" />
                  {route.distanceKm} km
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1 text-gray-400" />
                  {route.durationHours} h
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <MapPinned className="h-4 w-4 mr-1 text-gray-400" />
                  {route.origin.name}
                </div>
                <div className="text-sm text-gray-500">
                  Type: <span className="font-medium">{route.routeType}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50 px-6 py-4">
              <Link href={`/routes/${route.id}`} className="w-full">
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

