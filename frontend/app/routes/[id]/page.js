"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Map, Clock, Users, Star, Heart, Share2, MessageSquare, MapPin, Calendar, Info, Calculator } from "lucide-react"
import { DATA } from '@/app/data'
import { getRouteById } from "@/api/services"

export default function RouteDetails() {
  const params = useParams() // Using Next.js useParams hook
  const [routeId, setRouteId] = useState(null)
  const [route, setRoute] = useState();

  useEffect(() => {
    const fetchRoute = async () => {
      if (params?.id) {
        setRouteId(params.id)

        try {
          const routeData = await getRouteById(params.id)
          setRoute(routeData)
          console.log(routeData)
          console.log("route", routeData)

        } catch (err) {
          console.error("Error fetching route:", err)
        }
      }

    }

    fetchRoute()
    console.log("route", route)
  }, [params])


  const [isJoined, setIsJoined] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  if (!route) {
    return <div>Loading...</div>
  }


  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-6">
        <Link href="/routes" className="text-green-600 hover:text-green-800 flex items-center">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Routes
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="rounded-lg overflow-hidden mb-6">
            <img src={route.image || "/placeholder.svg"} alt={route.routeName} className="w-full h-[400px] object-cover" />
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{route.routeName}</h1>
              <div className="flex items-center mt-2">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 mr-1" />
                  <span className="font-medium">{(route.popularity / 10)?.toFixed(1)}</span>
                </div>
                <span className="mx-2 text-gray-300">•</span>
                <div className="flex items-center">
                  <span>Origin: {route.origin.name} </span>
                </div>
              </div>
            </div>
          </div>


          <h2 className="text-2xl mb-8">Overview</h2>

          <div className="prose max-w-none">
            <p className="text-gray-700">{route.distanceKm} km, {route.durationHours} h</p>
          </div>

        </div>
      </div>
    </div>
  )
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
  )
}
