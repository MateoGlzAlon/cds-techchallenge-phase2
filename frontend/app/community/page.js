"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Map, Calendar, ArrowRight, Plus, UserPlus, MessageSquare } from "lucide-react"
import { DATA } from '@/app/data'

export default function Community() {
  const [activeTab, setActiveTab] = useState("discover")

  // Mock data for community routes  

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">


      <div className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Upcoming Community Events</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DATA.mockRouteEvents.map((event, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
              <img src={event.image || "/placeholder.svg"} alt={event.title} className="w-full h-40 object-cover" />
              <CardContent className="p-6">
                <h3 className="font-bold text-gray-900">{event.title}</h3>
                <p className="text-sm text-gray-600 mt-1">Organized by {event.organizer}</p>
                <div className="mt-4 flex justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    {event.date}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="h-4 w-4 mr-1" />
                    {event.participants} going
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-gray-50 px-6 py-3">
                <Button variant="outline" className="w-full py-2">
                  View Event
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

