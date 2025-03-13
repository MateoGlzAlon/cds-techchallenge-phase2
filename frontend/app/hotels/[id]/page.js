"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Map, Clock, Users, Star, Heart, Share2, MessageSquare, MapPin, Calendar, Info, Calculator } from "lucide-react"
import { DATA } from '@/app/data'

export default function hotelDetails() {
  const params = useParams() // Using Next.js useParams hook
  const [hotelId, setHotelId] = useState(null)
  const [hotel, setHotel] = useState();

  useEffect(() => {
    setHotel(DATA.mockHotelDetailPage)
    if (params?.id) {
      setHotelId(params.id) // Ensure we extract the id after params is available
    }
  }, [params])

  const [isJoined, setIsJoined] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  if (!hotelId) {
    return <div>Loading...</div>
  }


  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-6">
        <Link href="/hotels" className="text-green-600 hover:text-green-800 flex items-center">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Hotels
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="rounded-lg overflow-hidden mb-6">
            <img src={hotel.image || "/placeholder.svg"} alt={hotel.title} className="w-full h-[400px] object-cover" />
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{hotel.title}</h1>
              <div className="flex items-center mt-2">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 mr-1" />
                  <span className="font-medium">{hotel.rating}</span>
                </div>
                <span className="mx-2 text-gray-300">•</span>
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-gray-400 mr-1" />
                  <span>{hotel.participants} participants</span>
                </div>
              </div>
            </div>
          </div>


          <h2 className="text-2xl mb-8">Overview</h2>

          <div className="prose max-w-none">
            <p className="text-gray-700">{hotel.description}</p>
            <p className="text-gray-700 whitespace-pre-line">{hotel.longDescription}</p>
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
