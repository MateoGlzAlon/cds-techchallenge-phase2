"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calculator, MapPin, ArrowRight } from "lucide-react"
import { DATA } from '@/app/data'

export default function DistanceCalculator() {
  const [origin, setOrigin] = useState("")
  const [destination, setDestination] = useState("")
  const [distance, setDistance] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleFilterChange = (setter, value) => {
    setter(value);
  };

  const calculateDistance = () => {
    if (!origin || !destination) {
      setError("Please enter both origin and destination")
      return
    }

    setIsLoading(true)
    setError("")

    setDistance({
      kilometers: 0,
      estimatedDriveTime: 0,
      vehicleType: ""
    })
    setIsLoading(false)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Distance Calculator</h1>
        <p className="mt-2 text-lg text-gray-600">Calculate the distance between any two locations</p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calculator className="mr-2 h-5 w-5" />
            Calculate Distance
          </CardTitle>
          <CardDescription>Enter the origin and destination to calculate the distance between them.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="origin" className="block text-sm font-medium text-gray-700 mb-1">
                  Origin
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
                  Destination
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
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Distance Results</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="text-sm text-gray-500">Distance (km)</div>
                      <div className="text-2xl font-bold text-green-600">{distance.kilometers} km</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="text-sm text-gray-500">Distance (miles)</div>
                      <div className="text-2xl font-bold text-green-600">{distance.miles} mi</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="text-sm text-gray-500">Est. Drive Time</div>
                      <div className="text-2xl font-bold text-green-600">{distance.estimatedDriveTime}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={calculateDistance} disabled={isLoading} className="w-full">
            {isLoading ? "Calculating..." : "Calculate Distance"}
          </Button>
        </CardFooter>
      </Card>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Popular Routes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DATA.popularRoutes.map((route, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow text-center">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="font-medium">{route.from}</div>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                  <div className="font-medium">{route.to}</div>
                </div>
                <div className="text-sm text-gray-500">
                  Distance: <span className="font-semibold text-gray-700">{route.distance} min</span>
                </div>
                <Button variant="outline" size="sm" className="mt-4 w-full">
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

