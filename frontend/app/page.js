import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Map, Calculator, Hotel, Users } from "lucide-react"
import { DATA } from "@/app/data"

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-indigo-700 opacity-100"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Discover Your Next Adventure in Green Lake
            </h1>
            <p className="mt-6 text-xl text-green-100 max-w-3xl">
              Plan your journey, find the best routes, and book amazing accommodations all in one place.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link href="/routes">
                <Button size="lg" className="bg-white text-green-600 px-4 py-2 hover:bg-green-100">
                  Explore Routes
                </Button>
              </Link>
              <Link href="/hotels">
                <Button size="lg" className="bg-white text-green-600 px-4 py-2 hover:bg-green-100">
                  Find Hotels
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Everything You Need For Your Journey</h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
              {DATA.appName} provides all the tools you need to plan, share, and enjoy your travel experiences.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Calculator className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">Distance Calculator</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Calculate distances between destinations to plan your journey effectively.
                </p>
                <Link
                  href="/distance-calculator"
                  className="mt-4 text-green-600 hover:text-green-800 text-sm font-medium"
                >
                  Calculate Now →
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Map className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">Community Routes</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Create and join community routes to discover hidden gems and local favorites.
                </p>
                <Link href="/community" className="mt-4 text-green-600 hover:text-green-800 text-sm font-medium">
                  Explore Community →
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Hotel className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">Hotel Listings</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Find and book the perfect accommodations for your travel needs.
                </p>
                <Link href="/hotels" className="mt-4 text-green-600 hover:text-green-800 text-sm font-medium">
                  Find Hotels →
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">Business Dashboard</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Manage your hotel information and bookings with our business dashboard.
                </p>

              </CardContent>
            </Card>
          </div>
        </div>
      </section>

    </div>
  )
}

