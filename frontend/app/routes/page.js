"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Map, Clock, Star, MapPinned } from "lucide-react"
import { getAllRoutes } from "@/api/services"
import { useState, useEffect } from "react"

export default function Routes() {
  const [routes, setRoutes] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const routesData = await getAllRoutes()
        setRoutes(routesData)
      } catch (err) {
        console.error("Error fetching route:", err)
      }
    }

    fetchRoutes()
  }, [])

  // Pagination logic
  const totalPages = Math.ceil(routes.length / itemsPerPage)
  const currentRoutes = routes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Explorar Rutas</h1>
          <p className="mt-2 text-lg text-gray-600">
            Descubre rutas de viaje increíbles compartidas por nuestra comunidad
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentRoutes.map((route) => (
          <Card
            key={route.id}
            className="overflow-hidden hover:shadow-lg transition-shadow"
          >
            <img
              src={route.image || `/routes/ruta${route.id}.jpg`}
              alt={route.routeName}
              className="w-full h-48 object-cover"
            />
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-gray-900">
                  {route.routeName}
                </h3>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="text-sm font-medium">
                    {(route.popularity / 10).toFixed(1)}
                  </span>
                </div>
              </div>

              <p className="mt-2 text-gray-600 text-sm line-clamp-2">
                {route.description}
              </p>

              <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Map className="h-4 w-4 mr-1 text-gray-400" />
                  {route.distanceKm} km
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1 text-gray-400" />
                  {route.durationHours} h
                </div>
                <div className="flex items-center">
                  <MapPinned className="h-4 w-4 mr-1 text-gray-400" />
                  {route.origin?.name}
                </div>
                <div>
                  Tipo: <span className="font-medium">{route.routeType}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50 px-6 py-4">
              <Link href={`/routes/${route.id}`} className="w-full">
                <Button variant="outline" className="w-full py-2">
                  Ver Detalles
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Pagination Buttons */}
      <div className="flex justify-between items-center py-6">
        <Button
          variant="outline"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 border-2 border-gray-300"
        >
          Anterior
        </Button>
        <span className="text-gray-600">
          Página {currentPage} de {totalPages}
        </span>
        <Button
          variant="outline"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border-2 border-gray-300"
        >
          Siguiente
        </Button>
      </div>
    </div>
  )
}
