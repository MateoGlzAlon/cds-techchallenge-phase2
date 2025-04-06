"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calculator, MapPin, ArrowRight } from "lucide-react"
import { DATA } from '@/app/data'
import { calculateDistances } from "@/api/services"

export default function DistanceCalculator() {
  const [origin, setOrigin] = useState("")
  const [destination, setDestination] = useState("")
  const [distance, setDistance] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const formatDuration = (minutes) => {
    if (!minutes || isNaN(minutes)) return "-";
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;

    if (h > 0) {
      return `${h}h ${m}min`;
    }
    return `${m} min`;
  };


  const handleFilterChange = (setter, value) => {
    setter(value);
  };

  const calculateDistance = async () => {
    if (!origin || !destination) {
      setError("Por favor, introduzca tanto el origen como el destino.")
      return
    }

    setIsLoading(true)
    setError("")
    try {
      const data = await calculateDistances(origin, destination)
      console.log("Distance data:", data)
      setDistance(data)
    } catch (error) {
      setError("Error al calcular la distancia. Por favor, inténtelo de nuevo más tarde.")
    }

    setIsLoading(false)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Calculador de trayecto</h1>
        <p className="mt-2 text-lg text-gray-600">Calcular el tiempo entre dos puntos</p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center pb-2">
            <Calculator className="mr-2 h-5 w-5 " />
            Calcular tiempo de viaje
          </CardTitle>
          <CardDescription>Introduzca el origen y destino para calcular el tiempo entre ellos.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="origin" className="block text-sm font-medium text-gray-700 mb-1">
                  Origen
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    className="pl-10 w-full p-3 bg-white border border-gray-300 rounded-md shadow-sm text-sm hover:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={origin}
                    onChange={(e) => handleFilterChange(setOrigin, e.target.value)}
                  >
                    {DATA.locations.map((location, index) => (
                      <option value={location}>{location}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className=" mt-6 hidden md:flex items-center justify-center">
                <ArrowRight className="h-5 w-5 text-gray-400" />
              </div>

              <div className="flex-1">
                <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">
                  Destino
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    className="pl-10 w-full p-3 bg-white border border-gray-300 rounded-md shadow-sm text-sm hover:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={destination}
                    onChange={(e) => handleFilterChange(setDestination, e.target.value)}
                  >
                    {DATA.locations.map((location, index) => (
                      <option value={location}>{location}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

            {distance && (
              <Card className="mt-6 bg-green-50">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Resultados</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="text-sm text-gray-500">Metro</div>
                      <div className="text-2xl font-bold text-green-600">
                        {formatDuration(distance.metro)}
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="text-sm text-gray-500">Autobús</div>
                      <div className="text-2xl font-bold text-green-600">
                        {formatDuration(distance.autobus)}
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="text-sm text-gray-500">Tranvía</div>
                      <div className="text-2xl font-bold text-green-600">
                        {formatDuration(distance.tranvia)}
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="text-sm text-gray-500">Taxi</div>
                      <div className="text-2xl font-bold text-green-600">
                        {formatDuration(distance.taxi)}
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="text-sm text-gray-500">Coche compartido</div>
                      <div className="text-2xl font-bold text-green-600">
                        {formatDuration(distance.cocheCompartido)}
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="text-sm text-gray-500">Bicicleta</div>
                      <div className="text-2xl font-bold text-green-600">
                        {formatDuration(distance.bicicleta)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={calculateDistance} disabled={isLoading} className="w-full border-[0.5px] border-green-300 py-2 hover:bg-green-100">
            {isLoading ? "Calculando..." : "Calcular tiempo"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

