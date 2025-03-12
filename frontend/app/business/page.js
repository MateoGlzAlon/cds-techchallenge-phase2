"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Hotel, MapPin, Star, Edit, Trash, Plus, Upload, Image, Users, DollarSign } from "lucide-react"
import { DATA } from '@/app/data'

export default function BusinessDashboard() {
  const [activeTab, setActiveTab] = useState("hotels")

  const hotels = DATA.mockHotelDetails

  const bookings = DATA.mockBookings

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Business Dashboard</h1>
          <p className="mt-2 text-lg text-gray-600">Manage your hotels and bookings</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link href="/business/profile">
            <Button variant="outline" className="mr-2">
              Business Profile
            </Button>
          </Link>
          <Link href="/business/add-hotel">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Hotel
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6 flex items-center">
            <div className="bg-blue-100 text-blue-700 rounded-full w-12 h-12 flex items-center justify-center mr-4">
              <Hotel className="h-6 w-6" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Total Hotels</div>
              <div className="text-2xl font-bold">{hotels.length}</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center">
            <div className="bg-green-100 text-green-700 rounded-full w-12 h-12 flex items-center justify-center mr-4">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Active Bookings</div>
              <div className="text-2xl font-bold">{bookings.filter((b) => b.status === "Confirmed").length}</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center">
            <div className="bg-purple-100 text-purple-700 rounded-full w-12 h-12 flex items-center justify-center mr-4">
              <DollarSign className="h-6 w-6" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Monthly Revenue</div>
              <div className="text-2xl font-bold">$78,340</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="hotels" onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
          <TabsTrigger value="hotels">Your Hotels</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
        </TabsList>
        <TabsContent value="hotels" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {hotels.map((hotel) => (
              <Card key={hotel.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img src={hotel.image || "/placeholder.svg"} alt={hotel.name} className="w-full h-48 object-cover" />
                  <div className="absolute top-2 right-2 flex gap-2">
                    <Button size="icon" variant="outline" className="bg-white h-8 w-8">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="outline" className="bg-white h-8 w-8 text-red-500 hover:text-red-700">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
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

                  <div className="mt-4 grid grid-cols-3 gap-2">
                    <div className="text-center">
                      <div className="text-sm text-gray-500">Rooms</div>
                      <div className="font-medium">{hotel.rooms}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-500">Occupancy</div>
                      <div className="font-medium">{hotel.occupancy}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-500">Revenue</div>
                      <div className="font-medium">{hotel.revenue}</div>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    <div className="text-lg font-bold text-blue-600">
                      {hotel.price}
                      <span className="text-sm font-normal text-gray-500">/night</span>
                    </div>
                    <div className="text-sm text-gray-500">{hotel.reviews} reviews</div>
                  </div>
                </CardContent>
                <div className="bg-gray-50 px-6 py-4 flex gap-2">
                  <Button variant="outline" className="flex-1">
                    <Image className="mr-2 h-4 w-4" />
                    Manage Photos
                  </Button>
                  <Button className="flex-1">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Details
                  </Button>
                </div>
              </Card>
            ))}
            <Card className="border-dashed border-2 hover:bg-gray-50 transition-colors">
              <CardContent className="p-6 flex flex-col items-center justify-center h-full min-h-[300px]">
                <div className="bg-blue-100 text-blue-700 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Plus className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Add New Hotel</h3>
                <p className="text-gray-500 text-center mb-4">Add your hotel to reach more travelers</p>
                <Link href="/business/add-hotel">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Hotel
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="bookings" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th className="px-6 py-3">Guest</th>
                      <th className="px-6 py-3">Hotel</th>
                      <th className="px-6 py-3">Check In</th>
                      <th className="px-6 py-3">Check Out</th>
                      <th className="px-6 py-3">Guests</th>
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking.id} className="bg-white border-b hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-gray-900">{booking.guest}</td>
                        <td className="px-6 py-4">{booking.hotel}</td>
                        <td className="px-6 py-4">{booking.checkIn}</td>
                        <td className="px-6 py-4">{booking.checkOut}</td>
                        <td className="px-6 py-4">{booking.guests}</td>
                        <td className="px-6 py-4">
                          <Badge
                            className={
                              booking.status === "Confirmed"
                                ? "bg-green-100 text-green-800 border-green-200"
                                : "bg-yellow-100 text-yellow-800 border-yellow-200"
                            }
                          >
                            {booking.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 font-medium">{booking.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {activeTab === "hotels" && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Add Hotel Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="hotelName">Hotel Name</Label>
                  <Input id="hotelName" placeholder="Enter hotel name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="City, State" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price per Night ($)</Label>
                  <Input id="price" type="number" placeholder="199" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rooms">Number of Rooms</Label>
                  <Input id="rooms" type="number" placeholder="50" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Describe your hotel" rows={4} />
              </div>
              <div className="space-y-2">
                <Label>Hotel Photos</Label>
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500">Drag and drop photos here, or click to browse</p>
                  <Button variant="outline" size="sm" className="mt-4">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Photos
                  </Button>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>Save Hotel</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

